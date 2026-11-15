<?php

declare(strict_types=1);

namespace MauticPlugin\LmailBundle\Service;

/**
 * Turns an AI draft (plain text parts) into a finished LMAIL-styled HTML email.
 * The model only writes the words; the layout lives here so every email looks consistent.
 */
class EmailTemplate
{
    /**
     * @param array{subject:string,preheader:string,heading:string,paragraphs:string[],cta_label:string} $draft
     */
    public function render(array $draft, string $ctaUrl = 'https://'): string
    {
        $e          = static fn (string $s): string => htmlspecialchars($s, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
        $paragraphs = '';
        foreach ($draft['paragraphs'] as $p) {
            $paragraphs .= '<p style="margin:0 0 16px 0;">'.$e($p).'</p>';
        }

        $cta = '';
        if ('' !== trim($draft['cta_label'])) {
            $cta = '<tr><td style="padding:8px 40px 36px 40px;" align="left">'
                .'<table role="presentation" cellpadding="0" cellspacing="0"><tr>'
                .'<td style="background-color:#244697;border-radius:999px;">'
                .'<a href="'.$e($ctaUrl).'" style="display:inline-block;padding:14px 30px;font-family:Arial,Helvetica,sans-serif;font-size:15px;font-weight:bold;color:#ffffff;text-decoration:none;">'
                .$e($draft['cta_label']).'</a></td></tr></table></td></tr>';
        }

        return '<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">'
            .'<title>'.$e($draft['subject']).'</title></head>'
            .'<body style="margin:0;padding:0;background-color:#f6f4fa;">'
            .'<div style="display:none;max-height:0;overflow:hidden;">'.$e($draft['preheader']).'</div>'
            .'<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f6f4fa;"><tr><td align="center" style="padding:32px 16px;">'
            .'<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background-color:#ffffff;border-radius:16px;overflow:hidden;">'
            .'<tr><td style="height:6px;background-color:#DB82AF;background-image:linear-gradient(90deg,#DB82AF,#7458A0,#244697);font-size:0;line-height:0;">&nbsp;</td></tr>'
            .'<tr><td style="padding:36px 40px 8px 40px;font-family:Arial,Helvetica,sans-serif;color:#17172b;" align="left">'
            .'<div style="font-size:26px;font-weight:bold;line-height:1.25;">'.$e($draft['heading']).'</div></td></tr>'
            .'<tr><td style="padding:12px 40px 8px 40px;font-family:Arial,Helvetica,sans-serif;color:#3d3d55;font-size:16px;line-height:1.6;" align="left">'
            .$paragraphs.'</td></tr>'
            .$cta
            .'<tr><td style="padding:0 40px;"><div style="border-top:1px solid #e6e2ee;"></div></td></tr>'
            .'<tr><td style="padding:20px 40px 28px 40px;font-family:Arial,Helvetica,sans-serif;color:#8a889c;font-size:12px;line-height:1.6;" align="left">'
            .'{unsubscribe_text}</td></tr>'
            .'</table></td></tr></table></body></html>';
    }
}
