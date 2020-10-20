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
      "qx.ui.core.Widget": {},
      "qx.ui.form.IModel": {},
      "qx.ui.form.MModelProperty": {},
      "qx.ui.form.List": {},
      "qx.data.Array": {},
      "qx.data.controller.List": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /**
   * @ignore(qx.test.ListItem)
   */
  qx.Class.define("qx.test.data.controller.ListReverse", {
    extend: qx.test.ui.LayoutTestCase,
    construct: function construct() {
      qx.test.ui.LayoutTestCase.constructor.call(this); // define a test class

      qx.Class.define("qx.test.ListItem", {
        extend: qx.ui.core.Widget,
        implement: [qx.ui.form.IModel],
        include: [qx.ui.form.MModelProperty],
        properties: {
          label: {
            check: "String",
            init: "label",
            event: "changeLabel"
          },
          icon: {
            check: "String",
            init: "icon",
            event: "changeIcon"
          },
          child: {
            check: "qx.test.ListItem",
            event: "changeChild",
            nullable: true
          },
          children: {
            event: "changeChildren",
            nullable: true
          }
        }
      });
    },
    members: {
      __list__P_234_0: null,
      __controller__P_234_1: null,
      __data__P_234_2: null,
      __model__P_234_3: null,
      __delegate__P_234_4: null,
      setUp: function setUp() {
        this.__list__P_234_0 = new qx.ui.form.List(); // create the model

        this.__data__P_234_2 = [];

        for (var i = 0; i < 5; i++) {
          this.__data__P_234_2.push("item" + i);
        } // create a new array


        this.__model__P_234_3 = new qx.data.Array(this.__data__P_234_2);
        this.__delegate__P_234_4 = {
          createItem: function createItem() {
            return new qx.test.ListItem();
          }
        };
        this.__controller__P_234_1 = new qx.data.controller.List();
      },
      tearDown: function tearDown() {
        this.flush();

        this.__controller__P_234_1.dispose();

        this.__controller__P_234_1 = null;

        this.__model__P_234_3.dispose();

        this.__model__P_234_3 = null;
        this.__data__P_234_2 = null;

        this.__list__P_234_0.dispose();
      },
      testStringListModel: function testStringListModel() {
        this.__delegate__P_234_4.bindItem = function (controller, item, id) {
          controller.bindDefaultProperties(item, id);
          controller.bindProperty("", "label", null, item, id);
          controller.bindPropertyReverse("", "label", null, item, id);
          controller.bindPropertyReverse("", "icon", null, item, id);
        };

        this.__controller__P_234_1.set({
          target: this.__list__P_234_0,
          delegate: this.__delegate__P_234_4,
          iconPath: "",
          model: this.__model__P_234_3
        }); // check for the binding model --> target


        var items = this.__list__P_234_0.getChildren();

        for (var i = 0; i < items.length; i++) {
          this.__model__P_234_3.setItem(i, "abc" + i);

          this.assertEquals("abc" + i, items[i].getLabel());
        }

        ; // check for the binding target(label) --> model

        for (var i = 0; i < items.length; i++) {
          items[i].setLabel("affe" + i);
          this.assertEquals(items[i].getLabel(), this.__model__P_234_3.getItem(i));
        } // check for the binding target(icon) --> model


        for (var i = 0; i < items.length; i++) {
          items[i].setIcon("AFFE" + i);
          this.assertEquals(items[i].getIcon(), this.__model__P_234_3.getItem(i));
        } // invoke a removing and setting of the bindings with the new bindItem


        this.__delegate__P_234_4.bindItem = function (controller, item, id) {
          controller.bindProperty("", "label", null, item, id);
        };

        this.__controller__P_234_1.update(); // check for the removed binding target(icon) --> model


        for (var i = 0; i < items.length; i++) {
          items[i].setIcon("123-" + i);
          this.assertEquals("AFFE" + i, this.__model__P_234_3.getItem(i));
        }
      },
      testStringListModelInitModelPrior: function testStringListModelInitModelPrior() {
        this.__delegate__P_234_4.bindItem = function (controller, item, id) {
          controller.bindProperty("", "icon", null, item, id);
          controller.bindPropertyReverse("", "icon", null, item, id);
        };

        this.__controller__P_234_1.set({
          target: this.__list__P_234_0,
          delegate: this.__delegate__P_234_4,
          iconPath: "",
          model: this.__model__P_234_3
        }); // check for the binding model --> target


        var items = this.__list__P_234_0.getChildren();

        for (var i = 0; i < items.length; i++) {
          this.assertEquals("item" + i, items[i].getIcon());
        }

        ;
      },
      testStringListModelInitTargetPrior: function testStringListModelInitTargetPrior() {
        this.__delegate__P_234_4.bindItem = function (controller, item, id) {
          controller.bindPropertyReverse("", "icon", null, item, id);
          controller.bindProperty("", "icon", null, item, id);
        };

        this.__controller__P_234_1.set({
          target: this.__list__P_234_0,
          delegate: this.__delegate__P_234_4,
          iconPath: "",
          model: this.__model__P_234_3
        }); // check for the binding model --> target


        var items = this.__list__P_234_0.getChildren();

        for (var i = 0; i < items.length; i++) {
          this.assertEquals("icon", items[i].getIcon());
        }

        ;
      },
      testStringListModelDeepTarget: function testStringListModelDeepTarget() {
        this.__delegate__P_234_4.bindItem = function (controller, item, id) {
          controller.bindProperty("", "child.label", null, item, id);
          controller.bindPropertyReverse("", "child.label", null, item, id);
        };

        this.__delegate__P_234_4.configureItem = function (item) {
          item.setChild(new qx.test.ListItem());
        };

        this.__controller__P_234_1.set({
          target: this.__list__P_234_0,
          delegate: this.__delegate__P_234_4,
          iconPath: "",
          model: this.__model__P_234_3
        }); // check for the binding model --> target


        var items = this.__list__P_234_0.getChildren();

        for (var i = 0; i < items.length; i++) {
          this.__model__P_234_3.setItem(i, "abc" + i);

          this.assertEquals("abc" + i, items[i].getChild().getLabel());
        }

        ; // check for the binding target(label) --> model

        for (var i = 0; i < items.length; i++) {
          items[i].getChild().setLabel("affe" + i);
          this.assertEquals(items[i].getChild().getLabel(), this.__model__P_234_3.getItem(i));
        } // get rid of the created items


        for (var i = 0; i < items.length; i++) {
          items[i].getChild().dispose();
          items[i].setChild(null);
        }

        ;
      },
      testStringListModelArrayTarget: function testStringListModelArrayTarget() {
        this.__delegate__P_234_4.bindItem = function (controller, item, id) {
          controller.bindProperty("", "children[0].label", null, item, id);
          controller.bindPropertyReverse("", "children[0].label", null, item, id);
        };

        this.__delegate__P_234_4.configureItem = function (item) {
          var childItems = new qx.data.Array(new qx.test.ListItem(), new qx.test.ListItem());
          item.setChildren(childItems);
        };

        this.__controller__P_234_1.set({
          target: this.__list__P_234_0,
          delegate: this.__delegate__P_234_4,
          iconPath: "",
          model: this.__model__P_234_3
        }); // check for the binding model --> target


        var items = this.__list__P_234_0.getChildren();

        for (var i = 0; i < items.length; i++) {
          this.__model__P_234_3.setItem(i, "abc" + i);

          this.assertEquals("abc" + i, items[i].getChildren().getItem(0).getLabel());
        }

        ; // check for the binding target(label) --> model

        for (var i = 0; i < items.length; i++) {
          items[i].getChildren().getItem(0).setLabel("affe" + i);
          this.assertEquals(items[i].getChildren().getItem(0).getLabel(), this.__model__P_234_3.getItem(i));
        } // check a change of the array order


        for (var i = 0; i < items.length; i++) {
          items[i].getChildren().reverse();
          this.assertEquals(items[i].getChildren().getItem(0).getLabel(), this.__model__P_234_3.getItem(i));
        } // get rid of the created items


        for (var i = 0; i < items.length; i++) {
          if (items[i].getChildren().getItem(0)) {
            items[i].getChildren().getItem(0).dispose();
          }

          items[i].getChildren().setItem(0, null);

          if (items[i].getChildren().getItem(1)) {
            items[i].getChildren().getItem(1).dispose();
          }

          items[i].getChildren().setItem(1, null);
          items[i].setChildren(null);
        }

        ;
      }
    }
  });
  qx.test.data.controller.ListReverse.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=ListReverse.js.map?dt=1603176829456