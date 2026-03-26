import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getAuth, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";


const firebaseConfig = {
  apiKey: "AIzaSyDCtOs7MltqdcJkwKXaPBUNneFraC4FCmM",
  authDomain: "pixelstore-3b148.firebaseapp.com",
  projectId: "pixelstore-3b148",
  storageBucket: "pixelstore-3b148.firebasestorage.app",
  messagingSenderId: "676043418845",
  appId: "1:676043418845:web:5c3fd06059f7a0a06d7f34",
  measurementId: "G-DSPGQR0CBJ"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("senhaForm");
    const mensagemErro = document.getElementById("mensagemErro");

    if (form) {
        form.addEventListener("submit", (event) => {
            event.preventDefault(); // Impede a página de recarregar

            const email = document.getElementById("email").value;

            // Oculte mensagens de erro anteriores
            mensagemErro.style.display = "none";

            // Função nativa do Firebase para enviar e-mail de recuperação
            sendPasswordResetEmail(auth, email)
                .then(() => {
                    alert("Sucesso! Foi enviado um e-mail de redefinição de senha para a sua caixa de entrada.");
                    window.location.href = 'login.html';
                })
                .catch((error) => {
                    console.error("Erro ao enviar e-mail de recuperação:", error);
                    mensagemErro.style.display = "block";
                    
                    // Tratamento de erros comuns para melhorar a experiência do utilizador
                    if (error.code === 'auth/user-not-found') {
                        mensagemErro.textContent = "E-mail não encontrado. Tem a certeza de que já criou uma conta?";
                    } else if (error.code === 'auth/invalid-email') {
                        mensagemErro.textContent = "Por favor, digite um endereço de e-mail válido.";
                    } else {
                        mensagemErro.textContent = "Ocorreu um erro: " + error.message;
                    }
                });
        });
    }
});