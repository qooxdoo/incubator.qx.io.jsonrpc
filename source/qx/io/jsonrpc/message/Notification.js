qx.Class.define("qx.io.jsonrpc.message.Notification",{
  extend: qx.io.jsonrpc.Message,
  properties: {
    method : {
      check: "String",
      nullable: false
    },
    params : {
      check: "Object",
      nullable: true
    }
  },
  /**
   * Notification constructor
   * @param {String} method
   * @param {Object?} params
   */
  construct(method, params=null) {
    this.base(arguments);
    this.set(method, params);
  }
});
