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
                    const cartItems =
                    {
                        item_uuid: firstGameUuid,
                        quantity: 2,
                    };
                    cy.addItemToCart({ env: test.envAPI, taskId: test.taskId, userUuid: firstUserUuid, cartItems }).then((response) => {
                        test.env = Cypress.env(`${test.envAPI}EnvUrl`);
                        test.url = `/users/${firstUserUuid}${test.url}`;
                        test.requestBody = {
                            items: [{
                                item_uuid: firstGameUuid,
                                quantity: 2,
                            },
                            {
                                item_uuid: firstGameUuid,
                                quantity: 1,
                            }]
                        };
                        cy.instanceRunner(test);
                    });
                });
            });
        });
    });

    // DEV env: en release no se puede meter items duplicados en el array de items, pero en dev sí
});