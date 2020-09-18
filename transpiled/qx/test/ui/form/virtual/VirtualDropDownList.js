(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.test.ui.LayoutTestCase": {
        "construct": true,
        "require": true
      },
      "qx.test.ui.list.MAssert": {
        "require": true
      },
      "qx.ui.form.core.AbstractVirtualBox": {},
      "qx.ui.form.core.VirtualDropDownList": {},
      "qx.ui.core.Widget": {},
      "qx.data.Array": {}
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
       * Christian Hagendorn (chris_schmidt)
  
  ************************************************************************ */

  /**
   * @ignore(qx.ui.form.core.AbstractVirtualBoxMock)
   */
  qx.Class.define("qx.test.ui.form.virtual.VirtualDropDownList", {
    extend: qx.test.ui.LayoutTestCase,
    include: qx.test.ui.list.MAssert,
    construct: function construct() {
      qx.test.ui.LayoutTestCase.constructor.call(this);
      qx.Class.define("qx.ui.form.core.AbstractVirtualBoxMock", {
        extend: qx.ui.form.core.AbstractVirtualBox,
        members: {
          _addBindings: function _addBindings() {},
          _removeBindings: function _removeBindings() {}
        }
      });
    },
    members: {
      __target__P_323_0: null,
      __dropdown__P_323_1: null,
      __model__P_323_2: null,
      setUp: function setUp() {
        qx.test.ui.form.virtual.VirtualDropDownList.prototype.setUp.base.call(this);
        this.__target__P_323_0 = new qx.ui.form.core.AbstractVirtualBoxMock();
        this.__dropdown__P_323_1 = new qx.ui.form.core.VirtualDropDownList(this.__target__P_323_0);
        this.__model__P_323_2 = this.__createModelData__P_323_3();

        this.__dropdown__P_323_1.getChildControl("list").setModel(this.__model__P_323_2);

        this.getRoot().add(this.__target__P_323_0);
      },
      tearDown: function tearDown() {
        qx.test.ui.form.virtual.VirtualDropDownList.prototype.tearDown.base.call(this);

        this.__target__P_323_0.destroy();

        this.__dropdown__P_323_1.destroy();

        this.__target__P_323_0 = null;
        this.__dropdown__P_323_1 = null;

        this.__model__P_323_2.dispose();

        this.__model__P_323_2 = null;
      },
      testException: function testException() {
        this.assertException(function () {
          new qx.ui.form.core.VirtualDropDownList();
        }, Error, "Invalid parameter 'target'!");
        this.assertException(function () {
          new qx.ui.form.core.VirtualDropDownList(null);
        }, Error, "Invalid parameter 'target'!");
        var widget = new qx.ui.core.Widget();
        this.assertException(function () {
          new qx.ui.form.core.VirtualDropDownList(widget);
        }, Error, "Invalid parameter 'target'!");
        widget.dispose();
      },
      testCreation: function testCreation() {
        var model = this.__model__P_323_2;

        var listModel = this.__dropdown__P_323_1.getChildControl("list").getModel();

        this.assertEquals(model, listModel, "Model instance not equals!");

        this.__testCreation__P_323_4(model);
      },
      testCreationWithSorter: function testCreationWithSorter() {
        var sortedModel = this.__applySortingAndReturnSortedModel__P_323_5();

        this.__testCreation__P_323_4(sortedModel);

        sortedModel.dispose();
      },
      testCreationWithFilter: function testCreationWithFilter() {
        var filteredModel = this.__applyFilterAndReturnFilteredModel__P_323_6();

        this.__testCreation__P_323_4(filteredModel);

        filteredModel.dispose();
      },
      __testCreation__P_323_4: function __testCreation__P_323_4(model) {
        var list = this.__dropdown__P_323_1.getChildControl("list");

        this.assertModelEqualsRowData(model, list);

        this.__checkSelection__P_323_7(model.getItem(0));
      },
      testSelection: function testSelection() {
        this.__testSelection__P_323_8(this.__model__P_323_2);
      },
      testSelectionWithSorter: function testSelectionWithSorter() {
        var sortedModel = this.__applySortingAndReturnSortedModel__P_323_5();

        this.__testSelection__P_323_8(sortedModel);

        sortedModel.dispose();
      },
      testSelectionWithFilter: function testSelectionWithFilter() {
        var filteredModel = this.__applyFilterAndReturnFilteredModel__P_323_6();

        this.__testCreation__P_323_4(filteredModel);

        var model = this.__model__P_323_2;

        var selection = this.__dropdown__P_323_1.getSelection();

        var invalidItem = model.getItem(2);
        this.assertFalse(filteredModel.contains(invalidItem));
        var that = this;

        this.__checkEvent__P_323_9(selection, function () {
          selection.push(invalidItem);
        }, 2);

        this.__checkSelection__P_323_7(filteredModel.getItem(0));

        filteredModel.dispose();
      },
      __testSelection__P_323_8: function __testSelection__P_323_8(model) {
        var selection = this.__dropdown__P_323_1.getSelection();

        var that = this;
        var newItem = model.getItem(2);

        this.__checkEvent__P_323_9(selection, function () {
          selection.push(newItem);
        }, 2);

        this.__checkSelection__P_323_7(newItem);

        var that = this;
        newItem = model.getItem(4);

        this.__checkEvent__P_323_9(selection, function () {
          selection.splice(0, 1, newItem).dispose();
        }, 1);

        this.__checkSelection__P_323_7(newItem);
      },
      __createModelData__P_323_3: function __createModelData__P_323_3() {
        var model = new qx.data.Array();

        for (var i = 0; i < 100; i++) {
          model.push("item " + i);
        }

        return model;
      },
      __checkSelection__P_323_7: function __checkSelection__P_323_7(item) {
        this.assertTrue(this.__model__P_323_2.contains(item), "The itme '" + item + "' is not in the model!");

        var modelIndex = this.__model__P_323_2.indexOf(item);

        var selection = this.__dropdown__P_323_1.getSelection();

        var listSelection = this.__dropdown__P_323_1.getChildControl("list").getSelection();

        this.assertEquals(1, selection.getLength(), "Selection length not equals!");
        this.assertEquals(this.__model__P_323_2.getItem(modelIndex), selection.getItem(0), "Selection instance not equals!");
        this.assertEquals(selection.getLength(), listSelection.getLength(), "Selection length not equals with list selection length!");
        this.assertEquals(selection.getItem(0), listSelection.getItem(0), "Selection instance not equals with list selection instance!");
      },
      __checkEvent__P_323_9: function __checkEvent__P_323_9(target, callback, fired) {
        var count = 0;
        this.assertEventFired(target, "change", callback, function () {
          count++;
        });
        this.assertEquals(fired, count, "The event is not fired the expected times!");
      },
      __applySortingAndReturnSortedModel__P_323_5: function __applySortingAndReturnSortedModel__P_323_5() {
        var sorter = function sorter(a, b) {
          return a < b ? 1 : a > b ? -1 : 0;
        };

        this.__dropdown__P_323_1.getChildControl("list").setDelegate({
          sorter: sorter
        });

        var sortedModel = this.__model__P_323_2.copy();

        sortedModel.sort(sorter);
        return sortedModel;
      },
      __applyFilterAndReturnFilteredModel__P_323_6: function __applyFilterAndReturnFilteredModel__P_323_6() {
        var filter = function filter(data) {
          // Filters all even items
          return parseInt(data.slice(5, data.length), 10) % 2 == 1;
        };

        this.__dropdown__P_323_1.getChildControl("list").setDelegate({
          filter: filter
        });

        var filteredModel = new qx.data.Array();

        for (var i = 0; i < this.__model__P_323_2.getLength(); i++) {
          var item = this.__model__P_323_2.getItem(i);

          if (filter(item)) {
            filteredModel.push(item);
          }
        }

        return filteredModel;
      }
    },
    destruct: function destruct() {
      qx.Class.undefine("qx.ui.form.core.AbstractVirtualBoxMock");
    }
  });
  qx.test.ui.form.virtual.VirtualDropDownList.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=VirtualDropDownList.js.map?dt=1600461104337