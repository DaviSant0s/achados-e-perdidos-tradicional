const validator = require('validator');

const validateFirstName = (firstName) => {

    if(validator.isEmpty(firstName)) return "First Name is required";
    if(!validator.isLength(firstName, {min: 3})) return "The First Name provided is too short";
    if(!validator.isLength(firstName, {max: 20})) return "The First Name provided is too long";

    return null
}

const validateLastName = (lastName) => {
    if(validator.isEmpty(lastName)) return "Last Name is required";
    if(!validator.isLength(lastName, {min: 3})) return "The Last Name provided is too short";
    if(!validator.isLength(lastName, {max: 20})) return "The Last Name provided is too long";

    return null
}

const validateEmail = (email) => {

    // Verifica se o campo de email está vazio
    if(validator.isEmpty(email)) return "Email is required";

    // validação do email
    const isEmail = validator.isEmail(email);
    if(!isEmail) return "Invalid email format";

    return null
}

const validatePassword = (password) => {

    if(validator.isEmpty(password)) return "Password is required";
    if(!validator.isLength(password, { min: 6 })) return "Password must to be least 6 caracter long";

    return null
}

const validateContactNumber = (phone) => {

    // Validar o número de telefone com a biblioteca validator
    const isValid = validator.isMobilePhone(phone);
    
    if (!isValid) return "Invalid phone number";

    return null;

}

module.exports = {
    validateFirstName,
    validateLastName,
    validateEmail,
    validatePassword,
    validateContactNumber
}