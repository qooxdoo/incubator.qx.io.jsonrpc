(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.table.cellrenderer.AbstractImage": {
        "construct": true,
        "require": true
      },
      "qx.util.AliasManager": {
        "construct": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2007 by Tartan Solutions, Inc, http://www.tartansolutions.com
  
     License:
       MIT: https://opensource.org/licenses/MIT
  
     Authors:
       * Dan Hummon
  
  ************************************************************************ */

  /**
   * The image cell renderer renders image into table cells.
   */
  qx.Class.define("qx.ui.table.cellrenderer.Image", {
    extend: qx.ui.table.cellrenderer.AbstractImage,

    /*
    *****************************************************************************
       CONSTRUCTOR
    *****************************************************************************
    */

    /**
     * @param height {Integer?16} The height of the image. The default is 16.
     * @param width {Integer?16} The width of the image. The default is 16.
     */
    construct: function construct(width, height) {
      qx.ui.table.cellrenderer.AbstractImage.constructor.call(this);

      if (width) {
        this.__imageWidth__P_510_0 = width;
      }

      if (height) {
        this.__imageHeight__P_510_1 = height;
      }

      this.__am__P_510_2 = qx.util.AliasManager.getInstance();
    },

    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */
    members: {
      __am__P_510_2: null,
      __imageHeight__P_510_1: 16,
      __imageWidth__P_510_0: 16,
      // overridden
      _identifyImage: function _identifyImage(cellInfo) {
        var imageHints = {
          imageWidth: this.__imageWidth__P_510_0,
          imageHeight: this.__imageHeight__P_510_1
        };

        if (cellInfo.value == "") {
          imageHints.url = null;
        } else {
          imageHints.url = this.__am__P_510_2.resolve(cellInfo.value);
        }

        imageHints.tooltip = cellInfo.tooltip;
        return imageHints;
      }
    },

    /*
    *****************************************************************************
       DESTRUCTOR
    *****************************************************************************
    */
    destruct: function destruct() {
      this.__am__P_510_2 = null;
    }
  });
  qx.ui.table.cellrenderer.Image.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Image.js.map?dt=1608415679059