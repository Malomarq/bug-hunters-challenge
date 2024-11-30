import { taskAPI1 } from "../fixtures";

describe("Task id: api-1", () => {
    const test = taskAPI1;

    const buildSetup = (env) => {
        cy.createUser({ env, taskId: test.taskId });
    };

    const runTestForEnv = (env) => {
        it(`[${test.taskId}] - ${env} env`, () => {
            cy.wrap(buildSetup(env)).then(() => {
                cy.getUserData({ env, taskId: test.taskId }).then((userData) => {
                    const userUuid = userData.body.uuid;
                    test.env = Cypress.env(`${env}EnvUrl`);
                    test.url = `${test.url}${userUuid}`;
                    cy.instanceRunner(test);
                });
            });
        });
    }

    runTestForEnv("release");
    runTestForEnv("dev"); // DEV env: status 400 porque interpreta el uuid como de más de 36 digítos, lo que es incorrecto
});