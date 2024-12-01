import { taskAPI17 } from "../fixtures";

describe("Task id: api-17", () => {
    const tests = taskAPI17;

    tests.forEach((test) => {
        it(`[${test.taskId}] - ${test.envAPI} env`, () => {
            cy.restoreSetup({ env: test.envAPI });
            cy.getUsers({ env: test.envAPI, taskId: test.taskId }).then((allUsers) => {
                const firstUserUuid = allUsers.body.users[0].uuid;
                cy.getGames({ env: test.envAPI, taskId: test.taskId }).then((allGames) => {
                    const firstGameUuid = allGames.body.games[0].uuid;
                    const secondGameUuid = allGames.body.games[1].uuid;
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
                    const secondOrderItems = {
                        items: [{
                            item_uuid: secondGameUuid,
                            quantity: 1,
                        }]
                    };
                    const thirdOrderItems = {
                        items: [{
                            item_uuid: thirdGameUuid,
                            quantity: 1,
                        }]
                    };

                    cy.createOrder({ env: test.envAPI, taskId: test.taskId, userUuid: firstUserUuid, orderItems: firstOrderItems }).then(() => {
                        cy.createOrder({ env: test.envAPI, taskId: test.taskId, userUuid: firstUserUuid, orderItems: secondOrderItems }).then(() => {
                            cy.createOrder({ env: test.envAPI, taskId: test.taskId, userUuid: firstUserUuid, orderItems: thirdOrderItems }).then(() => {
                                test.env = Cypress.env(`${test.envAPI}EnvUrl`);
                                test.url = `/users/${firstUserUuid}${test.url}`;
                                cy.instanceRunner(test);
                            });
                        })
                    });
                });
            });
        });
    });

    // DEV env: no funciona el filtro limit (debería traer 2 y trae los 3)
});