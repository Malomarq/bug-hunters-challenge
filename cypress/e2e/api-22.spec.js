import { taskAPI22 } from "../fixtures";
import users from "../fixtures/data/user.json";

describe("Task id: api-22", () => {
    const test = taskAPI22;

    const buildSetup = (env) => {
        cy.deleteUser({env, taskId: test.taskId});
    };

    const runTestForEnv = (env) => {
        it(`[${test.taskId}] - ${env} env`, () => {
            cy.wrap(buildSetup(env)).then(() => {
                test.env = Cypress.env(`${env}EnvUrl`);
                test.requestBody = users.newUser;
                cy.instanceRunner(test);
            });
        });
    }

    runTestForEnv("release");
    runTestForEnv("dev"); // DEV env: error 500: pendiente de testeo
});