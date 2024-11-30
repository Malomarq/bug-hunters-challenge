import { taskAPI9 } from "../fixtures";

describe("Task id: api-9", () => {
    const tests = taskAPI9;

    tests.forEach((test) => {
        it(`[${test.taskId}] - ${test.envAPI} env`, () => {
            cy.getGames({ env: test.envAPI, taskId: test.taskId }).then((allGames) => {
                const firstGameUuid = allGames.body.games[0].uuid;
                test.env = Cypress.env(`${test.envAPI}EnvUrl`);
                test.url = `${test.url}${firstGameUuid}`;
                cy.instanceRunner(test);
            });
        });
    });

    // DEV env: status 404: no funciona el filtrado, no puede encontrar un juego que previamente ha aparecido en la búsqueda general
});