import { taskAPI3 } from "../fixtures";
import { RequestManager } from "../utils/requestManager";

describe("Task id: api-3", () => {
    const test = taskAPI3;
    const requestManager = new RequestManager();

    const runTestForEnv = (env) => {
        it(`[${test.taskId}] - ${env} env`, () => {
            test.env = Cypress.env(`${env}EnvUrl`);
            test.requestBody = {
                "email": "spongeBob@gmail.com",
                "password": "passwordspongeBob",
                "name": "SpongeBob",
                "nickname": "SpongeBobSquarePants"
            };
            cy.instanceRunner(test).then(() => {
                requestManager.request({
                    method: "POST",
                    completeUrl: `${test.env}/users/login`,
                    requestBody: { email: test.requestBody.email, password: test.requestBody.password },
                    taskId: test.taskId
                }).then((response) => {
                    const userUuid = response.body.uuid;
                    requestManager.request({
                        method: "DELETE",
                        completeUrl: `${test.env}/users/${userUuid}`,
                        taskId: test.taskId
                    }).then((response) => {
                        console.log(`DELETE status should be 204, and it is: ${response.status}`);
                    })
                });
            });
        });
    }

    runTestForEnv("release");
    runTestForEnv("dev"); // no se almacena el nickname
});