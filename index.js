class Causes {
  constructor (error) {
    this.error = error
  }

  static from (error) {
    return new Causes(error)
  }

  toArray () {
    return Array.from(this)
  }

  [Symbol.iterator] () {
    let value = getCause(this.error)
    let done = !value

    return {
      next () {
        if (done) return { done }
        const result = { value, done }
        value = getCause(value)
        done = !value
        return result
      }
    }
  }
}

function getCause (error) {
  return typeof error.cause === 'function'
    ? error.cause()
    : error.cause
}

module.exports = Causes
