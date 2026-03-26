const express = require('express');
const { db, auth } = require('./config/firebase'); // Mantive o seu caminho, certifique-se que o firebase.js está na pasta config
const path = require('path');

const app = express();

// Permite que o Node leia os dados enviados por formulários nativos (POST)
app.use(express.urlencoded({ extended: true }));

// ==========================================
// CONFIGURAÇÃO DOS ARQUIVOS ESTÁTICOS
// Ensina o servidor onde procurar os ficheiros para não dar erro 404
// ==========================================
app.use(express.static(path.join(__dirname, 'public')));

// Quando acessar "http://localhost:3000" direto, ele carrega a página inicial
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ==========================================
// ROTA DE REGISTRO (O "falso" processa_registro.php)
// ==========================================
app.post('/php/processa_registro.php', async (req, res) => {
    const { nome, sobrenome, email, senha, termos_aceitos } = req.body;

    try {
        // A. Cria o utilizador na Autenticação do Firebase
        const userRecord = await auth.createUser({
            email: email,
            password: senha,
            displayName: `${nome} ${sobrenome}`,
        });

        // B. Guarda os dados na Base de Dados do Firebase (Firestore)
        await db.collection('usuarios').doc(userRecord.uid).set({
            nome: nome,
            sobrenome: sobrenome,
            email: email,
            termos_aceitos: termos_aceitos === 'on',
            data_criacao: new Date()
        });

        console.log("Utilizador registado com sucesso!");
        // C. Redireciona para a página de login, exatamente como o PHP fazia
        res.redirect('/login.html'); 
        
    } catch (error) {
        console.error("Erro ao registar:", error);
        res.send(`Erro ao criar conta: ${error.message} <br><br><a href="/signup.html">Voltar atrás</a>`);
    }
});

// ==========================================
// INICIANDO O SERVIDOR
// ==========================================
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor Pixel Store a correr na porta ${PORT}!`);
});