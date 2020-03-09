qx.Class.define("qx.io.jsonrpc.message.Request",{
  extend: qx.io.jsonrpc.Notification,
  statics: {
    /**
     * Static counter for all request ids
     */
    current_request_id : 0
  },
  properties: {
    id : {
      check: "Number"
    }
  },
  construct() {
    this.setId(++this.self(arguments).current_request_id);
  }
});
