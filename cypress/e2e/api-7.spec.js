import { taskAPI7 } from "../fixtures";
import users from "../fixtures/data/user.json";

describe("Task id: api-7", () => {
    const test = taskAPI7;

    const buildSetup = (env) => {
        cy.createUser({env, taskId: test.taskId});
    };

    const runTestForEnv = (env) => {
        it(`[${test.taskId}] - ${env} env`, () => {
            cy.wrap(buildSetup(env)).then(() => {
                test.env = Cypress.env(`${env}EnvUrl`);
                test.requestBody = { email: users.newUser.email, password: users.newUser.password }
                cy.instanceRunner(test);
            });
        });
    }

    runTestForEnv("release");
    runTestForEnv("dev"); // DEV env: status 404 ("Could not find user with given credentials") a pesar de que la petición previa de creación de usuario da 409 ("User with the following "email" already exists: spongeBob@gmail.com")
});