qx.Interface.define("qx.io.jsonrpc.transport.ITransport", {
  members : {
    /**
     * Sends a jsonrpc message
     * @param {qx.io.jsonrpc.message.Message} message
     */
    send(message) {},

    /**
     * Receives and handles an incoming JSON-RPC compliant message data
     * @param {Object|Array} data JSON-RPC message data
     */
    handleIncoming(data) {}
  }
});
