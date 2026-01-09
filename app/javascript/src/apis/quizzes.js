import axios from "axios";

const fetch = async params => {
  const response = await axios.get("/api/v1/quizzes", { params });

  return response;
};

const show = async slug => {
  const response = await axios.get(`/api/v1/quizzes/${slug}`);

  return response.data;
};

const create = async payload => {
  const response = await axios.post("/api/v1/quizzes", { quiz: payload });

  return response.data;
};

const update = async (slug, payload) => {
  const response = await axios.put(`/api/v1/quizzes/${slug}`, payload);

  return response.data;
};

const destroy = async slug => {
  const response = await axios.delete(`/api/v1/quizzes/${slug}`);

  return response.data;
};

const cloneQuiz = async slug => {
  const response = await axios.post(`/api/v1/quizzes/${slug}/clone`);

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

const publicShow = async slug => {
  const response = await axios.get(`/api/v1/public/quizzes/${slug}`);

  return response.data;
};

const publicFetch = async params => {
  const response = await axios.get("/api/v1/public/quizzes", { params });

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
  publicShow,
  publicFetch,
};

export default quizzesApi;
