# Teste Full-Stack 2 Nex Digital

## Tecnologias 
Frontend: React, react-router-dom, react-hook-form, axios, jwt-decode e MUI.

Backend: Node, express, sequelize, jsonwebtoken, express-async-errors e docker

## Funcionalidades Páginas Frontend
Home => Faz login com email e senha, caso não tenha conta direciona para Signup

Signup => Permite a criação de um novo usuário 

Admin => Página protegida, admin pode vizualizar as trasações e filtra-las

User => Página protegida, usuário pode criar transações, ver sua transações, filtra-las e ver o total de pontos acumulados.

## Funcionalidades Endpoints Backend
Backend está divido em 2 rotas com 3 camadas cada. 1 Middlware para tokens e outros para erros async.

Rota user:

GET /user  => protegido admin, retornas todos os usuários do banco

GET /user/:id => protegido user, retorna apenas o uusário logado

POST /login => input de email e senha, retorna token de acesso

POST /signup => input de email, nome, cpf e senha, retorna token de acesso

Rota transaction:

GET  transaction  => protegido admin, retornas todos as transações 

GET  transaction/:id  => protegido user, retornas todos as transações do usuário logado

POST transaction => protegido user, cria uma nova transação para o dia de hoje 

## Usuários pré existentes
```
Admin:
email: admin@email.com,
senha: senha123

User:
email: joao@email.com
senha: senha456
```

## Como rodar o projeto:
Pelo terminal:
```bash
git clone https://github.com/Rodrigo-Brezolin-Buquera/Desafio-Full-Stack-2.git

cd backend
docker compose up -d
npm run dev
```
Abra outro terminal na mesma pasta inicial
```bash
cd frontend 
npm run start
acesse: http://localhost:3000 
```