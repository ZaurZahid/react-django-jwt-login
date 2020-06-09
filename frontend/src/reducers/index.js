import { combineReducers } from "redux";

import authReducer from "./auth/authReducer";
import changePasswordReducer from "./auth/changePasswordReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  change_password: changePasswordReducer
});

export default rootReducer;
