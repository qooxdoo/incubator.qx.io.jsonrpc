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
  construct(method, params) {
    this.base(arguments);
    this.set(method, params);
  }
});
