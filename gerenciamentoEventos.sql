CREATE TABLE eventos (
    evento_id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    data DATE NOT NULL,
    local VARCHAR(255) NOT NULL,
    descricao TEXT,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE participantes (
    participante_id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    telefone VARCHAR(20),
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE evento_participante (
    evento_id INT,
    participante_id INT,
    PRIMARY KEY (evento_id, participante_id),
    FOREIGN KEY (evento_id) REFERENCES eventos(evento_id) ON DELETE CASCADE,
    FOREIGN KEY (participante_id) REFERENCES participantes(participante_id) ON DELETE CASCADE
);

INSERT INTO eventos (nome, data, local, descricao) 
VALUES ('Conferência de Tecnologia', '2024-12-15', 'Centro de Convenções', 'Uma conferência para discutir novas tendências tecnológicas.');

INSERT INTO participantes (nome, email, telefone) 
VALUES ('João Silva', 'joao.silva@example.com', '123456789');

INSERT INTO evento_participante (evento_id, participante_id) 
VALUES (1, 1);  -- Associando o participante com ID 1 ao evento com ID 1





