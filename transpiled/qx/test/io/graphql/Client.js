(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.dev.unit.TestCase": {
        "construct": true,
        "require": true
      },
      "qx.test.io.MAssert": {
        "require": true
      },
      "qx.io.graphql.Client": {
        "construct": true
      },
      "qx.io.graphql.protocol.Request": {},
      "qx.io.exception.Protocol": {},
      "qx.io.exception.Transport": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2020 Christian Boulanger
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Christian Boulanger (cboulanger)
  
  ************************************************************************ */
  qx.Class.define("qx.test.io.graphql.Client", {
    extend: qx.dev.unit.TestCase,
    include: [qx.test.io.MAssert],
    statics: {
      TEST_ENDPOINT: "https://countries-274616.ew.r.appspot.com/"
    },

    construct() {
      qx.dev.unit.TestCase.constructor.call(this);
      this.client = new qx.io.graphql.Client(this.constructor.TEST_ENDPOINT);
    },

    members: {
      async runQuery(query, expected) {
        let req = new qx.io.graphql.protocol.Request({
          query
        });
        let result = await this.client.send(req);
        this.assertDeepEquals(expected, result);
      },

      async runQueryWithVariables(query, variables, expected) {
        let req = new qx.io.graphql.protocol.Request({
          query
        });
        req.marshalVariables(variables);
        let result = await this.client.send(req);
        this.assertDeepEquals(expected, result);
      },

      async "test: execute query"() {
        await this.runQuery(`query {
          Country(name: "Switzerland") {
            name, nativeName, flag {svgFile},
            officialLanguages {name}
          }
        }`, {
          "Country": [{
            "name": "Switzerland",
            "nativeName": "Schweiz",
            "flag": {
              "svgFile": "https://restcountries.eu/data/che.svg"
            },
            "officialLanguages": [{
              "name": "Italian"
            }, {
              "name": "French"
            }, {
              "name": "German"
            }]
          }]
        });
      },

      async "test: execute query with variables"() {
        await this.runQueryWithVariables(`query($country:String!) {
         Country(name: $country) {
           nativeName
           officialLanguages { name }
         }
       }`, {
          "country": "Belgium"
        }, {
          "Country": [{
            "nativeName": "België",
            "officialLanguages": [{
              "name": "German"
            }, {
              "name": "French"
            }, {
              "name": "Dutch"
            }]
          }]
        });
      },

      async "test: expect protocol error"() {
        try {
          await this.runQuery(`query { invalid}`);
        } catch (e) {
          this.assertInstance(e, qx.io.exception.Protocol);
          this.assertEquals("Cannot query field \"invalid\" on type \"Query\".", e.message);
          return;
        }

        throw new Error("Query should throw qx.io.exception.Protocol");
      },

      async "test: expect transport error"() {
        try {
          let client = new qx.io.graphql.Client("https://doesnotexist.org/" + Math.random());
          let response = await client.send("query: { doesnotmatter }");
        } catch (e) {
          this.assertInstance(e, qx.io.exception.Transport);
          return;
        }

        throw new Error("Query should throw qx.io.exception.Transport");
      }

    }
  });
  qx.test.io.graphql.Client.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Client.js.map?dt=1599546978913