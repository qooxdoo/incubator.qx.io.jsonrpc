(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.core.Object": {
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2009 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Fabian Jakobs (fjakobs)
  
  ************************************************************************ */
  qx.Class.define("qx.test.event.dispatch.TestingWindow", {
    extend: qx.core.Object,
    events: {
      "unload": "qx.event.type.Event",
      "onunload": "qx.event.type.Event"
    },
    members: {
      addEventListener: function addEventListener(type, callback, capture) {
        return this.addListener(type, callback, this, capture);
      },
      attachEvent: function attachEvent(type, callback) {
        return this.addListener(type, callback);
      }
    }
  });
  qx.test.event.dispatch.TestingWindow.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=TestingWindow.js.map?dt=1606150457783