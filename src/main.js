const { get } = require("lodash");
const NodeTree = require("./lib/NodeTree");
const client = require("./lib/axiosClient");

(async () => {
  client
    .getNode("089ef556-dfff-4ff2-9733-654645be56fe")
    .then(async ({ data }) => {
      const node = get(data, [0], {}, false);
      const tree = new NodeTree(node, { getNode: client.getNode });
      await tree.collectTreeData();
      const uniqueNodes = tree.uniqueNodesCount;
      console.log("Unique Nodes: " + uniqueNodes);
    })
    .catch((e) => {
      console.log(e);
    });
})();
