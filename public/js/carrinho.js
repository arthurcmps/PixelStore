// js/carrinho.js

document.addEventListener('DOMContentLoaded', () => {
    exibirCarrinho();

    // Configura o botão de finalizar compra
    const btnCheckout = document.getElementById('checkout');
    if (btnCheckout) {
        btnCheckout.addEventListener('click', finalizarCompra);
    }
});

function exibirCarrinho() {
    const divCarrinho = document.getElementById('carrinho');
    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

    // Se o carrinho estiver vazio
    if (carrinho.length === 0) {
        divCarrinho.innerHTML = '<p style="color: white; font-size: 18px; text-align: center;">O seu carrinho está vazio.</p>';
        return;
    }

    // Se tiver itens, cria a lista
    let conteudoHTML = '<ul style="list-style: none; padding: 0;">';
    let total = 0;

    carrinho.forEach((produto, index) => {
        // Formata o preço para o padrão brasileiro/português (R$ 00,00)
        let precoFormatado = produto.preco.toFixed(2).replace('.', ',');
        
        conteudoHTML += `
            <li style="color: white; margin-bottom: 15px; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #333; padding-bottom: 10px;">
                <span style="font-size: 18px;">${produto.nome} - R$ ${precoFormatado}</span>
                <button onclick="removerDoCarrinho(${index})" style="background-color: #ff4c4c; color: white; border: none; padding: 8px 15px; cursor: pointer; border-radius: 5px; font-weight: bold;">Remover</button>
            </li>`;
        total += produto.preco;
    });

    conteudoHTML += '</ul>';
    
    // Adiciona o valor total no final
    let totalFormatado = total.toFixed(2).replace('.', ',');
    conteudoHTML += `<h2 style="color: #4CAF50; margin-top: 20px; text-align: right;">Total: R$ ${totalFormatado}</h2>`;

    divCarrinho.innerHTML = conteudoHTML;
}

// Função para remover um item específico
window.removerDoCarrinho = function(index) {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    carrinho.splice(index, 1); // Remove o item daquela posição
    localStorage.setItem('carrinho', JSON.stringify(carrinho)); // Guarda a nova lista
    exibirCarrinho(); // Recarrega a visualização
};

// Função para o botão "Finalizar Compra"
function finalizarCompra() {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    
    if (carrinho.length === 0) {
        alert("Adicione produtos ao carrinho antes de finalizar a compra!");
        return;
    }

    // Simulação de compra bem-sucedida
    alert("Compra realizada com sucesso! Obrigado por escolher a Pixel Store.");
    
    // Esvazia o carrinho após a compra
    localStorage.removeItem('carrinho'); 
    
    // Redireciona para a página inicial
    window.location.href = 'index.html'; 
}