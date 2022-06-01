const { get } = require("lodash");

module.exports = class NodeTree {
  constructor(rootNode, { getNode }) {
    this.rootNode = rootNode;
    this.nodeDict[rootNode.id] = rootNode;
    this.nodeCountDict[rootNode.id] = 1;
    this.getNode = getNode;
    this.visited.push(rootNode.id);
  }

  nodeDict = {};

  nodeCountDict = {};

  failedToCollect = [];

  max = { count: 0, node: {} };

  visited = [];

  uniqueNodesCount() {
    return this.visited.length;
  }

  setMaxNode(node) {
    if (this.max.count < this.nodeCountDict[node.id]) {
      this.max = {
        count: this.nodeCountDict[node.id],
        node,
      };
    }
  }

  async collectTreeData(rootNode = this.rootNode) {
    let childNodeIds = get(rootNode, ["child_node_ids"], []);
    try {
      // base case
      if (childNodeIds.length === 0) {
        return { done: true };
      } else {
        for await (let id of childNodeIds) {
          try {
            const {
              data: [node],
            } = await this.getNode(id);

            this.nodeCountDict[id] = this.nodeCountDict[id] || 0;
            this.nodeCountDict[id]++;
            this.nodeDict[node.id] = node;

            this.setMaxNode(node);

            if (this.visited.includes(id)) {
              continue;
            } else {
              this.visited.push(node.id);
              await this.collectTreeData(node);
            }
          } catch (e) {
            console.log("Failed to getNode by ID, ID passed: " + id);
            console.log("Error caught", e);
            console.log(
              "Skipping the failed node, todo: add retry logic on axios"
            );
            this.failedToCollect.push(id);
          }
        }
      }
    } catch (e) {
      console.log("Failed to collect tree data");
      console.log(e);
      throw new Error("Failed to collect child nodes");
    }
  }
};
