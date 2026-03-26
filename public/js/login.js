// js/login.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";

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
    const loginForm = document.getElementById("login-form");
    const mensagemErro = document.getElementById("mensagemErro");

    if (loginForm) {
        loginForm.addEventListener("submit", (e) => {
            e.preventDefault(); // Impede a página de recarregar
            
            const email = document.getElementById("email").value;
            const senha = document.getElementById("senha").value;

            if(mensagemErro) mensagemErro.style.display = "none";

            // Faz o login diretamente no Firebase
            signInWithEmailAndPassword(auth, email, senha)
                .then((userCredential) => {
                    // Sucesso! Redireciona para o perfil
                    window.location.href = "perfil.html";
                })
                .catch((error) => {
                    console.error("Erro no login:", error);
                    if (mensagemErro) {
                        mensagemErro.style.display = "block";
                        mensagemErro.textContent = "Email ou senha incorretos. Tente novamente.";
                    } else {
                        alert("Erro ao fazer login. Verifique as suas credenciais.");
                    }
                });
        });
    }
});