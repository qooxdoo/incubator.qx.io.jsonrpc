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
 * transport used (based on the URI passed). It is little more than a wrapper
 * around the qx.io.jsonprc.transport.* classes with some additional convenience
 * methods.
 */

qx.Class.define("qx.io.remote.Client",
{
  extend : qx.core.Object,

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
      if (qx.io.remote.Client.__transports === null) {
        qx.io.remote.Client.__transports = [];
      }
      if (!qx.lang.Type.isRegExp(uriRegExp)) {
        throw new Error("First argument must be a regular expression!");
      }
      if (!qx.Interface.classImplements(transportClass, qx.io.jsonrpc.transport.ITransport)) {
        throw new Error("Transport class must implement qx.io.jsonrpc.transport.ITransport");
      }
      qx.io.remote.Client.__transports.push({ uriRegExp, transport: transportClass});
    }

  },

  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */

  /**
   * @param {qx.io.jsonrpc.transport.ITransport|String} transportOrUri
   *    Transport object or URL for auto-detection of transport
   * @param {String} serviceName
   *    Optional service name which will be prepended to the method
   */
  construct : function(transportOrUri, serviceName) {
    this.base(arguments);
    if (qx.lang.Type.isString(transportOrUri)) {
      for (let transport of qx.io.remote.Client.__transports.reverse()) {
        if (transportOrUri.match(transport.uriRegExp)) {
          transportOrUri = transport.transportClass;
        }
      }
      if (qx.lang.Type.isString(transportOrUri)) {
        throw new qx.io.jsonrpc.exception.Transport(
          `No matching transport for URI '${transportOrUri}'`,
          qx.io.jsonrpc.exception.Transport.INVALD_URI
        );
      }
    }
    this.setTransport(transportOrUri);
    if (serviceName != null) {
      this.setServiceName(serviceName);
    }
  },


  /*
  *****************************************************************************
     PROPERTIES
  *****************************************************************************
  */

  properties :
  {

    /**
     * An optional service name which is prepended to the method name
     */
    serviceName :
    {
      check : "String",
      nullable : true
    },

    /**
     * The transport object
     */
    transport:
    {
      check : "qx.io.jsonrpc.transport.ITransport"
    }
  },

  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
    /**
     * If a service name has been configured, prepend it to the method name
     * @param {String} method
     * @return {String}
     * @private
     */
    _prependServiceName(method) {
      let serviceName = this.getServiceName();
      if (serviceName && !method.startsWith(serviceName + ".")) {
        return `${serviceName}.${method}`;
      }
      return method;
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
      const request = new qx.io.jsonrpc.message.Request(this._prependServiceName(method), params);
      this.getTransport().send(request);
      return await request.getPromise();
    },

    /**
     * Sends a single JSON-RPC notification. If a service name has been configured,
     * it is prepended to the method name with a dot.
     * @param {String} method
     * @param {Array|Object?} params
     */
    sendNotification(method, params) {
      const notification = new qx.io.jsonrpc.message.Notification(this._prependServiceName(method), params);
      this.getTransport().send(notification);
    },

    /**
     * Send the given message batch. If a service name has been configured,
     * it is prepended to the method name in each message with a dot.
     * @param {qx.io.jsonrpc.message.Batch} batch
     * @return {qx.Promise} Promise that resolves with an array of the responses
     * to all requests in the batch, or rejects with any error that occurs.
     */
    async sendBatch(batch) {
      qx.core.Assert.assertInstance(batch, qx.io.jsonrpc.message.Batch);
      batch.getBatch().forEach(message => message.setMethod(this._prependServiceName(message.getMethod())));
      this.getTransport().send(batch);
      return await qx.Promise.all(batch.getPromises());
    }
  }
});
