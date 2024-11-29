import { pacoTests } from "../fixtures";

describe("Prueba", () => {
    pacoTests['tests'].forEach((test) => {
        it(`prueba - ${test.id}`, () => {
            cy.instanceRunner(test);
        });
    });
});