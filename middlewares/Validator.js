/**
 * Verifica se o valor atende a uma determinada regra de formato
 * @param {string} type - Tipo da regra a ser verificada
 * @param {*} value - Valor a ser verificado
 * @returns {boolean} - Verdadeiro se o valor atende a regra, falso caso contrario
 */
 function isValidator(type, value) {
    // Se o valor for nulo, retorna falso
    if (value == null) {
        return false;
    }

    const normalizedValue = typeof value === 'string' ? value.toLowerCase() : "";
    const validators = {
        email: /^[^@ ]+@[^@ ]+\.[^@ ]+$/, //Deve conter @ e .
        password: /^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]{8,}$/, //Deve conter pelo menos uma letra e um número
        name: /^[a-zA-Z\s]+$/, //Deve conter apenas letras
        message: /^[\w\s\u00C0-\u017F]+$/, //Deve conter apenas letras
        level: /^[0-3]*$/, //Deve conter apenas 0, 1, 2 ou 3
        number: /^[0-9]*$/
    };

    return validators[type] !== undefined && validators[type].test(normalizedValue);
}

module.exports = { isValidator };