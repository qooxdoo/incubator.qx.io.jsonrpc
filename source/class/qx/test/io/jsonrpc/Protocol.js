qx.Class.define("qx.test.io.jsonrpc.Protocol",
{
  extend : qx.dev.unit.TestCase,
  include : [qx.test.io.jsonrpc.MAssert],
  construct() {
    this.base(arguments);
    this.parser = new qx.io.jsonrpc.protocol.Parser();
  },
  members : {
    "test: request"() {
      let expected = {
        "jsonrpc": "2.0",
        "id": 1,
        "method": "foo",
        "params": [1,2,3]
      };
      let message = this.parser.parse(JSON.stringify(expected));
      this.assertDeepEqual(expected, message.toObject());
    },

    "test: JSON-RPC request message object"() {
      const message = new qx.io.jsonrpc.protocol.Request("foo", ["bar", 1, false]);
      const expected = {
        id: 1,
        jsonrpc: "2.0",
        method: "foo",
        params: ["bar", 1, false]
      };
      this.assertDeepEqual(expected, message.toObject());
    },

    "test: JSON-RPC request notification object"() {
      const message = new qx.io.jsonrpc.protocol.Notification("foo", ["bar", 1, false]);
      const expected = {
        jsonrpc: "2.0",
        method: "foo",
        params: ["bar", 1, false]
      };
      this.assertDeepEqual(expected, message.toObject());
    },

    "test: JSON-RPC error object"() {
      const message = new qx.io.jsonrpc.protocol.Error(1, 5, "error!");
      const expected = {
        jsonrpc: "2.0",
        id: 1,
        error: {
          code: 5,
          message: "error!"
        }
      };
      this.assertDeepEqual(expected, message.toObject());
    },

    "test: JSON-RPC result object"() {
      const message = new qx.io.jsonrpc.protocol.Error(1, 5, "error!");
      const expected = {
        jsonrpc: "2.0", id: 1, error: {
          code: 5, message: "error!"
        }
      };
      this.assertDeepEqual(expected, message.toObject());
    }
  }
});
