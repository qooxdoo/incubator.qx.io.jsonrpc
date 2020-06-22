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
      "qx.test.io.MRemoteTest": {
        "require": true
      },
      "qx.dev.unit.MRequirements": {
        "require": true
      },
      "qx.dev.unit.MMock": {
        "require": true
      },
      "qx.bom.request.Jsonp": {},
      "qx.bom.client.Engine": {},
      "qx.bom.client.Browser": {},
      "qx.dev.unit.RequirementError": {}
    },
    "environment": {
      "provided": [],
      "required": {
        "engine.name": {
          "className": "qx.bom.client.Engine"
        },
        "browser.documentmode": {
          "className": "qx.bom.client.Browser"
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
       * Tristan Koch (tristankoch)
  
  ************************************************************************ */

  /* ************************************************************************
  
  
  ************************************************************************ */

  /* ************************************************************************
  
  
  ************************************************************************ */

  /**
   *
   * @asset(qx/test/script.js)
   * @asset(qx/test/jsonp_primitive.php)
   *
   * @ignore(myExistingCallback)
   */
  qx.Class.define("qx.test.bom.request.Jsonp", {
    extend: qx.dev.unit.TestCase,
    include: [qx.test.io.MRemoteTest, qx.dev.unit.MRequirements, qx.dev.unit.MMock],
    members: {
      setUp: function setUp() {
        this.require(["php"]);

        var req = this.req = new qx.bom.request.Jsonp();
        this.url = this.getUrl("qx/test/jsonp_primitive.php"); // Assume timeout after 1s in Opera (no error!)

        if (qx.core.Environment.get("engine.name") === "opera") {
          req.timeout = 1000;
        }
      },
      tearDown: function tearDown() {
        window.SCRIPT_LOADED = undefined;
        this.getSandbox().restore();
        this.req.dispose();
      },
      //
      // Callback
      //
      "test: setCallbackParam()": function testSetCallbackParam() {
        var req = this.req;
        req.setCallbackParam("myMethod");
        req.open("GET", this.url);
        req.send();
        this.assertMatch(req._getUrl(), /(myMethod=)/);
      },
      "test: setCallbackName()": function testSetCallbackName() {
        var req = this.req;
        req.setCallbackName("myCallback");
        req.open("GET", this.url);
        req.send();
        this.assertMatch(req._getUrl(), /(=myCallback)/);
      },
      "test: has default callback param and name": function testHasDefaultCallbackParamAndName() {
        var req = this.req,
            regExp;
        req.open("GET", this.url);
        req.send(); // String is URL encoded

        regExp = /\?callback=qx\.bom\.request\.Jsonp.*\d{16,}.*\.callback/;
        this.assertMatch(req._getUrl(), regExp);
      },

      /**
       * @ignore(myExistingCallback)
       */
      "test: not overwrite existing callback": function testNotOverwriteExistingCallback() {
        var that = this; // User provided callback that must not be overwritten

        window.myExistingCallback = function () {
          return "Affe";
        };

        this.req.setCallbackName("myExistingCallback");

        this.req.onload = function () {
          that.resume(function () {
            that.assertEquals("Affe", myExistingCallback());
            window.myExistingCallback = undefined;
          });
        };

        this.request();
        this.wait();
      },
      //
      // Properties
      //
      "test: responseJson holds response with default callback": function testResponseJsonHoldsResponseWithDefaultCallback() {
        var that = this;

        this.req.onload = function () {
          that.resume(function () {
            var data = this.req.responseJson;
            that.assertObject(data);
            that.assertTrue(data["boolean"]);
          });
        };

        this.request();
        this.wait();
      },
      "test: reset responseJson when reopened": function testResetResponseJsonWhenReopened() {
        var req = this.req,
            that = this;

        req.onload = function () {
          that.resume(function () {
            req.open("GET", "/url");
            that.assertNull(req.responseJson);
          });
        };

        this.request();
        this.wait();
      },
      "test: status indicates success when default callback called": function testStatusIndicatesSuccessWhenDefaultCallbackCalled() {
        var that = this;

        this.req.onload = function () {
          that.resume(function () {
            that.assertEquals(200, that.req.status);
          });
        };

        this.request();
        this.wait();
      },
      "test: status indicates success when custom callback called": function testStatusIndicatesSuccessWhenCustomCallbackCalled() {
        var that = this;

        this.req.onload = function () {
          that.resume(function () {
            that.assertEquals(200, that.req.status);
          });
        };

        this.req.setCallbackName("myCallback");
        this.request();
        this.wait();
      },
      // Error handling
      "test: status indicates failure when default callback not called": function testStatusIndicatesFailureWhenDefaultCallbackNotCalled() {
        var that = this;

        this.req.onload = function () {
          that.resume(function () {
            that.assertEquals(500, that.req.status);
          });
        };

        this.request(this.getUrl("qx/test/script.js"));
        this.wait();
      },
      "test: status indicates failure when custom callback not called": function testStatusIndicatesFailureWhenCustomCallbackNotCalled() {
        var that = this;

        this.req.onload = function () {
          that.resume(function () {
            that.assertEquals(500, that.req.status);
          });
        };

        this.req.setCallbackName("myCallback");
        this.request(this.getUrl("qx/test/script.js"));
        this.wait();
      },
      "test: status indicates failure when callback not called on second request": function testStatusIndicatesFailureWhenCallbackNotCalledOnSecondRequest() {
        var count = 0,
            req = this.req,
            that = this;

        req.onload = function () {
          count += 1;

          if (count == 2) {
            that.resume(function () {
              that.assertEquals(500, req.status);
            });
            return;
          }

          that.request(that.getUrl("qx/test/script.js"));
        };

        this.request();
        this.wait();
      },
      //
      // Event handlers
      //
      "test: call onload": function testCallOnload() {
        var that = this;

        this.req.onload = function () {
          that.resume(function () {});
        };

        this.request();
        this.wait();
      },
      // Error handling
      "test: call onerror on network error": function testCallOnerrorOnNetworkError() {
        var that = this; // For legacy IEs, timeout needs to be lower than browser timeout
        // or false "load" is fired. Alternatively, a false "load"
        // can be identified by checking status property.

        if (qx.core.Environment.get("engine.name") == "mshtml" && qx.core.Environment.get("browser.documentmode") < 9) {
          this.req.timeout = 2000;
        }

        this.req.onerror = function () {
          that.resume(function () {});
        };

        this.request("http://fail.tld");
        this.wait(15100);
      },
      "test: call onloadend on network error": function testCallOnloadendOnNetworkError() {
        var that = this;

        this.req.onloadend = function () {
          that.resume(function () {});
        };

        this.request("http://fail.tld");
        this.wait(15100);
      },
      request: function request(customUrl) {
        this.req.open("GET", customUrl || this.url);
        this.req.send();
      },
      skip: function skip(msg) {
        throw new qx.dev.unit.RequirementError(null, msg);
      }
    }
  });
  qx.test.bom.request.Jsonp.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Jsonp.js.map?dt=1592867944922