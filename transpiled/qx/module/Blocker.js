(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.module.Environment": {
        "require": true,
        "defer": "runtime"
      },
      "qx.module.Manipulating": {
        "require": true,
        "defer": "runtime"
      },
      "qx.module.Traversing": {
        "require": true,
        "defer": "runtime"
      },
      "qx.module.Css": {
        "require": true,
        "defer": "runtime"
      },
      "qx.module.Attribute": {
        "require": true,
        "defer": "runtime"
      },
      "qx.Bootstrap": {
        "usage": "dynamic",
        "require": true
      },
      "qxWeb": {
        "defer": "runtime"
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2012 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Daniel Wagner (danielwagner)
  
  ************************************************************************ */

  /**
   * Provides a way to block elements so they will no longer receive (native)
   * events by overlaying them with a DIV element.
   *
   * @require(qx.module.Environment)
   * @require(qx.module.Manipulating)
   * @require(qx.module.Traversing)
   * @require(qx.module.Css)
   * @require(qx.module.Attribute)
   */
  qx.Bootstrap.define("qx.module.Blocker", {
    statics: {
      /**
       * Attaches a blocker div to the given element.
       *
       * @param item {Element|Document} The element to be overlaid with the blocker
       * @param color {String} The color for the blocker element (any CSS color value)
       * @param opacity {Number} The CSS opacity value for the blocker
       * @param zIndex {Number} The zIndex value for the blocker
       */
      __attachBlocker__P_191_0: function __attachBlocker__P_191_0(item, color, opacity, zIndex) {
        var win = qxWeb.getWindow(item);
        var isDocument = qxWeb.isDocument(item);

        if (!isDocument && !qxWeb.isElement(item)) {
          return;
        }

        if (!item.__blocker__P_191_1) {
          item.__blocker__P_191_1 = {
            div: qxWeb.create("<div class='qx-blocker' />")
          };
        }

        if (isDocument) {
          item.__blocker__P_191_1.div.insertBefore(qxWeb(win.document.body).getChildren(':first'));
        } else {
          item.__blocker__P_191_1.div.appendTo(win.document.body);
        }

        qx.module.Blocker.__styleBlocker__P_191_2(item, color, opacity, zIndex, isDocument);
      },

      /**
       * Styles the blocker element(s)
       *
       * @param item {Element|Document} The element to be overlaid with the blocker
       * @param color {String} The color for the blocker element (any CSS color value)
       * @param opacity {Number} The CSS opacity value for the blocker
       * @param zIndex {Number} The zIndex value for the blocker
       * @param isDocument {Boolean} Whether the item is a document node
       */
      __styleBlocker__P_191_2: function __styleBlocker__P_191_2(item, color, opacity, zIndex, isDocument) {
        var qItem = qxWeb(item);
        var styles = {
          "display": "block"
        };
        styles.backgroundColor = typeof color !== 'undefined' ? color : null;
        styles.zIndex = typeof zIndex !== 'undefined' ? zIndex : null;

        if (qxWeb.env.get("browser.name") === "ie" && qxWeb.env.get("browser.version") <= 8) {
          styles.opacity = typeof opacity !== 'undefined' ? opacity : 0;
        } else {
          styles.opacity = typeof opacity !== 'undefined' ? opacity : null;
        }

        if (isDocument) {
          styles.top = "0px";
          styles.left = "0px";
          styles.position = "fixed";
          styles.width = "100%";
          styles.height = "100%";
        } else {
          var pos = qItem.getOffset();
          styles.top = pos.top + "px";
          styles.left = pos.left + "px";
          styles.position = "absolute";
          styles.width = qItem.getWidth() + "px";
          styles.height = qItem.getHeight() + "px";
        }

        item.__blocker__P_191_1.div.setStyles(styles);
      },

      /**
       * Removes the given item's blocker element(s) from the DOM
       *
       * @param item {Element} Blocked element
       * @param index {Number} index of the item in the collection
       */
      __detachBlocker__P_191_3: function __detachBlocker__P_191_3(item, index) {
        if (!item.__blocker__P_191_1) {
          return;
        }

        item.__blocker__P_191_1.div.remove();
      },

      /**
       * Returns the blocker elements as collection
       *
       * @param collection {qxWeb} Collection to get the blocker elements from
       * @return {qxWeb} collection of blocker elements
       */
      __getBlocker__P_191_4: function __getBlocker__P_191_4(collection) {
        var blockerElements = qxWeb();
        collection.forEach(function (item, index) {
          if (typeof item.__blocker__P_191_1 !== "undefined") {
            blockerElements = blockerElements.concat(item.__blocker__P_191_1.div);
          }
        });
        return blockerElements;
      }
    },
    members: {
      /**
       * Adds an overlay to all items in the collection that intercepts mouse
       * events.
       *
       * @attach {qxWeb}
       * @param color {String ? transparent} The color for the blocker element (any CSS color value)
       * @param opacity {Number ? 0} The CSS opacity value for the blocker (floating point number from 0 to 1)
       * @param zIndex {Number ? 10000} The zIndex value for the blocker
       * @return {qxWeb} The collection for chaining
       */
      block: function block(color, opacity, zIndex) {
        if (!this[0]) {
          return this;
        }

        this.forEach(function (item, index) {
          qx.module.Blocker.__attachBlocker__P_191_0(item, color, opacity, zIndex);
        });
        return this;
      },

      /**
       * Removes the blockers from all items in the collection
       *
       * @attach {qxWeb}
       * @return {qxWeb} The collection for chaining
       */
      unblock: function unblock() {
        if (!this[0]) {
          return this;
        }

        this.forEach(qx.module.Blocker.__detachBlocker__P_191_3);
        return this;
      },

      /**
       * Returns all blocker elements as collection.
       *
       * <strong>Note:</strong> This will only return elements if
       * the <code>block</code> method was called at least once,
       * since the blocker elements are created on-demand.
       *
       * @attach {qxWeb}
       * @return {qxWeb} collection with all blocker elements
       */
      getBlocker: function getBlocker() {
        if (!this[0]) {
          return this;
        }

        var collection = qx.module.Blocker.__getBlocker__P_191_4(this);

        return collection;
      }
    },
    defer: function defer(statics) {
      qxWeb.$attachAll(this);
    }
  });
  qx.module.Blocker.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Blocker.js.map?dt=1600461089613