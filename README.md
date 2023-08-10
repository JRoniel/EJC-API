# EJC Web Application

## Descrição

Aplicação web para gerenciamento escolar pratico.

## Tabela de Conteúdos 

- [Instalação](#instalação)
- [Configuração](#configuração)
- [Roteamento](#roteamento)
- [Contribuição](#contribuição)
- [Licença](#licença)

## Instalação

Todo o projeto depende de módulos considerados 'dependências' para funcionamento correto. Você pode instalar todos os módulos necessários usando o comando `npm init` na pasta raiz do projeto em seu desktop.

Codido para criação do banco de dados e tabela para uso:
`CREATE DATABASE db_ejc_dev;`

```CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(50) NOT NULL
);```

## Configuração

As configurações necessárias, como banco de dados, tokens, etc., são feitas através do arquivo `.env` na pasta raiz. Configure de acordo com a necessidade.

### Implementação de Arquivos Estáticos

Os arquivos estáticos devem ser mantidos na pasta `/public` para permitir acesso público. Recomenda-se a minificação de arquivos grandes em CSS e JavaScri\pt.

## Roteamento

O aplicativo utiliza roteamento para direcionar os usuários para as páginas apropriadas. Duas partes principais do aplicativo são as rotas de autenticação e as rotas do painel de controle.

### Rotas de Autenticação (`authRouter.js`)

Esta parte do aplicativo lida com o processo de autenticação do usuário.

- `GET /auth`: Página de login. Se um usuário estiver autenticado, será redirecionado para a página do painel de controle.
- `GET /auth/logout`: Rota de logout. Remove o cookie de autenticação e redireciona para a página de login.
- `POST /auth/validation`: Rota para validar as credenciais de login.

### Rotas do Painel de Controle (`dashboardRouter.js`)

Esta parte do aplicativo lida com as funcionalidades do painel de controle para usuários autenticados.

- `GET /dashboard`: Página do painel de controle. Se o usuário não estiver autenticado, será redirecionado para a página de login.

## Contribuição
- John Roniel - Back-end
- Geovana - Front-end

## Licença
- ...
