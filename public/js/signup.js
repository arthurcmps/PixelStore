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
document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('register-form');

    if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault(); // Impede a página de recarregar

            // Captura os dados do formulário
            const nome = document.getElementById('nome').value;
            const sobrenome = document.getElementById('sobrenome').value;
            const email = document.getElementById('email').value;
            const senha = document.getElementById('senha').value;
            const passconfirmation = document.getElementById('passwordconfirmation').value;
            const termos = document.getElementById('agreement').checked;

            // Validações básicas que o seu PHP fazia
            if (!nome || !sobrenome || !email || !senha) {
                alert("Por favor, preencha todos os campos obrigatórios.");
                return;
            }

            if (senha !== passconfirmation) {
                alert("As senhas não coincidem.");
                return;
            }

            if (!termos) {
                alert("Precisa aceitar os termos de uso.");
                return;
            }

            try {
                // Envia os dados para a nossa nova API em Node.js
                const response = await fetch('http://localhost:3000/api/registo', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ nome, sobrenome, email, senha })
                });

                const data = await response.json();

                if (response.ok) {
                    alert('Conta criada com sucesso!');
                    window.location.href = 'login.html';
                } else {
                    alert('Erro ao criar conta: ' + (data.error || 'Erro desconhecido.'));
                }
            } catch (error) {
                console.error("Erro na comunicação com a API:", error);
                alert('Erro de conexão com o servidor.');
            }
        });
    }
});