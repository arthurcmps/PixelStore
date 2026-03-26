// js/auth_state.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "SUA_API_KEY_REAL",
  authDomain: "SEU_PROJETO.firebaseapp.com",
  projectId: "SEU_PROJETO",
  // ... coloque o restante das suas chaves aqui
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

document.addEventListener('DOMContentLoaded', () => {
    onAuthStateChanged(auth, (user) => {
        // Procura o botão de login existente no seu HTML
        const loginLink = document.querySelector('a[href="login.html"]') || document.querySelector('a[href="login.php"]');

        if (user) {
            // USUÁRIO LOGADO!
            if (loginLink) {
                loginLink.style.display = 'none'; // Esconde o botão de Login

                // Cria e injeta o botão de Perfil dinamicamente
                if (!document.getElementById('btn-perfil')) {
                    const perfilLink = document.createElement('a');
                    perfilLink.href = 'perfil.html';
                    perfilLink.id = 'btn-perfil';
                    perfilLink.innerHTML = `<button class="login-button" style="background-color: #4CAF50; color: white;">Meu Perfil</button>`;
                    
                    // Coloca o botão de perfil exatamente onde estava o de login
                    loginLink.parentNode.insertBefore(perfilLink, loginLink.nextSibling);
                }
            }
        } else {
            // USUÁRIO NÃO LOGADO!
            if (loginLink) {
                loginLink.style.display = 'inline-block'; // Garante que o Login aparece
            }
            const perfilLink = document.getElementById('btn-perfil');
            if (perfilLink) perfilLink.remove(); // Remove o botão de perfil
        }
    });
});