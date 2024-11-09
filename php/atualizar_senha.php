<?php
include 'db_connection.php';  // Conexão com o banco de dados

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nova_senha = $_POST['nova_senha'];
    $token = $_POST['token'];
    
    // Validar o token novamente
    $stmt = $pdo->prepare("SELECT * FROM usuarios WHERE token_reset = ?");
    $stmt->execute([$token]);
    $user = $stmt->fetch();
    
    if ($user) {
        // Atualizar a senha no banco de dados
        $hashed_password = password_hash($nova_senha, PASSWORD_DEFAULT);  // Hash da senha para segurança
        
        $stmt = $pdo->prepare("UPDATE usuarios SET senha = ?, token_reset = NULL, token_expira = NULL WHERE token_reset = ?");
        $stmt->execute([$hashed_password, $token]);
        
        echo "Senha atualizada com sucesso.";
    } else {
        echo "Token inválido ou expirado.";
    }
}
?>
