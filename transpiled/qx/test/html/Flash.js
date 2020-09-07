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
      "qx.html.Flash": {}
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
       * Christian Hagendorn (chris_schmidt)
  
  ************************************************************************ */

  /* ************************************************************************
  
  
  ************************************************************************ */

  /**
   *
   * @asset(qx/test/UnitTestFlash.swf)
   */
  qx.Class.define("qx.test.html.Flash", {
    extend: qx.dev.unit.TestCase,
    members: {
      __flash__P_250_0: null,
      setUp: function setUp() {
        this.__flash__P_250_0 = new qx.html.Flash();
      },
      tearDown: function tearDown() {
        this.__flash__P_250_0.dispose();

        this.__flash__P_250_0 = null;
      },
      testSetSource: function testSetSource(value) {
        this.__flash__P_250_0.setSource("movieURL");

        this.assertIdentical("movieURL", this.__flash__P_250_0.getAttributes().movie);
      },
      testSetId: function testSetId(value) {
        this.__flash__P_250_0.setId("flashID");

        this.assertIdentical("flashID", this.__flash__P_250_0.getAttributes().id);
      },
      testSetVariables: function testSetVariables(value) {
        var map = {
          a: "valueA",
          b: "valueB"
        };

        this.__flash__P_250_0.setVariables(map);

        this.assertIdentical(map, this.__flash__P_250_0.getVariables());
      },
      testSetAttribute: function testSetAttribute(key, value) {
        this.__flash__P_250_0.setAttribute("attrib1", "hoho");

        this.__flash__P_250_0.setAttribute("attrib2", "gogo");

        this.__flash__P_250_0.setAttribute("attrib3", true);

        this.__flash__P_250_0.setAttribute("attrib4", false);

        var map = this.__flash__P_250_0.getAttribute();

        this.assertIdentical("hoho", this.__flash__P_250_0.getAttributes().attrib1);
        this.assertIdentical("gogo", this.__flash__P_250_0.getAttributes().attrib2);
        this.assertTrue(this.__flash__P_250_0.getAttributes().attrib3);
        this.assertFalse(this.__flash__P_250_0.getAttributes().attrib4);

        this.__flash__P_250_0.setAttribute("attrib1");

        this.__flash__P_250_0.setAttribute("attrib3");

        this.assertUndefined(this.__flash__P_250_0.getAttributes().attrib1);
        this.assertIdentical("gogo", this.__flash__P_250_0.getAttributes().attrib2);
        this.assertUndefined(this.__flash__P_250_0.getAttributes().attrib3);
        this.assertFalse(this.__flash__P_250_0.getAttributes().attrib4);

        this.__flash__P_250_0.setAttribute("attrib2", null);

        this.__flash__P_250_0.setAttribute("attrib4", null);

        this.assertUndefined(this.__flash__P_250_0.getAttributes().attrib1);
        this.assertUndefined(this.__flash__P_250_0.getAttributes().attrib2);
        this.assertUndefined(this.__flash__P_250_0.getAttributes().attrib3);
        this.assertUndefined(this.__flash__P_250_0.getAttributes().attrib4);
      },
      testSetParam: function testSetParam(key, value) {
        this.__flash__P_250_0.setParam("param1", "hoho");

        this.__flash__P_250_0.setParam("param2", "gogo");

        this.__flash__P_250_0.setParam("param3", true);

        this.__flash__P_250_0.setParam("param4", false);

        var map = this.__flash__P_250_0.getParams();

        this.assertIdentical("hoho", this.__flash__P_250_0.getParams().param1);
        this.assertIdentical("gogo", this.__flash__P_250_0.getParams().param2);
        this.assertTrue(this.__flash__P_250_0.getParams().param3);
        this.assertFalse(this.__flash__P_250_0.getParams().param4);

        this.__flash__P_250_0.setParam("param1");

        this.__flash__P_250_0.setParam("param3");

        this.assertUndefined(this.__flash__P_250_0.getParams().param1);
        this.assertIdentical("gogo", this.__flash__P_250_0.getParams().param2);
        this.assertUndefined(this.__flash__P_250_0.getParams().param3);
        this.assertFalse(this.__flash__P_250_0.getParams().param4);

        this.__flash__P_250_0.setParam("param2", null);

        this.__flash__P_250_0.setParam("param4", null);

        this.assertUndefined(this.__flash__P_250_0.getParams().param1);
        this.assertUndefined(this.__flash__P_250_0.getParams().param2);
        this.assertUndefined(this.__flash__P_250_0.getParams().param3);
        this.assertUndefined(this.__flash__P_250_0.getParams().param4);
      }
    }
  });
  qx.test.html.Flash.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Flash.js.map?dt=1599462395986