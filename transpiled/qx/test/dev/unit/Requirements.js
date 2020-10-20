(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.dev.unit.TestCase": {
        "require": true
      },
      "qx.dev.unit.MRequirements": {
        "require": true
      },
      "qx.dev.unit.RequirementError": {},
      "qx.core.Environment": {}
    },
    "environment": {
      "provided": ["qx.test.requirement.syncTrue", "qx.test.requirement.syncFalse"],
      "required": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2004-2011 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Daniel Wagner (d_wagner)
  
  ************************************************************************ */
  qx.Class.define("qx.test.dev.unit.Requirements", {
    extend: qx.dev.unit.TestCase,
    include: [qx.dev.unit.MRequirements],
    members: {
      hasFulfilledReq: function hasFulfilledReq() {
        return true;
      },
      hasUnfulfilledReq: function hasUnfulfilledReq() {
        return false;
      },
      testRequirementPass: function testRequirementPass() {
        try {
          this.require(["fulfilledReq"]);
        } catch (ex) {
          this.fail("Check for fulfilled requirement failed!");
        }
      },
      testRequirementFail: function testRequirementFail() {
        var self = this;
        this.assertException(function () {
          self.require(["fulfilledReq", "unfulfilledReq"]);
        }, qx.dev.unit.RequirementError);
      },
      testMissingCheck: function testMissingCheck() {
        var self = this;
        this.assertException(function () {
          self.require(["monkeyCheese"]);
        }, Error, /Unable to verify requirement/);
      },
      testEnvironmentPass: function testEnvironmentPass() {
        qx.core.Environment.add("qx.test.requirement.syncTrue", function () {
          return true;
        });

        try {
          this.require(["fulfilledReq", "qx.test.requirement.syncTrue"]);
        } catch (ex) {
          this.fail("Check for environment key failed!");
        }

        delete qx.core.Environment.getChecks()["qx.test.requirement.syncTrue"];
      },
      testEnvironmentFail: function testEnvironmentFail() {
        qx.core.Environment.add("qx.test.requirement.syncFalse", function () {
          return false;
        });
        var self = this;
        this.assertException(function () {
          self.require(["fulfilledReq", "qx.test.requirement.syncFalse"]);
        }, qx.dev.unit.RequirementError);
        delete qx.core.Environment.getChecks()["qx.test.requirement.syncFalse"];
      },
      testEnvironmentAsync: function testEnvironmentAsync() {
        qx.core.Environment.getAsyncChecks()["qx.test.requirement.async"] = function () {
          return false;
        };

        var self = this;
        this.assertException(function () {
          self.require(["qx.test.requirement.async"]);
        }, Error, /Asynchronous environment checks are not supported/);
        delete qx.core.Environment.getAsyncChecks()["qx.test.requirement.async"];
      }
      /* Disabled until we've come up with a solution for bug #5516
      testEnvironmentNonBoolean : function()
      {
        var self = this;
        this.assertException(function() {
          self.require(["browser.name"]);
        }, Error, /value is not boolean/);
      }
      */

    }
  });
  qx.test.dev.unit.Requirements.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Requirements.js.map?dt=1603176830462