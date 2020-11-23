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
      "qx.ui.basic.Label": {},
      "qx.ui.form.TextField": {},
      "qx.ui.form.Spinner": {},
      "qx.ui.form.CheckBox": {}
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
       * Martin Wittemann (martinwittemann)
  
  ************************************************************************ */
  qx.Class.define("qx.test.ui.form.Label", {
    extend: qx.test.ui.LayoutTestCase,
    members: {
      __formWidget__P_304_0: null,
      __label__P_304_1: null,
      setUp: function setUp() {
        this.__label__P_304_1 = new qx.ui.basic.Label("abc");
      },
      tearDown: function tearDown() {
        this.__label__P_304_1.destroy();

        this.__formWidget__P_304_0.destroy();
      },
      __testEnabled__P_304_2: function __testEnabled__P_304_2() {
        this.__label__P_304_1.setBuddy(this.__formWidget__P_304_0); // check the initial enabled state


        this.assertTrue(this.__formWidget__P_304_0.getEnabled(), "Form widget is disabled.");
        this.assertTrue(this.__label__P_304_1.getEnabled(), "Label widget is disabled."); // disable the textfield. Label should be disabled too

        this.__formWidget__P_304_0.setEnabled(false); // check if both are disabled


        this.assertFalse(this.__formWidget__P_304_0.getEnabled(), "Form widget is not disabled.");
        this.assertFalse(this.__label__P_304_1.getEnabled(), "Label widget is not disabled."); // enabled the label, textfield should stay

        this.__label__P_304_1.setEnabled(true); // check if the enabled properties are still correct


        this.assertFalse(this.__formWidget__P_304_0.getEnabled(), "Form widget is not disabled at the end.");
        this.assertTrue(this.__label__P_304_1.getEnabled(), "Label widget is ensabled at the end.");
      },
      __testEnabledRemove__P_304_3: function __testEnabledRemove__P_304_3() {
        this.__label__P_304_1.setBuddy(this.__formWidget__P_304_0); // disable the textfield. Label should be disabled too


        this.__formWidget__P_304_0.setEnabled(false); // check if both are disabled


        this.assertFalse(this.__formWidget__P_304_0.getEnabled(), "Form widget is not disabled.");
        this.assertFalse(this.__label__P_304_1.getEnabled(), "Label widget is not disabled."); // remove the buddy

        this.__label__P_304_1.setBuddy(null); // enabled the textfield. label should stay


        this.__formWidget__P_304_0.setEnabled(true); // check if the enabled properties are still correct


        this.assertFalse(this.__label__P_304_1.getEnabled(), "Label widget is not disabled at the end.");
        this.assertTrue(this.__formWidget__P_304_0.getEnabled(), "Form widget is ensabled at the end.");
      },
      __testFocus__P_304_4: function __testFocus__P_304_4() {
        // NEEDED FOR THE FOCUS
        this.getRoot().add(this.__formWidget__P_304_0);

        this.__label__P_304_1.setBuddy(this.__formWidget__P_304_0);

        this.__formWidget__P_304_0.addListener("focus", function () {
          this.resume(function () {// do nothing. Just check for the event
          }, this);
        }, this);

        this.tapOn(this.__label__P_304_1);
        this.wait();
      },
      __testFocusRemove__P_304_5: function __testFocusRemove__P_304_5() {
        // NEEDED FOR THE FOCUS
        this.getRoot().add(this.__formWidget__P_304_0);

        this.__label__P_304_1.setBuddy(this.__formWidget__P_304_0);

        this.__label__P_304_1.setBuddy(null);

        var focused = false;

        this.__formWidget__P_304_0.addListener("focus", function () {
          focused = true;
        }, this);

        var self = this;
        window.setTimeout(function () {
          self.resume(function () {
            this.assertFalse(self.__label__P_304_1.hasListener("click"), "Listener still there.");
            this.assertFalse(focused, "Element has been focused");
          }, self);
        }, 1000);
        this.tapOn(this.__label__P_304_1);
        this.wait();
      },
      testEnabledRemoveTextField: function testEnabledRemoveTextField() {
        this.__formWidget__P_304_0 = new qx.ui.form.TextField("abc");

        this.__testEnabledRemove__P_304_3();
      },
      testEnabledTextField: function testEnabledTextField() {
        this.__formWidget__P_304_0 = new qx.ui.form.TextField("abc");

        this.__testEnabled__P_304_2();
      },
      testEnabledRemoveSpinner: function testEnabledRemoveSpinner() {
        this.__formWidget__P_304_0 = new qx.ui.form.Spinner();

        this.__testEnabledRemove__P_304_3();
      },
      testEnabledSpinner: function testEnabledSpinner() {
        this.__formWidget__P_304_0 = new qx.ui.form.Spinner();

        this.__testEnabled__P_304_2();
      },
      testEnabledRemoveCheckBox: function testEnabledRemoveCheckBox() {
        this.__formWidget__P_304_0 = new qx.ui.form.CheckBox();

        this.__testEnabledRemove__P_304_3();
      },
      testEnabledCheckBox: function testEnabledCheckBox() {
        this.__formWidget__P_304_0 = new qx.ui.form.CheckBox();

        this.__testEnabled__P_304_2();
      },
      testFocusTextField: function testFocusTextField() {
        this.__formWidget__P_304_0 = new qx.ui.form.TextField("abc");

        this.__testFocus__P_304_4();
      },
      testFocusSpinner: function testFocusSpinner() {
        this.__formWidget__P_304_0 = new qx.ui.form.Spinner();

        this.__testFocus__P_304_4();
      },
      testFocusCheckBox: function testFocusCheckBox() {
        this.__formWidget__P_304_0 = new qx.ui.form.CheckBox();

        this.__testFocus__P_304_4();
      },
      testFocusRemoveTextField: function testFocusRemoveTextField() {
        this.__formWidget__P_304_0 = new qx.ui.form.TextField("abc");

        this.__testFocusRemove__P_304_5();
      },
      testFocusRemoveSpinner: function testFocusRemoveSpinner() {
        this.__formWidget__P_304_0 = new qx.ui.form.Spinner();

        this.__testFocusRemove__P_304_5();
      },
      testFocusRemoveCheckBox: function testFocusRemoveCheckBox() {
        this.__formWidget__P_304_0 = new qx.ui.form.CheckBox();

        this.__testFocusRemove__P_304_5();
      },
      testFocusNotFocusableTextField: function testFocusNotFocusableTextField() {
        this.__formWidget__P_304_0 = new qx.ui.form.TextField();

        this.__formWidget__P_304_0.setReadOnly(true);

        this.__label__P_304_1.setBuddy(this.__formWidget__P_304_0);

        this.tapOn(this.__label__P_304_1);
      }
    },
    destruct: function destruct() {
      this.__label__P_304_1 = this.__formWidget__P_304_0 = null;
    }
  });
  qx.test.ui.form.Label.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Label.js.map?dt=1606150462641