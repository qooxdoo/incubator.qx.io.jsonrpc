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
      "qx.data.controller.MSelection": {
        "require": true
      },
      "qx.data.controller.ISelection": {
        "require": true
      },
      "qx.ui.core.queue.Widget": {},
      "qx.ui.form.ListItem": {},
      "qx.data.Array": {},
      "qx.lang.Object": {},
      "qx.lang.Function": {}
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
       * Martin Wittemann (martinwittemann)
  
  ************************************************************************ */

  /**
   * <h2>List Controller</h2>
   *
   * *General idea*
   * The list controller is responsible for synchronizing every list like widget
   * with a data array. It does not matter if the array contains atomic values
   * like strings of complete objects where one property holds the value for
   * the label and another property holds the icon url. You can even use converters
   * that make the label show a text corresponding to the icon, by binding both
   * label and icon to the same model property and converting one of them.
   *
   * *Features*
   *
   * * Synchronize the model and the target
   * * Label and icon are bindable
   * * Takes care of the selection
   * * Passes on the options used by {@link qx.data.SingleValueBinding#bind}
   *
   * *Usage*
   *
   * As model, only {@link qx.data.Array}s do work. The currently supported
   * targets are
   *
   * * {@link qx.ui.form.SelectBox}
   * * {@link qx.ui.form.List}
   * * {@link qx.ui.form.ComboBox}
   *
   * All the properties like model, target or any property path is bindable.
   * Especially the model is nice to bind to another selection for example.
   * The controller itself can only work if it has a model and a target set. The
   * rest of the properties may be empty.
   *
   * *Cross reference*
   *
   * * If you want to bind single values, use {@link qx.data.controller.Object}
   * * If you want to bind a tree widget, use {@link qx.data.controller.Tree}
   * * If you want to bind a form widget, use {@link qx.data.controller.Form}
   */
  qx.Class.define("qx.data.controller.List", {
    extend: qx.core.Object,
    include: qx.data.controller.MSelection,
    implement: qx.data.controller.ISelection,

    /*
    *****************************************************************************
       CONSTRUCTOR
    *****************************************************************************
    */

    /**
     * @param model {qx.data.Array?null} The array containing the data.
     *
     * @param target {qx.ui.core.Widget?null} The widget which should show the
     *   ListItems.
     *
     * @param labelPath {String?null} If the model contains objects, the labelPath
     *   is the path reference to the property in these objects which should be
     *   shown as label.
     */
    construct: function construct(model, target, labelPath) {
      qx.core.Object.constructor.call(this); // lookup table for filtering and sorting

      this.__lookupTable__P_89_0 = []; // register for bound target properties and onUpdate methods
      // from the binding options

      this.__boundProperties__P_89_1 = [];
      this.__boundPropertiesReverse__P_89_2 = [];
      this.__onUpdate__P_89_3 = {};

      if (labelPath != null) {
        this.setLabelPath(labelPath);
      }

      if (model != null) {
        this.setModel(model);
      }

      if (target != null) {
        this.setTarget(target);
      }
    },

    /*
    *****************************************************************************
       PROPERTIES
    *****************************************************************************
    */
    properties: {
      /** Data array containing the data which should be shown in the list. */
      model: {
        check: "qx.data.IListData",
        apply: "_applyModel",
        event: "changeModel",
        nullable: true,
        dereference: true
      },

      /** The target widget which should show the data. */
      target: {
        apply: "_applyTarget",
        event: "changeTarget",
        nullable: true,
        init: null,
        dereference: true
      },

      /**
       * The path to the property which holds the information that should be
       * shown as a label. This is only needed if objects are stored in the model.
       */
      labelPath: {
        check: "String",
        apply: "_applyLabelPath",
        nullable: true
      },

      /**
       * The path to the property which holds the information that should be
       * shown as an icon. This is only needed if objects are stored in the model
       * and if the icon should be shown.
       */
      iconPath: {
        check: "String",
        apply: "_applyIconPath",
        nullable: true
      },

      /**
       * A map containing the options for the label binding. The possible keys
       * can be found in the {@link qx.data.SingleValueBinding} documentation.
       */
      labelOptions: {
        apply: "_applyLabelOptions",
        nullable: true
      },

      /**
       * A map containing the options for the icon binding. The possible keys
       * can be found in the {@link qx.data.SingleValueBinding} documentation.
       */
      iconOptions: {
        apply: "_applyIconOptions",
        nullable: true
      },

      /**
       * Delegation object, which can have one or more functions defined by the
       * {@link IControllerDelegate} interface.
       */
      delegate: {
        apply: "_applyDelegate",
        event: "changeDelegate",
        init: null,
        nullable: true
      },

      /**
       * Whether a special "null" value is included in the list
       */
      allowNull: {
        apply: "_applyAllowNull",
        event: "changeAllowNull",
        init: false,
        nullable: false,
        check: "Boolean"
      },

      /**
       * Title for the special null value entry
       */
      nullValueTitle: {
        apply: "_applyNullValueTitle",
        event: "changeNullValueTitle",
        init: null,
        nullable: true,
        check: "String"
      },

      /**
       * Icon for the special null value entry
       */
      nullValueIcon: {
        apply: "_applyNullValueIcon",
        event: "changeNullValueIcon",
        init: null,
        nullable: true,
        check: "String"
      }
    },

    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */
    members: {
      // private members
      __changeModelListenerId__P_89_4: null,
      __lookupTable__P_89_0: null,
      __onUpdate__P_89_3: null,
      __boundProperties__P_89_1: null,
      __boundPropertiesReverse__P_89_2: null,
      __syncTargetSelection__P_89_5: null,
      __syncModelSelection__P_89_6: null,

      /*
      ---------------------------------------------------------------------------
         PUBLIC API
      ---------------------------------------------------------------------------
      */

      /**
       * Updates the filter and the target. This could be used if the filter
       * uses an additional parameter which changes the filter result.
       */
      update: function update() {
        this.__changeModelLength__P_89_7();

        this.__renewBindings__P_89_8();

        this._updateSelection();
      },

      /*
      ---------------------------------------------------------------------------
         APPLY METHODS
      ---------------------------------------------------------------------------
      */

      /**
       * If a new delegate is set, it applies the stored configuration for the
       * list items to the already created list items once.
       *
       * @param value {qx.core.Object|null} The new delegate.
       * @param old {qx.core.Object|null} The old delegate.
       */
      _applyDelegate: function _applyDelegate(value, old) {
        this._setConfigureItem(value, old);

        this._setFilter(value, old);

        this._setCreateItem(value, old);

        this._setBindItem(value, old);
      },

      /**
       * Apply-method which will be called if the icon options has been changed.
       * It invokes a renewing of all set bindings.
       *
       * @param value {Map|null} The new icon options.
       * @param old {Map|null} The old icon options.
       */
      _applyIconOptions: function _applyIconOptions(value, old) {
        this.__renewBindings__P_89_8();
      },

      /**
       * Apply-method which will be called if the label options has been changed.
       * It invokes a renewing of all set bindings.
       *
       * @param value {Map|null} The new label options.
       * @param old {Map|null} The old label options.
       */
      _applyLabelOptions: function _applyLabelOptions(value, old) {
        this.__renewBindings__P_89_8();
      },

      /**
       * Apply-method which will be called if the icon path has been changed.
       * It invokes a renewing of all set bindings.
       *
       * @param value {String|null} The new icon path.
       * @param old {String|null} The old icon path.
       */
      _applyIconPath: function _applyIconPath(value, old) {
        this.__renewBindings__P_89_8();
      },

      /**
       * Apply-method which will be called if the label path has been changed.
       * It invokes a renewing of all set bindings.
       *
       * @param value {String|null} The new label path.
       * @param old {String|null} The old label path.
       */
      _applyLabelPath: function _applyLabelPath(value, old) {
        this.__renewBindings__P_89_8();
      },

      /**
       * Apply method for the `allowNull` property 
       */
      _applyAllowNull: function _applyAllowNull(value, oldValue) {
        this.__refreshModel__P_89_9();
      },

      /**
       * Apply method for the `allowNull` property 
       */
      _applyNullValueTitle: function _applyNullValueTitle(value, oldValue) {
        this.__refreshModel__P_89_9();
      },

      /**
       * Apply method for the `allowNull` property 
       */
      _applyNullValueIcon: function _applyNullValueIcon(value, oldValue) {
        this.__refreshModel__P_89_9();
      },

      /**
       * Refreshes the model, uses when the model and target are not changing but the appearance
       * and bindings may need to be updated
       */
      __refreshModel__P_89_9: function __refreshModel__P_89_9() {
        if (this.getModel() && this.getTarget()) {
          this.update();
        }
      },

      /**
       * Apply-method which will be called if the model has been changed. It
       * removes all the listeners from the old model and adds the needed
       * listeners to the new model. It also invokes the initial filling of the
       * target widgets if there is a target set.
       *
       * @param value {qx.data.Array|null} The new model array.
       * @param old {qx.data.Array|null} The old model array.
       */
      _applyModel: function _applyModel(value, old) {
        // remove the old listener
        if (old != undefined) {
          if (this.__changeModelListenerId__P_89_4 != undefined) {
            old.removeListenerById(this.__changeModelListenerId__P_89_4);
          }
        } // erase the selection if there is something selected


        if (this.getSelection() != undefined && this.getSelection().length > 0) {
          this.getSelection().splice(0, this.getSelection().length).dispose();
        } // if a model is set


        if (value != null) {
          // add a new listener
          this.__changeModelListenerId__P_89_4 = value.addListener("change", this.__changeModel__P_89_10, this); // renew the index lookup table

          this.__buildUpLookupTable__P_89_11(); // check for the new length


          this.__changeModelLength__P_89_7(); // as we only change the labels of the items, the selection change event
          // may be missing so we invoke it here


          if (old == null) {
            this._changeTargetSelection();
          } else {
            // update the selection asynchronously
            this.__syncTargetSelection__P_89_5 = true;
            qx.ui.core.queue.Widget.add(this);
          }
        } else {
          var target = this.getTarget(); // if the model is set to null, we should remove all items in the target

          if (target != null) {
            // we need to remove the bindings too so use the controller method
            // for removing items
            var length = target.getChildren().length;

            for (var i = 0; i < length; i++) {
              this.__removeItem__P_89_12();
            }

            ;
          }
        }
      },

      /**
       * Apply-method which will be called if the target has been changed.
       * When the target changes, every binding needs to be reset and the old
       * target needs to be cleaned up. If there is a model, the target will be
       * filled with the data of the model.
       *
       * @param value {qx.ui.core.Widget|null} The new target.
       * @param old {qx.ui.core.Widget|null} The old target.
       */
      _applyTarget: function _applyTarget(value, old) {
        // add a listener for the target change
        this._addChangeTargetListener(value, old); // if there was an old target


        if (old != undefined) {
          // remove all element of the old target
          var removed = old.removeAll();

          for (var i = 0; i < removed.length; i++) {
            removed[i].destroy();
          } // remove all bindings


          this.removeAllBindings();
        }

        if (value != null) {
          if (this.getModel() != null) {
            // add a binding for all elements in the model
            for (var i = 0; i < this.__lookupTable__P_89_0.length; i++) {
              this.__addItem__P_89_13(this.__lookup__P_89_14(i));
            }
          }
        }
      },

      /*
      ---------------------------------------------------------------------------
         EVENT HANDLER
      ---------------------------------------------------------------------------
      */

      /**
       * Event handler for the change event of the model. If the model changes,
       * Only the selection needs to be changed. The change of the data will
       * be done by the binding.
       */
      __inChangeModel__P_89_15: false,

      /**
       * Event handler for the changeModel of the model. Updates the controller.
       */
      __changeModel__P_89_10: function __changeModel__P_89_10() {
        if (this.__inChangeModel__P_89_15) {
          return;
        }

        this.__inChangeModel__P_89_15 = true; // need an asynchronous selection update because the bindings have to be
        // executed to update the selection probably (using the widget queue)
        // this.__syncTargetSelection = true;

        this.__syncModelSelection__P_89_6 = true;
        qx.ui.core.queue.Widget.add(this); // update on filtered lists... (bindings need to be renewed)

        this.update();
        this.__inChangeModel__P_89_15 = false;
      },

      /**
       * Internal method used to sync the selection. The controller uses the
       * widget queue to schedule the selection update. An asynchronous handling of
       * the selection is needed because the bindings (event listeners for the
       * binding) need to be executed before the selection is updated.
       * @internal
       */
      syncWidget: function syncWidget() {
        if (this.__syncTargetSelection__P_89_5) {
          this._changeTargetSelection();
        }

        if (this.__syncModelSelection__P_89_6) {
          this._updateSelection();
        }

        this.__syncModelSelection__P_89_6 = this.__syncTargetSelection__P_89_5 = null;
      },

      /**
       * Event handler for the changeLength of the model. If the length changes
       * of the model, either ListItems need to be removed or added to the target.
       */
      __changeModelLength__P_89_7: function __changeModelLength__P_89_7() {
        // only do something if there is a target
        if (this.getTarget() == null) {
          return;
        } // build up the look up table


        this.__buildUpLookupTable__P_89_11(); // get the length


        var newLength = this.__lookupTable__P_89_0.length;
        var currentLength = this.getTarget().getChildren().length; // if there are more item

        if (newLength > currentLength) {
          // add the new elements
          for (var j = currentLength; j < newLength; j++) {
            this.__addItem__P_89_13(this.__lookup__P_89_14(j));
          } // if there are less elements

        } else if (newLength < currentLength) {
          // remove the unnecessary items
          for (var j = currentLength; j > newLength; j--) {
            this.__removeItem__P_89_12();
          }
        } // build up the look up table


        this.__buildUpLookupTable__P_89_11(); // sync the target selection in case someone deleted a item in
        // selection mode "one" [BUG #4839]


        this.__syncTargetSelection__P_89_5 = true;
        qx.ui.core.queue.Widget.add(this);
      },

      /**
       * Helper method which removes and adds the change listener of the
       * controller to the model. This is sometimes necessary to ensure that the
       * listener of the controller is executed as the last listener of the chain.
       */
      __moveChangeListenerAtTheEnd__P_89_16: function __moveChangeListenerAtTheEnd__P_89_16() {
        var model = this.getModel(); // it can be that the bindings has been reset without the model so
        // maybe there is no model in some scenarios

        if (model != null) {
          model.removeListenerById(this.__changeModelListenerId__P_89_4);
          this.__changeModelListenerId__P_89_4 = model.addListener("change", this.__changeModel__P_89_10, this);
        }
      },

      /*
      ---------------------------------------------------------------------------
         ITEM HANDLING
      ---------------------------------------------------------------------------
      */

      /**
       * Creates a ListItem and delegates the configure method if a delegate is
       * set and the needed function (configureItem) is available.
       *
       * @return {qx.ui.form.ListItem} The created and configured ListItem.
       */
      _createItem: function _createItem() {
        var delegate = this.getDelegate(); // check if a delegate and a create method is set

        if (delegate != null && delegate.createItem != null) {
          var item = delegate.createItem();
        } else {
          var item = new qx.ui.form.ListItem();
        } // if there is a configure method, invoke it


        if (delegate != null && delegate.configureItem != null) {
          delegate.configureItem(item);
        }

        return item;
      },

      /**
       * Internal helper to add ListItems to the target including the creation
       * of the binding.
       *
       * @param index {Number} The index of the item to add.
       */
      __addItem__P_89_13: function __addItem__P_89_13(index) {
        // create a new ListItem
        var listItem = this._createItem(); // set up the binding


        this._bindListItem(listItem, index); // add the ListItem to the target


        this.getTarget().add(listItem);
      },

      /**
       * Internal helper to remove ListItems from the target. Also the binding
       * will be removed properly.
       */
      __removeItem__P_89_12: function __removeItem__P_89_12() {
        this._startSelectionModification();

        var children = this.getTarget().getChildren(); // get the last binding id

        var index = children.length - 1; // get the item

        var oldItem = children[index];

        this._removeBindingsFrom(oldItem); // remove the item


        this.getTarget().removeAt(index);
        oldItem.destroy();

        this._endSelectionModification();
      },

      /**
       * Returns all models currently visible by the list. This method is only
       * useful if you use the filter via the {@link #delegate}.
       *
       * @return {qx.data.Array} A new data array container all the models
       *   which representation items are currently visible.
       */
      getVisibleModels: function getVisibleModels() {
        var visibleModels = [];
        var target = this.getTarget();

        if (target != null) {
          var items = target.getChildren();

          for (var i = 0; i < items.length; i++) {
            visibleModels.push(items[i].getModel());
          }

          ;
        }

        return new qx.data.Array(visibleModels);
      },

      /*
      ---------------------------------------------------------------------------
         BINDING STUFF
      ---------------------------------------------------------------------------
      */

      /**
       * Sets up the binding for the given ListItem and index.
       *
       * @param item {qx.ui.form.ListItem} The internally created and used
       *   ListItem.
       * @param index {Number} The index of the ListItem.
       */
      _bindListItem: function _bindListItem(item, index) {
        // -1 is the special, "null" value item.  Nothing to bind, just fix the display and model
        if (index < 0) {
          item.setLabel(this.getNullValueTitle() || "");
          item.setIcon(this.getNullValueIcon());
          item.setModel(null);
          return;
        }

        var delegate = this.getDelegate(); // if a delegate for creating the binding is given, use it

        if (delegate != null && delegate.bindItem != null) {
          delegate.bindItem(this, item, index); // otherwise, try to bind the listItem by default
        } else {
          this.bindDefaultProperties(item, index);
        }
      },

      /**
       * Helper-Method for binding the default properties (label, icon and model)
       * from the model to the target widget.
       *
       * This method should only be called in the
       * {@link qx.data.controller.IControllerDelegate#bindItem} function
       * implemented by the {@link #delegate} property.
       *
       * @param item {qx.ui.form.ListItem} The internally created and used
       *   ListItem.
       * @param index {Number} The index of the ListItem.
       */
      bindDefaultProperties: function bindDefaultProperties(item, index) {
        // model
        this.bindProperty("", "model", null, item, index); // label

        this.bindProperty(this.getLabelPath(), "label", this.getLabelOptions(), item, index); // if the iconPath is set

        if (this.getIconPath() != null) {
          this.bindProperty(this.getIconPath(), "icon", this.getIconOptions(), item, index);
        }
      },

      /**
       * Helper-Method for binding a given property from the model to the target
       * widget.
       * This method should only be called in the
       * {@link qx.data.controller.IControllerDelegate#bindItem} function
       * implemented by the {@link #delegate} property.
       *
       * @param sourcePath {String | null} The path to the property in the model.
       *   If you use an empty string, the whole model item will be bound.
       * @param targetProperty {String} The name of the property in the target
       *   widget.
       * @param options {Map | null} The options used by
       *   {@link qx.data.SingleValueBinding#bind} to use for the binding.
       * @param targetWidget {qx.ui.core.Widget} The target widget.
       * @param index {Number} The index of the current binding.
       */
      bindProperty: function bindProperty(sourcePath, targetProperty, options, targetWidget, index) {
        // create the options for the binding containing the old options
        // including the old onUpdate function
        if (options != null) {
          var options = qx.lang.Object.clone(options);
          this.__onUpdate__P_89_3[targetProperty] = options.onUpdate;
          delete options.onUpdate;
        } else {
          options = {};
          this.__onUpdate__P_89_3[targetProperty] = null;
        }

        options.onUpdate = qx.lang.Function.bind(this._onBindingSet, this, index);
        options.ignoreConverter = "model"; // build up the path for the binding

        var bindPath = "model[" + index + "]";

        if (sourcePath != null && sourcePath != "") {
          bindPath += "." + sourcePath;
        } // create the binding


        var id = this.bind(bindPath, targetWidget, targetProperty, options);
        targetWidget.setUserData(targetProperty + "BindingId", id); // save the bound property

        if (!this.__boundProperties__P_89_1.includes(targetProperty)) {
          this.__boundProperties__P_89_1.push(targetProperty);
        }
      },

      /**
       * Helper-Method for binding a given property from the target widget to
       * the model.
       * This method should only be called in the
       * {@link qx.data.controller.IControllerDelegate#bindItem} function
       * implemented by the {@link #delegate} property.
       *
       * @param targetPath {String | null} The path to the property in the model.
       * @param sourcePath {String} The name of the property in the target.
       * @param options {Map | null} The options to use by
       *   {@link qx.data.SingleValueBinding#bind} for the binding.
       * @param sourceWidget {qx.ui.core.Widget} The source widget.
       * @param index {Number} The index of the current binding.
       */
      bindPropertyReverse: function bindPropertyReverse(targetPath, sourcePath, options, sourceWidget, index) {
        // build up the path for the binding
        var targetBindPath = "model[" + index + "]";

        if (targetPath != null && targetPath != "") {
          targetBindPath += "." + targetPath;
        } // create the binding


        var id = sourceWidget.bind(sourcePath, this, targetBindPath, options);
        sourceWidget.setUserData(targetPath + "ReverseBindingId", id); // save the bound property

        if (!this.__boundPropertiesReverse__P_89_2.includes(targetPath)) {
          this.__boundPropertiesReverse__P_89_2.push(targetPath);
        }
      },

      /**
       * Method which will be called on the invoke of every binding. It takes
       * care of the selection on the change of the binding.
       *
       * @param index {Number} The index of the current binding.
       * @param sourceObject {qx.core.Object} The source object of the binding.
       * @param targetObject {qx.core.Object} The target object of the binding.
       */
      _onBindingSet: function _onBindingSet(index, sourceObject, targetObject) {
        // ignore the binding set if the model is already set to null
        if (this.getModel() == null || this._inSelectionModification()) {
          return;
        } // go through all bound target properties


        for (var i = 0; i < this.__boundProperties__P_89_1.length; i++) {
          // if there is an onUpdate for one of it, invoke it
          if (this.__onUpdate__P_89_3[this.__boundProperties__P_89_1[i]] != null) {
            this.__onUpdate__P_89_3[this.__boundProperties__P_89_1[i]]();
          }
        }
      },

      /**
       * Internal helper method to remove the binding of the given item.
       *
       * @param item {Number} The item of which the binding which should
       *   be removed.
       */
      _removeBindingsFrom: function _removeBindingsFrom(item) {
        // go through all bound target properties
        for (var i = 0; i < this.__boundProperties__P_89_1.length; i++) {
          // get the binding id and remove it, if possible
          var id = item.getUserData(this.__boundProperties__P_89_1[i] + "BindingId");

          if (id != null) {
            this.removeBinding(id);
            item.setUserData(this.__boundProperties__P_89_1[i] + "BindingId", null);
          }
        } // go through all reverse bound properties


        for (var i = 0; i < this.__boundPropertiesReverse__P_89_2.length; i++) {
          // get the binding id and remove it, if possible
          var id = item.getUserData(this.__boundPropertiesReverse__P_89_2[i] + "ReverseBindingId");

          if (id != null) {
            item.removeBinding(id);
            item.getUserData(this.__boundPropertiesReverse__P_89_2[i] + "ReverseBindingId", null);
          }
        }

        ;
      },

      /**
       * Internal helper method to renew all set bindings.
       */
      __renewBindings__P_89_8: function __renewBindings__P_89_8() {
        // ignore, if no target is set (startup)
        if (this.getTarget() == null || this.getModel() == null) {
          return;
        } // get all children of the target


        var items = this.getTarget().getChildren(); // go through all items

        for (var i = 0; i < items.length; i++) {
          this._removeBindingsFrom(items[i]); // add the new binding


          this._bindListItem(items[i], this.__lookup__P_89_14(i));
        } // move the controllers change handler for the model to the end of the
        // listeners queue


        this.__moveChangeListenerAtTheEnd__P_89_16();
      },

      /*
      ---------------------------------------------------------------------------
         DELEGATE HELPER
      ---------------------------------------------------------------------------
      */

      /**
       * Helper method for applying the delegate It checks if a configureItem
       * is set end invokes the initial process to apply the given function.
       *
       * @param value {Object} The new delegate.
       * @param old {Object} The old delegate.
       */
      _setConfigureItem: function _setConfigureItem(value, old) {
        if (value != null && value.configureItem != null && this.getTarget() != null) {
          var children = this.getTarget().getChildren();

          for (var i = 0; i < children.length; i++) {
            value.configureItem(children[i]);
          }
        }
      },

      /**
       * Helper method for applying the delegate It checks if a bindItem
       * is set end invokes the initial process to apply the given function.
       *
       * @param value {Object} The new delegate.
       * @param old {Object} The old delegate.
       */
      _setBindItem: function _setBindItem(value, old) {
        // if a new bindItem function is set
        if (value != null && value.bindItem != null) {
          // do nothing if the bindItem function did not change
          if (old != null && old.bindItem != null && value.bindItem == old.bindItem) {
            return;
          }

          this.__renewBindings__P_89_8();
        }
      },

      /**
       * Helper method for applying the delegate It checks if a createItem
       * is set end invokes the initial process to apply the given function.
       *
       * @param value {Object} The new delegate.
       * @param old {Object} The old delegate.
       */
      _setCreateItem: function _setCreateItem(value, old) {
        if (this.getTarget() == null || this.getModel() == null || value == null || value.createItem == null) {
          return;
        }

        this._startSelectionModification(); // remove all bindings


        var children = this.getTarget().getChildren();

        for (var i = 0, l = children.length; i < l; i++) {
          this._removeBindingsFrom(children[i]);
        } // remove all elements of the target


        var removed = this.getTarget().removeAll();

        for (var i = 0; i < removed.length; i++) {
          removed[i].destroy();
        } // update


        this.update();

        this._endSelectionModification();

        this._updateSelection();
      },

      /**
       * Apply-Method for setting the filter. It removes all bindings,
       * check if the length has changed and adds or removes the items in the
       * target. After that, the bindings will be set up again and the selection
       * will be updated.
       *
       * @param value {Function|null} The new filter function.
       * @param old {Function|null} The old filter function.
       */
      _setFilter: function _setFilter(value, old) {
        // update the filter if it has been removed
        if ((value == null || value.filter == null) && old != null && old.filter != null) {
          this.__removeFilter__P_89_17();
        } // check if it is necessary to do anything


        if (this.getTarget() == null || this.getModel() == null || value == null || value.filter == null) {
          return;
        } // if yes, continue


        this._startSelectionModification(); // remove all bindings


        var children = this.getTarget().getChildren();

        for (var i = 0, l = children.length; i < l; i++) {
          this._removeBindingsFrom(children[i]);
        } // store the old lookup table


        var oldTable = this.__lookupTable__P_89_0; // generate a new lookup table

        this.__buildUpLookupTable__P_89_11(); // if there are lesser items


        if (oldTable.length > this.__lookupTable__P_89_0.length) {
          // remove the unnecessary items
          for (var j = oldTable.length; j > this.__lookupTable__P_89_0.length; j--) {
            this.getTarget().removeAt(j - 1).destroy();
          } // if there are more items

        } else if (oldTable.length < this.__lookupTable__P_89_0.length) {
          // add the new elements
          for (var j = oldTable.length; j < this.__lookupTable__P_89_0.length; j++) {
            var tempItem = this._createItem();

            this.getTarget().add(tempItem);
          }
        } // bind every list item again


        var listItems = this.getTarget().getChildren();

        for (var i = 0; i < listItems.length; i++) {
          this._bindListItem(listItems[i], this.__lookup__P_89_14(i));
        } // move the controllers change handler for the model to the end of the
        // listeners queue


        this.__moveChangeListenerAtTheEnd__P_89_16();

        this._endSelectionModification();

        this._updateSelection();
      },

      /**
       * This helper is responsible for removing the filter and setting the
       * controller to a valid state without a filtering.
       */
      __removeFilter__P_89_17: function __removeFilter__P_89_17() {
        // renew the index lookup table
        this.__buildUpLookupTable__P_89_11(); // check for the new length


        this.__changeModelLength__P_89_7(); // renew the bindings


        this.__renewBindings__P_89_8(); // need an asynchronous selection update because the bindings have to be
        // executed to update the selection probably (using the widget queue)


        this.__syncModelSelection__P_89_6 = true;
        qx.ui.core.queue.Widget.add(this);
      },

      /*
      ---------------------------------------------------------------------------
         LOOKUP STUFF
      ---------------------------------------------------------------------------
      */

      /**
       * Helper-Method which builds up the index lookup for the filter feature.
       * If no filter is set, the lookup table will be a 1:1 mapping.
       */
      __buildUpLookupTable__P_89_11: function __buildUpLookupTable__P_89_11() {
        var model = this.getModel();

        if (model == null) {
          return;
        }

        var delegate = this.getDelegate();

        if (delegate != null) {
          var filter = delegate.filter;
        }

        this.__lookupTable__P_89_0 = []; // -1 is a special lookup value, to represent the "null" option 

        if (this.isAllowNull()) {
          this.__lookupTable__P_89_0.push(-1);
        }

        for (var i = 0; i < model.getLength(); i++) {
          if (filter == null || filter(model.getItem(i))) {
            this.__lookupTable__P_89_0.push(i);
          }
        }
      },

      /**
       * Function for accessing the lookup table.
       *
       * @param index {Integer} The index of the lookup table.
       * @return {Number} Item index from lookup table
       */
      __lookup__P_89_14: function __lookup__P_89_14(index) {
        return this.__lookupTable__P_89_0[index];
      }
    },

    /*
     *****************************************************************************
        DESTRUCTOR
     *****************************************************************************
     */
    destruct: function destruct() {
      this.__lookupTable__P_89_0 = this.__onUpdate__P_89_3 = this.__boundProperties__P_89_1 = null;
      this.__boundPropertiesReverse__P_89_2 = null; // remove yourself from the widget queue

      qx.ui.core.queue.Widget.remove(this);
    }
  });
  qx.data.controller.List.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=List.js.map?dt=1601100937028