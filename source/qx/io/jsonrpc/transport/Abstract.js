/**
 * Abstract class for JSON-RPC transports
 */
qx.Class.define("qx.io.jsonrpc.transport.Abstract", {
  extend: qx.core.Object,
  properties : {
    /**
     * The uri of the endpoint
     */
    uri : {
      check : "String",
      apply : "_applyUri"
    }
  },

  events : {

    /**
     * Event fired when a request results in an error. Event data is an instance of
     * {@link qx.io.jsonrpc.exception.Transport}, {@link qx.io.jsonrpc.exception.JsonRpc},
     * or {@link qx.io.jsonrpc.exception.Cancel}.
     */
    "error" : "qx.event.type.Data",

    /**
     * Event fired when a peer-originated JSON-RPC message
     * has been received from the peer endpoint. Event data
     * is an instance of {@link qx.io.jsonrpc.message.Request}
     * or {@link qx.io.jsonrpc.message.Notification}.
     */
    "peerRequest" : "qx.event.type.Data",

  },

  /**
   * Constructor
   * @param {String|Map} configOrUri
   *    - If String, the uri which identifies  where the endpoint is found.
   *    - if Map, a map of properties to set
   */
  construct(configOrUri={}) {
    this.base(arguments);
    if (qx.lang.Type.isString(configOrUri)) {
      configOrUri = {
        uri : configOrUri
      };
    }
    this.set(configOrUri);
    this.__requests = {};
  },

  members: {

    __requests: null,

    /**
     * Parses a message object into one of the qx.io.jsonrpc.message.* Objects.
     * Throws an exception if the message object cannot be parsed.
     * @param {Object} message
     * @private
     * @return {qx.io.jsonrpc.message.Message}
     * @throws {qx.io.jsonrpc.exception.Transport}
     */
    _parseMessage(message) {
      if (qx.lang.Type.isArray(message)) {
        const batch = new qx.io.jsonrpc.message.Batch();
        message.forEach(item => batch.add(this._parseMessage(item)));
        return batch;
      }
      let {id, result, method, params, error} = message;
      if (id !== undefined && result !== undefined && error === undefined && method === undefined) {
        return new qx.io.jsonrpc.message.Result(id, result);
      }
      if (id !== undefined && result === undefined && error !== undefined && method === undefined) {
        return new qx.io.jsonrpc.message.Error(id, error.code, error.message, error.data);
      }
      if (id !== undefined && result === undefined && error === undefined && method !== undefined) {
        return new qx.io.jsonrpc.message.Request(method, params, id);
      }
      if (id === undefined && result === undefined && error === undefined && method !== undefined) {
        return new qx.io.jsonrpc.message.Notification(method, params);
      }
      throw new qx.io.jsonrpc.exception.Transport(
        "Cannot parse message data.",
        qx.io.jsonrpc.exception.Transport.INVALID_MSG_DATA,
        {message}
      );
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
     * Send the given JSON-RPC message object
     *
     *
     * @param {qx.io.jsonrpc.message.Message} message
     *
     * @return {qx.Promise} Promise that resolves (with no data)
     * when the message has been successfully sent out, and rejects
     * when there is an error or a cancellation up to that point.
     */
    async send(message) {
      this.assertInstance(message, qx.io.jsonrpc.message.Message);

      // filter by type
      let messages = message instanceof qx.io.jsonrpc.message.Batch ? message.getBatch().toArray() : [message];
      let requests = messages.filter(message => message instanceof qx.io.jsonrpc.message.Request);

      // store requests
      requests.forEach(request => {
        let id = request.getId();
        if (this.__requests[id] !== undefined) {
          throw new qx.jsonrpc.exception.Transport(`Request ID ${id} is already in use`, qx.jsonrpc.exception.Transport.INVALID_ID, {request: message.toObject()});
        }
        this.__requests[id] = request;
      });

      // send it async, using transport-specific implementation
      return this._sendImpl(message);
    },


    /**
     * Receives and handles an incoming JSON-RPC compliant message data
     * @param {Object|Array} data JSON-RPC message data
     */
    handleIncoming(data) {
      if (data === null) {
       this._throwTransportException(new qx.io.remote.exception.Transport(
          qx.io.jsonrpc.exception.Transport.NO_DATA,
          "No response data"
        ));
      }

      // check for valid jsonrpc v2 response
      if (!qx.lang.Type.isArray(data) && !qx.lang.Type.isObject(data)) {
        this._throwTransportException(new qx.io.remote.exception.Transport(
          qx.io.jsonrpc.exception.Transport.INVALID_MSG_DATA,
          "Invalid jsonrpc data",
          {data}
        ));
      }

      // normalize batch and non-batch responses
      let batch = qx.lang.Type.isArray(data) ? data : [data];

      // handle each response
      batch.forEach(function(response) {

        let msgObj = this._parseMessage(response);

        // handle responses with an id.
        let request, id;
        if (msgObj.getId !== undefined) {
          id = msgObj.getId();
          request = this.__requests[id];
          if (request === undefined) {
            this._throwTransportException(new qx.io.remote.exception.Transport(
              qx.io.jsonrpc.exception.Transport.INVALID_MSG_DATA,
              `Invalid jsonrpc data: Unknown request id ${id}.`,
              {response}));
          }
          if (request.response !== undefined) {
            this._throwTransportException(
              new qx.io.remote.exception.Transport(
                qx.io.jsonrpc.exception.Transport.INVALID_MSG_DATA,
                `Invalid jsonrpc data: multiple responses with same id ${id}.`,
                {request, response}));
          }
          request.response = response;
        }

        // handle the different message types
        if (msgObj instanceof qx.io.jsonrpc.message.Result) {
          // inform listeners
          this.fireDataEvent("result", msgObj.toObject());
          // resolve the individual promise
          request.promise.resolve(msgObj.getResult());
        } else if (msgObj instanceof qx.io.jsonrpc.message.Error) {
          let error = msgObj.getError();
          let ex = new qx.io.remote.exception.JsonRpc(
            error.code,
            error.message, {
              request: request.toObject(),
              response
            });
          // inform listeners
          this.fireDataEvent("error", ex);
          // reject the individual promise
          request.promise.reject(ex);
        } else if (msgObj instanceof qx.io.jsonrpc.message.Request || msgObj instanceof qx.io.jsonrpc.message.Notification ) {
          // handle peer-originated requests and notifications
          this.fireDataEvent("peerRequest", msgObj)
        } else {
          throw new Error("Unhandled message:" + msgObj.toString());
        }
      });
      // cleanup
      batch.forEach(msgObj => {
        if (msgObj instanceof qx.io.jsonrpc.message.Request) {
          let id = msgObj.getId();
          delete this.__requests[id];
        }
        msgObj.dispose();
      });
      message.dispose();
    },

    /**
     * Method must be overridden in subclasses to implement the
     * actual sending of the JSON-RPC messages. Returns a promise
     * which resolves with the response from the peer.
     * @param {qx.io.jsonrpc.message.Message} message
     * @return {qx.Promise}
     */
    async _sendImpl(message) {
      throw new Error("Method must be implemented by subclass");
    },

    /**
     * Empty stub to be overridden by subclasses if necessary
     * @param value
     * @param old
     * @private
     */
    _applyUri(value,old) {}

  }
});
