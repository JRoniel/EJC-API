# <span style="color: blue;">EJC Web Application</span>

## <span style="color: blue;">Descrição</span>

Aplicação web para gerenciamento escolar pratico.

## <span style="color: blue;">Tabela de Conteúdos</span> 

- [<span style="color: blue;">Instalação</span>](#instalação)
- [<span style="color: blue;">Configuração</span>](#configuração)
- [<span style="color: blue;">Roteamento</span>](#roteamento)
- [<span style="color: blue;">Contribuição</span>](#contribuição)
- [<span style="color: blue;">Licença</span>](#licença)

## <span style="color: blue;">Instalação</span>

Todo o projeto depende de módulos considerados 'dependências' para funcionamento correto. Você pode instalar todos os módulos necessários usando o comando `npm init` na pasta raiz do projeto em seu desktop.

## <span style="color: blue;">Configuração</span>

As configurações necessárias, como banco de dados, tokens, etc., são feitas através do arquivo `.env` na pasta raiz. Configure de acordo com a necessidade.

### <span style="color: blue;">Implementação de Arquivos Estáticos</span>

Os arquivos estáticos devem ser mantidos na pasta `/public` para permitir acesso público. Recomenda-se a minificação de arquivos grandes em CSS e JavaScript.

## <span style="color: blue;">Roteamento</span>

O aplicativo utiliza roteamento para direcionar os usuários para as páginas apropriadas. Duas partes principais do aplicativo são as rotas de autenticação e as rotas do painel de controle.

### <span style="color: blue;">Rotas de Autenticação (`authRouter.js`)</span>

Esta parte do aplicativo lida com o processo de autenticação do usuário.

- `GET /auth`: Página de login. Se um usuário estiver autenticado, será redirecionado para a página do painel de controle.
- `GET /auth/logout`: Rota de logout. Remove o cookie de autenticação e redireciona para a página de login.
- `POST /auth/validation`: Rota para validar as credenciais de login.

### <span style="color: blue;">Rotas do Painel de Controle (`dashboardRouter.js`)</span>

Esta parte do aplicativo lida com as funcionalidades do painel de controle para usuários autenticados.

- `GET /dashboard`: Página do painel de controle. Se o usuário não estiver autenticado, será redirecionado para a página de login.

## <span style="color: blue;">Contribuição</span>

- John Roniel
- ...

## <span style="color: blue;">Licença</span>

- ...
