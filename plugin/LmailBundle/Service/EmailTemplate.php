<?php

declare(strict_types=1);

namespace MauticPlugin\LmailBundle\Service;

/**
 * Turns an AI draft (plain text parts) into a finished, branded HTML email.
 * The model only writes the words; the layout lives here so every email looks designed:
 * a header in the brand colour with the logo, an optional photo, a headline block with an
 * optional highlighted offer, the message, a button and a footer.
 */
class EmailTemplate
{
    private const DEFAULT_COLOR = '#244697';
    private const SANS          = 'font-family:Arial,Helvetica,sans-serif;';

    /**
     * @param array{subject:string,preheader:string,heading:string,highlight?:string,paragraphs:string[],cta_label:string} $draft
     * @param array{name?:string,color?:string,logo?:string,photo?:string}                                                  $brand
     */
    public function render(array $draft, array $brand = [], string $ctaUrl = 'https://'): string
    {
        $e     = static fn (string $s): string => htmlspecialchars($s, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
        $color = $this->cleanColor($brand['color'] ?? '');
        $name  = trim((string) ($brand['name'] ?? ''));
        $logo  = $this->cleanUrl($brand['logo'] ?? '');
        $photo = $this->cleanUrl($brand['photo'] ?? '');

        $onColor = $this->textOn($color);
        $tint    = $this->mix($color, '#ffffff', 0.90);
        $dark    = $this->mix($color, '#000000', 0.55);
        $ink     = '#1F1F2E';
        // Large coloured text must stay readable: light brand colours use their dark shade instead.
        $accent  = '#FFFFFF' === $onColor ? $color : $dark;
        $muted   = '#5A5A6E';
        $sans    = self::SANS;

        // Header: logo if there is one, otherwise the brand name.
        if ('' !== $logo) {
            $brandMark = '<img src="'.$e($logo).'" alt="'.$e($name ?: 'Logo').'" height="44" style="display:block;height:44px;width:auto;max-width:240px;border:0;margin:0 auto;">';
        } else {
            $brandMark = '<div style="'.$sans.'font-size:22px;font-weight:bold;letter-spacing:3px;color:'.$onColor.';">'.$e(mb_strtoupper($name ?: 'Your brand')).'</div>';
        }
        // A logo needs a calm background to stay readable, so it sits on white with a colour bar on top.
        $header = '' !== $logo
            ? '<tr><td style="height:6px;line-height:6px;font-size:0;background-color:'.$color.';">&nbsp;</td></tr>'
              .'<tr><td align="center" style="padding:26px 32px;background-color:#ffffff;" class="pad">'.$brandMark.'</td></tr>'
            : '<tr><td align="center" style="padding:26px 32px;background-color:'.$color.';" class="pad">'.$brandMark.'</td></tr>';

        $photoRow = '' !== $photo
            ? '<tr><td><img src="'.$e($photo).'" width="600" alt="" style="display:block;width:100%;max-width:600px;height:auto;border:0;"></td></tr>'
            : '';

        $highlight = trim((string) ($draft['highlight'] ?? ''));
        $highlightHtml = '' !== $highlight
            ? '<div class="big" style="'.$sans.'font-size:60px;font-weight:bold;line-height:1;color:'.$accent.';margin-bottom:14px;">'.$e($highlight).'</div>'
            : '';

        $hero = '<tr><td align="center" style="padding:44px 44px 40px 44px;background-color:'.$tint.';" class="pad">'
            .$highlightHtml
            .'<div class="h1" style="'.$sans.'font-size:32px;font-weight:bold;line-height:1.2;color:'.$ink.';">'.$e($draft['heading']).'</div>'
            .'</td></tr>';

        $paragraphs = '';
        foreach ($draft['paragraphs'] as $p) {
            $paragraphs .= '<p style="margin:0 0 16px 0;">'.$e($p).'</p>';
        }
        $body = '<tr><td style="padding:36px 44px 8px 44px;'.$sans.'font-size:16px;line-height:1.65;color:'.$muted.';" align="left" class="pad">'.$paragraphs.'</td></tr>';

        $cta = '';
        if ('' !== trim($draft['cta_label'])) {
            $cta = '<tr><td align="center" style="padding:12px 44px 44px 44px;" class="pad">'
                .'<table role="presentation" cellpadding="0" cellspacing="0" align="center"><tr>'
                .'<td style="background-color:'.$color.';border-radius:999px;">'
                .'<a href="'.$e($ctaUrl).'" style="display:inline-block;padding:15px 34px;'.$sans.'font-size:15px;font-weight:bold;color:'.$onColor.';text-decoration:none;">'
                .$e($draft['cta_label']).'</a></td></tr></table></td></tr>';
        } else {
            $body .= '<tr><td style="height:28px;line-height:28px;font-size:0;">&nbsp;</td></tr>';
        }

        $footer = '<tr><td align="center" style="padding:30px 32px;background-color:'.$dark.';'.$sans.'" class="pad">'
            .('' !== $name ? '<div style="font-size:15px;font-weight:bold;letter-spacing:2px;color:#ffffff;">'.$e(mb_strtoupper($name)).'</div>' : '')
            .'<div style="margin-top:10px;font-size:12px;line-height:1.6;color:#ffffff;opacity:.75;">{unsubscribe_text}</div>'
            .'</td></tr>';

        return '<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">'
            .'<title>'.$e($draft['subject']).'</title>'
            .'<style>@media only screen and (max-width:620px){.wrap{width:100% !important}.pad{padding-left:24px !important;padding-right:24px !important}.h1{font-size:26px !important}.big{font-size:46px !important}}</style>'
            .'</head><body style="margin:0;padding:0;background-color:#F3F2F7;">'
            .'<div style="display:none;max-height:0;overflow:hidden;">'.$e($draft['preheader']).'</div>'
            .'<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#F3F2F7;"><tr><td align="center" style="padding:24px 12px;">'
            .'<table role="presentation" class="wrap" width="600" cellpadding="0" cellspacing="0" style="width:600px;max-width:600px;background-color:#ffffff;border-radius:14px;overflow:hidden;">'
            .$header.$photoRow.$hero.$body.$cta.$footer
            .'</table></td></tr></table></body></html>';
    }

    /** Only a 6-digit hex colour is accepted; anything else falls back to the default. */
    private function cleanColor(mixed $color): string
    {
        $color = is_string($color) ? trim($color) : '';

        return 1 === preg_match('/^#[0-9a-fA-F]{6}$/', $color) ? strtoupper($color) : self::DEFAULT_COLOR;
    }

    /** Only http(s) image URLs are accepted. */
    private function cleanUrl(mixed $url): string
    {
        $url = is_string($url) ? trim($url) : '';
        if ('' === $url || strlen($url) > 500 || 1 !== preg_match('#^https?://#i', $url)) {
            return '';
        }

        return false !== filter_var($url, FILTER_VALIDATE_URL) ? $url : '';
    }

    /** @return int[] */
    private function rgb(string $hex): array
    {
        return [hexdec(substr($hex, 1, 2)), hexdec(substr($hex, 3, 2)), hexdec(substr($hex, 5, 2))];
    }

    private function mix(string $a, string $b, float $amountOfB): string
    {
        [$r1, $g1, $b1] = $this->rgb($a);
        [$r2, $g2, $b2] = $this->rgb($b);

        return sprintf('#%02X%02X%02X', (int) round($r1 + ($r2 - $r1) * $amountOfB), (int) round($g1 + ($g2 - $g1) * $amountOfB), (int) round($b1 + ($b2 - $b1) * $amountOfB));
    }

    /** White text on dark colours, dark text on light ones. */
    private function textOn(string $color): string
    {
        [$r, $g, $b] = array_map(static function (int $c): float {
            $c /= 255;

            return $c <= 0.03928 ? $c / 12.92 : (($c + 0.055) / 1.055) ** 2.4;
        }, $this->rgb($color));
        $luminance = 0.2126 * $r + 0.7152 * $g + 0.0722 * $b;

        return $luminance > 0.45 ? '#1F1F2E' : '#FFFFFF';
    }
}
