import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import {composeWithDevTools} from 'redux-devtools-extension'
import board from './board'
import algorithm from './algorithm'

const reducer = combineReducers({board, algorithm})
const middleware = composeWithDevTools(
  applyMiddleware(createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
