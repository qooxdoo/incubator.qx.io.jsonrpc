(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.test.ui.LayoutTestCase": {
        "require": true
      },
      "qx.ui.form.SplitButton": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2004-2013 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Martin Wittemann (wittemann)
  
  ************************************************************************ */
  qx.Class.define("qx.test.ui.form.SplitButton", {
    extend: qx.test.ui.LayoutTestCase,
    members: {
      setUp: function setUp() {
        this._split = new qx.ui.form.SplitButton();
        this.getRoot().add(this._split);
      },
      tearDown: function tearDown() {
        this._split.destroy();

        this.flush();
      },
      testArrowAvailable: function testArrowAvailable() {
        this._split.setIcon("qx/icon/Oxygen/22/emotes/face-smile.png");

        var arrow = this._split.getChildControl("arrow").getChildControl("icon");

        var icon = this._split.getChildControl("button").getChildControl("icon");

        this.flush(); // check initial values

        this.assertTrue(arrow.isVisible(), "init arrow");
        this.assertTrue(icon.isVisible(), "init icon");

        this._split.setShow("label");

        this.flush(); // check changed values

        this.assertTrue(arrow.isVisible(), "changed arrow");
        this.assertFalse(icon.isVisible(), "changed icon");
      }
    }
  });
  qx.test.ui.form.SplitButton.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=SplitButton.js.map?dt=1592520330257