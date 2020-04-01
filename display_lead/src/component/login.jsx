import React, { useState, createRef } from "react";
import { requestLogin } from "../redux/actions";
import { connect } from "react-redux";
import styles from "./login.module.css";

const Login = ({ requestLogin }) => {
  const [errorMessage, setErrorMessage] = useState("");

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

        {errorMessage && <p>{errorMessage}</p>}
      </div>
    </div>
  );
};

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  requestLogin: creds => dispatch(requestLogin(creds))
});
export default connect(mapStateToProps, mapDispatchToProps)(Login);
