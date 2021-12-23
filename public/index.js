import store from './js/store/index.js'
import Count from './js/components/count.js'
import List from './js/components/list.js'

const form = document.querySelector('.js-form')
const input = document.querySelector('.js-new-item-field')

form.addEventListener('submit', e => {
  e.preventDefault()

  const value = input.value.trim()

  if (!value.length) {
    return
  }

  store.dispatch('addItem', value)
  input.value = ''
  input.focus()
})

const countInstance = new Count()
const listInstance = new List()

countInstance.render()
listInstance.render()
