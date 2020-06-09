import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import Navigation from "../components/Navigation";
import { logoutAction } from "../actions/auth/authActions";

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated
  };
}

function mapDispatchToProps(dispatch) {
  return {
    logoutAction: () => dispatch(logoutAction())
  };
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Navigation)
);
