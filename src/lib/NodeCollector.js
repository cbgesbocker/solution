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

  async collectData() {
    return await this.tree.collectTreeData();
  }

  async load() {
    const {
      data: [node],
    } = await this.client.getNode(this.rootNodeId);
    this.rootNode = node;
  }

  collectTreeData() {
    return this.tree.collectTreeData();
  }
};
