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
      __cell__P_342_0: null,
      setUp: function setUp() {
        this.__cell__P_342_0 = new qx.ui.virtual.cell.WidgetCell();
      },
      tearDown: function tearDown() {
        this.__cell__P_342_0.dispose();

        this.__cell__P_342_0 = null;
      },
      testCreateWidget: function testCreateWidget() {
        var item = this.__cell__P_342_0.getCellWidget();

        this.assertQxWidget(item);
        item.dispose();
      },
      testCreateWidgetWithDelegate: function testCreateWidgetWithDelegate() {
        this.__setUpDelegate__P_342_1();

        var item = this.__cell__P_342_0.getCellWidget();

        this.assertInterface(item, qx.ui.form.ListItem);
        item.dispose();
      },
      testPoolOnDelegateChange: function testPoolOnDelegateChange() {
        var item1 = this.__cell__P_342_0.getCellWidget();

        this.assertQxWidget(item1);

        var item2 = this.__cell__P_342_0.getCellWidget();

        this.assertQxWidget(item2);

        this.__cell__P_342_0.pool(item1);

        this.__cell__P_342_0.pool(item2);

        this.__setUpDelegate__P_342_1();

        var item = this.__cell__P_342_0.getCellWidget();

        this.assertInterface(item, qx.ui.form.ListItem);
        item.dispose();
        item1.dispose();
        item2.dispose();
      },
      testEvent: function testEvent() {
        var that = this;
        var widget = null;
        this.assertEventFired(this.__cell__P_342_0, "created", function () {
          widget = that.__cell__P_342_0.getCellWidget();
        }, function (e) {
          that.assertQxWidget(e.getData());
        });

        this.__cell__P_342_0.pool(widget);

        this.assertEventNotFired(this.__cell__P_342_0, "created", function () {
          that.__cell__P_342_0.getCellWidget();
        }, function (e) {
          that.assertQxWidget(e.getData());
        });
        widget.dispose();
      },
      testUpdateData: function testUpdateData() {
        this.__setUpDelegate__P_342_1();

        var item = this.__cell__P_342_0.getCellWidget();

        var data = {
          label: "label 1",
          icon: "icon/22/emotes/face-angel.png"
        };

        this.__cell__P_342_0.updateData(item, data);

        this.assertEquals(data.label, item.getLabel());
        this.assertEquals(data.icon, item.getIcon());
        item.dispose();
      },
      testUpdateEmptyData: function testUpdateEmptyData() {
        this.__setUpDelegate__P_342_1();

        var item = this.__cell__P_342_0.getCellWidget();

        this.__cell__P_342_0.updateData(item);

        this.assertNull(item.getLabel());
        this.assertNull(item.getIcon());
        item.dispose();
      },
      testUpdateWrongData: function testUpdateWrongData() {
        var item = this.__cell__P_342_0.getCellWidget();

        var data = {
          banana: "joe"
        };
        var that = this;
        this.assertException(function () {
          that.__cell__P_342_0.updateData(item, data);
        });
        item.dispose();
      },
      __setUpDelegate__P_342_1: function __setUpDelegate__P_342_1() {
        this.__cell__P_342_0.setDelegate({
          createWidget: function createWidget() {
            return new qx.ui.form.ListItem();
          }
        });
      }
    }
  });
  qx.test.ui.virtual.cell.WidgetCell.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=WidgetCell.js.map?dt=1599343229928