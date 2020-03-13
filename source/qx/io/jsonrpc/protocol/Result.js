qx.Class.define("qx.io.jsonrpc.protocol.Result",{
  extend: qx.io.jsonrpc.protocol,
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
