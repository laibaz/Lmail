<?php

return [
    'name'        => 'LMAIL',
    'description' => 'LMAIL interface and AI email writer.',
    'version'     => '1.0.0',
    'author'      => 'Laib Studios',
    'routes'      => [
        'main' => [
            'lmail_ai_draft' => [
                'path'       => '/lmail/ai/draft',
                'controller' => 'MauticPlugin\LmailBundle\Controller\AiController::draftAction',
                'method'     => 'POST',
            ],
        ],
    ],
];
