(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.test.ui.LayoutTestCase": {
        "construct": true,
        "require": true
      },
      "qx.ui.form.TextField": {},
      "qx.ui.form.validation.Manager": {},
      "qx.lang.Type": {},
      "qx.core.ValidationError": {},
      "qx.ui.form.validation.AsyncValidator": {},
      "qx.ui.form.RadioButtonGroup": {},
      "qx.ui.form.RadioButton": {},
      "qx.ui.form.Spinner": {},
      "qx.core.Object": {},
      "qx.ui.form.SelectBox": {},
      "qx.ui.form.VirtualSelectBox": {},
      "qx.data.marshal.Json": {}
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
  qx.Class.define("qx.test.ui.form.FormValidator", {
    extend: qx.test.ui.LayoutTestCase,
    construct: function construct() {
      qx.test.ui.LayoutTestCase.constructor.call(this);
    },
    members: {
      __username__P_303_0: null,
      __password1__P_303_1: null,
      __password2__P_303_2: null,
      __manager__P_303_3: null,
      setUp: function setUp() {
        this.__username__P_303_0 = new qx.ui.form.TextField();
        this.__password1__P_303_1 = new qx.ui.form.TextField();
        this.__password2__P_303_2 = new qx.ui.form.TextField();
        this.__manager__P_303_3 = new qx.ui.form.validation.Manager();
      },
      tearDown: function tearDown() {
        this.__manager__P_303_3.dispose();

        this.__username__P_303_0.dispose();

        this.__password1__P_303_1.dispose();

        this.__password2__P_303_2.dispose();
      },
      // validator
      __notEmptyValidator__P_303_4: function __notEmptyValidator__P_303_4(value, formItem) {
        var isString = qx.lang.Type.isString(value);
        var valid = isString && value.length > 0;
        valid ? formItem.setInvalidMessage("") : formItem.setInvalidMessage("fail");
        return valid;
      },
      __notEmptyValidatorError__P_303_5: function __notEmptyValidatorError__P_303_5(value) {
        var isString = qx.lang.Type.isString(value);

        if (!isString || value.length == 0) {
          throw new qx.core.ValidationError("fail");
        }
      },
      __asyncValidator__P_303_6: function __asyncValidator__P_303_6(validator, value) {
        window.setTimeout(function () {
          var valid = value != null && value.length > 0;
          validator.setValid(valid, "fail");
        }, 100);
      },
      // context //////////////////////
      testSyncContext: function testSyncContext() {
        var self = this;

        this.__manager__P_303_3.add(this.__username__P_303_0, function (value, formItem) {
          self.assertEquals(1, this.a);
        }, {
          a: 1
        });

        this.__manager__P_303_3.validate();
      },
      testSync2Context: function testSync2Context() {
        var self = this;

        this.__manager__P_303_3.add(this.__username__P_303_0, function (value, formItem) {
          self.assertEquals(1, this.a);
        }, {
          a: 1
        });

        this.__manager__P_303_3.add(this.__password1__P_303_1, function (value, formItem) {
          self.assertEquals(2, this.a);
        }, {
          a: 2
        });

        this.__manager__P_303_3.validate();
      },
      testAsyncContext: function testAsyncContext() {
        var self = this;
        var asyncValidator = new qx.ui.form.validation.AsyncValidator(function (value, formItem) {
          self.assertEquals(1, this.a);
        });

        this.__manager__P_303_3.add(this.__username__P_303_0, asyncValidator, {
          a: 1
        });

        this.__manager__P_303_3.validate();

        asyncValidator.dispose();
      },
      testAsync2Context: function testAsync2Context() {
        var self = this;
        var asyncValidator = new qx.ui.form.validation.AsyncValidator(function (value, formItem) {
          self.assertEquals(1, this.a);
        });
        var asyncValidator2 = new qx.ui.form.validation.AsyncValidator(function (value, formItem) {
          self.assertEquals(2, this.a);
        });

        this.__manager__P_303_3.add(this.__username__P_303_0, asyncValidator, {
          a: 1
        });

        this.__manager__P_303_3.add(this.__password1__P_303_1, asyncValidator2, {
          a: 2
        });

        this.__manager__P_303_3.validate();

        asyncValidator.dispose();
        asyncValidator2.dispose();
      },
      testSyncFormContext: function testSyncFormContext() {
        var self = this;

        this.__manager__P_303_3.setValidator(function () {
          self.assertEquals(1, this.a);
        });

        this.__manager__P_303_3.setContext({
          a: 1
        });

        this.__manager__P_303_3.validate();
      },
      testAsyncFormContext: function testAsyncFormContext() {
        var self = this;
        var asyncValidator = new qx.ui.form.validation.AsyncValidator(function () {
          self.assertEquals(1, this.a);
        });

        this.__manager__P_303_3.setValidator(asyncValidator);

        this.__manager__P_303_3.setContext({
          a: 1
        });

        this.__manager__P_303_3.validate();

        asyncValidator.dispose();
      },
      // //////////////////////////////
      //  sync self contained ///////////////
      testSyncSelfContained1NotNull: function testSyncSelfContained1NotNull() {
        this.__manager__P_303_3.add(this.__username__P_303_0, this.__notEmptyValidator__P_303_4); // validate = fail (no text entered)


        this.assertFalse(this.__manager__P_303_3.validate());
        this.assertFalse(this.__manager__P_303_3.getValid());
        this.assertFalse(this.__username__P_303_0.getValid()); // check the invalid messages

        this.assertEquals("fail", this.__username__P_303_0.getInvalidMessage());
        this.assertEquals("fail", this.__manager__P_303_3.getInvalidMessages()[0]); // enter text in the usernamen

        this.__username__P_303_0.setValue("affe"); // validate = true


        this.assertTrue(this.__manager__P_303_3.validate());
        this.assertTrue(this.__manager__P_303_3.getValid());
        this.assertTrue(this.__username__P_303_0.getValid()); // remove the username

        this.__username__P_303_0.resetValue(); // validate = fail


        this.assertFalse(this.__manager__P_303_3.validate());
        this.assertFalse(this.__manager__P_303_3.getValid());
        this.assertFalse(this.__username__P_303_0.getValid());
      },
      testSyncSelfContained1NotNullRadioButtonGroup: function testSyncSelfContained1NotNullRadioButtonGroup() {
        var rbg = new qx.ui.form.RadioButtonGroup();
        rbg.setRequired(true);
        rbg.getRadioGroup().setAllowEmptySelection(true);
        var rb1 = new qx.ui.form.RadioButton("a");
        var rb2 = new qx.ui.form.RadioButton("b");
        rbg.add(rb1);
        rbg.add(rb2);

        this.__manager__P_303_3.add(rbg); // validate = fail (no text entered)


        this.assertFalse(this.__manager__P_303_3.validate());
        this.assertFalse(this.__manager__P_303_3.getValid());
        this.assertFalse(rbg.getValid()); // select something

        rbg.setSelection([rb1]); // validate = true

        this.assertTrue(this.__manager__P_303_3.validate());
        this.assertTrue(this.__manager__P_303_3.getValid());
        this.assertTrue(rbg.getValid());
        rbg.dispose();
      },
      testSyncSelfContained1NotNullEvents: function testSyncSelfContained1NotNullEvents(attributes) {
        this.__manager__P_303_3.add(this.__username__P_303_0, this.__notEmptyValidator__P_303_4);

        var self = this;
        this.assertEventFired(this.__manager__P_303_3, "changeValid", function () {
          self.__manager__P_303_3.validate();
        }, function (e) {
          self.assertFalse(e.getData());
          self.assertNull(e.getOldData());
        }); // make the form valid

        this.__username__P_303_0.setValue("affe");

        this.assertEventFired(this.__manager__P_303_3, "changeValid", function () {
          self.__manager__P_303_3.validate();
        }, function (e) {
          self.assertTrue(e.getData());
          self.assertFalse(e.getOldData());
        });
      },
      __testSyncSelfContained3NotNull__P_303_7: function __testSyncSelfContained3NotNull__P_303_7(validator) {
        this.__manager__P_303_3.add(this.__username__P_303_0, validator);

        this.__manager__P_303_3.add(this.__password1__P_303_1, validator);

        this.__manager__P_303_3.add(this.__password2__P_303_2, validator); // validate = fail (no text entered)


        this.assertFalse(this.__manager__P_303_3.validate());
        this.assertFalse(this.__username__P_303_0.getValid());
        this.assertFalse(this.__password1__P_303_1.getValid());
        this.assertFalse(this.__password2__P_303_2.getValid()); // check the invalid messages

        this.assertEquals("fail", this.__username__P_303_0.getInvalidMessage());
        this.assertEquals("fail", this.__password1__P_303_1.getInvalidMessage());
        this.assertEquals("fail", this.__password2__P_303_2.getInvalidMessage());
        this.assertEquals("fail", this.__manager__P_303_3.getInvalidMessages()[0]);
        this.assertEquals("fail", this.__manager__P_303_3.getInvalidMessages()[1]);
        this.assertEquals("fail", this.__manager__P_303_3.getInvalidMessages()[2]);
        this.assertEquals(3, this.__manager__P_303_3.getInvalidMessages().length); // enter text to the two passwordfields

        this.__password1__P_303_1.setValue("1");

        this.__password2__P_303_2.setValue("2"); // validate again = fail (username empty)


        this.assertFalse(this.__manager__P_303_3.validate());
        this.assertFalse(this.__username__P_303_0.getValid());
        this.assertTrue(this.__password1__P_303_1.getValid());
        this.assertTrue(this.__password2__P_303_2.getValid()); // check the invalid messages

        this.assertEquals("fail", this.__username__P_303_0.getInvalidMessage());
        this.assertEquals("fail", this.__manager__P_303_3.getInvalidMessages()[0]);
        this.assertEquals(1, this.__manager__P_303_3.getInvalidMessages().length); // enter text in the usernamen

        this.__username__P_303_0.setValue("affe"); // validate = true


        this.assertTrue(this.__manager__P_303_3.validate());
        this.assertTrue(this.__username__P_303_0.getValid());
        this.assertTrue(this.__password1__P_303_1.getValid());
        this.assertTrue(this.__password2__P_303_2.getValid());
        this.assertEquals(0, this.__manager__P_303_3.getInvalidMessages().length); // remove the username

        this.__username__P_303_0.resetValue(); // validate last time = false


        this.assertFalse(this.__manager__P_303_3.validate());
        this.assertFalse(this.__username__P_303_0.getValid());
        this.assertTrue(this.__password1__P_303_1.getValid());
        this.assertTrue(this.__password2__P_303_2.getValid());
        this.assertEquals(1, this.__manager__P_303_3.getInvalidMessages().length);
      },
      testSyncSelfContained3NotNull: function testSyncSelfContained3NotNull() {
        this.__testSyncSelfContained3NotNull__P_303_7(this.__notEmptyValidator__P_303_4);
      },
      testSyncSelfContained3NotNullError: function testSyncSelfContained3NotNullError() {
        this.__testSyncSelfContained3NotNull__P_303_7(this.__notEmptyValidatorError__P_303_5);
      },
      // //////////////////////////////
      // sync related //////////////
      __testSyncRelatedNoIndividual__P_303_8: function __testSyncRelatedNoIndividual__P_303_8(validator) {
        this.__manager__P_303_3.add(this.__username__P_303_0);

        this.__manager__P_303_3.add(this.__password1__P_303_1);

        this.__manager__P_303_3.add(this.__password2__P_303_2);

        this.__password1__P_303_1.setValue("affe");

        this.__manager__P_303_3.setValidator(validator);

        this.assertFalse(this.__manager__P_303_3.validate());
        this.assertFalse(this.__manager__P_303_3.getValid());
        this.assertEquals("fail", this.__manager__P_303_3.getInvalidMessage());
        this.assertEquals("fail", this.__manager__P_303_3.getInvalidMessages()[0]);

        this.__password2__P_303_2.setValue("affe");

        this.assertTrue(this.__manager__P_303_3.validate());
        this.assertTrue(this.__manager__P_303_3.getValid());
        this.assertEquals(0, this.__manager__P_303_3.getInvalidMessages().length);
      },
      testSyncRelatedNoIndividual: function testSyncRelatedNoIndividual() {
        this.__testSyncRelatedNoIndividual__P_303_8(function (formItems, manager) {
          var valid = formItems[1].getValue() == formItems[2].getValue();

          if (!valid) {
            manager.setInvalidMessage("fail");
          }

          return valid;
        });
      },
      testSyncRelatedNoIndividualError: function testSyncRelatedNoIndividualError() {
        this.__testSyncRelatedNoIndividual__P_303_8(function (formItems, manager) {
          if (formItems[1].getValue() != formItems[2].getValue()) {
            throw new qx.core.ValidationError("fail");
          }
        });
      },
      testSyncRelatedWithIndividual: function testSyncRelatedWithIndividual() {
        this.__manager__P_303_3.add(this.__username__P_303_0, this.__notEmptyValidator__P_303_4);

        this.__manager__P_303_3.add(this.__password1__P_303_1, this.__notEmptyValidator__P_303_4);

        this.__manager__P_303_3.add(this.__password2__P_303_2, this.__notEmptyValidator__P_303_4);

        this.__password1__P_303_1.setValue("affe");

        this.__manager__P_303_3.setValidator(function (formItems, manager) {
          var valid = formItems[1].getValue() == formItems[2].getValue();

          if (!valid) {
            manager.setInvalidMessage("fail");
          }

          return valid;
        }); // false: username and password2 empty && password 1 != password2


        this.assertFalse(this.__manager__P_303_3.validate());
        this.assertFalse(this.__manager__P_303_3.getValid());
        this.assertFalse(this.__username__P_303_0.getValid());
        this.assertFalse(this.__password2__P_303_2.getValid());

        var messages = this.__manager__P_303_3.getInvalidMessages();

        this.assertEquals("fail", this.__manager__P_303_3.getInvalidMessage());
        this.assertEquals("fail", messages[0]);
        this.assertEquals("fail", messages[1]);
        this.assertEquals("fail", messages[2]);
        this.assertEquals(3, messages.length);

        this.__password2__P_303_2.setValue("affe"); // fail: username empty


        this.assertFalse(this.__manager__P_303_3.validate());
        this.assertFalse(this.__manager__P_303_3.getValid());
        this.assertEquals("fail", this.__manager__P_303_3.getInvalidMessages()[0]);
        this.assertEquals(1, this.__manager__P_303_3.getInvalidMessages().length);

        this.__username__P_303_0.setValue("user"); // ok


        this.assertTrue(this.__manager__P_303_3.validate());
        this.assertTrue(this.__manager__P_303_3.getValid());
        this.assertEquals(0, this.__manager__P_303_3.getInvalidMessages().length);
        this.assertTrue(this.__username__P_303_0.getValid());
        this.assertTrue(this.__password1__P_303_1.getValid());
        this.assertTrue(this.__password2__P_303_2.getValid()); // change back to not valid

        this.__password1__P_303_1.setValue("user"); // not ok


        this.assertFalse(this.__manager__P_303_3.validate());
        this.assertFalse(this.__manager__P_303_3.getValid());
        this.assertEquals(1, this.__manager__P_303_3.getInvalidMessages().length);
        this.assertTrue(this.__username__P_303_0.getValid());
      },
      // //////////////////////////////
      // required /////////////////////
      testRequired: function testRequired() {
        // set all 3 fields to required
        this.__username__P_303_0.setRequired(true);

        this.__password1__P_303_1.setRequired(true);

        this.__password2__P_303_2.setRequired(true); // add the fields to the form manager


        this.__manager__P_303_3.add(this.__username__P_303_0);

        this.__manager__P_303_3.add(this.__password1__P_303_1);

        this.__manager__P_303_3.add(this.__password2__P_303_2); // validate = fail (no text entered)


        this.assertFalse(this.__manager__P_303_3.validate());
        this.assertFalse(this.__username__P_303_0.getValid());
        this.assertFalse(this.__password1__P_303_1.getValid());
        this.assertFalse(this.__password2__P_303_2.getValid()); // enter text to the two passwordfields

        this.__password1__P_303_1.setValue("1");

        this.__password2__P_303_2.setValue("2"); // validate again = fail (username empty)


        this.assertFalse(this.__manager__P_303_3.validate());
        this.assertFalse(this.__username__P_303_0.getValid());
        this.assertTrue(this.__password1__P_303_1.getValid());
        this.assertTrue(this.__password2__P_303_2.getValid()); // enter text in the usernamen

        this.__username__P_303_0.setValue("affe"); // validate last time = true


        this.assertTrue(this.__manager__P_303_3.validate());
        this.assertTrue(this.__username__P_303_0.getValid());
        this.assertTrue(this.__password1__P_303_1.getValid());
        this.assertTrue(this.__password2__P_303_2.getValid());
      },
      testRequiredFieldMessage: function testRequiredFieldMessage() {
        // set a global and an individual required field message
        this.__manager__P_303_3.setRequiredFieldMessage("affe");

        this.__password1__P_303_1.setRequiredInvalidMessage("AFFEN"); // set fields to required


        this.__username__P_303_0.setRequired(true);

        this.__password1__P_303_1.setRequired(true); // add the fields to the form manager


        this.__manager__P_303_3.add(this.__username__P_303_0);

        this.__manager__P_303_3.add(this.__password1__P_303_1); // validate = fail (no text entered)


        this.assertFalse(this.__manager__P_303_3.validate()); // check the messages

        this.assertEquals("affe", this.__username__P_303_0.getInvalidMessage());
        this.assertEquals("AFFEN", this.__password1__P_303_1.getInvalidMessage());
      },
      testRequiredNumberZero: function testRequiredNumberZero() {
        // initialize with value 1
        var spinner = new qx.ui.form.Spinner(-1, 1, 1);
        spinner.setRequired(true);

        this.__manager__P_303_3.add(spinner); // validate --> should be valid due to value 1 set


        this.assertTrue(this.__manager__P_303_3.validate());
        this.assertTrue(spinner.getValid());
        spinner.setValue(0); // validate --> should be valid due to value 0 set

        this.assertTrue(this.__manager__P_303_3.validate());
        this.assertTrue(spinner.getValid());
        spinner.dispose();
      },
      // //////////////////////////////
      // Async self contained //////////
      testAsyncSelfContained1NotNullFail: function testAsyncSelfContained1NotNullFail() {
        var asyncValidator = new qx.ui.form.validation.AsyncValidator(this.__asyncValidator__P_303_6);

        this.__manager__P_303_3.add(this.__username__P_303_0, asyncValidator);

        this.__manager__P_303_3.addListener("complete", function () {
          this.resume(function () {
            // check the status after the complete
            this.assertFalse(this.__manager__P_303_3.isValid());
            this.assertFalse(this.__username__P_303_0.getValid());
            this.assertEquals("fail", this.__username__P_303_0.getInvalidMessage());
          }, this);
        }, this);

        this.__manager__P_303_3.validate();

        this.wait();
      },
      testAsyncSelfContained1NotNull: function testAsyncSelfContained1NotNull() {
        var asyncValidator = new qx.ui.form.validation.AsyncValidator(this.__asyncValidator__P_303_6);

        this.__manager__P_303_3.add(this.__username__P_303_0, asyncValidator);

        this.__username__P_303_0.setValue("affe");

        this.__manager__P_303_3.addListener("complete", function () {
          this.resume(function () {
            // check the status after the complete
            this.assertTrue(this.__manager__P_303_3.isValid());
            this.assertTrue(this.__username__P_303_0.getValid());
          }, this);
        }, this);

        this.__manager__P_303_3.validate();

        this.wait();
      },
      testAsyncSelfContained3NotNullFail: function testAsyncSelfContained3NotNullFail() {
        var asyncValidator1 = new qx.ui.form.validation.AsyncValidator(this.__asyncValidator__P_303_6);
        var asyncValidator2 = new qx.ui.form.validation.AsyncValidator(this.__asyncValidator__P_303_6);
        var asyncValidator3 = new qx.ui.form.validation.AsyncValidator(this.__asyncValidator__P_303_6);

        this.__manager__P_303_3.add(this.__username__P_303_0, asyncValidator1);

        this.__manager__P_303_3.add(this.__password1__P_303_1, asyncValidator2);

        this.__manager__P_303_3.add(this.__password2__P_303_2, asyncValidator3);

        this.__manager__P_303_3.addListener("complete", function () {
          this.resume(function () {
            // check the status after the complete
            this.assertFalse(this.__manager__P_303_3.isValid());
            this.assertFalse(this.__username__P_303_0.getValid());
            this.assertEquals("fail", this.__username__P_303_0.getInvalidMessage());
            this.assertEquals("fail", this.__password1__P_303_1.getInvalidMessage());
            this.assertEquals("fail", this.__password2__P_303_2.getInvalidMessage());
            this.assertEquals(3, this.__manager__P_303_3.getInvalidMessages().length);
            this.assertEquals("fail", this.__manager__P_303_3.getInvalidMessages()[0]);
            this.assertEquals("fail", this.__manager__P_303_3.getInvalidMessages()[1]);
            this.assertEquals("fail", this.__manager__P_303_3.getInvalidMessages()[2]);
          }, this);
        }, this);

        this.__manager__P_303_3.validate();

        this.wait();
      },
      testAsyncSelfContained3NotNull: function testAsyncSelfContained3NotNull() {
        var asyncValidator1 = new qx.ui.form.validation.AsyncValidator(this.__asyncValidator__P_303_6);
        var asyncValidator2 = new qx.ui.form.validation.AsyncValidator(this.__asyncValidator__P_303_6);
        var asyncValidator3 = new qx.ui.form.validation.AsyncValidator(this.__asyncValidator__P_303_6);

        this.__manager__P_303_3.add(this.__username__P_303_0, asyncValidator1);

        this.__manager__P_303_3.add(this.__password1__P_303_1, asyncValidator2);

        this.__manager__P_303_3.add(this.__password2__P_303_2, asyncValidator3);

        this.__manager__P_303_3.addListener("complete", function () {
          this.resume(function () {
            // check the status after the complete
            this.assertTrue(this.__manager__P_303_3.isValid());
            this.assertTrue(this.__username__P_303_0.getValid());
          }, this);
        }, this); // add values to all three input fields


        this.__username__P_303_0.setValue("a");

        this.__password1__P_303_1.setValue("b");

        this.__password2__P_303_2.setValue("c");

        this.__manager__P_303_3.validate();

        this.wait();
      },
      testAsyncSelfContained2NotNullFailMixed: function testAsyncSelfContained2NotNullFailMixed() {
        // BUG #3735
        var asyncValidator1 = new qx.ui.form.validation.AsyncValidator(this.__asyncValidator__P_303_6);
        var asyncValidator2 = new qx.ui.form.validation.AsyncValidator(function (validator, value) {
          window.setTimeout(function () {
            validator.setValid(false, "fail");
          }, 300);
        });
        var asyncValidator3 = new qx.ui.form.validation.AsyncValidator(function (validator, value) {
          window.setTimeout(function () {
            validator.setValid(true, "WIN");
          }, 500);
        });

        this.__manager__P_303_3.add(this.__username__P_303_0, asyncValidator1);

        this.__manager__P_303_3.add(this.__password1__P_303_1, asyncValidator2);

        this.__manager__P_303_3.add(this.__password2__P_303_2, asyncValidator3);

        this.__username__P_303_0.setValid(false);

        this.__password1__P_303_1.setValid(false);

        this.__password2__P_303_2.setValid(false);

        this.__manager__P_303_3.addListener("complete", function () {
          this.resume(function () {
            // check the status after the complete
            this.assertFalse(this.__manager__P_303_3.isValid());
            this.assertTrue(this.__username__P_303_0.getValid());
            this.assertFalse(this.__password1__P_303_1.getValid());
            this.assertTrue(this.__password2__P_303_2.getValid());
          }, this);
        }, this);

        this.__username__P_303_0.setValue("a");

        this.__manager__P_303_3.validate();

        this.wait();
      },
      testAsyncSelfContained3NotNullHalfFail: function testAsyncSelfContained3NotNullHalfFail() {
        var asyncValidator1 = new qx.ui.form.validation.AsyncValidator(this.__asyncValidator__P_303_6);
        var asyncValidator2 = new qx.ui.form.validation.AsyncValidator(this.__asyncValidator__P_303_6);
        var asyncValidator3 = new qx.ui.form.validation.AsyncValidator(this.__asyncValidator__P_303_6);

        this.__manager__P_303_3.add(this.__username__P_303_0, asyncValidator1);

        this.__manager__P_303_3.add(this.__password1__P_303_1, asyncValidator2);

        this.__manager__P_303_3.add(this.__password2__P_303_2, asyncValidator3);

        this.__manager__P_303_3.addListener("complete", function () {
          this.resume(function () {
            // check the status after the complete
            this.assertFalse(this.__manager__P_303_3.isValid());
            this.assertFalse(this.__username__P_303_0.getValid());
            this.assertEquals("fail", this.__username__P_303_0.getInvalidMessage());
            this.assertEquals("fail", this.__manager__P_303_3.getInvalidMessages()[0]);
            this.assertEquals(1, this.__manager__P_303_3.getInvalidMessages().length);
          }, this);
        }, this); // add values to all three input fields


        this.__password1__P_303_1.setValue("b");

        this.__password2__P_303_2.setValue("c");

        this.__manager__P_303_3.validate();

        this.wait();
      },
      // //////////////////////////////
      // Async related //////////
      testAsyncRelated3NotNullFail: function testAsyncRelated3NotNullFail() {
        var asyncValidator1 = new qx.ui.form.validation.AsyncValidator(this.__asyncValidator__P_303_6);
        var asyncValidator2 = new qx.ui.form.validation.AsyncValidator(this.__asyncValidator__P_303_6);
        var asyncValidator3 = new qx.ui.form.validation.AsyncValidator(this.__asyncValidator__P_303_6);

        this.__manager__P_303_3.add(this.__username__P_303_0, asyncValidator1);

        this.__manager__P_303_3.add(this.__password1__P_303_1, asyncValidator2);

        this.__manager__P_303_3.add(this.__password2__P_303_2, asyncValidator3);

        this.__manager__P_303_3.addListener("complete", function () {
          this.resume(function () {
            // check the status after the complete
            this.assertFalse(this.__manager__P_303_3.isValid());
            this.assertTrue(this.__username__P_303_0.getValid());
            this.assertTrue(this.__password1__P_303_1.getValid());
            this.assertTrue(this.__password2__P_303_2.getValid());
          }, this);
        }, this);

        this.__manager__P_303_3.setValidator(new qx.ui.form.validation.AsyncValidator(function (formItems, validator) {
          window.setTimeout(function () {
            validator.setValid(formItems[1].getValue() == formItems[2].getValue());
          }, 100);
        }));

        this.__username__P_303_0.setValue("u");

        this.__password1__P_303_1.setValue("a");

        this.__password2__P_303_2.setValue("b");

        this.__manager__P_303_3.validate();

        this.wait();
      },
      testAsyncRelated3NotNull: function testAsyncRelated3NotNull() {
        var asyncValidator1 = new qx.ui.form.validation.AsyncValidator(this.__asyncValidator__P_303_6);
        var asyncValidator2 = new qx.ui.form.validation.AsyncValidator(this.__asyncValidator__P_303_6);
        var asyncValidator3 = new qx.ui.form.validation.AsyncValidator(this.__asyncValidator__P_303_6);

        this.__manager__P_303_3.add(this.__username__P_303_0, asyncValidator1);

        this.__manager__P_303_3.add(this.__password1__P_303_1, asyncValidator2);

        this.__manager__P_303_3.add(this.__password2__P_303_2, asyncValidator3);

        this.__manager__P_303_3.addListener("complete", function () {
          this.resume(function () {
            // check the status after the complete
            this.assertTrue(this.__manager__P_303_3.isValid());
            this.assertTrue(this.__username__P_303_0.getValid());
            this.assertTrue(this.__password1__P_303_1.getValid());
            this.assertTrue(this.__password2__P_303_2.getValid());
          }, this);
        }, this);

        this.__manager__P_303_3.setValidator(new qx.ui.form.validation.AsyncValidator(function (formItems, validator) {
          window.setTimeout(function () {
            validator.setValid(formItems[1].getValue() == formItems[2].getValue());
          }, 100);
        }));

        this.__username__P_303_0.setValue("u");

        this.__password1__P_303_1.setValue("a");

        this.__password2__P_303_2.setValue("a");

        this.__manager__P_303_3.validate();

        this.wait();
      },
      // //////////////////////////////
      // Mixed self contained //////////
      testMixedSelfContained3NotNullAsyncFail: function testMixedSelfContained3NotNullAsyncFail() {
        var asyncValidator1 = new qx.ui.form.validation.AsyncValidator(this.__asyncValidator__P_303_6);

        this.__manager__P_303_3.add(this.__username__P_303_0, asyncValidator1);

        this.__manager__P_303_3.add(this.__password1__P_303_1, this.__notEmptyValidator__P_303_4);

        this.__manager__P_303_3.add(this.__password2__P_303_2, this.__notEmptyValidator__P_303_4);

        this.__manager__P_303_3.addListener("complete", function () {
          this.resume(function () {
            // check the status after the complete
            this.assertFalse(this.__manager__P_303_3.isValid());
            this.assertFalse(this.__username__P_303_0.getValid());
            this.assertTrue(this.__password1__P_303_1.getValid());
            this.assertTrue(this.__password2__P_303_2.getValid());
          }, this);
        }, this);

        this.__password1__P_303_1.setValue("a");

        this.__password2__P_303_2.setValue("b");

        this.__manager__P_303_3.validate();

        this.wait();
      },
      testMixedSelfContained3NotNullSyncFail: function testMixedSelfContained3NotNullSyncFail() {
        var asyncValidator1 = new qx.ui.form.validation.AsyncValidator(this.__asyncValidator__P_303_6);

        this.__manager__P_303_3.add(this.__username__P_303_0, asyncValidator1);

        this.__manager__P_303_3.add(this.__password1__P_303_1, this.__notEmptyValidator__P_303_4);

        this.__manager__P_303_3.add(this.__password2__P_303_2, this.__notEmptyValidator__P_303_4);

        this.__manager__P_303_3.addListener("complete", function () {
          this.resume(function () {
            // check the status after the complete
            this.assertFalse(this.__manager__P_303_3.isValid());
            this.assertTrue(this.__username__P_303_0.getValid());
            this.assertFalse(this.__password1__P_303_1.getValid());
            this.assertTrue(this.__password2__P_303_2.getValid());
          }, this);
        }, this);

        this.__username__P_303_0.setValue("a");

        this.__password2__P_303_2.setValue("b");

        this.__manager__P_303_3.validate();

        this.wait();
      },
      testMixedSelfContained3NotNullSync: function testMixedSelfContained3NotNullSync() {
        var asyncValidator1 = new qx.ui.form.validation.AsyncValidator(this.__asyncValidator__P_303_6);

        this.__manager__P_303_3.add(this.__username__P_303_0, asyncValidator1);

        this.__manager__P_303_3.add(this.__password1__P_303_1, this.__notEmptyValidator__P_303_4);

        this.__manager__P_303_3.add(this.__password2__P_303_2, this.__notEmptyValidator__P_303_4);

        this.__manager__P_303_3.addListener("complete", function () {
          this.resume(function () {
            // check the status after the complete
            this.assertTrue(this.__manager__P_303_3.isValid());
            this.assertTrue(this.__username__P_303_0.getValid());
            this.assertTrue(this.__password1__P_303_1.getValid());
            this.assertTrue(this.__password2__P_303_2.getValid());
          }, this);
        }, this);

        this.__username__P_303_0.setValue("a");

        this.__password1__P_303_1.setValue("b");

        this.__password2__P_303_2.setValue("c");

        this.__manager__P_303_3.validate();

        this.wait();
      },
      testMixedSelfContained2SyncRequired: function testMixedSelfContained2SyncRequired(attribute) {
        var asyncValidator1 = new qx.ui.form.validation.AsyncValidator(this.__asyncValidator__P_303_6);

        this.__password1__P_303_1.setRequired(true);

        this.__manager__P_303_3.add(this.__username__P_303_0, asyncValidator1);

        this.__manager__P_303_3.add(this.__password1__P_303_1);

        this.__manager__P_303_3.addListener("complete", function () {
          this.resume(function () {
            // check the status after the complete
            this.assertFalse(this.__manager__P_303_3.isValid());
            this.assertTrue(this.__username__P_303_0.getValid());
            this.assertFalse(this.__password1__P_303_1.getValid());
          }, this);
        }, this);

        this.__username__P_303_0.setValue("a");

        this.__manager__P_303_3.validate();

        this.wait();
      },
      // //////////////////////////////
      // Mixed related //////////
      testMixedRelated3NotNull: function testMixedRelated3NotNull() {
        var asyncValidator1 = new qx.ui.form.validation.AsyncValidator(this.__asyncValidator__P_303_6);
        var asyncValidator3 = new qx.ui.form.validation.AsyncValidator(this.__asyncValidator__P_303_6);

        this.__manager__P_303_3.add(this.__username__P_303_0, asyncValidator1);

        this.__manager__P_303_3.add(this.__password1__P_303_1, this.__notEmptyValidator__P_303_4);

        this.__manager__P_303_3.add(this.__password2__P_303_2, asyncValidator3);

        this.__manager__P_303_3.addListener("complete", function () {
          this.resume(function () {
            // check the status after the complete
            this.assertTrue(this.__manager__P_303_3.isValid());
            this.assertTrue(this.__username__P_303_0.getValid());
            this.assertTrue(this.__password1__P_303_1.getValid());
            this.assertTrue(this.__password2__P_303_2.getValid());
          }, this);
        }, this);

        this.__manager__P_303_3.setValidator(new qx.ui.form.validation.AsyncValidator(function (formItems, validator) {
          window.setTimeout(function () {
            validator.setValid(formItems[1].getValue() == formItems[2].getValue());
          }, 100);
        }));

        this.__username__P_303_0.setValue("u");

        this.__password1__P_303_1.setValue("a");

        this.__password2__P_303_2.setValue("a");

        this.__manager__P_303_3.validate();

        this.wait();
      },
      testMixedRelated3NotNullSyncFail: function testMixedRelated3NotNullSyncFail() {
        var asyncValidator1 = new qx.ui.form.validation.AsyncValidator(this.__asyncValidator__P_303_6);
        var asyncValidator3 = new qx.ui.form.validation.AsyncValidator(this.__asyncValidator__P_303_6);

        this.__manager__P_303_3.add(this.__username__P_303_0, asyncValidator1);

        this.__manager__P_303_3.add(this.__password1__P_303_1, this.__notEmptyValidator__P_303_4);

        this.__manager__P_303_3.add(this.__password2__P_303_2, asyncValidator3);

        this.__manager__P_303_3.addListener("complete", function () {
          this.resume(function () {
            // check the status after the complete
            this.assertFalse(this.__manager__P_303_3.isValid());
            this.assertTrue(this.__username__P_303_0.getValid());
            this.assertFalse(this.__password1__P_303_1.getValid());
            this.assertTrue(this.__password2__P_303_2.getValid());
          }, this);
        }, this);

        this.__manager__P_303_3.setValidator(new qx.ui.form.validation.AsyncValidator(function (formItems, validator) {
          window.setTimeout(function () {
            validator.setValid(formItems[1].getValue() == formItems[2].getValue());
          }, 100);
        }));

        this.__username__P_303_0.setValue("u");

        this.__password2__P_303_2.setValue("a");

        this.__manager__P_303_3.validate();

        this.wait();
      },
      testMixedRelated3NotNullAsyncFail: function testMixedRelated3NotNullAsyncFail() {
        var asyncValidator1 = new qx.ui.form.validation.AsyncValidator(this.__asyncValidator__P_303_6);
        var asyncValidator3 = new qx.ui.form.validation.AsyncValidator(this.__asyncValidator__P_303_6);

        this.__manager__P_303_3.add(this.__username__P_303_0, asyncValidator1);

        this.__manager__P_303_3.add(this.__password1__P_303_1, this.__notEmptyValidator__P_303_4);

        this.__manager__P_303_3.add(this.__password2__P_303_2, asyncValidator3);

        this.__manager__P_303_3.addListener("complete", function () {
          this.resume(function () {
            // check the status after the complete
            this.assertFalse(this.__manager__P_303_3.isValid());
            this.assertFalse(this.__username__P_303_0.getValid());
            this.assertTrue(this.__password1__P_303_1.getValid());
            this.assertTrue(this.__password2__P_303_2.getValid());
          }, this);
        }, this);

        this.__manager__P_303_3.setValidator(new qx.ui.form.validation.AsyncValidator(function (formItems, validator) {
          window.setTimeout(function () {
            validator.setValid(formItems[1].getValue() == formItems[2].getValue());
          }, 100);
        }));

        this.__password1__P_303_1.setValue("a");

        this.__password2__P_303_2.setValue("a");

        this.__manager__P_303_3.validate();

        this.wait();
      },
      testMixedRelated3NotNullAsyncFormFail: function testMixedRelated3NotNullAsyncFormFail() {
        var asyncValidator1 = new qx.ui.form.validation.AsyncValidator(this.__asyncValidator__P_303_6);
        var asyncValidator3 = new qx.ui.form.validation.AsyncValidator(this.__asyncValidator__P_303_6);

        this.__manager__P_303_3.add(this.__username__P_303_0, asyncValidator1);

        this.__manager__P_303_3.add(this.__password1__P_303_1, this.__notEmptyValidator__P_303_4);

        this.__manager__P_303_3.add(this.__password2__P_303_2, asyncValidator3);

        this.__manager__P_303_3.addListener("complete", function () {
          this.resume(function () {
            // check the status after the complete
            this.assertFalse(this.__manager__P_303_3.isValid());
            this.assertTrue(this.__username__P_303_0.getValid());
            this.assertTrue(this.__password1__P_303_1.getValid());
            this.assertTrue(this.__password2__P_303_2.getValid());
          }, this);
        }, this);

        this.__manager__P_303_3.setValidator(new qx.ui.form.validation.AsyncValidator(function (formItems, validator) {
          window.setTimeout(function () {
            validator.setValid(formItems[1].getValue() == formItems[2].getValue());
          }, 100);
        }));

        this.__username__P_303_0.setValue("u");

        this.__password1__P_303_1.setValue("a");

        this.__password2__P_303_2.setValue("b");

        this.__manager__P_303_3.validate();

        this.wait();
      },
      // //////////////////////////////
      // add error ////////////////////
      testAddWrong: function testAddWrong() {
        this.assertException(function () {
          this.__manager__P_303_3.add(new qx.core.Object());
        });
        this.assertException(function () {
          this.__manager__P_303_3.add(123);
        });
        this.assertException(function () {
          this.__manager__P_303_3.add({});
        });
      },
      testAddSelectBoxWithValidator: function testAddSelectBoxWithValidator() {
        var box = new qx.ui.form.SelectBox();
        this.assertException(function () {
          this.__manager__P_303_3.add(box, function () {});
        });
        box.dispose();
      },
      // //////////////////////////////
      // remove ///////////////////////
      testRemove: function testRemove() {
        this.__manager__P_303_3.add(this.__username__P_303_0, function (value, formItem) {
          this.assertFalse(true, "validation method called!");
        }, this);

        this.assertEquals(this.__username__P_303_0, this.__manager__P_303_3.remove(this.__username__P_303_0));

        this.__manager__P_303_3.validate();
      },
      // //////////////////////////////
      // get items ////////////////////
      testGetItems: function testGetItems() {
        this.__manager__P_303_3.add(this.__username__P_303_0);

        this.__manager__P_303_3.add(this.__password1__P_303_1);

        var items = this.__manager__P_303_3.getItems();

        this.assertInArray(this.__username__P_303_0, items);
        this.assertInArray(this.__password1__P_303_1, items);
      },
      // //////////////////////////////
      // validate //////////////////////
      testValidateDataBindingSelection: function testValidateDataBindingSelection() {
        "use strict";

        var vsb = new qx.ui.form.VirtualSelectBox();
        vsb.setRequired(true);

        this.__manager__P_303_3.add(vsb);

        this.__manager__P_303_3.validate();

        this.assertFalse(vsb.isValid());
        var m = qx.data.marshal.Json.createModel(['a', 'b']);
        vsb.setModel(m);

        this.__manager__P_303_3.validate();

        this.assertTrue(vsb.isValid());
        vsb.dispose();
        m.dispose();
      } // //////////////////////////////

    }
  });
  qx.test.ui.form.FormValidator.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=FormValidator.js.map?dt=1606149385984