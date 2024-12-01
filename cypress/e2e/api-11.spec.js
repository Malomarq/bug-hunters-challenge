import { taskAPI11 } from "../fixtures";
import users from "../fixtures/data/user.json";
import { RequestManager } from "../utils/requestManager";

describe("Task id: api-11", () => {
    const tests = taskAPI11;

    const buildImageForBody = () => {
        return cy.fixture('data/image.jpg', 'base64').then((fileContent) => {
            const blob = Cypress.Blob.base64StringToBlob(fileContent, 'image/jpeg');
            const file = new File([blob], 'image.jpg', { type: 'image/jpeg' })
            const formData = new FormData();
            formData.append('avatar_file', file);
            return formData;
        });
    }

    tests.forEach((test) => {
        it(`[${test.taskId}] - ${test.envAPI} env`, () => {
            cy.restoreSetup({ env: test.envAPI });
            cy.getUsers({ env: test.envAPI, taskId: test.taskId }).then((allUsers) => {
                const userUuid = allUsers.body.users[0].uuid;
                buildImageForBody().then((bodyImage) => {

                    const envUrl = Cypress.env(`${test.envAPI}EnvUrl`);
                    const requestManager = new RequestManager();

                    requestManager.request({
                        method: "PUT",
                        completeUrl: `${envUrl}/users/${userUuid}/avatar`,
                        taskId: test.taskId,
                        requestBody: bodyImage
                    }).then((response) => {
                        expect(response.status).to.equal(200);

                        test.env = envUrl;
                        test.url = `${test.url}${userUuid}`;
                        cy.instanceRunner(test);
                    });
                })
            });
        });
    });

    // DEV env: no se está seteando la url en el campo de avatar
});