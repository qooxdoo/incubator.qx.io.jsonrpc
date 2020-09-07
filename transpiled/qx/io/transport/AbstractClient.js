(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.core.Object": {
        "require": true
      },
      "qx.lang.Type": {},
      "qx.Interface": {},
      "qx.io.transport.ITransport": {},
      "qx.io.exception.Transport": {}
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
   * This class provides a the base class for all clients that use the
   * transport implementations in this namespace. Since the static method
   * `registerTransport` cannot be inherited by subclasses, they mus proxy it
   * by adding `registerTransport : qx.io.transport.AbstractClient.registerTransport`
   * to their `statics` section.
   *
   */
  qx.Class.define("qx.io.transport.AbstractClient", {
    extend: qx.core.Object,
    type: "abstract",
    statics: {
      /**
       * Register a transport class for use with uris that match the given
       * regular expression. The client will use the transport which first
       * matches, starting with the last added transport
       * @param {RegExp} uriRegExp
       *    A regular expression which the URI must match
       * @param {qx.io.transport.ITransport}  transportClass
       *    The qooxdoo class implementing the transport
       */
      registerTransport(uriRegExp, transportClass) {
        if (!this.constructor.__transports__P_175_0) {
          this.constructor.__transports__P_175_0 = [];
        }

        if (!qx.lang.Type.isRegExp(uriRegExp)) {
          throw new Error("First argument must be a regular expression!");
        }

        if (!qx.Interface.classImplements(transportClass, qx.io.transport.ITransport)) {
          throw new Error("Transport class must implement qx.io.transport.ITransport");
        }

        this.constructor.__transports__P_175_0.push({
          uriRegExp,
          transport: transportClass
        });
      }

    },
    properties: {
      /**
       * The transport object
       */
      transport: {
        check: "qx.io.transport.ITransport"
      }
    },
    members: {
      /**
       * Given a transport object implementing {@link qx.io.transport.ITransport}
       * select that transport; if a string URI is passed, select one that has
       * been registered for that class of URIs.
       * @param {qx.io.transport.ITransport|String} transportOrUri
       * @throws qx.io.exception.Transport
       */
      selectTransport(transportOrUri) {
        let transport;
        let uri;

        if (qx.lang.Type.isString(transportOrUri)) {
          uri = transportOrUri;

          for (let registeredTransport of this.constructor.__transports__P_175_0.reverse()) {
            if (uri.match(registeredTransport.uriRegExp)) {
              // eslint-disable-next-line new-cap
              transport = new registeredTransport.transport(uri);
            }
          }

          if (!transport) {
            throw new qx.io.exception.Transport(`No matching transport for URI '${transportOrUri}'`, qx.io.exception.Transport.INVALD_URI);
          }
        } else {
          transport = transportOrUri;
        }

        this.setTransport(transport);
      }

    }
  });
  qx.io.transport.AbstractClient.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=AbstractClient.js.map?dt=1599463015019