import { taskAPI12 } from "../fixtures";

describe("Task id: api-12", () => {
    const tests = taskAPI12;

    tests.forEach((test) => {
        it(`[${test.taskId}] - ${test.envAPI} env`, () => {
            cy.restoreSetup({ env: test.envAPI });
            cy.getUsers({ env: test.envAPI, taskId: test.taskId }).then((allUsers) => {
                const firstUserUuid = allUsers.body.users[0].uuid;
                cy.getGames({ env: test.envAPI, taskId: test.taskId }).then((allGames) => {
                    const firstGameUuid = allGames.body.games[0].uuid;
                    cy.addItemToCart({ env: test.envAPI, taskId: test.taskId, userUuid: firstUserUuid, itemUuid: firstGameUuid }).then((response) => {
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

    // DEV env: total_price es 0, cuando en release contiene el mismo valor que item.total_price
});