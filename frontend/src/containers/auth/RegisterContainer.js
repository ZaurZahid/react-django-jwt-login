import { connect } from "react-redux";

import {
  registerAction,
  registrationSuccessMessage
} from "../../actions/auth/authActions";
import { Register } from "../../components/auth/Register";

function mapDispatchToProps(dispatch) {
  return {
    registerAction: data => dispatch(registerAction(data)),
    registrationSuccessMessage: () => dispatch(registrationSuccessMessage()),
    dispatch
  };
}

export default connect(null, mapDispatchToProps)(Register);
