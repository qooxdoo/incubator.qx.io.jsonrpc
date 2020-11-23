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
      "qx.test.io.MAssert": {
        "require": true
      },
      "qx.io.graphql.protocol.Request": {},
      "qx.data.marshal.Json": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  qx.Class.define("qx.test.io.graphql.Request", {
    extend: qx.dev.unit.TestCase,
    include: [qx.test.io.MAssert],
    members: {
      "test: request can be converted to json": function testRequestCanBeConvertedToJson() {
        const query = "query { SomeRandomStuff }";
        const variables = {
          "testKey": "testValue"
        };
        const request = new qx.io.graphql.protocol.Request({
          query
        });
        request.setVariables(variables);
        const expected = "{\"query\":\"query { SomeRandomStuff }\",\"variables\":\"{\\\"testKey\\\":\\\"testValue\\\"}\"}";
        this.assertEquals(expected, request.toString());
      },
      "test: no variables in the final string": function testNoVariablesInTheFinalString() {
        const query = "query { SomeRandomStuff }";
        const request = new qx.io.graphql.protocol.Request({
          query
        });
        const expected = "{\"query\":\"query { SomeRandomStuff }\"}";
        this.assertEquals(expected, request.toString());
      },
      "test: variables can be bound": function testVariablesCanBeBound() {
        const query = "query { SomeRandomStuff }";
        const variables = {
          "testKey": "testValue"
        };
        const request = new qx.io.graphql.protocol.Request({
          query
        });
        request.setVariables(variables);
        const model = qx.data.marshal.Json.createModel({
          source: "test"
        });
        model.bind("source", request, "variables.testKey");
        model.setSource("newTestValue");
        this.assertMatch(request.toString(), /newTestValue/);
      }
    }
  });
  qx.test.io.graphql.Request.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Request.js.map?dt=1606149382258