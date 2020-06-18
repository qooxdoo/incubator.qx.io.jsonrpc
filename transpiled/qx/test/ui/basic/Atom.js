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
      "qx.dev.unit.MMock": {
        "require": true
      },
      "qx.ui.basic.Atom": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2016- Oetiker+Partner AG, Switzerland, http://www.oetiker.ch
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
     * Fritz Zaucker (fritz.zaucker@oetiker.ch)
  
  ************************************************************************ */
  qx.Class.define("qx.test.ui.basic.Atom", {
    extend: qx.test.ui.LayoutTestCase,
    include: [qx.dev.unit.MMock],
    members: {
      tearDown: function tearDown() {
        this.getSandbox().restore();
      },
      testSelectableSetOnCreation: function testSelectableSetOnCreation() {
        var a = new qx.ui.basic.Atom('test').set({
          selectable: true
        });
        this.getRoot().add(a);
        this.flush();
        var l = a.getChildControl('label');
        this.assertEquals("on", l.getContentElement().getDomElement().getAttribute("qxselectable"));
        a.destroy();
      },
      testSelectableUnSetOnCreation: function testSelectableUnSetOnCreation() {
        var a = new qx.ui.basic.Atom('test').set({
          selectable: false
        });
        this.getRoot().add(a);
        this.flush();
        var l = a.getChildControl('label');
        this.assertEquals("off", l.getContentElement().getDomElement().getAttribute("qxselectable"));
        a.destroy();
      },
      testSelectableSet: function testSelectableSet() {
        var a = new qx.ui.basic.Atom('test');
        a.setSelectable(true);
        this.getRoot().add(a);
        this.flush();
        var l = a.getChildControl('label');
        this.assertEquals("on", l.getContentElement().getDomElement().getAttribute("qxselectable"));
        a.destroy();
      },
      testSelectableUnset: function testSelectableUnset() {
        var a = new qx.ui.basic.Atom('test');
        a.setSelectable(false);
        this.getRoot().add(a);
        this.flush();
        var l = a.getChildControl('label');
        this.assertEquals("off", l.getContentElement().getDomElement().getAttribute("qxselectable"));
        a.destroy();
      }
    }
  });
  qx.test.ui.basic.Atom.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Atom.js.map?dt=1592520328400