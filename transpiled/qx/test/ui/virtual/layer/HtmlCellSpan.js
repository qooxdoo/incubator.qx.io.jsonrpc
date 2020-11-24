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
      "qx.ui.virtual.cell.Cell": {},
      "qx.ui.virtual.core.Axis": {},
      "qx.ui.virtual.layer.HtmlCellSpan": {}
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
  qx.Class.define("qx.test.ui.virtual.layer.HtmlCellSpan", {
    extend: qx.test.ui.virtual.layer.LayerTestCase,
    members: {
      tearDown: function tearDown() {
        qx.test.ui.virtual.layer.HtmlCellSpan.prototype.tearDown.base.call(this);

        this.__cellRenderer__P_346_0.dispose();

        this.__rowConfig__P_346_1.dispose();

        this.__columnConfig__P_346_2.dispose();
      },
      _createLayer: function _createLayer() {
        this.__cellRenderer__P_346_0 = new qx.ui.virtual.cell.Cell();
        this.__rowConfig__P_346_1 = new qx.ui.virtual.core.Axis(10, 100);
        this.__columnConfig__P_346_2 = new qx.ui.virtual.core.Axis(20, 100);
        return new qx.ui.virtual.layer.HtmlCellSpan(this, this.__rowConfig__P_346_1, this.__columnConfig__P_346_2);
      },
      getCellProperties: function getCellProperties(row, column) {
        return this.__cellRenderer__P_346_0.getCellProperties(row + " / " + column, {});
      },
      _assertCells: function _assertCells(firstRow, firstColumn, rowCount, columnCount, msg) {
        var children = this.layer.getContentElement().getDomElement().childNodes;
        this.assertEquals(rowCount * columnCount, children.length);

        for (var y = 0; y < rowCount; y++) {
          for (var x = 0; x < columnCount; x++) {
            var row = firstRow + y;
            var column = firstColumn + x;
            var cellEl = children[y * columnCount + x];
            this.assertEquals(row + " / " + column, cellEl.innerHTML);
          }
        }
      }
    },
    destruct: function destruct() {
      this.__cellRenderer__P_346_0 = null;
    }
  });
  qx.test.ui.virtual.layer.HtmlCellSpan.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=HtmlCellSpan.js.map?dt=1606253516611