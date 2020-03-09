qx.Class.define("qx.io.jsonrpc.message.Message",{
  extend: qx.core.Object,
  properties: {
    jsonrpc : {
      check: "String",
      init: "2.0"
    }
  },

  members : {
    /**
     * Serialize to JSON string
     */
    toString() {
      return qx.util.Serializer.toJson(this);
    }
  }
});
