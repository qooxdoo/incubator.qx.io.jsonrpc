qx.Class.define("qx.io.jsonrpc.protocol.Batch",{
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

    /**
     * Adds a request or notification to the batch
     * @param {qx.io.jsonrpc.protocol.Request|qx.io.jsonrpc.protocol.Notification} message
     * @return {qx.io.jsonrpc.protocol.Batch}
     */
    add(message) {
      if (!(message instanceof qx.io.jsonrpc.protocol.Request || message instanceof qx.io.jsonrpc.protocol.Notification)) {
        throw new Error("You can only add an instance of qx.io.jsonrpc.protocol.Request or qx.io.jsonrpc.protocol.Notification to the batch.");
      }
      this.getBatch().push(message);
      // return the instance for chaining
      return this;
    },

    /**
     * Adds a request to the batch
     * @param method
     * @param params
     */
    addRequest(method,params) {
      this.add(new qx.io.jsonrpc.protocol.Request(method, params));
      return this;
    },

    /**
     * Adds a notification to the batch
     * @param method
     * @param params
     */
    addNotification(method,params) {
      this.add(new qx.io.jsonrpc.protocol.Notification(method, params));
      return this;
    },

    /**
     * Returns an array of the promises of the requests in the batch
     * @return {qx.Promise[]}
     */
    getPromises() {
      return this.getBatch().map(message => message.getPromise());
    },

    /**
     * Returns the message as a native object
     * @return {*}
     */
    toObject() {
      return this.getBatch().map(message => message.toObject());
    },

    /**
     * Returns the message as a JSON string
     * @return {String}
     */
    toString() {
      return this.getBatch().map(message => message.toString());
    }
  }
});
