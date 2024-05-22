# EJC-Web-Application

Este projeto visa criar uma api para aplicação web para o controle de notas escolar com autenticação e permissões de acesso.

## Implementações

- Banco de dados MongoDB
- Permissões de acesso
- Dashboard de ações
- Controle de notas

## Tabela de Conteúdos

- [Instalação](#instalação)
- [Roteamento](#rotas)
- [Auth](#auth)

## Instalação

Para instalar o projeto, execute o comando `npm install` no mesmo diretório do package.json. Além disso, configure o arquivo `.env` com tokens e acessos necessários.

## Rotas

### Privadas

- `GET /user/:id`: Login com requisição de email e password
- `POST /auth/register`: Registro com requisição name, email, password, confirmPassword

### Públicas

- `GET /login`: Login com email e password

## Auth

### Nível de segurança

A aplicação tem níveis de segurança para executar ações.

- 0 (default/aluno)
- 1 (professor)
- 2 (codernador)
