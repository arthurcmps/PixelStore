// Obter e definir os inputs corretos do formulário
const addressForm = document.querySelector("#address-form");
const cepInput = document.querySelector("#cep");
const ruaInput = document.querySelector("#rua");
const cidadeInput = document.querySelector("#cidade");
const bairroInput = document.querySelector("#bairro");
const estadoInput = document.querySelector("#estado");
const formInputs = document.querySelectorAll("[data-input]");
const closeButton = document.querySelector("#close-message");

// Validar entrada de CEP para apenas números
cepInput.addEventListener("keypress", (e) => {
  const onlyNumbers = /[0-9]|\./;
  const key = String.fromCharCode(e.keyCode);
  if (!onlyNumbers.test(key)) {
    e.preventDefault();
  }
});

// Buscar endereço ao completar o CEP
cepInput.addEventListener("keyup", (e) => {
  const inputValue = e.target.value;
  if (inputValue.length === 8) {
    getAddress(inputValue);
  }
});

// Função para obter o endereço da API ViaCEP
const getAddress = async (cep) => {
  try {
    toggleLoader(); // Exibe o loader
    cepInput.blur(); // Remove o foco do campo CEP

    const apiUrl = `https://viacep.com.br/ws/${cep}/json/`;
    const response = await fetch(apiUrl);

    if (!response.ok) throw new Error("Erro ao consultar a API.");

    const data = await response.json();

    // Valida o CEP
    if (data.erro) {
      toggleDisabled();
      addressForm.reset();
      toggleLoader();
      toggleMessage("CEP Inválido, tente novamente.");
      return;
    }

    toggleDisabled();
    ruaInput.value = data.logradouro;
    cidadeInput.value = data.localidade;
    bairroInput.value = data.bairro;
    estadoInput.value = data.uf;

    toggleLoader();
  } catch (error) {
    toggleLoader();
    toggleMessage("CEP Inválido, tente novamente.");
    console.error(error);
  }
};

// Alterna o estado de habilitação dos inputs
const toggleDisabled = () => {
  formInputs.forEach(input => {
    input.toggleAttribute("disabled");
  });
};

// Alterna a visibilidade do loader
const toggleLoader = () => {
  document.querySelector("#fade").classList.toggle("hide");
  document.querySelector("#loader").classList.toggle("hide");
};

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
