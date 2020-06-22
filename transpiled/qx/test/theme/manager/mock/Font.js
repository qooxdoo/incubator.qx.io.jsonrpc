(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Theme": {
        "usage": "dynamic",
        "require": true
      },
      "qx.theme.modern.Font": {
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  qx.Theme.define("qx.test.theme.manager.mock.Font", {
    extend: qx.theme.modern.Font,
    fonts: {
      "default": {
        size: 99,
        family: ["arial", "sans-serif"]
      }
    }
  });
  qx.test.theme.manager.mock.Font.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Font.js.map?dt=1592867951868