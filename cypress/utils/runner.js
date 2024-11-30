import { RequestManager } from "./requestManager";
import { ResponseManager } from "./responseManager";
import { ErrorsLogger } from "./errorsLogger";

export class Runner {
    constructor(test) {
        this.test = test;
        this.errorsLogger = new ErrorsLogger();
        this.requestManager = new RequestManager();
        this.responseManager = new ResponseManager(this.errorsLogger);
    }

    runTest() {
        const { url, method, env, requestBody, taskId, zod, expectedStatusCode } = this.test;
        const completeUrl = `${env}${url}`;
        const compareResponsesBetweenEnvs = zod.compareResponsesBetweenEnvs || false;
        cy.wrap(null).then(() => {
            this.requestManager.request({ method, completeUrl, requestBody, taskId }).then((response) => {
                this.responseManager.manageResponse({ response, zod, expectedStatusCode, compareResponsesBetweenEnvs });
            });
        }).then((response) => {
            compareResponsesBetweenEnvs && cy.setStoredResponse(response);
            this.errorsLogger.logErrors();
        });
    }
}