(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Bootstrap": {
        "usage": "dynamic",
        "require": true
      },
      "qx.Part": {},
      "qx.test.Part": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  qx.Bootstrap.define("qx.test.io.part.MockPackage", {
    construct: function construct(id, delay, error, readyState, useClosure) {
      this.id = id;
      this.delay = delay || 0;
      this.error = !!error;
      this.readyState = readyState || "initialized";
      this.useClosure = !!useClosure;
    },
    members: {
      getReadyState: function getReadyState() {
        return this.readyState;
      },
      getId: function getId() {
        return this.id;
      },
      load: function load(notifyPackageResult, self) {
        var pkg = this;
        this._loadWithClosure = false;
        pkg.readyState = "loading";
        setTimeout(function () {
          if (pkg.error) {
            pkg.readyState = "error";
          } else {
            if (pkg.useClosure) {
              qx.Part.$$notifyLoad(pkg.id, function () {
                qx.test.Part.LOAD_ORDER.push(pkg.id);
              });
            } else {
              qx.test.Part.LOAD_ORDER.push(pkg.id);
            }

            pkg.readyState = "complete";
          }

          notifyPackageResult.call(self, pkg);
        }, pkg.delay);
      },
      saveClosure: function saveClosure(closure) {
        if (this.readyState == "error") {
          return;
        }

        if (!this._loadWithClosure) {
          this.execute();
        } else {
          this.__readyState__P_252_0 = "cached";

          this.__notifyPackageResult__P_252_1(this);
        }
      },
      execute: function execute() {
        qx.test.Part.LOAD_ORDER.push(this.id);
      },
      loadClosure: function loadClosure(notifyPackageResult, self) {
        var pkg = this;
        this._loadWithClosure = true;
        this.__notifyPackageResult__P_252_1 = qx.Bootstrap.bind(notifyPackageResult, self);
        pkg.readyState = "loading";
        setTimeout(function () {
          if (pkg.error) {
            pkg.readyState = "error";
          } else {
            qx.Part.$$notifyLoad(pkg.id, function () {
              qx.test.Part.LOAD_ORDER.push(pkg.id);
            });
            pkg.readyState = "cached";
          }

          notifyPackageResult.call(self, pkg);
        }, pkg.delay);
      }
    }
  });
  qx.test.io.part.MockPackage.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=MockPackage.js.map?dt=1592908453739