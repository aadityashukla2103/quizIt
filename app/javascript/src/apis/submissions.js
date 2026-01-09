import axios from "axios";

const show = submissionId => axios.get(`/api/v1/submissions/${submissionId}`);

const register = payload =>
  axios.post("/api/v1/submissions", {
    submission: payload,
  });

const finalizeSubmission = submissionId =>
  axios.post(`/api/v1/submissions/${submissionId}/finalize`);

const fetch = async (slug, payload = {}) =>
  axios.get(`/api/v1/quizzes/${slug}/quiz_submissions`, {
    params: payload,
  });

const submissionsApi = { register, finalizeSubmission, show, fetch };

export default submissionsApi;
