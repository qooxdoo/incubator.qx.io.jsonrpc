(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Theme": {
        "usage": "dynamic",
        "require": true
      },
      "qx.theme.tangible.ColorEngine": {
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
    Tangible Light Theme for Qooxdoo
  
    Copyright:
       2018 IT'IS Foundation
       2020 Tobi Oetiker
  
    License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
    Authors:
      * Tobias Oetiker (oetiker)
  
    Origin:
      This theme is inspired by ideas from Material design.
  ************************************************************************ */

  /**
   * Simple color theme
   */
  qx.Theme.define("qx.theme.tangible.ColorLight", {
    extend: qx.theme.tangible.ColorEngine,
    colors: {
      // theme colors
      "primary": "#6200ee",
      "secondary": "#018786",
      "surface": "#ffffff",
      "error": "#b00020"
    }
  });
  qx.theme.tangible.ColorLight.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=ColorLight.js.map?dt=1606149390861