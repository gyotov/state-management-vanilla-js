import Component from '../lib/component.js'
import store from '../store/index.js'

export default class List extends Component {
  constructor () {
    super({
      store,
      element: document.querySelector('.js-items')
    })

    this.render = this.render.bind(this)
  }

  render () {
    if (store.state.items.length === 0) {
      this.element.innerHTML = '<p>No items yet</p>'

      return
    }

    this.element.innerHTML = `
      <ul>
        ${store.state.items.map(item => {
          return `
            <li>
              ${item}
              <button>Delete</button>
            </li>
          `
        }).join('')}
      </ul>
    `

    this.element.querySelectorAll('button').forEach((button, index) => {
      button.addEventListener('click', () => {
        store.dispatch('clearItem', { index })
      })
    })
  }
}
