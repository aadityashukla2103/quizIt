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

export const organizationApi = {
  fetch,
  create,
};

export default organizationApi;
