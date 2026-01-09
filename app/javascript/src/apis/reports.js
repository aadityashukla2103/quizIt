import axios from "axios";

const generatePdf = slug => axios.post(`/api/v1/quizzes/${slug}/report`, {});

const download = slug =>
  axios.get(`/api/v1/quizzes/${slug}/report/download`, {
    responseType: "blob",
  });

const reportsApi = { generatePdf, download };
export default reportsApi;
