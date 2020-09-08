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
      "qx.ui.mobile.form.Form": {},
      "qx.ui.mobile.form.Button": {},
      "qx.ui.mobile.form.TextField": {},
      "qx.data.Array": {},
      "qx.ui.mobile.form.SelectBox": {},
      "qx.ui.mobile.form.renderer.Single": {}
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
  qx.Class.define("qx.test.mobile.form.SingleRenderer", {
    extend: qx.test.mobile.MobileTestCase,
    members: {
      __form__P_260_0: null,
      __b__P_260_1: null,
      __t__P_260_2: null,
      __s__P_260_3: null,
      setUp: function setUp() {
        qx.test.mobile.form.SingleRenderer.prototype.setUp.base.call(this);
        this.__form__P_260_0 = new qx.ui.mobile.form.Form();
        this.__b__P_260_1 = new qx.ui.mobile.form.Button("a");

        this.__form__P_260_0.addButton(this.__b__P_260_1);

        this.__t__P_260_2 = new qx.ui.mobile.form.TextField("test");

        this.__form__P_260_0.add(this.__t__P_260_2, "label");

        var dd = new qx.data.Array(["1"]);
        this.__s__P_260_3 = new qx.ui.mobile.form.SelectBox();

        this.__s__P_260_3.setModel(dd);

        this.__form__P_260_0.add(this.__s__P_260_3, "select");

        this.__renderer__P_260_4 = new qx.ui.mobile.form.renderer.Single(this.__form__P_260_0);
        this.getRoot().add(this.__renderer__P_260_4);
      },
      tearDown: function tearDown() {
        this.__b__P_260_1.dispose();

        this.__t__P_260_2.dispose();

        this.__s__P_260_3.dispose();

        this.__form__P_260_0.dispose();

        this.__renderer__P_260_4.dispose();

        qx.test.mobile.form.SingleRenderer.prototype.tearDown.base.call(this);
      },
      testShowHideRow: function testShowHideRow() {
        this.__renderer__P_260_4.hideItem(this.__b__P_260_1);

        var isHidden = this.__b__P_260_1.getLayoutParent().hasCssClass("exclude");

        this.assertTrue(isHidden, "Buttons parent is expected to contain 'exclude' class");

        this.__renderer__P_260_4.showItem(this.__b__P_260_1);

        isHidden = this.__b__P_260_1.getLayoutParent().hasCssClass("exclude");
        this.assertFalse(isHidden, "Button parent is expected to not contain 'exclude' class anymore");
      },
      testItemRow: function testItemRow() {
        this.assertNotNull(this.__renderer__P_260_4._getChildren()[0]);
        this.assertTrue(2 === this.__renderer__P_260_4._getChildren()[1]._getChildren().length); // we have a label and a form element in the row
      },
      testButtonRow: function testButtonRow() {
        this.assertNotNull(this.__renderer__P_260_4._getChildren()[5]);

        var buttonRowLength = this.__renderer__P_260_4._getChildren()[5]._getChildren().length;

        this.assertTrue(1 === buttonRowLength); // we have only the button in the row
      },
      testTwoLinesRow: function testTwoLinesRow() {
        this.assertNotNull(this.__renderer__P_260_4._getChildren()[3]);

        var rowLength = this.__renderer__P_260_4._getChildren()[3]._getChildren().length;

        this.assertTrue(2 === rowLength);
      }
    }
  });
  qx.test.mobile.form.SingleRenderer.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=SingleRenderer.js.map?dt=1599578765547