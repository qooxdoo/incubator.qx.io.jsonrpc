(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.io.graphql.protocol.Message": {
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
       * Christian Boulanger (cboulanger)
  
  ************************************************************************ */

  /**
   * An Object modelling a GraphQL request based on the GraphQL language
   * (see http://spec.graphql.org/draft/#sec-Language)
   */
  qx.Class.define("qx.io.graphql.protocol.Request", {
    extend: qx.io.graphql.protocol.Message,
    properties: {
      /**
       * The query as a string which will be parsed and executed on the server
       */
      query: {
        check: "String",
        nullable: false,
        init: ""
      },

      /**
       * A map of key-value pairs providing the data for the variables in the query
       */
      variables: {
        check: "Object",
        nullable: true
      }
    }
  });
  qx.io.graphql.protocol.Request.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Request.js.map?dt=1599343212864