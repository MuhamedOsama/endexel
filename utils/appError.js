class AppError extends Error {
    constructor(errMessage, statusCode,message) {
        
        super(message);
        this.statusCode = statusCode
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error'
        this.isOperational = true;
        this.errMessage = errMessage
        Error.captureStackTrace(this, this.constructor)
    }
}

module.exports = AppError


