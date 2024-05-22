class Language {

    constructor() {
        this.messages = {
            'pt-BR': {
                // MENSAGENS GERAIS
                INITIALIZE : 'Sistema iniciado com sucesso!',
                INTERNAL_ERROR: 'Erro interno, tente novamente mais tarde',
                INVALID_LEVEL: 'Nível de segurança não autorizado',
                INVALID_NOTIFY: 'Mensagem inválida',

                // MENSAGENS AUTH
                LOGIN_ERROR: 'Erro ao tentar fazer login',
                USER_NOT_FOUND: 'Usuário não encontrado',
                INVALID_PASSWORD_REGISTER: 'Senha não permitida, use letras e números, minimo 8 caracteres',
                INVALID_EMAIL_REGISTER: 'Email inválido para registro, utilize outro email',
                INVALID_PASSWORD: 'Senha inválida',
                INVALID_NAME: 'Nome inválido, somente letras são permitidas',

            }
        };
        this.language = 'pt-BR';
    }

    getMessage(message) {
        return this.messages[this.language][message];
    }
}

module.exports = new Language();