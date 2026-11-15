<?php

declare(strict_types=1);

namespace MauticPlugin\LmailBundle;

use Mautic\PluginBundle\Bundle\PluginBundleBase;

/**
 * LMAIL plugin: reshapes the Mautic interface for LMAIL and adds the AI email writer.
 */
class LmailBundle extends PluginBundleBase
{
    public function boot(): void
    {
        parent::boot();

        // The Anthropic SDK is installed inside this plugin (composer install in this folder),
        // so Mautic's own dependencies stay untouched.
        $autoload = __DIR__.'/vendor/autoload.php';
        if (is_file($autoload)) {
            require_once $autoload;
        }
    }
}
