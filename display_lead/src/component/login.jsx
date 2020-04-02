import React, { useState, createRef } from "react";
import { requestLogin } from "../redux/actions";
import { connect } from "react-redux";
import styles from "./login.module.css";

const Login = ({ requestLogin, errorLogging }) => {
  const username = createRef();
  const password = createRef();
  const handleClick = () => {
    requestLogin({
      username: username.current.value,
      password: password.current.value
    });
  };
  return (
    <div>
      <div className={styles.formContainer}>
        <input
          type="text"
          ref={username}
          className="form-control"
          placeholder="Username"
        />

        <input
          type="password"
          ref={password}
          className="form-control"
          placeholder="Password"
        />
        <button
          onClick={event => handleClick(event)}
          className="btn btn-primary"
        >
          Login
        </button>

        {errorLogging && <p>{errorLogging}</p>}
      </div>
    </div>
  );
};

const mapStateToProps = ({ errorLogging }) => ({
  errorLogging
});

const mapDispatchToProps = dispatch => ({
  requestLogin: creds => dispatch(requestLogin(creds))
});
export default connect(mapStateToProps, mapDispatchToProps)(Login);
