import { taskAPI21 } from "../fixtures";

describe("Task id: api-21", () => {
    const test = taskAPI21;

    const buildSetup = (env) => {
        cy.deleteUser({ env, taskId: test.taskId });
    };

    const runTestForEnv = (env) => {
        it(`[${test.taskId}] - ${env} env`, () => {
            cy.wrap(buildSetup(env)).then(() => {
                test.env = Cypress.env(`${env}EnvUrl`);
                cy.instanceRunner(test);
            });
        });
    };

    runTestForEnv("release");
    runTestForEnv("dev"); // DEV env: meta.total viene como 0 y debería ser 11
});