qx.Class.define("qx.test.io.graphql.Request", {
  extend: qx.dev.unit.TestCase,
  include: [qx.test.io.MAssert],

  members: {

    "test: request can be converted to json": function() {
      const query = "query { SomeRandomStuff }";
      const variables = {'testKey': 'testValue'};

      const request = new qx.io.graphql.protocol.Request({query});
      request.setVariables(variables)

      const expected = "{\"query\":\"query { SomeRandomStuff }\",\"variables\":\"{\\\"testKey\\\":\\\"testValue\\\"}\"}"
      this.assertEquals(expected, request.toString())
    },

    "test: no variables in the final string": function() {
      const query = "query { SomeRandomStuff }";
      const request = new qx.io.graphql.protocol.Request({query});

      const expected = "{\"query\":\"query { SomeRandomStuff }\"}";
      this.assertEquals(expected, request.toString());
    },

    "test: variables can be bound": function() {
      const query = "query { SomeRandomStuff }";
      const variables = {'testKey': 'testValue'};
      const request = new qx.io.graphql.protocol.Request({query});
      request.setVariables(variables);

      const model = qx.data.marshal.Json.createModel({source: "test"})
      model.bind("source", request, "variables.testKey");
      model.setSource("newTestValue");

     const expected = "{\"query\":\"query { SomeRandomStuff  }\",\"variables\":\"{\\\"testKey\\\":\\\"newTestValue\\\"}\"}";
      this.assertEquals(expected, request.toString());
    }
  }
});

