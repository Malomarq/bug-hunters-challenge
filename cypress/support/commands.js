import { Runner } from "../utils/runner";
import users from "../fixtures/data/user.json";
import { RequestManager } from "../utils/requestManager";

let storedResponse;

Cypress.Commands.add('instanceRunner', (test) => {
    const runner = new Runner(test);
    runner.runTest();
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

    requestManager.request({
        method: "POST",
        completeUrl: `${envUrl}/users/login`,
        requestBody: { email: users.newUser.email, password: users.newUser.password },
        taskId
    }).then((response) => {
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