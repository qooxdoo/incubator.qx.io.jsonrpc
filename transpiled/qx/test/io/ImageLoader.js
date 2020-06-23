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
      "qx.util.ResourceManager": {},
      "qx.io.ImageLoader": {},
      "qx.event.Timer": {}
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
       * Alexander Steitz (aback)
  
  ************************************************************************ */

  /* ************************************************************************
  ************************************************************************ */

  /**
   *
   * @asset(qx/test/colorstrip.gif)
   */
  qx.Class.define("qx.test.io.ImageLoader", {
    extend: qx.dev.unit.TestCase,
    members: {
      setUp: function setUp() {
        this.__imageUri__P_250_0 = qx.util.ResourceManager.getInstance().toUri("qx/test/colorstrip.gif");
        this.__wrongImageUri__P_250_1 = this.__imageUri__P_250_0.replace(/color/, "foocolor");
        this.__vectorImageUri__P_250_2 = qx.util.ResourceManager.getInstance().toUri("qx/test/bluebar.svg");
        this.__wrongVectorImageUri__P_250_3 = this.__vectorImageUri__P_250_2.replace(/blue/, "fooblue");
      },
      tearDown: function tearDown() {
        qx.io.ImageLoader.dispose();
      },
      testLoadImageSuccess: function testLoadImageSuccess() {
        this.__imageSource__P_250_4 = null;
        qx.io.ImageLoader.load(this.__imageUri__P_250_0, function (source, entry) {
          this.__imageSource__P_250_4 = source;
        }, this);
        qx.event.Timer.once(function (e) {
          var self = this;
          this.resume(function () {
            this.assertTrue(qx.io.ImageLoader.isLoaded(this.__imageSource__P_250_4));
          }, self);
        }, this, 500);
        this.wait();
      },
      testLoadVectorImageSuccess: function testLoadVectorImageSuccess() {
        this.__imageSource__P_250_4 = null;
        qx.io.ImageLoader.load(this.__vectorImageUri__P_250_2, function (source, entry) {
          this.__imageSource__P_250_4 = source;
        }, this);
        qx.event.Timer.once(function (e) {
          var self = this;
          this.resume(function () {
            this.assertTrue(qx.io.ImageLoader.isLoaded(this.__imageSource__P_250_4));
          }, self);
        }, this, 500);
        this.wait();
      },
      testLoadImageFailure: function testLoadImageFailure() {
        this.__imageSource__P_250_4 = null;
        qx.io.ImageLoader.load(this.__wrongImageUri__P_250_1, function (source, entry) {
          this.__imageSource__P_250_4 = source;
        }, this);
        qx.event.Timer.once(function (e) {
          var self = this;
          this.resume(function () {
            this.assertTrue(qx.io.ImageLoader.isFailed(this.__imageSource__P_250_4));
          }, self);
        }, this, 500);
        this.wait();
      },
      testLoadVectorImageFailure: function testLoadVectorImageFailure() {
        this.__imageSource__P_250_4 = null;
        qx.io.ImageLoader.load(this.__wrongVectorImageUri__P_250_3, function (source, entry) {
          this.__imageSource__P_250_4 = source;
        }, this);
        qx.event.Timer.once(function (e) {
          var self = this;
          this.resume(function () {
            this.assertTrue(qx.io.ImageLoader.isFailed(this.__imageSource__P_250_4));
          }, self);
        }, this, 500);
        this.wait();
      },
      testImageWidth: function testImageWidth() {
        this.__imageSource__P_250_4 = null;
        qx.io.ImageLoader.load(this.__imageUri__P_250_0, function (source, entry) {
          this.__imageSource__P_250_4 = source;
        }, this);
        qx.event.Timer.once(function (e) {
          var self = this;
          this.resume(function () {
            this.assertEquals(192, qx.io.ImageLoader.getWidth(this.__imageSource__P_250_4));
          }, self);
        }, this, 500);
        this.wait();
      },
      testVectorImageWidth: function testVectorImageWidth() {
        this.__imageSource__P_250_4 = null;
        qx.io.ImageLoader.load(this.__vectorImageUri__P_250_2, function (source, entry) {
          this.__imageSource__P_250_4 = source;
        }, this);
        qx.event.Timer.once(function (e) {
          var self = this;
          this.resume(function () {
            this.assertEquals(192, qx.io.ImageLoader.getWidth(this.__imageSource__P_250_4));
          }, self);
        }, this, 500);
        this.wait();
      },
      testImageHeight: function testImageHeight() {
        this.__imageSource__P_250_4 = null;
        qx.io.ImageLoader.load(this.__imageUri__P_250_0, function (source, entry) {
          this.__imageSource__P_250_4 = source;
        }, this);
        qx.event.Timer.once(function (e) {
          var self = this;
          this.resume(function () {
            this.assertEquals(10, qx.io.ImageLoader.getHeight(this.__imageSource__P_250_4));
          }, self);
        }, this, 500);
        this.wait();
      },
      testVectorImageHeight: function testVectorImageHeight() {
        this.__imageSource__P_250_4 = null;
        qx.io.ImageLoader.load(this.__vectorImageUri__P_250_2, function (source, entry) {
          this.__imageSource__P_250_4 = source;
        }, this);
        qx.event.Timer.once(function (e) {
          var self = this;
          this.resume(function () {
            this.assertEquals(10, qx.io.ImageLoader.getHeight(this.__imageSource__P_250_4));
          }, self);
        }, this, 500);
        this.wait();
      },
      testImageSize: function testImageSize() {
        this.__imageSource__P_250_4 = null;
        qx.io.ImageLoader.load(this.__imageUri__P_250_0, function (source, entry) {
          this.__imageSource__P_250_4 = source;
        }, this);
        qx.event.Timer.once(function (e) {
          var self = this;
          this.resume(function () {
            var size = qx.io.ImageLoader.getSize(this.__imageSource__P_250_4);
            this.assertEquals(192, size.width);
            this.assertEquals(10, size.height);
          }, self);
        }, this, 500);
        this.wait();
      },
      testVectorImageSize: function testVectorImageSize() {
        this.__imageSource__P_250_4 = null;
        qx.io.ImageLoader.load(this.__vectorImageUri__P_250_2, function (source, entry) {
          this.__imageSource__P_250_4 = source;
        }, this);
        qx.event.Timer.once(function (e) {
          var self = this;
          this.resume(function () {
            var size = qx.io.ImageLoader.getSize(this.__imageSource__P_250_4);
            this.assertEquals(192, size.width);
            this.assertEquals(10, size.height);
          }, self);
        }, this, 500);
        this.wait();
      },
      testImageFormat: function testImageFormat() {
        this.__imageSource__P_250_4 = null;
        qx.io.ImageLoader.load(this.__imageUri__P_250_0, function (source, entry) {
          this.__imageSource__P_250_4 = source;
        }, this);
        qx.event.Timer.once(function (e) {
          var self = this;
          this.resume(function () {
            this.assertEquals("gif", qx.io.ImageLoader.getFormat(this.__imageSource__P_250_4));
          }, self);
        }, this, 500);
        this.wait();
      },
      testAbort: function testAbort() {
        var aborted = false;
        this.__imageSource__P_250_4 = null;
        qx.io.ImageLoader.load(this.__imageUri__P_250_0, function (source, entry) {
          aborted = true;
          this.assertTrue(entry.aborted);
          this.assertEquals(this.__imageUri__P_250_0, source);
        }, this);
        qx.io.ImageLoader.abort(this.__imageUri__P_250_0);
        this.assertTrue(aborted);
      }
    }
  });
  qx.test.io.ImageLoader.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=ImageLoader.js.map?dt=1592908581567