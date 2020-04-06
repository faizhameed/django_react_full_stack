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
    throw new Error("Bad response from serverr: ", response.status);
  }
  const data = await response.json().then(user => ({ user, response }));
  const jwt = {
    refreshToken: data.user.refresh,
    accessToken: data.user.access
  };
  localStorage.setItem("jwt", JSON.stringify(jwt));
  console.log("Access1:", jwt.accessToken);
  console.log("Access2:", data.user.access);
  console.log("Access3:", JSON.parse(localStorage.jwt).accessToken);
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
