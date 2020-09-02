// Dependencies
import axios from "axios";

const setAuthToken = (key: string | null) => {
  if (key) {
    // Apply to every request
    axios.defaults.headers.common["Authorization"] = `${key}`;
  } else {
    // Delete the auth header
    delete axios.defaults.headers.common["Authorization"];
  }
};

export default setAuthToken;