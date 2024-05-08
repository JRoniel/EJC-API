# EJC Web Application

## Implementações
- [x] Autenticação com tokens
- [x] Banco de dados MongoDB
- [x] Permissões de acesso
- [ ] Dashboard de ações 
- [ ] Controle de notas


## Tabela de Conteúdos 
- [Instalação](#instalação)
- [Roteamento](#roteamento)
- [Contribuição](#contribuição)
- [Licença](#licença)

## Instalação
- Use o `npm install` no mesmo diretório do package.json para instalar automaticamente todas dependências.
- Configure o arquivo `.env` com tokens e acessos nescessários.

#### Rotas de Autenticação (`authRouter.js`)
Esta parte do aplicativo lida com o processo de autenticação do usuário.
- `GET /user/:id"`: Login com requisição de email,password
- `POST /auth/register`: Registro com requisição name,email,password,confirmPassword

#### Token de valição
Apos a validação de dados, é setado um token que expira em um tempo pre-definido no .env, o token conta com o name do usario e seu nivel de segurança de ações.
