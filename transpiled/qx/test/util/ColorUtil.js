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
      "qx.util.ColorUtil": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2007-2009 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Jonathan Weiß (jonathan_rass)
       * Christian Hagendorn (cs)
  
  ************************************************************************ */
  qx.Class.define("qx.test.util.ColorUtil", {
    extend: qx.dev.unit.TestCase,
    members: {
      testRgbToRgbString: function testRgbToRgbString() {
        this.assertEquals("rgba(255,0,0,1)", qx.util.ColorUtil.rgbToRgbString([255, 0, 0, 1]));
        this.assertEquals("rgba(255,0,0,0.5)", qx.util.ColorUtil.rgbToRgbString([255, 0, 0, 0.5]));
        this.assertEquals("rgba(255,0,0,0)", qx.util.ColorUtil.rgbToRgbString([255, 0, 0, 0]));
        this.assertEquals("rgb(255,0,0)", qx.util.ColorUtil.rgbToRgbString([255, 0, 0]));
      },
      testCssStringToRgb: function testCssStringToRgb() {
        this.assertEquals("255,0,0", qx.util.ColorUtil.cssStringToRgb("rgba(255,0,0,1)"));
        this.assertEquals("201,23,120", qx.util.ColorUtil.cssStringToRgb("rgba(201,23,120,0.3)"));
        this.assertEquals("255,0,0", qx.util.ColorUtil.cssStringToRgb("rgb(255,0,0)"));
        this.assertEquals("201,23,120", qx.util.ColorUtil.cssStringToRgb("rgb(201,23,120)"));
      },
      testHex3StringToHex6String: function testHex3StringToHex6String() {
        this.assertEquals("#FFFFFF", qx.util.ColorUtil.hex3StringToHex6String("#fff"));
        this.assertEquals("#ffffff", qx.util.ColorUtil.hex3StringToHex6String("#ffffff"));
      },
      testRgbToHexString: function testRgbToHexString() {
        this.assertEquals("#FFFFFF", qx.util.ColorUtil.rgbToHexString([255, 255, 255]));
        this.assertEquals("#000000", qx.util.ColorUtil.rgbToHexString([0, 0, 0]));
      },
      testStringToRgbString: function testStringToRgbString() {
        this.assertEquals("rgb(0,0,0)", qx.util.ColorUtil.stringToRgbString("rgba(0,0,0,0.5)"));
        this.assertEquals("rgb(-1,-1,-1)", qx.util.ColorUtil.stringToRgbString("rgba(0,0,0,0)"));
      }
    }
  });
  qx.test.util.ColorUtil.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=ColorUtil.js.map?dt=1588623989091