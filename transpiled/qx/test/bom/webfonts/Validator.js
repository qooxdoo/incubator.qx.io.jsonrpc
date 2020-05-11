(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.test.bom.webfonts.Abstract": {
        "require": true
      },
      "qx.dev.unit.MRequirements": {
        "require": true
      },
      "qx.bom.webfonts.Validator": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2007-2011 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
  ************************************************************************ */
  qx.Class.define("qx.test.bom.webfonts.Validator", {
    extend: qx.test.bom.webfonts.Abstract,
    include: [qx.dev.unit.MRequirements],
    members: {
      setUp: function setUp() {
        this.__nodesBefore = document.body.childNodes.length;

        this.require(["webFontSupport"]);

        this.__val = new qx.bom.webfonts.Validator();
      },
      tearDown: function tearDown() {
        if (this.__val) {
          this.__val.dispose();

          delete this.__val;
        }

        qx.bom.webfonts.Validator.removeDefaultHelperElements();
        this.assertEquals(this.__nodesBefore, document.body.childNodes.length, "Validator did not clean up correctly!");
      },
      testValidFont: function testValidFont() {
        this.__val.setFontFamily("monospace, courier");

        this.__val.addListener("changeStatus", function (ev) {
          var result = ev.getData();
          this.resume(function (ev) {
            this.assertTrue(result.valid);
          }, this);
        }, this);

        var that = this;
        window.setTimeout(function () {
          that.__val.validate();
        }, 0);
        this.wait(1000);
      },
      testInvalidFont: function testInvalidFont() {
        this.__val.setFontFamily("zzzzzzzzzzzzzzz");

        this.__val.setTimeout(250);

        this.__val.addListener("changeStatus", function (ev) {
          var result = ev.getData();
          this.resume(function (ev) {
            this.assertFalse(result.valid);
          }, this);
        }, this);

        var that = this;
        window.setTimeout(function () {
          that.__val.validate();
        }, 0);
        this.wait(500);
      }
    }
  });
  qx.test.bom.webfonts.Validator.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Validator.js.map?dt=1589218255323