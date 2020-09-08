(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.dev.unit.TestCase": {
        "require": true
      },
      "qx.dev.unit.MMock": {
        "require": true
      },
      "qx.util.Function": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2007-2008 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Fabian Jakobs (fjakobs)
  
  ************************************************************************ */
  qx.Class.define("qx.test.util.Function", {
    extend: qx.dev.unit.TestCase,
    include: qx.dev.unit.MMock,
    members: {
      testDebounce: function testDebounce() {
        var test = this.stub();
        var debouncedTest = qx.util.Function.debounce(test, 10);
        debouncedTest(true);
        this.assertNotCalled(test);
        debouncedTest(false);
        this.wait(50, function () {
          this.assertCalledOnce(test);
          this.assertCalledWith(test, false);
        }, this);
      },
      testImmediateDebounce: function testImmediateDebounce() {
        var test = this.stub();
        var debouncedTest = qx.util.Function.debounce(test, 10, true);
        debouncedTest(true);
        this.assertCalled(test);
        this.assertCalledWith(test, true);
        debouncedTest(false);
        debouncedTest(true);
        debouncedTest(false);
        this.wait(50, function () {
          this.assertCalledTwice(test);
          this.assertCalledWith(test, false);
        }, this);
      }
    }
  });
  qx.test.util.Function.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Function.js.map?dt=1599578772244