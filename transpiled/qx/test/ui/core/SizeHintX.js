(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.test.ui.core.SizeHint": {
        "require": true
      }
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
  qx.Class.define("qx.test.ui.core.SizeHintX", {
    extend: qx.test.ui.core.SizeHint,
    members: {
      assertHint: function assertHint(min, size, max) {
        var hint = this.getHint();
        this.assertEquals(min, hint.minWidth, "min width");
        this.assertEquals(size, hint.width, "width");
        this.assertEquals(max, hint.maxWidth, "max width");
      },
      getDefaultSize: function getDefaultSize() {
        return 100;
      },
      setSize: function setSize(min, size, max) {
        this.widget.set({
          minWidth: min,
          width: size,
          maxWidth: max
        });
      },
      setStretching: function setStretching(allowShrink, allowGrow) {
        this.widget.setAllowStretchX(allowGrow, allowShrink);
      }
    }
  });
  qx.test.ui.core.SizeHintX.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=SizeHintX.js.map?dt=1592520328925