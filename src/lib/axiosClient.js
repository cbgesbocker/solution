const axios = require("axios");

const client = axios.create({
  baseURL: "https://nodes-on-nodes-challenge.herokuapp.com/",
});

module.exports = {
  getNode: (nodeId) => client.get("/nodes/" + nodeId),
};
