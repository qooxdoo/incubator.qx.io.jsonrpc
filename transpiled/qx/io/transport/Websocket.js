(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.io.transport.AbstractTransport": {
        "construct": true,
        "require": true
      },
      "qx.io.transport.ITransport": {
        "require": true
      },
      "qx.core.Assert": {},
      "qx.io.exception.Transport": {},
      "qx.io.graphql.Client": {
        "defer": "runtime"
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /**
   * An experimental implementation of a WebSocket Transport
   * @ignore(WebSocket)
   */
  qx.Class.define("qx.io.transport.Websocket", {
    extend: qx.io.transport.AbstractTransport,
    implement: [qx.io.transport.ITransport],

    /**
     * Constructor.
     *
     * @param {String} url The URL of the http endpoint
     */
    construct(url) {
      qx.io.transport.AbstractTransport.constructor.call(this, url);
    },

    members: {
      /**
       * @type {WebSocket}
       */
      __tranportImpl__P_177_0: null,

      /**
       * Returns the object which implements the transport on the
       * underlying level, so that transport-specific configuration
       * can be done on it.
       *
       * @return {WebSocket}
       */
      getTransportImpl() {
        if (!this.__tranportImpl__P_177_0) {
          this.__tranportImpl__P_177_0 = this._createTransportImpl();
        }

        return this.__tranportImpl__P_177_0;
      },

      /**
       * Transport the given message to the endpoint
       *
       * @param {String} message
       *
       * @return {qx.Promise} Promise that resolves (with no data)
       * when the message has been successfully sent out, and rejects
       * when there is an error or a cancellation up to that point.
       * @ignore(fetch)
       */
      async send(message) {
        qx.core.Assert.assertString(message);
        let ws = this.getTransportImpl();

        if (!ws.readyState !== WebSocket.OPEN) {
          await new Promise(resolve => ws.addEventListener("open", resolve));
        }

        ws.send(message);
      },

      /**
       * Factory method to create a websocket object.
       * @return {WebSocket}
       */
      _createTransportImpl() {
        let ws = new WebSocket(this.getEndpoint());
        ws.addEventListener("message", msgevt => {
          this.fireDataEvent("message", msgevt.data);
        });
        ws.addEventListener("close", event => {
          let error_message;
          let error_code;

          switch (event.code) {
            case 1000:
              // everything ok
              break;

            default:
              // todo translate websocket error codes into qx.io.exception.Transport error codes
              // see https://github.com/Luka967/websocket-close-codes
              error_message = "Error " + event.code;
              error_code = qx.io.exception.Transport.FAILED;
          }

          if (error_message) {
            throw new qx.io.exception.Transport(error_message, error_code, event);
          }
        });
        return ws;
      }

    },

    destruct() {
      this.__tranportImpl__P_177_0.close();

      this.__tranportImpl__P_177_0 = null;
    },

    defer() {
      qx.io.graphql.Client.registerTransport(/^ws/, qx.io.transport.Websocket);
    }

  });
  qx.io.transport.Websocket.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Websocket.js.map?dt=1608415648306