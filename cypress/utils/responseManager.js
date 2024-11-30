import { validators } from "./zod/schemas";

export class ResponseManager {
    constructor(errorsLogger) {
        this.errorsLogger = errorsLogger;
     }

    manageResponse(options) {
        const { response, zod, expectedStatusCode } = options;
        this.verifyStatusCode({ response, expectedStatusCode });
        this.checkResponseSchema({ response, zod });
    }

    verifyStatusCode(options) {
        const { response, expectedStatusCode } = options;
        if (response.status !== expectedStatusCode) {
            this.errorsLogger.throwErrors(`Expected status code: ${expectedStatusCode}. Current status code: ${response.status}`);
        } else {
            expect(response.status).to.eq(expectedStatusCode);
        }
    }

    checkResponseSchema(options){
        const {response, zod} = options;

        if(!validators[zod.schema]){
            this.errorsLogger.throwErrors(`Schema not found: ${zod.schema}`);
        } else if(!validators[zod.schema](this.errorsLogger).getValidator(zod.validator)){
            this.errorsLogger.throwErrors(`Validator not found: ${zod.validator}`);
        }

        const resultValidation = validators[zod.schema](this.errorsLogger).executeValidator({response, validator: zod.validator});
        

        if(!resultValidation.success){
            const errorMessages = validators[zod.schema](this.errorsLogger).constructErrorMessage(resultValidation.error.issues);
            
            errorMessages.forEach((errorMessage) => {
                this.errorsLogger.addError(errorMessage);
            });
        }
    }
}