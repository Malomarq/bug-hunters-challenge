import { taskAPI23 } from "../fixtures";

describe("Task id: api-23", () => {
    const test = taskAPI23;

    const runTestForEnv = (env) => {
        it(`[${test.taskId}] - ${env} env`, () => {
            cy.getUsers({env, taskId: test.taskId}).then((getUsersData) => {
                const firstUsersData = getUsersData.body.users[0].uuid;
                test.env = Cypress.env(`${env}EnvUrl`);
                test.url = `${test.url}${firstUsersData}`;
                cy.instanceRunner(test);
            });
        });
    }

    runTestForEnv("release");
    runTestForEnv("dev"); // DEV env: status 400 porque interpreta el uuid como de más de 36 digítos, lo que es incorrecto
});