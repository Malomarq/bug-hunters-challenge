import { taskAPI8 } from "../fixtures";

describe("Task id: api-8", () => {
    const tests = taskAPI8;

    tests.forEach((test) => {
        it(`[${test.taskId}] - ${test.envAPI} env`, () => {
            cy.restoreSetup({ env: test.envAPI });
            cy.getUsers({ env: test.envAPI, taskId: test.taskId }).then((allUsers) => {
                const firstUserUuid = allUsers.body.users[0].uuid;
                cy.getWishlist({ env: test.envAPI, taskId: test.taskId, userUuid: firstUserUuid }).then((getWishlist) => {
                    const firstGameUuid = getWishlist.body.items[0].uuid;
                    test.env = Cypress.env(`${test.envAPI}EnvUrl`);
                    test.url = `/users/${firstUserUuid}${test.url}`;
                    test.requestBody = { item_uuid: firstGameUuid }
                    cy.instanceRunner(test);
                });
            });
        });
    });

    // DEV env: status 200 pero no está eliminando el item de la lista
});