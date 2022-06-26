import { createStore, combineReducers, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import auth from "./auth";
import singleUser from "./singleUser";
import allUsersReducer from "./allUsers";
import singleBand from "./singleBand";
import singleSong from "./singleSong";

const reducer = combineReducers({
  auth: auth,
  user: singleUser,
  users: allUsersReducer,
  band: singleBand,
  song: singleSong,
});
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

export default store;
export * from "./auth";
