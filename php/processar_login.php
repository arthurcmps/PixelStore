<?php
session_start(); // Inicia ou continua a sessão

// Configurações do banco de dados
$host = 'localhost';
$dbname = 'cadastro_usuario';
$username = 'root';
$password = '';

try {
    // Conexão com o banco de dados
    $conn = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Erro ao conectar ao banco de dados: " . $e->getMessage());
}

// Obter os dados enviados pelo formulário
$email = $_POST['email'] ?? '';
$senha = $_POST['password'] ?? '';

// Verificar se os campos estão preenchidos
if (empty($email) || empty($senha)) {
    $_SESSION['login_error'] = "Por favor, preencha todos os campos.";
    header("Location: login.php");
    exit;
}

try {
    // Consulta ao banco para validar o usuário
    $stmt = $conn->prepare("SELECT id, nome, senha_hash FROM usuarios WHERE email = :email");
    $stmt->bindParam(':email', $email);
    $stmt->execute();

    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    // Verificar se o usuário existe e a senha está correta
    if ($user && password_verify($senha, $user['senha_hash'])) {
        // Credenciais corretas, cria a sessão
        $_SESSION['user'] = [
            'id' => $user['id'],
            'nome' => $user['nome'],
        ];

        // Redirecionar para a página inicial
        header("Location: dashbord.php");
        exit;
    } else {
        // Credenciais incorretas
        $_SESSION['login_error'] = "E-mail ou senha inválidos.";
        header("Location: login.php");
        exit;
    }
} catch (PDOException $e) {
    // Erro ao consultar o banco
    die("Erro ao consultar o banco de dados: " . $e->getMessage());
}
?>
