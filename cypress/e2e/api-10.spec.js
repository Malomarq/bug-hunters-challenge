import { taskAPI10 } from "../fixtures";
import { RequestManager } from "../utils/requestManager";

describe("Task id: api-10", () => {
    const tests = taskAPI10;
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
                cy.instanceRunner(test).then(() => {
                    cy.getStoredResponse().then((storedResponse) => {
                        const categoryUuidFromGame = storedResponse.body.games[0].category_uuids[0];
                        expect(categoryUuidFromGame).to.equal(categoryUuid);
                    });
                });
            });
        });
    });

    // DEV env: los resultados son distintos en ambos env. Debería llegar el mismo juego
});