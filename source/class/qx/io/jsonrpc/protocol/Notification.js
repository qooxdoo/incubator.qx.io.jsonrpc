qx.Class.define("qx.io.jsonrpc.protocol.Notification",{
  extend: qx.io.jsonrpc.protocol.Message,
  properties: {
    method : {
      check: "String",
      nullable: false
    },
    params : {
      check: "Object",
      nullable: true,
      init: null
    }
  },
  /**
   * Notification constructor
   * @param {String} method
   * @param {Object?} params
   */
  construct(method, params=null) {
    this.base(arguments);
    this.set({method, params});
  }
});
