import { taskAPI13 } from "../fixtures";

describe("Task id: api-13", () => {
    const tests = taskAPI13;

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
                            test.requestBody = {
                                item_uuid: firstGameUuid,
                                quantity: 3
                            };
                            cy.instanceRunner(test);
                        }
                    });
                });
            });
        });
    });

    // DEV env: al cambiar una propiedad del item del carrito, se elimina el item completo del carrito
});