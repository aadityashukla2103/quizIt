import axios from "axios";

const fetch = async () => {
  const response = await axios.get("/api/v1/categories");

  return response.data;
};

const show = async id => {
  const response = await axios.get(`/api/v1/categories/${id}`);

  return response.data;
};

const create = async category => {
  const response = await axios.post("/api/v1/categories", { category });

  return response.data;
};

const update = async (id, category) => {
  const response = await axios.put(`/api/v1/categories/${id}`, { category });

  return response.data;
};

const destroy = async id => {
  const response = await axios.delete(`/api/v1/categories/${id}`);

  return response.data;
};

const reorder = payload => axios.patch("/api/v1/categories/reorder", payload);

const categoriesApi = { fetch, create, show, update, destroy, reorder };

export default categoriesApi;
