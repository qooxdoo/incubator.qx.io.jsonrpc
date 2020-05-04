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
      "qx.dev.unit.MMeasure": {
        "require": true
      },
      "qx.ui.container.Composite": {},
      "qx.ui.layout.Basic": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  qx.Class.define("qx.test.performance.widget.AbstractWidget", {
    extend: qx.test.ui.LayoutTestCase,
    include: qx.dev.unit.MMeasure,
    type: "abstract",
    members: {
      DURATION: 1000,
      setUp: function setUp() {
        qx.test.performance.widget.AbstractWidget.prototype.setUp.base.call(this);
        this.flush();
      },
      _createWidget: function _createWidget() {
        throw new Error("abstract method call");
      },
      testCreate: function testCreate() {
        var widgets = [];
        var that = this;
        this.measureIterations("create widget instance", null, function () {
          widgets.push(that._createWidget());
        }, function () {
          for (var i = 0; i < widgets.length; i++) {
            widgets[i].dispose();
          }

          this.flush();
        }, this.DURATION);
      },
      testRender: function testRender() {
        var container = new qx.ui.container.Composite(new qx.ui.layout.Basic());
        this.getRoot().add(container);
        var that = this;
        var widget;
        this.measureIterations("render and flush widgets", function () {
          widget = that._createWidget();
        }, function () {
          that.getRoot().add(widget);
          that.flush();
        }, function () {
          container.destroy();
          that.flush();
        }, this.DURATION);
      },
      testResizeAndFlush: function testResizeAndFlush() {
        var that = this;
        var widgets = [];
        this.measureIterations("resize and flush widgets", function () {
          var widget = that._createWidget();

          widgets.push(widget);
          that.getRoot().add(widget);
          that.flush();
        }, function () {
          widgets[widgets.length - 1].setWidth(300);
          widgets[widgets.length - 1].setHeight(100);
          that.flush();
        }, function () {
          for (var i = 0; i < widgets.length; i++) {
            widgets[i].destroy();
          }

          this.flush();
        }, this.DURATION);
      },
      testRemove: function testRemove() {
        var container = new qx.ui.container.Composite(new qx.ui.layout.Basic());
        this.getRoot().add(container);
        var that = this;
        var widget;
        this.measureIterations("remove and flush widgets", function () {
          widget = that._createWidget();
          container.add(widget);
        }, function () {
          container.remove(widget);
          that.flush();
        }, function () {
          container.destroy();
          that.flush();
        }, this.DURATION);
      },
      testDisposeRendered: function testDisposeRendered() {
        this.flush();
        var widgets = [];
        var that = this;
        this.measureIterations("dispose rendered widgets", function () {
          widgets.push(that._createWidget());
          that.getRoot().add(widgets[widgets.length - 1]);
        }, function () {
          widgets[widgets.length - 1].destroy();
          that.flush();
        }, function () {
          that.flush();
        }, this.DURATION);
      }
    }
  });
  qx.test.performance.widget.AbstractWidget.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=AbstractWidget.js.map?dt=1588615805797