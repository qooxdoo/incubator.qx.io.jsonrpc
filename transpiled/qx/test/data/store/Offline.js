(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.core.Environment": {
        "defer": "load",
        "require": true
      },
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.dev.unit.TestCase": {
        "require": true
      },
      "qx.dev.unit.MRequirements": {
        "require": true
      },
      "qx.dev.unit.MMock": {
        "require": true
      },
      "qx.bom.client.Html": {},
      "qx.bom.Storage": {},
      "qx.data.store.Offline": {},
      "qx.data.marshal.Json": {}
    },
    "environment": {
      "provided": [],
      "required": {
        "html.storage.local": {
          "className": "qx.bom.client.Html"
        }
      }
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
       * Martin Wittemann (martinwittemann)
  
  ************************************************************************ */
  qx.Class.define("qx.test.data.store.Offline", {
    extend: qx.dev.unit.TestCase,
    include: [qx.dev.unit.MRequirements, qx.dev.unit.MMock],
    members: {
      __store__P_240_0: null,
      __testKey__P_240_1: "qx-unit-test",
      hasLocalStorage: function hasLocalStorage() {
        return qx.core.Environment.get("html.storage.local");
      },
      hasQxDebug: function hasQxDebug() {
        return true;
      },
      setUp: function setUp() {
        this.require(["localStorage"]);
      },
      tearDown: function tearDown() {
        this.getSandbox().restore();

        if (this.__store__P_240_0) {
          this.__store__P_240_0.dispose();
        } // erase the data from the storages


        qx.bom.Storage.getLocal().removeItem(this.__testKey__P_240_1);
      },
      __initDefaultStore__P_240_2: function __initDefaultStore__P_240_2() {
        this.__store__P_240_0 = new qx.data.store.Offline(this.__testKey__P_240_1, "local");
      },
      __createDefaultModel__P_240_3: function __createDefaultModel__P_240_3() {
        return qx.data.marshal.Json.createModel({
          a: "a"
        }, true);
      },
      testCreate: function testCreate() {
        this.require(["qxDebug"]);

        var store;
        this.assertException(function () {
          store = new qx.data.store.Offline();
        }); // fallback for the storage is local

        store = new qx.data.store.Offline(this.__testKey__P_240_1);
        this.assertEquals(store._storage, qx.bom.Storage.getLocal());
        store.dispose(); // assert no exception

        this.__initDefaultStore__P_240_2();

        this.assertEquals(this.__testKey__P_240_1, this.__store__P_240_0.getKey());
      },
      testCreateWithDelegate: function testCreateWithDelegate() {
        var del = {};
        var spy = this.spy(qx.data.marshal, "Json");
        var store = new qx.data.store.Offline(this.__testKey__P_240_1, "local", del);
        this.assertCalledWith(spy, del);
        store.dispose();
      },
      testCheckEmptyModel: function testCheckEmptyModel() {
        this.__initDefaultStore__P_240_2();

        this.assertNull(this.__store__P_240_0.getModel());

        var model = this.__createDefaultModel__P_240_3();

        this.__store__P_240_0.setModel(model);

        this.__store__P_240_0.setModel(null);

        this.wait(1000, function () {
          this.assertNull(this.__store__P_240_0.getModel());
          model.dispose();
        }.bind(this));
      },
      testSetModel: function testSetModel() {
        this.__initDefaultStore__P_240_2();

        var model = this.__createDefaultModel__P_240_3();

        this.__store__P_240_0.setModel(model);

        this.wait(1000, function () {
          this.assertEquals("a", this.__store__P_240_0.getModel().getA());
          model.dispose();
        }.bind(this));
      },
      testSetModelDebounce: function testSetModelDebounce() {
        this.__initDefaultStore__P_240_2();

        var storeModelCallback = this.spy(this.__store__P_240_0._storage, "setItem");

        var model = this.__createDefaultModel__P_240_3();

        this.__store__P_240_0.setModel(model);

        model.setA('b');
        model.setA('c');
        this.wait(1000, function () {
          this.assertCalledOnce(storeModelCallback);
        }, this);
      },
      testChangeModel: function testChangeModel() {
        this.__initDefaultStore__P_240_2();

        var model = this.__createDefaultModel__P_240_3();

        this.__store__P_240_0.setModel(model);

        this.wait(1000, function () {
          this.assertEquals("a", this.__store__P_240_0.getModel().getA());
          model.setA("A");
          this.assertEquals("A", this.__store__P_240_0.getModel().getA());
          model.dispose();
        }.bind(this));
      },
      testModelWriteRead: function testModelWriteRead() {
        this.__initDefaultStore__P_240_2();

        var model = this.__createDefaultModel__P_240_3();

        this.__store__P_240_0.setModel(model);

        this.wait(1000, function () {
          this.assertEquals("a", this.__store__P_240_0.getModel().getA()); // dispose the store to test the load of the model

          this.__store__P_240_0.dispose();

          model.dispose();

          this.__initDefaultStore__P_240_2();

          this.assertNotNull(this.__store__P_240_0.getModel());
          this.assertEquals("a", this.__store__P_240_0.getModel().getA());
        }.bind(this));
      },
      testModelRead: function testModelRead() {
        this.stub(qx.bom.Storage.getLocal(), "getItem").returns({
          b: "b"
        });

        this.__initDefaultStore__P_240_2();

        this.assertNotUndefined(this.__store__P_240_0.getModel());
        this.assertFunction(this.__store__P_240_0.getModel().getB);
        this.assertEquals("b", this.__store__P_240_0.getModel().getB());
      },
      testUpdateModel: function testUpdateModel() {
        this.__initDefaultStore__P_240_2();

        var model = this.__createDefaultModel__P_240_3();

        this.__store__P_240_0.setModel(model);

        this.wait(1000, function () {
          this.assertEquals("a", this.__store__P_240_0.getModel().getA()); // dispose the store to test the load of the model

          this.__store__P_240_0.dispose();

          model.dispose();

          this.__initDefaultStore__P_240_2();

          this.assertNotNull(this.__store__P_240_0.getModel());

          this.__store__P_240_0.getModel().setA("b");

          this.wait(1000, function () {
            this.assertEquals("b", this.__store__P_240_0.getModel().getA(), "1"); // dispose the store to test the load of the model

            this.__store__P_240_0.dispose();

            this.__initDefaultStore__P_240_2();

            this.assertNotNull(this.__store__P_240_0.getModel());
            this.assertEquals("b", this.__store__P_240_0.getModel().getA(), "2");
          }.bind(this));
        }.bind(this));
      },
      testReplaceModel: function testReplaceModel() {
        this.__initDefaultStore__P_240_2();

        var model1 = this.__createDefaultModel__P_240_3();

        this.__store__P_240_0.setModel(model1);

        var model2 = qx.data.marshal.Json.createModel({
          x: "x"
        }, true);

        this.__store__P_240_0.setModel(model2);

        this.wait(1000, function () {
          this.__initDefaultStore__P_240_2();

          this.assertNotNull(this.__store__P_240_0.getModel());
          this.assertFunction(this.__store__P_240_0.getModel().getX);
          this.assertEquals("x", this.__store__P_240_0.getModel().getX()); // get rid of all the created stuff

          this.__store__P_240_0.dispose();

          model1.dispose();
          model2.dispose();
        }.bind(this));
      },
      testBigModel: function testBigModel() {
        var data = {
          a: [{
            b: 1,
            C: true
          }, 12.567, "a"]
        };
        var model = qx.data.marshal.Json.createModel(data, true);

        this.__initDefaultStore__P_240_2();

        this.__store__P_240_0.setModel(model);

        this.wait(1000, function () {
          this.assertEquals(1, this.__store__P_240_0.getModel().getA().getItem(0).getB());
          this.assertEquals(true, this.__store__P_240_0.getModel().getA().getItem(0).getC());
          this.assertEquals("a", this.__store__P_240_0.getModel().getA().getItem(2));
          model.dispose();
        }.bind(this));
      }
    }
  });
  qx.test.data.store.Offline.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Offline.js.map?dt=1592520323688