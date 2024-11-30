export class RequestManager {
    constructor() { }

    request(options) {
        const { method, completeUrl, requestBody = {}, taskId } = options;
        const additionalHeaders = {
            Authorization: Cypress.env("bearerToken"),
            "X-Task-Id": taskId
        };
        return cy.request({ 
            method, 
            url: completeUrl, 
            body: requestBody,
            headers: additionalHeaders, 
            failOnStatusCode: false 
        }).then((response) => {
            return response;
        });
    }
}