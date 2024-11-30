import { taskAPI6 } from "../fixtures";

describe("Task id: api-6", () => {
    const tests = taskAPI6;

    const buildSetup = (options) => {
        const { env, taskId } = options;
        cy.deleteUser({ env, taskId });
    };

    tests.forEach((test) => {
        it(`[${test.taskId}] - ${test.envAPI} env`, () => {
            cy.wrap(buildSetup({ env: test.envAPI, taskId: test.taskId })).then(() => {
                test.env = Cypress.env(`${test.envAPI}EnvUrl`);
                cy.instanceRunner(test);
            });
        });
    });

    // DEV env: con la petición que se ha hecho (/users?limit=5&offset=20) el array de users debería llegar vacío, pero llega con 5 users: offset se toma como 0
});