// 1. Definimos o Ícone SVG do Carrinho (Transparente e vetorial)
const carrinhoIconSVG = `
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M2.1157 1.21854C1.84157 1.0768 1.4938 1.1822 1.34686 1.4485C1.19992 1.7148 1.31139 2.04943 1.58553 2.19117L4.69749 3.82012L6.1517 7.0279L5.47463 8.35624C4.85244 9.57723 5.73359 11.0219 7.09895 11.0219H17.8462C18.156 11.0219 18.4072 10.7783 18.4072 10.4777C18.4072 10.1772 18.156 9.93356 17.8462 9.93356H7.09895C6.72978 9.93356 6.49132 9.54019 6.65985 9.20938L7.3378 7.87903L15.908 7.87903C16.8123 7.87903 17.5878 7.2223 17.7561 6.34796L19.2001 1.11867C19.2605 0.899615 19.1176 0.672535 18.8808 0.611629C18.6441 0.550723 18.3995 0.686526 18.3391 0.905581L16.8951 6.13487C16.839 6.42617 16.5804 6.64506 16.279 6.64506L7.75545 6.64506L6.30124 3.43728L1.58553 2.19117ZM7.09895 12.1102C5.8364 12.1102 4.81307 13.1042 4.81307 14.3303C4.81307 15.5564 5.8364 16.5503 7.09895 16.5503C8.36149 16.5503 9.38482 15.5564 9.38482 14.3303C9.38482 13.1042 8.36149 12.1102 7.09895 12.1102ZM15.9081 12.1102C14.6456 12.1102 13.6222 13.1042 13.6222 14.3303C13.6222 15.5564 14.6456 16.5503 15.9081 16.5503C17.1707 16.5503 18.194 15.5564 18.194 14.3303C18.194 13.1042 17.1707 12.1102 15.9081 12.1102Z" fill="white"/>
</svg>
`;

// 2. O seu Cabeçalho (agora com o SVG injetado)
// Apenas a parte do headerHTML no seu js/layout.js:

const headerHTML = `
    <style>
        .cart-link-wrapper {
            text-decoration: none;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 8px;
            border-radius: 50%;
            transition: background-color 0.3s ease;
            position: absolute;
            right: 140px; /* Distância da direita */
            top: 15px;    /* Distância do topo */
        }
        .cart-link-wrapper:hover {
            background-color: rgba(255, 255, 255, 0.1);
        }
        .cart-icon-container {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 35px;
            height: 35px;
        }
        .cart-icon-container svg { width: 100%; height: 100%; }
        .cart-icon-container svg path { fill: white; transition: fill 0.3s ease; }
        .cart-link-wrapper:hover .cart-icon-container svg path { fill: #4CAF50; }
    </style>

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
            
            <a href="carrinho.html" class="cart-link-wrapper" title="Ver Carrinho">
                <div class="cart-icon-container">
                    ${carrinhoIconSVG}
                </div>
            </a>
        </div>
    </nav>
`;

// 3. O seu Rodapé Original Intacto
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

// 4. Função que injeta o HTML nos espaços reservados
function renderizarLayout() {
    const cabecalho = document.getElementById('meu-cabecalho');
    const rodape = document.getElementById('meu-rodape');

    if (cabecalho) cabecalho.innerHTML = headerHTML;
    if (rodape) rodape.innerHTML = footerHTML;
}

// 5. Executa a função imediatamente
renderizarLayout();