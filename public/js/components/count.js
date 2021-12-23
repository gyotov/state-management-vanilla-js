import Component from '../lib/component.js'
import store from '../store/index.js'

export default class Count extends Component {
  constructor () {
    super({
      store,
      element: document.querySelector('.js-count')
    })

    this.render = this.render.bind(this)
  }

  render () {
    this.element.innerHTML = `
      <p>${store.state.items.length} items in store</p>
    `
  }
}
