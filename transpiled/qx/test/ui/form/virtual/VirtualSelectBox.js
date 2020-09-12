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
      "qx.ui.form.VirtualSelectBox": {},
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
  qx.Class.define("qx.test.ui.form.virtual.VirtualSelectBox", {
    extend: qx.test.ui.LayoutTestCase,
    members: {
      __selectBox__P_324_0: null,
      setUp: function setUp() {
        qx.test.ui.form.virtual.VirtualSelectBox.prototype.setUp.base.call(this);
        this.__model__P_324_1 = this.__createModelData__P_324_2();
        this.__selectBox__P_324_0 = new qx.ui.form.VirtualSelectBox(this.__model__P_324_1);
        this.getRoot().add(this.__selectBox__P_324_0);
        this.flush();
      },
      tearDown: function tearDown() {
        qx.test.ui.form.virtual.VirtualSelectBox.prototype.tearDown.base.call(this);

        this.__selectBox__P_324_0.destroy();

        this.__selectBox__P_324_0 = null;

        this.__model__P_324_1.dispose();

        this.__model__P_324_1 = null;
      },
      __createModelData__P_324_2: function __createModelData__P_324_2() {
        var model = new qx.data.Array();

        for (var i = 0; i < 100; i++) {
          model.push("item " + (i + 1));
        }

        return model;
      },
      testCreation: function testCreation() {
        this.assertEquals(this.__model__P_324_1.getLength(), this.__selectBox__P_324_0.getModel().getLength(), "Model length not equals!");
        this.assertEquals(this.__model__P_324_1, this.__selectBox__P_324_0.getModel(), "Model instance not equals!");
        this.assertEquals(this.__model__P_324_1, this.__selectBox__P_324_0.getChildControl("dropdown").getChildControl("list").getModel(), "Model instance on list not equals!");
        this.assertEquals(1, this.__selectBox__P_324_0.getSelection().getLength(), "Selection length not equals!");
        this.assertEquals(this.__model__P_324_1.getItem(0), this.__selectBox__P_324_0.getSelection().getItem(0), "Selection instance not equals!");
      }
    }
  });
  qx.test.ui.form.virtual.VirtualSelectBox.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=VirtualSelectBox.js.map?dt=1599905735601