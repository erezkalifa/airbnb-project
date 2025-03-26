import { stayReducer } from "./stay/stay.reducers.js";
import {
  legacy_createStore as createStore,
  combineReducers,
  compose,
} from "redux";

const rootReducer = combineReducers({
  stayModule: stayReducer,
});

const composeEnhancers = window._REDUX_DEVTOOLS_EXTENSION_COMPOSE_ || compose;
export const store = createStore(rootReducer, composeEnhancers());
