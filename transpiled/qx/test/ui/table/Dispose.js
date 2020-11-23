(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.test.ui.LayoutTestCase": {
        "require": true
      },
      "qx.ui.table.model.Simple": {},
      "qx.ui.table.Table": {}
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
       * Fabian Jakobs (fjakobs)
  
  ************************************************************************ */
  qx.Class.define("qx.test.ui.table.Dispose", {
    extend: qx.test.ui.LayoutTestCase,
    members: {
      createModel: function createModel() {
        var tableModel = new qx.ui.table.model.Simple();
        tableModel.setColumns(["ID", "A number", "A date", "Boolean"]);
        tableModel.setData(this.createRandomRows(200));
        return tableModel;
      },
      createRandomRows: function createRandomRows(rowCount) {
        var rowData = [];
        var now = new Date().getTime();
        var dateRange = 34560000000; // 400 days

        var nextId = 0;

        for (var row = 0; row < rowCount; row++) {
          var date = new Date(now + Math.random() * dateRange - dateRange / 2);
          rowData.push([nextId++, Math.random() * 10000, date, Math.random() > 0.5]);
        }

        return rowData;
      },
      testSimple: function testSimple() {
        this.assertDestroy(function () {
          // table
          var model = this.createModel();
          var table = new qx.ui.table.Table(model);
          this.getRoot().add(table);
          this.flush();
          table.destroy();
          model.dispose();
        }, this, "Dispose simple table");
      },
      changeModel: function changeModel(table) {
        var model = table.getTableModel();
        table.setTableModel(this.createModel());
        model.dispose();
      },
      testChangeModel: function testChangeModel() {
        this.assertDestroy(function () {
          // table
          var table = new qx.ui.table.Table(this.createModel());
          this.changeModel(table);
          this.getRoot().add(table);
          this.flush();
          this.changeModel(table);
          var model = table.getTableModel();
          table.destroy();
          model.dispose();
        }, this, "Dispose table with changed model");
      }
    }
  });
  qx.test.ui.table.Dispose.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Dispose.js.map?dt=1606150464186