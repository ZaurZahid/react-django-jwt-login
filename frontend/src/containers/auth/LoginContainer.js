import { connect } from "react-redux";

import { Login } from "../../components/auth/Login";
import {
  loginAction,
  authenticateAction
} from "../../actions/auth/authActions.js";

const mapDispatchToProps = dispatch => ({
  loginAction: data => dispatch(loginAction(data)),
  authenticateAction: (userData, dispatch, location, push) =>
    dispatch(authenticateAction(userData, dispatch, location, push)),
  dispatch
});

export default connect(null, mapDispatchToProps)(Login);
