import { Runner } from "../utils/runner";
import users from "../fixtures/data/user.json";
import { RequestManager } from "../utils/requestManager";

let storedResponse;

Cypress.Commands.add('instanceRunner', (test) => {
    const runner = new Runner(test);
    runner.runTest();
});

Cypress.Commands.add('restoreSetup', (options) => {
    const { env } = options;
    const envUrl = Cypress.env(`${env}EnvUrl`);
    const requestManager = new RequestManager();

    requestManager.request({
        method: "POST",
        completeUrl: `${envUrl}/setup`,
    });
});

Cypress.Commands.add('setStoredResponse', (response) => {
    storedResponse = response;
});

Cypress.Commands.add('getStoredResponse', () => {
    return storedResponse;
});

Cypress.Commands.add('deleteUser', (options) => {
    const { env, taskId } = options;
    const envUrl = Cypress.env(`${env}EnvUrl`);
    const requestManager = new RequestManager();

    cy.getUserData(options).then((response) => {
        if (response.status === 200) {
            const userUuid = response.body.uuid;
            requestManager.request({
                method: "DELETE",
                completeUrl: `${envUrl}/users/${userUuid}`,
                taskId
            }).then((response) => {
                if (response.status !== 204) {
                    cy.log(`RERUN the test. DELETE status should be 204, and it is: ${response.status}`);
                }
            })
        }
    });
});

Cypress.Commands.add('createUser', (options) => {
    const { env, taskId } = options;
    const envUrl = Cypress.env(`${env}EnvUrl`);
    const requestManager = new RequestManager();

    return requestManager.request({
        method: "POST",
        completeUrl: `${envUrl}/users`,
        requestBody: users.newUser,
        taskId
    }).then((response) => {
        if (response.status !== 409 && response.status !== 200) {
            cy.log(`RERUN the test. POST status should be 200 or 409, and it is: ${response.status}`);
        } else if (response.status === 409) {
            cy.log('User already exists');
        } else {
            return response;
        }
    });
});

Cypress.Commands.add('getUserData', (options) => {
    const { env, taskId } = options;
    const envUrl = Cypress.env(`${env}EnvUrl`);
    const requestManager = new RequestManager();

    return requestManager.request({
        method: "POST",
        completeUrl: `${envUrl}/users/login`,
        requestBody: { email: users.newUser.email, password: users.newUser.password },
        taskId
    }).then((response) => {
        if (response.status !== 404 && response.status !== 200) {
            cy.log(`RERUN the test. POST status should be 200 or 404, and it is: ${response.status}`);
        } else {
            return response;
        }
    });
});

Cypress.Commands.add('getUsers', (options) => {
    const { env, taskId } = options;
    const envUrl = Cypress.env(`${env}EnvUrl`);
    const requestManager = new RequestManager();

    return requestManager.request({
        method: "GET",
        completeUrl: `${envUrl}/users`,
        taskId
    }).then((response) => {
        if(response.status === 200){
            return response;
        } else {
            cy.log(`RERUN the test. GET status should be 200, and it is: ${response.status}`);
        }
    });
});

Cypress.Commands.add('getGames', (options) => {
    const { env, taskId } = options;
    const envUrl = Cypress.env(`${env}EnvUrl`);
    const requestManager = new RequestManager();

    return requestManager.request({
        method: "GET",
        completeUrl: `${envUrl}/games`,
        taskId
    }).then((response) => {
        if(response.status === 200){
            return response;
        } else {
            cy.log(`RERUN the test. GET status should be 200, and it is: ${response.status}`);
        }
    });
});

Cypress.Commands.add('getWishlist', (options) => {
    const { env, taskId, userUuid } = options;
    const envUrl = Cypress.env(`${env}EnvUrl`);
    const requestManager = new RequestManager();

    return requestManager.request({
        method: "GET",
        completeUrl: `${envUrl}/users/${userUuid}/wishlist`,
        taskId
    }).then((response) => {
        if(response.status === 200){
            return response;
        } else {
            cy.log(`RERUN the test. GET status should be 200, and it is: ${response.status}`);
        }
    });
});

Cypress.Commands.add('addItemToCart', (options) => {
    const { env, taskId, userUuid, cartItems } = options;
    const envUrl = Cypress.env(`${env}EnvUrl`);
    const requestManager = new RequestManager();

    return requestManager.request({
        method: "POST",
        completeUrl: `${envUrl}/users/${userUuid}/cart/add`,
        taskId,
        requestBody: cartItems
    }).then((response) => {
        if(response.status === 200){
            return response;
        } else {
            cy.log(`RERUN the test. GET status should be 200, and it is: ${response.status}`);
        }
    });
});

Cypress.Commands.add('createOrder', (options) => {
    const { env, taskId, userUuid, items } = options;
    const envUrl = Cypress.env(`${env}EnvUrl`);
    const requestManager = new RequestManager();

    return requestManager.request({
        method: "POST",
        completeUrl: `${envUrl}/users/${userUuid}/orders`,
        taskId,
        requestBody: {items}
    }).then((response) => {
        if(response.status === 200){
            return response;
        } else {
            cy.log(`RERUN the test. GET status should be 200, and it is: ${response.status}`);
        }
    });
});

Cypress.Commands.add('createPayment', (options) => {
    const { env, taskId, userUuid, order_uuid, payment_method } = options;
    const envUrl = Cypress.env(`${env}EnvUrl`);
    const requestManager = new RequestManager();

    return requestManager.request({
        method: "POST",
        completeUrl: `${envUrl}/users/${userUuid}/payments`,
        taskId
    }).then((response) => {
        if(response.status === 200){
            return response;
        } else {
            cy.log(`RERUN the test. GET status should be 200, and it is: ${response.status}`);
        }
    });
});