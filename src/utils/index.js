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

export async function myRequest(request, params = {}, requestsNumber = 1) {
  try {
    const res = await fetch(request, params)
    if (!res.ok) throw new RequestError(`Couldn’t fetch, received ${res.status}`)
    if (requestsNumber === 0) throw new AttemptsLimitError('Attempts limit exceeded')
    return await res.json()
  } catch (err) {
    if (err instanceof RequestError) return myRequest(request, params, requestsNumber - 1)
    throw err
  }
}

export { RequestError, AttemptsLimitError }
