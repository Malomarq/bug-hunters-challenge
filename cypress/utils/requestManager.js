export class RequestManager {
    constructor() { }

    request(options) {
        const { method, url } = options;
        const additionalHeaders = {};
        cy.request({ method, url, additionalHeaders, failOnStatusCode: false }).then((response) => {
            return response;
        });
    }
}