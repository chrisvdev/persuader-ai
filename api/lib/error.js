export default function createCustomError (type = 'error') {
  class CustomError extends Error {
    constructor (error) {
      super()
      this.name = type
      this.message = error
    }
  }
  return CustomError
}
