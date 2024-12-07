<?php
// Dados para conexão com o banco de dados MySQL
$host = 'localhost'; // ou o IP do seu servidor MySQL
$dbname = 'cadastro_usuario'; // Substitua pelo nome do seu banco de dados
$username = 'root'; // Seu nome de usuário do banco de dados
$password = ''; // Sua senha do banco de dados

try {
    // Estabelecendo a conexão com o banco de dados usando PDO
    $conn = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    
    // Definindo o modo de erro para exceções (caso haja erros, ele exibirá uma exceção)
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    // Caso haja erro na conexão, exibe a mensagem de erro
    die("Erro na conexão com o banco de dados: " . $e->getMessage());
}
?>
