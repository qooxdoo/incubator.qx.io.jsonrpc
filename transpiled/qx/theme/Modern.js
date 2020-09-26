(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Theme": {
        "usage": "dynamic",
        "require": true
      },
      "qx.theme.modern.Color": {
        "require": true
      },
      "qx.theme.modern.Decoration": {
        "require": true
      },
      "qx.theme.modern.Font": {
        "require": true
      },
      "qx.theme.modern.Appearance": {
        "require": true
      },
      "qx.theme.icon.Tango": {
        "require": true
      }
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
       * Sebastian Werner (wpbasti)
       * Fabian Jakobs (fjakobs)
  
  ************************************************************************ */

  /**
   * Contemporary Theme
   */
  qx.Theme.define("qx.theme.Modern", {
    title: "Modern",
    meta: {
      color: qx.theme.modern.Color,
      decoration: qx.theme.modern.Decoration,
      font: qx.theme.modern.Font,
      appearance: qx.theme.modern.Appearance,
      icon: qx.theme.icon.Tango
    }
  });
  qx.theme.Modern.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Modern.js.map?dt=1601118697376