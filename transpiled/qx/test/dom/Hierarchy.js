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
      "qx.dom.Element": {},
      "qx.bom.element.Style": {},
      "qx.dom.Hierarchy": {},
      "qx.bom.Iframe": {},
      "qx.util.ResourceManager": {},
      "qx.util.Uri": {},
      "qx.event.Registration": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2007-2010 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Alexander Steitz (aback)
  
  ************************************************************************ */
  qx.Class.define("qx.test.dom.Hierarchy", {
    extend: qx.dev.unit.TestCase,
    members: {
      setUp: function setUp() {
        this.__renderedElement__P_246_0 = qx.dom.Element.create("div");
        document.body.appendChild(this.__renderedElement__P_246_0);
        this.__unRenderedElement__P_246_1 = qx.dom.Element.create("div");
        this.__notDisplayedElement__P_246_2 = qx.dom.Element.create("div");
        document.body.appendChild(this.__notDisplayedElement__P_246_2);
        qx.bom.element.Style.set(this.__notDisplayedElement__P_246_2, "display", "none");
        this.__childOfNotDisplayedElement__P_246_3 = qx.dom.Element.create("div");

        this.__notDisplayedElement__P_246_2.appendChild(this.__childOfNotDisplayedElement__P_246_3);
      },
      tearDown: function tearDown() {
        if (this.__childElement__P_246_4) {
          this.__renderedElement__P_246_0.removeChild(this.__childElement__P_246_4);

          this.__childElement__P_246_4 = null;
        }

        if (this.__siblingElement__P_246_5) {
          document.body.removeChild(this.__siblingElement__P_246_5);
          this.__siblingElement__P_246_5 = null;
        }

        document.body.removeChild(this.__renderedElement__P_246_0);
        this.__renderedElement__P_246_0 = null;
        this.__unRenderedElement__P_246_1 = null;
        document.body.removeChild(this.__notDisplayedElement__P_246_2);
        this.__notDisplayedElement__P_246_2 = null;

        if (this.__iframe__P_246_6) {
          document.body.removeChild(this.__iframe__P_246_6);
          this.__iframe__P_246_6 = null;
        }
      },
      testIsRendered: function testIsRendered() {
        this.assertTrue(qx.dom.Hierarchy.isRendered(this.__renderedElement__P_246_0));
        this.assertFalse(qx.dom.Hierarchy.isRendered(this.__unRenderedElement__P_246_1));
        this.assertTrue(qx.dom.Hierarchy.isRendered(this.__notDisplayedElement__P_246_2));
        this.assertTrue(qx.dom.Hierarchy.isRendered(this.__childOfNotDisplayedElement__P_246_3));
      },
      testIsRenderedIframe: function testIsRenderedIframe() {
        this.__iframe__P_246_6 = qx.bom.Iframe.create();
        var src = qx.util.ResourceManager.getInstance().toUri("qx/static/blank.html");
        src = qx.util.Uri.getAbsolute(src);
        qx.bom.Iframe.setSource(this.__iframe__P_246_6, src);
        document.body.appendChild(this.__iframe__P_246_6);
        qx.event.Registration.addListener(this.__iframe__P_246_6, "load", function (e) {
          this.resume(function () {
            this.assertTrue(qx.dom.Hierarchy.isRendered(this.__iframe__P_246_6));
          }, this);
        }, this);
        this.wait(10000);
      },
      testContains: function testContains() {
        this.assertTrue(qx.dom.Hierarchy.contains(document.body, this.__renderedElement__P_246_0));
        this.__childElement__P_246_4 = qx.dom.Element.create("div");

        this.__renderedElement__P_246_0.appendChild(this.__childElement__P_246_4);

        this.assertTrue(qx.dom.Hierarchy.contains(this.__renderedElement__P_246_0, this.__childElement__P_246_4));
        this.assertFalse(qx.dom.Hierarchy.contains(this.__childElement__P_246_4, this.__renderedElement__P_246_0));
        this.__siblingElement__P_246_5 = qx.dom.Element.create("div");
        document.body.appendChild(this.__siblingElement__P_246_5);
        this.assertFalse(qx.dom.Hierarchy.contains(this.__renderedElement__P_246_0, this.__siblingElement__P_246_5));
      },
      testGetCommonParent: function testGetCommonParent() {
        this.__siblingElement__P_246_5 = qx.dom.Element.create("div");
        document.body.appendChild(this.__siblingElement__P_246_5);
        this.assertEquals(document.body, qx.dom.Hierarchy.getCommonParent(this.__renderedElement__P_246_0, this.__siblingElement__P_246_5));
        this.__childElement__P_246_4 = qx.dom.Element.create("div");

        this.__renderedElement__P_246_0.appendChild(this.__childElement__P_246_4);

        this.assertEquals(this.__renderedElement__P_246_0, qx.dom.Hierarchy.getCommonParent(this.__renderedElement__P_246_0, this.__childElement__P_246_4));
      }
    }
  });
  qx.test.dom.Hierarchy.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Hierarchy.js.map?dt=1599905729555