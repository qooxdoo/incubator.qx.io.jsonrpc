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
      "qx.ui.virtual.core.Scroller": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2004-2009 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
     * Fabian Jakobs (fjakobs)
  
  ************************************************************************ */
  qx.Class.define("qx.test.ui.virtual.Scroller", {
    extend: qx.test.ui.LayoutTestCase,
    members: {
      setUp: function setUp() {
        qx.test.ui.virtual.Scroller.prototype.setUp.base.call(this);
        var scroller = new qx.ui.virtual.core.Scroller(1, 1, 10, 10);
        this.getRoot().add(scroller);
        this.scroller = scroller;
        this.flush();
      },
      tearDown: function tearDown() {
        this.scroller.destroy();
        qx.test.ui.virtual.Scroller.prototype.tearDown.base.call(this);
        this.flush();
      },
      assertScrollbars: function assertScrollbars(hasScrollX, hasScrollY, msg) {
        this.assertEquals(hasScrollX, this.scroller.getChildControl("scrollbar-x").isVisible(), msg);
        this.assertEquals(hasScrollY, this.scroller.getChildControl("scrollbar-y").isVisible(), msg);
      },
      configureScroller: function configureScroller(scrollWidth, scrollHeight, width, height) {
        this.scroller.set({
          width: width,
          height: height
        });
        this.scroller.getPane().getRowConfig().setItemSize(0, scrollHeight);
        this.scroller.getPane().getColumnConfig().setItemSize(0, scrollWidth); // trigger update manually

        this.scroller.getPane().fullUpdate();
        this.flush();
      },
      testConstructor: function testConstructor() {
        this.assertNotUndefined(this.scroller);
      },
      testScrollX: function testScrollX() {
        this.scroller.setScrollbarY("off");
        this.configureScroller(3000, 2000, 300, 200);
        this.assertScrollbars(true, false);
        this.assertEquals(0, this.scroller.getScrollX());
        this.assertEquals(0, this.scroller.getPane().getScrollX());
        this.scroller.scrollToX(100);
        this.assertEquals(100, this.scroller.getScrollX());
        this.assertEquals(100, this.scroller.getPane().getScrollX());
        this.scroller.scrollToX(3000);
        this.assertEquals(2700, this.scroller.getScrollX());
        this.assertEquals(2700, this.scroller.getPane().getScrollX());
        this.configureScroller(3000, 2000, 3000, 2000);
        this.assertScrollbars(false, false);
        this.assertEquals(0, this.scroller.getScrollX());
        this.assertEquals(0, this.scroller.getPane().getScrollX());
      },
      testScrollY: function testScrollY() {
        this.scroller.setScrollbarX("off");
        this.configureScroller(3000, 2000, 300, 200);
        this.assertScrollbars(false, true);
        this.assertEquals(0, this.scroller.getScrollX());
        this.assertEquals(0, this.scroller.getPane().getScrollX());
        this.scroller.scrollToY(100);
        this.assertEquals(100, this.scroller.getScrollY());
        this.assertEquals(100, this.scroller.getPane().getScrollY());
        this.scroller.scrollToY(2000);
        this.assertEquals(1800, this.scroller.getScrollY());
        this.assertEquals(1800, this.scroller.getPane().getScrollY());
        this.configureScroller(3000, 2000, 3000, 2000);
        this.assertScrollbars(false, false);
        this.assertEquals(0, this.scroller.getScrollY());
        this.assertEquals(0, this.scroller.getPane().getScrollY());
      },
      testMaxScrollPosition: function testMaxScrollPosition() {
        this.scroller.setScrollbarX("off");
        this.configureScroller(3000, 2000, 300, 200);
        this.assertScrollbars(false, true); // scroll to end

        this.scroller.scrollToY(10000);
        this.assertEquals(1800, this.scroller.getScrollY()); // increase scroller size

        this.configureScroller(3000, 2000, 300, 400);
        this.assertEquals(1600, this.scroller.getScrollY(), "the scroll position must be limited to the max scroll position");
        this.assertEquals(1600, this.scroller.getPane().getScrollY(), "the scroll position must be limited to the max scroll position");
      },
      testScrollbarYAuto: function testScrollbarYAuto() {
        this.scroller.setScrollbarX("off");
        this.scroller.setScrollbarY("auto"); // pane and widget have equal size

        this.configureScroller(300, 200, 300, 200);
        this.assertScrollbars(false, false); // pane larger than widget

        this.configureScroller(300, 201, 300, 200);
        this.assertScrollbars(false, true); // widget larger than pane

        this.configureScroller(300, 201, 300, 202);
        this.assertScrollbars(false, false); // scroll y must be hidden all the time

        this.configureScroller(301, 200, 300, 200);
        this.assertScrollbars(false, false);
      },
      testScrollbarXAuto: function testScrollbarXAuto() {
        this.scroller.setScrollbarX("auto");
        this.scroller.setScrollbarY("off"); // pane and widget have equal size

        this.configureScroller(300, 200, 300, 200);
        this.assertScrollbars(false, false); // pane larger than widget

        this.configureScroller(301, 200, 300, 200);
        this.assertScrollbars(true, false); // widget larger than pane

        this.configureScroller(301, 200, 302, 200);
        this.assertScrollbars(false, false); // scroll x must be hidden all the time

        this.configureScroller(300, 201, 300, 200);
        this.assertScrollbars(false, false);
      },
      testScrollbarXYAuto: function testScrollbarXYAuto() {
        // pane and widget have equal size
        this.configureScroller(300, 200, 300, 200);
        this.assertScrollbars(false, false); // increase the pane a bit -> both scrollbars are needed

        this.configureScroller(301, 200, 300, 200);
        this.assertScrollbars(true, true); // reset

        this.configureScroller(300, 200, 300, 200);
        this.assertScrollbars(false, false);
        this.configureScroller(300, 201, 300, 200);
        this.assertScrollbars(true, true); // increase scroller height

        this.configureScroller(300, 201, 300, 250);
        this.assertScrollbars(false, false); // increase scroller width

        this.configureScroller(300, 201, 350, 250);
        this.assertScrollbars(false, false);
      }
    },
    destruct: function destruct() {
      this.scroller = null;
    }
  });
  qx.test.ui.virtual.Scroller.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Scroller.js.map?dt=1592520332550