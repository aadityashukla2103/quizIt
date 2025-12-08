import axios from "axios";

const generatePdf = quizId =>
  axios.post(`/api/v1/quizzes/${quizId}/report`, {});

const download = quizId =>
  axios.get(`/api/v1/quizzes/${quizId}/report/download`, {
    responseType: "blob",
  });

const reportsApi = { generatePdf, download };
export default reportsApi;
