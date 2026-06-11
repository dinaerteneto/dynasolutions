<?php

require_once __DIR__ . '/../vendor/autoload.php';

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

$config = require __DIR__ . '/../config/email.php';

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
    $mail->addAddress($config['from']);
    $mail->addReplyTo($email, $name);

    $mail->Subject = 'Novo contato pelo site Dyna Solutions';
    $mail->Body = "Nome: $name\nE-mail: $email\n\nMensagem:\n$message\n";

    $mail->send();
    header('Location: /contato?status=success#form');
    exit;
} catch (Exception $e) {
    header('Location: /contato?status=error&msg=' . urlencode('Erro ao enviar. Tente novamente mais tarde.'));
    exit;
}
