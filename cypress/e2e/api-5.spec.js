import { taskAPI5 } from "../fixtures";

describe("Task id: api-5", () => {
    const tests = taskAPI5;

    tests.forEach((test) => {
        it(`[${test.taskId}] - ${test.envAPI} env`, () => {
            cy.restoreSetup({ env: test.envAPI });
            cy.getUsers({ env: test.envAPI, taskId: test.taskId }).then((allUsers) => {
                cy.getGames({ env: test.envAPI, taskId: test.taskId }).then((allGames) => {
                    const firstGameUuid = allGames.body.games[0].uuid;
                    const firstUserUuid = allUsers.body.users[0].uuid;
                    test.env = Cypress.env(`${test.envAPI}EnvUrl`);
                    test.url = `/users/${firstUserUuid}${test.url}`;
                    test.requestBody = { item_uuid: firstGameUuid }
                    cy.instanceRunner(test);
                });
            });
        });
    });
});