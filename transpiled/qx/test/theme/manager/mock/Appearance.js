(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Theme": {
        "usage": "dynamic",
        "require": true
      },
      "qx.theme.modern.Appearance": {
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  qx.Theme.define("qx.test.theme.manager.mock.Appearance", {
    extend: qx.theme.modern.Appearance,
    appearances: {
      "button-frame": {
        alias: "atom",
        style: function style(states) {
          return {
            decorator: "button",
            padding: [30, 80]
          };
        }
      },
      "button-frame/label": {
        alias: "atom/label",
        style: function style(states) {
          return {
            textColor: "text-label"
          };
        }
      }
    }
  });
  qx.test.theme.manager.mock.Appearance.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Appearance.js.map?dt=1599578766405