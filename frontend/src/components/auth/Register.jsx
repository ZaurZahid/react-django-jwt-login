import React, { Component } from "react";
import { withFormik } from "formik";
import Yup from "yup";
import { Link } from "react-router-dom";

import { withStyles } from "material-ui/styles";
import TextField from "material-ui/TextField";
import Button from "material-ui/Button";

import { styles } from "./customStylesMui";

class InnerRegistrationForm extends Component {
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
      <span className={classes.container}>
        <h3 style={{ textAlign: "center" }}>
          Registration with your email address below
        </h3>
        <form onSubmit={handleSubmit}>
          <TextField
            name="username"
            placeholder="Enter your Username"
            type="text"
            value={values.username}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.username && touched.username}
            helperText={errors.username && touched.username && errors.username}
            label="Username"
            className={classes.textField}
            required
          />
          <TextField
            name="email"
            placeholder="Enter your Email"
            type="text"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.email && touched.email}
            helperText={errors.email && touched.email && errors.email}
            label="Email Address"
            className={classes.textField}
            required
          />
          <TextField
            name="password1"
            placeholder="Enter your Password"
            type="password"
            value={values.password1}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.password1 && touched.password1}
            helperText={
              errors.password1 && touched.password1 && errors.password1
            }
            className={classes.textField}
            label="Password"
            required
          />
          <TextField
            name="password2"
            placeholder="Repeat your password"
            type="password"
            value={values.password2}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.password2 && touched.password2}
            helperText={
              errors.password2 && touched.password2 && errors.password2
            }
            className={classes.textField}
            label="Repeat your Password"
            required
          />

          <br />
          <Button
            className={classes.button}
            type="button"
            onClick={handleReset}
            disabled={!dirty || isSubmitting}
            variant="raised"
          >
            Reset
          </Button>
          <Button
            className={classes.button}
            type="submit"
            disabled={isSubmitting}
            variant="raised"
          >
            Submit
          </Button>
        </form>
        <span>Already have an account?</span>
        <Link to="/login" className={classes.links}>
          {" "}
          Login
        </Link>
      </span>
    );
  }
}

const EnhancedForm = withFormik({
  mapPropsToValues: () => ({
    username: "",
    email: "",
    password1: "",
    password2: ""
  }),
  validationSchema: Yup.object().shape({
    username: Yup.string().required("Username is required"),
    password1: Yup.string()
      .min(8, "The password must be at least 8 characters")
      .required("Password is required"),
    password2: Yup.string()
      .oneOf([Yup.ref("password1"), null], "Passwords don't match.")
      .required("Password confirm is required"),
    email: Yup.string()
      .email("Invalid Email Address")
      .required("Email is required")
  }),
  handleSubmit: (
    { username, email, password1 },
    { props, setSubmitting, setErrors }
  ) => {
    props
      .registerAction({ username, email, password: password1 })
      .then(resp => {
        if (
          resp.non_field_errors ||
          Array.isArray(resp.username) ||
          Array.isArray(resp.email) ||
          Array.isArray(resp.password)
        ) {
          setErrors(resp);
        } else {
          props.dispatch(props.registrationSuccessMessage());
          return props.history.push("/");
        }
      });
    setSubmitting(false);
  },
  displayName: "RegistrationForm" //hlps with react devtools
})(InnerRegistrationForm);

export const Register = withStyles(styles)(EnhancedForm);
