import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

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
const db = getFirestore(app);

// Função para exibir o alerta animado de sucesso
function mostrarMensagemSucesso(mensagem) {
    const div = document.createElement("div");
    div.innerHTML = `
        <div style="position: fixed; top: 30px; right: 30px; background-color: #4CAF50; color: white; padding: 18px 25px; border-radius: 8px; box-shadow: 0 5px 15px rgba(0,0,0,0.4); z-index: 9999; font-weight: bold; font-family: sans-serif; display: flex; align-items: center; gap: 15px; animation: slideIn 0.5s ease-out forwards;">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
            <span style="font-size: 16px;">${mensagem}</span>
        </div>
        <style>
            @keyframes slideIn {
                from { transform: translateX(120%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
        </style>
    `;
    document.body.appendChild(div);
}

document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('register-form');

    if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault(); 

            // Captura os dados
            const nome = document.getElementById('nome').value;
            const sobrenome = document.getElementById('sobrenome').value;
            const email = document.getElementById('email').value;
            const senha = document.getElementById('senha').value;
            const passconfirmation = document.getElementById('passwordconfirmation').value;
            const termos = document.getElementById('agreement').checked;

            // Validações
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

            // Desativa o botão para evitar cliques duplos
            const btnSubmit = document.getElementById('btn-submit');
            if(btnSubmit) btnSubmit.disabled = true;

            try {
                // 1. Cria a conta
                const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
                const user = userCredential.user;

                // 2. Atualiza nome
                await updateProfile(user, { displayName: `${nome} ${sobrenome}` });

                // 3. Salva no banco de dados
                await setDoc(doc(db, "usuarios", user.uid), {
                    nome: nome,
                    sobrenome: sobrenome,
                    email: email,
                    termos_aceitos: termos,
                    data_criacao: new Date()
                });

                // A MÁGICA VISUAL ACONTECE AQUI:
                mostrarMensagemSucesso('Conta criada com sucesso! Bem-vindo(a)!');
                
                // Redireciona para o perfil após 3 segundos
                setTimeout(() => {
                    window.location.href = 'perfil.html';
                }, 3000);
                
            } catch (error) {
                console.error("Erro ao criar conta:", error);
                if(btnSubmit) btnSubmit.disabled = false; // Reativa o botão se houver erro
                
                if(error.code === 'auth/email-already-in-use') {
                    alert('Erro: Este e-mail já está registado. Vá para a página de Login.');
                } else if(error.code === 'auth/weak-password') {
                    alert('Erro: A senha é muito fraca. Escolha uma senha com pelo menos 6 caracteres.');
                } else {
                    alert('Erro ao criar conta: ' + error.message);
                }
            }
        });
    }
});