import React, { useState, useEffect } from "react";
import "./App.css";
import FetchData from "./component/fetchData";
import { connect } from "react-redux";
import Login from "./component/login";

function App({ isLoggedIn }) {
  useEffect(() => {
    console.log("islogged", isLoggedIn);
  }, []);
  return <div className="App">{isLoggedIn ? <FetchData /> : <Login />}</div>;
}
const mapStateToProps = ({ isLoggedIn }) => ({
  isLoggedIn
});

export default connect(mapStateToProps)(App);
