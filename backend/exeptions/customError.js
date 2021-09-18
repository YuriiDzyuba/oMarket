class CustomError extends Error {
    constructor(status, message, customCode = '', body = {}) {
        super(message);
        this.status = status;
        this.customCode = customCode;
        this.body = body;

        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = CustomError;
