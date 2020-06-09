import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import rootReducer from "./reducers/";
import refreshAuthToken from "./customMiddleware/refreshAuthTokenMw";

const middlewares = [refreshAuthToken, thunk];

// Log only in development
if (process.env.NODE_ENV === "development") {
  const { logger } = require("redux-logger");
  middlewares.push(logger);
}

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middlewares))
);

//Email / Username login
let auth_token;
if (navigator.cookieEnabled) {
  auth_token = localStorage.getItem("ecom_token");
}

if (auth_token) {
  store.dispatch({ type: "AUTHENTICATED" });
}
