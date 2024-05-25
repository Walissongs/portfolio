<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'path/to/PHPMailer/src/Exception.php';
require 'path/to/PHPMailer/src/PHPMailer.php';
require 'path/to/PHPMailer/src/SMTP.php';
require 'path/to/config.php';  // Inclui o arquivo de configuração

$mail = new PHPMailer(true); // Ativa exceções

try {
    // Configurações do servidor SMTP
    $mail->isSMTP();
    $mail->Host = SMTP_HOST;
    $mail->SMTPAuth = true;
    $mail->Username = SMTP_USERNAME;
    $mail->Password = SMTP_PASSWORD;
    $mail->SMTPSecure = 'tls';
    $mail->Port = 587;

    // Remetente e destinatário
    $mail->setFrom(MAIL_FROM, MAIL_FROM_NAME);
    $mail->addAddress(MAIL_TO); // Adiciona um destinatário

    // Captura dados do formulário via POST
    $subject = $_POST['subject'] ?? 'Default Subject';
    $message = $_POST['message'] ?? 'Default Message';

    // Conteúdo do email
    $mail->isHTML(true);  // Define o formato do email para HTML
    $mail->Subject = htmlspecialchars($subject);
    $mail->Body    = htmlspecialchars($message);

    $mail->send();
    echo json_encode(['error' => false]);
} catch (Exception $e) {
    echo json_encode(['error' => "Mailer Error: " . $mail->ErrorInfo]);
}
