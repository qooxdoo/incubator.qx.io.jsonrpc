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
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2007-2009 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Fabian Jakobs (fjakobs)
  
  ************************************************************************ */
  qx.Class.define("qx.test.util.DateMock", {
    extend: qx.core.Object,
    construct: function construct(dateMap) {
      qx.core.Object.constructor.call(this);
      this.__date = dateMap;
    },
    members: {
      getFullYear: function getFullYear() {
        return this.__date.fullYear;
      },
      getMonth: function getMonth() {
        return this.__date.month;
      },
      getDate: function getDate() {
        return this.__date.date;
      },
      getDay: function getDay() {
        return this.__date.day;
      },
      getHours: function getHours() {
        return this.__date.hours;
      },
      getSeconds: function getSeconds() {
        return this.__date.seconds;
      },
      getMinutes: function getMinutes() {
        return this.__date.minutes;
      },
      getMilliseconds: function getMilliseconds() {
        return this.__date.milliseconds;
      },
      getTimezoneOffset: function getTimezoneOffset() {
        return this.__date.timezoneOffset;
      },
      getTime: function getTime() {
        return this.__date.time;
      }
    }
  });
  qx.test.util.DateMock.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=DateMock.js.map?dt=1588623989259