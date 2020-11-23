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
      __container__P_334_0: null,
      __toolbar__P_334_1: null,
      __b1__P_334_2: null,
      __b2__P_334_3: null,
      __b3__P_334_4: null,
      __indicator__P_334_5: null,
      setUp: function setUp() {
        qx.test.ui.toolbar.OverflowHandling.prototype.setUp.base.call(this);
        this.__container__P_334_0 = new qx.ui.container.Composite();

        this.__container__P_334_0.setLayout(new qx.ui.layout.VBox());

        this.getRoot().add(this.__container__P_334_0);

        this.__container__P_334_0.setWidth(100);

        this.__toolbar__P_334_1 = new qx.ui.toolbar.ToolBar();

        this.__container__P_334_0.add(this.__toolbar__P_334_1);

        this.__b1__P_334_2 = new qx.ui.toolbar.Button("B1");
        this.__b2__P_334_3 = new qx.ui.toolbar.Button("B2");
        this.__b3__P_334_4 = new qx.ui.toolbar.Button("B3");
      },
      tearDown: function tearDown() {
        qx.test.ui.toolbar.OverflowHandling.prototype.tearDown.base.call(this);
        var self = this;

        this.__b1__P_334_2.destroy();

        this.__b2__P_334_3.destroy();

        this.__b3__P_334_4.destroy();

        this.__toolbar__P_334_1.destroy();

        this.__container__P_334_0.destroy();

        if (self.__indicator__P_334_5) {
          this.__indicator__P_334_5.destroy();
        }
      },
      __addButtons__P_334_6: function __addButtons__P_334_6() {
        this.__toolbar__P_334_1.add(this.__b1__P_334_2);

        this.__toolbar__P_334_1.add(this.__b2__P_334_3);

        this.__toolbar__P_334_1.add(this.__b3__P_334_4);
      },
      testShow: function testShow() {
        this.__addButtons__P_334_6();

        this.__toolbar__P_334_1.setShow("label");

        this.assertEquals(this.__toolbar__P_334_1.getShow(), this.__b1__P_334_2.getShow());
        this.assertEquals(this.__toolbar__P_334_1.getShow(), this.__b2__P_334_3.getShow());
        this.assertEquals(this.__toolbar__P_334_1.getShow(), this.__b3__P_334_4.getShow());

        this.__toolbar__P_334_1.setShow("icon");

        this.assertEquals(this.__toolbar__P_334_1.getShow(), this.__b1__P_334_2.getShow());
        this.assertEquals(this.__toolbar__P_334_1.getShow(), this.__b2__P_334_3.getShow());
        this.assertEquals(this.__toolbar__P_334_1.getShow(), this.__b3__P_334_4.getShow());
      },
      testSpacing: function testSpacing() {
        this.__toolbar__P_334_1.setSpacing(123);

        this.assertEquals(this.__toolbar__P_334_1.getSpacing(), this.__toolbar__P_334_1._getLayout().getSpacing());
      },
      testSpacer: function testSpacer() {
        this.__toolbar__P_334_1.addSpacer();

        this.assertTrue(this.__toolbar__P_334_1.getChildren()[0] instanceof qx.ui.core.Spacer);
      },
      testHideItem: function testHideItem() {
        this.__addButtons__P_334_6();

        this.flush();

        this.__toolbar__P_334_1.setOverflowHandling(true);

        var self = this;
        this.assertEventFired(this.__toolbar__P_334_1, "hideItem", function () {
          self.__container__P_334_0.setWidth(60);

          self.flush();
        }, function (e) {
          self.assertEquals(self.__b3__P_334_4, e.getData());
          self.assertEquals("excluded", self.__b3__P_334_4.getVisibility());
        });
      },
      testShowItem: function testShowItem() {
        this.__addButtons__P_334_6();

        this.flush();

        this.__toolbar__P_334_1.setOverflowHandling(true);

        this.__container__P_334_0.setWidth(60);

        this.flush();
        var self = this;
        this.assertEventFired(this.__toolbar__P_334_1, "showItem", function () {
          self.__container__P_334_0.setWidth(100);

          self.flush();
        }, function (e) {
          self.assertEquals(self.__b3__P_334_4, e.getData());
          self.assertEquals("visible", self.__b3__P_334_4.getVisibility());
        });
      },
      testHideItemPriority: function testHideItemPriority() {
        this.__addButtons__P_334_6();

        this.flush();

        this.__toolbar__P_334_1.setOverflowHandling(true);

        this.__toolbar__P_334_1.setRemovePriority(this.__b2__P_334_3, 2);

        var self = this;
        this.assertEventFired(this.__toolbar__P_334_1, "hideItem", function () {
          self.__container__P_334_0.setWidth(60);

          self.flush();
        }, function (e) {
          self.assertEquals(self.__b2__P_334_3, e.getData());
          self.assertEquals("excluded", self.__b2__P_334_3.getVisibility());
        });
      },
      testShowItemPriority: function testShowItemPriority() {
        this.__addButtons__P_334_6();

        this.flush();

        this.__toolbar__P_334_1.setOverflowHandling(true);

        this.__toolbar__P_334_1.setRemovePriority(this.__b2__P_334_3, 2);

        this.__container__P_334_0.setWidth(60);

        this.flush();
        var self = this;
        this.assertEventFired(this.__toolbar__P_334_1, "showItem", function () {
          self.__container__P_334_0.setWidth(100);

          self.flush();
        }, function (e) {
          self.assertEquals(self.__b2__P_334_3, e.getData());
          self.assertEquals("visible", self.__b2__P_334_3.getVisibility());
        });
      },
      testShowIndicator: function testShowIndicator(attribute) {
        this.__addButtons__P_334_6();

        this.flush();

        this.__toolbar__P_334_1.setOverflowHandling(true);

        this.__indicator__P_334_5 = new qx.ui.basic.Label(".");

        this.__toolbar__P_334_1.add(this.__indicator__P_334_5);

        this.__toolbar__P_334_1.setOverflowIndicator(this.__indicator__P_334_5);

        this.assertEquals("excluded", this.__indicator__P_334_5.getVisibility());

        this.__indicator__P_334_5.addListener("changeVisibility", function () {
          this.resume(function () {
            this.assertEquals("visible", this.__indicator__P_334_5.getVisibility());
          }, this);
        }, this);

        this.__container__P_334_0.setWidth(60);

        this.wait();
      },
      testHideIndicator: function testHideIndicator(attribute) {
        this.__addButtons__P_334_6();

        this.flush();

        this.__toolbar__P_334_1.setOverflowHandling(true);

        this.__indicator__P_334_5 = new qx.ui.basic.Label(".");

        this.__toolbar__P_334_1.add(this.__indicator__P_334_5);

        this.__toolbar__P_334_1.setOverflowIndicator(this.__indicator__P_334_5);

        this.assertEquals("excluded", this.__indicator__P_334_5.getVisibility());

        this.__container__P_334_0.setWidth(60);

        this.flush();

        this.__indicator__P_334_5.addListener("changeVisibility", function () {
          this.resume(function () {
            this.assertEquals("excluded", this.__indicator__P_334_5.getVisibility());
          }, this);
        }, this);

        this.__container__P_334_0.setWidth(160);

        this.wait();
      },
      testShowIndicatorHuge: function testShowIndicatorHuge(attribute) {
        this.__addButtons__P_334_6();

        this.flush();

        this.__toolbar__P_334_1.setOverflowHandling(true);

        this.__indicator__P_334_5 = new qx.ui.basic.Label(".....");

        this.__toolbar__P_334_1.add(this.__indicator__P_334_5);

        this.__toolbar__P_334_1.setOverflowIndicator(this.__indicator__P_334_5);

        this.assertEquals("excluded", this.__indicator__P_334_5.getVisibility());

        this.__b2__P_334_3.addListener("changeVisibility", function () {
          this.resume(function () {
            this.assertEquals("visible", this.__indicator__P_334_5.getVisibility()); // check if both buttons have been removed

            this.assertEquals("excluded", this.__b3__P_334_4.getVisibility(), "1");
            this.assertEquals("excluded", this.__b2__P_334_3.getVisibility(), "2");
          }, this);
        }, this);

        this.__container__P_334_0.setWidth(60);

        this.wait();
      },
      testHideItemRemoved: function testHideItemRemoved() {
        this.__addButtons__P_334_6();

        this.flush();

        this.__toolbar__P_334_1.setOverflowHandling(true);

        this.__toolbar__P_334_1.remove(this.__b3__P_334_4);

        var self = this;
        this.assertEventNotFired(this.__toolbar__P_334_1, "hideItem", function () {
          self.__container__P_334_0.setWidth(60);

          self.flush();
        });
      },
      testShowItemRemoved: function testShowItemRemoved() {
        this.__addButtons__P_334_6();

        this.flush();

        this.__toolbar__P_334_1.setOverflowHandling(true);

        this.__container__P_334_0.setWidth(60);

        this.flush();
        var self = this;
        this.assertEventFired(this.__toolbar__P_334_1, "showItem", function () {
          self.__toolbar__P_334_1.remove(self.__b3__P_334_4);

          self.flush();
        }, function (e) {
          self.assertEquals(self.__b3__P_334_4, e.getData());
          self.assertEquals("visible", self.__b3__P_334_4.getVisibility());
        });
      },
      testAddItem: function testAddItem() {
        this.__indicator__P_334_5 = new qx.ui.basic.Label(".");

        this.__toolbar__P_334_1.add(this.__indicator__P_334_5);

        this.__toolbar__P_334_1.setOverflowIndicator(this.__indicator__P_334_5);

        this.__toolbar__P_334_1.setOverflowHandling(true);

        this.__container__P_334_0.setWidth(60);

        this.flush();
        var self = this;
        this.assertEventFired(this.__indicator__P_334_5, "changeVisibility", function () {
          self.__addButtons__P_334_6();

          self.flush();
        }, function (e) {
          self.assertEquals("visible", self.__indicator__P_334_5.getVisibility());
          self.assertEquals("excluded", self.__b3__P_334_4.getVisibility());
        });
      }
    }
  });
  qx.test.ui.toolbar.OverflowHandling.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=OverflowHandling.js.map?dt=1606150620834