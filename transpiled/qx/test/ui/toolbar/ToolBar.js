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
      "qx.ui.toolbar.ToolBar": {},
      "qx.ui.toolbar.Button": {},
      "qx.ui.toolbar.Part": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2004-2012 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Martin Wittemann (wittemann)
  
  ************************************************************************ */
  qx.Class.define("qx.test.ui.toolbar.ToolBar", {
    extend: qx.test.ui.LayoutTestCase,
    members: {
      setUp: function setUp() {
        qx.test.ui.toolbar.ToolBar.prototype.setUp.base.call(this);
        this.__toolbar__P_335_0 = new qx.ui.toolbar.ToolBar();
        this.__b1__P_335_1 = new qx.ui.toolbar.Button("b1");
        this.__b2__P_335_2 = new qx.ui.toolbar.Button("b2");
        this.__b3__P_335_3 = new qx.ui.toolbar.Button("b3");
      },
      tearDown: function tearDown() {
        qx.test.ui.toolbar.ToolBar.prototype.tearDown.base.call(this);

        this.__b1__P_335_1.dispose();

        this.__b2__P_335_2.dispose();

        this.__b3__P_335_3.dispose();

        this.__toolbar__P_335_0.dispose();
      },
      testShowSyncing: function testShowSyncing() {
        // setup toolbar with two buttons
        this.__toolbar__P_335_0.add(this.__b1__P_335_1);

        this.__toolbar__P_335_0.add(this.__b2__P_335_2); // set a value and check if the buttons get synced


        this.__toolbar__P_335_0.setShow("label");

        this.assertEquals("label", this.__b1__P_335_1.getShow());
        this.assertEquals("label", this.__b2__P_335_2.getShow()); // add another button and check if the value has been applied

        this.__toolbar__P_335_0.add(this.__b3__P_335_3);

        this.assertEquals("label", this.__b3__P_335_3.getShow());
      },
      testPositionStates: function testPositionStates() {
        var part = new qx.ui.toolbar.Part();
        part.add(this.__b1__P_335_1);
        part.add(this.__b2__P_335_2);
        part.add(this.__b3__P_335_3);

        this.__toolbar__P_335_0.add(part);

        this.getRoot().add(this.__toolbar__P_335_0);
        this.flush();
        this.assertTrue(this.__b1__P_335_1.hasState("left"));
        this.assertTrue(this.__b2__P_335_2.hasState("middle"));
        this.assertTrue(this.__b3__P_335_3.hasState("right"));
        part.dispose();
      },
      testPositionStatesAdd: function testPositionStatesAdd() {
        var part = new qx.ui.toolbar.Part();
        part.add(this.__b1__P_335_1);
        part.add(this.__b3__P_335_3);

        this.__toolbar__P_335_0.add(part);

        this.getRoot().add(this.__toolbar__P_335_0);
        this.flush();
        this.assertTrue(this.__b1__P_335_1.hasState("left"));
        this.assertTrue(this.__b3__P_335_3.hasState("right"));
        part.addAt(this.__b2__P_335_2, 1);
        this.flush();
        this.assertTrue(this.__b1__P_335_1.hasState("left"));
        this.assertTrue(this.__b2__P_335_2.hasState("middle"));
        this.assertTrue(this.__b3__P_335_3.hasState("right"));
        part.dispose();
      },
      testPositionStatesRemove: function testPositionStatesRemove() {
        var part = new qx.ui.toolbar.Part();
        part.add(this.__b1__P_335_1);
        part.add(this.__b2__P_335_2);
        part.add(this.__b3__P_335_3);

        this.__toolbar__P_335_0.add(part);

        this.getRoot().add(this.__toolbar__P_335_0);
        this.flush();
        this.assertTrue(this.__b1__P_335_1.hasState("left"));
        this.assertTrue(this.__b2__P_335_2.hasState("middle"));
        this.assertTrue(this.__b3__P_335_3.hasState("right"));
        part.remove(this.__b1__P_335_1);
        this.flush();
        this.assertTrue(this.__b2__P_335_2.hasState("left"));
        this.assertTrue(this.__b3__P_335_3.hasState("right"));
        part.dispose();
      },
      testShowUserValueShouldTakePrecedence: function testShowUserValueShouldTakePrecedence() {
        // setup toolbar with two buttons
        this.__toolbar__P_335_0.add(this.__b1__P_335_1);

        this.__toolbar__P_335_0.add(this.__b2__P_335_2); // assert 'label' isn't default show val


        this.assertNotEquals("label", this.__b1__P_335_1.getShow());
        this.assertNotEquals("label", this.__b2__P_335_2.getShow()); // initialize toolbar with 'label'

        this.__toolbar__P_335_0.setShow("label");

        this.assertEquals("label", this.__b1__P_335_1.getShow());
        this.assertEquals("label", this.__b2__P_335_2.getShow()); // override it for button1

        this.__b1__P_335_1.setShow("icon");

        this.assertEquals("icon", this.__b1__P_335_1.getShow());
        this.assertEquals("label", this.__b2__P_335_2.getShow()); // change it afterwards

        this.__toolbar__P_335_0.setShow("both");

        this.__toolbar__P_335_0.add(this.__b3__P_335_3); // assert all 'both'


        this.assertEquals("both", this.__b1__P_335_1.getShow());
        this.assertEquals("both", this.__b2__P_335_2.getShow());
        this.assertEquals("both", this.__b3__P_335_3.getShow());
      },
      testRemoveChildByIndex: function testRemoveChildByIndex() {
        this.__toolbar__P_335_0.removeAll(); // setup toolbar with three buttons


        this.__toolbar__P_335_0.add(this.__b1__P_335_1);

        this.__toolbar__P_335_0.add(this.__b2__P_335_2);

        this.__toolbar__P_335_0.add(this.__b3__P_335_3); // assert finding child __b2 on index 1


        var indexB2 = this.__toolbar__P_335_0.indexOf(this.__b2__P_335_2);

        this.assertEquals(1, indexB2); // assert removing child at index 1

        var childB2 = this.__toolbar__P_335_0.removeAt(1);

        this.assertEquals(childB2, this.__b2__P_335_2); // assert length of remaining and removed children array being now 2

        var children = this.__toolbar__P_335_0.removeAll();

        this.assertEquals(2, children.length);
      },
      testRemoveAllChildren: function testRemoveAllChildren() {
        this.__toolbar__P_335_0.removeAll(); // setup toolbar with two buttons


        this.__toolbar__P_335_0.add(this.__b1__P_335_1);

        this.__toolbar__P_335_0.add(this.__b2__P_335_2); // assert length of removed children array


        var children = this.__toolbar__P_335_0.removeAll();

        this.assertEquals(2, children.length); // assert empty children array

        children = this.__toolbar__P_335_0.removeAll();
        this.assertEquals(0, children.length);
      }
    }
  });
  qx.test.ui.toolbar.ToolBar.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=ToolBar.js.map?dt=1606253515863