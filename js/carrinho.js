let carrinho = [];

function addCarrinho(id, nome, preco){
    const produto = carrinho.find(item => item.id === id);

    if(produto){
        produto.quantidade += 1;
    }else{
        carrinho.push({id, nome, preco, quantidade: 1});
    }

    atualizarCarrinho();
}

function atualizarCarrinho(){
    const carrinhoDiv = document.getElementById('carrinho');
    carrinhoDiv.innerHTML = '';

    let total = 0;

    carrinho.forEach(produto => {carrinhoDiv.innerHTML +='<p>${produto.nome} - Quantidade: ${produto.quantidade} - Preço: R$ ${produto.preco * produto.quantidade}</p>
        <button onclick = "removeCarrinho(${produto.id})">Remover</button>';
        total += produto.preco * produto.quantidade;
    })

    carrinhoDiv.innerHTML += '<h3>Total: R$ ${total.toFixed(2)}</h3>';
}

function removeCarrinho(id){
carrinho = carrinho.filter(item => item.id !== id);
atualizarCarrinho();
}