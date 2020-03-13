qx.Class.define("qx.io.jsonrpc.protocol.Error",{
  extend: qx.io.jsonrpc.protocol.Message,
  properties: {

    /**
     * The integer id of the request
     * @var {Number}
     */
    id : {
      check: value => qx.lang.Type.isNumber(value) && parseInt(value, 10) === value
    },

    /**
     * The error object
     * @var {Object}
     */
    error : {
      check : value => qx.lang.Type.isObject(value) && "code" in value && "message" in value
    }
  },
  /**
   * The response messsage constructor
   * @param {Number} id^
   * @param {Number} code
   * @param {String} message
   * @param {*?} data
   */
  construct(id, code, message, data) {
    this.base(arguments);
    this.setId(id);
    if (!qx.lang.Type.isNumber(code) || parseInt(code, 10) !== code ) {
      throw new Error("Code must be an integer");
    }
    let errorObj = {code, message};
    if (data) {
      errorObj.data = data;
    }
    this.setError(errorObj);
  }
});
