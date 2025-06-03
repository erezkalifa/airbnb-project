import { stayReducer } from "./stay/stay.reducers.js";
import { userReducer } from "./user/user.reducer.js";
import { thunk } from "redux-thunk";
import {
  applyMiddleware,
  legacy_createStore as createStore,
  combineReducers,
  compose,
} from "redux";

const rootReducer = combineReducers({
  stayModule: stayReducer,
  userModule: userReducer,
});

// const middleware = applyMiddleware(thunk)

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);
