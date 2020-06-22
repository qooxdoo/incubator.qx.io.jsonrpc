(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Bootstrap": {
        "usage": "dynamic",
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /*
   * This is just extracting a common structure that is used by various test
   * classes to initialize qx.Part()
   */
  qx.Bootstrap.define("qx.test.io.part.MockLoader", {
    construct: function construct() {},
    members: {
      parts: {
        "b": ["b"]
      },
      packages: {
        "b": {
          uris: []
        }
      },
      boot: "b"
    }
  });
  qx.test.io.part.MockLoader.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=MockLoader.js.map?dt=1592867949132