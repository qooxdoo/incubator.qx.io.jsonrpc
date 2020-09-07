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
      "qx.bom.request.Script": {},
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

  /**
   *
   * @asset(qx/test/jsonp_primitive.php)
   * @asset(qx/test/script.js)
   * @asset(qx/test/xmlhttp/sample.txt)
   * @ignore(SCRIPT_LOADED)
   */
  qx.Class.define("qx.test.bom.request.Script", {
    extend: qx.dev.unit.TestCase,
    include: [qx.test.io.MRemoteTest, qx.dev.unit.MRequirements, qx.dev.unit.MMock],
    members: {
      setUp: function setUp() {
        var req = this.req = new qx.bom.request.Script();
        this.url = this.getUrl("qx/test/script.js"); // Assume timeout after 1s in Opera (no error!)

        if (qx.core.Environment.get("engine.name") === "opera") {
          req.timeout = 1000;
        }
      },
      tearDown: function tearDown() {
        this.getSandbox().restore();
        this.req.dispose();
      },
      //
      // General
      //
      "test: create instance": function testCreateInstance() {
        this.assertObject(this.req);
      },
      "test: dispose() removes script from DOM": function testDisposeRemovesScriptFromDOM() {
        var script;
        this.req.open();
        this.req.send();
        script = this.req._getScriptElement();
        this.req.dispose();
        this.assertFalse(this.isInDom(script));
      },
      "test: isDisposed()": function testIsDisposed() {
        this.assertFalse(this.req.isDisposed());
        this.req.dispose();
        this.assertTrue(this.req.isDisposed());
      },
      "test: allow many requests with same object": function testAllowManyRequestsWithSameObject() {
        var count = 0,
            that = this;

        this.req.onload = function () {
          count += 1;

          if (count == 2) {
            that.resume(function () {});
            return;
          }

          that.request();
        };

        this.request();
        this.wait();
      },
      //
      // Event helper
      //
      "test: call event handler": function testCallEventHandler() {
        var req = this.req;
        req.onevent = this.spy();

        req._emit("event");

        this.assertCalled(req.onevent);
      },
      "test: fire event": function testFireEvent() {
        var req = this.req;
        var event = this.spy();
        req.onevent = this.spy();
        req.on("event", event);

        req._emit("event");

        this.assertCalled(event);
      },
      //
      // Properties
      //
      "test: properties indicate success when request completed": function testPropertiesIndicateSuccessWhenRequestCompleted() {
        var that = this,
            req = this.req;

        req.onload = function () {
          that.resume(function () {
            that.assertEquals(4, req.readyState);
            that.assertEquals(200, req.status);
            that.assertEquals("200", req.statusText);
          });
        };

        this.request();
        this.wait();
      },

      /**
       * @ignore(SCRIPT_LOADED)
       */
      "test: status indicates success when determineSuccess returns true": function testStatusIndicatesSuccessWhenDetermineSuccessReturnsTrue() {
        var that = this;

        this.req.onload = function () {
          that.resume(function () {
            that.assertEquals(200, that.req.status);
          });
        };

        this.req.setDetermineSuccess(function () {
          return SCRIPT_LOADED === true;
        });
        this.request(this.getUrl("qx/test/script.js"));
        this.wait();
      },
      // Error handling
      "test: properties indicate failure when request failed": function testPropertiesIndicateFailureWhenRequestFailed() {
        // Known to fail in legacy IEs
        if (this.isIeBelow(9)) {
          this.skip();
        }

        var that = this,
            req = this.req;

        req.onerror = function () {
          that.resume(function () {
            that.assertEquals(4, req.readyState);
            that.assertEquals(0, req.status);
            that.assertNull(req.statusText);
          });
        };

        this.request("http://fail.tld");
        this.wait(15000);
      },
      "test: properties indicate failure when request timed out": function testPropertiesIndicateFailureWhenRequestTimedOut() {
        // Known to fail in legacy IEs
        if (this.isIeBelow(9)) {
          this.skip();
        }

        var that = this,
            req = this.req;
        req.timeout = 25;

        req.ontimeout = function () {
          that.resume(function () {
            that.assertEquals(4, req.readyState);
            that.assertEquals(0, req.status);
            that.assertNull(req.statusText);
          });
        };

        this.requestPending();
        this.wait();
      },
      "test: status indicates failure when determineSuccess returns false": function testStatusIndicatesFailureWhenDetermineSuccessReturnsFalse() {
        var that = this;

        this.req.onload = function () {
          that.resume(function () {
            that.assertEquals(500, that.req.status);
          });
        };

        this.req.setDetermineSuccess(function () {
          return false;
        });
        this.request();
        this.wait();
      },
      "test: reset XHR properties when reopened": function testResetXHRPropertiesWhenReopened() {
        var req = this.req,
            that = this;

        req.onload = function () {
          that.resume(function () {
            req.open("GET", "/url");
            that.assertIdentical(1, req.readyState);
            that.assertIdentical(0, req.status);
            that.assertIdentical("", req.statusText);
          });
        };

        this.request();
        this.wait();
      },
      //
      // open()
      //
      "test: open() stores URL": function testOpenStoresURL() {
        this.req.open("GET", this.url);
        this.assertEquals(this.url, this.req._getUrl());
      },
      //
      // send()
      //
      "test: send() adds script element to DOM": function testSendAddsScriptElementToDOM() {
        var req = this.req; // Helper triggers send()

        this.request();
        this.assert(this.isInDom(req._getScriptElement()), "Script element not in DOM");
      },
      "test: send() sets script src to URL": function testSendSetsScriptSrcToURL() {
        this.request();
        this.assertMatch(this.req._getScriptElement().src, /qx\/test\/script.js$/);
      },
      "test: send() with data": function testSendWithData() {
        this.skip();
      },
      //
      // abort()
      //
      "test: abort() removes script element": function testAbortRemovesScriptElement() {
        var req = this.req;
        this.requestPending();
        req.abort();
        this.assertFalse(this.isInDom(req._getScriptElement()), "Script element in DOM");
      },
      "test: abort() makes request not fire load": function testAbortMakesRequestNotFireLoad() {
        var req = this.req;
        this.spy(req, "onload");

        if (this.isIe()) {
          this.request(this.noCache(this.url));
        } else {
          this.request();
        }

        req.abort();
        this.wait(300, function () {
          this.assertNotCalled(req.onload);
        }, this);
      },
      //
      // setRequestHeader()
      //
      "test: setRequestHeader() throws error when other than OPENED": function testSetRequestHeaderThrowsErrorWhenOtherThanOPENED() {
        var req = this.req;
        this.assertException(function () {
          req.setRequestHeader();
        }, null, "Invalid state");
      },
      "test: setRequestHeader() appends to URL": function testSetRequestHeaderAppendsToURL() {
        var req = this.req;
        req.open("GET", "/affe");
        req.setRequestHeader("key1", "value1");
        req.setRequestHeader("key2", "value2");
        this.assertMatch(req._getUrl(), /key1=value1/);
        this.assertMatch(req._getUrl(), /key2=value2/);
      },
      //
      // Event handlers
      //
      "test: call onload": function testCallOnload() {
        // More precisely, the request completes when the browser
        // has loaded and parsed the script
        var that = this;

        this.req.onload = function () {
          that.resume(function () {});
        };

        this.request();
        this.wait();
      },
      "test: call onreadystatechange and have appropriate readyState": function testCallOnreadystatechangeAndHaveAppropriateReadyState() {
        var req = this.req,
            readyStates = [],
            that = this;

        req.onreadystatechange = function () {
          readyStates.push(req.readyState);

          if (req.readyState === 4) {
            that.resume(function () {
              that.assertArrayEquals([1, 2, 3, 4], readyStates);
            });
          }
        };

        if (this.isIe()) {
          this.request(this.noCache(this.url));
        } else {
          this.request();
        }

        this.wait();
      },
      // Error handling
      "test: call onloadend on network error": function testCallOnloadendOnNetworkError() {
        var that = this;

        this.req.onloadend = function () {
          that.resume(function () {});
        };

        this.request("http://fail.tld");
        this.wait(15000);
      },
      "test: call onloadend when request completes": function testCallOnloadendWhenRequestCompletes() {
        var that = this;

        this.req.onloadend = function () {
          that.resume(function () {});
        };

        this.request();
        this.wait();
      },
      "test: not call onload when loading failed because of network error": function testNotCallOnloadWhenLoadingFailedBecauseOfNetworkError() {
        // Known to fail in IE < 9,
        // i.e. all browsers using onreadystatechange event handlerattribute
        //
        // After a short delay, readyState progresses to "loaded" even
        // though the resource could not be loaded.
        if (this.isIeBelow(9)) {
          this.skip();
        }

        var that = this;

        this.req.onload = function () {
          that.resume(function () {
            throw Error("Called onload");
          });
        };

        this.req.onerror = function () {
          that.resume();
        };

        this.request("http://fail.tld");
        this.wait(15000);
      },
      "test: call onerror on network error": function testCallOnerrorOnNetworkError() {
        // Known to fail in legacy IEs
        if (this.isIeBelow(9)) {
          this.skip();
        }

        var that = this;

        this.req.onerror = function () {
          that.resume(function () {});
        };

        this.request("http://fail.tld");
        this.wait(15000);
      },
      "test: call onerror on invalid script": function testCallOnerrorOnInvalidScript() {
        // Known to fail in all browsers tested
        // Native "error" event not fired for script element.
        //
        // A possible work-around is to listen to the global "error"
        // event dispatched on the window.
        this.skip();
        var that = this;

        this.req.onerror = function () {
          that.resume(function () {});
        }; // Invalid JavaScript


        this.request(this.getUrl("qx/test/xmlhttp/sample.txt"));
        this.wait();
      },
      "test: not call onerror when request exceeds timeout limit": function testNotCallOnerrorWhenRequestExceedsTimeoutLimit() {
        var req = this.req; // Known to fail in browsers not supporting the error event
        // because timeouts are used to fake the "error"

        if (!this.supportsErrorHandler()) {
          this.skip();
        }

        this.spy(req, "onerror");
        req.timeout = 25;
        this.requestPending();
        this.wait(20, function () {
          this.assertNotCalled(req.onerror);
        }, this);
      },
      "test: call ontimeout when request exceeds timeout limit": function testCallOntimeoutWhenRequestExceedsTimeoutLimit() {
        // Known to fail in legacy IEs
        if (this.isIeBelow(9)) {
          this.skip();
        }

        var that = this;
        this.req.timeout = 25;

        this.req.ontimeout = function () {
          that.resume(function () {});
        };

        this.requestPending();
        this.wait();
      },
      "test: not call ontimeout when request is within timeout limit": function testNotCallOntimeoutWhenRequestIsWithinTimeoutLimit() {
        var req = this.req,
            that = this;
        this.spy(req, "ontimeout");

        req.onload = function () {
          that.resume(function () {
            // Assert that onload() cancels timeout
            that.wait(350, function () {
              that.assertNotCalled(req.ontimeout);
            });
          });
        };

        req.timeout = 300;
        this.request();
        this.wait();
      },
      "test: call onabort when request was aborted": function testCallOnabortWhenRequestWasAborted() {
        var req = this.req;
        this.spy(req, "onabort");
        this.request();
        req.abort();
        this.assertCalled(req.onabort);
      },
      //
      // Clean-Up
      //
      "test: remove script from DOM when request completed": function testRemoveScriptFromDOMWhenRequestCompleted() {
        var script,
            that = this;

        this.req.onload = function () {
          that.resume(function () {
            script = this.req._getScriptElement();
            that.assertFalse(that.isInDom(script));
          });
        };

        this.request();
        this.wait();
      },
      "test: remove script from DOM when request failed": function testRemoveScriptFromDOMWhenRequestFailed() {
        var script,
            that = this; // In IE < 9, "load" is fired instead of "error"

        this.req.onerror = this.req.onload = function () {
          that.resume(function () {
            script = this.req._getScriptElement();
            that.assertFalse(that.isInDom(script));
          });
        };

        this.request("http://fail.tld");
        this.wait(15000);
      },
      "test: remove script from DOM when request timed out": function testRemoveScriptFromDOMWhenRequestTimedOut() {
        // Known to fail in legacy IEs
        if (this.isIeBelow(9)) {
          this.skip();
        }

        var script,
            that = this;
        this.req.timeout = 25;

        this.req.ontimeout = function () {
          that.resume(function () {
            script = that.req._getScriptElement();
            that.assertFalse(that.isInDom(script));
          });
        };

        this.requestPending();
        this.wait();
      },
      request: function request(customUrl) {
        this.req.open("GET", customUrl || this.url, true);
        this.req.send();
      },
      requestPending: function requestPending(sleep) {
        this.require(["php"]);

        var url = this.noCache(this.getUrl("qx/test/jsonp_primitive.php")); // In legacy browser, a long running script request blocks subsequent requests
        // even if the script element is removed. Keep duration very low to work around.
        //
        // Sleep 50ms

        url += "&sleep=" + (sleep || 50);
        this.request(url);
      },
      isInDom: function isInDom(elem) {
        return elem.parentNode ? true : false;
      },
      isIe: function isIe(version) {
        return qx.core.Environment.get("engine.name") === "mshtml";
      },
      isIeBelow: function isIeBelow(version) {
        return qx.core.Environment.get("engine.name") === "mshtml" && qx.core.Environment.get("browser.documentmode") < version;
      },
      supportsErrorHandler: function supportsErrorHandler() {
        var isLegacyIe = qx.core.Environment.get("engine.name") === "mshtml" && qx.core.Environment.get("browser.documentmode") < 9;
        var isOpera = qx.core.Environment.get("engine.name") === "opera";
        return !(isLegacyIe || isOpera);
      },
      noCache: function noCache(url) {
        return url + "?nocache=" + new Date().valueOf();
      },
      skip: function skip(msg) {
        throw new qx.dev.unit.RequirementError(null, msg);
      }
    }
  });
  qx.test.bom.request.Script.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Script.js.map?dt=1599462391790