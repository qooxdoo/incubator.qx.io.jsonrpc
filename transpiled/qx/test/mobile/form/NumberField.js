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
      "qx.ui.mobile.form.NumberField": {},
      "qx.bom.element.Attribute": {},
      "qx.bom.element.Class": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2012 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Christopher Zuendorf (czuendorf)
  
  ************************************************************************ */
  qx.Class.define("qx.test.mobile.form.NumberField", {
    extend: qx.test.mobile.MobileTestCase,
    members: {
      testValue: function testValue() {
        var numberField = new qx.ui.mobile.form.NumberField();
        this.getRoot().add(numberField);
        this.assertEquals('', numberField.getValue());
        this.assertEquals(null, qx.bom.element.Attribute.get(numberField.getContainerElement(), 'value'));
        this.assertEventFired(numberField, "changeValue", function () {
          numberField.setValue(15);
        });
        this.assertEquals(15, numberField.getValue());
        this.assertEquals(15, qx.bom.element.Attribute.get(numberField.getContainerElement(), 'value'));
        numberField.destroy();
      },
      testMinimum: function testMinimum() {
        var numberField = new qx.ui.mobile.form.NumberField();
        this.getRoot().add(numberField);
        this.assertEquals('', numberField.getMinimum());
        numberField.setMinimum(42.23);
        this.assertEquals(42.23, numberField.getMinimum());
        numberField.destroy();
      },
      testMaximum: function testMaximum() {
        var numberField = new qx.ui.mobile.form.NumberField();
        this.getRoot().add(numberField);
        this.assertEquals('', numberField.getMaximum());
        numberField.setMaximum(42.23);
        this.assertEquals(42.23, numberField.getMaximum());
        numberField.destroy();
      },
      testStep: function testStep() {
        var numberField = new qx.ui.mobile.form.NumberField();
        this.getRoot().add(numberField);
        this.assertEquals('', numberField.getStep());
        numberField.setStep(42.23);
        this.assertEquals(42.23, numberField.getStep());
        numberField.destroy();
      },
      testResetValue: function testResetValue() {
        var numberField = new qx.ui.mobile.form.NumberField();
        this.getRoot().add(numberField);
        this.assertEquals('', numberField.getValue());
        this.assertEquals(null, qx.bom.element.Attribute.get(numberField.getContainerElement(), 'value'));
        numberField.setValue(15);
        this.assertEquals(15, numberField.getValue());
        numberField.resetValue();
        this.assertEquals(null, qx.bom.element.Attribute.get(numberField.getContainerElement(), 'value'));
        this.assertEquals('', numberField.getValue());
        numberField.destroy();
      },
      testEnabled: function testEnabled() {
        var numberField = new qx.ui.mobile.form.NumberField();
        this.getRoot().add(numberField);
        this.assertEquals(true, numberField.getEnabled());
        this.assertFalse(qx.bom.element.Class.has(numberField.getContainerElement(), 'disabled'));
        numberField.setEnabled(false);
        this.assertEquals(false, numberField.getEnabled());
        this.assertEquals(true, qx.bom.element.Class.has(numberField.getContainerElement(), 'disabled'));
        numberField.destroy();
      }
    }
  });
  qx.test.mobile.form.NumberField.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=NumberField.js.map?dt=1606253512346