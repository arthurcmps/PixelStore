<?php
session_start();
include("conexao.php"); // Incluindo o arquivo de conexão

// Verifique se a conexão foi bem-sucedida
if (!$conn) {
    die("Erro na conexão com o banco de dados.");
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_POST['email'];
    $senha_atual = $_POST['senha_atual'];
    $nova_senha = $_POST['nova_senha'];

    // Verifica se o e-mail existe
    $query = "SELECT * FROM usuarios WHERE email = :email";
    $stmt = $conn->prepare($query);
    $stmt->bindParam(':email', $email);
    $stmt->execute();
    $usuario = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($usuario) {
        // Verifica se a senha atual corresponde à do banco de dados
        if (password_verify($senha_atual, $usuario['senha'])) {
            // Se a senha atual estiver correta, atualize a senha
            $nova_senha_hash = password_hash($nova_senha, PASSWORD_DEFAULT);
            $update_query = "UPDATE usuarios SET senha = :nova_senha WHERE email = :email";
            $update_stmt = $conn->prepare($update_query);
            $update_stmt->bindParam(':nova_senha', $nova_senha_hash);
            $update_stmt->bindParam(':email', $email);
            $update_stmt->execute();

            echo "Senha alterada com sucesso!";
        } else {
            echo "Senha atual incorreta!";
        }
    } else {
        echo "Usuário não encontrado!";
    }
}
?>
