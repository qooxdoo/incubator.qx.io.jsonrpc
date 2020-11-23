(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.test.ui.virtual.layer.LayerTestCase": {
        "require": true
      },
      "qx.ui.virtual.layer.Column": {}
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
     * Jonathan Weiß (jonathan_rass)
     * Fabian Jakobs (fjakobs)
  
  ************************************************************************ */
  qx.Class.define("qx.test.ui.virtual.layer.Column", {
    extend: qx.test.ui.virtual.layer.LayerTestCase,
    members: {
      _createLayer: function _createLayer() {
        return new qx.ui.virtual.layer.Column("red", "green");
      },
      _assertCells: function _assertCells(firstRow, firstColumn, rowCount, columnCount, msg) {
        var children = this.layer.getContentElement().getDomElement().childNodes;
        this.assertEquals(columnCount, children.length);

        for (var i = 0; i < columnCount; i++) {
          var column = firstColumn + i;

          if (column % 2 == 0) {
            this.assertCssColor("red", children[i].style.backgroundColor);
          } else {
            this.assertCssColor("green", children[i].style.backgroundColor);
          }
        }
      }
    }
  });
  qx.test.ui.virtual.layer.Column.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Column.js.map?dt=1606149388464