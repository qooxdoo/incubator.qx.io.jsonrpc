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
      "qx.ui.form.Slider": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2004-2013 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Martin Wittemann (martinwittemann)
  
  ************************************************************************ */
  qx.Class.define("qx.test.ui.form.Slider", {
    extend: qx.test.ui.LayoutTestCase,
    members: {
      setUp: function setUp() {
        this.__slider__P_315_0 = new qx.ui.form.Slider();

        this.__slider__P_315_0.setWidth(100);

        this.getRoot().add(this.__slider__P_315_0);
        this.flush();
      },
      tearDown: function tearDown() {
        this.__slider__P_315_0.destroy();
      },
      testKnobPositionAfterBlur: function testKnobPositionAfterBlur() {
        this.__slider__P_315_0.setValue(0);

        this.flush();

        var pos0 = this.__slider__P_315_0.getChildControl("knob").getContentElement().getStyle("left");

        this.__slider__P_315_0.setValue(30);

        this.flush();

        var pos30 = this.__slider__P_315_0.getChildControl("knob").getContentElement().getStyle("left");

        this.__slider__P_315_0.focus();

        this.flush();

        var posFocus = this.__slider__P_315_0.getChildControl("knob").getContentElement().getStyle("left");

        this.assertNotEquals(pos0, posFocus);
        this.assertEquals(pos30, posFocus);
      },
      testInitOrientation: function testInitOrientation() {
        var newSlider1 = new qx.ui.form.Slider();
        this.assertIdentical(newSlider1.getOrientation(), "horizontal");
        var newSlider2 = new qx.ui.form.Slider("horizontal");
        this.assertIdentical(newSlider2.getOrientation(), "horizontal");
        var newSlider3 = new qx.ui.form.Slider("vertical");
        this.assertIdentical(newSlider3.getOrientation(), "vertical");
      },
      testSlideMethods: function testSlideMethods() {
        var min = this.__slider__P_315_0.getMinimum();

        var max = this.__slider__P_315_0.getMaximum();

        this.__slider__P_315_0.slideToBegin();

        this.assertIdentical(this.__slider__P_315_0.getValue(), min);

        this.__slider__P_315_0.slideToEnd();

        this.assertIdentical(this.__slider__P_315_0.getValue(), max);

        var singleStep = this.__slider__P_315_0.getSingleStep();

        var before = this.__slider__P_315_0.getValue();

        this.__slider__P_315_0.slideForward();

        this.assertIdentical(this.__slider__P_315_0.getValue(), Math.min(before + singleStep, max));
        before = this.__slider__P_315_0.getValue();

        this.__slider__P_315_0.slideBack();

        this.assertIdentical(this.__slider__P_315_0.getValue(), Math.max(before - singleStep, min));

        var pageStep = this.__slider__P_315_0.getPageStep();

        before = this.__slider__P_315_0.getValue();

        this.__slider__P_315_0.slidePageForward();

        this.assertIdentical(this.__slider__P_315_0.getValue(), Math.min(before + pageStep, max));
        before = this.__slider__P_315_0.getValue();

        this.__slider__P_315_0.slidePageBack();

        this.assertIdentical(this.__slider__P_315_0.getValue(), Math.max(before - pageStep, min));
      }
    }
  });
  qx.test.ui.form.Slider.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Slider.js.map?dt=1599546983837