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
      "qx.theme.manager.Font": {},
      "qx.test.Theme": {},
      "qx.Theme": {},
      "qx.theme.modern.Font": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2010 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Alexander Steitz (aback)
  
  ************************************************************************ */
  qx.Class.define("qx.test.theme.manager.Font", {
    extend: qx.dev.unit.TestCase,
    members: {
      setUp: function setUp() {
        this.manager = qx.theme.manager.Font.getInstance();
        this.__formerTheme__P_270_0 = this.manager.getTheme();
      },
      tearDown: function tearDown() {
        qx.test.Theme.themes = null;
        this.manager.setTheme(this.__formerTheme__P_270_0);
        this.__formerTheme__P_270_0 = null;
      },
      testInclude: function testInclude() {
        qx.Theme.define("qx.test.Theme.themes.A", {
          extend: qx.theme.modern.Font,
          fonts: {
            "myfont": {
              include: "default",
              bold: true
            },
            "mysecondfont": {
              include: "myfont",
              italic: true
            }
          }
        });
        this.manager.setTheme(qx.test.Theme.themes.A);
        var fontTheme = this.manager.getTheme();
        this.assertKeyInMap("size", fontTheme.fonts.myfont, "Including font theme failed");
        this.assertKeyInMap("lineHeight", fontTheme.fonts.myfont, "Including font theme failed");
        this.assertKeyInMap("family", fontTheme.fonts.myfont, "Including font theme failed");
        this.assertKeyInMap("bold", fontTheme.fonts.myfont, "Including font theme failed");
        this.assertKeyInMap("size", fontTheme.fonts.mysecondfont, "Including font theme failed");
        this.assertKeyInMap("lineHeight", fontTheme.fonts.mysecondfont, "Including font theme failed");
        this.assertKeyInMap("family", fontTheme.fonts.mysecondfont, "Including font theme failed");
        this.assertKeyInMap("bold", fontTheme.fonts.mysecondfont, "Including font theme failed");
        this.assertKeyInMap("italic", fontTheme.fonts.mysecondfont, "Including font theme failed");
      }
    }
  });
  qx.test.theme.manager.Font.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Font.js.map?dt=1599462398199