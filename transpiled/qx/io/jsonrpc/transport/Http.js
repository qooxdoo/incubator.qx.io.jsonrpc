(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.io.jsonrpc.transport.Abstract": {
        "construct": true,
        "require": true
      },
      "qx.io.jsonrpc.transport.ITransport": {
        "require": true
      },
      "qx.type.BaseError": {},
      "qx.io.jsonrpc.exception.Transport": {},
      "qx.io.jsonrpc.exception.Cancel": {},
      "qx.io.request.Xhr": {},
      "qx.io.jsonrpc.Client": {
        "defer": "runtime"
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /**
   * The implementation of a JSON-RPC transport for JSON-RPC via HTTP
   *
   * The HTTP transport implementation is based on the {@link qx.io.request} API,
   * so any special configuration of the HTTP request must be done on the
   * underlying implementation of {@link qx.io.request.AbstractRequest}.
   *
   * More abstract support for authentication will be added later.
   *
   */
  qx.Class.define("qx.io.jsonrpc.transport.Http", {
    extend: qx.io.jsonrpc.transport.Abstract,
    implement: qx.io.jsonrpc.transport.ITransport,

    /**
     * Constructor.
     *
     * @param {String} url The URL of the http endpoint
     */
    construct(url) {
      qx.io.jsonrpc.transport.Abstract.constructor.call(this, url);
    },

    members: {
      /**
       * Internal implementation of the transport
       * @var {qx.io.request.Xhr}
       */
      __tranportImpl__P_160_0: null,

      /**
       * Returns the object which implements the transport on the
       * underlying level, so that transport-specific configuration
       * can be done on it. Note that since in the HTTP transport,
       * this object cannot be reused, it will return a new object
       * each time which will be used in the immediately next request.
       *
       * @return {qx.core.Object}
       */
      getTransportImpl() {
        this.__tranportImpl__P_160_0 = this._createTransportImpl();
        return this.__tranportImpl__P_160_0;
      },

      /**
       * Transport the given message to the endpoint
       *
       * @param {String} message
       *
       * @return {qx.Promise} Promise that resolves (with no data)
       * when the message has been successfully sent out, and rejects
       * when there is an error or a cancellation up to that point.
       */
      async send(message) {
        this.assertString(message);
        const req = this.__tranportImpl__P_160_0 || this.getTransportImpl();
        req.setRequestData(message);
        this.__tranportImpl__P_160_0 = null; // free the internal reference for the next request

        try {
          await req.sendWithPromise();
        } catch (e) {
          if (e instanceof qx.type.BaseError) {
            switch (e.getComment()) {
              case "timeout":
                throw new qx.io.jsonrpc.exception.Transport(e.toString(), qx.io.jsonrpc.exception.Transport.TIMEOUT, {
                  message
                });

              case "parseError":
                throw new qx.io.jsonrpc.exception.Transport(e.toString(), qx.io.jsonrpc.exception.Transport.INVALID_MSG_DATA, {
                  message
                });

              case "abort":
                throw new qx.io.jsonrpc.exception.Cancel(e.toString(), {
                  message
                });

              case "statusError":
              case "error":
                throw new qx.io.jsonrpc.exception.Transport(e.toString(), qx.io.jsonrpc.exception.Transport.FAILED, {
                  message
                });
            }
          }
        } // notify listeners


        this.fireDataEvent("message", req.getResponse()); // discard old object

        req.dispose();
      },

      /**
       * Factory method to create a request object. By default, a POST
       * request will be made, and the expected response type will be
       * "application/json", but differently to the standard behavior,
       * the response will not be parsed into a javascript object.
       *
       * Classes extending this one may override this method to obtain
       * a Request object with different parameters and/or different
       * authentication settings. The object must be a subclass of {@link
       * qx.io.request.AbstractRequest} or implement its public API.
       *
       * @return {qx.io.jsonrpc.Request}
       */
      _createTransportImpl() {
        const req = new qx.io.request.Xhr(this.getEndpoint(), "POST");
        req.setAccept("application/json");
        req.setCache(false);
        req.setRequestHeader("content-type", "application/json"); // disable parsing, we are going to parse the JSON ourselves

        req.setParser(response => response);
        return req;
      }

    },

    defer() {
      qx.io.jsonrpc.Client.registerTransport(/^http/, qx.io.jsonrpc.transport.Http);
    }

  });
  qx.io.jsonrpc.transport.Http.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Http.js.map?dt=1592867939619