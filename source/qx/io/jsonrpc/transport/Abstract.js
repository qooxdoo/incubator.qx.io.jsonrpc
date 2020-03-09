qx.Class.define("qx.io.jsonrpc.transport.Abstract", {
  extend: qx.core.Object,
  properties : {
    /**
     * The uri of the endpoint
     */
    uri : {
      check : "String",
      apply : "_applyUri"
    }
  },

  members: {
    send(obj) {
      this.assertInstance(obj, qx.io.jsonrpc.message.Message);
      // transport-specific
      this._sendImpl(obj);
    },

    /**
     * Method must be overridden in subclasses to implement the
     * actual sending of the JSON-RPC messages
     * @param obj
     * @private
     */
    _sendImpl(obj) {
      throw new Error("Method must be implemented by subclass");
    },

    _applyUri(value, old) {

    }


  }
});
