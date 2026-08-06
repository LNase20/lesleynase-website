<?php
/**
 * Handles submissions from contact.html's form.
 * Update TO_EMAIL below to the address that should receive inquiries.
 */

declare(strict_types=1);

const TO_EMAIL = 'hello@lesleynase.com';
const SITE_NAME = 'Lesley Nase';

function redirect_with(string $status): void
{
    header('Location: contact.html?' . $status . '=1');
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    redirect_with('error');
}

// Honeypot: bots tend to fill every field, humans never see this one.
if (!empty($_POST['website'])) {
    redirect_with('success');
}

$name    = trim((string) ($_POST['name'] ?? ''));
$email   = trim((string) ($_POST['email'] ?? ''));
$phone   = trim((string) ($_POST['phone'] ?? ''));
$service = trim((string) ($_POST['service'] ?? ''));
$message = trim((string) ($_POST['message'] ?? ''));

if ($name === '' || $email === '' || $message === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    redirect_with('error');
}

function clean_line(string $value): string
{
    // Strip anything that could be used for header injection.
    return trim(str_replace(["\r", "\n"], '', $value));
}

$name    = clean_line($name);
$email   = clean_line($email);
$phone   = clean_line($phone);
$service = clean_line($service);

$subject = sprintf('[%s] New inquiry from %s', SITE_NAME, $name);

$body  = "You have a new contact form submission:\n\n";
$body .= "Name: {$name}\n";
$body .= "Email: {$email}\n";
$body .= 'Phone: ' . ($phone !== '' ? $phone : 'Not provided') . "\n";
$body .= 'Service: ' . ($service !== '' ? $service : 'Not specified') . "\n\n";
$body .= "Message:\n{$message}\n";

$headers = [
    'From: ' . SITE_NAME . ' <no-reply@' . ($_SERVER['HTTP_HOST'] ?? 'localhost') . '>',
    'Reply-To: ' . $email,
    'Content-Type: text/plain; charset=UTF-8',
];

$sent = mail(TO_EMAIL, $subject, $body, implode("\r\n", $headers));

redirect_with($sent ? 'success' : 'error');
