const { ROOT_NODE_ID } = require("./consts");
const axiosClient = require("./lib/axiosClient");
const NodeCollector = require("./lib/NodeCollector");

async function main() {
  const nodeCollector = new NodeCollector(axiosClient, ROOT_NODE_ID);
  await nodeCollector.load();
  await nodeCollector.collectTreeData();
  console.log(
    "Total unique nodes count: " + nodeCollector.tree.uniqueNodesCount()
  );
  console.log("Max shared node: " + JSON.stringify(nodeCollector.tree.max));
  console.log(
    "Max shared node count: " + JSON.stringify(nodeCollector.tree.max.count)
  );
}

main();
