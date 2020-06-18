(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.io.Exception": {
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
   * A class for representing errors that occurred on the jsonrpc server
   */
  qx.Class.define("qx.io.jsonrpc.exception.JsonRpc", {
    extend: qx.io.Exception
  });
  qx.io.jsonrpc.exception.JsonRpc.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=JsonRpc.js.map?dt=1592520314732