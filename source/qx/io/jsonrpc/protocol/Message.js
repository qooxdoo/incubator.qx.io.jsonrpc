qx.Class.define("qx.io.jsonrpc.protocol.Message",{
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
     * @return {String}
     */
    toString() {
      return qx.util.Serializer.toJson(this);
    },

    /**
     * Serialiuze to a native javascript object
     * @return {Object}
     */
    toObject() {
      return qx.util.Serializer.toNativeObject(this);
    }
  }
});
