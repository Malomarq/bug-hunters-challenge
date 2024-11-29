export class APIschema {
    constructor(){}

    getValidator = (validator) => {
        return this[validator];
    }

    executeValidator = (options) => {
        const {response, validator, customParam} = options;
        const validate = this[validator](customParam);
        return validate.safeParse(response.body);
    }

    constructErrorMessage = (errors) => {
        errors.forEach((error) => {
            throw new Error(`Code: ${JSON.stringify(error.code)}\nMessage: ${JSON.stringify(error.message)}\nPath: ${JSON.stringify(error.path.join('.'))}`);
        })
    }
}