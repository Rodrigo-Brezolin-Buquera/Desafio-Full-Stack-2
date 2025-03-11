CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'user')  NOT NULL,
);

CREATE TABLE transaction (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cpf VARCHAR(14) NOT NULL,
    description VARCHAR(255) NOT NULL,
    transaction_date DATE NOT NULL,
    point_value INT NOT NULL,
    value DECIMAL(10,2) NOT NULL,
    status ENUM('Aprovado', 'Reprovado', 'Em avaliação') NOT NULL,
    FOREIGN KEY (cpf) REFERENCES users(cpf)
);


INSERT INTO users (cpf, name, email, password, role) VALUES 
('282.279.300-00', 'Admin', 'admin@email.com', 'senha123', 'admin'),
('123.456.789-00', 'João Silva', 'joao@email.com', 'senha456', 'usuario');


INSERT INTO transaction (cpf, description, transaction_date, point_value, value, status) VALUES 
('123.456.789-00', 'Venda do produto X', '2022-10-10', 10000, 10000.00, 'Aprovado'),
('123.456.789-00', 'Venda do produto Y', '2022-10-10', 10000, 10000.00, 'Reprovado'),
('123.456.789-00', 'Venda do produto Z', '2022-10-10', 10000, 10000.00, 'Em avaliação');

SELECT * from users