CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL, -- Email do usuário
    nome VARCHAR(50) NOT NULL, -- Nome do usuário
    sobrenome VARCHAR(50) NOT NULL, -- Sobrenome do usuário
    password VARCHAR(255) NOT NULL, -- Senha criptografada do usuário
    termos_aceitos BOOLEAN NOT NULL, -- Verifica se os termos foram aceitos
    cep VARCHAR(8) NOT NULL, -- CEP do usuário
    rua VARCHAR(255) NOT NULL, -- Endereço do usuário (rua)
    numero VARCHAR(10) NOT NULL, -- Número da residência
    complemento VARCHAR(15),
    bairro VARCHAR(255) NOT NULL, -- Bairro
    cidade VARCHAR(100) NOT NULL, -- Cidade
    estado VARCHAR(2) NOT NULL, -- Estado (UF)
    senha VARCHAR(18) NOT NULL,
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- Data do registro
);
