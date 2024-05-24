    /**
     * Retorna a mensagem correspondente ao tipo e ao idioma
     * @param {string} message - Tipo da mensagem
     * @returns {string} - Mensagem
     */
    function getMessage(message) {
        const messagesList = {
                // MENSAGENS GERAIS
                NO_ROUTE_ESTABELECED: 'Nenhuma rota estabelecida',
                INITIALIZE : 'Sistema iniciado com sucesso!',
                INTERNAL_ERROR: 'Erro interno, tente novamente mais tarde',
                INVALID_LEVEL: 'Nível de segurança não autorizado',
                INVALID_NOTIFY: 'Mensagem inválida',

                // MENSAGENS AUTH
                LOGIN_ERROR: 'Erro ao tentar fazer login',
                USER_NOT_FOUND: 'Usuário não encontrado',
                INVALID_PASSWORD_REGISTER: 'Senha não permitida, use letras e números, minimo 8 caracteres',
                INVALID_EMAIL_REGISTER: 'Email inválido para registro, utilize outro email',
                INVALID_PASSWORD: 'Senha inválida, 8 caracteres, letras e números',
                INVALID_NAME: 'Nome inválido, somente letras são permitidas',
                INVALID_EMAIL: 'Email inválido, tente novamente email',
        };

        return messagesList[message] || 'Mensagem nao encontrada';
    }


module.exports = {
    getMessage
}