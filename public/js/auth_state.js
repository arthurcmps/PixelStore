import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";

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

document.addEventListener('DOMContentLoaded', () => {
    onAuthStateChanged(auth, (user) => {
        // Procura o botão de login existente no seu HTML
        const loginLink = document.querySelector('a[href="login.html"]') || document.querySelector('a[href="login.php"]');

        if (user) {
            // USUÁRIO LOGADO!
            if (loginLink) {
                loginLink.style.display = 'none';

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
                loginLink.style.display = 'inline-block'; 
            }
            const perfilLink = document.getElementById('btn-perfil');
            if (perfilLink) perfilLink.remove();
        }
    });
});