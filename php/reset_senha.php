<?php
include 'db_connection.php';  // Conexão com o banco de dados

if (isset($_GET['token'])) {
    $token = $_GET['token'];
    
    // Verificar se o token existe e se não expirou
    $stmt = $pdo->prepare("SELECT * FROM usuarios WHERE token_reset = ? AND token_expira > NOW()");
    $stmt->execute([$token]);
    $user = $stmt->fetch();
    
    if ($user) {
        // Mostrar o formulário para redefinir a senha
        echo '
        <form action="atualizar_senha.php" method="POST">
            <input type="password" name="nova_senha" placeholder="Digite a nova senha" required>
            <input type="hidden" name="token" value="' . $token . '">
            <button type="submit">Redefinir Senha</button>
        </form>';
    } else {
        echo "Token inválido ou expirado.";
    }
} else {
    echo "Token não fornecido.";
}
?>
