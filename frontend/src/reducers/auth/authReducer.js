import * as types from "../../types/actionTypes";

const initialState = {
  authenticated: false,
  registration_message: ""
};

const registration_message = "You have been registered successfully.";

function authReducer(state = initialState, action) {
  switch (action.type) {
    case types.AUTHENTICATED:
      return { authenticated: true, registration_message: "" };
    case types.UNAUTHENTICATED:
      return { authenticated: false, registration_message: "" };
    case types.REGISTRATION_SUCCESS_MESSAGE:
      return { ...state, registration_message: registration_message };
    default:
      return state;
  }
}

export default authReducer;
