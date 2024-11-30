import { taskAPI10 } from "../fixtures";
import { RequestManager } from "../utils/requestManager";

describe("Task id: api-10", () => {
    const test = taskAPI10;
    const requestManager = new RequestManager();

    const runTestForEnv = (env) => {
        it(`[${test.taskId}] - ${env} env`, () => {
            test.env = Cypress.env(`${env}EnvUrl`);
            const preRequestUrl = `${test.env}${test.preRequest}`;
            requestManager.request({
                method: test.method,
                completeUrl: preRequestUrl,
                taskId: test.taskId
            }).then((response) => {
                const categoryUuid = response.body.categories[0].uuid;
                test.url = `${test.preRequest}/${categoryUuid}${test.lastRequest}`;
                cy.instanceRunner(test);
            });
        });
    };

    runTestForEnv("release");
    runTestForEnv("dev"); // DEV env: los resultados son distintos en ambos env. Debería llegar el juego ""
});