(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.test.ui.selection.AbstractSingleSelectonTest": {
        "require": true
      },
      "qx.ui.form.List": {},
      "qx.ui.form.ListItem": {}
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
  qx.Class.define("qx.test.ui.selection.ListSingleSelection", {
    extend: qx.test.ui.selection.AbstractSingleSelectonTest,
    members: {
      setUp: function setUp() {
        var length = 10;
        this._notInSelection = [];
        this._mode = "single";
        this._widget = new qx.ui.form.List().set({
          selectionMode: this._mode,
          width: 200,
          height: 400
        });
        this.getRoot().add(this._widget);

        for (var i = 0; i < length; i++) {
          var item = new qx.ui.form.ListItem("ListItem" + i);

          this._widget.add(item);

          if (i == 5) {
            this.assertIdentical(0, this._widget.getSelection().length, "Couldn't setup test, because selection isn't empty");

            this._widget.setSelection([item]);

            this._selection = [item];
          } else {
            this._notInSelection.push(item);
          }
        }

        this.flush();
      },
      tearDown: function tearDown() {
        qx.test.ui.selection.ListSingleSelection.prototype.tearDown.base.call(this);

        this._widget.destroy();

        this._widget = null;
        this._selection = null;
        this._notInSelection = null;
        this.flush();
      },
      _getChildren: function _getChildren() {
        if (this._widget != null) {
          return this._widget.getChildren();
        } else {
          return [];
        }
      },
      _createTestElement: function _createTestElement(name) {
        return new qx.ui.form.ListItem(name);
      }
    }
  });
  qx.test.ui.selection.ListSingleSelection.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=ListSingleSelection.js.map?dt=1592867906959