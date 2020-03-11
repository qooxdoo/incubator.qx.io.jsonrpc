qx.Class.define("qx.io.jsonrpc.message.Request",{
  extend: qx.io.jsonrpc.Notification,
  statics: {
    /**
     * Static counter for all request ids
     */
    current_request_id : 0
  },
  properties: {
    /**
     * The integer id of the request
     */
    id : {
      check: value => qx.lang.Type.isNumber(value) && parseInt(value) === value
    },
    /**
     * Promise that is resolved when the response to this request has been received
     */
    promise: {
      check: "qx.Promise"
    }
  },

  /**
   * JSON-RPC request constructor
   * @param {String} method
   * @param {Array|Object?} params
   * @param {Number?} id
   *    Optional integer id. If not provided, an auto-incremented id will be
   *    used.
   */
  construct(method, params, id) {
    this.base(arguments, method, params);
    if (id === undefined) {
      id = ++this.self(arguments).current_request_id;
    }
    this.set({id});
    this.setPromise(new qx.Promise());
  }
});