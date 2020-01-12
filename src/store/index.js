import {createStore, combineReducers, applyMiddleware} from 'redux';
import {createLogger} from 'redux-logger';
import {composeWithDevTools} from 'redux-devtools-extension';
import board from './board';
import thunk from 'redux-thunk';

const reducer = combineReducers({board});
const middleware = composeWithDevTools(
  applyMiddleware(createLogger({collapsed: true}, thunk)),
);
const store = createStore(reducer, middleware);

export default store;
