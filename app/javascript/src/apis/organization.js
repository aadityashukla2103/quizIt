import axios from "axios";

const fetch = async () => {
  const response = await axios.get("/api/v1/organizations");

  return response.data;
};

const create = async organizationData => {
  const response = await axios.post("/api/v1/organizations", {
    organization: organizationData,
  });

  return response.data;
};

const update = async (id, payload) => {
  const response = await axios.put(`/api/v1/organizations/${id}`, {
    organization: payload,
  });

  return response.data;
};

export const organizationApi = {
  fetch,
  create,
  update,
};

export default organizationApi;
