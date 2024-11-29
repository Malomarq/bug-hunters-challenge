export class APIschema {
    constructor(errorsLogger) {
        this.errorsLogger = errorsLogger;
    }

    getValidator = (validator) => {
        return this[validator];
    }

    executeValidator = (options) => {
        const { response, validator, customParam } = options;
        const validate = this[validator](customParam);
        return validate.safeParse(response.body);
    }

    constructErrorMessage = (errors) => {
        let errorMessage = [];
        errors.forEach((error) => {
            errorMessage.push(
                `Code: ${JSON.stringify(error.code)}\nMessage: ${JSON.stringify(error.message)}${error.validation ? `\nValidation: ${JSON.stringify(error.validation)}` : ''}${error.received ? `\nReceived: ${JSON.stringify(error.received)}` : ''}\nPath: ${JSON.stringify(error.path.join('.'))}`);
        });
        return errorMessage;
    }
}