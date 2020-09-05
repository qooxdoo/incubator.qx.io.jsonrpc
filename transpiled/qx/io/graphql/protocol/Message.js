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
      "qx.util.Serializer": {}
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
   * Abstract parent class for GraphQL messages and responses
   */
  qx.Class.define("qx.io.graphql.protocol.Message", {
    extend: qx.core.Object,
    construct: function construct(data) {
      qx.core.Object.constructor.call(this);
      this.set(data);
    },
    members: {
      /**
       * Serialize to JSON string
       * @return {String}
       */
      toString() {
        return qx.util.Serializer.toJson(this);
      },

      /**
       * Serialize to a native javascript object
       * @return {Object}
       */
      toObject() {
        return qx.util.Serializer.toNativeObject(this);
      }

    }
  });
  qx.io.graphql.protocol.Message.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Message.js.map?dt=1599343212850