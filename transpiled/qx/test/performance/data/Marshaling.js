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
      "qx.dev.unit.MMeasure": {
        "require": true
      },
      "qx.data.marshal.Json": {}
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
  qx.Class.define("qx.test.performance.data.Marshaling", {
    extend: qx.dev.unit.TestCase,
    include: qx.dev.unit.MMeasure,
    members: {
      CREATE_ITERATIONS: 100000,
      __objects__P_265_0: null,
      __marshaler__P_265_1: null,
      setUp: function setUp() {
        this.__marshaler__P_265_1 = new qx.data.marshal.Json();
      },
      tearDown: function tearDown() {
        this.__marshaler__P_265_1.dispose();

        this.__marshaler__P_265_1 = null;
      },
      testJsonSimpleToClass: function testJsonSimpleToClass() {
        var data = {
          a: 10
        };
        var self = this;
        this.measure("simple json class creation", function () {
          for (var i = 0; i < self.CREATE_ITERATIONS; i++) {
            self.__marshaler__P_265_1.toClass(data);
          }
        }, function () {
          qx.Class.undefine("qx.data.model.a");
        }, this.CREATE_ITERATIONS);
      },
      testJsonSimpleToClassWithBubble: function testJsonSimpleToClassWithBubble() {
        var data = {
          a: 10
        };
        var self = this;
        this.measure("simple json class creation with bubble events", function () {
          for (var i = 0; i < self.CREATE_ITERATIONS; i++) {
            self.__marshaler__P_265_1.toClass(data, true);
          }
        }, function () {
          qx.Class.undefine("qx.data.model.a");
        }, this.CREATE_ITERATIONS);
      },
      testJsonSimpleToModel: function testJsonSimpleToModel() {
        var data = {
          a: 10
        };

        this.__marshaler__P_265_1.toClass(data);

        var self = this;
        this.__objects__P_265_0 = [];
        this.measure("simple json object creation", function () {
          for (var i = 0; i < self.CREATE_ITERATIONS; i++) {
            self.__objects__P_265_0.push(self.__marshaler__P_265_1.toModel(data));
          }
        }, function () {
          for (var i = 0; i < self.__objects__P_265_0.length; i++) {
            self.__objects__P_265_0[i].dispose();
          }

          qx.Class.undefine("qx.data.model.a");
        }, this.CREATE_ITERATIONS);
      }
    }
  });
  qx.test.performance.data.Marshaling.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Marshaling.js.map?dt=1599488363843