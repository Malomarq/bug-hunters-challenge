import { taskAPI3 } from "../fixtures";
import users from "../fixtures/data/user.json";

describe("Task id: api-3", () => {
    const test = taskAPI3;

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
    runTestForEnv("dev"); // DEV env: no se almacena el nickname
});