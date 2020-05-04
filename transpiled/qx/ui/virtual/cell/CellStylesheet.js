(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.core.Environment": {
        "defer": "load",
        "construct": true,
        "require": true
      },
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.core.Object": {
        "construct": true,
        "require": true
      },
      "qx.bom.element.Style": {
        "construct": true
      },
      "qx.bom.client.Css": {
        "construct": true
      },
      "qx.bom.element.BoxSizing": {
        "construct": true
      },
      "qx.bom.Stylesheet": {
        "construct": true
      }
    },
    "environment": {
      "provided": [],
      "required": {
        "css.boxsizing": {
          "construct": true,
          "className": "qx.bom.client.Css"
        }
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2006 STZ-IDA, Germany, http://www.stz-ida.de
       2004-2009 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Fabian Jakobs (fjakobs)
  
  ************************************************************************ */

  /**
   * Singleton wrapper for the stylesheet containing the CSS rules for HTML cells.
   *
   */
  qx.Class.define("qx.ui.virtual.cell.CellStylesheet", {
    extend: qx.core.Object,
    type: "singleton",
    construct: function construct() {
      qx.core.Object.constructor.call(this);
      var stylesheet = ".qx-cell {" + qx.bom.element.Style.compile({
        position: "absolute",
        overflow: "hidden",
        cursor: "default",
        textOverflow: "ellipsis",
        userSelect: "none"
      }) + "} ";

      if (qx.core.Environment.get("css.boxsizing")) {
        stylesheet += ".qx-cell {" + qx.bom.element.BoxSizing.compile("content-box") + "}";
      }

      this.__stylesheet = qx.bom.Stylesheet.createElement(stylesheet);
      this.__classes = {};
      this.__styles = {};
    },
    members: {
      __stylesheet: null,
      __classes: null,
      __styles: null,

      /**
       * Get the DOM stylesheet element
       *
       * @return {StyleSheet} The DOM stylesheet element
       */
      getStylesheet: function getStylesheet() {
        return this.__stylesheet;
      },

      /**
       * Get the CSS class stored under the given key
       *
       * @param key {String} The key under which the class name is stored
       * @return {String|null} The CSS class stored under the given key or
       *   <code>null</code>.
       */
      getCssClass: function getCssClass(key) {
        return this.__classes[key] || null;
      },

      /**
       * Dynamically create a CSS rule for the given style string. The selector is
       * an unique class name, which is returned. The class is stored under the
       * given key name and can be queried using {@link #getCssClass}.
       *
       * @param key {String} The key under which the class name should be stored
       * @param styleString {String} A compiled string of CSS rules.
       * @return {String} The CSS class name.
       */
      computeClassForStyles: function computeClassForStyles(key, styleString) {
        var cssClass = this.__styles[styleString];

        if (!cssClass) {
          // generate stylesheet rule
          var cssClass = this.__getNextClassname();

          qx.bom.Stylesheet.addRule(this.__stylesheet, "." + cssClass, styleString);
          this.__styles[styleString] = cssClass;
        }

        this.__classes[key] = cssClass;
        return cssClass;
      },

      /**
       * Get the next unique CSS class name
       *
       * @return {String} The next unique CSS class name
       */
      __getNextClassname: function __getNextClassname() {
        return "qx-cell-" + this.toHashCode() + "-" + this.__classCounter++;
      },
      __classCounter: 0
    },
    destruct: function destruct() {
      this.__stylesheet = this.__classes = this.__styles = null;
    }
  });
  qx.ui.virtual.cell.CellStylesheet.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=CellStylesheet.js.map?dt=1588615823680