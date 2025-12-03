import axios from "axios";

// Fetch all questions for a quiz
const fetch = async quizId => {
  const response = await axios.get(`/api/v1/quizzes/${quizId}/questions`);

  return response.data;
};

// Fetch single question
const show = async (quizId, questionId) => {
  const response = await axios.get(
    `/api/v1/quizzes/${quizId}/questions/${questionId}`
  );

  return response.data;
};

// Create a question inside a quiz
const create = async (quizId, payload) => {
  const response = await axios.post(`/api/v1/quizzes/${quizId}/questions`, {
    question: payload,
  });

  return response.data;
};

// Update a question
const update = async (quizId, questionId, payload) => {
  const response = await axios.put(
    `/api/v1/quizzes/${quizId}/questions/${questionId}`,
    { question: payload }
  );

  return response.data;
};

// Delete a question
const destroy = async (quizId, questionId) =>
  axios.delete(`/api/v1/quizzes/${quizId}/questions/${questionId}`);

const questionsApi = {
  fetch,
  show,
  create,
  update,
  destroy,
};

export default questionsApi;
