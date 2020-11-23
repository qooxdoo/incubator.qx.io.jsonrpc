(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.test.mobile.MobileTestCase": {
        "require": true
      },
      "qx.ui.mobile.basic.Label": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2011 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Tino Butz (tbtz)
  
  ************************************************************************ */
  qx.Class.define("qx.test.mobile.basic.Label", {
    extend: qx.test.mobile.MobileTestCase,
    members: {
      testValue: function testValue() {
        var label = new qx.ui.mobile.basic.Label("affe");
        this.getRoot().add(label);
        this.assertString(label.getValue());
        this.assertEquals(label.getValue(), "affe");
        this.assertEquals(label.getValue(), label.getContentElement().innerHTML);
        this.assertEventFired(label, "changeValue", function () {
          label.setValue("");
        });
        this.assertEquals(label.getValue(), "");
        this.assertEquals(label.getValue(), label.getContentElement().innerHTML);
        label.destroy();
      }
    }
  });
  qx.test.mobile.basic.Label.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Label.js.map?dt=1606150615925