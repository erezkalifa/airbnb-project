import { stayReducer } from "./stay/stay.reducers.js"
import {thunk} from 'redux-thunk'
import {
  applyMiddleware,
  legacy_createStore as createStore,
  combineReducers,
  compose,
} from "redux"

const rootReducer = combineReducers({
  stayModule: stayReducer,
})

const middleware = applyMiddleware(thunk)

const composeEnhancers = window._REDUX_DEVTOOLS_EXTENSION_COMPOSE_ || compose
export const store = createStore(rootReducer, compose(middleware))
