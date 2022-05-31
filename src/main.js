const axiosClient = require("./lib/axiosClient");
const NodeCollector = require("./lib/NodeCollector");

const ROOT_NODE_ID = "089ef556-dfff-4ff2-9733-654645be56fe";

async function main() {
  const nodeCollector = new NodeCollector(axiosClient, ROOT_NODE_ID);
  await nodeCollector.load();
  await nodeCollector.collectData();
  console.log(
    "Total unique nodes count: " + nodeCollector.tree.uniqueNodesCount()
  );
  console.log("Max shared node: " + JSON.stringify(nodeCollector.tree.max));
  console.log(
    "Max shared node count: " + JSON.stringify(nodeCollector.tree.max.count)
  );
}

main();
