import React, { useState } from "react";
import { getCookie } from "../utils/getCookie";
import { connect } from "react-redux";

const FetchData = ({ userData }) => {
  const [fetchedItem, setFetchedItem] = useState("");
  const fetchData = async () => {
    const token = JSON.parse(localStorage.jwt).accessToken;
    try {
      const response = await fetch("http://localhost:8000/leads/", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + token
        }
      });
      if (response.status >= 400 && response.status < 600) {
        // getting new access token if its more than 5 mins
        try {
          const refreshRes = await fetch(
            "http://127.0.0.1:8000/api/token/refresh/",
            {
              method: "post",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/x-www-form-urlencoded"
              },
              body: `refresh=${JSON.parse(localStorage.jwt).refreshToken}`
            }
          );
          if (refreshRes.status >= 400 && refreshRes.status < 600) {
            throw new Error("Bad refreshRes from serverr: ", refreshRes.status);
          }
          const refreshData = await refreshRes
            .json()
            .then(user => ({ user, refreshRes }));
          const jwt = {
            // creating another jwt object to set into localStorage
            refreshToken: JSON.parse(localStorage.jwt).refreshToken,
            accessToken: refreshData.user.access
          };
          localStorage.setItem("jwt", JSON.stringify(jwt));
          console.log("requesting another access token", jwt);
          fetchData(); //calling fetch data again after adding new acess token
        } catch (error) {
          console.log(error);
        }
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
