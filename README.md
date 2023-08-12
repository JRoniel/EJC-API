# EJC Web Application

## Implementações
- [x] Autenticação com tokens
- [x] Banco de dados MySQL
- [x] Controle de rotas
- [x] Permissões de acesso
- [ ] Dashboard de ações 
- [ ] Controle de salas
- [ ] Mensagens privadas
- [ ] Grade escolar


## Tabela de Conteúdos 
- [Instalação](#instalação)
- [Roteamento](#roteamento)
- [Contribuição](#contribuição)
- [Licença](#licença)

## Instalação
- Use o `npm install` no mesmo diretório do package.json para instalar automaticamente todas dependências.
- Configure o arquivo `.env` com tokens e acessos nescessários.
- Execute o `db/constructor.sql` no seu banco de dados para criar e configurar o banco de dados nescessário.

## Roteamento
O aplicativo utiliza roteamento para direcionar os usuários para as páginas apropriadas. Duas partes principais do aplicativo são as rotas de autenticação e as rotas do painel de controle.

#### Rotas de Autenticação (`authRouter.js`)
Esta parte do aplicativo lida com o processo de autenticação do usuário.
- `GET /auth`: Página de login. Se um usuário estiver autenticado, será redirecionado para a página do painel de controle.
- `GET /auth/logout`: Rota de logout. Remove o cookie de autenticação e redireciona para a página de login.
- `POST /auth/validation`: Rota para validar as credenciais de login.

#### Rotas do Painel de Controle (`dashboardRouter.js`)
Esta parte do aplicativo lida com as funcionalidades do painel de controle para usuários autenticados.
- `GET /dashboard`: Página do painel de controle. Se o usuário não estiver autenticado, será redirecionado para a página de login.

## Contribuição
- @jroniel - Back-end
- @vana-dot - Front-end

## Licença
- MIT License 
