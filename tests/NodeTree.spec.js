const NodeTree = require("../src/lib/NodeTree");

describe("NodeTree.js", () => {
  let ntree, getNodeSpy;
  beforeEach(async () => {
    getNodeSpy = jest.fn(async (id) => ({
      data: [
        {
          id,
          child_node_ids: [],
        },
      ],
    }));
    ntree = new NodeTree(
      {
        id: "test-node",
        child_node_ids: ["1234", "12345"],
      },
      { getNode: getNodeSpy }
    );
  });

  test("Collect tree data should call getNode function", async () => {
    await ntree.collectTreeData();
    expect(getNodeSpy).toHaveBeenCalled();
  });

  test("Collect tree data should call getNode function with the right # of times", async () => {
    await ntree.collectTreeData();
    expect(getNodeSpy).toHaveBeenCalledTimes(2);
  });

  test("Collect tree data should setup the object metadata for data collection properly", async () => {
    await ntree.collectTreeData();
    expect(ntree).toMatchSnapshot();
  });
});
