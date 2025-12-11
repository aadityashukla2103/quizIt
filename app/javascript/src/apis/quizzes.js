import axios from "axios";

const fetch = async params => {
  const response = await axios.get("/api/v1/quizzes", { params });

  return response;
};

const show = async id => {
  const response = await axios.get(`/api/v1/quizzes/${id}`);

  return response.data;
};

const create = async payload => {
  const response = await axios.post("/api/v1/quizzes", { quiz: payload });

  return response.data;
};

const update = async (id, payload) => {
  const response = await axios.put(`/api/v1/quizzes/${id}`, payload);

  return response.data;
};

const destroy = async id => {
  const response = await axios.delete(`/api/v1/quizzes/${id}`);

  return response.data;
};

const cloneQuiz = async id => {
  const response = await axios.post(`/api/v1/quizzes/${id}/clone`);

  return response.data.quiz;
};

const bulkUpdate = async payload => {
  const response = await axios.put("/api/v1/quizzes/bulk_update", {
    quiz: payload,
  });

  return response.data;
};

const bulkDelete = async payload => {
  const response = await axios.delete("/api/v1/quizzes/bulk_delete", {
    data: { quiz: payload },
  });

  return response.data;
};

const quizzesApi = {
  fetch,
  show,
  create,
  update,
  destroy,
  cloneQuiz,
  bulkUpdate,
  bulkDelete,
};

export default quizzesApi;
