function exibirCarrinho(){
    const listaCarrinho = document.getElementById('carrinho');
    const carrinho = JSON.parse(localStorage.getItem('carrinho'))||[];


if (carrinho.length === 0){
    listaCarrinho.innerHTML = '<p>O carrinho está vazio</p>';
    return;
}

let conteudoCarrinho = '<ul>';
let total = 0;
carrinho.forEach(produto => { conteudoCarrinho += '<il>${produto.nome} - R$ ${produto.preco.toFixed(2)}</li>';
    total += produto.preco;    
});

conteudoCarrinho += '</ul>';
conteudoCarrinho += '<p>Total: R$ ${total.toFixed(2)}</p>'

listaCarrinho.innerHTML = conteudoCarrinho;

}

exibirCarrinho();