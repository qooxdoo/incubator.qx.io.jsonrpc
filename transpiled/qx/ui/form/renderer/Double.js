(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.form.renderer.AbstractRenderer": {
        "construct": true,
        "require": true
      },
      "qx.ui.layout.Grid": {
        "construct": true
      },
      "qx.ui.container.Composite": {},
      "qx.ui.layout.HBox": {},
      "qx.ui.basic.Label": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2004-2009 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Martin Wittemann (martinwittemann)
  
  ************************************************************************ */

  /**
   * Double column renderer for {@link qx.ui.form.Form}.
   */
  qx.Class.define("qx.ui.form.renderer.Double", {
    extend: qx.ui.form.renderer.AbstractRenderer,
    construct: function construct(form) {
      var layout = new qx.ui.layout.Grid();
      layout.setSpacing(6);
      layout.setColumnAlign(0, "right", "top");
      layout.setColumnAlign(1, "left", "top");
      layout.setColumnAlign(2, "right", "top");
      layout.setColumnAlign(3, "left", "top");

      this._setLayout(layout);

      qx.ui.form.renderer.AbstractRenderer.constructor.call(this, form);
    },
    members: {
      _row: 0,
      _buttonRow: null,
      // overridden
      _onFormChange: function _onFormChange() {
        if (this._buttonRow) {
          this._buttonRow.destroy();

          this._buttonRow = null;
        }

        this._row = 0;

        qx.ui.form.renderer.Double.prototype._onFormChange.base.call(this);
      },

      /**
       * Add a group of form items with the corresponding names. The names are
       * displayed as label.
       * The title is optional and is used as grouping for the given form
       * items.
       *
       * @param items {qx.ui.core.Widget[]} An array of form items to render.
       * @param names {String[]} An array of names for the form items.
       * @param title {String?} A title of the group you are adding.
       */
      addItems: function addItems(items, names, title) {
        // add the header
        if (title != null) {
          this._add(this._createHeader(title), {
            row: this._row,
            column: 0,
            colSpan: 4
          });

          this._row++;
        } // add the items


        for (var i = 0; i < items.length; i++) {
          var label = this._createLabel(names[i], items[i]);

          this._add(label, {
            row: this._row,
            column: i * 2 % 4
          });

          var item = items[i];
          label.setBuddy(item);

          this._connectVisibility(item, label);

          this._add(item, {
            row: this._row,
            column: i * 2 % 4 + 1
          });

          if (i % 2 == 1) {
            this._row++;
          } // store the names for translation


          {
            this._names.push({
              name: names[i],
              label: label,
              item: items[i]
            });
          }
        }

        if (i % 2 == 1) {
          this._row++;
        }
      },

      /**
       * Adds a button the form renderer. All buttons will be added in a
       * single row at the bottom of the form.
       *
       * @param button {qx.ui.form.Button} The button to add.
       */
      addButton: function addButton(button) {
        if (this._buttonRow == null) {
          // create button row
          this._buttonRow = new qx.ui.container.Composite();

          this._buttonRow.setMarginTop(5);

          var hbox = new qx.ui.layout.HBox();
          hbox.setAlignX("right");
          hbox.setSpacing(5);

          this._buttonRow.setLayout(hbox); // add the button row


          this._add(this._buttonRow, {
            row: this._row,
            column: 0,
            colSpan: 4
          }); // increase the row


          this._row++;
        } // add the button


        this._buttonRow.add(button);
      },

      /**
       * Returns the set layout for configuration.
       *
       * @return {qx.ui.layout.Grid} The grid layout of the widget.
       */
      getLayout: function getLayout() {
        return this._getLayout();
      },

      /**
       * Creates a label for the given form item.
       *
       * @param name {String} The content of the label without the
       *   trailing * and :
       * @param item {qx.ui.core.Widget} The item, which has the required state.
       * @return {qx.ui.basic.Label} The label for the given item.
       */
      _createLabel: function _createLabel(name, item) {
        var label = new qx.ui.basic.Label(this._createLabelText(name, item)); // store labels for disposal

        this._labels.push(label);

        label.setRich(true);
        return label;
      },

      /**
       * Creates a header label for the form groups.
       *
       * @param title {String} Creates a header label.
       * @return {qx.ui.basic.Label} The header for the form groups.
       */
      _createHeader: function _createHeader(title) {
        var header = new qx.ui.basic.Label(title); // store labels for disposal

        this._labels.push(header);

        header.setFont("bold");

        if (this._row != 0) {
          header.setMarginTop(10);
        }

        header.setAlignX("left");
        return header;
      }
    },

    /*
    *****************************************************************************
       DESTRUCTOR
    *****************************************************************************
    */
    destruct: function destruct() {
      // first, remove all buttons from the bottom row because they
      // should not be disposed
      if (this._buttonRow) {
        this._buttonRow.removeAll();

        this._disposeObjects("_buttonRow");
      }
    }
  });
  qx.ui.form.renderer.Double.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Double.js.map?dt=1599578779917