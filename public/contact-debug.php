<?php
header('Content-Type: text/plain; charset=utf-8');

echo "=== Dyna Solutions - Debug do Contact ===\n\n";

// 1. Check autoload
$autoload = __DIR__ . '/../vendor/autoload.php';
echo "[1] vendor/autoload.php\n";
echo "    Path: $autoload\n";
echo "    Exists: " . (file_exists($autoload) ? "SIM" : "NÃO") . "\n\n";

if (!file_exists($autoload)) {
    echo "ERRO: vendor/ nao encontrado. Rodou 'composer install' no servidor?\n";
    exit;
}

require_once $autoload;
echo "[OK] Autoload carregado\n\n";

// 2. Check config
$configPath = __DIR__ . '/../config/email.php';
echo "[2] config/email.php\n";
echo "    Path: $configPath\n";
echo "    Exists: " . (file_exists($configPath) ? "SIM" : "NÃO") . "\n\n";

if (!file_exists($configPath)) {
    echo "ERRO: config/email.php nao encontrado.\n";
    exit;
}

$config = require $configPath;
echo "[OK] Config carregado\n\n";

// 3. Check config values
echo "[3] Valores do config:\n";
echo "    host:       " . ($config['host'] ?? 'INDEFINIDO') . "\n";
echo "    port:       " . ($config['port'] ?? 'INDEFINIDO') . "\n";
echo "    encryption: " . ($config['encryption'] ?? 'INDEFINIDO') . "\n";
echo "    username:   " . ($config['username'] ?? 'INDEFINIDO') . "\n";
echo "    password:   " . (empty($config['password']) ? 'VAZIO' : 'PREENCHEIDO') . "\n";
echo "    from:       " . ($config['from'] ?? 'INDEFINIDO') . "\n";
echo "    to:         " . ($config['to'] ?? 'INDEFINIDO') . "\n\n";

if (empty($config['password'])) {
    echo "ERRO: Senha SMTP vazia em config/email.php\n";
    exit;
}

// 4. Test SMTP connection (only if accessed with ?test)
if (isset($_GET['test'])) {
    echo "[4] Testando conexao SMTP...\n\n";

    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;

    $mail = new PHPMailer(true);

    try {
        $mail->isSMTP();
        $mail->Host       = $config['host'];
        $mail->SMTPAuth   = true;
        $mail->Username   = $config['username'];
        $mail->Password   = $config['password'];
        $mail->SMTPSecure = $config['encryption'];
        $mail->Port       = $config['port'];
        $mail->CharSet    = 'UTF-8';
        $mail->Timeout    = 15;

        $mail->setFrom($config['from'], $config['from_name']);
        $mail->addAddress($config['to'], $config['to_name']);
        $mail->Subject = 'Teste de config Dyna Solutions';
        $mail->Body = 'Este e um e-mail de teste. Se recebeu, o SMTP esta OK.';

        $mail->send();
        echo "[OK] E-mail de teste enviado para {$config['to']}!\n";
    } catch (Exception $e) {
        echo "[ERRO] PHPMailer: " . $e->getMessage() . "\n";
    } catch (\Throwable $e) {
        echo "[ERRO] Inesperado: " . $e->getMessage() . "\n";
    }
} else {
    echo "[4] Para testar o SMTP, acesse com ?test no final da URL.\n";
    echo "    Ex: https://dynasolutions.com.br/contact-debug.php?test\n\n";
}

echo "=== Fim do debug ===\n";
