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
      }
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
       * Christian Boulanger
  
  ************************************************************************ */

  /**
   * The JSON-RPC data store is responsible for fetching data from a
   * server endpoint
   * NOT FUNCTIONAL YET
   *
   */
  qx.Class.define("qx.data.store.Jsonrpc", {
    extend: qx.core.Object,

    /**
     * @param {String} url The url to the GraphQl server endpoint
     * @param {String} method The method to be executed
     * @param  {Object?null} delegate The delegate containing one of the methods
     *   specified in {@link qx.data.store.IStoreDelegate}.
     */
    construct: function construct(url, method, delegate) {
      qx.core.Object.constructor.call(this);
    },
    properties: {
      /**
       * Property for holding the loaded model instance.
       */
      method: {
        check: "String",
        nullable: false,
        init: ""
      }
    },
    members: {
      _client: null,
      _marshaler: null,
      _delegate: null // TODO IMPLEMENT

    }
  });
  qx.data.store.Jsonrpc.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Jsonrpc.js.map?dt=1599905713901