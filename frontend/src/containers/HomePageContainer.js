import { connect } from "react-redux";

import HomePage from "../components/HomePage";

const mapStateToProps = state => ({
  registration_message: state.auth.registration_message
});

export default connect(mapStateToProps)(HomePage);
