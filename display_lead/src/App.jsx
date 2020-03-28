import React, { useState } from "react";
import "./App.css";

function App() {
  const [fetchedItem, setFetchedItem] = useState("");

  const fetchData = async () => {
    const response = await fetch("http://localhost:8000/users/");
    const data = await response.json();
    setFetchedItem(data);

    console.log(fetchedItem);
  };
  const removeData = () => {
    setFetchedItem("");
  };
  return (
    <div className="App">
      <header className="App-header">
        <h1>Lead Data Display</h1>
      </header>
      <div>
        <h2>Data from djano_rest</h2>
        <button onClick={fetchData}>FETCH</button>
        <button onClick={removeData}>CLEAR</button>
        <h3>Fetched Data</h3>
        <h4>
          {fetchedItem
            ? fetchedItem.results.map((item, i) => {
                return (
                  <div key={i}>
                    <h4>{item.username}</h4>
                    <h5>{item.email}</h5>
                  </div>
                );
              })
            : null}
        </h4>
      </div>
    </div>
  );
}

export default App;
