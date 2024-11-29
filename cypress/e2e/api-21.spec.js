import { taskAPI21 } from "../fixtures";

describe("Task id: api-21", () => {
    const test = taskAPI21;
   it(`[${test.taskId}] - Release env`, () => {
        test.env = Cypress.env("releaseEnvUrl");
        cy.instanceRunner(test);
    });
});