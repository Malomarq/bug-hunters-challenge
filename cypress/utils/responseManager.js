import { validators } from "./zod/schemas";

export class ResponseManager {
    constructor() { }

    manageResponse(options) {
        const { response, zod, expectedStatusCode } = options;
        this.verifyStatusCode({ response, expectedStatusCode });
        this.checkResponseSchema({ response, zod })
    }

    verifyStatusCode(options) {
        const { response, expectedStatusCode } = options;
        if (response.status !== expectedStatusCode) {
            throw new Error(`Expected status code for ${response["Request URL"]}: ${expectedStatusCode}. Current status code: ${response.status}`)
        } else {
            expect(response.status).to.eq(expectedStatusCode);
        }
    }

    checkResponseSchema(options){
        const {response, zod} = options;
        
        if(!validators[zod.schema]){
            throw new Error(`Schema not found: ${zod.schema}`);
        } else if(!validators[zod.schema]().getValidator(zod.validator)){
            throw new Error(`Validator not found: ${zod.validator}`)
        }

        const resultValidation = validators[zod.schema]().executeValidator({response, validator: zod.validator});

        if(!resultValidation.success){
            const errorMessages = validators[zod.schema]().constructErrorMessage(resultValidation.error.issues);
            throw new Error(`Errors found: ${errorMessages}`);
        }
    }
}