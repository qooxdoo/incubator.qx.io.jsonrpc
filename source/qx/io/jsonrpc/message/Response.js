qx.Class.define("qx.io.jsonrpc.message.Response",{
  extend: qx.io.jsonrpc.Message,
  properties: {
    result : {
      check: "String",
      nullable: true
    },
    error : {
      check: "Object",
      nullable: true
    }
  }
});
