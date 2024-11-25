<?php
session_start(); // Inicia ou continua a sessão
?>

<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pixel Store</title>
    <link rel="stylesheet" href="css/index.css">
</head>
<body>

    <!-- Cabeçalho -->
    <header>
        <nav class="menu">
            <!-- Logo da loja -->
            <img src="imagens/PIXEL LOGO.jpg" alt="Logo do site" class="logo">
            
            <!-- Menu de navegação -->
            <ul>
                <li><a href="index.php">Início</a></li>
                <li><a href="produtos.html">Produtos</a></li>
                <li><a href="hardware.html">Hardware</a></li>
                <li><a href="software.html">Software</a></li>
                <li><a href="jogos.html">Jogos</a></li>
            </ul>
            
            <!-- Botões de login e carrinho -->
            <a href="login.php"><button class="login-button">Login</button></a>
            <a href="carrinho.html"><button class="cart-button"><img src="imagens/carrinho preto.jpg" alt="Carrinho"></button></a>
        </nav>
    </header>

    <!-- Vídeo promocional abaixo do menu -->
    <div class="video-container">
        <video autoplay muted loop>
            <source src="imagens/videoplayback (1).mp4" type="video/mp4">
            Seu navegador não suporta vídeos.
        </video>
        <div class="overlay"></div> <!-- Overlay para efeito visual -->
    </div>
    <br>
    <!-- Seção de Cards de Produtos -->
    <div class="card-container">
        <!-- Card 1 -->
        <div class="card">
            <img src="imagens/ea fc 25 2.jpeg" alt="Imagem do FIFA 25">
            <h3>FIFA 25</h3>
            <p>Explore o mundo do futebol de uma maneira espetacular.</p>
            <button>Ver Mais</button>
        </div>

        <!-- Card 2 -->
        <div class="card">
            <img src="imagens/spotify.jpeg" alt="Imagem do Spotify">
            <h3>Spotify</h3>
            <p>Todos os sentimentos que você quiser na palma da mão.</p>
            <button>Ver Mais</button>
        </div>

        <!-- Card 3 -->
        <div class="card">
            <img src="imagens/the last of us.jpeg" alt="Imagem do The Last Of Us">
            <h3>The Last Of Us</h3>
            <p>Uma obra prima dos games e muitas emoções feita em pixels.</p>
            <button>Ver Mais</button>
        </div>

        <!-- Card 4 -->
        <div class="card">
            <img src="imagens/Placa de vídeo.png" alt="Imagem da Placa de Vídeo">
            <h3>RTX 3090</h3>
            <p>O poder de uma placa de vídeo como você nunca viu!</p>
            <button>Ver Mais</button>
        </div>

        <!-- Card 5 -->
        <div class="card">
            <img src="imagens/spiderman.jpeg" alt="Imagem do SpiderMan">
            <h3>SpiderMan</h3>
            <p>Experiência disponível exclusivamente nas plataformas PS5 e PS4.</p>
            <button>Ver Mais</button>
        </div>
    </div>

<!-- SOBRE NOS-->

    <div class="about-us-container">
        <h2>Sobre Nós</h2>
        <div class="about-us-cards">
            <div class="about-card">
                <h3>Nossa Missão</h3>
                <p>Oferecer produtos de qualidade e serviços digitais que garantem uma experiência única em cada compra, buscando sempre inovação.</p>
            </div>
            <div class="about-card">
                <h3>Visão</h3>
                <p>Ser a loja digital mais confiável e conhecida no universo de tecnologia e entretenimento, promovendo o que há de melhor no mundo digital.</p>
            </div>
            <div class="about-card">
                <h3>Valores</h3>
                <p>Respeito, inovação e compromisso com a satisfação dos nossos clientes, colocando sempre a qualidade em primeiro lugar.</p>
            </div>
        </div>
    </div>
    

    <!-- Rodapé -->
    <footer class="footer">
        <div class="footer-container">
            <div class="footer-section">
                <h3>Sobre Nós</h3>
                <p>Pixel Store é uma loja fictícia construída para fins de projeto acadêmico.</p>
            </div>
            <div class="footer-section">
                <h3>Links Úteis</h3>
                <ul>
                    <li><a href="index.html">Início</a></li>
                    <li><a href="produtos.html">Produtos</a></li>
                    <li><a href="hardware.html">Hardware</a></li>
                    <li><a href="software.html">Software</a></li>
                    <li><a href="jogos.html">Jogos</a></li>
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
