(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.core.Object": {
        "construct": true,
        "require": true
      },
      "qx.lang.Type": {
        "construct": true
      },
      "qx.Interface": {},
      "qx.io.jsonrpc.transport.ITransport": {},
      "qx.io.jsonrpc.exception.Transport": {
        "construct": true
      },
      "qx.io.jsonrpc.protocol.Parser": {
        "construct": true
      },
      "qx.io.jsonrpc.protocol.Message": {},
      "qx.io.jsonrpc.protocol.Batch": {},
      "qx.io.jsonrpc.protocol.Request": {},
      "qx.io.jsonrpc.protocol.Notification": {},
      "qx.core.Assert": {},
      "qx.Promise": {},
      "qx.io.jsonrpc.protocol.Result": {},
      "qx.io.jsonrpc.protocol.Error": {},
      "qx.io.jsonrpc.exception.JsonRpc": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
        2020 Christian Boulanger
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Christian Boulanger (cboulanger)
  
  ************************************************************************ */

  /**
   * This class provides a JSON-RPC client object with auto-configuration of the
   * transport used (based on the URI passed).
   */
  qx.Class.define("qx.io.jsonrpc.Client", {
    extend: qx.core.Object,
    statics: {
      __transports: null,

      /**
       * Register a transport class for use with uris that match the given
       * regular expression. The client will use the transport which first
       * matches, starting with the last added transport
       * @param {RegExp} uriRegExp
       *    A regular expression which the URI must match
       * @param {qx.io.jsonrpc.transport.ITransport}  transportClass
       *    The qooxdoo class implementing the transport
       */
      registerTransport(uriRegExp, transportClass) {
        if (qx.io.jsonrpc.Client.__transports === null) {
          qx.io.jsonrpc.Client.__transports = [];
        }

        if (!qx.lang.Type.isRegExp(uriRegExp)) {
          throw new Error("First argument must be a regular expression!");
        }

        if (!qx.Interface.classImplements(transportClass, qx.io.jsonrpc.transport.ITransport)) {
          throw new Error("Transport class must implement qx.io.jsonrpc.transport.ITransport");
        }

        qx.io.jsonrpc.Client.__transports.push({
          uriRegExp,
          transport: transportClass
        });
      }

    },
    events: {
      /**
       * Event fired when a request results in an error. Event data is an instance of
       * {@link qx.io.jsonrpc.exception.Transport}, {@link qx.io.jsonrpc.exception.JsonRpc},
       * or {@link qx.io.jsonrpc.exception.Cancel}.
       * Event fired when a message is received from the endpoint. Event data
       * is an UTF-8 encoded string
       */
      "error": "qx.event.type.Data",

      /**
       * Event fired when a peer-originated JSON-RPC message has been
       * received from the peer endpoint. Event data is an instance of {@link
       * qx.io.jsonrpc.message.Batch}, {@link qx.io.jsonrpc.message.Request}
       * or {@link qx.io.jsonrpc.message.Notification}.
       */
      "peerRequest": "qx.event.type.Data"
    },

    /**
     * @param {qx.io.jsonrpc.transport.ITransport|String} transportOrUri
     *    Transport object, which must implement {@link qx.io.jsonrpc.transport.ITransport}
     *    or a string URI, which will trigger auto-detection of transport, as long as an
     *    appropriate transport has been registered with the static `registerTransport()` function.
     * @param {String?} methodPrefix
     *    Optional service name which will be prepended to the method
     * @param {qx.io.jsonrpc.protocol.Parser?} parser
     *    Optional parser object, which needs to be an instance of a subclass of {@link qx.io.jsonrpc.protocol.Parser}
     */
    construct: function construct(transportOrUri, methodPrefix, parser) {
      qx.core.Object.constructor.call(this);

      if (qx.io.jsonrpc.Client.__transports === null) {
        qx.io.jsonrpc.Client.__transports = [];
      }

      let transport, uri;

      if (qx.lang.Type.isString(transportOrUri)) {
        uri = transportOrUri;

        for (let registeredTransport of qx.io.jsonrpc.Client.__transports.reverse()) {
          if (uri.match(registeredTransport.uriRegExp)) {
            transport = new registeredTransport.transport(uri);
          }
        }

        if (!transport) {
          throw new qx.io.jsonrpc.exception.Transport(`No matching transport for URI '${transportOrUri}'`, qx.io.jsonrpc.exception.Transport.INVALD_URI);
        }
      } else {
        transport = transportOrUri;
      }

      this.setTransport(transport); // listen for incoming messages

      this.getTransport().addListener("message", evt => this.handleIncoming(evt.getData()));

      if (!methodPrefix) {
        methodPrefix = "";
      }

      this.setMethodPrefix(methodPrefix);

      if (!parser) {
        parser = new qx.io.jsonrpc.protocol.Parser();
      }

      this.setParser(parser);
      this.__requests = [];
    },
    properties: {
      /**
       * An optional string which is prepended to the method name.
       */
      methodPrefix: {
        check: "String",
        nullable: true
      },

      /**
       * The transport object
       */
      transport: {
        check: "qx.io.jsonrpc.transport.ITransport"
      },

      /**
       * The parser object, which must be a subclass of {@link qx.io.jsonrpc.protocol.Parser}
        */
      parser: {
        check: "qx.io.jsonrpc.protocol.Parser"
      }
    },
    members: {
      /**
       * A cache of the requests which have been sent out and are still pending
       */
      __requests: null,

      /**
       * If a service name has been configured, prepend it to the method name
       * @param {String} method
       * @return {String}
       * @private
       */
      _prependMethodPrefix(method) {
        let methodPrefix = this.getMethodPrefix();

        if (methodPrefix && !method.startsWith(methodPrefix + ".")) {
          return `${methodPrefix}.${method}`;
        }

        return method;
      },

      /**
       * Fires "error" event and throws the error after informing pending requests
       * about the error.
       * @param exception
       * @private
       */
      _throwTransportException(exception) {
        this.fireDataEvent("error", exception);

        this.__requests.forEach(request => request.handleTransportException(exception));

        throw exception;
      },

      /**
       * Send the given JSON-RPC message object using the configured transport
       *
       * @param {qx.io.jsonrpc.protocol.Message|qx.io.jsonrpc.protocol.Batch} message
       * @return {qx.Promise} Promise that resolves (with no data)
       * when the message has been successfully sent out, and rejects
       * when there is an error or a cancellation up to that point.
       */
      async send(message) {
        if (!(message instanceof qx.io.jsonrpc.protocol.Message || message instanceof qx.io.jsonrpc.protocol.Batch)) {
          throw new Error("Argument must be instanceof qx.io.jsonrpc.protocol.Message or qx.io.jsonrpc.protocol.Batch");
        } // filter by type


        let messages = message instanceof qx.io.jsonrpc.protocol.Batch ? message.getBatch().toArray() : [message];
        let requests = messages.filter(message => message instanceof qx.io.jsonrpc.protocol.Request); // store requests

        requests.forEach(request => {
          let id = request.getId();

          if (this.__requests[id] !== undefined) {
            throw new qx.io.jsonrpc.exception.Transport(`Request ID ${id} is already in use`, qx.io.jsonrpc.exception.Transport.INVALID_ID, {
              request: message.toObject()
            });
          }

          this.__requests[id] = request;
        }); // send it async, using transport-specific implementation

        return this.getTransport().send(message.toString());
      },

      /**
       * Sends a single JSON-RPC request. If a service name has been configured,
       * it is prepended to the method name with a dot.
       * @param {String} method
       * @param {Array|Object?} params
       * @return {qx.Promise} Promise that resolves with the result to that request,
       * and rejects with an exception in the {@link qx.io.jsonrpc.exception} namespace.
       */
      async sendRequest(method, params) {
        const request = new qx.io.jsonrpc.protocol.Request(this._prependMethodPrefix(method), params);
        this.send(request);
        return await request.getPromise();
      },

      /**
       * Sends a single JSON-RPC notification. If a service name has been configured,
       * it is prepended to the method name with a dot.
       * @param {String} method
       * @param {Array|Object?} params
       */
      sendNotification(method, params) {
        const notification = new qx.io.jsonrpc.protocol.Notification(this._prependMethodPrefix(method), params);
        this.send(notification);
      },

      /**
       * Send the given message batch. If a service name has been configured,
       * it is prepended to the method name in each message with a dot.
       * @param {qx.io.jsonrpc.protocol.Batch} batch
       * @return {qx.Promise} Promise that resolves with an array of the responses
       * to all requests in the batch, or rejects with any error that occurs.
       */
      async sendBatch(batch) {
        qx.core.Assert.assertInstance(batch, qx.io.jsonrpc.protocol.Batch);

        if (this.getMethodPrefix()) {
          batch.getBatch().forEach(message => message.setMethod(this._prependMethodPrefix(message.getMethod())));
        }

        this.send(batch);
        return await qx.Promise.all(batch.getPromises());
      },

      /**
       * Receives and handles an incoming JSON-RPC compliant message data
       * @param {String} json JSON data
       */
      handleIncoming(json) {
        let message;

        try {
          message = this.getParser().parse(json); // act on each message

          this.handleMessage(message);
        } catch (e) {
          this._throwTransportException(e);
        } finally {
          // cleanup
          if (message instanceof qx.io.jsonrpc.protocol.Batch) {
            message.getBatch().forEach(msg => this._cleanup(msg));
          } else if (message instanceof qx.io.jsonrpc.protocol.Message) {
            this._cleanup(message);
          }
        }
      },

      /**
       * Clean up after a message has been received
       * @param {qx.io.jsonrpc.protocol.Message} message
       * @private
       */
      _cleanup(message) {
        if (message instanceof qx.io.jsonrpc.protocol.Request) {
          let id = message.getId();
          delete this.__requests[id];
        }

        message.dispose();
      },

      /**
       * Handle an incoming message or batch of messages
       * @param {qx.io.jsonrpc.protocol.Message|qx.io.jsonrpc.protocol.Batch} message Message or Batch
       */
      handleMessage(message) {
        // handle batches
        if (message instanceof qx.io.jsonrpc.protocol.Batch) {
          message.getBatch().forEach(msg => this.handleMessage(msg));
          return;
        } // handle individual message


        this.assertInstance(message, qx.io.jsonrpc.protocol.Message);
        let request, id;

        if (message instanceof qx.io.jsonrpc.protocol.Result || message instanceof qx.io.jsonrpc.protocol.Error) {
          // handle results and errors, which are responses to sent requests
          id = message.getId();
          request = this.__requests[id];

          if (request === undefined) {
            throw new qx.io.jsonrpc.exception.Transport(`Invalid jsonrpc response data: Unknown id ${id}.`, qx.io.jsonrpc.exception.Transport.UNKNOWN_ID, {
              response: message.toObject()
            });
          }

          if (request.response) {
            throw new qx.io.jsonrpc.exception.Transport(`Invalid jsonrpc response data: multiple responses with same id ${id}.`, qx.io.jsonrpc.exception.Transport.DUPLICATE_ID, {
              request: request.toObject(),
              response: message.toObject()
            });
          }

          request.response = message.toObject();
        } // handle the different message types


        if (message instanceof qx.io.jsonrpc.protocol.Result) {
          // resolve the individual promise
          request.getPromise().resolve(message.getResult());
        } else if (message instanceof qx.io.jsonrpc.protocol.Error) {
          let error = message.getError();
          let ex = new qx.io.jsonrpc.exception.JsonRpc(error.message, error.code, {
            request: request.toObject(),
            response: message.toObject()
          }); // inform listeners

          this.fireDataEvent("error", ex); // reject the individual promise

          request.getPromise().reject(ex);
        } else if (message instanceof qx.io.jsonrpc.protocol.Request || message instanceof qx.io.jsonrpc.protocol.Notification) {
          // handle peer-originated requests and notifications
          this.fireDataEvent("peerRequest", message);
        } else {
          throw new Error("Unhandled message:" + message.toString());
        }
      }

    }
  });
  qx.io.jsonrpc.Client.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Client.js.map?dt=1589218248583