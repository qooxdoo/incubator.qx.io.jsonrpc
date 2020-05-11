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
      "qx.ui.core.Widget": {},
      "qx.ui.decoration.Decorator": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2014 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Martin Wittemann (wittemann)
  
  ************************************************************************ */
  qx.Class.define("qx.test.ui.decoration.LinearGradient", {
    extend: qx.test.ui.LayoutTestCase,
    members: {
      setUp: function setUp() {
        this.__w = new qx.ui.core.Widget();

        this.__w.setHeight(100);

        this.__dec = new qx.ui.decoration.Decorator();

        this.__dec.set({
          startColor: "red",
          endColor: "black"
        });

        this.getRoot().add(this.__w);
      },
      tearDown: function tearDown() {
        this.__w.destroy();

        this.__dec.dispose();
      },
      testDefault: function testDefault() {
        this.__dec.set({
          startColorPosition: 0,
          endColorPosition: 100
        });

        this.__w.setDecorator(this.__dec);

        this.flush();
      },
      testDefaultPx: function testDefaultPx() {
        this.__dec.set({
          startColorPosition: 0,
          endColorPosition: 200,
          colorPositionUnit: "px"
        });

        this.__w.setDecorator(this.__dec);

        this.flush();
      },
      testNegativeStart: function testNegativeStart() {
        this.__dec.set({
          startColorPosition: -100,
          endColorPosition: 100
        });

        this.__w.setDecorator(this.__dec);

        this.flush();
      },
      testBigEnd: function testBigEnd() {
        this.__dec.set({
          startColorPosition: 0,
          endColorPosition: 200
        });

        this.__w.setDecorator(this.__dec);

        this.flush();
      },
      testBigEndPx: function testBigEndPx() {
        this.__dec.set({
          startColorPosition: 0,
          endColorPosition: 200,
          colorPositionUnit: "px"
        });

        this.__w.setDecorator(this.__dec);

        this.flush();
      },
      testNegativeStartPx: function testNegativeStartPx() {
        this.__dec.set({
          startColorPosition: 0,
          endColorPosition: 200,
          colorPositionUnit: "px"
        });

        this.__w.setDecorator(this.__dec);

        this.flush();
      }
    }
  });
  qx.test.ui.decoration.LinearGradient.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=LinearGradient.js.map?dt=1589218263319