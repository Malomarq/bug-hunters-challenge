import { taskAPI14 } from "../fixtures";

describe("Task id: api-14", () => {
    const tests = taskAPI14;

    tests.forEach((test) => {
        it(`[${test.taskId}] - ${test.envAPI} env`, () => {
            cy.restoreSetup({ env: test.envAPI });
            cy.getUsers({ env: test.envAPI, taskId: test.taskId }).then((allUsers) => {
                const firstUserUuid = allUsers.body.users[0].uuid;
                cy.getGames({ env: test.envAPI, taskId: test.taskId }).then((allGames) => {
                    const firstGameUuid = allGames.body.games[0].uuid;
                    const secondGameUuid = allGames.body.games[1].uuid;
                    const firstCartItem =
                    {
                        item_uuid: firstGameUuid,
                        quantity: 2,
                    };
                    const secondCartItem =
                    {
                        item_uuid: secondGameUuid,
                        quantity: 1,
                    };
                    cy.addItemToCart({ env: test.envAPI, taskId: test.taskId, userUuid: firstUserUuid, cartItems: firstCartItem });
                    cy.addItemToCart({ env: test.envAPI, taskId: test.taskId, userUuid: firstUserUuid, cartItems: secondCartItem });
                    test.env = Cypress.env(`${test.envAPI}EnvUrl`);
                    test.url = `/users/${firstUserUuid}${test.url}`;
                    test.requestBody = {
                        item_uuid: firstGameUuid
                    };
                    cy.instanceRunner(test);

                });
            });
        });
    });
});