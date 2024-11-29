import { taskAPI6 } from "../fixtures";

describe("Task id: api-6", () => {
    const test = taskAPI6;
   it(`[${test.taskId}] - Release env`, () => {
        test.env = Cypress.env("releaseEnvUrl");
        cy.instanceRunner(test);
    });

    it(`[${test.taskId}] - Dev env`, () => {
        test.env = Cypress.env("devEnvUrl");
        cy.instanceRunner(test);
    });
});