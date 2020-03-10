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

    /**
     * Adds a request or notification to the batch
     * @param {qx.io.jsonrpc.message.Request|qx.io.jsonrpc.message.Notification} message
     * @return {qx.io.jsonrpc.message.Batch}
     */
    add(message) {
      if (!(message instanceof qx.io.jsonrpc.message.Request || message instanceof qx.io.jsonrpc.message.Notification)) {
        throw new Error("You can only add an instance of qx.io.jsonrpc.message.Request or qx.io.jsonrpc.message.Notification to the batch.");
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
      this.add(new qx.io.jsonrpc.message.Request(method, params));
      return this;
    },

    /**
     * Adds a notification to the batch
     * @param method
     * @param params
     */
    addNotification(method,params) {
      this.add(new qx.io.jsonrpc.message.Notification(method, params));
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
