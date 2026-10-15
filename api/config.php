<?php
declare(strict_types=1);

/** Credentials come from environment variables so none are committed. Defaults suit local XAMPP. */
$config = [
    'db_host' => getenv('ARKYLS_DB_HOST') ?: 'localhost',
    'db_name' => getenv('ARKYLS_DB_NAME') ?: 'arkyls',
    'db_user' => getenv('ARKYLS_DB_USER') ?: 'root',
    'db_pass' => getenv('ARKYLS_DB_PASS') ?: '',
    // Extra origins allowed to call the API (same-origin requests need no entry).
    'allowed_origins' => array_filter(explode(',', getenv('ARKYLS_ALLOWED_ORIGINS') ?: 'http://localhost:5173')),
];

function db(array $c): PDO {
    static $pdo = null;
    return $pdo ??= new PDO(
        "mysql:host={$c['db_host']};dbname={$c['db_name']};charset=utf8mb4",
        $c['db_user'],
        $c['db_pass'],
        [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION, PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC, PDO::ATTR_EMULATE_PREPARES => false],
    );
}
