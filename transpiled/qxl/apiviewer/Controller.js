(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.core.Object": {
        "construct": true,
        "require": true
      },
      "qxl.apiviewer.MWidgetRegistry": {
        "construct": true
      },
      "qxl.apiviewer.ClassLoader": {
        "construct": true
      },
      "qxl.apiviewer.TabViewController": {
        "construct": true
      },
      "qx.bom.History": {
        "construct": true
      },
      "qx.core.Init": {
        "construct": true
      },
      "qxl.apiviewer.dao.Class": {},
      "qxl.apiviewer.dao.Package": {},
      "qxl.apiviewer.UiModel": {},
      "qxl.apiviewer.LoadingIndicator": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2004-2008 1&1 Internet AG, Germany, http://www.1und1.de
       2018 Zenesis Limited, http://www.zenesis.com
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * John Spackman (johnspackman)
       * Til Schneider (til132)
       * Sebastian Werner (wpbasti)
       * Andreas Ecker (ecker)
       * Fabian Jakobs (fjakobs)
       * Jonathan Weiß (jonathan_rass)
       * Henner Kollmann (hkollmann)
  
  ************************************************************************ */

  /**
   * Implements the dynamic behavior of the API viewer. The GUI is defined in
   * {@link Viewer}.
   *
   */
  qx.Class.define("qxl.apiviewer.Controller", {
    extend: qx.core.Object,

    /*
     * ****************************************************************************
     * CONSTRUCTOR
     * ****************************************************************************
     */

    /**
     * @param widgetRegistry
     *          {Viewer} the GUI
     *
     * @ignore (qx.$$appRoot)
     *
     */
    construct: function construct(widgetRegistry) {
      qx.core.Object.constructor.call(this);
      this._widgetRegistry = qxl.apiviewer.MWidgetRegistry;
      this._titlePrefix = "API Documentation";
      document.title = this._titlePrefix;
      qxl.apiviewer.ClassLoader.setBaseUri(`${qx.$$appRoot}../resource/${qxl.apiviewer.ClassLoader.RESOURCEPATH}/`);
      this._detailLoader = this._widgetRegistry.getWidgetById("detail_loader");
      this._tabViewController = new qxl.apiviewer.TabViewController(this._widgetRegistry);

      this.__bindTabViewController__P_594_0();

      this._tree = this._widgetRegistry.getWidgetById("tree");

      this.__bindTree__P_594_1();

      this.__bindToolbar__P_594_2();

      var btn_inherited = this._widgetRegistry.getWidgetById("btn_inherited");

      var btn_included = this._widgetRegistry.getWidgetById("btn_included");

      btn_inherited.addListener("changeValue", this.__syncMenuButton__P_594_3, this);
      btn_included.addListener("changeValue", this.__syncMenuButton__P_594_3, this);
      this._history = qx.bom.History.getInstance();

      this.__bindHistory__P_594_4();

      qx.core.Init.getApplication().getRoot().addListener("pointerdown", function (e) {
        this.__openInNewTab__P_594_5 = e.isShiftPressed() || e.isCtrlOrCommandPressed();
      }, this, true);
    },
    members: {
      __openInNewTab__P_594_5: false,
      // overridden
      $$logCategory: "application",

      /**
       * Loads the API doc tree from the enviroment
       * doc tree.
       * 
       * @param apidata {Object} all the apidata from the enviroment.
       */
      load: function load(apidata) {
        setTimeout(() => {
          var start = new Date();

          for (var classname of apidata.classes) {
            qxl.apiviewer.dao.Class.getClassByName(classname, true);
          }

          var rootPackage = qxl.apiviewer.dao.Package.getPackage(null);
          var end = new Date();
          {
            this.debug("Time to build data tree: " + (end.getTime() - start.getTime()) + "ms");
          }
          start = new Date();

          this._tree.setTreeData(rootPackage);

          end = new Date();
          {
            this.debug("Time to update tree: " + (end.getTime() - start.getTime()) + "ms");
          }
          setTimeout(() => {
            // Handle bookmarks
            var state = this._history.getState();

            if (state) {
              this.__selectItem__P_594_6(this.__decodeState__P_594_7(state));
            } else {
              this.__selectItem__P_594_6("");
            }
          });
        });
      },

      /**
       * binds the events of the TabView controller
       */
      __bindTabViewController__P_594_0: function __bindTabViewController__P_594_0() {
        this._tabViewController.addListener("classLinkTapped", function (evt) {
          this._updateHistory(evt.getData());
        }, this);

        this._tabViewController.addListener("changeSelection", function (evt) {
          var page = evt.getData()[0];

          if (this._ignoreTabViewSelection == true) {
            return;
          }

          if (page && page.getUserData("nodeName")) {
            var nodeName = page.getUserData("nodeName");
            var itemName = page.getUserData("itemName");

            if (itemName === null) {
              this._updateHistory(nodeName);
            } else {
              this._updateHistory(nodeName + "#" + itemName);
            }
          } else {
            this._tree.resetSelection();
          }
        }, this);
      },

      /**
       * binds the selection event of the package tree.
       */
      __bindTree__P_594_1: function __bindTree__P_594_1() {
        this._tree.addListener("changeSelection", function (evt) {
          var treeNode = evt.getData()[0];

          if (treeNode && treeNode.getUserData("nodeName") && !this._ignoreTreeSelection) {
            var nodeName = treeNode.getUserData("nodeName"); // the history update will cause _selectClass to be called.

            this._updateHistory(nodeName);
          }
        }, this);
      },

      /**
       * binds the actions of the toolbar buttons.
       */
      __bindToolbar__P_594_2: function __bindToolbar__P_594_2() {
        var uiModel = qxl.apiviewer.UiModel.getInstance();

        var btn_inherited = this._widgetRegistry.getWidgetById("btn_inherited");

        btn_inherited.bind("value", uiModel, "showInherited");
        uiModel.bind("showInherited", btn_inherited, "value");

        var btn_included = this._widgetRegistry.getWidgetById("btn_included");

        btn_included.bind("value", uiModel, "showIncluded");
        uiModel.bind("showIncluded", btn_included, "value");

        var btn_expand = this._widgetRegistry.getWidgetById("btn_expand");

        btn_expand.bind("value", uiModel, "expandProperties");
        uiModel.bind("expandProperties", btn_expand, "value");

        var btn_protected = this._widgetRegistry.getWidgetById("btn_protected");

        btn_protected.bind("value", uiModel, "showProtected");
        uiModel.bind("showProtected", btn_protected, "value");

        var btn_private = this._widgetRegistry.getWidgetById("btn_private");

        btn_private.bind("value", uiModel, "showPrivate");
        uiModel.bind("showPrivate", btn_private, "value");

        var btn_internal = this._widgetRegistry.getWidgetById("btn_internal");

        btn_internal.bind("value", uiModel, "showInternal");
        uiModel.bind("showInternal", btn_internal, "value");
      },

      /**
       * Keeps the icon of the menubutton in sync with the menu checkboxes of
       * inherited and mixin includes.
       * 
       */
      __syncMenuButton__P_594_3: function __syncMenuButton__P_594_3() {
        var menuButton = this._widgetRegistry.getWidgetById("menubtn_includes");

        var btn_inherited = this._widgetRegistry.getWidgetById("btn_inherited");

        var btn_included = this._widgetRegistry.getWidgetById("btn_included");

        var showInherited = btn_inherited.getValue();
        var showMixins = btn_included.getValue();

        if (showMixins && showInherited) {
          menuButton.setIcon("qxl/apiviewer/image/inherited_and_mixins_included.gif");
        }

        if (showInherited && !showMixins) {
          menuButton.setIcon("qxl/apiviewer/image/method_public_inherited18.gif");
        }

        if (!showInherited && showMixins) {
          menuButton.setIcon("qxl/apiviewer/image/overlay_mixin18.gif");
        }

        if (!showInherited && !showMixins) {
          menuButton.setIcon("qxl/apiviewer/image/includes.gif");
        }
      },

      /**
       * bind history events
       */
      __bindHistory__P_594_4: function __bindHistory__P_594_4() {
        this._history.addListener("changeState", function (evt) {
          var item = this.__decodeState__P_594_7(evt.getData());

          if (item) {
            this.__selectItem__P_594_6(item);
          }
        }, this);
      },

      /**
       * Push the class to the browser history
       * 
       * @param className
       *          {String} name of the class
       */
      _updateHistory: function _updateHistory(className) {
        var newTitle = className + " - " + this._titlePrefix;
        qx.bom.History.getInstance().addToHistory(this.__encodeState__P_594_8(className), newTitle);
      },

      /**
       * Display information about a class
       * 
       * @param classNode
       *          {qxl.apiviewer.dao.Class} class node to display
       */
      _selectClass: async function _selectClass(classNode, callback, self) {
        this._detailLoader.exclude();

        this._tabViewController.showTabView();

        await classNode.loadDependedClasses();

        if (classNode instanceof qxl.apiviewer.dao.Class) {
          await this._tabViewController.openClass(classNode, this.__openInNewTab__P_594_5);
        } else {
          await this._tabViewController.openPackage(classNode, this.__openInNewTab__P_594_5);
        }

        callback && callback.call(self);
      },

      /**
       * Selects an item (class, property, method or constant).
       * 
       * @param fullItemName
       *          {String} the full name of the item to select. (e.g.
       *          "qx.mypackage.MyClass" or "qx.mypackage.MyClass#myProperty")
       * 
       */
      __selectItem__P_594_6: function __selectItem__P_594_6(fullItemName) {
        qxl.apiviewer.LoadingIndicator.getInstance().show();
        var className = fullItemName;
        var itemName = null;
        var hashPos = fullItemName.indexOf("#");

        if (hashPos != -1) {
          className = fullItemName.substring(0, hashPos);
          itemName = fullItemName.substring(hashPos + 1);
          var parenPos = itemName.indexOf("(");

          if (parenPos != -1) {
            itemName = itemName.substring(0, parenPos).trim();
          }
        } // ignore changeSelection events


        this._ignoreTreeSelection = true;

        this._tree.selectTreeNodeByClassName(className).then(couldSelectTreeNode => {
          this._ignoreTreeSelection = false;

          if (!couldSelectTreeNode) {
            this.error("Unknown class: " + className);
            qxl.apiviewer.LoadingIndicator.getInstance().hide();
            return;
          }

          var sel = this._tree.getSelection();

          var nodeName = sel[0].getUserData("nodeName") || className;
          this._ignoreTabViewSelection = true;

          this._selectClass(qxl.apiviewer.ClassLoader.getClassOrPackage(nodeName), () => {
            if (itemName) {
              this._tabViewController.isLoaded(() => {
                if (!this._tabViewController.showItem(itemName)) {
                  this.error("Unknown item of class '" + className + "': " + itemName);
                  qxl.apiviewer.LoadingIndicator.getInstance().hide();

                  this._updateHistory(className);

                  this._ignoreTabViewSelection = false;
                  return;
                }

                this._updateHistory(fullItemName);

                qxl.apiviewer.LoadingIndicator.getInstance().hide();
                this._ignoreTabViewSelection = false;
              });
            } else {
              qxl.apiviewer.LoadingIndicator.getInstance().hide();
              this._ignoreTabViewSelection = false;
            }
          });
        });
      },
      __encodeState__P_594_8: function __encodeState__P_594_8(state) {
        return state.replace(/(.*)#(.*)/g, "$1~$2");
      },
      __decodeState__P_594_7: function __decodeState__P_594_7(encodedState) {
        return encodedState.replace(/(.*)~(.*)/g, "$1#$2");
      }
    },

    /*
     * ****************************************************************************
     * DESTRUCTOR
     * ****************************************************************************
     */
    destruct: function destruct() {
      this._widgetRegistry = null;

      this._disposeObjects("_detailLoader", "_tree", "_history", "_tabViewController");
    }
  });
  qxl.apiviewer.Controller.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Controller.js.map?dt=1605962054326