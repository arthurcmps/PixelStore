<?php
include('php/conexao.php'); // Incluindo o arquivo de conexão

if ($_SERVER['REQUEST_METHOD'] === 'POST') { // Garante que o formulário foi enviado via POST

    // Verifica se os campos foram enviados e não estão vazios
    $email = isset($_POST['email']) ? $_POST['email'] : null;
    $senha = isset($_POST['senha']) ? $_POST['senha'] : null;

    if (empty($email)) {
        echo "Preencha seu e-mail";
    } elseif (empty($senha)) {
        echo "Preencha sua senha";
    } else {
        // Protege contra SQL Injection (usando PDO e declarações preparadas)
        $query = "SELECT * FROM usuarios WHERE email = :email AND senha = :senha";
        $stmt = $conn->prepare($query);  // Usando a conexão PDO
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':senha', $senha);
        $stmt->execute();

        // Verifica se encontrou o usuário
        if ($stmt->rowCount() == 1) {
            $usuario = $stmt->fetch(PDO::FETCH_ASSOC);

            // Inicia a sessão
            if (!isset($_SESSION)) {
                session_start();
            }

            $_SESSION['id'] = $usuario['id'];
            $_SESSION['nome'] = $usuario['nome'];

            // Redireciona para o painel
            header("Location: index.php");
            exit;
        } else {
            echo "Falha ao logar! E-mail ou senha incorretos";
        }
    }
}
?>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/login.css">
    <title>Login Pixel</title>
</head>
<body>

   <!-- Cabeçalho -->
   <header>
    <nav class="menu">
        <!-- Logo da loja -->
        <img src="../PixelStore/imagens/PIXEL LOGO.jpg" alt="Logo do site" class="logo">
        
        <!-- Menu de navegação -->
        <ul>
            <li><a href="index.php  ">Início</a></li>
            <li><a href="produtos.html">Produtos</a></li>
            <li><a href="hardware.html">Hardware</a></li>
            <li><a href="software.html">Software</a></li>
            <li><a href="jogos.html">Jogos</a></li>
        </ul>
        
        <!-- Botões de login e carrinho -->
        <a href="login.php"><button class="login-button">Login</button></a>
        <a href="carrinho.html"><button class="cart-button"><img src="../PixelStore /imagens/carrinho preto.jpg" alt="Carrinho"></button></a>
    </nav>
</header>

    </nav>
    <br><br><br><br><br><br><br>

    <h1>DIGITE SEU EMAIL E SENHA</h1>
    <!--LOGIN-->
        <div class="login-container">
            <div class="login-form">
                <h2>Login</h2>
                <form action="" method="POST">
                    <label for="email">Email:</label>
                    <input type="email" id="email" name="email" placeholder="Digite seu email" required>
                    
                    <label for="password">Senha:</label>
                    <input type="password" name="senha" placeholder="Digite sua senha" required>
    
                    <button type="submit" class="login-btn">Enviar</button>
                    
                    <a href="senha.html" class="forgot-password">Esqueceu sua senha?</a>
                    <br>
                    <a href="signup.html" class="creat-login">Criar conta</a>
                </form>
            </div>
            <div class="login-image">
                <img src="imagens/banner com jogos 2.jpg" alt="Login Image">
            </div>
        </div>
<br><br><br><br><br><br><br><br>
        <!-- Rodapé -->
<footer class="footer">
    <div class="footer-container">
        <div class="footer-section">
            <h3>Sobre Nós</h3>
            <p>Pixel Store é uma loja ficticia apenas construida para o intuito de entrega de projeto academico</p>
        </div>
        <div class="footer-section">
            <h3>Links Úteis</h3>
            <ul>
                <li><a href="./home.html">Inicio</a></li>
                <li><a href="./produtos.html">Produtos</a></li>
                <li><a href="./hardware.html">Hardware</a></li>
                <li><a href="./software.html">Software</a></li>
                <li><a href="./jogos.html">Jogos</a></li>
            </ul>
        </div>
        <div class="footer-section">
            <h3>Contato</h3>
            <p>Email: contato@pixelstore.com</p>
            <p>Telefone: (11) 1234-5678</p>
        </div>
    </div>
    <div class="footer-bottom">
        <p>&copy; 2024 Pixel Store. Todos os direitos reservados.</p>
    </div>
</footer>

</body>
</html>
