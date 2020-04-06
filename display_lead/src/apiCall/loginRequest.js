export const loginRequest = async (url, creds) => {
  const response = await fetch(url, {
    method: "post",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: `username=${creds.username}&password=${creds.password}`
  });
  if (response.status >= 400 && response.status < 600) {
    throw new Error("Bad response from server: ", response.status);
  }
  const data = await response.json().then(user => ({ user, response }));
  return data;
};

/* const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:8000/leads/");
      if (response.status >= 400 && response.status < 600) {
        throw new Error("Bad response from server: ", response.status);
      }
      const data = await response.json();
      setFetchedItem(data);

      console.log(fetchedItem);
    } catch (error) {
      console.log("Error Fetching", error);
    }
  }; */
