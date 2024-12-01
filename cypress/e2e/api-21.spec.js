import { taskAPI21 } from "../fixtures";

describe("Task id: api-21", () => {
    const tests = taskAPI21;

    tests.forEach((test) => {
        it(`[${test.taskId}] - ${test.envAPI} env`, () => {
            cy.restoreSetup({ env: test.envAPI });
            test.env = Cypress.env(`${test.envAPI}EnvUrl`);
            cy.instanceRunner(test);
        });
    });

    // DEV env: meta.total viene como 0 y debería ser 11
});