const ApiException = require('./apiException')

class NotFoundException extends ApiException {
  constructor () {
    super('Not found')

    this.statusCode = 404
    this.name = this.constructor.name
    Error.captureStackTrace(this, this.constructor)
  }
}

module.exports = NotFoundException
