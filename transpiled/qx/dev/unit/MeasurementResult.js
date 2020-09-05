(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2004-2012 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Daniel Wagner (danielwagner)
  
  ************************************************************************ */

  /**
   * Performance test result object. Used to communicate measurements to the unit
   * testing framework.
   */
  qx.Class.define("qx.dev.unit.MeasurementResult", {
    extend: Object,

    /**
     *
     * @param message {String} Description
     * @param iterations {Number} Amount of times the tested code was executed
     * @param ownTime {Number} Elapsed JavaScript execution time
     * @param renderTime {Number} Elapsed DOM rendering time
     */
    construct: function construct(message, iterations, ownTime, renderTime) {
      this.__message__P_106_0 = message;
      this.__iterations__P_106_1 = iterations;
      this.__ownTime__P_106_2 = ownTime;
      this.__renderTime__P_106_3 = renderTime;
    },
    members: {
      __message__P_106_0: null,
      __iterations__P_106_1: null,
      __ownTime__P_106_2: null,
      __renderTime__P_106_3: null,

      /**
       * Returns the stored data as a map.
       * @return {Map} The stored data.
       */
      getData: function getData() {
        return {
          message: this.__message__P_106_0,
          iterations: this.__iterations__P_106_1,
          ownTime: this.__ownTime__P_106_2,
          renderTime: this.__renderTime__P_106_3
        };
      },

      /**
       * Returns a readable summary of this result
       *
       * @return {String} Result summary
       */
      toString: function toString() {
        return ["Measured: " + this.__message__P_106_0, "Iterations: " + this.__iterations__P_106_1, "Time: " + this.__ownTime__P_106_2 + "ms", "Render time: " + this.__renderTime__P_106_3 + "ms"].join("\n");
      }
    }
  });
  qx.dev.unit.MeasurementResult.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=MeasurementResult.js.map?dt=1599312824292