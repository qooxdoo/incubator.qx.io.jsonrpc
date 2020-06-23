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
      "qx.theme.manager.Color": {},
      "qx.test.Theme": {},
      "qx.Theme": {},
      "qx.theme.indigo.Color": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2012 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Martin Wittemann (wittemann)
  
  ************************************************************************ */
  qx.Class.define("qx.test.theme.manager.Color", {
    extend: qx.dev.unit.TestCase,
    members: {
      __formerTheme__P_272_0: null,
      setUp: function setUp() {
        this.manager = qx.theme.manager.Color.getInstance();
        this.__formerTheme__P_272_0 = this.manager.getTheme();
      },
      tearDown: function tearDown() {
        qx.test.Theme.themes = null;
        this.manager.setTheme(this.__formerTheme__P_272_0);
        this.__formerTheme__P_272_0 = null;
      },
      testInclude: function testInclude() {
        qx.Theme.define("qx.test.Theme.themes.A", {
          extend: qx.theme.indigo.Color,
          colors: {
            "a": "#111111",
            "b": "#222222",
            "c": "#333333"
          }
        });
        this.manager.setTheme(qx.test.Theme.themes.A);
        var theme = this.manager.getTheme();
        this.assertEquals("#111111", theme.colors["a"]);
        this.assertEquals("#222222", theme.colors["b"]);
        this.assertEquals("#333333", theme.colors["c"]);
      },
      testResolve: function testResolve() {
        qx.Theme.define("qx.test.Theme.themes.A", {
          extend: qx.theme.indigo.Color,
          colors: {
            "a": "#111111",
            "b": "#222222",
            "c": "#333333"
          }
        });
        this.manager.setTheme(qx.test.Theme.themes.A);
        this.assertEquals("#111111", this.manager.resolve("a"));
        this.assertEquals("#222222", this.manager.resolve("b"));
        this.assertEquals("#333333", this.manager.resolve("c"));
        this.assertEquals("d", this.manager.resolve("d"));
      },
      testResolveSelfReference: function testResolveSelfReference() {
        qx.Theme.define("qx.test.Theme.themes.A", {
          extend: qx.theme.indigo.Color,
          colors: {
            "a": "#111111",
            "b": "a",
            "c": "b"
          }
        });
        this.manager.setTheme(qx.test.Theme.themes.A);
        this.assertEquals("#111111", this.manager.resolve("a"));
        this.assertEquals("#111111", this.manager.resolve("b"));
        this.assertEquals("#111111", this.manager.resolve("c"));
      },
      testResolveException: function testResolveException() {
        qx.Theme.define("qx.test.Theme.themes.A", {
          extend: qx.theme.indigo.Color,
          colors: {
            "d": "xyz"
          }
        });
        var self = this;
        this.assertException(function () {
          self.manager.setTheme(qx.test.Theme.themes.A);
        });
        qx.Theme.define("qx.test.Theme.themes.A", {
          extend: qx.theme.indigo.Color,
          colors: {
            "b": "a",
            "c": "b"
          }
        });
        var self = this;
        this.assertException(function () {
          self.manager.setTheme(qx.test.Theme.themes.A);
        });
      }
    }
  });
  qx.test.theme.manager.Color.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Color.js.map?dt=1592908456404