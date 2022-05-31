const axios = require("axios");
const { API_BASE_URL } = require("../consts");

const client = axios.create({
  baseURL: API_BASE_URL,
});

const nodeResourcePath = "/nodes";

module.exports = {
  getNode: (nodeId) => client.get(`${nodeResourcePath}/${nodeId}`),
};
