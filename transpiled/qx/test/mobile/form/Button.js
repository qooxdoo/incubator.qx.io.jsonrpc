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
      "qx.ui.mobile.form.Button": {}
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
  qx.Class.define("qx.test.mobile.form.Button", {
    extend: qx.test.mobile.MobileTestCase,
    members: {
      testLabel: function testLabel() {
        var button = new qx.ui.mobile.form.Button("affe");
        this.getRoot().add(button);
        this.assertString(button.getLabel());
        this.assertEquals("affe", button.getLabel());
        this.assertEquals(button.getLabel(), button.getLabelWidget().getContentElement().innerHTML);
        this.assertEventFired(button, "changeLabel", function () {
          button.setLabel("");
        });
        this.assertEquals("", button.getLabel());
        this.assertEquals(button.getLabel(), button.getLabelWidget().getContentElement().innerHTML);
        button.destroy();
      }
    }
  });
  qx.test.mobile.form.Button.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Button.js.map?dt=1608415607372