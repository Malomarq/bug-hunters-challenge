import { taskAPI18 } from "../fixtures";

describe("Task id: api-18", () => {
    const tests = taskAPI18;

    tests.forEach((test) => {
        it(`[${test.taskId}] - ${test.envAPI} env`, () => {
            cy.restoreSetup({ env: test.envAPI });
            cy.getUsers({ env: test.envAPI, taskId: test.taskId }).then((allUsers) => {
                const firstUserUuid = allUsers.body.users[0].uuid;
                cy.getGames({ env: test.envAPI, taskId: test.taskId }).then((allGames) => {
                    const firstGameUuid = allGames.body.games[0].uuid;
                    const thirdGameUuid = allGames.body.games[2].uuid;
                    const firstOrderItems = {
                        items: [{
                            item_uuid: firstGameUuid,
                            quantity: 2,
                        }, {
                            item_uuid: thirdGameUuid,
                            quantity: 1,
                        }]
                    };

                    cy.createOrder({ env: test.envAPI, taskId: test.taskId, userUuid: firstUserUuid, orderItems: firstOrderItems }).then((createOrderResponse) => {
                        const orderUuid = createOrderResponse.body.uuid;
                        test.env = Cypress.env(`${test.envAPI}EnvUrl`);
                        test.url = `/orders/${orderUuid}${test.url}`;
                        test.requestBody = { status: "canceled" };
                        cy.instanceRunner(test);
                    });
                });
            });
        });
    });
});