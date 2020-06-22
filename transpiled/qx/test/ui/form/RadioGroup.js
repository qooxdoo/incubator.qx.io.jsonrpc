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
      "qx.ui.form.RadioGroup": {},
      "qx.ui.form.RadioButton": {},
      "qx.ui.container.Composite": {},
      "qx.core.Object": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2004-2011 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Alexander Steitz (aback)
  
  ************************************************************************ */
  qx.Class.define("qx.test.ui.form.RadioGroup", {
    extend: qx.test.ui.LayoutTestCase,
    members: {
      setUp: function setUp() {
        this.__radioGroup__P_315_0 = new qx.ui.form.RadioGroup();

        this.__radioGroup__P_315_0.setAllowEmptySelection(true);

        this.__radioButtons__P_315_1 = [];
        var radioButton;

        for (var i = 0, j = 3; i < j; i++) {
          radioButton = new qx.ui.form.RadioButton("option " + i);
          radioButton.setModel("option" + i);

          this.__radioButtons__P_315_1.push(radioButton);

          this.__radioGroup__P_315_0.add(radioButton);
        }
      },
      tearDown: function tearDown() {
        qx.test.ui.form.RadioGroup.prototype.tearDown.base.call(this);
        var radioButton;

        for (var i = 0, j = this.__radioButtons__P_315_1.length; i < j; i++) {
          this.__radioGroup__P_315_0.remove(this.__radioButtons__P_315_1[i]);

          radioButton = this.__radioButtons__P_315_1.shift();
          radioButton.dispose();
        }

        this.__radioGroup__P_315_0.dispose();

        this.__radioButtons__P_315_1 = null;
      },
      testHiddenRadioButtons: function testHiddenRadioButtons() {
        var composite = new qx.ui.container.Composite();

        for (var i = 0, j = this.__radioButtons__P_315_1.length; i < j; i++) {
          composite.add(this.__radioButtons__P_315_1[i]);
        }

        this.getRoot().add(composite, {
          left: 100,
          top: 50
        }); // check the 'modelSelection' with all radio buttons visible

        this.__radioGroup__P_315_0.setModelSelection([this.__radioButtons__P_315_1[1].getModel()]);

        this.assertEquals(this.__radioButtons__P_315_1[1].getModel(), this.__radioGroup__P_315_0.getModelSelection().getItem(0), "Model selection does not work correctly!");
        this.assertTrue(this.__radioGroup__P_315_0.isSelected(this.__radioButtons__P_315_1[1]), "Wrong radio button selected!"); // now hide the radio group and check if the selection change still works

        for (var i = 0, j = this.__radioButtons__P_315_1.length; i < j; i++) {
          this.__radioButtons__P_315_1[i].exclude();
        }

        this.__radioGroup__P_315_0.setModelSelection([this.__radioButtons__P_315_1[0].getModel()]);

        this.assertEquals(this.__radioButtons__P_315_1[0].getModel(), this.__radioGroup__P_315_0.getModelSelection().getItem(0), "Model selection does not work correctly!");
        this.assertTrue(this.__radioGroup__P_315_0.isSelected(this.__radioButtons__P_315_1[0]), "Hidden radio button not selected!");
        composite.destroy();
      },

      /**
       * @ignore(qx.test.ui.form.RadioGroupTest)
       */
      testAlteredGroupProperty: function testAlteredGroupProperty() {
        qx.Class.define("qx.test.ui.form.RadioGroupTest", {
          extend: qx.core.Object,
          properties: {
            locked: {
              init: false,
              check: "Boolean",
              event: "changeLocked",
              nullable: false
            },
            // set by the RadioGroup
            lockedGroup: {
              init: null,
              check: "qx.ui.form.RadioGroup",
              nullable: true
            }
          }
        });
        var rg;
        var testObj1, testObj2, testObj3;
        rg = new qx.ui.form.RadioGroup();
        rg.set({
          groupedProperty: "locked",
          groupProperty: "lockedGroup"
        });
        testObj1 = new qx.test.ui.form.RadioGroupTest();
        testObj2 = new qx.test.ui.form.RadioGroupTest();
        testObj3 = new qx.test.ui.form.RadioGroupTest(); // Add the test objects to the radio group. This should automatically
        // select the first one.

        rg.add(testObj1, testObj2, testObj3); // Ensure it did and the other ones are off

        this.assertTrue(testObj1.getLocked());
        this.assertFalse(testObj2.getLocked());
        this.assertFalse(testObj3.getLocked()); // Select the second one.

        rg.setSelection([testObj2]); // Ensure it's now on and the other ones are off

        this.assertTrue(testObj2.getLocked());
        this.assertFalse(testObj1.getLocked());
        this.assertFalse(testObj3.getLocked()); // Also ensure that the selection is as we expect

        this.assertEquals(rg.getSelection()[0], testObj2); // Clean up

        testObj1.dispose();
        testObj2.dispose();
        testObj3.dispose();
        qx.Class.undefine("qx.test.ui.form.RadioGroupTest");
      }
    }
  });
  qx.test.ui.form.RadioGroup.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=RadioGroup.js.map?dt=1592867905752