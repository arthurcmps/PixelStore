<?php
$host = 'localhost';
$dbname = 'cadastro_usuario';
$username = 'root';
$password = '';

// Criar conexão com PDO
$conn = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

// Verificar se os dados foram enviados pelo formulário
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nome = isset($_POST['nome']) ? htmlspecialchars($_POST['nome']) : '';
    $sobrenome = isset($_POST['sobrenome']) ? htmlspecialchars($_POST['sobrenome']) : '';
    $email = isset($_POST['email']) ? htmlspecialchars($_POST['email']) : '';
    $senha = isset($_POST['senha']) ? $_POST['senha'] : '';
    $termos_aceitos = isset($_POST['termos_aceitos']) ? 1 : 0;

    // Validar campos obrigatórios
    if (empty($nome) || empty($sobrenome) || empty($email) || empty($senha)) {
        die("Por favor, preencha todos os campos obrigatórios.");
    }

    // Hash da senha
    $senha_hash = password_hash($senha, PASSWORD_DEFAULT);

    // Inserir dados no banco de dados com PDO
    try {
        $stmt = $conn->prepare("INSERT INTO usuarios (nome, sobrenome, email, senha_hash, termos_aceitos) VALUES (:nome, :sobrenome, :email, :senha_hash, :termos_aceitos)");
        $stmt->bindParam(':nome', $nome);
        $stmt->bindParam(':sobrenome', $sobrenome);
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':senha_hash', $senha_hash);
        $stmt->bindParam(':termos_aceitos', $termos_aceitos, PDO::PARAM_INT);

        if ($stmt->execute()) {
            // Redireciona para a página de login após o registro
            header('Location: ../login.php');
            exit; // Garante que o script pare após o redirecionamento
        } else {
            echo "Erro ao inserir registro.";
        }
    } catch (PDOException $e) {
        die("Erro ao inserir dados: " . $e->getMessage());
    }
} else {
    die("Acesso inválido.");
}

// Fechar conexão
$stmt = null;
$conn = null;
?>
