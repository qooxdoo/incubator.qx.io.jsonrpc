/**
 * Tests for qx.io.jsonrpc.protocol.* objects
 */
qx.Class.define("qx.test.io.jsonrpc.protocols", {
  extend: qx.dev.unit.TestCase,
  members: {

    assertDeepEqual : function(expected, actual, msg) {
      msg = msg || "Failed to assert that " + qx.lang.Json.stringify(actual) +
        " is deeply equal to " + qx.lang.Json.stringify(expected) + ".";
      this.assertTrue(qx.dev.unit.Sinon.getSinon().deepEqual(expected, actual), msg);
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
