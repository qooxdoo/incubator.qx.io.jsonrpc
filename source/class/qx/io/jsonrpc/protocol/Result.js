qx.Class.define("qx.io.jsonrpc.protocol.Result",{
  extend: qx.io.jsonrpc.protocol.Message,
  properties: {

    /**
     * The integer id of the request
     */
    id : {
      check: value => qx.lang.Type.isNumber(value) && parseInt(value, 10) === value
    },

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
