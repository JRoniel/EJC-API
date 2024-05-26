# EJC-Web-Application

Este projeto visa criar uma api para aplicação web para o controle de notas escolar com autenticação e permissões de acesso.

## Implementações

- Banco de dados MongoDB
- Permissões de acesso
- Sistema de notificações para aluno e professores
- Sistema de linguagem, padrão: PT-BR

## Implementações futuras
- Sistema de mapa salas
- Sistema de notas e boletim escolar
- Sistema de chamada com faltas para professores
- Sistema de faturas para diretoria
- Sistema de disponibilização de conteudo de aula para alunos


## Tabela de Conteúdos

- [Instalação](#instalação)
- [Roteamento](#rotas)
- [Auth](#auth)

## Instalação

Para instalar o projeto, execute o comando `npm install` no mesmo diretório do package.json. Além disso, configure o arquivo `.env` com tokens e acessos necessários.

## Rotas

- `GET /user/:id`: Retorna dados de usuario especifico ID
- `POST /auth/login`: Login de usuario
- `POST /auth/register`: Registro de usuario
- `POST /notify/`: Notificar usuario por email
- `POST /notify/level/`: Notificar usuarios de nivel especifico.

## Auth

### Nível de segurança

A aplicação tem níveis de segurança para executar ações.

- 0 (default/aluno) 
Acesso a dashboard simples, vizualização de notas e faltas
- 1 (professor)
Acesso a dashboard com chamada, boletim escolar e notificações
- 2 (codernador)
Todos os anteriores + informações do aluno
- 3 (diretoria)
Todos os anteriores + aprovação por conselho de classe e sistema de faturas.