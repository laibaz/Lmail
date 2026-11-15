<?php

declare(strict_types=1);

namespace MauticPlugin\LmailBundle\EventSubscriber;

use Mautic\CoreBundle\CoreEvents;
use Mautic\CoreBundle\Event\CustomAssetsEvent;
use Mautic\CoreBundle\Helper\UserHelper;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpFoundation\RequestStack;

/**
 * Loads the LMAIL interface script on every logged-in page.
 */
class AssetsSubscriber implements EventSubscriberInterface
{
    public function __construct(private RequestStack $requestStack, private UserHelper $userHelper)
    {
    }

    public static function getSubscribedEvents(): array
    {
        return [
            CoreEvents::VIEW_INJECT_CUSTOM_ASSETS => ['injectAssets', 0],
        ];
    }

    public function injectAssets(CustomAssetsEvent $event): void
    {
        $request = $this->requestStack->getCurrentRequest();
        if (null === $request || 1 !== preg_match('/^\/s\//', $request->getPathInfo())) {
            return;
        }

        $user      = $this->userHelper->getUser();
        $firstName = $user ? (string) $user->getFirstName() : '';
        $event->addScriptDeclaration('window.LMAIL = '.json_encode(['firstName' => $firstName], JSON_HEX_TAG | JSON_HEX_AMP | JSON_HEX_APOS | JSON_HEX_QUOT).';');
        $event->addScript('plugins/LmailBundle/Assets/js/lmail.js');
    }
}
