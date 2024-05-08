## Implementações
- [x] Autenticação com tokens
- [x] Banco de dados MongoDB
- [x] Permissões de acesso
- [ ] Dashboard de ações 
- [ ] Controle de notas

## Tabela de Conteúdos 
- [Instalação](#instalação)
- [Roteamento](#rotas)
- [Auth](#auth)

## Instalação
- Use o `npm install` no mesmo diretório do package.json para instalar automaticamente todas dependências.
- Configure o arquivo `.env` com tokens e acessos nescessários.

## Rotas
Esta parte do aplicativo lida com o processo de autenticação do usuário.
- `GET /user/:id"`: Login com requisição de email,password
- `POST /auth/register`: Registro com requisição name,email,password,confirmPassword

## Auth
#### Token de valição
Apos a validação de dados, é setado um token que expira em um tempo pre-definido no .env, o token conta com o name do usario e seu nivel de segurança de ações.

#### Nivel de segurança
A aplicação tem niveis de segurança para executar ações.
- 0 (default/aluno)
- 1 (professor)
- 2 (codernador)