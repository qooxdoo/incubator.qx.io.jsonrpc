/**
 * The implementation for JSON-RPC via HTTP
 */
qx.Class.define("qx.io.jsonrpc.transport.Http", {
  extend: qx.io.jsonrpc.transport.Abstract,
  implement : qx.io.jsonrpc.transport.ITransport,
  properties: {
    /**
     * The authentication method.  Can be any class implementing
     * {@link qx.io.request.authentication.IAuthentication} such as
     * {@qx.io.request.authentication.Basic} or
     * {@link qx.io.request.authentication.Bearer}
     */
    authentication: {
      check: "qx.io.request.authentication.IAuthentication",
      nullable: true
    }
  },

  /**
   * Constructor
   * @param {String} url identifies the url where the service is found.  Note that if the url is
   *  to a domain (server) other than where the qooxdoo script came from, i.e. it
   *  is cross-domain, then you must configure your server to support cross-origin
   *  requests (see https://developer.mozilla.org/de/docs/Web/HTTP/CORS)
   * @param {Map?} config Optional map of properties to set
   */
  construct(url, config={}) {
    this.base(arguments);
    config.uri = uri;
    this.set(config);
  },

  members: {


    /**
     * Implements the sending of the json message to the endpoint.
     * @param obj
     * @private
     */
    _sendImpl(obj) {
      let json = obj.toString();
    }
  }
});
