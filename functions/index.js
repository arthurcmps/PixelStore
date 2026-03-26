const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const cors = require('cors');

// A magia da Nuvem: Inicialização automática sem chave visível!
admin.initializeApp();
const db = admin.firestore();
const auth = admin.auth();

const app = express();
app.use(cors({ origin: true }));
app.use(express.urlencoded({ extended: true }));

// ==========================================
// ROTA DE REGISTRO
// ==========================================
app.post('/php/processa_registro.php', async (req, res) => {
    const { nome, sobrenome, email, senha, termos_aceitos } = req.body;

    try {
        const userRecord = await auth.createUser({
            email: email,
            password: senha,
            displayName: `${nome} ${sobrenome}`,
        });

        await db.collection('usuarios').doc(userRecord.uid).set({
            nome: nome,
            sobrenome: sobrenome,
            email: email,
            termos_aceitos: termos_aceitos === 'on',
            data_criacao: admin.firestore.FieldValue.serverTimestamp()
        });

        // O redirecionamento funciona direto com a raiz (/) porque estão no mesmo servidor!
        res.redirect('/login.html'); 
        
    } catch (error) {
        res.send(`Erro ao criar conta: ${error.message} <br><br><a href="/signup.html">Voltar atrás</a>`);
    }
});

// ==========================================
// ROTA DE LOGIN
// ==========================================
app.post('/php/processar_login.php', async (req, res) => {
    const email = req.body.email;
    const senha = req.body.senha || req.body.password; 

    // COLOQUE AQUI A SUA CHAVE DE API DA WEB
    const FIREBASE_API_KEY = "AIzaSyDCtOs7MltqdcJkwKXaPBUNneFraC4FCmM"; 
    const loginUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${FIREBASE_API_KEY}`;

    try {
        const resposta = await fetch(loginUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: email, password: senha, returnSecureToken: true })
        });

        const dados = await resposta.json();

        if (dados.error) {
            res.send(`Credenciais incorretas. <br><br><a href="/login.html">Voltar ao Login</a>`);
        } else {
            res.redirect('/index.html'); 
        }
    } catch (error) {
        res.send("Erro interno ao tentar processar o login.");
    }
});

// Exporta o Express para o Firebase reconhecer como uma Cloud Function chamada "api"
exports.api = functions.https.onRequest(app);