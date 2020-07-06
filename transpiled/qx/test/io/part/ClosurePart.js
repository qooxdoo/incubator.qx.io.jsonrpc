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
      "qx.test.io.MRemoteTest": {
        "require": true
      },
      "qx.test.Part": {},
      "qx.test.io.part.MockLoader": {},
      "qx.Part": {},
      "qx.io.part.Package": {},
      "qx.io.part.ClosurePart": {},
      "qx.test.io.part.MockPackage": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
  qooxdoo - the new era of web development
  
  http://qooxdoo.org
  
  Copyright:
    2007-2008 1&1 Internet AG, Germany, http://www.1und1.de
  
  License:
       MIT: https://opensource.org/licenses/MIT
    See the LICENSE file in the project's top-level directory for details.
  
  Authors:
    * Fabian Jakobs (fjakobs)
  
  ************************************************************************ */

  /* ************************************************************************
  
  
  ************************************************************************ */

  /**
   * @ignore(qx.test.PART_FILES)
   *
   * @asset(qx/test/*)
   */
  qx.Class.define("qx.test.io.part.ClosurePart", {
    extend: qx.dev.unit.TestCase,
    include: qx.test.io.MRemoteTest,
    members: {
      __dummyLoader__P_251_0: null,
      __timeout__P_251_1: null,
      __loader__P_251_2: null,
      setUp: function setUp() {
        qx.test.PART_FILES = [];
        qx.test.Part.LOAD_ORDER = [];
        this.__dummyLoader__P_251_0 = new qx.test.io.part.MockLoader();
        this.__loader__P_251_2 = new qx.Part(this.__dummyLoader__P_251_0);
        qx.Part.$$instance = this.__loader__P_251_2;
        this.__timeout__P_251_1 = qx.Part.TIMEOUT;
        qx.Part.TIMEOUT = 3000;
      },
      tearDown: function tearDown() {
        qx.Part.$$instance = undefined;
        qx.Part.TIMEOUT = this.__timeout__P_251_1;
      },
      loadPackage: function loadPackage(part, pkg) {
        pkg.loadClosure(this.__loader__P_251_2.notifyPackageResult, this.__loader__P_251_2);
      },
      "test: load part with one package": function testLoadPartWithOnePackage() {
        var pkg = new qx.io.part.Package([this.getUrl("qx/test/part/file1-closure.js")], "p1");
        var part = new qx.io.part.ClosurePart("juhu", [pkg], this.__loader__P_251_2);

        this.__loader__P_251_2.addToPackage(pkg);

        var self = this;
        part.load(function (readyState) {
          self.resume(function () {
            self.assertEquals("complete", readyState);
            self.assertJsonEquals(["file1-closure"], qx.test.PART_FILES);
          });
        });
        this.wait();
      },
      "test: load part with two packages": function testLoadPartWithTwoPackages() {
        var pkg1 = new qx.io.part.Package([this.getUrl("qx/test/part/file1-closure.js")], "p1");
        var pkg2 = new qx.io.part.Package([this.getUrl("qx/test/part/file2-closure.js")], "p2");
        var part = new qx.io.part.ClosurePart("juhu", [pkg1, pkg2], this.__loader__P_251_2);

        this.__loader__P_251_2.addToPackage(pkg1);

        this.__loader__P_251_2.addToPackage(pkg2);

        var self = this;
        part.load(function (readyState) {
          self.resume(function () {
            self.assertJsonEquals(["file1-closure", "file2-closure"], qx.test.PART_FILES);
          });
        });
        this.wait();
      },
      "test: load part with two packages and one already loading": function testLoadPartWithTwoPackagesAndOneAlreadyLoading() {
        var pkg1 = new qx.test.io.part.MockPackage("p1", null, null, null, true);
        var pkg2 = new qx.test.io.part.MockPackage("p2", null, null, null, true);
        var part = new qx.io.part.ClosurePart("juhu", [pkg1, pkg2], this.__loader__P_251_2);

        this.__loader__P_251_2.addToPackage(pkg1);

        this.__loader__P_251_2.addToPackage(pkg2);

        this.loadPackage(part, pkg2);
        var self = this;
        part.load(function (readyState) {
          self.resume(function () {
            self.assertJsonEquals(["p1", "p2"], qx.test.Part.LOAD_ORDER);
          });
        });
        this.wait();
      },
      "test: load part with two packages and both already loading": function testLoadPartWithTwoPackagesAndBothAlreadyLoading() {
        var pkg1 = new qx.test.io.part.MockPackage("p1", null, null, null, true);
        var pkg2 = new qx.test.io.part.MockPackage("p2", null, null, null, true);
        var part = new qx.io.part.ClosurePart("juhu", [pkg1, pkg2], this.__loader__P_251_2);

        this.__loader__P_251_2.addToPackage(pkg1);

        this.__loader__P_251_2.addToPackage(pkg2);

        this.loadPackage(part, pkg1);
        this.loadPackage(part, pkg2);
        var self = this;
        part.load(function (readyState) {
          self.resume(function () {
            self.assertJsonEquals(["p1", "p2"], qx.test.Part.LOAD_ORDER);
          });
        });
        this.wait();
      },
      "test: load part with three packages and delay": function testLoadPartWithThreePackagesAndDelay() {
        var pkg1 = new qx.test.io.part.MockPackage("p1", 200, null, null, true);
        var pkg2 = new qx.test.io.part.MockPackage("p2", null, null, null, true);
        var pkg3 = new qx.test.io.part.MockPackage("p3", 100, null, null, true);

        this.__loader__P_251_2.addToPackage(pkg1);

        this.__loader__P_251_2.addToPackage(pkg2);

        this.__loader__P_251_2.addToPackage(pkg3);

        var part = new qx.io.part.ClosurePart("juhu", [pkg1, pkg2, pkg3], this.__loader__P_251_2);
        var self = this;
        part.load(function (readyState) {
          self.resume(function () {
            self.assertJsonEquals(["p1", "p2", "p3"], qx.test.Part.LOAD_ORDER);
          });
        });
        this.wait();
      },
      "test: load part with two packages and delay first part": function testLoadPartWithTwoPackagesAndDelayFirstPart() {
        if (this.isLocal()) {
          this.needsPHPWarning();
          return;
        }

        var pkg1 = new qx.test.io.part.MockPackage("p1", 100, null, null, true);
        var pkg2 = new qx.test.io.part.MockPackage("p2", null, null, null, true);
        var part = new qx.io.part.ClosurePart("juhu", [pkg1, pkg2], this.__loader__P_251_2);

        this.__loader__P_251_2.addToPackage(pkg1);

        this.__loader__P_251_2.addToPackage(pkg2);

        var self = this;
        part.load(function (readyState) {
          self.resume(function () {
            self.assertJsonEquals(["p1", "p2"], qx.test.Part.LOAD_ORDER);
          });
        });
        this.wait();
      },
      "test: load part with an error package": function testLoadPartWithAnErrorPackage() {
        var pkg1 = new qx.test.io.part.MockPackage("file211-closure", null, true, null, true);
        var part = new qx.io.part.ClosurePart("juhu", [pkg1], this.__loader__P_251_2);

        this.__loader__P_251_2.addToPackage(pkg1);

        var self = this;
        part.load(function (readyState) {
          self.resume(function () {
            self.assertEquals("error", readyState);
            self.assertJsonEquals([], qx.test.Part.LOAD_ORDER);
          });
        });
        this.wait();
      },
      "test: load part with a loaded package should not reload the package again": function testLoadPartWithALoadedPackageShouldNotReloadThePackageAgain() {
        var pkg1 = new qx.test.io.part.MockPackage("p1", null, null, "complete", true);
        var part = new qx.io.part.ClosurePart("juhu", [pkg1], this.__loader__P_251_2);
        var self = this;

        pkg1.load = function () {
          self.resume(function () {
            self.fail();
          });
        };

        part.load(function (readyState) {
          self.resume(function () {
            self.assertEquals("complete", readyState);
          });
        });
        this.wait();
      },
      "test: load a part with preloaded package": function testLoadAPartWithPreloadedPackage() {
        var pkg = new qx.test.io.part.MockPackage("p1", null, null, null, true);
        var part = new qx.io.part.ClosurePart("juhu", [pkg], this.__loader__P_251_2);

        this.__loader__P_251_2.addToPackage(pkg);

        var self = this;
        setTimeout(function () {
          part.load(function (readyState) {
            self.resume(function () {
              self.assertEquals("complete", readyState);
              self.assertJsonEquals(["p1"], qx.test.Part.LOAD_ORDER);
            });
          });
        }, 100);
        part.preload();

        pkg.loadClosure = function () {
          self.resume(function () {
            self.fail("load called twice!");
          });
        };

        this.wait();
      }
    }
  });
  qx.test.io.part.ClosurePart.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=ClosurePart.js.map?dt=1594065620280