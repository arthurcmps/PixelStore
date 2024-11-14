function exibirCarrinho() {
    const listaCarrinho = document.getElementById('carrinho');
    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

    if (carrinho.length === 0) {
        listaCarrinho.innerHTML = '<p>O carrinho está vazio</p>';
        return;
    }

    let conteudoCarrinho = '<ul>';
    let total = 0;

    carrinho.forEach((produto, index) => {
        conteudoCarrinho += `<li>${produto.nome} - R$ ${produto.preco.toFixed(2)}
            <button onclick="removerDoCarrinho(${index})">Remover</button>
        </li>`;
        total += produto.preco;
    });

    conteudoCarrinho += '</ul>';
    conteudoCarrinho += `<p>Total: R$ ${total.toFixed(2)}</p>`;

    listaCarrinho.innerHTML = conteudoCarrinho;
}

function removerDoCarrinho(index) {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

    // Remove o produto pelo índice
    carrinho.splice(index, 1);

    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    exibirCarrinho(); // Atualiza o carrinho exibido
}

exibirCarrinho(); // Chama a função ao carregar a página
