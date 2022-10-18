// eslint-disable-next-line max-classes-per-file
class RequestError extends Error {
  constructor(message) {
    super(message)
    this.name = 'RequestError'
  }
}
class AttemptsLimitError extends Error {
  constructor(message) {
    super(message)
    this.name = 'AttemptsExceededError'
  }
}

export { RequestError, AttemptsLimitError }
