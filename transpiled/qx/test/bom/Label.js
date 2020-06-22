(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.core.Environment": {
        "defer": "load",
        "require": true
      },
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.dev.unit.TestCase": {
        "require": true
      },
      "qx.lang.Object": {},
      "qx.bom.client.Css": {},
      "qx.bom.client.Html": {},
      "qx.bom.client.OperatingSystem": {},
      "qx.bom.Label": {}
    },
    "environment": {
      "provided": [],
      "required": {
        "css.textoverflow": {
          "className": "qx.bom.client.Css"
        },
        "html.xul": {
          "className": "qx.bom.client.Html"
        },
        "os.name": {
          "className": "qx.bom.client.OperatingSystem"
        }
      }
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
  
     Authors:
       * Alexander Steitz (aback)
  
  ************************************************************************ */
  qx.Class.define("qx.test.bom.Label", {
    extend: qx.dev.unit.TestCase,
    members: {
      setUp: function setUp() {
        this.__boldStyle__P_210_0 = {
          fontWeight: "bold"
        };
        this.__italicStyle__P_210_1 = {
          fontStyle: "italic"
        };
        this.__boldItalicStyle__P_210_2 = {
          fontWeight: "bold",
          fontStyle: "italic"
        };
        this.__familyStyle__P_210_3 = {
          fontFamily: ["Verdana"]
        };
        this.__fontSizeStyle__P_210_4 = {
          fontSize: "20px"
        };
        this.__paddingStyle__P_210_5 = {
          padding: "10px"
        };
        this.__marginStyle__P_210_6 = {
          margin: "10px"
        };
        this.__allTogetherStyle__P_210_7 = {};
        qx.lang.Object.mergeWith(this.__allTogetherStyle__P_210_7, this.__boldStyle__P_210_0);
        qx.lang.Object.mergeWith(this.__allTogetherStyle__P_210_7, this.__italicStyle__P_210_1);
        qx.lang.Object.mergeWith(this.__allTogetherStyle__P_210_7, this.__boldItalicStyle__P_210_2);
        qx.lang.Object.mergeWith(this.__allTogetherStyle__P_210_7, this.__familyStyle__P_210_3);
        qx.lang.Object.mergeWith(this.__allTogetherStyle__P_210_7, this.__fontSizeStyle__P_210_4);
        qx.lang.Object.mergeWith(this.__allTogetherStyle__P_210_7, this.__paddingStyle__P_210_5);
        qx.lang.Object.mergeWith(this.__allTogetherStyle__P_210_7, this.__marginStyle__P_210_6);
      },
      tearDown: function tearDown() {
        this.__boldStyle__P_210_0 = null;
        this.__italicStyle__P_210_1 = null;
        this.__familyStyle__P_210_3 = null;
        this.__fontSizeStyle__P_210_4 = null;
        this.__paddingStyle__P_210_5 = null;
        this.__marginStyle__P_210_6 = null;
        this.__allTogetherStyle__P_210_7 = null;
      },
      // test only XUL labels under windows to get comparable results
      // to ensure the change of bug #5011 does not break anything
      testMeasureSizeTextNormal: function testMeasureSizeTextNormal() {
        if (!qx.core.Environment.get("css.textoverflow") && qx.core.Environment.get("html.xul") && qx.core.Environment.get("os.name") == "win") {
          var text = "vanillebaer";
          var size = null;
          size = qx.bom.Label.getTextSize(text);
          this.assertEquals(53, size.width);
          this.assertEquals(14, size.height);
          size = qx.bom.Label.getTextSize(text, this.__fontSizeStyle__P_210_4);
          this.assertEquals(94, size.width);
          this.assertEquals(24, size.height);
          size = qx.bom.Label.getTextSize(text, this.__familyStyle__P_210_3);
          this.assertEquals(64, size.width);
          this.assertEquals(13, size.height);
          size = qx.bom.Label.getTextSize(text, this.__paddingStyle__P_210_5);
          this.assertEquals(53, size.width);
          this.assertEquals(14, size.height);
          size = qx.bom.Label.getTextSize(text, this.__marginStyle__P_210_6);
          this.assertEquals(53, size.width);
          this.assertEquals(14, size.height);
          size = qx.bom.Label.getTextSize(text, this.__allTogetherStyle__P_210_7);
          this.assertEquals(125, size.width);
          this.assertEquals(25, size.height);
        } else {
          this.skip();
        }
      },
      testMeasureSizeTextBold: function testMeasureSizeTextBold() {
        if (!qx.core.Environment.get("css.textoverflow") && qx.core.Environment.get("html.xul") && qx.core.Environment.get("os.name") == "win") {
          var text = "vanillebaer";
          var size = null;
          size = qx.bom.Label.getTextSize(text, this.__boldStyle__P_210_0);
          this.assertEquals(61, size.width);
          this.assertEquals(14, size.height);
        } else {
          this.assertTrue(true);
        }
      },
      testMeasureSizeTextItalic: function testMeasureSizeTextItalic() {
        if (!qx.core.Environment.get("css.textoverflow") && qx.core.Environment.get("html.xul") && qx.core.Environment.get("os.name") == "win") {
          var text = "vanillebaer";
          var size = null;
          size = qx.bom.Label.getTextSize(text, this.__italicStyle__P_210_1);
          this.assertEquals(56, size.width);
          this.assertEquals(14, size.height);
        } else {
          this.assertTrue(true);
        }
      },
      testMeasureSizeTextBoldItalic: function testMeasureSizeTextBoldItalic() {
        if (!qx.core.Environment.get("css.textoverflow") && qx.core.Environment.get("html.xul") && qx.core.Environment.get("os.name") == "win") {
          var text = "vanillebaer";
          var size = null;
          size = qx.bom.Label.getTextSize(text, this.__boldItalicStyle__P_210_2);
          this.assertEquals(64, size.width);
          this.assertEquals(13, size.height);
        } else {
          this.assertTrue(true);
        }
      },
      testMeasureSizeTextFontSize: function testMeasureSizeTextFontSize() {
        if (!qx.core.Environment.get("css.textoverflow") && qx.core.Environment.get("html.xul") && qx.core.Environment.get("os.name") == "win") {
          var text = "vanillebaer";
          var size = null;
          size = qx.bom.Label.getTextSize(text, this.__fontSize__P_210_8);
          this.assertEquals(53, size.width);
          this.assertEquals(14, size.height);
        } else {
          this.assertTrue(true);
        }
      },
      testMeasureSizeTextFontFamily: function testMeasureSizeTextFontFamily() {
        if (!qx.core.Environment.get("css.textoverflow") && qx.core.Environment.get("html.xul") && qx.core.Environment.get("os.name") == "win") {
          var text = "vanillebaer";
          var size = null;
          size = qx.bom.Label.getTextSize(text, this.__familyStyle__P_210_3);
          this.assertEquals(64, size.width);
          this.assertEquals(13, size.height);
        } else {
          this.assertTrue(true);
        }
      },
      testMeasureSizeTextPadding: function testMeasureSizeTextPadding() {
        if (!qx.core.Environment.get("css.textoverflow") && qx.core.Environment.get("html.xul") && qx.core.Environment.get("os.name") == "win") {
          var text = "vanillebaer";
          var size = null;
          size = qx.bom.Label.getTextSize(text, this.__paddingStyle__P_210_5);
          this.assertEquals(53, size.width);
          this.assertEquals(14, size.height);
        } else {
          this.assertTrue(true);
        }
      },
      testMeasureSizeTextMargin: function testMeasureSizeTextMargin() {
        if (!qx.core.Environment.get("css.textoverflow") && qx.core.Environment.get("html.xul") && qx.core.Environment.get("os.name") == "win") {
          var text = "vanillebaer";
          var size = null;
          size = qx.bom.Label.getTextSize(text, this.__marginStyle__P_210_6);
          this.assertEquals(53, size.width);
          this.assertEquals(14, size.height);
        } else {
          this.assertTrue(true);
        }
      },
      testMeasureSizeTextAllTogether: function testMeasureSizeTextAllTogether() {
        if (!qx.core.Environment.get("css.textoverflow") && qx.core.Environment.get("html.xul") && qx.core.Environment.get("os.name") == "win") {
          var text = "vanillebaer";
          var size = null;
          size = qx.bom.Label.getTextSize(text, this.__allTogetherStyle__P_210_7);
          this.assertEquals(125, size.width);
          this.assertEquals(25, size.height);
        } else {
          this.assertTrue(true);
        }
      },
      testSanitizer: function testSanitizer() {
        var element = document.createElement("div");
        element.useHtml = true; // function to sanitize string

        qx.bom.Label.setSanitizer(function (html) {
          if (html.indexOf("<script") > -1) {
            return '';
          }

          return html;
        }); // test clean string

        var value = "foo<b></b>";
        qx.bom.Label.setValue(element, value);
        this.assertEquals(qx.bom.Label.getValue(element).toLowerCase(), value); // test dirty string

        value = "foo<script></script>";
        qx.bom.Label.setValue(element, value);
        this.assertEquals(qx.bom.Label.getValue(element), ''); // reset function to sanitize string

        qx.bom.Label.setSanitizer(null);
      }
    }
  });
  qx.test.bom.Label.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Label.js.map?dt=1592866012493