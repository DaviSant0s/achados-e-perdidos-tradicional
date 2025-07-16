const validator = require('validator');

const validateName = (name) => {

    if(validator.isEmpty(name)) return "Name is required";

    return null
}

const validateDescription = (description) => {

    if(validator.isEmpty(description)) return "Description is required";

    return null
}

const validateLocation_of_loss = (location_of_loss) => {

    if(validator.isEmpty(location_of_loss)) return "Location of loss is required";

    return null;

}

module.exports = {
    validateName,
    validateDescription,
    validateLocation_of_loss,
}