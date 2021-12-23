import Events from '../lib/events.js'

export default class Store {
  constructor (params) {
    this.dispatch = this.dispatch.bind(this)
    this.commit = this.commit.bind(this)

    this.actions = {}
    this.mutations = {}
    this.state = {}
    this.events = new Events()

    if (params.hasOwnProperty('actions')) {
      this.actions = params.actions
    }

    if (params.hasOwnProperty('mutations')) {
      this.mutations = params.mutations
    }

    this.state = new Proxy((params.state || {}), {
      set: (state, key, value) => {
        state[key] = value

        this.events.publish('stateChange', this.state)

        return true
      }
    })
  }

  dispatch (action, payload) {
    if (typeof this.actions[action] !== 'function') {
      console.error(`Action ${action} doesn't exist.`)

      return false
    }

    this.actions[action](this, payload)

    return true
  }

  commit (mutation, payload) {
    if (typeof this.mutations[mutation] !== 'function') {
      console.error(`Mutation "${mutation}" doesn't exist.`)

      return false
    }

    this.state = Object.assign(
      this.state,
      this.mutations[mutation](this.state, payload)
    )

    return true
  }
}
