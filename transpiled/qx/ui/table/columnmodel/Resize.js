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
      "qx.ui.table.columnmodel.Basic": {
        "construct": true,
        "require": true
      },
      "qx.locale.MTranslation": {
        "require": true
      },
      "qx.ui.table.columnmodel.resizebehavior.Default": {},
      "qx.event.Timer": {}
    },
    "environment": {
      "provided": [],
      "required": {
        "qx.tableResizeDebug": {}
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2007 Derrell Lipman
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Derrell Lipman (derrell)
  
  ************************************************************************ */

  /**
   * A table column model that automatically resizes columns based on a
   * selected behavior.
   *
   * @see qx.ui.table.columnmodel.Basic
   */
  qx.Class.define("qx.ui.table.columnmodel.Resize", {
    extend: qx.ui.table.columnmodel.Basic,
    include: qx.locale.MTranslation,

    /*
    *****************************************************************************
       CONSTRUCTOR
    *****************************************************************************
    */
    construct: function construct() {
      qx.ui.table.columnmodel.Basic.constructor.call(this); // We don't want to recursively call ourself based on our resetting of
      // column sizes.  Track when we're resizing.

      this.__bInProgress__P_513_0 = false; // Track when the table has appeared.  We want to ignore resize events
      // until then since we won't be able to determine the available width
      // anyway.

      this.__bAppeared__P_513_1 = false;
    },

    /*
    *****************************************************************************
       PROPERTIES
    *****************************************************************************
    */
    properties: {
      /**
       * The behavior to use.
       *
       * The provided behavior must extend {@link qx.ui.table.columnmodel.resizebehavior.Abstract} and
       * implement the <i>onAppear</i>, <i>onTableWidthChanged</i>,
       * <i>onColumnWidthChanged</i> and <i>onVisibilityChanged</i>methods.
       */
      behavior: {
        check: "qx.ui.table.columnmodel.resizebehavior.Abstract",
        init: null,
        nullable: true,
        apply: "_applyBehavior",
        event: "changeBehavior"
      }
    },

    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */
    members: {
      __bAppeared__P_513_1: null,
      __bInProgress__P_513_0: null,
      __table__P_513_2: null,
      // Behavior modifier
      _applyBehavior: function _applyBehavior(value, old) {
        if (old != null) {
          old.dispose();
          old = null;
        } // Tell the new behavior how many columns there are


        value._setNumColumns(this.getOverallColumnCount());

        value.setTableColumnModel(this);
      },

      /**
       * Initializes the column model.
       *
       * @param numColumns {Integer} the number of columns the model should have.
       * @param table {qx.ui.table.Table}
       *   The table which this model is used for. This allows us access to
       *   other aspects of the table, as the <i>behavior</i> sees fit.
       */
      init: function init(numColumns, table) {
        // Call our superclass
        qx.ui.table.columnmodel.Resize.prototype.init.base.call(this, numColumns, table);

        if (this.__table__P_513_2 == null) {
          this.__table__P_513_2 = table; // We'll do our column resizing when the table appears, ...

          table.addListener("appear", this._onappear, this); // ... when the inner width of the table changes, ...

          table.addListener("tableWidthChanged", this._onTableWidthChanged, this); // ... when a vertical scroll bar appears or disappears

          table.addListener("verticalScrollBarChanged", this._onverticalscrollbarchanged, this); // We want to manipulate the button visibility menu

          table.addListener("columnVisibilityMenuCreateEnd", this._addResetColumnWidthButton, this); // ... when columns are resized, ...

          this.addListener("widthChanged", this._oncolumnwidthchanged, this); // ... and when a column visibility changes.

          this.addListener("visibilityChanged", this._onvisibilitychanged, this);
        } // Set the initial resize behavior


        if (this.getBehavior() == null) {
          this.setBehavior(new qx.ui.table.columnmodel.resizebehavior.Default());
        } // Tell the behavior how many columns there are


        this.getBehavior()._setNumColumns(numColumns);
      },

      /**
       * Get the table widget
       *
       * @return {qx.ui.table.Table} the table widget
       */
      getTable: function getTable() {
        return this.__table__P_513_2;
      },

      /**
       * Reset the column widths to their "onappear" defaults.
       *
       * @param event {qx.event.type.Data}
       *   The "columnVisibilityMenuCreateEnd" event indicating that the menu is
       *   being generated.  The data is a map containing properties <i>table</i>
       *   and <i>menu</i>.
       *
       */
      _addResetColumnWidthButton: function _addResetColumnWidthButton(event) {
        var data = event.getData();
        var columnButton = data.columnButton;
        var menu = data.menu;
        var o; // Add a separator between the column names and our reset button

        o = columnButton.factory("separator");
        menu.add(o); // Add a button to reset the column widths

        o = columnButton.factory("user-button", {
          text: this.tr("Reset column widths")
        });
        menu.add(o);
        o.addListener("execute", this._onappear, this);
      },

      /**
       * Event handler for the "appear" event.
       *
       * @param event {qx.event.type.Event}
       *   The "onappear" event object.
       *
       */
      _onappear: function _onappear(event) {
        // Is this a recursive call?
        if (this.__bInProgress__P_513_0) {
          // Yup.  Ignore it.
          return;
        }

        this.__bInProgress__P_513_0 = true;
        {
          if (qx.core.Environment.get("qx.tableResizeDebug")) {
            this.debug("onappear");
          }
        } // this handler is also called by the "execute" event of the menu button

        this.getBehavior().onAppear(event, event.getType() !== "appear");

        this.__table__P_513_2._updateScrollerWidths();

        this.__table__P_513_2._updateScrollBarVisibility();

        this.__bInProgress__P_513_0 = false;
        this.__bAppeared__P_513_1 = true;
      },

      /**
       * Event handler for the "tableWidthChanged" event.
       *
       * @param event {qx.event.type.Event}
       *   The "onwindowresize" event object.
       *
       */
      _onTableWidthChanged: function _onTableWidthChanged(event) {
        // Is this a recursive call or has the table not yet been rendered?
        if (this.__bInProgress__P_513_0 || !this.__bAppeared__P_513_1) {
          // Yup.  Ignore it.
          return;
        }

        this.__bInProgress__P_513_0 = true;
        {
          if (qx.core.Environment.get("qx.tableResizeDebug")) {
            this.debug("ontablewidthchanged");
          }
        }
        this.getBehavior().onTableWidthChanged(event);
        this.__bInProgress__P_513_0 = false;
      },

      /**
       * Event handler for the "verticalScrollBarChanged" event.
       *
       * @param event {qx.event.type.Data}
       *   The "verticalScrollBarChanged" event object.  The data is a boolean
       *   indicating whether a vertical scroll bar is now present.
       *
       */
      _onverticalscrollbarchanged: function _onverticalscrollbarchanged(event) {
        // Is this a recursive call or has the table not yet been rendered?
        if (this.__bInProgress__P_513_0 || !this.__bAppeared__P_513_1) {
          // Yup.  Ignore it.
          return;
        }

        this.__bInProgress__P_513_0 = true;
        {
          if (qx.core.Environment.get("qx.tableResizeDebug")) {
            this.debug("onverticalscrollbarchanged");
          }
        }
        this.getBehavior().onVerticalScrollBarChanged(event);
        qx.event.Timer.once(function () {
          if (this.__table__P_513_2 && !this.__table__P_513_2.isDisposed()) {
            this.__table__P_513_2._updateScrollerWidths();

            this.__table__P_513_2._updateScrollBarVisibility();
          }
        }, this, 0);
        this.__bInProgress__P_513_0 = false;
      },

      /**
       * Event handler for the "widthChanged" event.
       *
       * @param event {qx.event.type.Data}
       *   The "widthChanged" event object.
       *
       */
      _oncolumnwidthchanged: function _oncolumnwidthchanged(event) {
        // Is this a recursive call or has the table not yet been rendered?
        if (this.__bInProgress__P_513_0 || !this.__bAppeared__P_513_1) {
          // Yup.  Ignore it.
          return;
        }

        this.__bInProgress__P_513_0 = true;
        {
          if (qx.core.Environment.get("qx.tableResizeDebug")) {
            this.debug("oncolumnwidthchanged");
          }
        }
        this.getBehavior().onColumnWidthChanged(event);
        this.__bInProgress__P_513_0 = false;
      },

      /**
       * Event handler for the "visibilityChanged" event.
       *
       * @param event {qx.event.type.Data}
       *   The "visibilityChanged" event object.
       *
       */
      _onvisibilitychanged: function _onvisibilitychanged(event) {
        // Is this a recursive call or has the table not yet been rendered?
        if (this.__bInProgress__P_513_0 || !this.__bAppeared__P_513_1) {
          // Yup.  Ignore it.
          return;
        }

        this.__bInProgress__P_513_0 = true;
        {
          if (qx.core.Environment.get("qx.tableResizeDebug")) {
            this.debug("onvisibilitychanged");
          }
        }
        this.getBehavior().onVisibilityChanged(event);
        this.__bInProgress__P_513_0 = false;
      }
    },

    /*
     *****************************************************************************
        DESTRUCTOR
     *****************************************************************************
     */
    destruct: function destruct() {
      var behavior = this.getBehavior();

      if (behavior) {
        behavior.dispose();
      }

      this.__table__P_513_2 = null;
    }
  });
  qx.ui.table.columnmodel.Resize.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Resize.js.map?dt=1601100967215