import { taskAPI23 } from "../fixtures";

describe("Task id: api-23", () => {
    const tests = taskAPI23;

    tests.forEach((test) => {
        it(`[${test.taskId}] - ${test.envAPI} env`, () => {
            cy.getUsers({ env: test.envAPI, taskId: test.taskId }).then((getUsersData) => {
                const firstUsersData = getUsersData.body.users[0].uuid;
                test.env = Cypress.env(`${test.envAPI}EnvUrl`);
                test.url = `${test.url}${firstUsersData}`;
                cy.instanceRunner(test);
            });
        });
    });

    // DEV env: bug not found
});