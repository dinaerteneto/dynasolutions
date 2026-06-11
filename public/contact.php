<?php

$autoload = __DIR__ . '/../vendor/autoload.php';
if (!file_exists($autoload)) {
    error_log('[contact.php] vendor/autoload.php not found at: ' . $autoload);
    header('Location: /contato?status=error&msg=' . urlencode('Erro de config. Contate o admin.'));
    exit;
}

require_once $autoload;

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: /contato');
    exit;
}

if (!empty($_POST['_website'])) {
    header('Location: /contato');
    exit;
}

$name = trim($_POST['name'] ?? '');
$email = trim($_POST['email'] ?? '');
$message = trim($_POST['message'] ?? '');

$errors = [];
if ($name === '') $errors[] = 'Nome é obrigatório.';
if ($email === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) $errors[] = 'E-mail inválido.';
if ($message === '') $errors[] = 'Mensagem é obrigatória.';

if (!empty($errors)) {
    header('Location: /contato?status=error&msg=' . urlencode(implode(' ', $errors)));
    exit;
}

$configPath = __DIR__ . '/../config/email.php';
if (!file_exists($configPath)) {
    error_log('[contact.php] config/email.php not found');
    header('Location: /contato?status=error&msg=' . urlencode('Erro de config. Contate o admin.'));
    exit;
}

$config = require $configPath;

if (empty($config['password'])) {
    error_log('[contact.php] SMTP password is empty');
    header('Location: /contato?status=error&msg=' . urlencode('Erro de config. Contate o admin.'));
    exit;
}

$mail = new PHPMailer(true);

try {
    $mail->isSMTP();
    $mail->Host = $config['host'];
    $mail->SMTPAuth = true;
    $mail->Username = $config['username'];
    $mail->Password = $config['password'];
    $mail->SMTPSecure = $config['encryption'];
    $mail->Port = $config['port'];
    $mail->CharSet = 'UTF-8';

    $mail->setFrom($config['from'], $config['from_name']);
    $mail->addAddress($config['to'], $config['to_name']);
    $mail->addReplyTo($email, $name);

    $mail->Subject = 'Novo contato pelo site Dyna Solutions';
    $mail->Body = "Nome: $name\nE-mail: $email\n\nMensagem:\n$message\n";

    $mail->send();
    header('Location: /contato?status=success#form');
    exit;
} catch (Exception $e) {
    error_log('[contact.php] PHPMailer error: ' . $e->getMessage());
    header('Location: /contato?status=error&msg=' . urlencode('Erro ao enviar. Tente novamente mais tarde.'));
    exit;
} catch (\Throwable $e) {
    error_log('[contact.php] Unexpected error: ' . $e->getMessage());
    header('Location: /contato?status=error&msg=' . urlencode('Erro ao enviar. Tente novamente mais tarde.'));
    exit;
}
