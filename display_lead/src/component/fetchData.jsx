import React, { useState, useEffect } from "react";
import { getCookie } from "../utils/getCookie";
import { connect } from "react-redux";

const FetchData = ({ userData }) => {
  const [fetchedItem, setFetchedItem] = useState("");
  const fetchData = async () => {
    const token = userData.user.access;
    try {
      const response = await fetch("http://localhost:8000/leads/", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + token
        }
      });
      if (response.status >= 400 && response.status < 600) {
        throw new Error("Bad response from server: ", response.status);
      }
      const data = await response.json();
      setFetchedItem(data);

      console.log(fetchedItem);
    } catch (error) {
      console.log("Error Fetching", error);
    }
  };
  const removeData = () => {
    setFetchedItem("");
  };
  const deleteFromAPI = item => {
    let flag;
    flag = window.confirm("Are you sure you wanted to delete");
    if (flag) {
      fetch("http://localhost:8000/leads/" + item, {
        method: "delete"
      }).then(response => {
        console.log(response);
        fetchData();
      });
    }
  };

  const editFromAPI = item => {
    var myData = {
      id: item,
      first_name: "FaizData",
      last_name: "edited"
    };
    fetch("http://localhost:8000/leads/" + item, {
      method: "patch",
      headers: {
        "X-CSRFToken": getCookie("csrftoken"),
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(myData)
    }).then(response => {
      console.log(response);
      fetchData();
    });
  };

  const postData = () => {
    var myData = {
      first_name: "New Data",
      last_name: "Henwnwe"
    };

    fetch("http://localhost:8000/leads/", {
      method: "put",
      headers: {
        "X-CSRFToken": getCookie("csrftoken"),
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(myData)
    }).then(response => {
      console.log("Post request", response);
      fetchData();
    });
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
        <button onClick={postData}>POST</button>
        <h3>Fetched Data</h3>
        <h4>
          {fetchedItem
            ? fetchedItem.results.map((item, i) => {
                return (
                  <div key={i}>
                    <h4>{item.first_name}</h4>
                    <h5>{item.last_name}</h5>
                    <button onClick={() => deleteFromAPI(item.id)}>
                      Delete
                    </button>
                    <button onClick={() => editFromAPI(item.id)}>Edit</button>
                  </div>
                );
              })
            : null}
        </h4>
        <div></div>
      </div>
    </div>
  );
};
const mapStateToProps = ({ userData }) => ({
  userData
});
export default connect(mapStateToProps)(FetchData);
