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
     * @param {qx.io.jsonrpc.protocol.Message} message
     * @return {qx.io.jsonrpc.protocol.Batch}
     */
    add(message) {
      this.assertInstance(message, qx.io.jsonrpc.protocol.Message);
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
      return this.getBatch().toArray().map(message => message.toObject());
    },

    /**
     * Returns the message as a JSON string
     * @return {String}
     */
    toString() {
      return JSON.stringify(this.getBatch().toArray().map(message => message.toObject()));
    }
  }
});
