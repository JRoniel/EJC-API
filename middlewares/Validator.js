/**
 * Verifica se o valor atende a uma determinada regra de formato
 * @param {string} type - Tipo da regra a ser verificada
 * @param {*} value - Valor a ser verificado
 * @returns {boolean} - Verdadeiro se o valor atende a regra, falso caso contrario
 */
function isValidator(type, value) {
    if (value == null) {
        return false;
    }

    const normalizedValue = typeof value === 'string' ? value.toLowerCase() : "";
    const validators = {
        email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        password: /^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]{8,}$/,
        name: /^[a-zA-Z\s]+$/,
        message: /^[a-zA-Z0-9\s]+$/,
        level: /^[0-3]*$/,
    };

    return validators[type] !== undefined && validators[type].test(normalizedValue);
}

module.exports = { isValidator };