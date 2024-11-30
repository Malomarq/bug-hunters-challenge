import { taskAPI6 } from "../fixtures";

describe("Task id: api-6", () => {
    const test = taskAPI6;

    const buildSetup = (env) => {
        cy.deleteUser({ env, taskId: test.taskId });
    };

    const runTestForEnv = (env) => {
        it(`[${test.taskId}] - ${env} env`, () => {
            cy.wrap(buildSetup(env)).then(() => {
                test.env = Cypress.env(`${env}EnvUrl`);
                cy.instanceRunner(test);
            });
        });
    };

    runTestForEnv("release");
    runTestForEnv("dev"); // DEV env: con la petición que se ha hecho (/users?limit=5&offset=20) el array de users debería llegar vacío, pero llega con 5 users: offset se toma como 0
});