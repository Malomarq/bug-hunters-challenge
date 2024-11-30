import { taskAPI16 } from "../fixtures";

describe("Task id: api-16", () => {
    const tests = taskAPI16;

    tests.forEach((test) => {
        it(`[${test.taskId}] - ${test.envAPI} env`, () => {
            cy.restoreSetup({ env: test.envAPI });
            cy.getUsers({ env: test.envAPI, taskId: test.taskId }).then((allUsers) => {
                const firstUserUuid = allUsers.body.users[0].uuid;
                cy.getGames({ env: test.envAPI, taskId: test.taskId }).then((allGames) => {
                    const firstGameUuid = allGames.body.games[0].uuid;
                    // cy.addItemToCart({ env: test.envAPI, taskId: test.taskId, userUuid: firstUserUuid, itemUuid: firstGameUuid }).then((response) => {
                    //    console.log(response);
                    const items = [
                            {
                            item_uuid: firstGameUuid,
                            quantity: 2,
                        }
                    ];
                   // cy.createOrder({ env:test.envAPI, taskId: test.taskId, userUuid: firstUserUuid, items });
                    test.env = Cypress.env(`${test.envAPI}EnvUrl`);
                    test.url = `/users/${firstUserUuid}${test.url}`;
                    test.requestBody = {items};
                    cy.instanceRunner(test);
                    //});
                });
            });
        });
    });

    // DEV env:
});