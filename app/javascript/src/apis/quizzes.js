import axios from "axios";

const fetch = params => axios.get("api/v1/quizzes", { params });
const show = id => axios.get(`/api/v1/quizzes/${id}`);
const create = payload => axios.post("api/v1/quizzes", { quiz: payload });
const update = (id, payload) => axios.put(`api/v1/quizzes/${id}`, payload);
const destroy = id => axios.delete(`/api/v1/quizzes/${id}`);
const cloneQuiz = id => axios.post(`/api/v1/quizzes/${id}/clone`);
const bulkUpdate = payload =>
  axios.put("/api/v1/quizzes/bulk_update", { quiz: payload });

const bulkDelete = payload =>
  axios.delete("api/v1/quizzes/bulk_delete", { data: { quiz: payload } });

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
