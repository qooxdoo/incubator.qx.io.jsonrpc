(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.tree.core.AbstractItem": {
        "construct": true,
        "require": true
      },
      "qx.ui.core.scroll.ScrollPane": {},
      "qx.ui.container.Composite": {},
      "qx.ui.layout.VBox": {},
      "qx.ui.core.queue.Widget": {},
      "qx.event.type.Data": {},
      "qx.lang.Array": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2004-2008 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Fabian Jakobs (fjakobs)
       * Sebastian Werner (wpbasti)
       * Andreas Ecker (ecker)
       * Derrell Lipman (derrell)
  
  ************************************************************************ */

  /**
   * The AbstractTreeItem serves as a common superclass for the {@link
   * qx.ui.tree.TreeFile} and {@link qx.ui.tree.TreeFolder} classes.
   *
   * @childControl label {qx.ui.basic.Label} label of the tree item
   * @childControl icon {qx.ui.basic.Image} icon of the tree item
   * @childControl open {qx.ui.tree.core.FolderOpenButton} button to open/close a subtree
   */
  qx.Class.define("qx.ui.tree.core.AbstractTreeItem", {
    extend: qx.ui.tree.core.AbstractItem,
    type: "abstract",
    construct: function construct(label) {
      qx.ui.tree.core.AbstractItem.constructor.call(this, label);
      this.__children__P_531_0 = [];
    },
    properties: {
      /**
       * The parent tree folder.
       */
      parent: {
        check: "qx.ui.tree.core.AbstractTreeItem",
        nullable: true
      }
    },
    members: {
      __children__P_531_0: null,
      __childrenContainer__P_531_1: null,

      /**
       * Returns the tree the tree item is connected to. If the item is not part of
       * a tree <code>null</code> will be returned.
       *
       * @return {qx.ui.tree.Tree|null} The item's tree or <code>null</code>.
       */
      getTree: function getTree() {
        var treeItem = this;

        while (treeItem.getParent()) {
          treeItem = treeItem.getParent();
        }

        var tree = treeItem.getLayoutParent() ? treeItem.getLayoutParent().getLayoutParent() : 0;

        if (tree && tree instanceof qx.ui.core.scroll.ScrollPane) {
          return tree.getLayoutParent();
        }

        return null;
      },
      // property apply
      _applyOpen: function _applyOpen(value, old) {
        if (this.hasChildren()) {
          this.getChildrenContainer().setVisibility(value ? "visible" : "excluded");
        }

        qx.ui.tree.core.AbstractTreeItem.prototype._applyOpen.base.call(this, value, old);
      },

      /*
      ---------------------------------------------------------------------------
        INDENT HANDLING
      ---------------------------------------------------------------------------
      */
      // overridden
      _shouldShowOpenSymbol: function _shouldShowOpenSymbol() {
        var open = this.getChildControl("open", true);

        if (!open) {
          return false;
        }

        var tree = this.getTree();

        if (!tree.getRootOpenClose()) {
          if (tree.getHideRoot()) {
            if (tree.getRoot() == this.getParent()) {
              return false;
            }
          } else {
            if (tree.getRoot() == this) {
              return false;
            }
          }
        }

        return this.isOpenable();
      },
      // overridden
      _updateIndent: function _updateIndent() {
        if (!this.getTree()) {
          return;
        }

        qx.ui.tree.core.AbstractTreeItem.prototype._updateIndent.base.call(this);
      },
      // overridden
      getLevel: function getLevel() {
        var tree = this.getTree();

        if (!tree) {
          return;
        }

        var treeItem = this;
        var level = -1;

        while (treeItem) {
          treeItem = treeItem.getParent();
          level += 1;
        } // don't count the hidden root node in the tree widget


        if (tree.getHideRoot()) {
          level -= 1;
        }

        if (!tree.getRootOpenClose()) {
          level -= 1;
        }

        return level;
      },

      /*
      ---------------------------------------------------------------------------
        STATE HANDLING
      ---------------------------------------------------------------------------
      */
      // overridden
      addState: function addState(state) {
        qx.ui.tree.core.AbstractTreeItem.prototype.addState.base.call(this, state);

        var children = this._getChildren();

        for (var i = 0, l = children.length; i < l; i++) {
          var child = children[i];

          if (child.addState) {
            children[i].addState(state);
          }
        }
      },
      // overridden
      removeState: function removeState(state) {
        qx.ui.tree.core.AbstractTreeItem.prototype.removeState.base.call(this, state);

        var children = this._getChildren();

        for (var i = 0, l = children.length; i < l; i++) {
          var child = children[i];

          if (child.removeState) {
            children[i].removeState(state);
          }
        }
      },

      /*
      ---------------------------------------------------------------------------
        CHILDREN CONTAINER
      ---------------------------------------------------------------------------
      */

      /**
       * Returns the widget, which acts as container for the child items.
       * This widget must have a vertical box layout.
       *
       * @return {qx.ui.core.Widget} The children container
       */
      getChildrenContainer: function getChildrenContainer() {
        if (!this.__childrenContainer__P_531_1) {
          this.__childrenContainer__P_531_1 = new qx.ui.container.Composite(new qx.ui.layout.VBox()).set({
            visibility: this.isOpen() ? "visible" : "excluded"
          });
        }

        return this.__childrenContainer__P_531_1;
      },

      /**
       * Whether the tree item has a children container
       *
       * @return {Boolean} Whether it has a children container
       */
      hasChildrenContainer: function hasChildrenContainer() {
        return this.__childrenContainer__P_531_1;
      },

      /**
       * Get the children container of the item's parent. This function will return
       * <code>null</code>, if the item does not have a parent or is not the root
       * item.
       *
       * @return {qx.ui.core.Widget} The parent's children container.
       */
      getParentChildrenContainer: function getParentChildrenContainer() {
        if (this.getParent()) {
          return this.getParent().getChildrenContainer();
        } else if (this.getLayoutParent()) {
          return this.getLayoutParent();
        } else {
          return null;
        }
      },

      /*
      ---------------------------------------------------------------------------
        CHILDREN HANDLING
      ---------------------------------------------------------------------------
      */

      /**
       * Get all child items.
       *
       * Note: Don not modify the returned array, since this function does not
       * return a copy!
       *
       * @return {qx.ui.tree.core.AbstractTreeItem[]} An array of all child items.
       */
      getChildren: function getChildren() {
        return this.__children__P_531_0;
      },
      // overridden
      hasChildren: function hasChildren() {
        return this.__children__P_531_0 ? this.__children__P_531_0.length > 0 : false;
      },

      /**
       * Returns all children of the folder.
       *
       * @param recursive {Boolean ? true} whether children of subfolder should be
       *     included
       * @param invisible {Boolean ? true} whether invisible children should be
       *     included
       * @param ignoreFirst {Boolean ? true} Whether the current treeItem should
       *     be excluded from the list.
       * @return {qx.ui.tree.core.AbstractTreeItem[]} list of children
       */
      getItems: function getItems(recursive, invisible, ignoreFirst) {
        if (ignoreFirst !== false) {
          var items = [];
        } else {
          var items = [this];
        }

        var addChildren = this.hasChildren() && (invisible !== false || this.isOpen());

        if (addChildren) {
          var children = this.getChildren();

          if (recursive === false) {
            items = items.concat(children);
          } else {
            for (var i = 0, chl = children.length; i < chl; i++) {
              items = items.concat(children[i].getItems(recursive, invisible, false));
            }
          }
        }

        return items;
      },

      /**
       * Adds this item and recursively all sub items to the widget queue to
       * update the indentation.
       *
       * @internal
       */
      recursiveAddToWidgetQueue: function recursiveAddToWidgetQueue() {
        var children = this.getItems(true, true, false);

        for (var i = 0, l = children.length; i < l; i++) {
          qx.ui.core.queue.Widget.add(children[i]);
        }
      },

      /**
       * Adds the item's children container to the parent's children container.
       */
      __addChildrenToParent__P_531_2: function __addChildrenToParent__P_531_2() {
        if (this.getParentChildrenContainer()) {
          this.getParentChildrenContainer()._addAfter(this.getChildrenContainer(), this);
        }
      },

      /**
       * Adds the passed tree items to the end of this item's children list.
       *
       * @param varargs {qx.ui.tree.core.AbstractTreeItem} variable number of tree items to add
       */
      add: function add(varargs) {
        var container = this.getChildrenContainer();
        var tree = this.getTree();

        for (var i = 0, l = arguments.length; i < l; i++) {
          var treeItem = arguments[i];
          var oldParent = treeItem.getParent();

          if (oldParent) {
            oldParent.remove(treeItem);
          }

          treeItem.setParent(this);
          var hasChildren = this.hasChildren();
          container.add(treeItem);

          if (treeItem.hasChildren()) {
            container.add(treeItem.getChildrenContainer());
          }

          this.__children__P_531_0.push(treeItem);

          if (!hasChildren) {
            this.__addChildrenToParent__P_531_2();
          }

          if (tree) {
            treeItem.recursiveAddToWidgetQueue();
            tree.fireNonBubblingEvent("addItem", qx.event.type.Data, [treeItem]);
          }
        }

        if (tree) {
          qx.ui.core.queue.Widget.add(this);
        }
      },

      /**
       * Adds the tree item to the current item, at the given index.
       *
       * @param treeItem {qx.ui.tree.core.AbstractTreeItem} new tree item to insert
       * @param index {Integer} position to insert into
       */
      addAt: function addAt(treeItem, index) {
        {
          this.assert(index <= this.__children__P_531_0.length && index >= 0, "Invalid child index: " + index);
        }

        if (index == this.__children__P_531_0.length) {
          this.add(treeItem);
          return;
        }

        var oldParent = treeItem.getParent();

        if (oldParent) {
          oldParent.remove(treeItem);
        }

        var container = this.getChildrenContainer();
        treeItem.setParent(this);
        var hasChildren = this.hasChildren();
        var nextItem = this.__children__P_531_0[index];
        container.addBefore(treeItem, nextItem);

        if (treeItem.hasChildren()) {
          container.addAfter(treeItem.getChildrenContainer(), treeItem);
        }

        qx.lang.Array.insertAt(this.__children__P_531_0, treeItem, index);

        if (!hasChildren) {
          this.__addChildrenToParent__P_531_2();
        }

        if (this.getTree()) {
          treeItem.recursiveAddToWidgetQueue();
          qx.ui.core.queue.Widget.add(this);
        }
      },

      /**
       * Add a tree item to this item before the existing child <code>before</code>.
       *
       * @param treeItem {qx.ui.tree.core.AbstractTreeItem} tree item to add
       * @param before {qx.ui.tree.core.AbstractTreeItem} existing child to add the item before
       */
      addBefore: function addBefore(treeItem, before) {
        {
          this.assert(this.__children__P_531_0.indexOf(before) >= 0);
        } // It's important to remove the item before the addAt is called
        // otherwise the index calculation could be wrong

        var oldParent = treeItem.getParent();

        if (oldParent) {
          oldParent.remove(treeItem);
        }

        this.addAt(treeItem, this.__children__P_531_0.indexOf(before));
      },

      /**
       * Add a tree item to this item after the existing child <code>before</code>.
       *
       * @param treeItem {qx.ui.tree.core.AbstractTreeItem} tree item to add
       * @param after {qx.ui.tree.core.AbstractTreeItem} existing child to add the item after
       */
      addAfter: function addAfter(treeItem, after) {
        {
          this.assert(this.__children__P_531_0.indexOf(after) >= 0);
        } // It's important to remove the item before the addAt is called
        // otherwise the index calculation could be wrong

        var oldParent = treeItem.getParent();

        if (oldParent) {
          oldParent.remove(treeItem);
        }

        this.addAt(treeItem, this.__children__P_531_0.indexOf(after) + 1);
      },

      /**
       * Add a tree item as the first child of this item.
       *
       * @param treeItem {qx.ui.tree.core.AbstractTreeItem} tree item to add
       */
      addAtBegin: function addAtBegin(treeItem) {
        this.addAt(treeItem, 0);
      },

      /**
       * Removes the passed tree items from this item.
       *
       * @param varargs {qx.ui.tree.core.AbstractTreeItem} variable number of tree items to remove
       */
      remove: function remove(varargs) {
        for (var i = 0, l = arguments.length; i < l; i++) {
          var treeItem = arguments[i];

          if (this.__children__P_531_0.indexOf(treeItem) == -1) {
            this.warn("Cannot remove treeitem '" + treeItem + "'. It is not a child of this tree item.");
            return;
          }

          var container = this.getChildrenContainer();

          if (treeItem.hasChildrenContainer()) {
            var treeItemChildContainer = treeItem.getChildrenContainer();

            if (container.getChildren().indexOf(treeItemChildContainer) >= 0) {
              // Sometimes not, see bug #3038
              container.remove(treeItemChildContainer);
            }
          }

          qx.lang.Array.remove(this.__children__P_531_0, treeItem);
          treeItem.setParent(null);
          container.remove(treeItem);
        }

        var tree = this.getTree();

        if (tree) {
          tree.fireNonBubblingEvent("removeItem", qx.event.type.Data, [treeItem]);
        }

        qx.ui.core.queue.Widget.add(this);
      },

      /**
       * Remove the child with the given child index.
       *
       * @param index {Integer} Index of the child to remove
       */
      removeAt: function removeAt(index) {
        var item = this.__children__P_531_0[index];

        if (item) {
          this.remove(item);
        }
      },

      /**
       * Remove all child items from this item.
       */
      removeAll: function removeAll() {
        // create a copy for returning
        var children = this.__children__P_531_0.concat();

        for (var i = this.__children__P_531_0.length - 1; i >= 0; i--) {
          this.remove(this.__children__P_531_0[i]);
        }

        return children;
      }
    },
    destruct: function destruct() {
      this._disposeArray("__children__P_531_0");

      this._disposeObjects("__childrenContainer__P_531_1");
    }
  });
  qx.ui.tree.core.AbstractTreeItem.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=AbstractTreeItem.js.map?dt=1599488395004