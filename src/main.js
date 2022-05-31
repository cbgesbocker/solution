const { ROOT_NODE_ID } = require("./consts");
const axiosClient = require("./lib/axiosClient");
const NodeCollector = require("./lib/NodeCollector");

async function main() {
  const nodeCollector = new NodeCollector(axiosClient, ROOT_NODE_ID);
  await nodeCollector.load();
  await nodeCollector.collectTreeData();
  const metricOutput = nodeCollector.outputCollectionMetrics();
  console.log(metricOutput);
}

main();
