const NodeCollector = require("../src/lib/NodeCollector");

describe("NodeCollector.js", () => {
  let nodeCollector, getNodeSpy;

  beforeEach(async () => {
    getNodeSpy = jest.fn(async (id) => ({
      data: [
        {
          id,
          child_node_ids: [],
        },
      ],
    }));
    nodeCollector = new NodeCollector({ getNode: getNodeSpy }, "12345");
  });

  test("NodeCollector should call getNode on loading", async () => {
    await nodeCollector.load();
    expect(getNodeSpy).toHaveBeenCalled();
  });

  test("NodeCollector should call getNode with the test ID", async () => {
    await nodeCollector.load();
    expect(getNodeSpy).toHaveBeenCalledWith("12345");
  });
});
