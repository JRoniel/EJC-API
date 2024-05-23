function isValidator(type, value) {
    if (value == null) {
        return false;
    }

    const stringValue = String(value).toLowerCase();

    switch (type) {
        case 'email':
            const email = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return email.test(stringValue);
        
        case 'password':
            const password = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
            return password.test(value);

        case 'name':
            const name = /^[a-zA-Z\s]*$/;
            return name.test(value);

        case 'notify':
            const notify = /^[a-zA-Z\s]*$/;
            return notify.test(value);

        default:
            return false;
    }
}


module.exports = { isValidator }