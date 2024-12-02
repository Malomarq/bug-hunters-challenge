import { taskAPI2 } from "../fixtures";

describe("Task id: api-2", () => {
    const tests = taskAPI2;

    tests.forEach((test) => {
        it(`[${test.taskId}] - ${test.envAPI} env`, () => {
            test.env = Cypress.env(`${test.envAPI}EnvUrl`);
            cy.instanceRunner(test);
        });
    });
});