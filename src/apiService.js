export default class ApiService {
  static async getSearchID() {
    const res = await fetch('https://front-test.dev.aviasales.ru/search')
    if (!res.ok) throw new Error('Can`t get searchId')
    const body = await res.json()
    return body.searchId
  }

  static async getTickets(searchId) {
    const res = await fetch(`https://front-test.dev.aviasales.ru/tickets?searchId=${searchId}`)
    if (!res.ok) throw new Error('Can`t fetch')
    const body = await res.json()
    return body
  }
}
