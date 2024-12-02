import { taskAPI7 } from "../fixtures";
import users from "../fixtures/data/user.json";

describe("Task id: api-7", () => {
    const tests = taskAPI7;

    const buildSetup = (options) => {
        const { env, taskId } = options;
        cy.createUser({ env, taskId });
    };

    tests.forEach((test) => {
        it(`[${test.taskId}] - ${test.envAPI} env`, () => {
            cy.restoreSetup({ env: test.envAPI });
            cy.wrap(buildSetup({ env: test.envAPI, taskId: test.taskId })).then(() => {
                test.env = Cypress.env(`${test.envAPI}EnvUrl`);
                test.requestBody = { email: users.newUser.email, password: users.newUser.password }
                cy.instanceRunner(test);
            });
        });
    });

    // DEV env: status 404 ("Could not find user with given credentials") a pesar de que la petición previa de creación de usuario da 409 ("User with the following "email" already exists: spongeBob@gmail.com")
});