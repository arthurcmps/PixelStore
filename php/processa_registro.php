<?php
// 1. Conectar ao banco de dados MySQL
$host = 'localhost';
$dbname = 'db_pixelstore';
$username = 'root';
$password = '';

try {
    $conn = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    echo "Conexão realizada com sucesso!";
} catch (PDOException $e) {
    die("Erro na conexão com o banco de dados: " . $e->getMessage());
}

// 2. Capturar os dados do formulário
// Certifique-se de que os dados estão chegando do formulário corretamente
$email = isset($_POST['email']) ? $_POST['email'] : null;
$nome = isset($_POST['nome']) ? $_POST['nome'] : null;
$sobrenome = isset($_POST['sobrenome']) ? $_POST['sobrenome'] : null;
$cep = isset($_POST['cep']) ? $_POST['cep'] : null;
$rua = isset($_POST['rua']) ? $_POST['rua'] : null;
$numero = isset($_POST['numero']) ? $_POST['numero'] : null;
$complemento = isset($_POST['complemento']) ? $_POST['complemento'] : null;
$bairro = isset($_POST['bairro']) ? $_POST['bairro'] : null;
$cidade = isset($_POST['cidade']) ? $_POST['cidade'] : null;
$estado = isset($_POST['estado']) ? $_POST['estado'] : null;
$senha = isset($_POST['senha']) ? $_POST['senha'] : null;
$termos_aceitos = isset($_POST['termos_aceitos']) ? $_POST['termos_aceitos'] : null;

// Verificar se todos os campos obrigatórios foram preenchidos
if (empty($email) || empty($nome) || empty($senha) || empty($termos_aceitos) || empty($cep) || empty($rua) || empty($numero) || empty($bairro) || empty($cidade) || empty($estado)) {
    die('Erro: Todos os campos obrigatórios devem ser preenchidos.');
}

// 3. Inserir os dados no banco de dados
$sql = "INSERT INTO usuarios (email, nome, sobrenome, cep, rua, numero, complemento, bairro, cidade, estado, senha, termos_aceitos)
        VALUES (:email, :nome, :sobrenome, :cep, :rua, :numero, :complemento, :bairro, :cidade, :estado, :senha, :termos_aceitos)";
$stmt = $conn->prepare($sql);

$stmt->bindParam(':email', $email);
$stmt->bindParam(':nome', $nome);
$stmt->bindParam(':sobrenome', $sobrenome);
$stmt->bindParam(':cep', $cep);
$stmt->bindParam(':rua', $rua);
$stmt->bindParam(':numero', $numero);
$stmt->bindParam(':complemento', $complemento);
$stmt->bindParam(':bairro', $bairro);
$stmt->bindParam(':cidade', $cidade);
$stmt->bindParam(':estado', $estado);
$stmt->bindParam(':senha', $senha);
$stmt->bindParam(':termos_aceitos', $termos_aceitos);

try {
    if ($stmt->execute()) {
        echo "Usuário registrado com sucesso!";
    } else {
        echo "Erro ao registrar o usuário.";
    }
} catch (PDOException $e) {
    echo "Erro: " . $e->getMessage();
}
?>
