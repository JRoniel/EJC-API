function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase()) ? true : false;
}

function isValidPassword(password) {
    const re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    return re.test(String(password)) ? true : false;
}

function isValidName(name) {
    const re = /^[a-zA-Z\s]*$/;
    return re.test(String(name)) ? true : false;
}

function isValidNotify(message) {
    const re = /^[a-zA-Z\s]*$/;
    return re.test(String(message)) ? true : false;
}



module.exports = { isValidEmail, isValidPassword, isValidName, isValidNotify }