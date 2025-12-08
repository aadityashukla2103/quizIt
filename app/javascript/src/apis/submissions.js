import axios from "axios";

const show = submissionId => axios.get(`/api/v1/submissions/${submissionId}`);

const register = payload =>
  axios.post("/api/v1/submissions", {
    submission: payload,
  });

const finalizeSubmission = submissionId =>
  axios.post(`/api/v1/submissions/${submissionId}/finalize`);

const fetch = async (quizId, payload = {}) =>
  await axios.get("/api/v1/submissions/quiz_submissions", {
    params: { quiz_id: quizId, ...payload },
  });

const submissionsApi = { register, finalizeSubmission, show, fetch };

export default submissionsApi;
