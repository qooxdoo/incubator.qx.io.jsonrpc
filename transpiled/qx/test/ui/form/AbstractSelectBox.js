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
      "qx.ui.form.SelectBox": {},
      "qx.ui.form.ComboBox": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2004-2008 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Alexander Steitz (aback)
  
  ************************************************************************ */
  qx.Class.define("qx.test.ui.form.AbstractSelectBox", {
    extend: qx.test.ui.LayoutTestCase,
    members: {
      setUp: function setUp() {
        this.__selectBox__P_295_0 = new qx.ui.form.SelectBox();
        this.getRoot().add(this.__selectBox__P_295_0);
        this.__comboBox__P_295_1 = new qx.ui.form.ComboBox();
        this.getRoot().add(this.__comboBox__P_295_1);
        this.flush();
      },
      tearDown: function tearDown() {
        qx.test.ui.form.AbstractSelectBox.prototype.tearDown.base.call(this);

        this.__selectBox__P_295_0.dispose();

        this.__selectBox__P_295_0 = null;

        this.__comboBox__P_295_1.dispose();

        this.__comboBox__P_295_1 = null;
      },
      testStatePopupOpen: function testStatePopupOpen() {
        this.__selectBox__P_295_0.open();

        this.flush();
        this.assertTrue(this.__selectBox__P_295_0.hasState("popupOpen"));

        this.__selectBox__P_295_0.close();

        this.flush();
        this.assertFalse(this.__selectBox__P_295_0.hasState("popupOpen"));

        this.__comboBox__P_295_1.open();

        this.flush();
        this.assertTrue(this.__comboBox__P_295_1.hasState("popupOpen"));

        this.__comboBox__P_295_1.close();

        this.flush();
        this.assertFalse(this.__comboBox__P_295_1.hasState("popupOpen"));
      }
    }
  });
  qx.test.ui.form.AbstractSelectBox.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=AbstractSelectBox.js.map?dt=1592520329137