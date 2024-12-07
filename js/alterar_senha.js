document.getElementById("senhaForm").addEventListener("submit", function(event) {
    // Obter os valores das senhas
    const novaSenha = document.getElementById("novaSenha").value;
    const confirmarSenha = document.getElementById("confirmarSenha").value;

    // Verificar se as senhas coincidem
    if (novaSenha !== confirmarSenha) {
        event.preventDefault(); // Impedir o envio do formulário
        const mensagemErro = document.getElementById("mensagemErro");
        mensagemErro.style.display = "block"; // Mostrar mensagem de erro
        mensagemErro.textContent = "As senhas não coincidem. Por favor, tente novamente.";
    }
});