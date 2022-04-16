const ApiException = require('./apiException')

class ForbiddenException extends ApiException {
  constructor () {
    super('Forbidden')

    this.statusCode = 403
    this.name = this.constructor.name
    Error.captureStackTrace(this, this.constructor)
  }
}

module.exports = ForbiddenException
