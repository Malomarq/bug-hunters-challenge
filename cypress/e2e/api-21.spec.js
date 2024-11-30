import { taskAPI21 } from "../fixtures";

describe("Task id: api-21", () => {
    const tests = taskAPI21;

    const buildSetup = (options) => {
        const { env, taskId } = options;
        cy.deleteUser({ env, taskId });
    };

    tests.forEach((test) => {
        it(`[${test.taskId}] - ${test.envAPI} env`, () => {
            cy.wrap(buildSetup({ env: test.envAPI, taskId: test.taskId })).then(() => {
                test.env = Cypress.env(`${test.envAPI}EnvUrl`);
                cy.instanceRunner(test);
            });
        });
    });

    // DEV env: meta.total viene como 0 y debería ser 11
});