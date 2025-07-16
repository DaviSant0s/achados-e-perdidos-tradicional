const {
    validateName,
    validateDescription,
    validateLocation_of_loss,
} = require('../../validators/object');


const validateCreateObject = (req, res, next) => {

    const { name, description, location_of_loss, date_of_loss } = req.body;
    
    const objectErrorMessage = (message) => {
        return {
            error: "@object/create",
            message: message
        };
    }

    const errors = [
        validateName(name),
        validateDescription(description),
        validateLocation_of_loss(location_of_loss)
    ].filter(Boolean);

    if (errors.length > 0){
        return res.status(400).json(objectErrorMessage(errors[0]));
    }

    return next();

}

const validateUpdateObject = (req, res, next) => {

    const { name, description, location_of_loss, date_of_loss } = req.body;
    
    const objectErrorMessage = (message) => {
        return {
            error: "@object/update",
            message: message
        };
    }

    const errors = [
        validateName(name),
        validateDescription(description),
        validateLocation_of_loss(location_of_loss)
    ].filter(Boolean);

    if (errors.length > 0){
        return res.status(400).json(objectErrorMessage(errors[0]));
    }

    return next();

}

module.exports = {
    validateCreateObject,
    validateUpdateObject
}