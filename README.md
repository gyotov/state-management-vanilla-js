# State management with vanilla JS.
No packages, frameworks or dependencies.

## Prerequisites
- ES6+
- [JS OOP](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Object-oriented_JS)
- [JS ES6+ classes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes)
- Native web browser [JS modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)
- Basic grasp over [publish/subscription](https://docs.microsoft.com/en-us/azure/architecture/patterns/publisher-subscriber) design pattern
- Previous work experience with Redux/MobX/Vuex is a plus
- Familiarity with ES6 [Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy)

## Startup and testing
1. Do `yarn`, to install the `live-server` package, for files serving.
**Note:** Local open from path like `file://` won't work, because of CORS policy for JS modules.
2. Hit `yarn start` to start files serving.
3. Observe how this tiny Store API is working in real time, re-rendering content on Store data change.

## API
### Publish / Subscribe - events.js
This is the place, where we save an event name, along with a callback to run, as well as to run all callbacks saved, on practicular event.

### Store - store.js
This is the actual store. It accepts params on instantiation for actions, mutations and initial state.
The initial state lies in `store/state.js`.
Also, we have a Proxy, which watches the state upon change and emits event publish for `stateChange`, which triggers all callbacks from the array, created on subscribe.
The `dispatch` registers the required action, and the `commit` actually changes the date via the mutations.
Mutations and actions are defined in `store/actions.js`, `store/mutations.js`
The `store/index.js` is the place where we actually instantiate the Store, passing the actions, mutations and the initial state.

### Components
There is a base class for components, which subscribes to a practicular event. In this case, `stateChange`, but depending on the case, it can be any event.
In the components folder, we have example components, to show off the power of Store we've created. There, we define the callback function to execute on the subscribed event, which in our case is `render`.

## Notes
1. This is a simple idea of state management, that can be expanded to handle large data management, either from a database or an API.
2. For the purpose of the example, there is no logic to render only specific part of the HTML, in order to lightweight it. If this becomes more complex, you should consider it.
3. This little example, can be used to empower your website/app with global state management. All you need to do, is:
- To modify the initial `state.js` file to suit your needs. For example:
```
export default {
  product: [object Object],
  cart: [object Object],
  collection: [object Object],
  filters: [object Object],
  ...and so on
}
```
- Then, to mutate this data, you need to add/modify actions/mutations methods, according to your logic
- Lastly, wire up your components to subscribe to changes in the related state
- In most cases, you would not want to modify the following files:
`store.js`
`store/index.js`
`lib/events.js`

## State management application areas:
1. Complex apps/websites, requiring multiple elements to use the same data, updating on-the-go.
2. Websites/apps where frameworks like Redux/MobX/Vuex are absent.
3. Anywhere you want more reactive elements.
