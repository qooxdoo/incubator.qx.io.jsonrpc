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
      __form: null,
      __b: null,
      __t: null,
      __s: null,
      setUp: function setUp() {
        qx.test.mobile.form.SingleRenderer.prototype.setUp.base.call(this);
        this.__form = new qx.ui.mobile.form.Form();
        this.__b = new qx.ui.mobile.form.Button("a");

        this.__form.addButton(this.__b);

        this.__t = new qx.ui.mobile.form.TextField("test");

        this.__form.add(this.__t, "label");

        var dd = new qx.data.Array(["1"]);
        this.__s = new qx.ui.mobile.form.SelectBox();

        this.__s.setModel(dd);

        this.__form.add(this.__s, "select");

        this.__renderer = new qx.ui.mobile.form.renderer.Single(this.__form);
        this.getRoot().add(this.__renderer);
      },
      tearDown: function tearDown() {
        this.__b.dispose();

        this.__t.dispose();

        this.__s.dispose();

        this.__form.dispose();

        this.__renderer.dispose();

        qx.test.mobile.form.SingleRenderer.prototype.tearDown.base.call(this);
      },
      testShowHideRow: function testShowHideRow() {
        this.__renderer.hideItem(this.__b);

        var isHidden = this.__b.getLayoutParent().hasCssClass("exclude");

        this.assertTrue(isHidden, "Buttons parent is expected to contain 'exclude' class");

        this.__renderer.showItem(this.__b);

        isHidden = this.__b.getLayoutParent().hasCssClass("exclude");
        this.assertFalse(isHidden, "Button parent is expected to not contain 'exclude' class anymore");
      },
      testItemRow: function testItemRow() {
        this.assertNotNull(this.__renderer._getChildren()[0]);
        this.assertTrue(2 === this.__renderer._getChildren()[1]._getChildren().length); // we have a label and a form element in the row
      },
      testButtonRow: function testButtonRow() {
        this.assertNotNull(this.__renderer._getChildren()[5]);

        var buttonRowLength = this.__renderer._getChildren()[5]._getChildren().length;

        this.assertTrue(1 === buttonRowLength); // we have only the button in the row
      },
      testTwoLinesRow: function testTwoLinesRow() {
        this.assertNotNull(this.__renderer._getChildren()[3]);

        var rowLength = this.__renderer._getChildren()[3]._getChildren().length;

        this.assertTrue(2 === rowLength);
      }
    }
  });
  qx.test.mobile.form.SingleRenderer.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=SingleRenderer.js.map?dt=1588623983000