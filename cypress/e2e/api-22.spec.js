import { taskAPI22 } from "../fixtures";
import users from "../fixtures/data/user.json";

describe("Task id: api-22", () => {
    const tests = taskAPI22;

    tests.forEach((test) => {
        it(`[${test.taskId}] - ${test.envAPI} env`, () => {
                cy.restoreSetup({ env: test.envAPI });
                test.env = Cypress.env(`${test.envAPI}EnvUrl`);
                test.requestBody = {
                    "email": "sergio@gmail.com",
                    "password": "sergiomax",
                    "name": "sergio",
                    "nickname": "sergioMax"
                }
                cy.instanceRunner(test);
        });
    });
});