import axios from "axios";

const fetchCurrentUser = async () => {
  const response = await axios.get("/api/v1/users/me");

  return response.data;
};

const usersApi = { fetchCurrentUser };

export default usersApi;
