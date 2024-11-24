// Obter e definir os inputs corretos do formulário
const addressForm = document.querySelector("#address-form");
const cepInput = document.querySelector("#cep");
const ruaInput = document.querySelector("#rua");
const cidadeInput = document.querySelector("#cidade");
const bairroInput = document.querySelector("#bairro");
const estadoInput = document.querySelector("#estado");
const formInputs = document.querySelectorAll("[data-input]");
const closeButton = document.querySelector("#close-message");


// Alterna a exibição de mensagens de erro
const toggleMessage = (msg) => {
  const fadeElement = document.querySelector("#fade");
  const messageElement = document.querySelector("#message");
  const messageTextElement = document.querySelector("#message p");
  messageTextElement.innerText = msg;
  fadeElement.classList.toggle("hide");
  messageElement.classList.toggle("hide");
};

// Fecha mensagem de erro ao clicar
closeButton.addEventListener("click", () => toggleMessage());

// Lógica do envio do formulário
document.getElementById("register-form").addEventListener("submit", function(event) {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const nome = document.getElementById("nome").value;
  const sobrenome = document.getElementById("sobrenome").value;
  const senha = document.getElementById("senha").value;
  const confirmacaoSenha = document.getElementById("passwordconfirmation").value;
  const termosAceitos = document.getElementById("termos_aceitos").checked;

  if (!email || !nome || !sobrenome || !senha || !confirmacaoSenha) {
    alert("Por favor, preencha todos os campos obrigatórios.");
    return;
  }

  if (senha !== confirmacaoSenha) {
    alert("As senhas não coincidem.");
    return;
  }

  if (!termosAceitos) {
    alert("Você deve aceitar os termos de uso.");
    return;
  }

  // Habilita todos os campos antes do envio
  formInputs.forEach(input => input.removeAttribute("disabled"));

  // Submete o formulário
  this.submit();
});
