const NodeTree = require("./NodeTree");

module.exports = class NodeCollector {
  constructor(client, rootNodeId) {
    this.client = client;
    this.rootNodeId = rootNodeId;
  }

  rnode = null;

  set rootNode(node) {
    this.rnode = node;
    this.tree = new NodeTree(this.rootNode, { getNode: this.client.getNode });
  }

  get rootNode() {
    return this.rnode;
  }

  async load() {
    const {
      data: [node],
    } = await this.client.getNode(this.rootNodeId);
    this.rootNode = node;
  }

  collectTreeData() {
    if (!this.tree) {
      throw new Error("Root node not set yet, tree missing");
    }
    return this.tree.collectTreeData();
  }

  logCollectionMetrics() {
    console.log(`
    Successful Collection: 

    Output: 

    Total unique nodes count:   ${this.tree.uniqueNodesCount()}
    Max shared node count:      ${JSON.stringify(this.tree.max.count)}
    Max shared node metadata:   ${JSON.stringify(this.tree.max)}

  `);
    if (this.tree.failedToCollect.length) {
      console.log(`

      Failed to fetch: ${JSON.stringify(this.tree.failedToCollect)}
      `);
    }
  }

  outputCollectionMetrics() {
    return {
      max: this.tree.max.count,
      maxNode: this.tree.max.node,
      uniqueNodes: this.tree.uniqueNodesCount(),
    };
  }
};
