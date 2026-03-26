import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDCtOs7MltqdcJkwKXaPBUNneFraC4FCmM",
  authDomain: "pixelstore-3b148.firebaseapp.com",
  projectId: "pixelstore-3b148",
  storageBucket: "pixelstore-3b148.firebasestorage.app",
  messagingSenderId: "676043418845",
  appId: "1:676043418845:web:5c3fd06059f7a0a06d7f34",
  measurementId: "G-DSPGQR0CBJ"
};

// Inicializa o Firebase no navegador
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Adiciona o evento de clique ao botão do Google
const btnGoogle = document.getElementById('btn-google');

if (btnGoogle) {
    btnGoogle.addEventListener('click', () => {
        // Abre o pop-up de login do Google
        signInWithPopup(auth, provider)
            .then((result) => {
                // Login com sucesso! O Firebase já registrou o usuário no banco.
                const user = result.user;
                console.log("Usuário logado com sucesso:", user.displayName);
                
                // Redireciona para a tela inicial
                window.location.href = 'perfil.html';
            })
            .catch((error) => {
                console.error("Erro no login com Google:", error);
                alert("Erro ao tentar fazer login com o Google: " + error.message);
            });
    });
}