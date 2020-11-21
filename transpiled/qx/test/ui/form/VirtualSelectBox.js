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
      "qx.ui.form.VirtualSelectBox": {},
      "qx.data.marshal.Json": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2017 Martijn Evers, The Netherlands
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Martijn Evers (mever)
  
  ************************************************************************ */
  qx.Class.define("qx.test.ui.form.VirtualSelectBox", {
    extend: qx.test.ui.LayoutTestCase,
    members: {
      setUp: function setUp() {
        this.__selectBox__P_321_0 = new qx.ui.form.VirtualSelectBox();
        this.getRoot().add(this.__selectBox__P_321_0);
        this.flush();
      },
      tearDown: function tearDown() {
        qx.test.ui.form.VirtualSelectBox.prototype.tearDown.base.call(this);

        this.__selectBox__P_321_0.destroy();

        this.__selectBox__P_321_0 = null;
      },
      __simulateUiInteraction__P_321_1: function __simulateUiInteraction__P_321_1() {
        // focus -> array key down -> array key down -> enter
        this.__selectBox__P_321_0.getSelection().setItem(0, this.__selectBox__P_321_0.getModel().getItem(1));
      },
      testChangeValueEvent: function testChangeValueEvent() {
        var m = qx.data.marshal.Json.createModel(["a", "b"]);

        this.__selectBox__P_321_0.addListenerOnce("changeValue", function (e) {
          this.assertIdentical("a", e.getData());
          this.assertNull(e.getOldData());
        }.bind(this));

        this.__selectBox__P_321_0.setModel(m);

        this.__selectBox__P_321_0.addListenerOnce("changeValue", function (e) {
          this.assertIdentical("b", e.getData());
          this.assertIdentical("a", e.getOldData());
        }.bind(this));

        this.__simulateUiInteraction__P_321_1();
      },
      testChangeModelWhileNotVisible: function testChangeModelWhileNotVisible() {
        "use strict";

        var selectBox = new qx.ui.form.VirtualSelectBox(); // We don't want to use a selectbox that has been added to a layout item.

        selectBox.setLabelPath('b');
        var items = qx.data.marshal.Json.createModel([{
          a: 123,
          b: 'item 1'
        }, {
          a: 456,
          b: 'item 2'
        }]);
        items.setAutoDisposeItems(true);
        selectBox.setModel(items);

        try {
          items.pop();
        } catch (e) {
          this.assertTrue(false, "Changing the model should not cause an exception in VirtualDropDownList#_getAvailableHeight");
        }

        items.dispose();
      },
      "test dropdown list same width as selectbox": function testDropdownListSameWidthAsSelectbox() {
        "use strict";

        var test = this;
        var m = qx.data.marshal.Json.createModel(["asdddddddddddddddddddddddddddddddddddddddddddddddddddd", "dsaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"]);

        this.__selectBox__P_321_0.setAllowGrowDropDown(false);

        this.__selectBox__P_321_0.setModel(m);

        this.__selectBox__P_321_0.setWidth(150);

        this.__selectBox__P_321_0.open();

        this.flush();
        setTimeout(function () {
          test.assertIdentical(test.__selectBox__P_321_0.getWidth(), test.__selectBox__P_321_0.getBounds().width);
          test.assertIdentical(test.__selectBox__P_321_0.getWidth(), test.__selectBox__P_321_0.getChildControl('dropdown').getBounds().width);
          test.resume();
        }, 10);
        this.wait();
      },
      "test dropdown list wider than selectbox": function testDropdownListWiderThanSelectbox() {
        "use strict";

        var test = this;
        var m = qx.data.marshal.Json.createModel(["asddddddddddddddddddddddddddddddddddddddddddddddddddddasddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd", "dsaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"]);

        this.__selectBox__P_321_0.setAllowGrowDropDown(true);

        this.__selectBox__P_321_0.setModel(m);

        this.__selectBox__P_321_0.setWidth(150);

        this.__selectBox__P_321_0.open();

        this.flush();
        setTimeout(function () {
          test.assertIdentical(test.__selectBox__P_321_0.getWidth(), test.__selectBox__P_321_0.getBounds().width);
          test.assertTrue(test.__selectBox__P_321_0.getChildControl('dropdown').getBounds().width > 666, "dropdown could not fit the whole item");
          test.resume();
        }, 10);
        this.wait();
      }
    }
  });
  qx.test.ui.form.VirtualSelectBox.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=VirtualSelectBox.js.map?dt=1605962031561