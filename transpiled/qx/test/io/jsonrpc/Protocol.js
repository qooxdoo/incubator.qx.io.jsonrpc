(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.dev.unit.TestCase": {
        "construct": true,
        "require": true
      },
      "qx.test.io.MAssert": {
        "require": true
      },
      "qx.io.jsonrpc.protocol.Parser": {
        "construct": true
      },
      "qx.io.jsonrpc.protocol.Request": {},
      "qx.io.jsonrpc.protocol.Notification": {},
      "qx.io.jsonrpc.protocol.Error": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2020 Christian Boulanger
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Christian Boulanger (cboulanger)
  
  ************************************************************************ */
  qx.Class.define("qx.test.io.jsonrpc.Protocol", {
    extend: qx.dev.unit.TestCase,
    include: [qx.test.io.MAssert],

    construct() {
      qx.dev.unit.TestCase.constructor.call(this);
      this.parser = new qx.io.jsonrpc.protocol.Parser();
    },

    members: {
      "test: JSON-RPC request message object"() {
        let message = new qx.io.jsonrpc.protocol.Request("foo", ["bar", 1, false]);
        let expected = {
          id: 1,
          jsonrpc: "2.0",
          method: "foo",
          params: ["bar", 1, false]
        };
        this.assertDeepEquals(expected, message.toObject()); // test parser

        this.assertDeepEquals(expected, this.parser.parse(JSON.stringify(expected)).toObject());
      },

      "test: JSON-RPC request notification object"() {
        let message = new qx.io.jsonrpc.protocol.Notification("foo", ["bar", 1, false]);
        let expected = {
          jsonrpc: "2.0",
          method: "foo",
          params: ["bar", 1, false]
        };
        this.assertDeepEquals(expected, message.toObject()); // test parser

        this.assertDeepEquals(expected, this.parser.parse(JSON.stringify(expected)).toObject());
      },

      "test: JSON-RPC error object"() {
        let message = new qx.io.jsonrpc.protocol.Error(1, 5, "error!");
        let expected = {
          jsonrpc: "2.0",
          id: 1,
          error: {
            code: 5,
            message: "error!"
          }
        };
        this.assertDeepEquals(expected, message.toObject()); // test parser

        this.assertDeepEquals(expected, this.parser.parse(JSON.stringify(expected)).toObject());
      },

      "test: JSON-RPC result object"() {
        let message = new qx.io.jsonrpc.protocol.Error(1, 5, "error!");
        let expected = {
          jsonrpc: "2.0",
          id: 1,
          error: {
            code: 5,
            message: "error!"
          }
        };
        this.assertDeepEquals(expected, message.toObject()); // test parser

        this.assertDeepEquals(expected, this.parser.parse(JSON.stringify(expected)).toObject());
      }

    }
  });
  qx.test.io.jsonrpc.Protocol.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Protocol.js.map?dt=1606150615118