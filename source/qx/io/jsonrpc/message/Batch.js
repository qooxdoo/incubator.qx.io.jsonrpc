qx.Class.define("qx.io.jsonrpc.message.Batch",{
  extend: qx.core.Object,
  properties: {
    batch : {
      check: "qx.data.Array"
    }
  },
  construct() {
    this.base(arguments);
    this.setBatch(new qx.data.Array());
  },
  members: {
    add(message) {
      if (!(message instanceof qx.io.jsonrpc.message.Request || message instanceof qx.io.jsonrpc.message.Notification)) {
        throw new Error("You can only add an instance of qx.io.jsonrpc.message.Request or qx.io.jsonrpc.message.Notification to the batch.");
      }
      this.getBatch().push(message);
    }

  }
});
