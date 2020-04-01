import { reduxTypes } from "./reduxTypes";
import { loginRequest } from "../apiCall/loginRequest";

const {
  REQUEST_LOGIN_FAILED,
  REQUEST_LOGIN_PENDING,
  REQUEST_LOGIN_SUCCESS
} = reduxTypes;

export const requestLogin = creds => dispatch => {
  dispatch({ type: REQUEST_LOGIN_PENDING });

  loginRequest("http://127.0.0.1:8000/api/token/", creds)
    .then(data => dispatch({ type: REQUEST_LOGIN_SUCCESS, payload: data }))
    .catch(error => dispatch({ type: REQUEST_LOGIN_FAILED, payload: error }));
};
