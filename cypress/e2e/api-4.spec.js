import { taskAPI4 } from "../fixtures";

describe("Task id: api-4", () => {
    const tests = taskAPI4;

    tests.forEach((test) => {
        it(`[${test.taskId}] - ${test.envAPI} env`, () => {
            cy.getUsers({ env: test.envAPI, taskId: test.taskId }).then((getUsersData) => {
                const firstUsersData = getUsersData.body.users[0].uuid;
                //const firstUsersData = '1131311d-4fd9-420c-b111-55a34f3ade84'
                test.env = Cypress.env(`${test.envAPI}EnvUrl`);
                test.url = `${test.url}${firstUsersData}`;
                const date = new Date().getMilliseconds();
                test.requestBody = 
                { 
                    email: `luke${date}@gmail.com`, 
                    password: `luke${date}`,
                    name: `luke${date}`,
                    nickname: `2`,
                };
                cy.instanceRunner(test);
            });
        });
    });

    // DEV env: bug not found
});