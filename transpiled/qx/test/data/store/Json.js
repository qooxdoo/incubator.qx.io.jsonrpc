(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.io.request.Xhr": {
        "require": true
      },
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.dev.unit.TestCase": {
        "require": true
      },
      "qx.dev.unit.MMock": {
        "require": true
      },
      "qx.data.store.Json": {},
      "qx.util.ResourceManager": {},
      "qx.util.AliasManager": {},
      "qx.core.Object": {},
      "qx.Mixin": {},
      "qx.event.Timer": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2004-2008 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Martin Wittemann (martinwittemann)
       * Tristan Koch (tristankoch)
  
  ************************************************************************ */

  /* ************************************************************************
  ************************************************************************ */

  /**
   *
   * @asset(qx/test/*)
   * @ignore(qx.data.model, qx.test.O, qx.test.M, qx.test.M1, qx.test.M2)
   * @require(qx.io.request.Xhr)
   */
  qx.Class.define("qx.test.data.store.Json", {
    extend: qx.dev.unit.TestCase,
    include: qx.dev.unit.MMock,
    members: {
      __store__P_242_0: null,
      __data__P_242_1: null,
      __propertyNames__P_242_2: null,

      /**
       * @lint ignoreDeprecated(eval)
       */
      setUp: function setUp() {
        this.__store__P_242_0 = new qx.data.store.Json();
        this.__data__P_242_1 = eval("({s: 'String', n: 12, b: true})");
        this.__propertyNames__P_242_2 = ["s", "n", "b"];
        this.url = qx.util.ResourceManager.getInstance().toUri("qx/test/primitive.json");
      },
      setUpFakeRequest: function setUpFakeRequest() {
        var req = this.request = new qx.io.request.Xhr(this.url);

        req.send = req.setParser = function () {};

        req.dispose = qx.io.request.Xhr.prototype.dispose;
        this.stub(qx.io.request, "Xhr").returns(this.stub(req));
      },
      tearDown: function tearDown() {
        this.getSandbox().restore();

        if (this.request) {
          // Restore manually (is unreachable from sandbox)
          if (typeof this.request.dispose.restore == "function") {
            this.request.dispose.restore();
          } // Dispose


          this.request.dispose();
        }

        this.__store__P_242_0.dispose(); // Remove the former created classes


        qx.data.model = {};

        for (var name in qx.Class.$$registry) {
          if (name.search("qx.data.model") != -1) {
            delete qx.Class.$$registry[name];
          }
        }
      },
      testConfigureNewTransportConstructor: function testConfigureNewTransportConstructor() {
        var store = new qx.data.store.Json(this.url, null, false);
        store.dispose();
      },
      testLoadUrl: function testLoadUrl() {
        this.__store__P_242_0.addListener("loaded", function () {
          this.resume(function () {
            var model = this.__store__P_242_0.getModel();

            this.assertEquals("String", model.getString(), "The model is not created how it should!");
          }, this);
        }, this);

        var url = this.url;

        this.__store__P_242_0.setUrl(url);

        this.wait();
      },
      testProgressStates: function testProgressStates() {
        var url = this.url,
            states = [];

        this.__store__P_242_0.addListener("changeState", function (evt) {
          var state = evt.getData();
          states.push(state);

          if (state == "completed") {
            this.resume(function () {
              var expected = ["configured", "sending", "receiving", "completed"];
              this.assertArrayEquals(expected, states);
            });
          }
        }, this);

        this.__store__P_242_0.setUrl(url);

        this.wait();
      },
      testLoadResource: function testLoadResource() {
        this.__store__P_242_0.addListener("loaded", function () {
          this.resume(function () {
            var model = this.__store__P_242_0.getModel();

            this.assertEquals("String", model.getString(), "The model is not created how it should!");
          }, this);
        }, this);

        var resource = "qx/test/primitive.json";

        this.__store__P_242_0.setUrl(resource);

        this.wait();
      },
      testParseErrorForResource: function testParseErrorForResource() {
        this.__store__P_242_0.addListener("parseError", function (ev) {
          this.resume(function () {
            this.assertString(ev.getData().response, "Parse error object does not contain response!");
            this.assertObject(ev.getData().error, "Parse error object does not contain parser exception!");
          }, this);
        }, this);

        var resource = "qx/test/failing.json";

        this.__store__P_242_0.setUrl(resource);

        this.wait();
      },
      testLoadAlias: function testLoadAlias() {
        this.__store__P_242_0.addListener("loaded", function () {
          this.resume(function () {
            var model = this.__store__P_242_0.getModel();

            this.assertEquals("String", model.getString(), "The model is not created how it should!");
            qx.util.AliasManager.getInstance().remove("testLoadResource");
          }, this);
        }, this); // invoke alias handling


        qx.util.AliasManager.getInstance().add("testLoadResource", "qx/test");
        var alias = "testLoadResource/primitive.json";

        this.__store__P_242_0.setUrl(alias);

        this.wait();
      },
      testDispose: function testDispose() {
        this.__store__P_242_0.setUrl(this.url);

        this.__store__P_242_0.dispose();
      },
      testWholePrimitive: function testWholePrimitive() {
        this.__store__P_242_0.addListener("loaded", function () {
          this.resume(function () {
            var model = this.__store__P_242_0.getModel();

            this.assertEquals("String", model.getString(), "The model is not created how it should!");
            this.assertEquals(12, model.getNumber(), "The model is not created how it should!");
            this.assertEquals(true, model.getBoolean(), "The model is not created how it should!");
            this.assertNull(model.getNull(), "The model is not created how it should!");
          }, this);
        }, this);

        var url = this.url;

        this.__store__P_242_0.setUrl(url);

        this.wait();
      },
      testWholeArray: function testWholeArray() {
        this.__store__P_242_0.addListener("loaded", function () {
          this.resume(function () {
            var model = this.__store__P_242_0.getModel();

            this.assertNotNull(model.getArray(), "The model is not created how it should!");
            this.assertEquals("qx.data.Array", model.getArray().classname, "Wrong array class.");
            this.assertEquals("a", model.getArray().getItem(0), "Wrong content of the array.");
            this.assertEquals("b", model.getArray().getItem(1), "Wrong content of the array.");
            this.assertEquals("c", model.getArray().getItem(2), "Wrong content of the array.");
          }, this);
        }, this);

        var url = qx.util.ResourceManager.getInstance().toUri("qx/test/array.json");

        this.__store__P_242_0.setUrl(url);

        this.wait();
      },
      testWholeObject: function testWholeObject() {
        this.__store__P_242_0.addListener("loaded", function () {
          this.resume(function () {
            var model = this.__store__P_242_0.getModel();

            this.assertNotNull(model.getO(), "The model is not created how it should!");
            this.assertEquals("a", model.getO().getA(), "Wrong content of the object.");
            this.assertEquals("b", model.getO().getB(), "Wrong content of the object.");
          }, this);
        }, this);

        var url = qx.util.ResourceManager.getInstance().toUri("qx/test/object.json");

        this.__store__P_242_0.setUrl(url);

        this.wait();
      },
      testOwnClassWith: function testOwnClassWith() {
        // define a test class
        qx.Class.define("qx.test.AB", {
          extend: qx.core.Object,
          properties: {
            a: {
              check: "String",
              event: "changeA"
            },
            b: {
              check: "String",
              event: "changeB"
            }
          }
        });
        var delegate = {
          getModelClass: function getModelClass(properties) {
            if (properties == 'a|b' || properties == 'a|b♥') {
              return qx.Class.getByName("qx.test.AB");
            }

            return null;
          }
        };
        this.__store__P_242_0 = new qx.data.store.Json(null, delegate);

        this.__store__P_242_0.addListener("loaded", function () {
          this.resume(function () {
            var model = this.__store__P_242_0.getModel();

            this.assertNotNull(model.getO(), "The model is not created how it should!");
            this.assertEquals("qx.test.AB", model.getO().classname, "Not the given class used!");
            this.assertEquals("a", model.getO().getA(), "Wrong content of the object.");
            this.assertEquals("b", model.getO().getB(), "Wrong content of the object.");
          }, this);
        }, this);

        var url = qx.util.ResourceManager.getInstance().toUri("qx/test/object.json");

        this.__store__P_242_0.setUrl(url);

        this.wait();
      },
      testOwnClassWithout: function testOwnClassWithout() {
        var delegate = {
          getModelClass: function getModelClass(properties) {
            return null;
          }
        };
        this.__store__P_242_0 = new qx.data.store.Json(null, delegate);

        this.__store__P_242_0.addListener("loaded", function () {
          this.resume(function () {
            var model = this.__store__P_242_0.getModel();

            this.assertNotNull(model.getO(), "The model is not created how it should!");
            this.assertEquals("a", model.getO().getA(), "Wrong content of the object.");
            this.assertEquals("b", model.getO().getB(), "Wrong content of the object.");
          }, this);
        }, this);

        var url = qx.util.ResourceManager.getInstance().toUri("qx/test/object.json");

        this.__store__P_242_0.setUrl(url);

        this.wait();
      },
      testOwnSuperclassWith: function testOwnSuperclassWith() {
        // define a test class
        qx.Class.define("qx.test.O", {
          extend: qx.core.Object
        });
        var delegate = {
          getModelSuperClass: function getModelSuperClass(properties) {
            return qx.test.O;
          }
        };
        this.__store__P_242_0 = new qx.data.store.Json(null, delegate);

        this.__store__P_242_0.addListener("loaded", function () {
          this.resume(function () {
            var model = this.__store__P_242_0.getModel();

            this.assertTrue(qx.Class.isSubClassOf(model.constructor, qx.test.O));
            this.assertNotNull(model.getO(), "The model is not created how it should!");
            this.assertTrue(qx.Class.isSubClassOf(model.getO().constructor, qx.test.O));
            this.assertEquals("a", model.getO().getA(), "Wrong content of the object.");
            this.assertEquals("b", model.getO().getB(), "Wrong content of the object.");
          }, this);
        }, this);

        var url = qx.util.ResourceManager.getInstance().toUri("qx/test/object.json");

        this.__store__P_242_0.setUrl(url);

        this.wait();
      },
      testOwnSuperclassWithout: function testOwnSuperclassWithout() {
        // define a test class
        qx.Class.define("qx.test.O", {
          extend: qx.core.Object
        });
        var delegate = {
          getModelSuperClass: function getModelSuperClass(properties) {
            return null;
          }
        };
        this.__store__P_242_0 = new qx.data.store.Json(null, delegate);

        this.__store__P_242_0.addListener("loaded", function () {
          this.resume(function () {
            var model = this.__store__P_242_0.getModel();

            this.assertNotNull(model.getO(), "The model is not created how it should!");
            this.assertEquals("a", model.getO().getA(), "Wrong content of the object.");
            this.assertEquals("b", model.getO().getB(), "Wrong content of the object.");
          }, this);
        }, this);

        var url = qx.util.ResourceManager.getInstance().toUri("qx/test/object.json");

        this.__store__P_242_0.setUrl(url);

        this.wait();
      },
      testOwnMixinWithout: function testOwnMixinWithout() {
        var delegate = {
          getModelMixins: function getModelMixins(properties) {
            return null;
          }
        };
        this.__store__P_242_0 = new qx.data.store.Json(null, delegate);

        this.__store__P_242_0.addListener("loaded", function () {
          this.resume(function () {
            var model = this.__store__P_242_0.getModel();

            this.assertNotNull(model.getO(), "The model is not created how it should!");
            this.assertEquals("a", model.getO().getA(), "Wrong content of the object.");
            this.assertEquals("b", model.getO().getB(), "Wrong content of the object.");
          }, this);
        }, this);

        var url = qx.util.ResourceManager.getInstance().toUri("qx/test/object.json");

        this.__store__P_242_0.setUrl(url);

        this.wait();
      },
      testOwnMixinWith: function testOwnMixinWith() {
        // define a test class
        qx.Mixin.define("qx.test.M", {
          members: {
            a: function a() {
              return true;
            }
          }
        });
        var delegate = {
          getModelMixins: function getModelMixins(properties) {
            return qx.test.M;
          }
        };
        this.__store__P_242_0 = new qx.data.store.Json(null, delegate);

        this.__store__P_242_0.addListener("loaded", function () {
          this.resume(function () {
            var model = this.__store__P_242_0.getModel();

            this.assertTrue(model.a(), "Mixin not included.");
            this.assertNotNull(model.getO(), "The model is not created how it should!");
            this.assertTrue(model.getO().a(), "Mixin not included.");
            this.assertEquals("a", model.getO().getA(), "Wrong content of the object.");
            this.assertEquals("b", model.getO().getB(), "Wrong content of the object.");
          }, this);
        }, this);

        var url = qx.util.ResourceManager.getInstance().toUri("qx/test/object.json");

        this.__store__P_242_0.setUrl(url);

        this.wait();
      },
      testOwnMixinWithMultiple: function testOwnMixinWithMultiple() {
        // define a test class
        qx.Mixin.define("qx.test.M1", {
          members: {
            a: function a() {
              return true;
            }
          }
        });
        qx.Mixin.define("qx.test.M2", {
          members: {
            b: function b() {
              return true;
            }
          }
        });
        var delegate = {
          getModelMixins: function getModelMixins(properties) {
            return [qx.test.M1, qx.test.M2];
          }
        };
        this.__store__P_242_0 = new qx.data.store.Json(null, delegate);

        this.__store__P_242_0.addListener("loaded", function () {
          this.resume(function () {
            var model = this.__store__P_242_0.getModel();

            this.assertTrue(model.a(), "Mixin not included.");
            this.assertTrue(model.b(), "Mixin not included.");
            this.assertNotNull(model.getO(), "The model is not created how it should!");
            this.assertTrue(model.getO().a(), "Mixin not included.");
            this.assertEquals("a", model.getO().getA(), "Wrong content of the object.");
            this.assertEquals("b", model.getO().getB(), "Wrong content of the object.");
          }, this);
        }, this);

        var url = qx.util.ResourceManager.getInstance().toUri("qx/test/object.json");

        this.__store__P_242_0.setUrl(url);

        this.wait();
      },
      testManipulatePrimitive: function testManipulatePrimitive() {
        var delegate = {
          manipulateData: function manipulateData(data) {
            return data;
          }
        };
        this.spy(delegate, "manipulateData");

        this.__store__P_242_0.dispose();

        this.__store__P_242_0 = new qx.data.store.Json(null, delegate);

        this.__store__P_242_0.addListener("loaded", function () {
          this.resume(function () {
            this.assertCalled(delegate.manipulateData);
          }, this);
        }, this);

        var url = this.url;

        this.__store__P_242_0.setUrl(url);

        this.wait();
      },
      testConfigureRequestPrimitive: function testConfigureRequestPrimitive() {
        var delegate,
            self = this;
        delegate = {
          configureRequest: function configureRequest(request) {
            self.assertInstance(request, qx.io.request.Xhr);
          }
        };
        this.spy(delegate, "configureRequest");

        this.__store__P_242_0.dispose();

        this.__store__P_242_0 = new qx.data.store.Json(null, delegate);

        this.__store__P_242_0.addListener("loaded", function () {
          this.resume(function () {
            this.assertCalled(delegate.configureRequest);
          }, this);
        }, this);

        var url = this.url;

        this.__store__P_242_0.setUrl(url);

        this.wait();
      },
      testDisposeOldModel: function testDisposeOldModel() {
        this.__store__P_242_0.addListener("loaded", function () {
          this.resume(function () {
            var model = this.__store__P_242_0.getModel(); // check if the new model is not the old model


            this.assertNotEquals(fakeModel, model); // check if the old model has been disposed

            this.assertTrue(fakeModel.isDisposed());
          }, this);
        }, this); // set a fake model


        var fakeModel = new qx.core.Object();

        this.__store__P_242_0.setModel(fakeModel);

        var url = this.url;

        this.__store__P_242_0.setUrl(url);

        this.wait();
      },
      testDisposeRequest: function testDisposeRequest() {
        this.setUpFakeRequest();

        this.__store__P_242_0.setUrl(this.url);

        this.__store__P_242_0.dispose();

        this.assertCalled(this.request.dispose);
      },
      testDisposeRequestDone: function testDisposeRequestDone() {
        this.setUpFakeRequest();
        var url = this.url;

        this.__store__P_242_0.addListener("loaded", function () {
          this.resume(function () {
            this.__store__P_242_0.dispose();

            this.assertCalled(this.request.dispose);
          }, this);
        }, this);

        this.__store__P_242_0.setUrl(url);
      },
      testErrorEvent: function testErrorEvent() {
        this.__store__P_242_0.addListener("error", function (ev) {
          this.resume(function () {
            this.assertNotNull(ev);
          }, this);
        }, this);

        this.__store__P_242_0.setUrl("not-found");

        this.wait();
      },
      "test Internal Server Error": function testInternalServerError() {
        this.useFakeServer();
        var server = this.getServer();
        server.respondWith("GET", "/foo", [500, {
          "Content-Type": "application/json"
        }, "SERVER ERROR"]);

        this.__store__P_242_0.addListener("error", function (e) {
          this.resume(function () {
            this.assertTrue(e.getData().getPhase() == "statusError");
          });
        }, this);

        qx.event.Timer.once(function () {
          this.__store__P_242_0.setUrl("/foo");

          server.respond();
        }, this, 500);
        this.wait(1000);
      }
    }
  });
  qx.test.data.store.Json.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Json.js.map?dt=1601118687739