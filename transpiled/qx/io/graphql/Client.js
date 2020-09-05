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
      "qx.io.graphql.protocol.Response": {},
      "qx.io.exception.Transport": {},
      "qx.io.exception.Protocol": {}
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
   * This class provides a simple GraphQl client (https://graphql.org/).
   * For transport, it is based on internally on the fetch API
   * (https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch)
   * which, if needed, must be directly configured via the `init` parameter of the
   * constructor, until a more generalized qx.io API has been developed.
   *
   */
  qx.Class.define("qx.io.graphql.Client", {
    extend: qx.core.Object,

    /**
     * @param {String} url The url of the GraphQL endpoint
     * @param {object} init A map of configuration values, see
     * https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch
     * This parameter is used to configure the underlying fetch
     * API and might be removed in a future. If you provide custom headers, you must
     * set "Content-Type" and "Accept" to "application/json" yourself.
     */
    construct: function construct(url, init = {}) {
      qx.core.Object.constructor.call(this);
      this.setUrl(url);
      let headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      };
      init.method = "POST";
      init.headers = init.headers || headers;
      this.__init__P_158_0 = init;
    },
    properties: {
      /**
       * The URL of the GraphQl endpoint
       */
      url: {
        check: "String"
      },

      /**
       * Optional authentication object
       */
      authentication: {
        check: "qx.io.request.authentication.IAuthentication",
        nullable: true
      }
    },
    events: {
      /**
       * Event fired when a request results in an error. Event data is an instance of
       * {@link qx.io.exception.Transport}, {@link qx.io.exception.Protocol},
       * or {@link qx.io.exception.Cancel}.
       * Event fired when a message is received from the endpoint. Event data
       * is an UTF-8 encoded string
       */
      "error": "qx.event.type.Data"
    },
    members: {
      /**
       * Stores the `init` parameter of the constructor
       * @type {Object}
       */
      __init__P_158_0: null,

      /**
       * Send the given GraphQl query. See https://graphql.org/learn/queries/
       *
       * @param {qx.io.graphql.protocol.Request} request The GraphQl request object.
       * @return {qx.Promise} Promise that resolves with the data
       * @ignore(fetch)
       */
      async send(request) {
        let auth = this.getAuthentication();

        if (auth) {
          auth.getAuthHeaders().forEach(header => {
            this.__init__P_158_0.headers[header.key] = header.value;
          });
        }

        this.__init__P_158_0.body = request.toString();
        let response = await fetch(this.getUrl(), this.__init__P_158_0);

        if (response.ok) {
          let responseData = await response.json();
          let graphQlResponse = new qx.io.graphql.protocol.Response(responseData);

          if (graphQlResponse.getErrors()) {
            this._handleErrors(graphQlResponse);
          }
        } else {
          throw new qx.io.exception.Transport(response.statusText, response.status);
        }
      },

      /**
       * Handle the errors reported by the GraphQL endpoint. The response
       * can contain several errors, but we can only throw one of them.
       * However, we can fire an event for each error, which might be useful
       * if they are to be logged. The errors that are thrown or fired as
       * event data contain the original response object in the `data` property
       *
       * @param {qx.io.graphql.protocol.Response} response The response object
       */
      _handleErrors(response) {
        let errors = response.getErrors();
        errors.forEach(error => {
          let exception = new qx.io.exception.Protocol(error.message, null, response.toObject());
          this.fireDataEvent("error", exception);
        });
        throw new qx.io.exception.Protocol(errors[0].message, null, response.toObject());
      }

    }
  });
  qx.io.graphql.Client.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Client.js.map?dt=1599312828673