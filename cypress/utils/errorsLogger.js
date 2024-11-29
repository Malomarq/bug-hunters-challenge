export class ErrorsLogger {
    constructor() {
        this.errors = [];
    }

    addError(error) {
        this.errors.push(`**ERROR** | ${error}`);
    }

    logErrors() {
        if (this.errors.length > 0) {
            this.throwErrors(this.errors.join('\n'));
        }
    }

    throwErrors(error) {
        throw new Error(error);
    }
}