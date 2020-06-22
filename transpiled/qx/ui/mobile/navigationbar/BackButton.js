(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.mobile.navigationbar.Button": {
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2004-2011 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Tino Butz (tbtz)
  
  ************************************************************************ */

  /**
   * A navigation bar back button widget.
   */
  qx.Class.define("qx.ui.mobile.navigationbar.BackButton", {
    extend: qx.ui.mobile.navigationbar.Button,

    /*
     *****************************************************************************
        PROPERTIES
     *****************************************************************************
     */
    properties: {
      // overridden
      defaultCssClass: {
        refine: true,
        init: "navigationbar-backbutton"
      }
    }
  });
  qx.ui.mobile.navigationbar.BackButton.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=BackButton.js.map?dt=1592867967385