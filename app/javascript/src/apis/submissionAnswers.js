import axios from "axios";

const submissionAnswersApi = {
  create(payload) {
    return axios.post("/api/v1/submission_answers", payload);
  },
};

export default submissionAnswersApi;
