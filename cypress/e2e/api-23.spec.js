import { taskAPI23 } from "../fixtures";

describe("Task id: api-23", () => {
    const tests = taskAPI23;

    tests.forEach((test) => {
        it(`[${test.taskId}] - ${test.envAPI} env`, () => {
            cy.restoreSetup({ env: test.envAPI });
            cy.getUsers({ env: test.envAPI, taskId: test.taskId }).then((getUsersData) => {
                const firstUsersData = "00000000-0000-4562-b3fc-2c963f66afa6";
                test.env = Cypress.env(`${test.envAPI}EnvUrl`);
                test.url = `${test.url}${firstUsersData}`;
                cy.instanceRunner(test);
            });
        });
    });
});