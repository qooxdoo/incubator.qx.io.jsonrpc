qx.Interface.define("qx.io.jsonrpc.transport.ITransport", {
  properties: {
    /**
     * The URI of the endpoint
     * @var {String}
     */
    endpoint: {
      check: "String"
    }
  },
  events: {
    /**
     * Event fired when a message is received from the endpoint. Event data
     * is an UTF-8 encoded string
     */
    "message": "qx.event.type.Data"
  },
  members : {
    /**
     * Transport the given message to the endpoint
     *
     * @param {String} message
     * @return {qx.Promise} Promise that resolves (with no data)
     * when the message has been successfully sent out, and rejects
     * when there is an error or a cancellation up to that point.
     */
    async send(message) {},

    /**
     * Returns the object which implements the transport on the underlying
     * level, so that transport-specific configuration can be done on it.
     * @return {qx.core.Object}
     */
    getTransportImpl() {}
  }
});
