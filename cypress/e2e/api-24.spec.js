import { taskAPI24 } from "../fixtures";

describe("Task id: api-24", () => {
    const tests = taskAPI24;

    tests.forEach((test) => {
        it(`[${test.taskId}] - ${test.envAPI} env`, () => {
            cy.getUsers({ env: test.envAPI, taskId: test.taskId }).then((getUsersData) => {
                const firstUsersData = getUsersData.body.users[0].uuid;
                test.env = Cypress.env(`${test.envAPI}EnvUrl`);
                test.url = `${test.url}${firstUsersData}`;
                const date = new Date().getMilliseconds();
                test.requestBody = { name: `Rosalia${date}` };
                cy.instanceRunner(test);
            });
        });
    });

    // DEV env: bug not found
});