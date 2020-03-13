/**
 * Abstract class for JSON-RPC transports
 *
 * For the moment, any special configuration of the transport, such as
 * authentication, must be done on the level of the underlying implementation,
 * an abstract API will be added later.
 */
qx.Class.define("qx.io.jsonrpc.transport.Abstract", {

  extend: qx.core.Object,
  type: "abstract",

  properties : {
    /**
     * The uri of the endpoint
     */
    endpoint : {
      check : "String",
      event : "changeEndpoint"
    }
  },

  events : {
    /**
     * Event fired when a message is received from the endpoint. Event data
     * is an UTF-8 encoded string
     */
    "message" : "qx.event.type.Data"
  },

  /**
   * Constructor
   * @param {String} endpoint
   */
  construct(endpoint) {
    this.base(arguments);
    this.setEndpoint(endpoint);
  }
});
