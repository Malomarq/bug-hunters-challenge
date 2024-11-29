import { Runner } from "../utils/runner"

Cypress.Commands.add('instanceRunner', (test) => {
    const runner = new Runner(test);
    runner.runTest();
})