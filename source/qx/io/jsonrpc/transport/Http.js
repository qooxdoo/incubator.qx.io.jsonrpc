/**
 * The implementation for JSON-RPC via HTTP
 */
qx.Class.define("qx.io.jsonrpc.transport.Http", {
  extend: qx.io.jsonrpc.transport.Abstract,
  implement : qx.io.jsonrpc.transport.ITransport,

  /**
   * Constructor.
   * Examples:
   *
   * <pre>
   *    const uri = "https://domain.com/endpoint";
   *    const auth = new qx.io.request.authentication.Bearer("TOKEN");
   *    const transport1 = new qx.io.jsonrpc.transport.Http(uri);
   *    transport1.getRequest().setAuthentication(auth);
   *    // or
   *    const request = new qx.io.request.Xhr(uri, "POST");
   *    request.setAuthentication(auth);
   *    const transport2 = new qx.io.jsonrpc.transport.Http({request});
   *
   * </pre>
   * @param {String|Map} configOrUrl
   *    - If String, the url which identifies the url where the service is found.
   *    Note that if the url is to a domain (server) other than where the
   *    qooxdoo script came from, i.e. it is cross-domain, then you must
   *    configure your server to support cross-origin requests
   *    (see https://developer.mozilla.org/de/docs/Web/HTTP/CORS).
   *    - if Map, a map of properties to set. If you provide one
   *    without a "request" property, the constructor will set the one provided
   *    by the {@link qx.io.jsonrpc.transport.Http#createRequest()} method,
   *    which you can override in a subclass.
   *
   */
  construct(configOrUrl={}) {
    this.base(arguments, configOrUrl);
    if (!this.getRequest()) {
      this.setRequest(this._createRequest());
    }
    // get uri from request url, if set
    if (!this.getUri() && this.getRequest().getUrl()) {
      this.setUri(this.getRequest().getUrl());
    }
    // sync changes
    this.bind("uri", this.getRequest(), "url");
    this.bind("request.url", this, "uri");

  },

  properties : {

    request : {
      check : "qx.io.request.AbstractRequest"
    }
  },

  members: {

    /**
     * Implements the sending of the json message to the endpoint.
     * @param {qx.io.jsonrpc.message.Message} message
     * @private
     * @return {qx.Promise}
     */
    async _sendImpl(message) {
      let json = message.toString();
      const req = this.getRequest();
      req.setRequestData(json);
      try {
        await req.sendWithPromise();
      } catch(e) {
        if (e instanceof qx.type.BaseError) {
          switch (e.getComment()) {
            case "timeout":
              this._throwError(new qx.io.jsonrpc.exception.Transport(
                e.toString(),
                qx.io.jsonrpc.exception.Transport.TIMEOUT,
                {request: message.toObject() }
              ));
              break;
            case "parseError":
              this._throwError(new qx.io.jsonrpc.exception.Transport(
                e.toString(),
                qx.io.jsonrpc.exception.Transport.INVALID_MSG_DATA,
                {request: message.toObject() }
              ));
              break;
            case "abort":
              this._throwError(new qx.io.jsonrpc.exception.Cancel(
                e.toString(),
                {request: message.toObject() }
              ));
              break;
            case "failed":
              this._throwError(new qx.io.jsonrpc.exception.Transport(
                e.toString(),
                qx.io.jsonrpc.exception.Transport.FAILED,
                {request: message.toObject() }
              ));
              break;
          }
        }
      }
      this.handleIncoming(req.getResponse());
    },

    /**
     * Factory method to create a request object. By default, a POST request
     * will be made, and the expected response type will be
     * "application/json". Classes extending this one may override this method
     * to obtain a Request object with different parameters and/or different
     * authentication settings.
     *
     * @return {qx.io.remote.Request}
     */
    _createRequest: function() {
      const req =  new qx.io.request.Xhr(this.getUri(),"POST");
      req.setAccept("application/json");
      req.setCache(false);
      req.setRequestHeader("content-type", "application/json")
    }
  },

  defer() {
    qx.io.jsonrpc.Client.registerTransport(/^http/, qx.io.jsonrpc.transport.Http);
  }
});
