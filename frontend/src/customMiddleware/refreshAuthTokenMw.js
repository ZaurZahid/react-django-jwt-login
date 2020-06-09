// Imports for email login
import { logoutAction } from "../actions/auth/authActions";
import jwtDecode from "jwt-decode";
import { backendUrl } from "../actions/backendUrl";

import { history } from "../index.js";

let url = process.env.REACT_APP_DEV_URL || backendUrl;

function refreshAuthToken({ dispatch, getState }) {
  return next => action => {
    if (typeof action === "function") {
      if (localStorage.getItem("ecom_token") && localStorage.length > 0) {
        const tokenExpiration = jwtDecode(localStorage.getItem("ecom_token"))
          .exp;
        const currentTime = Math.round(new Date().getTime() / 1000);
        const timeLeft = tokenExpiration - currentTime;
        console.log("time left till expiration --->", timeLeft);
        const loginToken = localStorage.getItem("ecom_token");
        if (tokenExpiration && timeLeft <= 0) {
          history.push("/");
          localStorage.removeItem("ecom_token");
          dispatch(logoutAction());
          return next(action);
        }
        if (tokenExpiration && timeLeft <= 1800) {
          return fetch(`${url}/auth/jwt/refresh/`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: loginToken
            },
            body: JSON.stringify({ token: loginToken })
          })
            .then(response => response.json())
            .then(json => localStorage.setItem("ecom_token", json.token))
            .then(() => next(action));
        }
        return next(action);
      }
      return next(action);
    } else {
      return next(action);
    }
  };
}

export default refreshAuthToken;
