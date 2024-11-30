import { taskAPI6 } from "../fixtures";

describe("Task id: api-6", () => {
    const test = taskAPI6;

    const runTestForEnv = (env) => {
        it(`[${test.taskId}] - ${env} env`, () => {
            test.env = Cypress.env(`${env}EnvUrl`);
            cy.instanceRunner(test);
        });
    };

    runTestForEnv("release");
    runTestForEnv("dev");
});