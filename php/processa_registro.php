<?php
// 1. Conectar ao banco de dados MySQL
$host = 'sql10.freedatabase.com';
$dbname = 'sql10740735';
$username = 'sql10740735';
$password = 'XAaQLQeJG9';
$port = 3306;

try {
    $conn = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    echo "Conexão realizada com sucesso!";
} catch (PDOException $e) {
    die("Erro na conexão com o banco de dados: " . $e->getMessage());
}


// 2. Capturar os dados do formulário
// Exemplo de inserção no PHP
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

if ($stmt->execute()) {
    echo "Usuário registrado com sucesso!";
} else {
    echo "Erro ao registrar o usuário.";
}
?>
