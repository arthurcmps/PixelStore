const headerHTML = `
    <nav class="menu">
        <img src="imagens/PIXEL LOGO.jpg" alt="Logo do site" class="logo">
        <ul>
            <li><a href="index.html">Início</a></li>
            <li><a href="produtos.html">Produtos</a></li>
            <li><a href="hardware.html">Hardware</a></li>
            <li><a href="software.html">Software</a></li>
            <li><a href="jogos.html">Jogos</a></li>
        </ul>
        
        <div id="user-area" style="display: flex; align-items: center; gap: 15px;">
            <a href="login.html" id="btn-login-header">
                <button class="login-button">Login</button>
            </a>
            <a href="perfil.html" id="icon-perfil-header" style="display: none; text-decoration: none;">
                <div style="width: 40px; height: 40px; background-color: #4CAF50; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 20px; font-weight: bold; border: 2px solid white; box-shadow: 0 2px 5px rgba(0,0,0,0.2);">U</div>
            </a>
            <a href="carrinho.html">
                <button class="cart-button"><img src="imagens/carrinho preto.jpg" alt="Carrinho"></button>
            </a>
        </div>
    </nav>
`;

const footerHTML = `
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
        <p>&copy; 2026 Pixel Store. Todos os direitos reservados.</p>
    </div>
`;

// Função que injeta o HTML nos espaços reservados
function renderizarLayout() {
    const cabecalho = document.getElementById('meu-cabecalho');
    const rodape = document.getElementById('meu-rodape');

    if (cabecalho) cabecalho.innerHTML = headerHTML;
    if (rodape) rodape.innerHTML = footerHTML;
}

// Executa a função imediatamente
renderizarLayout();