(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.dev.unit.TestCase": {
        "require": true
      },
      "qx.ui.virtual.cell.WidgetCell": {},
      "qx.ui.form.ListItem": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2004-2010 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
     * Christian Hagendorn (chris_schmidt)
  
  ************************************************************************ */

  /* ************************************************************************
  
  
  ************************************************************************ */

  /**
   *
   * @asset(qx/icon/${qx.icontheme}/22/emotes/face-angel.png)
   */
  qx.Class.define("qx.test.ui.virtual.cell.WidgetCell", {
    extend: qx.dev.unit.TestCase,
    members: {
      __cell: null,
      setUp: function setUp() {
        this.__cell = new qx.ui.virtual.cell.WidgetCell();
      },
      tearDown: function tearDown() {
        this.__cell.dispose();

        this.__cell = null;
      },
      testCreateWidget: function testCreateWidget() {
        var item = this.__cell.getCellWidget();

        this.assertQxWidget(item);
        item.dispose();
      },
      testCreateWidgetWithDelegate: function testCreateWidgetWithDelegate() {
        this.__setUpDelegate();

        var item = this.__cell.getCellWidget();

        this.assertInterface(item, qx.ui.form.ListItem);
        item.dispose();
      },
      testPoolOnDelegateChange: function testPoolOnDelegateChange() {
        var item1 = this.__cell.getCellWidget();

        this.assertQxWidget(item1);

        var item2 = this.__cell.getCellWidget();

        this.assertQxWidget(item2);

        this.__cell.pool(item1);

        this.__cell.pool(item2);

        this.__setUpDelegate();

        var item = this.__cell.getCellWidget();

        this.assertInterface(item, qx.ui.form.ListItem);
        item.dispose();
        item1.dispose();
        item2.dispose();
      },
      testEvent: function testEvent() {
        var that = this;
        var widget = null;
        this.assertEventFired(this.__cell, "created", function () {
          widget = that.__cell.getCellWidget();
        }, function (e) {
          that.assertQxWidget(e.getData());
        });

        this.__cell.pool(widget);

        this.assertEventNotFired(this.__cell, "created", function () {
          that.__cell.getCellWidget();
        }, function (e) {
          that.assertQxWidget(e.getData());
        });
        widget.dispose();
      },
      testUpdateData: function testUpdateData() {
        this.__setUpDelegate();

        var item = this.__cell.getCellWidget();

        var data = {
          label: "label 1",
          icon: "icon/22/emotes/face-angel.png"
        };

        this.__cell.updateData(item, data);

        this.assertEquals(data.label, item.getLabel());
        this.assertEquals(data.icon, item.getIcon());
        item.dispose();
      },
      testUpdateEmptyData: function testUpdateEmptyData() {
        this.__setUpDelegate();

        var item = this.__cell.getCellWidget();

        this.__cell.updateData(item);

        this.assertNull(item.getLabel());
        this.assertNull(item.getIcon());
        item.dispose();
      },
      testUpdateWrongData: function testUpdateWrongData() {
        var item = this.__cell.getCellWidget();

        var data = {
          banana: "joe"
        };
        var that = this;
        this.assertException(function () {
          that.__cell.updateData(item, data);
        });
        item.dispose();
      },
      __setUpDelegate: function __setUpDelegate() {
        this.__cell.setDelegate({
          createWidget: function createWidget() {
            return new qx.ui.form.ListItem();
          }
        });
      }
    }
  });
  qx.test.ui.virtual.cell.WidgetCell.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=WidgetCell.js.map?dt=1588615809876