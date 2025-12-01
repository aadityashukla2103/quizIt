import axios from "axios";

const fetch = () => axios.get("api/v1/quizzes");
const create = payload => axios.post("api/v1/quizzes", payload);
const update = (id, payload) => axios.put(`api/v1/quizzes/${id}`, payload);
const destroy = payload => axios.post("api/v1/quizzes/bulk_destroy", payload);

const quizzesApi = {
  fetch,
  create,
  update,
  destroy,
};

export default quizzesApi;
