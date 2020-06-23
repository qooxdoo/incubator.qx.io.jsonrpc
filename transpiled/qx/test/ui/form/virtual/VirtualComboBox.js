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
      "qx.ui.form.VirtualComboBox": {},
      "qx.data.Array": {},
      "qx.data.marshal.Json": {},
      "qx.lang.String": {},
      "qx.bom.String": {}
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
  
  ************************************************************************ */
  qx.Class.define("qx.test.ui.form.virtual.VirtualComboBox", {
    extend: qx.test.ui.LayoutTestCase,
    members: {
      __comboBox__P_325_0: null,
      __model__P_325_1: null,
      setUp: function setUp() {
        qx.test.ui.form.virtual.VirtualComboBox.prototype.setUp.base.call(this);
        this.__comboBox__P_325_0 = new qx.ui.form.VirtualComboBox();
        this.getRoot().add(this.__comboBox__P_325_0);
        this.flush();
      },
      tearDown: function tearDown() {
        qx.test.ui.form.virtual.VirtualComboBox.prototype.tearDown.base.call(this);

        this.__comboBox__P_325_0.destroy();

        this.__comboBox__P_325_0 = null;

        this.__model__P_325_1.dispose();

        this.flush();
      },
      __createSimpleModel__P_325_2: function __createSimpleModel__P_325_2() {
        var model = new qx.data.Array();

        for (var i = 0; i < 100; i++) {
          model.push("item " + (i + 1));
        }

        return model;
      },
      __createRichModel__P_325_3: function __createRichModel__P_325_3() {
        var model = new qx.data.Array();

        for (var i = 0; i < 100; i++) {
          model.push("<b>item " + (i + 1) + "</b>");
        }

        return model;
      },
      __createNestedModel__P_325_4: function __createNestedModel__P_325_4() {
        var rawData = [{
          firstname: "James",
          lastname: "Kirk"
        }, {
          firstname: "Jean-Luc",
          lastname: "Picard"
        }, {
          firstname: "Benjamin",
          lastname: "Sisko"
        }];
        var model = qx.data.marshal.Json.createModel(rawData);
        return model;
      },
      testPreselectOnOpen: function testPreselectOnOpen() {
        this.__model__P_325_1 = this.__createSimpleModel__P_325_2();

        this.__comboBox__P_325_0.setModel(this.__model__P_325_1);

        this.__comboBox__P_325_0.setValue("i");

        this.flush();

        this.__comboBox__P_325_0.open();

        this.flush();

        this.__comboBox__P_325_0.close();

        this.flush(); // Preselection may not change the actual value

        this.assertNotEquals("item 1", this.__comboBox__P_325_0.getValue());
        this.assertEquals("i", this.__comboBox__P_325_0.getValue());
      },
      testSelectFirstMatch: function testSelectFirstMatch() {
        this.__model__P_325_1 = this.__createSimpleModel__P_325_2();

        this.__comboBox__P_325_0.setModel(this.__model__P_325_1);

        this.__comboBox__P_325_0.setValue("item 4");

        this.flush();

        this.__comboBox__P_325_0.open();

        this.flush();

        var preselected = this.__comboBox__P_325_0.getChildControl("dropdown")._preselected;

        this.assertEquals("item 4", preselected);
        this.assertEquals("item 4", this.__comboBox__P_325_0.getValue());
      },
      testSelectFirstMatchWithSortedModel: function testSelectFirstMatchWithSortedModel() {
        this.__model__P_325_1 = this.__createSimpleModel__P_325_2();

        this.__comboBox__P_325_0.setModel(this.__model__P_325_1);

        var delegate = {
          // invert sort order
          sorter: function sorter(a, b) {
            return a < b ? 1 : a > b ? -1 : 0;
          }
        };

        this.__comboBox__P_325_0.setDelegate(delegate);

        this.__comboBox__P_325_0.setValue("item 4");

        this.flush();

        this.__comboBox__P_325_0.open();

        this.flush();

        var preselected = this.__comboBox__P_325_0.getChildControl("dropdown")._preselected;

        this.assertEquals("item 49", preselected);
        this.assertEquals("item 4", this.__comboBox__P_325_0.getValue()); // The virtual list uses a timeout to asynchronously flush the layout
        // queue and scroll the (pre)selected item into view. tearDown is called
        // before this timer's callback so the list container tries to scroll a
        // disposed widget which causes an exception. To get around this, we use
        // a timeout to delay the tearDown call.

        var that = this;
        window.setTimeout(function () {
          that.resume();
        }, 100);
        this.wait(200);
      },
      testSelectFirstMatchWithFilteredModel: function testSelectFirstMatchWithFilteredModel() {
        this.__model__P_325_1 = this.__createSimpleModel__P_325_2();

        this.__comboBox__P_325_0.setModel(this.__model__P_325_1);

        var delegate = {
          // remove even-numbered items
          filter: function filter(item) {
            var num = parseInt(/([0-9]+)/.exec(item)[1], 10);
            return num % 2 ? true : false;
          }
        };

        this.__comboBox__P_325_0.setDelegate(delegate);

        this.__comboBox__P_325_0.setValue("item 22");

        this.flush();

        this.__comboBox__P_325_0.open();

        this.flush(); // item 22 is not in the list, nothing should be preselected

        var preselected = this.__comboBox__P_325_0.getChildControl("dropdown")._preselected;

        this.assertNull(preselected);
        this.assertEquals("item 22", this.__comboBox__P_325_0.getValue());
      },
      testSelectFirstMatchWithFormatter: function testSelectFirstMatchWithFormatter() {
        this.__model__P_325_1 = this.__createRichModel__P_325_3();

        this.__comboBox__P_325_0.setModel(this.__model__P_325_1);

        var delegate = {
          configureItem: function configureItem(item) {
            item.setRich(true);
          }
        };

        this.__comboBox__P_325_0.setDelegate(delegate);

        this.__comboBox__P_325_0.setDefaultFormat(function (data) {
          if (data) {
            data = qx.lang.String.stripTags(data);
            data = qx.bom.String.unescape(data);
          }

          return data;
        });

        this.__comboBox__P_325_0.setValue("item 4");

        this.flush();

        this.__comboBox__P_325_0.open();

        this.flush();

        var preselected = this.__comboBox__P_325_0.getChildControl("dropdown")._preselected;

        this.assertEquals("<b>item 4</b>", preselected);
        this.assertEquals("item 4", this.__comboBox__P_325_0.getValue());
      },
      testSelectFirstMatchByLabelPath: function testSelectFirstMatchByLabelPath() {
        this.__model__P_325_1 = this.__createNestedModel__P_325_4();

        this.__comboBox__P_325_0.setLabelPath("lastname");

        this.__comboBox__P_325_0.setModel(this.__model__P_325_1);

        this.__comboBox__P_325_0.setValue("Si");

        this.flush();

        this.__comboBox__P_325_0.open();

        this.flush();

        var preselected = this.__comboBox__P_325_0.getChildControl("dropdown")._preselected.getLastname();

        this.assertEquals("Sisko", preselected);
        this.assertEquals("Si", this.__comboBox__P_325_0.getValue());
      },
      testEmptySelection: function testEmptySelection() {
        this.__comboBox__P_325_0.setLabelPath("label");

        var rawData = [{
          label: "foo"
        }];
        var model = this.__model__P_325_1 = qx.data.marshal.Json.createModel(rawData);

        this.__comboBox__P_325_0.setModel(model);

        var selection = this.__comboBox__P_325_0.getChildControl("dropdown").getSelection();

        selection.push(this.__comboBox__P_325_0.getModel().getItem(0));
        selection.removeAll();
      },
      testOpenWithUnrenderedWidget: function testOpenWithUnrenderedWidget() {
        var cb = new qx.ui.form.VirtualComboBox();
        cb.open();
        this.getRoot().add(cb);
      }
    }
  });
  qx.test.ui.form.virtual.VirtualComboBox.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=VirtualComboBox.js.map?dt=1592908459231