import { RequestManager } from "./requestManager";
import { ResponseManager } from "./responseManager";

export class Runner {
    constructor(test){
        this.test = test;
        this.requestManager = new RequestManager();
        this.responseManager = new ResponseManager();
    }

    runTest(){
        const {zod, expectedStatusCode, url, method} = this.test;
        url && cy.wrap(this.requestManager.request({method, url})).then((response) => {
            this.responseManager.manageResponse({response, zod, expectedStatusCode});
        });
    }
}