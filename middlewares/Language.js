    /**
     * Retorna a mensagem correspondente ao tipo e ao idioma
     * @param {string} message - Tipo da mensagem
     * @returns {string} - Mensagem
     */
     function getMessage(message) {
        const messagesList = {
                // SUCESSO
                INITIALIZE : 'Sistema iniciado com sucesso!',  
                MESSAGE_SUCESS: 'Mensagem enviada com sucesso',
                REGISTER_SUCESS: 'Registro efetuado com sucesso',
                ACTION_SUCESS: 'Acção efetuada com sucesso',

                // PERMISSÃO NÃO AUTORIZADA
                PERMISSION_DENIED: 'Permissão não autorizada',
                LEVEL_DENIED: 'Nível de segurança não autorizado',

                // ERRO
                LOGIN_ERROR: 'Erro ao tentar fazer login',
                USER_NOT_FOUND: 'Usuário não encontrado',
                INVALID_PASSWORD_REGISTER: 'Senha não permitida, use letras e números, minimo 8 caracteres',
                INVALID_EMAIL_REGISTER: 'Email inválido para registro, utilize outro email',
                INVALID_PASSWORD: 'Senha inválida, 8 caracteres, letras e números',
                INVALID_NAME: 'Nome inválido, somente letras são permitidas',
                INVALID_EMAIL: 'Email inválido, tente novamente email',
                NO_ROUTE_ESTABELECED: 'Nenhuma rota estabelecida',
                INTERNAL_ERROR: 'Erro interno, memsagem: ',
                INVALID_LEVEL: 'Nível de segurança não é valido',
                INVALID_MESSAGE: 'Mensagem inválida',
                ROOM_EXISTS: 'Sala ja existe',

                // NÃO ENCONTRADO
                NO_DATA: 'Nenhuma dado encontrado',
                ERROR_404: '(404) Rota não encontrada',

        };

        return messagesList[message] || 'Mensagem: ' + message + ' não encontrada';
    }


module.exports = {
    getMessage
}