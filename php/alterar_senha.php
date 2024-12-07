<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = $_POST['email'];
    $novaSenha = $_POST['nova_senha'];

    // Validar entrada
    if (empty($email) || empty($novaSenha)) {
        die("Por favor, preencha todos os campos.");
    }

    // Conectar ao banco de dados
    $conn = new PDO("mysql:host=localhost;dbname=cadastro_usuario", "root", "");
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Verificar se o e-mail existe
    $stmt = $conn->prepare("SELECT id FROM usuarios WHERE email = :email");
    $stmt->bindParam(':email', $email);
    $stmt->execute();

    $usuario = $stmt->fetch(PDO::FETCH_ASSOC);
    if (!$usuario) {
        die("E-mail não encontrado. Por favor, verifique e tente novamente.");
    }

    // Hash da nova senha
    $novaSenhaHash = password_hash($novaSenha, PASSWORD_DEFAULT);

    // Atualizar a senha no banco
    try {
        $stmt = $conn->prepare("UPDATE usuarios SET senha_hash = :nova_senha WHERE email = :email");
        $stmt->bindParam(':nova_senha', $novaSenhaHash);
        $stmt->bindParam(':email', $email);

        if ($stmt->execute()) {
            echo "Senha alterada com sucesso!";
        } else {
            echo "Erro ao atualizar senha.";
        }
    } catch (PDOException $e) {
        die("Erro ao alterar senha: " . $e->getMessage());
    }
}
?>
