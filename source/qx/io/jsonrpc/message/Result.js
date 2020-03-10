qx.Class.define("qx.io.jsonrpc.message.Result",{
  extend: qx.io.jsonrpc.Message,
  properties: {
    result : {
      nullable: true
    }
  },
  /**
   * The result messsage constructor
   * @param {Number} id^
   * @param {*} result
   */
  construct(id, result) {
    this.set({id, result})
  }
});
