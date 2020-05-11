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
      "qx.ui.form.TextField": {}
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
       * Henner Kollmann
  
  ************************************************************************ */
  qx.Class.define("qx.test.ui.form.TextField", {
    extend: qx.test.ui.LayoutTestCase,
    members: {
      setUp: function setUp() {
        this.__field = new qx.ui.form.TextField();
        this.getRoot().add(this.__field);
      },
      tearDown: function tearDown() {
        this.__field.destroy();

        this.__field = null;
        qx.test.ui.form.TextField.prototype.tearDown.base.call(this);
      },
      "test: get default length": function testGetDefaultLength() {
        var l = this.__field.getMaxLength();

        this.assertEquals(Infinity, l);
      },
      "test: set max length": function testSetMaxLength() {
        this.__field.setMaxLength(4);

        var l = this.__field.getMaxLength();

        this.assertEquals(4, l);
      },
      "test: reset max length": function testResetMaxLength() {
        this.__field.setMaxLength(4);

        var l = this.__field.getMaxLength();

        this.assertEquals(4, l);

        this.__field.resetMaxLength();

        var l = this.__field.getMaxLength();

        this.assertEquals(Infinity, l);
      },
      "test: validate input with filter": function testValidateInputWithFilter() {
        this.__field.setFilter(/[0-9]/);

        var s = this.__field._validateInput("a");

        this.assertEquals("", s);

        var s = this.__field._validateInput("111");

        this.assertEquals("111", s);
      },
      "test: validate input with complex filter": function testValidateInputWithComplexFilter() {
        this.__field.setFilter(/^(\+|-)?\d*$/);

        var s = this.__field._validateInput("a");

        this.assertEquals("", s);

        var s = this.__field._validateInput("1");

        this.assertEquals("1", s);

        var s = this.__field._validateInput("-");

        this.assertEquals("-", s);

        var s = this.__field._validateInput("111");

        this.assertEquals("111", s);

        var s = this.__field._validateInput("-111");

        this.assertEquals("-111", s);

        var s = this.__field._validateInput("-11-1");

        this.assertEquals("", s);
      },
      "test: validate input with complex filter 2": function testValidateInputWithComplexFilter2() {
        this.__field.setFilter(/^xy$/);

        var s = this.__field._validateInput("x? y?");

        this.assertEquals("", s);
      },
      __field: null
    }
  });
  qx.test.ui.form.TextField.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=TextField.js.map?dt=1589218264589