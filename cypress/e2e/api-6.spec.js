import { taskAPI6 } from "../fixtures";

describe("Task id: api-6", () => {
    const tests = taskAPI6;

    tests.forEach((test) => {
        it(`[${test.taskId}] - ${test.envAPI} env`, () => {
            cy.restoreSetup({ env: test.envAPI });
            test.env = Cypress.env(`${test.envAPI}EnvUrl`);
            cy.instanceRunner(test);
        });
    });
});