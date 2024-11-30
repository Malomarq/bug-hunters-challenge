import { taskAPI3 } from "../fixtures";
import users from "../fixtures/data/user.json";

describe("Task id: api-3", () => {
    const tests = taskAPI3;

    const buildSetup = (options) => {
        const { env, taskId } = options;
        cy.deleteUser({ env, taskId });
    };

    tests.forEach((test) => {
        it(`[${test.taskId}] - ${test.envAPI} env`, () => {
            cy.wrap(buildSetup({ env: test.envAPI, taskId: test.taskId })).then(() => {
                test.env = Cypress.env(`${test.envAPI}EnvUrl`);
                test.requestBody = users.newUser;
                cy.instanceRunner(test);
            });
        });
    });

    // DEV env: no se almacena el nickname
});