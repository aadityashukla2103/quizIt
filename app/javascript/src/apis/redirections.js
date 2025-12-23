import axios from "axios";

const fetch = async params => {
  const response = await axios.get("/api/v1/redirections", { params });

  return response.data;
};

const create = async payload => {
  const response = await axios.post("/api/v1/redirections", {
    redirection: payload,
  });

  return response.data;
};

const update = async (id, payload) => {
  const response = await axios.put(`/api/v1/redirections/${id}`, {
    redirection: payload,
  });

  return response.data;
};

const destroy = async id => {
  const response = await axios.delete(`/api/v1/redirections/${id}`);

  return response.data;
};

const redirectionsApi = {
  fetch,
  create,
  update,
  destroy,
};

export default redirectionsApi;
