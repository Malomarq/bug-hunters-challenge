import { taskAPI21 } from "../fixtures";

describe("Task id: api-21", () => {
    const test = taskAPI21;

    const runTestForEnv = (env) => {
        it(`[${test.taskId}] - ${env} env`, () => {
            test.env = Cypress.env(`${env}EnvUrl`);
            cy.instanceRunner(test);
        });
    };

    runTestForEnv("release");
    runTestForEnv("dev");
});