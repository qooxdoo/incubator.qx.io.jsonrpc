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
      "qx.bom.client.Engine": {},
      "qx.bom.History": {},
      "qx.bom.client.Browser": {},
      "qx.bom.HashHistory": {},
      "qx.bom.IframeHistory": {},
      "qx.bom.client.Event": {},
      "qx.bom.NativeHistory": {}
    },
    "environment": {
      "provided": [],
      "required": {
        "engine.name": {
          "className": "qx.bom.client.Engine"
        },
        "browser.documentmode": {
          "className": "qx.bom.client.Browser"
        },
        "event.hashchange": {
          "className": "qx.bom.client.Event"
        }
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2007-2012 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Daniel Wagner (danielwagner)
       * Mustafa Sak (msak)
  
  ************************************************************************ */
  qx.Class.define("qx.test.bom.History", {
    extend: qx.dev.unit.TestCase,
    include: [qx.dev.unit.MRequirements],
    members: {
      __history__P_208_0: null,
      hasNoIe: function hasNoIe() {
        return qx.core.Environment.get("engine.name") !== "mshtml";
      },
      setUp: function setUp() {
        this.__history__P_208_0 = qx.bom.History.getInstance();
      },
      testInstance: function testInstance() {
        var runsInIframe = !(window == window.top);

        if (!this.$$instance) {
          // in iframe + IE9
          if (runsInIframe && qx.core.Environment.get("browser.documentmode") == 9) {
            this.assertInstance(this.__history__P_208_0, qx.bom.HashHistory);
          } // in iframe + IE<9
          else if (runsInIframe && qx.core.Environment.get("engine.name") == "mshtml" && qx.core.Environment.get("browser.documentmode") < 9) {
              this.assertInstance(this.__history__P_208_0, qx.bom.IframeHistory);
            } // browser with hashChange event
            else if (qx.core.Environment.get("event.hashchange")) {
                this.assertInstance(this.__history__P_208_0, qx.bom.NativeHistory);
              } // IE without hashChange event
              else if (qx.core.Environment.get("engine.name") == "mshtml") {
                  this.assertInstance(this.__history__P_208_0, qx.bom.IframeHistory);
                }
        }
      },
      testAddState: function testAddState() {
        this.__history__P_208_0.addToHistory("foo", "Title Foo");

        var self = this;
        window.setTimeout(function () {
          self.resume(function () {
            this.__checkState__P_208_1();
          }, self);
        }, 200);
        this.wait();
      },
      testNavigateBack: function testNavigateBack() {
        this.__history__P_208_0.addToHistory("foo", "Title Foo");

        var self = this;
        window.setTimeout(function () {
          self.resume(function () {
            this.__checkFooAndSetBar__P_208_2();
          }, self);
        }, 200);
        this.wait();
      },
      __checkFooAndSetBar__P_208_2: function __checkFooAndSetBar__P_208_2() {
        var self = this;
        this.assertEquals("foo", this.__history__P_208_0._readState(), "check1");

        this.__history__P_208_0.addToHistory("bar", "Title Bar");

        window.setTimeout(function () {
          self.resume(function () {
            this.__checkBarAndGoBack__P_208_3();
          }, self);
        }, 200);
        this.wait();
      },
      __checkBarAndGoBack__P_208_3: function __checkBarAndGoBack__P_208_3() {
        var self = this;
        this.assertEquals("bar", this.__history__P_208_0._readState(), "check2");
        history.back();
        window.setTimeout(function () {
          self.resume(function () {
            this.__checkState__P_208_1();
          }, self);
        }, 200);
        this.wait();
      },
      __checkState__P_208_1: function __checkState__P_208_1() {
        this.assertEquals("foo", this.__history__P_208_0._readState(), "check3");
        this.assertEquals("Title Foo", this.__history__P_208_0.getTitle());
      },
      testNavigateBackAfterSetState: function testNavigateBackAfterSetState() {
        this.__history__P_208_0.setState("affe");

        var self = this;
        window.setTimeout(function () {
          self.resume(function () {
            this.__setState_checkAffeAndSetFoo__P_208_4();
          }, self);
        }, 200);
        this.wait();
      },
      __setState_checkAffeAndSetFoo__P_208_4: function __setState_checkAffeAndSetFoo__P_208_4() {
        var self = this;
        this.assertEquals("affe", this.__history__P_208_0._readState(), "check0");

        this.__history__P_208_0.setState("foo");

        window.setTimeout(function () {
          self.resume(function () {
            this.__setState_checkFooAndSetBar__P_208_5();
          }, self);
        }, 200);
        this.wait();
      },
      __setState_checkFooAndSetBar__P_208_5: function __setState_checkFooAndSetBar__P_208_5() {
        var self = this;
        this.assertEquals("foo", this.__history__P_208_0._readState(), "check1");

        this.__history__P_208_0.setState("bar");

        window.setTimeout(function () {
          self.resume(function () {
            this.__setState_checkBarAndGoBack__P_208_6();
          }, self);
        }, 300);
        this.wait();
      },
      __setState_checkBarAndGoBack__P_208_6: function __setState_checkBarAndGoBack__P_208_6() {
        var self = this;
        this.assertEquals("bar", this.__history__P_208_0._readState(), "check2");
        history.back();
        window.setTimeout(function () {
          self.resume(function () {
            this.assertEquals("foo", this.__history__P_208_0._readState(), "check3");
          }, self);
        }, 200);
        this.wait();
      },
      testRequestEvent: function testRequestEvent() {
        // "request" event just will be fired, if a user goes back or forward in
        // the history
        var self = this;

        this.__history__P_208_0.addListenerOnce("request", function () {
          self.resume(function () {
            // "request" event has been fired
            this.assertTrue(true);
          }, self);
        }, this);

        this.__history__P_208_0.setState("bar");

        history.back();
        this.wait();
      },
      testRequestEventAddHistory: function testRequestEventAddHistory() {
        this.__history__P_208_0.addListenerOnce("request", function (ev) {
          this.resume(function () {
            this.assertEquals("baz", ev.getData());
          }, this);
        }, this);

        var self = this;
        window.setTimeout(function () {
          self.__history__P_208_0.addToHistory("baz");
        }, 250);
        this.wait(500);
      }
    }
  });
  qx.test.bom.History.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=History.js.map?dt=1596696220107