(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.test.log.fixture.ClassA": {
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  qx.Class.define("qx.test.log.fixture.ClassB1", {
    extend: qx.test.log.fixture.ClassA,
    members: {
      _applyOldProperty: function _applyOldProperty() {
        qx.test.log.fixture.ClassB1.prototype._applyOldProperty.base.call(this);

        this._callCountApplyOldProperty++;
      },
      _applyNewProperty: function _applyNewProperty() {
        qx.test.log.fixture.ClassB1.prototype._applyNewProperty.base.call(this);

        this._callCountApplyNewProperty++;
      }
    }
  });
  qx.test.log.fixture.ClassB1.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=ClassB1.js.map?dt=1599905731233