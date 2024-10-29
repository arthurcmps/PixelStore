<?php
header("Content-Type: application/json");
include 'processa_registro.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Exemplo de query para buscar dados de uma tabela chamada 'usuarios'
    $sql = "SELECT * FROM usuarios";
    $stmt = $pdo->prepare($sql);
    $stmt->execute();
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($result);
} else {
    echo json_encode(['erro' => 'Método não suportado']);
}
?>
