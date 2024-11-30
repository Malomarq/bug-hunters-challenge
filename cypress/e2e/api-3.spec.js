import { taskAPI3 } from "../fixtures";

describe("Task id: api-3", () => {
    const test = taskAPI3;
    it(`[${test.taskId}] - Release env`, () => {
        test.env = Cypress.env("releaseEnvUrl");
        test.requestBody = {
            "email": "angelito@gmail.com",
            "password": "angelito1234",
            "name": "angel",
            "nickname": "angelito"
        };
        cy.instanceRunner(test);
    });

    xit(`[${test.taskId}] - Dev env`, () => {
        test.env = Cypress.env("devEnvUrl");
        cy.instanceRunner(test);
    });
});