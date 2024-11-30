import { taskAPI10 } from "../fixtures";
import { RequestManager } from "../utils/requestManager";

describe("Task id: api-10", () => {
    const tests = taskAPI10;
    let responsesToBeCompared = [];
    const requestManager = new RequestManager();

    tests.forEach((test) => {
        it(`[${test.taskId}] - ${test.envAPI} env`, () => {
            test.env = Cypress.env(`${test.envAPI}EnvUrl`);
            const preRequestUrl = `${test.env}${test.preRequest}`;
            requestManager.request({
                method: test.method,
                completeUrl: preRequestUrl,
                taskId: test.taskId
            }).then((response) => {
                const categoryUuid = response.body.categories[0].uuid;
                test.url = `${test.preRequest}/${categoryUuid}${test.lastRequest}`;
                cy.instanceRunner(test);
                if (test.zod.compareResponsesBetweenEnvs) {
                    cy.getStoredResponse().then((storedResponse) => {
                        responsesToBeCompared.push(storedResponse);
                        cy.wrap(responsesToBeCompared).as("responses");
                    });
                }
            });
        });
    });

    after(() => {
        tests.forEach((test) => {
            cy.get("@responses").then((responses) => {
                if (test.zod.compareResponsesBetweenEnvs && responsesToBeCompared.length > 1) {
                    const releaseSelectedGame = responses[0].body.games[0].uuid;
                    const devSelectedGame = responses[1].body.games[0].uuid;
                    expect(releaseSelectedGame).to.equal(devSelectedGame, `Games uuids are different.\nRelease selected game uuid: ${releaseSelectedGame}. \nDev selected game uuid: ${devSelectedGame}\n`);
                }
            });
        });
    });

    // DEV env: los resultados son distintos en ambos env. Debería llegar el mismo juego
});