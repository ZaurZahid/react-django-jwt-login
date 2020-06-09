import * as types from "../../types/actionTypes";

const initialState = {
  isChangingPassword: false,
  err: null,
  resp_message: ""
};

let resp_message = "Password Changes successfully.";

function changePasswordReducer(state = initialState, action) {
  switch (action.type) {
    case types.IS_CHANGING_PASSWORD:
      return { ...state, isChangingPassword: true, err: null };
    case types.CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        isChangingPassword: false,
        resp_message: resp_message
      };
    case types.CHANGE_PASSWORD_FAILURE:
      return {
        ...state,
        isChangingPassword: false,
        err: action.err,
        resp_message: ""
      };
    default:
      return state;
  }
}

export default changePasswordReducer;
