const ApiException = require('./apiException')

class UnauthorizedException extends ApiException {
  constructor () {
    super('Unauthorized')

    this.statusCode = 401
    this.name = this.constructor.name
    Error.captureStackTrace(this, this.constructor)
  }
}

module.exports = UnauthorizedException
