document.addEventListener('DOMContentLoaded', () => {
    exibirCarrinho();

    const btnCheckout = document.getElementById('checkout');
    if (btnCheckout) {
        btnCheckout.addEventListener('click', finalizarCompra);
    }
});

function exibirCarrinho() {
    const divCarrinho = document.getElementById('carrinho');
    const btnCheckout = document.getElementById('checkout');
    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

    // Se o carrinho estiver vazio
    if (carrinho.length === 0) {
        divCarrinho.innerHTML = '<p class="empty-cart-msg">O seu carrinho está vazio. Vamos às compras?</p>';
        if(btnCheckout) btnCheckout.style.display = 'none'; 
        return;
    }

    // Se tiver itens, mostra o botão de finalizar
    if(btnCheckout) btnCheckout.style.display = 'block'; 

    let conteudoHTML = '<ul class="cart-list">';
    let total = 0;

    carrinho.forEach((produto, index) => {
        let precoFormatado = produto.preco.toFixed(2).replace('.', ',');
        
        conteudoHTML += `
            <li class="cart-item">
                <span class="cart-item-name">${produto.nome}</span>
                <span class="cart-item-price">R$ ${precoFormatado}</span>
                <button class="remove-btn" onclick="removerDoCarrinho(${index})">Remover</button>
            </li>`;
        total += produto.preco;
    });

    conteudoHTML += '</ul>';
    
    let totalFormatado = total.toFixed(2).replace('.', ',');
    conteudoHTML += `
        <div class="cart-total">
            <h3>Total: <span>R$ ${totalFormatado}</span></h3>
        </div>`;

    divCarrinho.innerHTML = conteudoHTML;
}

window.removerDoCarrinho = function(index) {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    carrinho.splice(index, 1); 
    localStorage.setItem('carrinho', JSON.stringify(carrinho)); 
    exibirCarrinho(); 
};

function finalizarCompra() {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    if (carrinho.length === 0) return;

    // Seleciona o container principal do carrinho
    const cartContainer = document.querySelector('.cart-container');
    
    // Substitui todo o conteúdo do carrinho pela nossa animação de sucesso
    cartContainer.innerHTML = `
        <div class="checkout-success">
            <div class="success-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
            </div>
            <h2>Compra Finalizada!</h2>
            <p>Obrigado por escolher a Pixel Store. O seu pedido está a ser processado.</p>
            <div class="loading-bar"></div>
        </div>
    `;

    // Esvazia o carrinho no armazenamento do navegador
    localStorage.removeItem('carrinho'); 
    
    // Aguarda 4 segundos (o tempo da nossa barra de progresso encher) e redireciona
    setTimeout(() => {
        window.location.href = 'index.html'; 
    }, 4000);
}