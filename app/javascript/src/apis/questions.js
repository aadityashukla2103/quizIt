import axios from "axios";

const fetch = async quizId => {
  const response = await axios.get(`/api/v1/quizzes/${quizId}/questions`);

  return response.data;
};

const show = async (quizId, questionId) => {
  const response = await axios.get(
    `/api/v1/quizzes/${quizId}/questions/${questionId}`
  );

  return response.data;
};

const create = async (quizId, payload) => {
  const response = await axios.post(`/api/v1/quizzes/${quizId}/questions`, {
    question: payload,
  });

  return response.data;
};

const update = async (quizId, questionId, payload) => {
  const response = await axios.put(
    `/api/v1/quizzes/${quizId}/questions/${questionId}`,
    { question: payload }
  );

  return response.data;
};

const destroy = async (quizId, questionId) => {
  const response = await axios.delete(
    `/api/v1/quizzes/${quizId}/questions/${questionId}`
  );

  return response.data;
};

const clone = async (quizId, questionId) => {
  const response = await axios.post(
    `/api/v1/quizzes/${quizId}/questions/${questionId}/clone`
  );

  return response.data;
};

const questionsApi = {
  fetch,
  show,
  create,
  update,
  destroy,
  clone,
};

export default questionsApi;
