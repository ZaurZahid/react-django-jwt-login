import React, { Component } from "react";
import { withFormik } from "formik";
import Yup from "yup";
import { Link } from "react-router-dom";

import { withStyles } from "material-ui/styles";
import TextField from "material-ui/TextField";
import Button from "material-ui/Button";

import { styles } from "./customStylesMui";

class InnerLoginForm extends Component {
  render() {
    const {
      values,
      touched,
      errors,
      dirty,
      isSubmitting,
      handleChange,
      handleBlur,
      handleSubmit,
      handleReset,
      classes
    } = this.props;

    return (
      <div className={classes.container}>
        <h3 style={{ textAlign: "center" }}>
          Login with your Email address or Username
        </h3>
        <form onSubmit={handleSubmit}>
          <TextField
            name="username"
            placeholder="Enter your Email / Username"
            type="text"
            value={values.username}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.username && touched.username}
            helperText={errors.username && touched.username && errors.username}
            label="Email Address / Username"
            className={classes.textField}
          />

          <TextField
            name="password"
            placeholder="Enter your password"
            type="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.password && touched.password}
            helperText={errors.password && touched.password && errors.password}
            label="Password"
            className={classes.textField}
          />
          <br />
          <Button
            variant="raised"
            className={classes.button}
            type="button"
            onClick={handleReset}
            disabled={!dirty || isSubmitting}
          >
            Reset
          </Button>
          <Button
            variant="raised"
            className={classes.button}
            type="submit"
            disabled={isSubmitting}
          >
            Submit
          </Button>
        </form>
        <span>Do not have an account?</span>{" "}
        <Link to="/register" className={classes.links}>
          Register
        </Link>
        <br />
      </div>
    );
  }
}

const EnhancedForm = withFormik({
  mapPropsToValues: () => ({
    username: "",
    password: ""
  }),
  validationSchema: Yup.object().shape({
    username: Yup.string().required("This field is required"),
    password: Yup.string()
      .min(6, "The password must be at least 6 characters")
      .required("Password is required")
  }),
  handleSubmit: (
    { username, password },
    { props, setSubmitting, setErrors }
  ) => {
    props.loginAction({ username, password }).then(response => {
      if (response.non_field_errors) {
        setErrors({ password: response.non_field_errors[0] });
      } else {
        props.authenticateAction(
          response,
          props.dispatch,
          props.location.pathname,
          props.history.push
        );
      }
    });
    setSubmitting(false);
  },
  displayName: "LoginForm" //hlps with react devtools
})(InnerLoginForm);

export const Login = withStyles(styles)(EnhancedForm);
