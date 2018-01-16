const { createStore } = require('redux')
const ADD = 'ADD'
const initState = {count: 0}
// action
function counter(state = initState, action) {
  switch(action.type) {
    case ADD:
      return {...state, count: state.count + action.payload.count}
    default:
      return state
  }
}
// reducer
const AddOne = () => ({type: ADD, payload: {count:1}})
// store
const store = createStore(counter)
store.subscribe(() => console.log(store.getState()))
setInterval(() => store.dispatch(AddOne()), 1000)