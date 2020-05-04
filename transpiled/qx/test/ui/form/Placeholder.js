(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.core.Environment": {
        "defer": "load",
        "require": true
      },
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.test.ui.LayoutTestCase": {
        "require": true
      },
      "qx.ui.form.ComboBox": {},
      "qx.ui.form.DateField": {},
      "qx.ui.form.AbstractField": {},
      "qx.bom.client.Css": {},
      "qx.ui.core.FocusHandler": {},
      "qx.ui.form.TextField": {},
      "qx.ui.form.TextArea": {},
      "qx.ui.form.PasswordField": {},
      "qx.bom.client.Engine": {},
      "qx.bom.client.Browser": {}
    },
    "environment": {
      "provided": [],
      "required": {
        "css.placeholder": {
          "className": "qx.bom.client.Css"
        },
        "engine.name": {
          "className": "qx.bom.client.Engine"
        },
        "browser.documentmode": {
          "className": "qx.bom.client.Browser"
        }
      }
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
  qx.Class.define("qx.test.ui.form.Placeholder", {
    extend: qx.test.ui.LayoutTestCase,
    members: {
      __testInit: function __testInit(clazz, childControlName) {
        var widget = new clazz();
        widget.setValue("affe");
        widget.setPlaceholder("aaa");
        this.getRoot().add(widget);
        this.flush();
        this.assertEquals("affe", this.__getVisibleValueOf(widget), "placeholder visible");
        this.assertEquals("affe", widget.getValue(), "Wrong value returned.");
        this.assertFalse(this.__isPlaceholderVisible(widget));
        widget.destroy();
        widget = new clazz();
        widget.setPlaceholder("abc");
        this.getRoot().add(widget); // sync the appearance

        this.__syncAppearance(widget);

        this.assertTrue(this.__isPlaceholderVisible(widget));
        this.assertEquals("abc", this.__getPlaceholderValueOf(widget), "placeholder not visible");
        this.assertNull(widget.getValue(), "Wrong value returned."); // get rid of the widget

        widget.destroy();
      },
      __testChangeValue: function __testChangeValue(clazz) {
        var widget = new clazz();
        widget.setPlaceholder("abc");
        this.getRoot().add(widget); // set a value

        widget.setValue("def");
        this.assertEquals("def", widget.getValue(), "wrong value");
        this.assertEquals("def", this.__getVisibleValueOf(widget), "wrong visible value");
        this.assertFalse(this.__isPlaceholderVisible(widget)); // remove the value

        widget.resetValue(); // sync the appearance

        this.__syncAppearance(widget);

        this.assertNull(widget.getValue(), "wrong value");
        this.assertTrue(this.__isPlaceholderVisible(widget));
        this.assertEquals("abc", this.__getPlaceholderValueOf(widget), "wrong visible value"); // get rid of the widget

        widget.destroy();
      },
      __testFocus: function __testFocus(clazz) {
        var widget = new clazz();
        widget.setPlaceholder("abc");
        this.getRoot().add(widget); // test focus in

        widget.focus();
        this.flush();
        this.assertEquals("", this.__getVisibleValueOf(widget), "wrong visible value after focus");
        this.assertFalse(this.__isPlaceholderVisible(widget), "1"); // test focus out

        this.getRoot().focus();
        this.flush();
        window.setTimeout(function () {
          this.resume(function () {
            this.getRoot().focus();
            this.flush();
            this.assertTrue(this.__isPlaceholderVisible(widget), "2");
            this.assertEquals("abc", this.__getPlaceholderValueOf(widget), "wrong visible value after blur"); // get rid of the widget

            widget.destroy();
          }, this);
        }.bind(this), 500);
        this.wait();
      },
      __testRemovePlaceholder: function __testRemovePlaceholder(clazz) {
        var widget = new clazz();
        widget.setPlaceholder("abc");
        widget.setPlaceholder(null);
        this.assertFalse(this.__isPlaceholderVisible(widget));
        this.assertNull(widget.getValue(), "wrong value");
        this.assertEquals("", this.__getVisibleValueOf(widget), "wrong visible value after focus"); // get rid of the widget

        widget.destroy();
      },
      __testDisabled: function __testDisabled(clazz) {
        var widget = new clazz();
        this.getRoot().add(widget);
        widget.setPlaceholder("abc");
        widget.setEnabled(false);
        this.flush();
        this.assertNull(widget.getValue(), "wrong value");
        this.assertFalse(this.__isPlaceholderVisible(widget));
        this.assertEquals("", this.__getVisibleValueOf(widget), "wrong visible value");
        widget.setEnabled(true); // sync the appearance

        this.__syncAppearance(widget);

        this.assertNull(widget.getValue(), "wrong value");
        this.assertTrue(this.__isPlaceholderVisible(widget));
        this.assertEquals("abc", this.__getPlaceholderValueOf(widget), "wrong visible value"); // get rid of the widget

        widget.destroy();
      },
      __hasTextfieldChildControl: function __hasTextfieldChildControl(widget) {
        return qx.Class.isSubClassOf(widget.constructor, qx.ui.form.ComboBox) || qx.Class.isSubClassOf(widget.constructor, qx.ui.form.DateField);
      },
      __syncAppearance: function __syncAppearance(widget) {
        if (qx.Class.isSubClassOf(widget.constructor, qx.ui.form.AbstractField)) {
          widget.syncAppearance();
        } else if (this.__hasTextfieldChildControl(widget)) {
          widget.getChildControl("textfield").syncAppearance();
        }
      },
      __getVisibleValueOf: function __getVisibleValueOf(widget) {
        if (qx.Class.isSubClassOf(widget.constructor, qx.ui.form.AbstractField)) {
          return widget.getContentElement().getValue();
        } else if (this.__hasTextfieldChildControl(widget)) {
          return widget.getChildControl("textfield").getContentElement().getValue();
        }
      },
      __getPlaceholderValueOf: function __getPlaceholderValueOf(widget) {
        var useQxPlaceholder = !qx.core.Environment.get("css.placeholder");

        if (!useQxPlaceholder) {
          if (qx.Class.isSubClassOf(widget.constructor, qx.ui.form.AbstractField)) {
            return widget.getContentElement().getAttribute("placeholder");
          } else if (this.__hasTextfieldChildControl(widget)) {
            return widget.getChildControl("textfield").getContentElement().getAttribute("placeholder");
          }
        } else {
          if (qx.Class.isSubClassOf(widget.constructor, qx.ui.form.AbstractField)) {
            return widget._getPlaceholderElement().getValue();
          } else if (this.__hasTextfieldChildControl(widget)) {
            return widget.getChildControl("textfield")._getPlaceholderElement().getValue();
          }
        }
      },
      __isPlaceholderVisible: function __isPlaceholderVisible(widget) {
        var useQxPlaceholder = !qx.core.Environment.get("css.placeholder");

        if (!useQxPlaceholder) {
          var contentElem;

          if (qx.Class.isSubClassOf(widget.constructor, qx.ui.form.AbstractField)) {
            contentElem = widget.getContentElement();
            return (widget.getValue() == null || widget.getValue() == "") && contentElem.getAttribute("placeholder") != "" && contentElem.getAttribute("placeholder") != null && !qx.ui.core.FocusHandler.getInstance().isFocused(widget);
          } else if (this.__hasTextfieldChildControl(widget)) {
            contentElem = widget.getChildControl("textfield").getContentElement();
            return (widget.getChildControl("textfield").getValue() == null || widget.getChildControl("textfield").getValue() == "") && contentElem.getAttribute("placeholder") != "" && contentElem.getAttribute("placeholder") != null && !qx.ui.core.FocusHandler.getInstance().isFocused(widget);
          }
        } else {
          if (qx.Class.isSubClassOf(widget.constructor, qx.ui.form.AbstractField)) {
            return widget._getPlaceholderElement().getStyle("visibility") != "hidden";
          } else if (this.__hasTextfieldChildControl(widget)) {
            return widget.getChildControl("textfield")._getPlaceholderElement().getStyle("visibility") != "hidden";
          }
        }
      },
      /////////// TextField ///////////
      testInitTextField: function testInitTextField() {
        this.__testInit(qx.ui.form.TextField);
      },
      testChangeValueTextField: function testChangeValueTextField() {
        this.__testChangeValue(qx.ui.form.TextField);
      },
      testFocusTextField: function testFocusTextField() {
        this.__testFocus(qx.ui.form.TextField);
      },
      testRemovePlaceholderTextField: function testRemovePlaceholderTextField() {
        this.__testRemovePlaceholder(qx.ui.form.TextField);
      },
      testDisabledTextField: function testDisabledTextField() {
        this.__testDisabled(qx.ui.form.TextField);
      },
      /////////// TextArea ///////////
      testInitTextArea: function testInitTextArea() {
        this.__testInit(qx.ui.form.TextArea);
      },
      testChangeValueTextArea: function testChangeValueTextArea() {
        this.__testChangeValue(qx.ui.form.TextArea);
      },
      testFocusTextArea: function testFocusTextArea() {
        this.__testFocus(qx.ui.form.TextArea);
      },
      testRemovePlaceholderTextArea: function testRemovePlaceholderTextArea() {
        this.__testRemovePlaceholder(qx.ui.form.TextArea);
      },
      testDisabledTextArea: function testDisabledTextArea() {
        this.__testDisabled(qx.ui.form.TextArea);
      },
      /////////// PasswordField ///////////
      testInitPasswordField: function testInitPasswordField() {
        this.__testInit(qx.ui.form.PasswordField);
      },
      testChangeValuePasswordField: function testChangeValuePasswordField() {
        if (qx.core.Environment.get("engine.name") == "mshtml" && qx.core.Environment.get("browser.documentmode") < 9) {
          this.skip("Skipped in IE 8 until bug #8424 is fixed.");
        }

        this.__testChangeValue(qx.ui.form.PasswordField);
      },
      testFocusPasswordField: function testFocusPasswordField() {
        this.__testFocus(qx.ui.form.PasswordField);
      },
      testRemovePlaceholderPasswordField: function testRemovePlaceholderPasswordField() {
        this.__testRemovePlaceholder(qx.ui.form.PasswordField);
      },
      testDisabledPasswordField: function testDisabledPasswordField() {
        this.__testDisabled(qx.ui.form.PasswordField);
      },
      /////////// ComboBox ///////////
      testInitComboBox: function testInitComboBox() {
        this.__testInit(qx.ui.form.ComboBox);
      },
      testChangeValueComboBox: function testChangeValueComboBox() {
        this.__testChangeValue(qx.ui.form.ComboBox);
      },
      testFocusComboBox: function testFocusComboBox() {
        this.__testFocus(qx.ui.form.ComboBox);
      },
      testRemovePlaceholderComboBox: function testRemovePlaceholderComboBox() {
        this.__testRemovePlaceholder(qx.ui.form.ComboBox);
      },
      testDisabledComboBox: function testDisabledComboBox() {
        this.__testDisabled(qx.ui.form.ComboBox);
      },
      /////////// DateField ///////////
      testFocusDateField: function testFocusDateField() {
        this.__testFocus(qx.ui.form.DateField);
      },
      testRemovePlaceholderDateField: function testRemovePlaceholderDateField() {
        this.__testRemovePlaceholder(qx.ui.form.DateField);
      },
      testDisabledDateField: function testDisabledDateField() {
        this.__testDisabled(qx.ui.form.DateField);
      }
    }
  });
  qx.test.ui.form.Placeholder.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Placeholder.js.map?dt=1588615807780