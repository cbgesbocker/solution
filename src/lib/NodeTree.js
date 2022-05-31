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

  visited = [];

  get uniqueNodesCount() {
    return this.visited.length;
  }

  async collectChildNodesRecursive(childNodeIds) {
    for await (let id of childNodeIds) {
      try {
        const {
          data: [node],
        } = await this.getNode(id);

        this.nodeCountDict[id] = this.nodeCountDict[id] || 0;
        this.nodeCountDict[id]++;
        this.nodeDict[node.id] = node;

        if (this.visited.includes(id)) {
          continue;
        } else {
          this.visited.push(node.id);
          await this.collectChildNodesRecursive(node);
        }
      } catch (e) {
        console.log(e);
        console.log("Failed to getNode by ID, ID passed: " + id);
      }
    }
  }

  async collectTreeData(rootNode = this.rootNode) {
    let childNodeIds = get(rootNode, ["child_node_ids"], []);
    try {
      // base case
      if (childNodeIds.length === 0) {
        return { done: true };
      } else {
        await this.collectChildNodesRecursive(childNodeIds);
      }
    } catch (e) {
      console.log("Failed to collect tree data");
      console.log(e);
      throw new Error("Failed to collect child nodes");
    }
  }
};
