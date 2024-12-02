import { taskAPI1 } from "../fixtures";

describe("Task id: api-1", () => {
    const tests = taskAPI1;

    const buildSetup = (options) => {
        const { env, taskId } = options;
        cy.createUser({ env, taskId });
    };

    tests.forEach((test) => {
        it(`[${test.taskId}] - ${test.envAPI} env`, () => {
            cy.restoreSetup({ env: test.envAPI });
            cy.createUser({ env: test.envAPI, taskId: test.taskId }).then((userData) => {
            //cy.wrap(buildSetup({ env: test.envAPI, taskId: test.taskId })).then(() => {
                //cy.getUserData({ env: test.envAPI, taskId: test.taskId }).then((userData) => {
                    const userUuid = userData.body.uuid;
                    test.env = Cypress.env(`${test.envAPI}EnvUrl`);
                    test.url = `${test.url}${userUuid}`;
                    cy.instanceRunner(test);
                //});
            });
        });
    });

    // DEV env: status 500
});