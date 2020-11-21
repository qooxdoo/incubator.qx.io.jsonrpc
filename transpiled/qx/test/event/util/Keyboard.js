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
      "qx.event.util.Keyboard": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
   qooxdoo - the new era of web development
  
   http://qooxdoo.org
  
   Copyright:
   2007-20014 1&1 Internet AG, Germany, http://www.1und1.de
  
   License:
       MIT: https://opensource.org/licenses/MIT
   See the LICENSE file in the project's top-level directory for details.
  
   Authors:
   * Tobias Oberrauch <tobias.oberrauch@1und1.de>
  
   ************************************************************************
   */
  qx.Class.define("qx.test.event.util.Keyboard", {
    extend: qx.dev.unit.TestCase,
    members: {
      testCommaAsValidKeyIdentifier: function testCommaAsValidKeyIdentifier() {
        var isValidKeyIdentifier = qx.event.util.Keyboard.isValidKeyIdentifier(',');
        this.assertTrue(isValidKeyIdentifier);
      }
    }
  });
  qx.test.event.util.Keyboard.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Keyboard.js.map?dt=1605962026412