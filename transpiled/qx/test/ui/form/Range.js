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
      "qx.ui.form.Spinner": {},
      "qx.ui.form.Slider": {}
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
  qx.Class.define("qx.test.ui.form.Range", {
    extend: qx.test.ui.LayoutTestCase,
    members: {
      __test__P_313_0: function __test__P_313_0(widget) {
        // min
        widget.setMinimum(10);
        this.assertEquals(10, widget.getMinimum(), "Set or get does not work. (min)");
        var self = this;
        this.assertEventFired(widget, "changeMinimum", function () {
          widget.setMinimum(11);
        }, function (e) {
          self.assertEquals(11, e.getData(), "Not the right number in the event.");
          self.assertEquals(10, e.getOldData(), "Wrong old data in the event.");
        }, "Event is wrong!"); // max

        widget.setMaximum(20);
        this.assertEquals(20, widget.getMaximum(), "Set or get does not work. (max)");
        var self = this;
        this.assertEventFired(widget, "changeMaximum", function () {
          widget.setMaximum(21);
        }, function (e) {
          self.assertEquals(21, e.getData(), "Not the right number in the event.");
          self.assertEquals(20, e.getOldData(), "Wrong old data in the event.");
        }, "Event is wrong!"); // singleStep

        widget.setSingleStep(2);
        this.assertEquals(2, widget.getSingleStep(), "Set or get does not work. (singleStep)"); // pageStep

        widget.setPageStep(11);
        this.assertEquals(11, widget.getPageStep(), "Set or get does not work. (pageStep)"); // get rid of the widget

        widget.destroy();
      },
      testSpinner: function testSpinner() {
        this.__test__P_313_0(new qx.ui.form.Spinner());
      },
      testSlider: function testSlider() {
        this.__test__P_313_0(new qx.ui.form.Slider());
      }
    }
  });
  qx.test.ui.form.Range.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Range.js.map?dt=1599578768659