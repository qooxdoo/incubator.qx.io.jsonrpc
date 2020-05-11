(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.test.mobile.MobileTestCase": {
        "require": true
      },
      "qx.data.Array": {},
      "qx.ui.mobile.list.List": {},
      "qx.ui.mobile.list.renderer.Default": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2011 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Tino Butz (tbtz)
  
  ************************************************************************ */

  /* ************************************************************************
  ************************************************************************ */

  /**
   *
   * @asset(qx/icon/Tango/48/places/folder.png)
   */
  qx.Class.define("qx.test.mobile.list.List", {
    extend: qx.test.mobile.MobileTestCase,
    members: {
      /**
      * Returns the img element on the given list, of the element item identified by elementIndex.
      */
      getImageElement: function getImageElement(list, elementIndex) {
        return list.getContentElement().childNodes[elementIndex].childNodes[0];
      },

      /**
      * Returns the title text on the given list, of the element item identified by elementIndex.
      */
      getTitleElement: function getTitleElement(list, elementIndex) {
        return list.getContentElement().childNodes[elementIndex].childNodes[1].childNodes[0];
      },

      /**
       * Returns the subtitle text on the given list, of the element item identified by elementIndex.
       */
      getSubtitleElement: function getSubtitleElement(list, elementIndex) {
        return list.getContentElement().childNodes[elementIndex].childNodes[1].childNodes[1];
      },
      __createModel: function __createModel() {
        var data = [];
        data.push({
          title: "1",
          subtitle: "s1",
          image: "qx/icon/Tango/48/places/folder.png"
        });
        data.push({
          title: "2",
          subtitle: "s2",
          image: "qx/icon/Tango/48/places/folder.png"
        });
        data.push({
          title: "3",
          subtitle: "s3",
          image: "qx/icon/Tango/48/places/folder.png"
        });
        data.push({
          title: "4",
          subtitle: "s4",
          image: "qx/icon/Tango/48/places/folder.png"
        });
        data.push({
          title: "5",
          subtitle: "s5",
          image: "qx/icon/Tango/48/places/folder.png"
        });
        return new qx.data.Array(data);
      },
      __createList: function __createList(createItemRenderer, configureItemFunction) {
        var list = new qx.ui.mobile.list.List();
        this.getRoot().add(list);
        list.setDelegate({
          configureItem: configureItemFunction ? configureItemFunction : this.__configureItemFunction,
          createItemRenderer: createItemRenderer ? createItemRenderer : null
        });
        list.setModel(this.__createModel());
        return list;
      },
      __configureItemFunction: function __configureItemFunction(item, data, row) {
        item.setImage(data.image);
        item.setTitle(data.title);
        item.setSubtitle(data.subtitle);
      },
      __assertItemsAndModelLength: function __assertItemsAndModelLength(list, dataLength) {
        var childrenLength = list.getContentElement().childNodes.length;
        this.assertEquals(dataLength, childrenLength);
      },
      __cleanUp: function __cleanUp(list) {
        list.destroy();
        var modelData = list.getModel();

        if (modelData) {
          modelData.dispose();
          modelData = null;
        }
      },
      testCreate: function testCreate() {
        var list = this.__createList();

        this.__assertItemsAndModelLength(list, 5);

        this.__cleanUp(list);
      },
      testCustomRenderer: function testCustomRenderer() {
        var list = this.__createList(function () {
          return new qx.ui.mobile.list.renderer.Default();
        });

        this.__assertItemsAndModelLength(list, 5);

        this.__cleanUp(list);
      },
      testSetModelNull: function testSetModelNull() {
        var list = this.__createList(function () {
          return new qx.ui.mobile.list.renderer.Default();
        });

        this.__assertItemsAndModelLength(list, 5);

        list.getModel().dispose();
        list.setModel(null);

        this.__assertItemsAndModelLength(list, 0);

        this.__cleanUp(list);
      },
      testModelChangeRemove: function testModelChangeRemove() {
        var list = this.__createList(function () {
          return new qx.ui.mobile.list.renderer.Default();
        });

        this.__assertItemsAndModelLength(list, 5);

        list.getModel().removeAt(0);

        this.__assertItemsAndModelLength(list, 4);

        this.__cleanUp(list);
      },
      testModelChangeEdit: function testModelChangeEdit() {
        var list = this.__createList(function () {
          return new qx.ui.mobile.list.renderer.Default();
        });

        this.__assertItemsAndModelLength(list, 5);

        list.getModel().setItem(0, {
          title: "affe",
          subtitle: "1",
          image: "qx/icon/Tango/48/places/folder.png"
        });

        this.__assertItemsAndModelLength(list, 5);

        var titleText = this.getTitleElement(list, 0).innerHTML;
        this.assertEquals("affe", titleText);

        this.__cleanUp(list);
      },

      /** Test Case for [BUG #7267] for different length of edited string value. */
      testModelChangeStringLength: function testModelChangeStringLength() {
        var list = this.__createList(function () {
          return new qx.ui.mobile.list.renderer.Default();
        });

        this.__assertItemsAndModelLength(list, 5);

        var newImageSrc = "qx/icon/Tango/52/places/folder.png";
        var newTitleText = "Giraffe";
        var newSubtitleText = "subtitle1";
        list.getModel().setItem(0, {
          title: newTitleText,
          subtitle: newSubtitleText,
          image: newImageSrc
        });

        this.__assertItemsAndModelLength(list, 5);

        var titleText = this.getTitleElement(list, 0).innerHTML;
        ;
        var subtitleText = this.getSubtitleElement(list, 0).innerHTML;
        var imageSrc = this.getImageElement(list, 0).src; // VERIFY

        this.assertEquals(newTitleText, titleText);
        this.assertEquals(newSubtitleText, subtitleText);
        this.assertNotEquals("-1", imageSrc.indexOf(newImageSrc));

        this.__cleanUp(list);
      },
      testModelChangeAdd: function testModelChangeAdd() {
        var list = this.__createList(function () {
          return new qx.ui.mobile.list.renderer.Default();
        });

        this.__assertItemsAndModelLength(list, 5);

        list.getModel().push({
          title: "6",
          subtitle: "6",
          image: "qx/icon/Tango/48/places/folder.png"
        });

        this.__assertItemsAndModelLength(list, 6);

        this.__cleanUp(list);
      },
      testExtractRowsToRender: function testExtractRowsToRender() {
        var list = new qx.ui.mobile.list.List();
        this.assertArrayEquals([0], list._extractRowsToRender("0"));
        this.assertArrayEquals([0], list._extractRowsToRender("[0].propertyName"));
        this.assertArrayEquals([0, 1, 2], list._extractRowsToRender("[0-2].propertyName"));
        this.assertArrayEquals([12, 13, 14], list._extractRowsToRender("[12-14].propertyName"));
        list.destroy();
      }
    }
  });
  qx.test.mobile.list.List.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=List.js.map?dt=1589218261295