import React, { useState } from "react";
import "./App.css";
import FetchData from "./component/fetchData";
import { connect } from "react-redux";

function App() {
  return (
    <div className="App">
      <FetchData />
    </div>
  );
}

export default App;
