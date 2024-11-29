export class RequestManager {
    constructor() { }

    request(options) {
        const { method, completeUrl, taskId } = options;
        const additionalHeaders = {
            Authorization: Cypress.env("bearerToken"),
            "X-Task-Id": taskId
        };
        return cy.request({ 
            method, 
            url: completeUrl, 
            headers: additionalHeaders, 
            failOnStatusCode: false 
        }).then((response) => {
            return response;
        });
    }
}