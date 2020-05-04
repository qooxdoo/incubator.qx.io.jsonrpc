(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.test.ui.LayoutTestCase": {
        "require": true
      },
      "qx.ui.container.Composite": {},
      "qx.ui.layout.VBox": {},
      "qx.ui.toolbar.ToolBar": {},
      "qx.ui.toolbar.Button": {},
      "qx.ui.core.Spacer": {},
      "qx.ui.basic.Label": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2004-2010 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Martin Wittemann (martinwittemann)
  
  ************************************************************************ */
  qx.Class.define("qx.test.ui.toolbar.OverflowHandling", {
    extend: qx.test.ui.LayoutTestCase,
    members: {
      __container: null,
      __toolbar: null,
      __b1: null,
      __b2: null,
      __b3: null,
      __indicator: null,
      setUp: function setUp() {
        qx.test.ui.toolbar.OverflowHandling.prototype.setUp.base.call(this);
        this.__container = new qx.ui.container.Composite();

        this.__container.setLayout(new qx.ui.layout.VBox());

        this.getRoot().add(this.__container);

        this.__container.setWidth(100);

        this.__toolbar = new qx.ui.toolbar.ToolBar();

        this.__container.add(this.__toolbar);

        this.__b1 = new qx.ui.toolbar.Button("B1");
        this.__b2 = new qx.ui.toolbar.Button("B2");
        this.__b3 = new qx.ui.toolbar.Button("B3");
      },
      tearDown: function tearDown() {
        qx.test.ui.toolbar.OverflowHandling.prototype.tearDown.base.call(this);
        var self = this;

        this.__b1.destroy();

        this.__b2.destroy();

        this.__b3.destroy();

        this.__toolbar.destroy();

        this.__container.destroy();

        if (self.__indicator) {
          this.__indicator.destroy();
        }
      },
      __addButtons: function __addButtons() {
        this.__toolbar.add(this.__b1);

        this.__toolbar.add(this.__b2);

        this.__toolbar.add(this.__b3);
      },
      testShow: function testShow() {
        this.__addButtons();

        this.__toolbar.setShow("label");

        this.assertEquals(this.__toolbar.getShow(), this.__b1.getShow());
        this.assertEquals(this.__toolbar.getShow(), this.__b2.getShow());
        this.assertEquals(this.__toolbar.getShow(), this.__b3.getShow());

        this.__toolbar.setShow("icon");

        this.assertEquals(this.__toolbar.getShow(), this.__b1.getShow());
        this.assertEquals(this.__toolbar.getShow(), this.__b2.getShow());
        this.assertEquals(this.__toolbar.getShow(), this.__b3.getShow());
      },
      testSpacing: function testSpacing() {
        this.__toolbar.setSpacing(123);

        this.assertEquals(this.__toolbar.getSpacing(), this.__toolbar._getLayout().getSpacing());
      },
      testSpacer: function testSpacer() {
        this.__toolbar.addSpacer();

        this.assertTrue(this.__toolbar.getChildren()[0] instanceof qx.ui.core.Spacer);
      },
      testHideItem: function testHideItem() {
        this.__addButtons();

        this.flush();

        this.__toolbar.setOverflowHandling(true);

        var self = this;
        this.assertEventFired(this.__toolbar, "hideItem", function () {
          self.__container.setWidth(60);

          self.flush();
        }, function (e) {
          self.assertEquals(self.__b3, e.getData());
          self.assertEquals("excluded", self.__b3.getVisibility());
        });
      },
      testShowItem: function testShowItem() {
        this.__addButtons();

        this.flush();

        this.__toolbar.setOverflowHandling(true);

        this.__container.setWidth(60);

        this.flush();
        var self = this;
        this.assertEventFired(this.__toolbar, "showItem", function () {
          self.__container.setWidth(100);

          self.flush();
        }, function (e) {
          self.assertEquals(self.__b3, e.getData());
          self.assertEquals("visible", self.__b3.getVisibility());
        });
      },
      testHideItemPriority: function testHideItemPriority() {
        this.__addButtons();

        this.flush();

        this.__toolbar.setOverflowHandling(true);

        this.__toolbar.setRemovePriority(this.__b2, 2);

        var self = this;
        this.assertEventFired(this.__toolbar, "hideItem", function () {
          self.__container.setWidth(60);

          self.flush();
        }, function (e) {
          self.assertEquals(self.__b2, e.getData());
          self.assertEquals("excluded", self.__b2.getVisibility());
        });
      },
      testShowItemPriority: function testShowItemPriority() {
        this.__addButtons();

        this.flush();

        this.__toolbar.setOverflowHandling(true);

        this.__toolbar.setRemovePriority(this.__b2, 2);

        this.__container.setWidth(60);

        this.flush();
        var self = this;
        this.assertEventFired(this.__toolbar, "showItem", function () {
          self.__container.setWidth(100);

          self.flush();
        }, function (e) {
          self.assertEquals(self.__b2, e.getData());
          self.assertEquals("visible", self.__b2.getVisibility());
        });
      },
      testShowIndicator: function testShowIndicator(attribute) {
        this.__addButtons();

        this.flush();

        this.__toolbar.setOverflowHandling(true);

        this.__indicator = new qx.ui.basic.Label(".");

        this.__toolbar.add(this.__indicator);

        this.__toolbar.setOverflowIndicator(this.__indicator);

        this.assertEquals("excluded", this.__indicator.getVisibility());

        this.__indicator.addListener("changeVisibility", function () {
          this.resume(function () {
            this.assertEquals("visible", this.__indicator.getVisibility());
          }, this);
        }, this);

        this.__container.setWidth(60);

        this.wait();
      },
      testHideIndicator: function testHideIndicator(attribute) {
        this.__addButtons();

        this.flush();

        this.__toolbar.setOverflowHandling(true);

        this.__indicator = new qx.ui.basic.Label(".");

        this.__toolbar.add(this.__indicator);

        this.__toolbar.setOverflowIndicator(this.__indicator);

        this.assertEquals("excluded", this.__indicator.getVisibility());

        this.__container.setWidth(60);

        this.flush();

        this.__indicator.addListener("changeVisibility", function () {
          this.resume(function () {
            this.assertEquals("excluded", this.__indicator.getVisibility());
          }, this);
        }, this);

        this.__container.setWidth(160);

        this.wait();
      },
      testShowIndicatorHuge: function testShowIndicatorHuge(attribute) {
        this.__addButtons();

        this.flush();

        this.__toolbar.setOverflowHandling(true);

        this.__indicator = new qx.ui.basic.Label(".....");

        this.__toolbar.add(this.__indicator);

        this.__toolbar.setOverflowIndicator(this.__indicator);

        this.assertEquals("excluded", this.__indicator.getVisibility());

        this.__b2.addListener("changeVisibility", function () {
          this.resume(function () {
            this.assertEquals("visible", this.__indicator.getVisibility()); // check if both buttons have been removed

            this.assertEquals("excluded", this.__b3.getVisibility(), "1");
            this.assertEquals("excluded", this.__b2.getVisibility(), "2");
          }, this);
        }, this);

        this.__container.setWidth(60);

        this.wait();
      },
      testHideItemRemoved: function testHideItemRemoved() {
        this.__addButtons();

        this.flush();

        this.__toolbar.setOverflowHandling(true);

        this.__toolbar.remove(this.__b3);

        var self = this;
        this.assertEventNotFired(this.__toolbar, "hideItem", function () {
          self.__container.setWidth(60);

          self.flush();
        });
      },
      testShowItemRemoved: function testShowItemRemoved() {
        this.__addButtons();

        this.flush();

        this.__toolbar.setOverflowHandling(true);

        this.__container.setWidth(60);

        this.flush();
        var self = this;
        this.assertEventFired(this.__toolbar, "showItem", function () {
          self.__toolbar.remove(self.__b3);

          self.flush();
        }, function (e) {
          self.assertEquals(self.__b3, e.getData());
          self.assertEquals("visible", self.__b3.getVisibility());
        });
      },
      testAddItem: function testAddItem() {
        this.__indicator = new qx.ui.basic.Label(".");

        this.__toolbar.add(this.__indicator);

        this.__toolbar.setOverflowIndicator(this.__indicator);

        this.__toolbar.setOverflowHandling(true);

        this.__container.setWidth(60);

        this.flush();
        var self = this;
        this.assertEventFired(this.__indicator, "changeVisibility", function () {
          self.__addButtons();

          self.flush();
        }, function (e) {
          self.assertEquals("visible", self.__indicator.getVisibility());
          self.assertEquals("excluded", self.__b3.getVisibility());
        });
      }
    }
  });
  qx.test.ui.toolbar.OverflowHandling.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=OverflowHandling.js.map?dt=1588615809141