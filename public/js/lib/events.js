export default class Events {
  constructor () {
    this.eventExist = this.eventExist.bind(this)
    this.subscribe = this.subscribe.bind(this)
    this.publish = this.publish.bind(this)

    this.events = {}
  }

  eventExist (event) {
    return this.events.hasOwnProperty(event)
  }

  subscribe (event, callback) {
    if (!this.eventExist(event)) {
      this.events[event] = []
    }

    return this.events[event].push(callback)
  }

  publish (event, data = {}) {
    if (!this.eventExist(event)) {
      return []
    }

    return this.events[event].map(callback => callback(data))
  }
}
