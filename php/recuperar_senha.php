<?php
// Conectar ao banco de dados
include 'db_connection.php';  // Verifique se o arquivo db_connection.php está correto e localizado na mesma pasta

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Verificar se o campo de e-mail foi enviado
    if (isset($_POST['email'])) {
        $email = $_POST['email'];
        
        // Conectar ao banco de dados
        $stmt = $pdo->prepare("SELECT * FROM usuarios WHERE email = ?");
        $stmt->execute([$email]);
        $user = $stmt->fetch();

        if ($user) {
            // Gerar token de redefinição
            $token = bin2hex(random_bytes(50));
            $expira = date("Y-m-d H:i:s", strtotime('+1 hour'));
            
            // Atualizar o banco de dados com o token
            $stmt = $pdo->prepare("UPDATE usuarios SET token_reset = ?, token_expira = ? WHERE email = ?");
            $stmt->execute([$token, $expira, $email]);

            // Enviar o e-mail com o link de redefinição
            $resetLink = "http://localhost/seu_projeto/reset_senha.php?token=" . $token;
            $subject = "Recuperação de Senha";
            $message = "Clique no link abaixo para redefinir sua senha:\n" . $resetLink;
            $headers = "From: no-reply@seusite.com";

            if (mail($email, $subject, $message, $headers)) {
                echo "Um link de recuperação foi enviado para o seu e-mail.";
            } else {
                echo "Erro ao enviar o e-mail.";
            }
        } else {
            echo "E-mail não encontrado.";
        }
    }
}
?>
