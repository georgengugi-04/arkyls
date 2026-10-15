<?php
declare(strict_types=1);

/**
 * POST /api/contact.php  (JSON in, JSON out)
 * Validates, rate-limits and stores a contact-form message using PDO prepared statements.
 */
require __DIR__ . '/config.php';

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('Cache-Control: no-store');

function respond(int $status, array $body): never {
    http_response_code($status);
    echo json_encode($body, JSON_UNESCAPED_UNICODE);
    exit;
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST');
    respond(405, ['error' => 'Method not allowed.']);
}

$allowed = $config['allowed_origins'];
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if ($origin !== '') {
    if (!in_array($origin, $allowed, true)) respond(403, ['error' => 'Origin not allowed.']);
    header("Access-Control-Allow-Origin: $origin");
    header('Vary: Origin');
}

$input = json_decode(file_get_contents('php://input') ?: '', true);
if (!is_array($input)) respond(400, ['error' => 'Invalid request body.']);

// Honeypot: pretend success so bots learn nothing.
if (trim((string)($input['website'] ?? '')) !== '') respond(200, ['ok' => true]);

$services = ['Residential Design', 'Commercial Design', 'Sustainable Design', 'Urban Planning', 'Interior Design', 'Landscape Architecture', 'Other'];
$name    = trim((string)($input['name'] ?? ''));
$email   = trim((string)($input['email'] ?? ''));
$subject = trim((string)($input['subject'] ?? ''));
$service = trim((string)($input['service'] ?? ''));
$message = trim((string)($input['message'] ?? ''));

$fields = [];
if (mb_strlen($name) < 2 || mb_strlen($name) > 100)         $fields['name'] = 'Please enter your full name';
if (!filter_var($email, FILTER_VALIDATE_EMAIL) || strlen($email) > 255) $fields['email'] = 'Enter a valid email address';
if (mb_strlen($subject) < 3 || mb_strlen($subject) > 150)   $fields['subject'] = 'Please add a short subject';
if ($service !== '' && !in_array($service, $services, true)) $fields['service'] = 'Unknown service';
if (mb_strlen($message) < 10 || mb_strlen($message) > 4000) $fields['message'] = 'Message must be 10–4000 characters';
if ($fields) respond(422, ['error' => 'Please fix the highlighted fields.', 'fields' => $fields]);

try {
    $pdo = db($config);

    // Simple per-IP throttle: max 5 messages / 10 minutes.
    $ip = substr((string)($_SERVER['REMOTE_ADDR'] ?? ''), 0, 45);
    $q = $pdo->prepare('SELECT COUNT(*) FROM messages WHERE ip = ? AND created_at > (NOW() - INTERVAL 10 MINUTE)');
    $q->execute([$ip]);
    if ((int)$q->fetchColumn() >= 5) respond(429, ['error' => 'Too many messages. Please try again in a few minutes.']);

    $stmt = $pdo->prepare('INSERT INTO messages (name, email, subject, service, message, ip) VALUES (?, ?, ?, ?, ?, ?)');
    $stmt->execute([$name, $email, $subject, $service !== '' ? $service : null, $message, $ip]);
} catch (Throwable $e) {
    error_log('[arkyls] contact insert failed: ' . $e->getMessage());
    respond(500, ['error' => 'We could not save your message. Please email us directly.']);
}

respond(201, ['ok' => true]);
