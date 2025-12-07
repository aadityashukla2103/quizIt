import axios from "axios";

const register = payload =>
  axios.post("/api/v1/submissions", {
    submission: payload,
  });

const submissionsApi = { register };

export default submissionsApi;
