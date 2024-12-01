import { taskAPI19 } from "../fixtures";

describe("Task id: api-19", () => {
    const tests = taskAPI19;

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
                        const orderItems = {
                            items: [{
                                item_uuid: firstGameUuid,
                                quantity: 2,
                            }]
                        };

                        cy.createOrder({ env: test.envAPI, taskId: test.taskId, userUuid: firstUserUuid, orderItems }).then((orderResponse) => {
                            const orderUuid = orderResponse.body.uuid;
                            cy.createPayment({ env: test.envAPI, taskId: test.taskId, userUuid: firstUserUuid, orderUuid, paymentMethod: "card" }).then((createPaymentResponse) => {
                                console.log(createPaymentResponse);
                                const paymentUuid = createPaymentResponse.body.uuid;

                                test.env = Cypress.env(`${test.envAPI}EnvUrl`);
                                test.url = `${test.url}${paymentUuid}`;
                                cy.instanceRunner(test);
                            });
                        })
                    });
                });
            });
        });
    });

    // DEV env: en el payment no vienen los campos de updated_at ni created_at
});