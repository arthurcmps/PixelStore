function addCarrinho(id, nome, preco) {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

    // Adiciona o produto no carrinho
    carrinho.push({ id, nome, preco });

    localStorage.setItem('carrinho', JSON.stringify(carrinho));

    alert(`${nome} foi adicionado ao carrinho.`);
}
