
class AppError { 
    message;
    statusCode;

    constructor(message, statusCode = 401){
        this.message = message
        this.statusCode = statusCode
        
    }
}
module.exports = AppError