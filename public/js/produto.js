// js/produto.js

// Função chamada pelos botões "Comprar" no HTML
function addCarrinho(id, nome, preco) {
    // 1. Vai buscar o carrinho atual ao armazenamento do navegador ou cria um novo (vazio)
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

    // 2. Adiciona o novo produto à lista
    carrinho.push({ id: id, nome: nome, preco: parseFloat(preco) });

    // 3. Guarda novamente no armazenamento do navegador
    localStorage.setItem('carrinho', JSON.stringify(carrinho));

    // 4. Feedback visual para o utilizador
    alert(`Sucesso! ${nome} foi adicionado ao seu carrinho.`);
}