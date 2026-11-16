<?php

declare(strict_types=1);

namespace MauticPlugin\LmailBundle\Controller;

use Anthropic\Client;
use Anthropic\Core\Exceptions\APIConnectionException;
use Anthropic\Core\Exceptions\APIStatusException;
use Anthropic\Core\Exceptions\AuthenticationException;
use Anthropic\Core\Exceptions\RateLimitException;
use Mautic\CoreBundle\Security\Permissions\CorePermissions;
use MauticPlugin\LmailBundle\Service\EmailTemplate;
use Psr\Log\LoggerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

/**
 * AI email writer: takes a short brief and returns a subject line plus a ready-to-edit HTML email.
 */
class AiController
{
    private const MODEL     = 'claude-opus-5-5';
    private const MAX_BRIEF = 2000;

    private const SYSTEM = <<<'TXT'
You write marketing and lifecycle emails for small businesses using LMAIL, an email platform.

Write the email the user describes. Keep it short and specific to their brief: a subject line,
a preheader, a heading, an optional highlight, two to four short paragraphs, and a button label.

Rules:
- Start the first paragraph with a greeting that uses the token {contactfield=firstname} in place
  of the reader's name, for example "Hi {contactfield=firstname},". Use that token exactly.
- Plain text only. No HTML, no markdown, no emoji unless the brief asks for them.
- Only state facts given in the brief. Never invent prices, discounts, dates, statistics or
  product claims. If the brief lacks a detail the email needs, write around it.
- No spam-style wording, no ALL CAPS, no misleading subject lines.
- The highlight is shown very large above the heading. Use it only when the brief contains an
  offer or one key figure, and copy it from the brief in at most four words, for example
  "20% off" or "Free delivery". Otherwise use an empty string.
- The button label is two to four words. Use an empty string if the email needs no button.
- Do not write an unsubscribe line or a signature block; the template adds the footer.
TXT;

    public function __construct(
        private CorePermissions $security,
        private EmailTemplate $template,
        private LoggerInterface $logger,
    ) {
    }

    public function draftAction(Request $request): JsonResponse
    {
        // Same-origin AJAX only, from a user who is allowed to create emails.
        if ('XMLHttpRequest' !== $request->headers->get('X-Requested-With')) {
            return $this->error('Bad request.', 400);
        }
        if (!$this->security->isGranted('email:emails:create')) {
            return $this->error('You do not have permission to create emails.', 403);
        }

        $data  = json_decode($request->getContent(), true) ?: [];
        $brief = trim((string) ($data['brief'] ?? ''));
        $tone  = trim((string) ($data['tone'] ?? 'Friendly'));
        $brand = trim((string) ($data['brand'] ?? ''));
        $look  = [
            'name'  => mb_substr($brand, 0, 120),
            'color' => (string) ($data['color'] ?? ''),
            'logo'  => (string) ($data['logo'] ?? ''),
            'photo' => (string) ($data['photo'] ?? ''),
        ];

        if ('' === $brief) {
            return $this->error('Tell the AI writer what the email is about.', 422);
        }
        if (mb_strlen($brief) > self::MAX_BRIEF) {
            return $this->error('That description is too long. Keep it under '.self::MAX_BRIEF.' characters.', 422);
        }

        $apiKey = getenv('ANTHROPIC_API_KEY') ?: ($_ENV['ANTHROPIC_API_KEY'] ?? '');
        if ('' === $apiKey) {
            return $this->error('The AI writer is not set up yet. Add ANTHROPIC_API_KEY to the server .env file and restart LMAIL.', 503);
        }

        $prompt = "Brief: {$brief}\nTone: ".mb_substr($tone, 0, 60);
        if ('' !== $brand) {
            $prompt .= "\nSender / brand name: ".mb_substr($brand, 0, 120);
        }

        try {
            $client  = new Client(apiKey: $apiKey);
            $message = $client->messages->create(
                model: self::MODEL,
                maxTokens: 16000,
                system: self::SYSTEM,
                messages: [['role' => 'user', 'content' => $prompt]],
                outputConfig: [
                    // Short, routine writing task: low effort keeps the wait short.
                    'effort' => 'low',
                    'format' => [
                        'type'   => 'json_schema',
                        'schema' => [
                            'type'       => 'object',
                            'properties' => [
                                'subject'    => ['type' => 'string'],
                                'preheader'  => ['type' => 'string'],
                                'heading'    => ['type' => 'string'],
                                'highlight'  => ['type' => 'string'],
                                'paragraphs' => ['type' => 'array', 'items' => ['type' => 'string']],
                                'cta_label'  => ['type' => 'string'],
                            ],
                            'required'             => ['subject', 'preheader', 'heading', 'highlight', 'paragraphs', 'cta_label'],
                            'additionalProperties' => false,
                        ],
                    ],
                ],
            );
        } catch (AuthenticationException $e) {
            return $this->error('The AI key was rejected. Check ANTHROPIC_API_KEY on the server.', 503);
        } catch (RateLimitException $e) {
            return $this->error('The AI writer is busy right now. Try again in a minute.', 429);
        } catch (APIStatusException $e) {
            $this->logger->error('LMAIL AI writer: API error '.$e->getMessage());

            return $this->error('The AI writer could not finish that request. Try again.', 502);
        } catch (APIConnectionException $e) {
            $this->logger->error('LMAIL AI writer: connection error '.$e->getMessage());

            return $this->error('Could not reach the AI service. Check the server\'s internet connection.', 502);
        }

        if ('refusal' === $message->stopReason) {
            return $this->error('The AI writer declined that request. Try describing the email differently.', 422);
        }
        if ('max_tokens' === $message->stopReason) {
            return $this->error('The draft came back incomplete. Try a shorter description.', 502);
        }

        $draft = null;
        foreach ($message->content as $block) {
            if ('text' === $block->type) {
                $draft = json_decode($block->text, true);
                break;
            }
        }
        if (!is_array($draft) || !isset($draft['subject'], $draft['heading'], $draft['paragraphs'])) {
            $this->logger->error('LMAIL AI writer: unexpected response shape');

            return $this->error('The AI writer returned something unexpected. Try again.', 502);
        }

        $draft['paragraphs'] = array_values(array_filter(array_map('strval', (array) $draft['paragraphs'])));
        $draft['preheader']  = (string) ($draft['preheader'] ?? '');
        $draft['cta_label']  = (string) ($draft['cta_label'] ?? '');
        $draft['highlight']  = mb_substr((string) ($draft['highlight'] ?? ''), 0, 40);

        return new JsonResponse([
            'subject'   => $draft['subject'],
            'preheader' => $draft['preheader'],
            'heading'   => $draft['heading'],
            'html'      => $this->template->render($draft, $look),
            'plainText' => $draft['heading']."\n\n".implode("\n\n", $draft['paragraphs'])."\n\n{unsubscribe_text}",
        ]);
    }

    private function error(string $message, int $status): JsonResponse
    {
        return new JsonResponse(['error' => $message], $status);
    }
}
