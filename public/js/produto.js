// 1. Injeta o CSS da nossa notificação animada diretamente no site
if (!document.getElementById('estilo-toast')) {
    const style = document.createElement('style');
    style.id = 'estilo-toast';
    style.innerHTML = `
        .toast-container {
            position: fixed;
            bottom: 30px;
            right: 30px;
            z-index: 9999;
            display: flex;
            flex-direction: column;
            gap: 10px;
        }
        .toast-alerta {
            background-color: #252525;
            color: white;
            padding: 16px 24px;
            border-radius: 8px;
            border-left: 6px solid #4CAF50;
            box-shadow: 0 8px 20px rgba(0,0,0,0.4);
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            font-size: 16px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 20px;
            /* Aumentamos o tempo de exibição para 4 segundos antes de sumir */
            animation: slideIn 0.4s forwards, fadeOut 0.4s forwards 4s;
        }
        .toast-left {
            display: flex;
            align-items: center;
            gap: 15px;
        }
        .toast-icon {
            color: #4CAF50;
            display: flex;
            align-items: center;
        }
        /* Estilo do novo botão dentro do alerta */
        .toast-btn {
            background-color: transparent;
            color: #4CAF50;
            text-decoration: none;
            padding: 8px 15px;
            border: 1px solid #4CAF50;
            border-radius: 5px;
            font-size: 14px;
            font-weight: bold;
            transition: all 0.3s ease;
            white-space: nowrap;
        }
        .toast-btn:hover {
            background-color: #4CAF50;
            color: white;
        }
        @keyframes slideIn {
            from { transform: translateX(120%); }
            to { transform: translateX(0); }
        }
        @keyframes fadeOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(120%); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
}

// 2. Função que cria e exibe o alerta visual
function mostrarAlertaBonito(mensagem) {
    let container = document.getElementById('toast-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toast-container';
        container.className = 'toast-container';
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'toast-alerta';
    
    const svgIcon = `
        <div class="toast-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
        </div>
    `;

    // Nova estrutura: Ícone + Texto na esquerda, e o Botão na direita
    toast.innerHTML = `
        <div class="toast-left">
            ${svgIcon} 
            <span>${mensagem}</span>
        </div>
        <a href="carrinho.html" class="toast-btn">Ir para o Carrinho</a>
    `;
    
    container.appendChild(toast);

    // Remove a notificação do código após 5 segundos (garante que a animação de saída já terminou)
    setTimeout(() => {
        toast.remove();
    }, 5000);
}

// 3. A Função principal chamada pelos botões "Comprar" no HTML
window.addCarrinho = function(id, nome, preco) {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    carrinho.push({ id: id, nome: nome, preco: parseFloat(preco) });
    localStorage.setItem('carrinho', JSON.stringify(carrinho));

    mostrarAlertaBonito(`<strong>${nome}</strong> adicionado!`);
};