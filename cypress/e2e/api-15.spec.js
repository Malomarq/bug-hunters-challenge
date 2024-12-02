import { taskAPI15 } from "../fixtures";

describe("Task id: api-15", () => {
    const tests = taskAPI15;

    tests.forEach((test) => {
        it(`[${test.taskId}] - ${test.envAPI} env`, () => {
            cy.restoreSetup({ env: test.envAPI });
            cy.getUsers({ env: test.envAPI, taskId: test.taskId }).then((allUsers) => {
                const firstUserUuid = allUsers.body.users[0].uuid;
                cy.getGames({ env: test.envAPI, taskId: test.taskId }).then((allGames) => {
                    const firstGameUuid = allGames.body.games[0].uuid;
                    const cartItems =
                    {
                        item_uuid: firstGameUuid,
                        quantity: 2,
                    };
                    cy.addItemToCart({ env: test.envAPI, taskId: test.taskId, userUuid: firstUserUuid, cartItems }).then((response) => {
                        if (response.status === 200) {
                            test.env = Cypress.env(`${test.envAPI}EnvUrl`);
                            test.url = `/users/${firstUserUuid}${test.url}`;
                            cy.instanceRunner(test);
                        }
                    });
                });
            });
        });
    });
});