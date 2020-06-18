(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Bootstrap": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.website.Widget": {
        "construct": true,
        "require": true
      },
      "qxWeb": {
        "defer": "runtime"
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2013 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Martin Wittemann (wittemann)
       * Daniel Wagner (danielwagner)
  
  ************************************************************************ */

  /**
   * This is a simple button widget which takes care of setting the label
   * and icon of a button.
   *
   * <h2>Markup</h2>
   * The Button can contain a <code>span</code> element for the label and/or
   * an <code>img</code> element for the icon.
   *
   * <h2>CSS Classes</h2>
   * <table>
   *   <thead>
   *     <tr>
   *       <td>Class Name</td>
   *       <td>Applied to</td>
   *       <td>Description</td>
   *     </tr>
   *   </thead>
   *   <tbody>
   *     <tr>
   *       <td><code>qx-button</code></td>
   *       <td>Container element</td>
   *       <td>Identifies the Button widget</td>
   *     </tr>
   *   </tbody>
   * </table>
   *
   * <h2 class="widget-markup">Generated DOM Structure</h2>
   *
   * @group (Widget)
   */
  qx.Bootstrap.define("qx.ui.website.Button", {
    extend: qx.ui.website.Widget,
    statics: {
      /**
       * Factory method for the button widget which converts a standard
       * collection into a collection of buttons.
       *
       * @param label {String?} The label of the button.
       * @param icon {String?} The url for the button icon.
       * @return {qx.ui.website.Button} A collection of buttons.
       *
       * @attach {qxWeb}
       */
      button: function button(label, icon) {
        var buttons = new qx.ui.website.Button(this);
        buttons.init();

        if (label != null) {
          buttons.setLabel(label);
        }

        if (icon != null) {
          buttons.setIcon(icon);
        }

        return buttons;
      }
    },
    construct: function construct(selector, context) {
      qx.ui.website.Widget.constructor.call(this, selector, context);
    },
    members: {
      // overridden
      init: function init() {
        if (!qx.ui.website.Button.prototype.init.base.call(this)) {
          return false;
        }

        if (this.getChildren("span") == 0) {
          qxWeb.create("<span>").appendTo(this);
        }

        if (this.getChildren("img") == 0) {
          qxWeb.create("<img>").appendTo(this).setStyle("display", "none");
        }

        return true;
      },

      /**
       * Sets the button's label text
       *
       * @param value {String} label text
       * @return {qxWeb} The collection for chaining
       */
      setLabel: function setLabel(value) {
        this.getChildren("span").setHtml(value);
        return this;
      },

      /**
       * Returns the button's label text
       *
       * @return {String} label text
       */
      getLabel: function getLabel() {
        return this.getChildren("span").getHtml();
      },

      /**
       * Sets the source of the button's icon
       *
       * @param src {String} source URI for the icon
       * @return {qxWeb} The collection for chaining
       */
      setIcon: function setIcon(src) {
        var img = this.getChildren("img");
        img.setAttribute("src", src);
        img.setStyle("display", src ? "inline" : "none");
        return this;
      },

      /**
       * Returns the URI of the button's icon
       *
       * @return {String|null} Icon image URI
       */
      getIcon: function getIcon() {
        return this.getChildren("img").getAttribute("src");
      },

      /**
       * Sets the menu to be shown when the button is clicked or tapped
       *
       * @param menu {qxWeb} menu element wrapped in a collection
       * @return {qxWeb} The collection for chaining
       */
      setMenu: function setMenu(menu) {
        this.on("tap", function (e) {
          if (menu.getStyle("display") === "none") {
            menu.placeTo(this, "bottom-left");
            menu.show();
            qxWeb(document).once("tap", function () {
              menu.hide();
            });
          } else {
            menu.hide();
          }

          e.stopPropagation();
        });
        return this;
      }
    },
    defer: function defer(statics) {
      qxWeb.$attach({
        button: statics.button
      });
    }
  });
  qx.ui.website.Button.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.module.Template": {
        "require": true,
        "defer": "runtime"
      },
      "qx.Bootstrap": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.website.Widget": {
        "construct": true,
        "require": true
      },
      "qxWeb": {
        "defer": "runtime"
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2013 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Martin Wittemann (wittemann)
       * Daniel Wagner (danielwagner)
  
  ************************************************************************ */

  /**
   * This is a calendar widget used to select a date. It contain a set of
   * buttons to switch to the next or previous month as well as a button for
   * each day in the month.
   *
   * <h2>CSS Classes</h2>
   * <table>
   *   <thead>
   *     <tr>
   *       <td>Class Name</td>
   *       <td>Applied to</td>
   *       <td>Description</td>
   *     </tr>
   *   </thead>
   *   <tbody>
   *     <tr>
   *       <td><code>qx-calendar</code></td>
   *       <td>Container element</td>
   *       <td>Identifies the Calendar widget</td>
   *     </tr>
   *     <tr>
   *       <td><code>qx-calendar-container</code></td>
   *       <td>Container element (<code>table</code>)</td>
   *       <td>Identifies the table container of the Calendar widget</td>
   *     </tr>
   *     <tr>
   *       <td><code>qx-calendar-prev</code></td>
   *       <td><code>button</code></td>
   *       <td>Identifies and styles the "previous month" button</td>
   *     </tr>
   *     <tr>
   *       <td><code>qx-calendar-prev-container</code></td>
   *       <td>Container element (<code>td</code>)</td>
   *       <td>Identifies and styles the "previous month" container</td>
   *     </tr>
   *     <tr>
   *       <td><code>qx-calendar-next</code></td>
   *       <td><code>button</code></td>
   *       <td>Identifies and styles the "next month" button</td>
   *     </tr>
   *     <tr>
   *       <td><code>qx-calendar-next-container</code></td>
   *       <td>Container element (<code>td</code>)</td>
   *       <td>Identifies and styles the "next month" container</td>
   *     </tr>
   *     <tr>
   *       <td><code>qx-calendar-previous-month</code></td>
   *       <td>Day cell (<code>td</code>)</td>
   *       <td>Identifies and styles calendar cells for days from the previous month</td>
   *     </tr>
   *     <tr>
   *       <td><code>qx-calendar-next-month</code></td>
   *       <td>Day cell (<code>td</code>)</td>
   *       <td>Identifies and styles calendar cells for days from the next month</td>
   *     </tr>
   *     <tr>
   *       <td><code>qx-calendar-dayname</code></td>
   *       <td>Day name (<code>td</code>)</td>
   *       <td>Identifies and styles the day name cell</td>
   *     </tr>
   *     <tr>
   *       <td><code>qx-calendar-day</code></td>
   *       <td>Day (<code>button</code>)</td>
   *       <td>Identifies and styles the day buttons</td>
   *     </tr>
   *     <tr>
   *       <td><code>qx-calendar-weekday</code></td>
   *       <td>Day cell (<code>td</code>)</td>
   *       <td>Identifies and styles the weekday cells</td>
   *     </tr>
   *     <tr>
   *       <td><code>qx-calendar-weekend</code></td>
   *       <td>Day cell (<code>td</code>)</td>
   *       <td>Identifies and styles the weekend cells</td>
   *     </tr>
   *     <tr>
   *       <td><code>qx-calendar-selected</code></td>
   *       <td>Day cell (<code>td</code>)</td>
   *       <td>Identifies and styles the cell containing the selected day's button</td>
   *     </tr>
   *     <tr>
   *       <td><code>qx-calendar-today</code></td>
   *       <td>Day cell (<code>td</code>)</td>
   *       <td>Identifies and styles the cell containing the current day button</td>
   *     </tr>
   *     <tr>
   *       <td><code>qx-calendar-past</code></td>
   *       <td>Day cell (<code>td</code>)</td>
   *       <td>Identifies and styles all cells containing day buttons in the past</td>
   *     </tr>
   *     <tr>
   *       <td><code>qx-hidden</code></td>
   *       <td>Day (<code>button</code>)</td>
   *       <td>Added to days of previous / next month if the configuration <code>hideDaysOtherMonth</code>
               is set to <code>true</code> <br /> The default style property used is <code>visibility: hidden</code>
           </td>
   *     </tr>
   *   </tbody>
   * </table>
   *
   * <h2 class="widget-markup">Generated DOM Structure</h2>
   *
   * @require(qx.module.Template)
   *
   * @group (Widget)
   */
  qx.Bootstrap.define("qx.ui.website.Calendar", {
    extend: qx.ui.website.Widget,
    statics: {
      /**
       * *controls*
       *
       * Template for the controls. This should be a <code>tr</code> tag containing
       * the first row of the calendar.
       *
       * Default value:
       * <pre><tr>
       *  <td colspan='1' class='{{cssPrefix}}-prev-container'><button class='{{cssPrefix}}-prev' title='Previous Month'>&lt;</button></td>
       *  <td colspan='5'>{{month}} {{year}}</td>
       *  <td colspan='1' class='{{cssPrefix}}-next-container'><button class='{{cssPrefix}}-next' title='Next Month'>&gt;</button></td>
       * </tr></pre>
       *
       *
       * *dayRow*
       *
       * Template for the row of each day. This should be a tr tag containing the day names.
       *
       * Default value:
       * <pre><tr>
       *  {{#row}}<td class='{{cssPrefix}}-dayname'>{{.}}</td>{{/row}}
       * </tr></pre>
       *
       *
       * *row*
       *
       * Template for the row of days. This should be a <code>tr</code> tag containing
       * a <code>button</code> for each day.
       *
       * Default value:
       * <pre><tr>
       *   {{#row}}<td class='{{cssClass}}'>
       *     <button class='{{cssPrefix}}-day {{hidden}}' value='{{date}}'>{{day}}</button>
       *   </td>{{/row}}
       * </tr></pre>
       *
       *
       * *table*
       *
       * Wrapper template for all other templates. This should be a table.
       *
       * Default value:
       * <pre><table class='{{cssPrefix}}-container'><thead>{{{thead}}}</thead><tbody>{{{tbody}}}</tbody></table></pre>
       */
      _templates: {
        controls: "<tr><td colspan='1' class='{{cssPrefix}}-prev-container'><button class='{{cssPrefix}}-prev' {{prevDisabled}} title='Previous Month'>&lt;</button></td><td colspan='5' class='{{cssPrefix}}-month'>{{month}} {{year}}</td><td colspan='1' class='{{cssPrefix}}-next-container'><button class='{{cssPrefix}}-next' {{nextDisabled}} title='Next Month'>&gt;</button></td></tr>",
        dayRow: "<tr>{{#row}}<td class='{{cssPrefix}}-dayname'>{{.}}</td>{{/row}}</tr>",
        row: "<tr>{{#row}}<td class='{{cssClass}}'><button class='{{cssPrefix}}-day {{hidden}}' {{disabled}} value='{{date}}'>{{day}}</button></td>{{/row}}</tr>",
        table: "<table class='{{cssPrefix}}-container'><thead>{{{thead}}}</thead><tbody>{{{tbody}}}</tbody></table>"
      },

      /**
       * *monthNames*
       *
       * Array of strings containing the names of the month.
       *
       * Default value:
       * <pre>["January", "February", "March", "April", "May", "June",
       *  "July", "August", "September", "October", "November", "December"]</pre>
       *
       *
       * *dayNames*
       *
       * Array of strings containing the day names.
       *
       * Default values:
       * <pre>["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]</pre>
       *
       * *minDate*
       *
       * Earliest user-selectable date (<code>Date</code> object). Default: <code>null</code> (no restriction).
       *
       * *maxDate*
       *
       * Latest user-selectable date (<code>Date</code> object). Default: <code>null</code> (no restriction).
       *
       * *selectableWeekDays*
       *
       * Array of user-selectable week days (Sunday is 0). Default: <code>[0, 1, 2, 3, 4, 5, 6]</code> (no restrictions).
       *
       * *selectionMode*
       *
       * The Selection mode the calendar will use. Possible values are 'single' and 'range' . Default: <code>single</code>
       *
       * *hideDaysOtherMonth*
       *
       * Hide all days of the previous/next month. If the entire last row of the calendar are days of
       * the next month the whole row is not rendered. Default: <code>false</code> <br /> <br />
       * <strong>Important: </strong>If you like to have a <em>mixed</em> mode like displaying the days
       * of the previous month and hiding the days of the next month you should work with the
       * <code>rendered</code> event to manipulate the DOM nodes after the rendering. Take a look at
       * the samples to get a idea of it.
       *
       * *disableDaysOtherMonth*
       *
       * Disable all days of the previous/next month. The days are visible, but are not responding to
       * user input. Default: <code>false</code>
       */
      _config: {
        monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        dayNames: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        minDate: null,
        maxDate: null,
        selectableWeekDays: [0, 1, 2, 3, 4, 5, 6],
        selectionMode: "single",
        hideDaysOtherMonth: false,
        disableDaysOtherMonth: false
      },

      /**
       * Factory method which converts the current collection into a collection of
       * Calendar widgets. Therefore, an initialization process needs to be done which
       * can be configured with some parameter.
       *
       * @param date {Date?null} The initial Date of the calendar.
       * @return {qx.ui.website.Calendar} A new calendar collection.
       * @attach {qxWeb}
       */
      calendar: function calendar(date) {
        var calendar = new qx.ui.website.Calendar(this);
        calendar.init();

        if (date !== undefined) {
          calendar.setValue(date);
        }

        return calendar;
      }
    },
    construct: function construct(selector, context) {
      qx.ui.website.Widget.constructor.call(this, selector, context);
    },
    events: {
      /** Fired at each value change */
      "changeValue": "Date",

      /** Fired whenvever a render process finished. This event can be used as hook to add
          custom markup and/or manipulate existing. */
      "rendered": ""
    },
    members: {
      __range__P_558_0: null,
      _value: null,
      _shownValue: null,
      // overridden
      init: function init() {
        if (!qx.ui.website.Calendar.prototype.init.base.call(this)) {
          return false;
        }

        this.__range__P_558_0 = [];
        var today = new Date();
        today = this._getNormalizedDate(today);
        this.showValue(today);
        return true;
      },
      // overridden
      render: function render() {
        var minDate = this.getConfig("minDate");

        if (minDate) {
          minDate = this._getNormalizedDate(minDate);
        }

        var maxDate = this.getConfig("maxDate");

        if (maxDate) {
          maxDate = this._getNormalizedDate(maxDate);
        }

        this.showValue(this._shownValue);
        return this;
      },
      // overridden
      setEnabled: function setEnabled(value) {
        this.setAttribute("disabled", !value);

        if (value === true) {
          // let the render process decide which state to set for the different DOM elements
          // this highly depends on the configuration (e.g. 'minDate', 'maxDate' or 'disableDaysOtherMonth')
          this.render();
        } else {
          this.find("*").setAttribute("disabled", !value);
        }

        return this;
      },

      /**
       * Sets the given date as the current value displays it
       *
       * @param value {Date|Array} Date or array of dates to be displayed.
       * @return {qx.ui.website.Calendar} The collection for chaining.
       */
      setValue: function setValue(value) {
        var minDate = this.getConfig("minDate");
        var maxDate = this.getConfig("maxDate");

        if (this.getConfig("selectionMode") == "single") {
          value = this._getNormalizedDate(value);

          if (this.getConfig("selectableWeekDays").indexOf(value.getDay()) == -1) {
            throw new Error("The given date's week day is not selectable.");
          }

          if (minDate) {
            minDate = this._getNormalizedDate(minDate);

            if (value < minDate) {
              throw new Error("Given date " + value.toDateString() + " is earlier than configured minDate " + minDate.toDateString());
            }
          }

          if (maxDate) {
            maxDate = this._getNormalizedDate(maxDate);

            if (value > maxDate) {
              throw new Error("Given date " + value.toDateString() + " is later than configured maxDate " + maxDate.toDateString());
            }
          }
        } else if (this.getConfig("selectionMode") == "range") {
          if (!this.__range__P_558_0) {
            this.__range__P_558_0 = value.map(function (val) {
              return val.toDateString();
            });
          }

          if (value.length == 2) {
            value.sort(function (a, b) {
              return a - b;
            });
            value = this._generateRange(value);
          } else {
            value[0] = this._getNormalizedDate(value[0]);
          }
        }

        this._value = value;
        this.showValue(value);

        if (this.getConfig("selectionMode") == "single" || this.getConfig("selectionMode") == "range" && value.length >= 1) {
          this.emit("changeValue", value);
        }

        return this;
      },

      /**
       * Returns the currently selected date of the first
       * calendar widget in the collection.
       *
       * @return {qx.ui.website.Calendar} The collection for chaining.
       */
      getValue: function getValue() {
        var value = this._value;
        return value ? qx.Bootstrap.isArray(value) ? value : new Date(value) : null;
      },

      /**
       * Displays the given date
       *
       * @param value {Date} Date to display.
       * @return {qx.ui.website.Calendar} The collection for chaining.
       */
      showValue: function showValue(value) {
        // If value is an array, show the last selected date
        value = qx.Bootstrap.isArray(value) ? value[value.length - 1] : value;
        this._shownValue = value;
        var cssPrefix = this.getCssPrefix();

        if (this.getAttribute("tabindex") < 0) {
          this.setAttribute("tabindex", 0);
        }

        this.find("." + cssPrefix + "-prev").off("tap", this._prevMonth, this);
        this.find("." + cssPrefix + "-next").off("tap", this._nextMonth, this);
        this.find("." + cssPrefix + "-day").off("tap", this._selectDay, this);
        this.off("focus", this._onFocus, this, true).off("blur", this._onBlur, this, true);
        this.setHtml(this._getTable(value));
        this.find("." + cssPrefix + "-prev").on("tap", this._prevMonth, this);
        this.find("." + cssPrefix + "-next").on("tap", this._nextMonth, this);
        this.find("td").not(".qx-calendar-invalid").find("." + cssPrefix + "-day").on("tap", this._selectDay, this);
        this.on("focus", this._onFocus, this, true).on("blur", this._onBlur, this, true); // signal the rendering process is done - this is useful for application developers if they
        // want to hook into and change / adapt the DOM elements of the calendar

        this.emit('rendered');
        return this;
      },

      /**
       * Displays the previous month
       */
      _prevMonth: function _prevMonth() {
        var shownValue = this._shownValue;
        this.showValue(new Date(shownValue.getFullYear(), shownValue.getMonth() - 1));
      },

      /**
       * Displays the next month
       */
      _nextMonth: function _nextMonth() {
        var shownValue = this._shownValue;
        this.showValue(new Date(shownValue.getFullYear(), shownValue.getMonth() + 1));
      },

      /**
       * Sets the current value to the day selected by the user
       * @param e {Event} The tap event.
       */
      _selectDay: function _selectDay(e) {
        var day = qxWeb(e.getTarget());
        var newStr = day.getAttribute("value");
        var newValue = new Date(newStr);

        if (this.getConfig("selectionMode") == "range") {
          var range = this.__range__P_558_0.slice(0);

          if (range.length == 2) {
            range = [];
          }

          range.push(newStr);
          this.__range__P_558_0 = range;
          range = range.map(function (item) {
            return new Date(item);
          });
          this.setValue(range);
          newStr = range;
        } else {
          this.setValue(newValue);
          newStr = [newStr];
        }

        newStr.forEach(function (str) {
          this.find("." + this.getCssPrefix() + "-day[value='" + str + "']").focus();
        }.bind(this));
      },

      /**
       * Renders the calendar for the given date.
       *
       * @param date {Date} The date to render.
       * @return {String} The calendar HTML.
       */
      _getTable: function _getTable(date) {
        var controls = qxWeb.template.render(this.getTemplate("controls"), this._getControlsData(date));
        var dayRow = qxWeb.template.render(this.getTemplate("dayRow"), this._getDayRowData());
        var data = {
          thead: controls + dayRow,
          tbody: this._getWeekRows(date),
          cssPrefix: this.getCssPrefix()
        };
        return qxWeb.template.render(this.getTemplate("table"), data);
      },

      /**
       * Returns the month and year to be displayed in the calendar controls.
       *
       * @param date {Date} The date to be displayed.
       * @return {Map} A map containing the month and year.
       */
      _getControlsData: function _getControlsData(date) {
        var prevDisabled = "";
        var minDate = this.getConfig("minDate");

        if (minDate) {
          minDate = this._getNormalizedDate(minDate);

          if (date.getMonth() <= minDate.getMonth()) {
            prevDisabled = "disabled";
          }
        }

        var nextDisabled = "";
        var maxDate = this.getConfig("maxDate");

        if (maxDate) {
          maxDate = this._getNormalizedDate(maxDate);

          if (date.getMonth() >= maxDate.getMonth()) {
            nextDisabled = "disabled";
          }
        }

        return {
          month: this.getConfig("monthNames")[date.getMonth()],
          year: date.getFullYear(),
          cssPrefix: this.getCssPrefix(),
          prevDisabled: prevDisabled,
          nextDisabled: nextDisabled
        };
      },

      /**
       * Returns the week day names to be displayed in the calendar.
       *
       * @return {String[]} Array of day names.
       */
      _getDayRowData: function _getDayRowData() {
        return {
          row: this.getConfig("dayNames"),
          cssPrefix: this.getCssPrefix()
        };
      },

      /**
       * Returns the table rows displaying the days of the month.
       *
       * @param date {Date} The date to be displayed.
       * @return {String} The table rows as an HTML string.
       */
      _getWeekRows: function _getWeekRows(date) {
        date = qx.Bootstrap.isArray(date) ? date[date.length - 1] : date;
        var weeks = [];
        var value = null,
            valueString = null;
        var today = new Date();

        var helpDate = this._getHelpDate(date);

        var cssPrefix = this.getCssPrefix();
        var minDate = this.getConfig("minDate");

        if (minDate) {
          minDate = this._getNormalizedDate(minDate);
        }

        var maxDate = this.getConfig("maxDate");

        if (maxDate) {
          this._getNormalizedDate(maxDate);
        }

        var hideDaysOtherMonth = this.getConfig("hideDaysOtherMonth");
        var disableDaysOtherMonth = this.getConfig("disableDaysOtherMonth");

        if (qx.Bootstrap.isArray(this._value)) {
          valueString = this._value.map(function (currentDate) {
            return currentDate.toDateString();
          });
        }

        for (var week = 0; week < 6; week++) {
          var data = {
            row: []
          };

          for (var i = 0; i < 7; i++) {
            var cssClasses = "";
            var hidden = "";
            var disabled = "";

            if (helpDate.getMonth() !== date.getMonth()) {
              // first day of the last displayed week is already in the next month
              if (hideDaysOtherMonth === true && week === 5 && i === 0) {
                break;
              } // set 'previous-month' and 'next-month' to make it easier for the developer to select
              // the days after the render process


              if (helpDate.getMonth() < date.getMonth() && helpDate.getFullYear() == date.getFullYear() || helpDate.getMonth() > date.getMonth() && helpDate.getFullYear() < date.getFullYear()) {
                cssClasses += cssPrefix + "-previous-month";
              } else {
                cssClasses += cssPrefix + "-next-month";
              }

              hidden += hideDaysOtherMonth ? "qx-hidden" : "";
              disabled += disableDaysOtherMonth ? "disabled=disabled" : "";
            }

            if (this.getConfig("selectionMode") == "range" && qx.Bootstrap.isArray(this._value)) {
              if (valueString.indexOf(helpDate.toDateString()) != -1) {
                cssClasses += " " + cssPrefix + "-selected";
              }
            } else {
              var range = this.__range__P_558_0;

              if (this._value) {
                value = this.getConfig("selectionMode") == "range" ? new Date(range[range.length - 1]) : this._value;
                cssClasses += helpDate.toDateString() === value.toDateString() ? " " + cssPrefix + "-selected" : "";
              }
            } // extra check for today date necessary - otherwise 'today' would be marked as past day


            var isPast = Date.parse(today) > Date.parse(helpDate) && today.toDateString() !== helpDate.toDateString();
            cssClasses += isPast ? " " + cssPrefix + "-past" : "";
            cssClasses += today.toDateString() === helpDate.toDateString() ? " " + cssPrefix + "-today" : ""; // if 'disableDaysOtherMonth' config is set - 'disabled' might already be set

            if (disabled === "") {
              disabled = this.getEnabled() ? "" : "disabled=disabled";

              if (minDate && helpDate < minDate || maxDate && helpDate > maxDate || this.getConfig("selectableWeekDays").indexOf(helpDate.getDay()) == -1) {
                disabled = "disabled=disabled";
              }
            }

            cssClasses += helpDate.getDay() === 0 || helpDate.getDay() === 6 ? " " + cssPrefix + "-weekend" : " " + cssPrefix + "-weekday";
            data.row.push({
              day: helpDate.getDate(),
              date: helpDate.toDateString(),
              cssPrefix: cssPrefix,
              cssClass: cssClasses,
              disabled: disabled,
              hidden: hidden
            });
            helpDate.setDate(helpDate.getDate() + 1);
          }

          weeks.push(qxWeb.template.render(this.getTemplate("row"), data));
        }

        return weeks.join("");
      },

      /**
       * Returns a date instance for the first visible day to be displayed
       *
       * @param date {Date} Current date
       * @return {Date} Helper date
       */
      _getHelpDate: function _getHelpDate(date) {
        var startOfWeek = 1; //TODO: config option

        var helpDate = new Date(date.getFullYear(), date.getMonth(), 1);
        var firstDayOfWeek = helpDate.getDay();
        helpDate = new Date(date.getFullYear(), date.getMonth(), 1, 0, 0, 0);
        var nrDaysOfLastMonth = (7 + firstDayOfWeek - startOfWeek) % 7;
        helpDate.setDate(helpDate.getDate() - nrDaysOfLastMonth);
        return helpDate;
      },

      /**
       * Returns a Date object with hours, minutes and seconds set to 0
       * to facilitate date comparisons.
       *
       * @param dateIn {Date} Date to normalize
       * @return {Date} normalized
       */
      _getNormalizedDate: function _getNormalizedDate(dateIn) {
        var date = new Date(dateIn.getTime());
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);
        date.setMilliseconds(0);
        return date;
      },

      /**
       * Attaches the keydown listener.
       *
       * @param e {Event} focus event
       */
      _onFocus: function _onFocus(e) {
        this.on("keydown", this._onKeyDown, this);
      },

      /**
       * Removes the keydown listener if the focus moves outside of the calendar.
       *
       * @param e {Event} blur event
       */
      _onBlur: function _onBlur(e) {
        if (this.contains(e.getRelatedTarget()).length === 0) {
          this.off("keydown", this._onKeyDown, this);
        }
      },

      /**
       * Keyboard handling.
       *
       * @param e {Event} The keydown event.
       */
      _onKeyDown: function _onKeyDown(e) {
        var cssPrefix = this.getCssPrefix();
        var target = qxWeb(e.getTarget());
        var key = e.getKeyIdentifier();
        var isDayButton = target.hasClass(cssPrefix + "-day");

        if (isDayButton) {
          if (key == "Space") {
            this._selectDay(e);
          } else if (key == "Right") {
            e.preventDefault();

            this._focusNextDay(target);
          } else if (key == "Left") {
            e.preventDefault();

            this._focusPrevDay(target);
          }
        } else {
          if (key == "Space") {
            if (target.hasClass(cssPrefix + "-prev")) {
              e.preventDefault();

              this._prevMonth();

              this.find("." + cssPrefix + "-prev").focus();
            } else if (target.hasClass(cssPrefix + "-next")) {
              e.preventDefault();

              this._nextMonth();

              this.find("." + cssPrefix + "-next").focus();
            }
          } else if (key == "Right") {
            e.preventDefault();

            this._nextMonth();

            this.find("." + cssPrefix + "-next").focus();
          } else if (key == "Left") {
            e.preventDefault();

            this._prevMonth();

            this.find("." + cssPrefix + "-prev").focus();
          }
        }

        e.stopPropagation();
      },

      /**
       * Focuses the day button following the given one.
       *
       * @param currentDay {qxWeb} The button for the current day.
       */
      _focusNextDay: function _focusNextDay(currentDay) {
        var cssPrefix = this.getCssPrefix();
        var nextDayInWeek = currentDay.getParents().getNext();

        if (nextDayInWeek.length > 0) {
          nextDayInWeek.getChildren("." + cssPrefix + "-day").focus();
        } else {
          var nextWeekRow = currentDay.getParents().getParents().getNext();

          if (nextWeekRow.length > 0) {
            nextWeekRow.find("> td > ." + cssPrefix + "-day").getFirst().focus();
          } else {
            this._nextMonth();

            var oldDate = new Date(currentDay.getAttribute("value"));
            var newDate = new Date(oldDate.valueOf());
            newDate.setDate(oldDate.getDate() + 1);
            var buttonVal = newDate.toDateString();
            this.find("." + cssPrefix + "-day[value='" + buttonVal + "']").focus();
          }
        }
      },

      /**
       * Focuses the day button preceding the given one.
       *
       * @param currentDay {qxWeb} The button for the current day.
       */
      _focusPrevDay: function _focusPrevDay(currentDay) {
        var cssPrefix = this.getCssPrefix();
        var prevDayInWeek = currentDay.getParents().getPrev();

        if (prevDayInWeek.length > 0) {
          prevDayInWeek.getChildren("." + cssPrefix + "-day").focus();
        } else {
          var prevWeekRow = currentDay.getParents().getParents().getPrev();

          if (prevWeekRow.length > 0) {
            prevWeekRow.find("> td > ." + cssPrefix + "-day").getLast().focus();
          } else {
            this._prevMonth();

            var oldDate = new Date(currentDay.getAttribute("value"));
            var newDate = new Date(oldDate.valueOf());
            newDate.setDate(oldDate.getDate() - 1);
            var buttonVal = newDate.toDateString();
            this.find("." + cssPrefix + "-day[value='" + buttonVal + "']").focus();
          }
        }
      },

      /**
      * Generates a date list depending on the given range
      *
      * @param range {Array} Array containing the start and end values on the range
      * @return {Array} Array with all the date objects contained in the given range
      */
      _generateRange: function _generateRange(range) {
        var list = [],
            current = range[0];
        var minDate = this.getConfig("minDate") ? this.getConfig("minDate") : new Date(range[0].toDateString());
        var maxDate = this.getConfig("maxDate") ? this.getConfig("maxDate") : new Date(range[1].toDateString());
        minDate = this._getNormalizedDate(minDate);
        maxDate = this._getNormalizedDate(maxDate);

        while (current <= range[1]) {
          current = this._getNormalizedDate(current);
          list.push(new Date(current.toDateString()));
          current.setDate(current.getDate() + 1);
        } // Removing non selectable days


        list = list.filter(function (date) {
          return this.getConfig("selectableWeekDays").indexOf(date.getDay()) != -1;
        }, this);

        if (list.length == 0) {
          throw new Error("Given date range is not valid. Please verify the 'selectableWeekDays' config");
        } // Removing days out of defined min/max range


        list = list.filter(function (date) {
          return date >= minDate && date <= maxDate;
        }, this);

        if (list.length == 0) {
          throw new Error("Given date range is not valid. Please verify the 'minDate' and 'maxDate' configs");
        }

        return list;
      },
      dispose: function dispose() {
        var cssPrefix = this.getCssPrefix();
        this.find("." + cssPrefix + "-prev").off("tap", this._prevMonth, this);
        this.find("." + cssPrefix + "-next").off("tap", this._nextMonth, this);
        this.find("." + cssPrefix + "-day").off("tap", this._selectDay, this);
        this.off("focus", this._onFocus, this, true).off("blur", this._onBlur, this, true).off("keydown", this._onKeyDown, this);
        this.setHtml("");
        return qx.ui.website.Calendar.prototype.dispose.base.call(this);
      }
    },
    defer: function defer(statics) {
      qxWeb.$attach({
        calendar: statics.calendar
      });
    }
  });
  qx.ui.website.Calendar.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.module.Transform": {
        "require": true,
        "defer": "runtime"
      },
      "qx.module.event.Swipe": {
        "require": true,
        "defer": "runtime"
      },
      "qx.module.event.GestureHandler": {
        "require": true,
        "defer": "runtime"
      },
      "qx.module.event.Track": {
        "require": true,
        "defer": "runtime"
      },
      "qx.core.Environment": {
        "defer": "load",
        "require": true
      },
      "qx.Bootstrap": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.website.Widget": {
        "construct": true,
        "require": true
      },
      "qx.bom.client.Browser": {},
      "qxWeb": {
        "defer": "runtime"
      }
    },
    "environment": {
      "provided": [],
      "required": {
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
       2014-2015 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
  ************************************************************************ */

  /**
   * A carousel is a widget which can switch between several sub pages {@link qx.ui.website.Widget}.
   * A page switch is triggered by a swipe to left, for next page, or a swipe to right for
   * previous page. Pages can also be switched by dragging.
   *
   * A carousel shows by default a pagination indicator at the bottom of the carousel.
   *
   * @require(qx.module.Transform)
   * @require(qx.module.event.Swipe)
   * @require(qx.module.event.GestureHandler)
   * @require(qx.module.event.Track)
   */
  qx.Bootstrap.define("qx.ui.website.Carousel", {
    extend: qx.ui.website.Widget,
    statics: {
      _config: {
        /**
         * The time in milliseconds for the page switch animation.
         */
        pageSwitchDuration: 500
      },

      /**
       * Factory method which converts the current collection into a collection of
       * Carousel widgets.
       *
       * @return {qx.ui.website.Carousel} A new carousel collection.
       * @attach {qxWeb}
       */
      carousel: function carousel() {
        var carousel = new qx.ui.website.Carousel(this);
        carousel.init();
        return carousel;
      }
    },
    construct: function construct(selector, context) {
      qx.ui.website.Widget.constructor.call(this, selector, context);
    },
    members: {
      __active__P_559_0: null,
      __pageContainer__P_559_1: null,
      __scrollContainer__P_559_2: null,
      __paginationLabels__P_559_3: null,
      __startPosLeft__P_559_4: null,
      __pagination__P_559_5: null,
      _ie9: false,
      __blocked__P_559_6: false,
      // overridden
      init: function init() {
        if (!qx.ui.website.Carousel.prototype.init.base.call(this)) {
          return false;
        }

        this._ie9 = qx.core.Environment.get("browser.documentmode") === 9;

        if (this._ie9) {
          this.setConfig("pageSwitchDuration", 10);
        } else {
          this.addClass("qx-flex-ready");
        }

        qxWeb(window).on("resize", this._onResize, this);
        var prefix = this.getCssPrefix();
        this.__scrollContainer__P_559_2 = qxWeb.create("<div>").addClass(prefix + "-container").appendTo(this);
        this.__pageContainer__P_559_1 = qxWeb.create("<div>").addClass("qx-hbox").setStyle("height", "100%").appendTo(this.__scrollContainer__P_559_2);
        this.__paginationLabels__P_559_3 = [];
        this.__pagination__P_559_5 = qxWeb.create("<div>").addClasses([prefix + "-pagination", "qx-hbox", "qx-flex1"]).setStyle("visibility", "excluded").appendTo(this);

        if (this._ie9) {
          this.__pageContainer__P_559_1.setStyle("display", "table");

          this.__pagination__P_559_5.setStyle("textAlign", "center");
        } else {
          this.on("trackstart", this._onTrackStart, this).on("track", this._onTrack, this).on("trackend", this._onTrackEnd, this);
        }

        this.on("swipe", this._onSwipe, this);
        this.render();
        return true;
      },
      render: function render() {
        var pages = this.find("." + this.getCssPrefix() + "-page");
        pages.forEach(function (page) {
          this.addPage(qxWeb(page));
        }.bind(this));

        if (pages.length > 0) {
          this.setActive(pages.eq(0));
        }

        return this;
      },

      /**
       * Sets one of the Carousel's pages as active, meaning it will be
       * visible.
       *
       * @param page {qxWeb} The page to be activated
       */
      setActive: function setActive(page) {
        var old = this.__active__P_559_0;
        this.__active__P_559_0 = page;

        this._update();

        var data = {
          value: page,
          old: old,
          target: this
        };
        this.emit("changeActive", data);
      },

      /**
       * Returns the currently active (i.e. visible) page
       * @return {qxWeb} The active page
       */
      getActive: function getActive() {
        return this.__active__P_559_0;
      },

      /**
       * Scrolls the carousel to the next page.
       *
       * @return {qx.ui.website.Carousel} Self instance for chaining
       */
      nextPage: function nextPage() {
        var pages = this._getPages();

        if (pages.length == 0) {
          return this;
        }

        var next = this.getActive().getNext(); // prevent overflow if we don't use the endless loop mode

        if (pages.length > 2) {
          if (next.length === 0) {
            next = pages.eq(0);
          }
        }

        if (next.length > 0) {
          this.setActive(next);
        }

        return this;
      },

      /**
       * Scrolls the carousel to the previous page.
       *
       * @return {qx.ui.website.Carousel} Self instance for chaining
       */
      previousPage: function previousPage() {
        var pages = this._getPages();

        if (pages.length == 0) {
          return this;
        }

        var prev = this.getActive().getPrev(); // prevent overflow if we don't use the endless loop mode

        if (pages.length > 2) {
          if (prev.length == 0) {
            prev = pages.eq(pages.length - 1);
          }
        }

        if (prev.length > 0) {
          this.setActive(prev);
        }

        return this;
      },

      /**
       * Adds a page to the Carousel. Updates the pagination,
       * scroll position, active property and the sizing.
       * @param child {qxWeb} The added child.
       */
      addPage: function addPage(child) {
        child.addClasses(["qx-flex1", this.getCssPrefix() + "-page"]).appendTo(this.__pageContainer__P_559_1);

        if (this.find("." + this.getCssPrefix() + "-page").length > this.__paginationLabels__P_559_3.length) {
          var paginationLabel = this._createPaginationLabel();

          this.__paginationLabels__P_559_3.push(paginationLabel);

          this.__pagination__P_559_5.append(paginationLabel);
        }

        this._updateWidth();

        if (!this.getActive()) {
          this.setActive(child);
        } else if (this._getPages().length > 2) {
          this._updateOrder();
        }

        if (this._ie9) {
          child.setStyle("display", "table-cell");
        }

        this.find(".scroll").setStyle("touchAction", "pan-y"); // scroll as soon as we have the third page added

        if (this._getPages().length === 3 && !this._ie9) {
          this.__scrollContainer__P_559_2.translate([-this.getWidth() + "px", 0, 0]);
        }

        this._updatePagination();
      },

      /**
       * Removes a page from the Carousel. Updates the pagination,
       * scroll position, active property and the sizing.
       * @param child {qxWeb} The removed child.
       */
      removePage: function removePage(child) {
        child.remove(); // reset the active page if we don't have any page at all

        if (this._getPages().length == 0) {
          this.__pagination__P_559_5.empty();

          this.__paginationLabels__P_559_3 = [];
          this.setActive(null);
          return;
        }

        this._updateWidth();

        if (this.getActive()[0] == child[0]) {
          this.setActive(this._getPages().eq(0));
        } else if (this._getPages().length > 2) {
          this._updateOrder();
        } else {
          // remove all order properties
          this._setOrder(this._getPages(), 0);
        }

        this.__paginationLabels__P_559_3.splice(child.priorPosition, 1)[0].remove();

        for (var i = 0; i < this.__paginationLabels__P_559_3.length; i++) {
          this.__paginationLabels__P_559_3[i].getChildren(".label").setHtml(i + 1 + "");
        }

        this._updatePagination();
      },

      /**
       * Updates the order, scroll position and pagination.
       */
      _update: function _update() {
        if (!this.getActive()) {
          return;
        } // special case for only one page


        if (this._getPages().length < 2) {
          return;
        } else if (this._getPages().length == 2) {
          if (this._getPages()[0] === this.getActive()[0]) {
            this._translateTo(0);
          } else {
            this._translateTo(this.getWidth());
          }

          this._updatePagination();

          return;
        }

        var left;

        if (!this._ie9) {
          var direction = this._updateOrder();

          if (direction == "right") {
            left = this._getPositionLeft() - this.__scrollContainer__P_559_2.getWidth();
          } else if (direction == "left") {
            left = this._getPositionLeft() + this.__scrollContainer__P_559_2.getWidth();
          } else if (this._getPages().length >= 3) {
            // back snapping if the order has not changed
            this._translateTo(this.getWidth());

            return;
          } else {
            // do nothing if we don't have enough pages
            return;
          }

          if (left !== undefined) {
            // first, translate the old page into view
            this.__scrollContainer__P_559_2.translate([-left + "px", 0, 0]); // animate to the new page


            this._translateTo(this.getWidth());
          }
        } else {
          var index = this._getPages().indexOf(this.getActive());

          left = index * this.getWidth();

          this._translateTo(left);
        }

        this._updatePagination();
      },

      /**
       * Updates the CSS order property of the flexbox layout.
       * The active page should be the second in order with a order property of '0'.
       * The page left to the active has the order property set to '-1' and is the
       * only one on the left side. All other pages get increasing order numbers and
       * are aligned on the right side.
       *
       * @return {String} The scroll direction, either 'left' or 'right'.
       */
      _updateOrder: function _updateOrder() {
        if (this._ie9) {
          return "left";
        }

        var scrollDirection;

        var pages = this._getPages();

        var orderBefore = this._getOrder(this.getActive());

        if (orderBefore > 0) {
          scrollDirection = "right";
        } else if (orderBefore < 0) {
          scrollDirection = "left";
        }

        var activeIndex = pages.indexOf(this.getActive());

        this._setOrder(this.getActive(), 0); // active page should always have order 0


        var order = 1; // order all pages with a higher index than the active page

        for (var i = activeIndex + 1; i < pages.length; i++) {
          // move the last page to the left of the active page
          if (activeIndex === 0 && i == pages.length - 1) {
            order = -1;
          }

          this._setOrder(pages.eq(i), order++);
        } // order all pages with a lower index than the active page


        for (i = 0; i < activeIndex; i++) {
          // move the last page to the left of the active page
          if (i == activeIndex - 1) {
            order = -1;
          }

          this._setOrder(pages.eq(i), order++);
        }

        return scrollDirection;
      },

      /**
       * Updates the width of the container and the pages.
       */
      _updateWidth: function _updateWidth() {
        if (!this.isRendered() || this.getProperty("offsetWidth") === 0) {
          this.setStyle("visibility", "hidden");

          if (!this.hasListener("appear", this._updateWidth, this)) {
            this.once("appear", this._updateWidth, this);
          }

          return;
        } // set the initial transition on first appear


        if (this._getPositionLeft() === 0 && this._getPages().length > 2 && !this._ie9) {
          this.__scrollContainer__P_559_2.translate([-this.getWidth() + "px", 0, 0]);
        } // set the container width to total width of all pages


        var containerWidth = this.getWidth() * this._getPages().length;

        this.__pageContainer__P_559_1.setStyle("width", containerWidth + "px"); // set the width of all pages to the carousel width


        this._getPages().setStyle("width", this.getWidth() + "px");

        this.setStyle("visibility", "visible");
      },

      /**
       * Handler for trackstart. It saves the initial scroll position and
       * cancels any running animation.
       */
      _onTrackStart: function _onTrackStart() {
        if (this.__blocked__P_559_6) {
          return;
        }

        this.__startPosLeft__P_559_4 = this._getPositionLeft();

        this.__scrollContainer__P_559_2 // stop the current scroll animation
        .stop() // correct the scroll position as the stopped animation
        // resets to its initial value
        .translate([-Math.round(this.__startPosLeft__P_559_4) + "px", 0, 0]);
      },

      /**
       * Track handler which updates the scroll position.
       * @param e {Event} The track event.
       */
      _onTrack: function _onTrack(e) {
        if (this.__blocked__P_559_6) {
          return;
        }

        if (e.delta.axis == "x" && this._getPages().length > 2) {
          this.__scrollContainer__P_559_2.translate([-(this.__startPosLeft__P_559_4 - e.delta.x) + "px", 0, 0]);
        }
      },

      /**
       * TrackEnd handler for enabling the scroll events.
       */
      _onTrackEnd: function _onTrackEnd() {
        if (this.__startPosLeft__P_559_4 == null || this.__blocked__P_559_6) {
          // don't end if we didn't start
          return;
        } // make sure the trackend handling is done after the swipe handling


        window.setTimeout(function () {
          if (this._getPages().length < 3 || this.__scrollContainer__P_559_2.isPlaying()) {
            return;
          }

          this.__startPosLeft__P_559_4 = null;
          var width = this.getWidth();

          var pages = this._getPages();

          var oldActive = this.getActive(); // if more than 50% is visible of the previous page

          if (this._getPositionLeft() < width - width / 2) {
            var prev = this.getActive().getPrev();

            if (prev.length == 0) {
              prev = pages.eq(pages.length - 1);
            }

            this.setActive(prev); // if more than 50% is visible of the next page
          } else if (this._getPositionLeft() > width + width / 2) {
            var next = this.getActive().getNext();

            if (next.length == 0) {
              next = pages.eq(0);
            }

            this.setActive(next);
          }

          if (this.getActive() == oldActive) {
            this._update();
          }
        }.bind(this), 0);
      },

      /**
       * Swipe handler which triggers page changes based on the
       * velocity and the direction.
       * @param e {Event} The swipe event.
       */
      _onSwipe: function _onSwipe(e) {
        if (this.__blocked__P_559_6) {
          return;
        }

        var velocity = Math.abs(e.getVelocity());

        if (e.getAxis() == "x" && velocity > 0.25) {
          if (e.getDirection() == "left") {
            this.nextPage();
          } else if (e.getDirection() == "right") {
            this.previousPage();
          }
        }
      },

      /**
       * Factory method for a paginationLabel.
       * @return {qxWeb} the created pagination label.
       */
      _createPaginationLabel: function _createPaginationLabel() {
        var paginationIndex = this._getPages().length;

        return qxWeb.create('<div class="' + this.getCssPrefix() + '-pagination-label"></div>').on("tap", this._onPaginationLabelTap, this).append(qxWeb.create('<div class="label">' + paginationIndex + '</div>'));
      },

      /**
       * Handles the tap on pagination labels and changes to the desired page.
       * @param e {Event} The tap event.
       */
      _onPaginationLabelTap: function _onPaginationLabelTap(e) {
        this.__paginationLabels__P_559_3.forEach(function (label, index) {
          if (label[0] === e.currentTarget) {
            var pages = this._getPages(); // wo don't reorder with two pages there just set the active property


            if (pages.length === 2) {
              this.setActive(pages.eq(index));
              return;
            }

            var activeIndex = pages.indexOf(this.getActive());
            var distance = index - activeIndex; // set the order to deault dom order

            this._setOrder(pages, 0); // get the active page into view


            this.__scrollContainer__P_559_2.translate([-activeIndex * this.getWidth() + "px", 0, 0]);

            this.__blocked__P_559_6 = true; // animate to the desired page

            this._translateTo((activeIndex + distance) * this.getWidth());

            this.__scrollContainer__P_559_2.once("animationEnd", function (page) {
              this.__blocked__P_559_6 = false; // set the viewport back to the default position

              this.__scrollContainer__P_559_2.translate([-this.getWidth() + "px", 0, 0]);

              this.setActive(page); // this also updates the order

              this._updatePagination();
            }.bind(this, pages.eq(index)));
          }
        }.bind(this));
      },

      /**
       * Updates the pagination indicator of this carousel.
       * Adds the 'active' CSS class to the currently visible page's
       * pagination button.
       */
      _updatePagination: function _updatePagination() {
        // hide the pagination for one page
        this._getPages().length < 2 ? this.__pagination__P_559_5.setStyle("visibility", "excluded") : this.__pagination__P_559_5.setStyle("visibility", "visible");

        this.__pagination__P_559_5.find("." + this.getCssPrefix() + "-pagination-label").removeClass("active");

        var pages = this._getPages();

        this.__paginationLabels__P_559_3[pages.indexOf(this.getActive())].addClass("active");
      },

      /**
       * Resize handler. It updates the sizes, snap points and scroll position.
       */
      _onResize: function _onResize() {
        this._updateWidth();

        if (this._getPages().length > 2) {
          this.__scrollContainer__P_559_2.translate([-this.getWidth() + "px", 0, 0]);
        }
      },

      /**
       * Animates using CSS translations to the given left position.
       * @param left {Number} The new left position
       */
      _translateTo: function _translateTo(left) {
        this.__scrollContainer__P_559_2.animate({
          duration: this.getConfig("pageSwitchDuration"),
          keep: 100,
          timing: "ease",
          keyFrames: {
            0: {},
            100: {
              translate: [-left + "px", 0, 0]
            }
          }
        });
      },

      /**
       * Sets the given order on the given collection.
       * @param col {qxWeb} The collection to set the css property.
       * @param value {Number|String} The value for the order property
       */
      _setOrder: function _setOrder(col, value) {
        col.setStyles({
          order: value,
          msFlexOrder: value
        });
      },

      /**
       * Returns the order css property of the given collection.
       * @param col {qxWeb} The collection to check.
       * @return {Number} The order as number.
       */
      _getOrder: function _getOrder(col) {
        var order = parseInt(col.getStyle("order"));

        if (isNaN(order)) {
          order = parseInt(col.getStyle("msFlexOrder"));
        }

        return order;
      },

      /**
       * Returns a collection of all pages.
       * @return {qxWeb} All pages.
       */
      _getPages: function _getPages() {
        return this.__pageContainer__P_559_1.find("." + this.getCssPrefix() + "-page");
      },

      /**
       * Returns the current left position.
       * @return {Number} The position in px.
       */
      _getPositionLeft: function _getPositionLeft() {
        var containerRect = this.__scrollContainer__P_559_2[0].getBoundingClientRect();

        var parentRect = this[0].getBoundingClientRect();
        return -(containerRect.left - parentRect.left);
      },
      // overridden
      dispose: function dispose() {
        qxWeb(window).off("resize", this._onResize, this);
        this.off("trackstart", this._onTrackStart, this).off("track", this._onTrack, this).off("swipe", this._onSwipe, this).off("trackend", this._onTrackEnd, this);
        return qx.ui.website.Carousel.prototype.dispose.base.call(this);
      }
    },
    defer: function defer(statics) {
      qxWeb.$attach({
        carousel: statics.carousel
      });
    }
  });
  qx.ui.website.Carousel.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.module.Template": {
        "require": true,
        "defer": "runtime"
      },
      "qx.Bootstrap": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.website.Widget": {
        "construct": true,
        "require": true
      },
      "qxWeb": {
        "defer": "runtime"
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2014 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Alexander Steitz (aback)
  
  ************************************************************************ */

  /**
   * This is a date picker widget used to combine an input element with a calendar widget
   * to select a date. The calendar itself is opened as popup to save visual space.
   *
   * <h2>Markup</h2>
   * Each Date Picker widget is connected to an existing input element.
   *
   * <h2>CSS Classes</h2>
   * <table>
   *   <thead>
   *     <tr>
   *       <td>Class Name</td>
   *       <td>Applied to</td>
   *       <td>Description</td>
   *     </tr>
   *   </thead>
   *   <tbody>
   *     <tr>
   *       <td><code>qx-datepicker</code></td>
   *       <td>Input element</td>
   *       <td>Identifies the date picker widget</td>
   *     </tr>
   *     <tr>
   *       <td><code>qx-datepicker-icon</code></td>
   *       <td>Icon element</td>
   *       <td>Identifies the (if configured) image element to open the date picker</td>
   *     </tr>
   *   </tbody>
   * </table>
   *
   * @require(qx.module.Template)
   *
   * @group (Widget)
   */
  qx.Bootstrap.define('qx.ui.website.DatePicker', {
    extend: qx.ui.website.Widget,
    statics: {
      /** List of valid positions to check against */
      __validPositions__P_560_0: null,

      /**
       * *format*
       *
       * Function which is provided with a JavaScript Date object instance. You can provide
       * an own format function to manipulate the value which is set to the associated input element.
       *
       * Default value:
       * <pre>function(date) {
          return date.toLocaleDateString();
        }</pre>
       *
       * *readonly*
       *
       * Boolean value to control if the connected input element is read-only.
       *
       * Default value:
       * <pre>true</pre>
       *
       * *icon*
       *
       * Path to an icon which will be placed next to the input element as additional opener. If configured
       * a necessary <code>img</code> element is created and equipped with the <code>qx-datepicker-icon</code>
       * CSS class to style it.
       *
       * Default value:
       * <pre>null</pre>
       *
       * *mode*
       *
       * Which control should trigger showing the date picker.
       * Possible values are <code>input</code>, <code>icon</code>, <code>both</code>.
       *
       * Default value:
       * <pre>input</pre>
       *
       * *position*
       *
       * Position of the calendar popup from the point of view of the <code>INPUT</code> element.
       * Possible values are
       *
       * * <code>top-left</code>
       * * <code>top-center</code>
       * * <code>top-right</code>
       * * <code>bottom-left</code>
       * * <code>bottom-center</code>
       * * <code>bottom-right</code>
       * * <code>left-top</code>
       * * <code>left-middle</code>
       * * <code>left-bottom</code>
       * * <code>right-top</code>
       * * <code>right-middle</code>
       * * <code>right-bottom</code>
       *
       * Default value:
       * <pre>bottom-left</pre>
       */
      _config: {
        format: function format(date) {
          return date.toLocaleDateString();
        },
        readonly: true,
        icon: null,
        mode: 'input',
        position: 'bottom-left'
      },

      /**
       * Factory method which converts the current collection into a collection of
       * Date Picker widgets. Therefore, an initialization process needs to be done which
       * can be configured with some parameter.
       *
       * @param date {Date?null} The initial Date of the calendar.
       * @return {qx.ui.website.DatePicker} A new date picker collection.
       * @attach {qxWeb}
       */
      datepicker: function datepicker(date) {
        var datepicker = new qx.ui.website.DatePicker(this);
        datepicker.init(date);
        return datepicker;
      }
    },
    construct: function construct(selector, context) {
      qx.ui.website.Widget.constructor.call(this, selector, context);
    },
    members: {
      _calendarId: null,
      _iconId: null,
      _uniqueId: null,

      /**
       * Get the associated calendar widget
       * @return {qx.ui.website.Calendar} calendar widget instance
       */
      getCalendar: function getCalendar() {
        var calendarCollection = qxWeb();
        calendarCollection = calendarCollection.concat(qxWeb('div#' + this._calendarId));
        return calendarCollection;
      },
      // overridden

      /**
       * Initializes the date picker widget
       *
       * @param date {Date} A JavaScript Date object to set the current date
       * @return {Boolean} <code>true</code> if the widget has been initialized
       */
      init: function init(date) {
        if (!qx.ui.website.DatePicker.prototype.init.base.call(this)) {
          return false;
        }

        var uniqueId = Math.round(Math.random() * 10000);
        this._uniqueId = uniqueId;

        this.__setReadOnly__P_560_1(this);

        this.__setIcon__P_560_2(this);

        this.__addInputListener__P_560_3(this);

        var calendarId = 'datepicker-calendar-' + uniqueId;
        var calendar = qxWeb.create('<div id="' + calendarId + '"></div>').calendar();
        calendar.on('tap', this._onCalendarTap);
        calendar.appendTo(document.body).hide(); // create the connection between the date picker and the corresponding calendar widget

        this._calendarId = calendarId; // grab tap events at the body element to be able to hide the calender popup
        // if the user taps outside

        var bodyElement = qxWeb.getDocument(this).body;
        qxWeb(bodyElement).on('tap', this._onBodyTap, this); // react on date selection

        calendar.on('changeValue', this._calendarChangeValue, this);

        if (date !== undefined) {
          calendar.setValue(date);
        }

        return true;
      },
      // overridden
      render: function render() {
        this.getCalendar().render();

        this.__setReadOnly__P_560_1(this);

        this.__setIcon__P_560_2(this);

        this.__addInputListener__P_560_3(this);

        this.setEnabled(this.getEnabled());
        return this;
      },
      // overridden
      setConfig: function setConfig(name, config) {
        if (name === 'position') {
          var validPositions = qx.ui.website.DatePicker.__validPositions__P_560_0;

          if (validPositions.indexOf(config) === -1) {
            throw new Error("Wrong config value for \"position\"! Only the values \"" + validPositions.join('", "') + '" are supported!');
          }
        }

        qx.ui.website.DatePicker.prototype.setConfig.base.call(this, name, config);
        return this;
      },

      /**
       * Listener which handles clicks/taps on the associated input element and
       * opens / hides the calendar.
       *
       * @param e {Event} tap event
       */
      _onTap: function _onTap(e) {
        if (!this.getEnabled()) {
          return;
        }

        var calendar = this.getCalendar();

        if (calendar.getStyle('display') == 'none') {
          // set position to make sure the width of the DOM element is correct - otherwise the DOM
          // element would be as wide as the parent (e.g. the body element). This would mess up the
          // positioning with 'placeTo'
          calendar.setStyle('position', 'absolute').show().placeTo(this, this.getConfig('position'));
        } else {
          calendar.hide();
        }
      },

      /**
       * Stop tap events from reaching the body so the calendar won't close
       * @param e {Event} Tap event
       */
      _onCalendarTap: function _onCalendarTap(e) {
        e.stopPropagation();
      },

      /**
       * Listener to the body element to be able to hide the calendar if the user clicks
       * or taps outside the calendar.
       *
       * @param e {Event} tap event
       */
      _onBodyTap: function _onBodyTap(e) {
        var target = qxWeb(e.getTarget()); // fast check for tap on the connected input field

        if (this.length > 0 && target.length > 0 && this[0] == target[0]) {
          return;
        } // fast check for tap on the configured icon


        if (this.getConfig('icon') !== null) {
          var icon = qxWeb('#' + this._iconId);

          if (icon.length > 0 && target.length > 0 && icon[0] == target[0]) {
            return;
          }
        } // otherwise check if the target is a child of the (rendered) calendar


        if (this.getCalendar().isRendered()) {
          var tappedCol = qxWeb(e.getTarget());

          if (tappedCol.isChildOf(this.getCalendar()) === false) {
            this.getCalendar().hide();
          }
        }
      },

      /**
       * Listens to value selection of the calendar, Whenever the user selected a day
       * we write it back to the input element and hide the calendar.
       *
       * The format of the date can be controlled with the 'format' config function
       *
       * @param e {Event} selected date value
       */
      _calendarChangeValue: function _calendarChangeValue(e) {
        var formattedValue = this.getConfig('format').call(this, e);
        this.setValue(formattedValue);
        this.getCalendar().hide();
      },

      /**
       * Helper method to set the readonly status on the input element
       *
       * @param collection {qxWeb} collection to work on
       */
      __setReadOnly__P_560_1: function __setReadOnly__P_560_1(collection) {
        if (collection.getConfig('readonly')) {
          collection.setAttribute('readonly', 'readonly');
        } else {
          collection.removeAttribute('readonly');
        }
      },

      /**
       * Helper method to add / remove an icon next to the input element
       *
       * @param collection {qxWeb} collection to work on
       */
      __setIcon__P_560_2: function __setIcon__P_560_2(collection) {
        var icon;

        if (collection.getConfig('icon') === null) {
          icon = collection.getNext('img#' + collection._iconId);

          if (icon.length === 1) {
            icon.off('tap', this._onTap, collection);
            icon.remove();
          }
        } else {
          var iconId = 'datepicker-icon-' + collection._uniqueId; // check if there is already an icon

          if (collection._iconId == undefined) {
            collection._iconId = iconId;
            icon = qxWeb.create('<img>');
            icon.setAttributes({
              id: iconId,
              src: collection.getConfig('icon')
            });
            icon.addClass(this.getCssPrefix() + '-icon');
            var openingMode = collection.getConfig('mode');

            if (openingMode === 'icon' || openingMode === 'both') {
              if (!icon.hasListener('tap', this._onTap, collection)) {
                icon.on('tap', this._onTap, collection);
              }
            }

            icon.insertAfter(collection);
          }
        }
      },

      /**
       * Helper method to add a listener to the connected input element
       * if the configured mode is set.
       *
       * @param collection {qxWeb} collection to work on
       */
      __addInputListener__P_560_3: function __addInputListener__P_560_3(collection) {
        if (collection.getConfig('mode') === 'icon') {
          collection.off('tap', collection._onTap);
        } else {
          if (!collection.hasListener('tap', collection._onTap)) {
            collection.on('tap', collection._onTap);
          }
        }
      },
      // overridden
      dispose: function dispose() {
        this.removeAttribute('readonly');
        this.getNext('img#' + this._iconId).remove();
        this.off('tap', this._onTap);
        var bodyElement = qxWeb.getDocument(this).body;
        qxWeb(bodyElement).off('tap', this._onBodyTap, this);
        this.getCalendar().off('changeValue', this._calendarChangeValue, this).off('tap', this._onCalendarTap);
        var calendar = qxWeb('div#' + this._calendarId);
        calendar.remove();
        calendar.dispose();
        return qx.ui.website.DatePicker.prototype.dispose.base.call(this);
      }
    },
    defer: function defer(statics) {
      qxWeb.$attach({
        datepicker: statics.datepicker
      });
      statics.__validPositions__P_560_0 = ['top-left', 'top-center', 'top-right', 'bottom-left', 'bottom-center', 'bottom-right', 'left-top', 'left-middle', 'left-bottom', 'right-top', 'right-middle', 'right-bottom'];
    }
  });
  qx.ui.website.DatePicker.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Bootstrap": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.website.Widget": {
        "construct": true,
        "require": true
      },
      "qxWeb": {
        "defer": "runtime"
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2013 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Martin Wittemann (wittemann)
       * Daniel Wagner (danielwagner)
  
  ************************************************************************ */

  /**
   * This is a simple rating widget which can be used to display a predefined
   * number of symbols which the user can click or tap to give a rating e.g.
   * 3 out of 5 stars.
   *
   * <h2>Markup</h2>
   * Each rating item is a span element. Span elements already existing within
   * the Rating's container will be used, otherwise new elements will be added or
   * removed according to the <code>length</code> config option.
   *
   * <h2>CSS Classes</h2>
   * <table>
   *   <thead>
   *     <tr>
   *       <td>Class Name</td>
   *       <td>Applied to</td>
   *       <td>Description</td>
   *     </tr>
   *   </thead>
   *   <tbody>
   *     <tr>
   *       <td><code>qx-rating</code></td>
   *       <td>Container element</td>
   *       <td>Identifies the Rating widget</td>
   *     </tr>
   *     <tr>
   *       <td><code>qx-rating-item</code></td>
   *       <td>Rating item (span)</td>
   *       <td>Identifies and styles an active Rating item</td>
   *     </tr>
   *     <tr>
   *       <td><code>qx-rating-item-off</code></td>
   *       <td>Rating item (span)</td>
   *       <td>Identifies and styles an inactive Rating item. Applied in addition to <code>qx-rating-item</code></td>
   *     </tr>
   *   </tbody>
   * </table>
   *
   * <h2 class="widget-markup">Generated DOM Structure</h2>
   *
   * @group (Widget)
   */
  qx.Bootstrap.define("qx.ui.website.Rating", {
    extend: qx.ui.website.Widget,
    statics: {
      /**
       * *length*
       *
       * The length of the rating widget.
       *
       * Default value: <pre>5</pre>
       *
       *
       * *symbol*
       *
       * The symbol used to render the rating items. This can be any
       * String e.g. a UTF-8 character.
       *
       * Default value: <pre>★</pre>
       */
      _config: {
        length: 5,
        symbol: "★"
      },

      /**
       * Factory method which converts the current collection into a collection of
       * rating widgets. Therefore, an initialization process needs to be done which
       * can be configured with some parameter.
       *
       * @param initValue {Number?0} The initial value of the rating.
       * @param symbol {String?"★"} The symbol which should be used for each rating item.
       * @param length {Number?5} The length of the rating widget.
       * @return {qx.ui.website.Rating} A new rating collection.
       * @attach {qxWeb}
       */
      rating: function rating(initValue, symbol, length) {
        var rating = new qx.ui.website.Rating(this);
        rating.init();
        var modified = false;

        if (length != undefined && length != rating.getConfig("length")) {
          rating.setConfig("length", length);
          modified = true;
        }

        if (symbol != undefined) {
          rating.setConfig("symbol", symbol);
          modified = true;
        }

        if (modified) {
          rating.render();
        }

        if (initValue != undefined) {
          rating.setValue(initValue);
        }

        return rating;
      }
    },
    construct: function construct(selector, context) {
      qx.ui.website.Widget.constructor.call(this, selector, context);
    },
    events: {
      /** Fired at each value change */
      "changeValue": "Number"
    },
    members: {
      // overridden
      init: function init() {
        if (!qx.ui.website.Rating.prototype.init.base.call(this)) {
          return false;
        }

        this._updateSymbolLength();

        var cssPrefix = this.getCssPrefix();

        if (this.getAttribute("tabindex") < 0) {
          this.setAttribute("tabindex", 0);
        }

        this.on("focus", this._onFocus, this).on("blur", this._onBlur, this).getChildren("span").addClasses([cssPrefix + "-item", cssPrefix + "-item-off"]).on("tap", this._onTap, this);
        return true;
      },

      /**
       * Sets the given value of the raining widget's in the collection. The value will be
       * converted to the maximum or minimum if our of range.
       *
       * @param value {Number} The value of the rating.
       * @return {qx.ui.website.Rating} <code>this</code> reference for chaining.
       */
      setValue: function setValue(value) {
        if (this.getValue() == value) {
          return this;
        }

        if (value < 0) {
          value = 0;
        }

        var cssPrefix = this.getCssPrefix();
        var children = this.getChildren("span");
        children.removeClass(cssPrefix + "-item-off");
        children.slice(value, children.length).addClass(cssPrefix + "-item-off");
        this.emit("changeValue", this.getValue());
        return this;
      },

      /**
       * Reads the current value of the first rating widget in the collection
       * from the DOM and returns it.
       *
       * @return {Number} The current value.
       */
      getValue: function getValue() {
        var cssPrefix = this.getCssPrefix();
        return this.getChildren("span").not("." + cssPrefix + "-item-off").length;
      },
      // overridden
      render: function render() {
        this._updateSymbolLength();
      },

      /**
       * Checks the set length and adds / removes spans containing the rating symbol.
       *
       * @return {qx.ui.website.Rating} <code>this</code> reference for chaining.
       */
      _updateSymbolLength: function _updateSymbolLength() {
        var cssPrefix = this.getCssPrefix();
        var length = this.getConfig("length");
        var children = this.getChildren();
        children.setHtml(this.getConfig("symbol"));
        var diff = length - children.length;

        if (diff > 0) {
          for (var i = 0; i < diff; i++) {
            qxWeb.create("<span>" + this.getConfig("symbol") + "</span>").on("tap", this._onTap, this).addClasses([cssPrefix + "-item", cssPrefix + "-item-off"]).appendTo(this);
          }
        } else {
          for (var i = 0; i < Math.abs(diff); i++) {
            this.getChildren().getLast().off("tap", this._onTap, this).remove();
          }
        }

        return this;
      },

      /**
       * Tap handler which updates the value depending on the selected element.
       *
       * @param e {Event} tap event
       */
      _onTap: function _onTap(e) {
        var parents = qxWeb(e.getTarget()).getParents();
        this.setValue(parents.getChildren().indexOf(e.getTarget()) + 1);
      },

      /**
       * Attaches the keydown listener.
       * @param e {Event} The native focus event.
       */
      _onFocus: function _onFocus(e) {
        qxWeb(document.documentElement).on("keydown", this._onKeyDown, this);
      },

      /**
       * Removes the keydown listener if the widget loses focus.
       *
       * @param e {Event} The native blur event.
       */
      _onBlur: function _onBlur(e) {
        qxWeb(document.documentElement).off("keydown", this._onKeyDown, this);
      },

      /**
       * Changes the value if the left or right arrow key is pressed.
       *
       * @param e {Event} The native keydown event.
       */
      _onKeyDown: function _onKeyDown(e) {
        var key = e.getKeyIdentifier();

        if (key === "Right") {
          this.setValue(this.getValue() + 1);
        } else if (key === "Left") {
          this.setValue(this.getValue() - 1);
        }
      },
      // overridden
      dispose: function dispose() {
        qxWeb(document.documentElement).off("keydown", this._onKeyDown, this);
        this.off("focus", this._onFocus, this).off("blur", this._onBlur, this);
        this.getChildren("span").off("tap", this._onTap, this);
        this.setHtml("");
        return qx.ui.website.Rating.prototype.dispose.base.call(this);
      }
    },
    defer: function defer(statics) {
      qxWeb.$attach({
        rating: statics.rating
      });
    }
  });
  qx.ui.website.Rating.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.module.event.Pointer": {
        "require": true,
        "defer": "runtime"
      },
      "qx.module.Transform": {
        "require": true,
        "defer": "runtime"
      },
      "qx.module.Template": {
        "require": true,
        "defer": "runtime"
      },
      "qx.module.util.Type": {
        "require": true,
        "defer": "runtime"
      },
      "qx.Bootstrap": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.website.Widget": {
        "construct": true,
        "require": true
      },
      "qxWeb": {
        "defer": "runtime"
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2013 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Martin Wittemann (wittemann)
       * Daniel Wagner (danielwagner)
  
  ************************************************************************ */

  /**
   * The Slider control is used to select a numerical value from a given range.
   * It supports custom minimum/maximum values, step sizes and offsets (which limit
   * the knob's range).
   *
   * <h2>Markup</h2>
   * The Slider contains a single button element (the knob), which will be
   * created if it's not already present.
   *
   * <h2>CSS Classes</h2>
   * <table>
   *   <thead>
   *     <tr>
   *       <td>Class Name</td>
   *       <td>Applied to</td>
   *       <td>Description</td>
   *     </tr>
   *   </thead>
   *   <tbody>
   *     <tr>
   *       <td><code>qx-slider</code></td>
   *       <td>Container element</td>
   *       <td>Identifies the Slider widget</td>
   *     </tr>
   *     <tr>
   *       <td><code>qx-slider-knob</code></td>
   *       <td>Slider knob (button)</td>
   *       <td>Identifies and styles the Slider's draggable knob</td>
   *     </tr>
   *   </tbody>
   * </table>
   *
   * <h2 class="widget-markup">Generated DOM Structure</h2>
   *
   * @require(qx.module.event.Pointer)
   * @require(qx.module.Transform)
   * @require(qx.module.Template)
   * @require(qx.module.util.Type)
   *
   *
   * @group (Widget)
   */
  qx.Bootstrap.define("qx.ui.website.Slider", {
    extend: qx.ui.website.Widget,
    statics: {
      /**
       * *step*
       *
       * The steps can be either a number or an array of predefined steps. In the
       * case of a number, it defines the amount of each step. In the case of an
       * array, the values of the array will be used as step values.
       *
       * Default value: <pre>1</pre>
       *
       *
       * *minimum*
       *
       * The minimum value of the slider. This will only be used if no explicit
       * steps are given.
       *
       * Default value: <pre>0 </pre>
       *
       *
       * *maximum*
       *
       * The maximum value of the slider. This will only be used if no explicit
       * steps are given.
       *
       * Default value: <pre>100</pre>
       *
       *
       * *offset*
       *
       * The amount of pixel the slider should be position away from its left and
       * right border.
       *
       * Default value: <pre>0 </pre>
       */
      _config: {
        minimum: 0,
        maximum: 100,
        offset: 0,
        step: 1
      },

      /**
       * *knobContent*
       *
       * The content of the knob element.
       *
       * Default value: <pre>{{value}}</pre>
       */
      _templates: {
        knobContent: "{{value}}"
      },

      /**
       * Factory method which converts the current collection into a collection of
       * slider widgets.
       *
       * @param value {Number?} The initial value of each slider widget
       * @param step {Number|Array?} The step config value to configure the step
       * width or the steps as array of numbers.
       * @return {qx.ui.website.Slider} A new Slider collection.
       * @attach {qxWeb}
       */
      slider: function slider(value, step) {
        var slider = new qx.ui.website.Slider(this);
        slider.init();

        if (typeof step !== "undefined") {
          slider.setConfig("step", step);
        }

        if (typeof value !== "undefined") {
          slider.setValue(value);
        } else {
          slider.setValue(slider.getConfig("minimum"));
        }

        return slider;
      }
    },
    construct: function construct(selector, context) {
      qx.ui.website.Widget.constructor.call(this, selector, context);
    },
    events: {
      /** Fired at each value change */
      "changeValue": "Number",

      /** Fired with each pointer move event */
      "changePosition": "Number"
    },
    members: {
      __dragMode__P_561_0: null,
      _value: 0,
      init: function init() {
        if (!qx.ui.website.Slider.prototype.init.base.call(this)) {
          return false;
        }

        var cssPrefix = this.getCssPrefix();

        if (!this.getValue()) {
          var step = this.getConfig("step");
          var defaultVal = qxWeb.type.get(step) == "Array" ? step[0] : this.getConfig("minimum");
          this._value = defaultVal;
        }

        this.on("pointerup", this._onSliderPointerUp, this).on("focus", this._onSliderFocus, this).setStyle("touch-action", "pan-y");
        qxWeb(document).on("pointerup", this._onDocPointerUp, this);
        qxWeb(window).on("resize", this._onWindowResize, this);

        if (this.getChildren("." + cssPrefix + "-knob").length === 0) {
          this.append(qx.ui.website.Widget.create("<button>").addClass(cssPrefix + "-knob"));
        }

        this.getChildren("." + cssPrefix + "-knob").setAttributes({
          "draggable": "false",
          "unselectable": "true"
        }).setHtml(this._getKnobContent()).on("pointerdown", this._onPointerDown, this).on("dragstart", this._onDragStart, this).on("focus", this._onKnobFocus, this).on("blur", this._onKnobBlur, this);
        this.render();
        return true;
      },

      /**
       * Returns the current value of the slider
       *
       * @return {Integer} slider value
       */
      getValue: function getValue() {
        return this._value;
      },

      /**
       * Sets the current value of the slider.
       *
       * @param value {Integer} new value of the slider
       *
       * @return {qx.ui.website.Slider} The collection for chaining
       */
      setValue: function setValue(value) {
        if (qxWeb.type.get(value) != "Number") {
          throw Error("Please provide a Number value for 'value'!");
        }

        var step = this.getConfig("step");

        if (qxWeb.type.get(step) != "Array") {
          var min = this.getConfig("minimum");
          var max = this.getConfig("maximum");

          if (value < min) {
            value = min;
          }

          if (value > max) {
            value = max;
          }

          if (qxWeb.type.get(step) == "Number") {
            value = Math.round(value / step) * step;
          }
        }

        this._value = value;

        if (qxWeb.type.get(step) != "Array" || step.indexOf(value) != -1) {
          this.__valueToPosition__P_561_1(value);

          this.getChildren("." + this.getCssPrefix() + "-knob").setHtml(this._getKnobContent());
          this.emit("changeValue", value);
        }

        return this;
      },
      render: function render() {
        var step = this.getConfig("step");

        if (qxWeb.type.get(step) == "Array") {
          this._getPixels();

          if (step.indexOf(this.getValue()) == -1) {
            this.setValue(step[0]);
          } else {
            this.setValue(this.getValue());
          }
        } else if (qxWeb.type.get(step) == "Number") {
          this.setValue(Math.round(this.getValue() / step) * step);
        } else {
          this.setValue(this.getValue());
        }

        this.getChildren("." + this.getCssPrefix() + "-knob").setHtml(this._getKnobContent());
        return this;
      },

      /**
       * Returns the content that should be displayed in the knob
       * @return {String} knob content
       */
      _getKnobContent: function _getKnobContent() {
        return qxWeb.template.render(this.getTemplate("knobContent"), {
          value: this.getValue()
        });
      },

      /**
       * Returns half of the slider knob's width, used for positioning
       * @return {Integer} half knob width
       */
      _getHalfKnobWidth: function _getHalfKnobWidth() {
        var knobWidth = this.getChildren("." + this.getCssPrefix() + "-knob").getWidth();
        return Math.round(parseFloat(knobWidth / 2));
      },

      /**
       * Returns the boundaries (in pixels) of the slider's range of motion
       * @return {Map} a map with the keys <code>min</code> and <code>max</code>
       */
      _getDragBoundaries: function _getDragBoundaries() {
        var paddingLeft = Math.ceil(parseFloat(this.getStyle("paddingLeft")) || 0);
        var paddingRight = Math.ceil(parseFloat(this.getStyle("paddingRight")) || 0);
        var offset = this.getConfig("offset");
        return {
          min: this.getOffset().left + offset + paddingLeft,
          max: this.getOffset().left + this.getWidth() - offset - paddingRight
        };
      },

      /**
       * Creates a lookup table to get the pixel values for each slider step
       * and computes the "breakpoint" between two steps in pixel.
       *
       * @return {Integer[]} list of pixel values
       */
      _getPixels: function _getPixels() {
        var step = this.getConfig("step");

        if (qxWeb.type.get(step) != "Array") {
          return [];
        }

        var dragBoundaries = this._getDragBoundaries();

        var pixel = []; // First pixel value is fixed

        pixel.push(dragBoundaries.min);
        var lastIndex = step.length - 1;
        var paddingLeft = Math.ceil(parseFloat(this.getStyle("paddingLeft")) || 0);
        var paddingRight = Math.ceil(parseFloat(this.getStyle("paddingRight")) || 0); //The width really used by the slider (drag area)

        var usedWidth = this.getWidth() - this.getConfig("offset") * 2 - paddingLeft - paddingRight; //The width of a single slider step

        var stepWidth = usedWidth / (step[lastIndex] - step[0]);
        var stepCount = 0;

        for (var i = 1, j = step.length - 1; i < j; i++) {
          stepCount = step[i] - step[0];
          pixel.push(Math.round(stepCount * stepWidth) + dragBoundaries.min);
        } // Last pixel value is fixed


        pixel.push(dragBoundaries.max);
        return pixel;
      },

      /**
      * Returns the nearest existing slider value according to he position of the knob element.
      * @param position {Integer} The current knob position in pixels
      * @return {Integer} The next position to snap to
      */
      _getNearestValue: function _getNearestValue(position) {
        var pixels = this._getPixels();

        if (pixels.length === 0) {
          var dragBoundaries = this._getDragBoundaries();

          var availableWidth = dragBoundaries.max - dragBoundaries.min;
          var relativePosition = position - dragBoundaries.min;
          var fraction = relativePosition / availableWidth;
          var min = this.getConfig("minimum");
          var max = this.getConfig("maximum");
          var result = (max - min) * fraction + min;

          if (result < min) {
            result = min;
          }

          if (result > max) {
            result = max;
          }

          var step = this.getConfig("step");

          if (qxWeb.type.get(step) == "Number") {
            result = Math.round(result / step) * step;
          }

          return result;
        }

        var currentIndex = 0,
            before = 0,
            after = 0;

        for (var i = 0, j = pixels.length; i < j; i++) {
          if (position >= pixels[i]) {
            currentIndex = i;
            before = pixels[i];
            after = pixels[i + 1] || before;
          } else {
            break;
          }
        }

        currentIndex = Math.abs(position - before) <= Math.abs(position - after) ? currentIndex : currentIndex + 1;
        return this.getConfig("step")[currentIndex];
      },

      /**
       * Reads the pointer's position and sets slider value to the nearest step.
       *
       * @param e {qx.event.Emitter} Incoming event object
       */
      _onSliderPointerUp: function _onSliderPointerUp(e) {
        if (e.getDocumentLeft() === 0 && e.getDocumentTop() === 0 || !this.getEnabled()) {
          return;
        }

        this.setValue(this._getNearestValue(e.getDocumentLeft()));
      },

      /**
       * Listener for the pointerdown event. Initializes drag or tracking mode.
       *
       * @param e {qx.event.Emitter} Incoming event object
       */
      _onPointerDown: function _onPointerDown(e) {
        // this can happen if the user releases the button while dragging outside
        // of the browser viewport
        if (this.__dragMode__P_561_0) {
          return;
        }

        this.__dragMode__P_561_0 = true;
        qxWeb(document.documentElement).on("pointermove", this._onPointerMove, this).setStyle("cursor", "pointer");
        e.stopPropagation();
      },

      /**
       * Listener for the pointerup event. Used for cleanup of previously
       * initialized modes.
       *
       * @param e {qx.event.Emitter} Incoming event object
       */
      _onDocPointerUp: function _onDocPointerUp(e) {
        if (this.__dragMode__P_561_0 === true) {
          // Cleanup status flags
          delete this.__dragMode__P_561_0;

          this.__valueToPosition__P_561_1(this.getValue());

          qxWeb(document.documentElement).off("pointermove", this._onPointerMove, this).setStyle("cursor", "auto");
          e.stopPropagation();
        }
      },

      /**
       * Listener for the pointermove event for the knob. Only used in drag mode.
       *
       * @param e {qx.event.Emitter} Incoming event object
       */
      _onPointerMove: function _onPointerMove(e) {
        e.preventDefault();

        if (this.__dragMode__P_561_0) {
          var dragPosition = e.getDocumentLeft();

          var dragBoundaries = this._getDragBoundaries();

          var paddingLeft = Math.ceil(parseFloat(this.getStyle("paddingLeft")) || 0);
          var positionKnob = dragPosition - this.getOffset().left - this._getHalfKnobWidth() - paddingLeft;

          if (dragPosition >= dragBoundaries.min && dragPosition <= dragBoundaries.max) {
            this.setValue(this._getNearestValue(dragPosition));

            if (positionKnob > 0) {
              this._setKnobPosition(positionKnob);

              this.emit("changePosition", positionKnob);
            }
          }

          e.stopPropagation();
        }
      },

      /**
       * Prevents drag event propagation
       * @param e {Event} e drag start event
       */
      _onDragStart: function _onDragStart(e) {
        e.stopPropagation();
        e.preventDefault();
      },

      /**
       * Delegates the Slider's focus to the knob
       * @param e {Event} focus event
       */
      _onSliderFocus: function _onSliderFocus(e) {
        this.getChildren("." + this.getCssPrefix() + "-knob").focus();
      },

      /**
       * Attaches the event listener for keyboard support to the knob on focus
       * @param e {Event} focus event
       */
      _onKnobFocus: function _onKnobFocus(e) {
        this.getChildren("." + this.getCssPrefix() + "-knob").on("keydown", this._onKeyDown, this);
      },

      /**
       * Removes the event listener for keyboard support from the knob on blur
       * @param e {Event} blur event
       */
      _onKnobBlur: function _onKnobBlur(e) {
        this.getChildren("." + this.getCssPrefix() + "-knob").off("keydown", this._onKeyDown, this);
      },

      /**
       * Moves the knob if the left or right arrow key is pressed
       * @param e {Event} keydown event
       */
      _onKeyDown: function _onKeyDown(e) {
        var newValue;
        var currentValue = this.getValue();
        var step = this.getConfig("step");
        var stepType = qxWeb.type.get(step);
        var key = e.getKeyIdentifier();
        var idx;

        if (key == "Right") {
          if (stepType === "Array") {
            idx = step.indexOf(currentValue);

            if (idx !== undefined) {
              newValue = step[idx + 1] || currentValue;
            }
          } else if (stepType === "Number") {
            newValue = currentValue + step;
          } else {
            newValue = currentValue + 1;
          }
        } else if (key == "Left") {
          if (stepType === "Array") {
            idx = step.indexOf(currentValue);

            if (idx !== undefined) {
              newValue = step[idx - 1] || currentValue;
            }
          } else if (stepType === "Number") {
            newValue = currentValue - step;
          } else {
            newValue = currentValue - 1;
          }
        } else {
          return;
        }

        this.setValue(newValue);
      },

      /**
      * Applies the horizontal position
      * @param x {Integer} the position to move to
      */
      _setKnobPosition: function _setKnobPosition(x) {
        var knob = this.getChildren("." + this.getCssPrefix() + "-knob");

        if (qxWeb.env.get("css.transform")) {
          knob.translate([x + "px", 0, 0]);
        } else {
          knob.setStyle("left", x + "px");
        }
      },

      /**
       * Listener for window resize events. This listener method resets the
       * calculated values which are used to position the slider knob.
       */
      _onWindowResize: function _onWindowResize() {
        if (qxWeb.type.get(this.getConfig("step")) == "Array") {
          this._getPixels();
        }

        this.__valueToPosition__P_561_1(this._value);
      },

      /**
       * Positions the slider knob to the given value and fires the "changePosition"
       * event with the current position as integer.
       *
       * @param value {Integer} slider step value
       */
      __valueToPosition__P_561_1: function __valueToPosition__P_561_1(value) {
        var pixels = this._getPixels();

        var paddingLeft = Math.ceil(parseFloat(this.getStyle("paddingLeft")) || 0);
        var valueToPixel;

        if (pixels.length > 0) {
          // Get the pixel value of the current step value
          valueToPixel = pixels[this.getConfig("step").indexOf(value)] - paddingLeft;
        } else {
          var dragBoundaries = this._getDragBoundaries();

          var availableWidth = dragBoundaries.max - dragBoundaries.min;
          var range = this.getConfig("maximum") - this.getConfig("minimum");
          var fraction = (value - this.getConfig("minimum")) / range;
          valueToPixel = availableWidth * fraction + dragBoundaries.min - paddingLeft;
        } // relative position is necessary here


        var position = valueToPixel - this.getOffset().left - this._getHalfKnobWidth();

        this._setKnobPosition(position);

        this.emit("changePosition", position);
      },
      dispose: function dispose() {
        qxWeb(document).off("pointerup", this._onDocPointerUp, this);
        qxWeb(window).off("resize", this._onWindowResize, this);
        this.off("pointerup", this._onSliderPointerUp, this).off("focus", this._onSliderFocus, this);
        this.getChildren("." + this.getCssPrefix() + "-knob").off("pointerdown", this._onPointerDown, this).off("dragstart", this._onDragStart, this).off("focus", this._onKnobFocus, this).off("blur", this._onKnobBlur, this).off("keydown", this._onKeyDown, this);
        this.setHtml("");
        return qx.ui.website.Slider.prototype.dispose.base.call(this);
      }
    },
    // Make the slider widget available as a qxWeb module
    defer: function defer(statics) {
      qxWeb.$attach({
        slider: statics.slider
      });
    }
  });
  qx.ui.website.Slider.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Bootstrap": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.website.Widget": {
        "construct": true,
        "require": true
      },
      "qxWeb": {
        "defer": "runtime"
      },
      "qx.lang.Type": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2013 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Romeo Kenfack Tsakem (rkenfack)
  
  ************************************************************************ */

  /**
   * This is a widget that enhances an HTML table with some basic features like
   * Sorting and Filtering.
   *
   * <h2>CSS Classes</h2>
   * <table>
   *   <thead>
   *     <tr>
   *       <td>Class Name</td>
   *       <td>Applied to</td>
   *       <td>Description</td>
   *     </tr>
   *   </thead>
   *   <tbody>
   *     <tr>
   *       <td><code>qx-table</code></td>
   *       <td>Table element</td>
   *       <td>Identifies the Table widget</td>
   *     </tr>
   *     <tr>
   *       <td><code>qx-table-cell</code></td>
   *       <td>Table cell (<code>td</code>)</td>
   *       <td>Identifies and styles a cell of the widget</td>
   *     </tr>
   *     <tr>
   *       <td><code>qx-table-header</code></td>
   *       <td>Table header (<code>th</code>)</td>
   *       <td>Identifies and styles a header of the table widget</td>
   *     </tr>
   *     <tr>
   *       <td><code>qx-table-row-selection</code></td>
   *       <td>Table cell (<code>td</code>)</td>
   *       <td>Identifies and styles the cells containing the inputs for the row selection</td>
   *     </tr>
   *     <tr>
   *       <td><code>qx-table-selection-input</code></td>
   *       <td><code>input</code></td>
   *       <td>Identifies and styles input element to select a table row</td>
   *     </tr>
   *     <tr>
   *       <td><code>qx-table-input-label</code></td>
   *       <td>Label element (<code>label</code>)</td>
   *       <td>Identifies and styles label contained in the selection cell. This label can be used to create custom inputs</td>
   *     </tr>
   *     <tr>
   *       <td><code>qx-table-row-selected</code></td>
   *       <td>Selected row (<code>tr</code>)</td>
   *       <td>Identifies and styles the selected table rows</td>
   *     </tr>
   *     <tr>
   *       <td><code>qx-table-sort-asc</code></td>
   *       <td>Table header (<code>th</code>)</td>
   *       <td>Identifies and styles the header of the current ascendant sorted column</td>
   *     </tr>
   *     <tr>
   *       <td><code>qx-table-sort-desc</code></td>
   *       <td>Table header (<code>th</code>)</td>
   *       <td>Identifies and styles the header of the current descendant sorted column</td>
   *     </tr>
   *   </tbody>
   * </table>
   *
   * @group (Widget)
   *
   */
  qx.Bootstrap.define("qx.ui.website.Table", {
    extend: qx.ui.website.Widget,
    construct: function construct(selector, context) {
      qx.ui.website.Widget.constructor.call(this, selector, context);
    },
    events: {
      /** Fires at each model change */
      "modelChange": "Array",

      /** Fires at each selection change */
      "selectionChange": "qxWeb",

      /** Fires each time a cell of the widget is clicked */
      "cellClick": "Object",

      /** Fires each time a cell of the widget is hovered */
      "cellHover": "Object",

      /** Fires each time the mouse leave a cell of the table widget */
      "cellOut": "Object",

      /** Fires after the model has been applied to the widget */
      "modelApplied": "Array",

      /** Fires each time the value of a cell is rendered into the cell */
      "cellRender": "Object",

      /** Fires after the table rows have been sorted */
      "sort": "Object",

      /** Fires after the table rows have been filtered */
      "filter": "Object"
    },
    statics: {
      /**
      * *caseSensitive*
      * Determines if the string sorting/filtering should be case sensitive or not. Default value : <code>false</code>.
      *
      * *rowSelection*
      * Defines the row selection type. Possible values are : 'none', 'single', 'multiple'. Default value : <code>none</code>.
      *
      */
      _config: {
        caseSensitive: false,
        rowSelection: "none",
        sortable: false
      },

      /**
      * *columnDefault*
      * The Default cell template for all the table columns. Default value :
      *
      * <pre>
      *   <td class='qx-table-cell' data-qx-table-cell-key='{{ cellKey }}'>
      *     <div class='qx-table-cell-wrapper'>
      *       <label>{{& value }}</label>
      *     </div>
      *   <td>"
      * </pre>
      *
      * To define a custom template for a specific name use <code>setTemplate('colname', template)</code> or use <br>
      * <code>setTemplate('columnDefault', template)</code> to set one template for all your table columns.
      *
      */
      _templates: {
        "columnDefault": "<td class='qx-table-cell' data-qx-table-cell-key='{{ cellKey }}'><div class='qx-table-cell-wrapper'><label>{{& value }}</label></div><td>"
      },

      /**
       * Factory method which converts the current collection into a collection of
       * table widgets.
       * @param model {Array} The model of the widgets in the collection
       * @return {qx.ui.website.Table} A new table collection.
       * @attach {qxWeb}
       */
      table: function table(model) {
        var table = new qx.ui.website.Table(this);
        table.__model__P_562_0 = model;
        table.init();
        return table;
      },

      /**
       * Checks if a given string is a number
       * @param n {String} The String to check the type for
       * @return {Boolean} The result of the check
       */
      __isNumber__P_562_1: function __isNumber__P_562_1(n) {
        return (Object.prototype.toString.call(n) === '[object Number]' || Object.prototype.toString.call(n) === '[object String]') && !isNaN(parseFloat(n)) && isFinite(n.toString().replace(/^-/, ''));
      },

      /**
       * Checks if a given string is a Date
       * @param val {String} The String to check the type for
       * @return {Boolean} The result of the check
       */
      __isDate__P_562_2: function __isDate__P_562_2(val) {
        var d = new Date(val);
        return !isNaN(d.valueOf());
      },

      /**
       * Gets the index of an HTMLElement inside of an HTMLCollection
       * @param htmlCollection {HTMLCollection} The HTMLCollection
       * @param htmlElement {HTMLElement} The HTMLElement
       * @return {Integer} The position of the htmlElement or -1
       */
      __getIndex__P_562_3: function __getIndex__P_562_3(htmlCollection, htmlElement) {
        var index = -1;

        for (var i = 0, l = htmlCollection.length; i < l; i++) {
          if (htmlCollection.item(i) == htmlElement) {
            index = i;
            break;
          }
        }

        return index;
      },

      /**
      * Generates an unique id
      * @return {String} The generated id
      */
      __getUID__P_562_4: function __getUID__P_562_4() {
        return (new Date().getTime() + "" + Math.floor(Math.random() * 1000000)).substr(0, 18);
      },

      /** */
      __selectionTypes__P_562_5: ["single", "multiple", "none"],

      /** */
      __internalCellClass__P_562_6: "qx-table-cell",

      /** */
      __internalHeaderClass__P_562_7: "qx-table-header",

      /** */
      __internalSelectionClass__P_562_8: "qx-table-row-selection",

      /** */
      __internalInputClass__P_562_9: "qx-table-selection-input",

      /** */
      __allColumnSelector__P_562_10: "qx-table-all-columns",

      /** */
      __dataColName__P_562_11: "data-qx-table-col-name",

      /** */
      __dataColType__P_562_12: "data-qx-table-col-type",

      /** */
      __dataSortingKey__P_562_13: "data-qx-table-cell-key",

      /** */
      __modelSortingKey__P_562_14: "cellKey",

      /** */
      __inputLabelClass__P_562_15: "qx-table-input-label",

      /** */
      __selectedRowClass__P_562_16: "qx-table-row-selected",

      /** */
      __ascSortingClass__P_562_17: "qx-table-sort-asc",

      /** */
      __descSortingClass__P_562_18: "qqx-table-sort-desc"
    },
    members: {
      __model__P_562_0: null,
      __columnMeta__P_562_19: null,
      __sortingFunction__P_562_20: null,
      __filterFunction__P_562_21: null,
      __filterFunc__P_562_22: null,
      __filters__P_562_23: null,
      __inputName__P_562_24: null,
      __hovered__P_562_25: null,
      __sortingData__P_562_26: null,
      // overridden
      init: function init() {
        if (!qx.ui.website.Table.prototype.init.base.call(this)) {
          return false;
        }

        var model = this.__model__P_562_0;

        if (qxWeb.getNodeName(this).toUpperCase() !== "TABLE") {
          throw new Error("collection should contains only table elements !!");
        }

        if (!this[0].tHead) {
          throw new Error("A Table header element is required for this widget.");
        }

        this.find("tbody td").addClass("qx-table-cell");
        this.__inputName__P_562_24 = "input" + qx.ui.website.Table.__getUID__P_562_4();

        this.__getColumnMetaData__P_562_27(model);

        this.setModel(model);
        this.setSortingFunction(this.__defaultColumnSort__P_562_28);

        this.__registerEvents__P_562_29();

        this.__hovered__P_562_25 = null;
        return true;
      },

      /**
       * Sets the given model to the widgets in the collection
       *
       * @param model {Array} The model to be set
       * @return {qx.ui.website.Table} <code>this</code> reference for chaining.
       */
      setModel: function setModel(model) {
        if (typeof model != "undefined") {
          if (qx.lang.Type.isArray(model)) {
            this.__model__P_562_0 = model;
            this.emit("modelChange", model);
          } else {
            throw new Error("model must be an Array !!");
          }
        }

        return this;
      },

      /**
       * Set the column types for the table widgets in the collection
       * @param columnName {String} The column name
       * @param type {String} The type of the column
       * @return {qx.ui.website.Table} <code>this</code> reference for chaining.
       */
      setColumnType: function setColumnType(columnName, type) {
        this.__checkColumnExistance__P_562_30(columnName);

        this.__columnMeta__P_562_19[columnName].type = type;
        return this;
      },

      /**
       * Returns the type of the specified column
       * @param columnName {String} The column name
       * @return {String} The type of the specified column
       */
      getColumnType: function getColumnType(columnName) {
        this.eq(0).__checkColumnExistance__P_562_30(columnName);

        return this.eq(0).__columnMeta__P_562_19[columnName].type;
      },

      /**
       * Returns the cell at the given position for the first widget in the collection
       * @param row {Integer} The row number
       * @param col {Integer} The column number
       * @return {qxWeb} The cell found at the given position
       */
      getCell: function getCell(row, col) {
        return qxWeb(this.eq(0).__getRoot__P_562_31().rows.item(row).cells.item(col));
      },

      /**
      * Returns a collection containing the rows of the first table in the collection.
      * @return {qxWeb} The collection containing the table rows
      */
      getRows: function getRows() {
        return qxWeb(this.eq(0).__getRoot__P_562_31().rows);
      },

      /**
       * Defines the comparison function to use to sort columns of the given type
       * @param type {String} The type to define the function for
       * @param compareFunc {Function} The comparison function
       * @return {qx.ui.website.Table} <code>this</code> reference for chaining.
       */
      setCompareFunction: function setCompareFunction(type, compareFunc) {
        type = qxWeb.string.firstUp(type);
        this.setProperty(["_compare" + type], compareFunc);
        return this;
      },

      /**
       * Unset the compare function for the given type
       *
       * @param type {String} The type to unset the function for
       * @return {qx.ui.website.Table} <code>this</code> reference for chaining.
       */
      unsetCompareFunction: function unsetCompareFunction(type) {
        type = qxWeb.string.firstUp(type);
        var compareFunc = this["_compare" + type] || this._compareString;
        this.setProperty(["_compare" + type], compareFunc);
        return this;
      },

      /**
       * Returns the comparison function for the given type
       * @param type {String} The type to get the comparison function for
       * @return {Function} The comparison function
       */
      getCompareFunction: function getCompareFunction(type) {
        type = qxWeb.string.firstUp(type);
        return this.getProperty("_compare" + type) || this["_compare" + type];
      },

      /**
       * Set the function that control the sorting process
       * @param func {Function} The sorting function
       * @return {qx.ui.website.Table} <code>this</code> reference for chaining.
       */
      setSortingFunction: function setSortingFunction(func) {
        func = func || function () {};

        this.__sortingFunction__P_562_20 = func;
        return this;
      },

      /**
       * Unset the function that control the sorting process
       * @return {qx.ui.website.Table} <code>this</code> reference for chaining.
       */
      unsetSortingFunction: function unsetSortingFunction() {
        this.__sortingFunction__P_562_20 = this.__defaultColumnSort__P_562_28;
        return this;
      },

      /**
       * Set the function that will be used to process the column filtering
       * @param func {Function} The filter function
       * @return {qx.ui.website.Table} <code>this</code> reference for chaining.
       */
      setFilterFunction: function setFilterFunction(func) {
        this.__filterFunction__P_562_21 = func;
        return this;
      },

      /**
       * Unset the filter function
       * @return {qx.ui.website.Table} <code>this</code> reference for chaining.
       */
      unsetFilterFunction: function unsetFilterFunction() {
        this.__filterFunction__P_562_21 = this.__defaultColumnFilter__P_562_32;
        return this;
      },

      /**
      * Set the filter function to use to filter a specific column
      * @param columnName {String} The name of the column
      * @param func {Function} The filter
      * @return {qx.ui.website.Table} <code>this</code> reference for chaining.
      *
      */
      setColumnFilter: function setColumnFilter(columnName, func) {
        this.__checkColumnExistance__P_562_30(columnName);

        if (!this.__filterFunc__P_562_22) {
          this.__filterFunc__P_562_22 = {};
        }

        this.__filterFunc__P_562_22[columnName] = func;
        return this;
      },

      /**
      * Returns the filter function set on a specific column
      *
      * @param columnName {String} The name of the column
      * @return {Function} The filter function
      *
      */
      getColumnFilter: function getColumnFilter(columnName) {
        if (this.__filterFunc__P_562_22) {
          return this.__filterFunc__P_562_22[columnName];
        }

        return null;
      },

      /**
      * Set the filter function to use to filter the table rows
      * @param func {Function} The filter
      * @return {qx.ui.website.Table} <code>this</code> reference for chaining.
      */
      setRowFilter: function setRowFilter(func) {
        if (!this.__filterFunc__P_562_22) {
          this.__filterFunc__P_562_22 = {};
        }

        this.__filterFunc__P_562_22.row = func;
        return this;
      },

      /**
      * Returns the filter function set on a specific column
      * @return {Function} The filter function
      *
      */
      getRowFilter: function getRowFilter() {
        if (this.__filterFunc__P_562_22) {
          return this.__filterFunc__P_562_22.row;
        }

        return null;
      },

      /**
       * Sort the column with the given name according to the specified direction
       * @param columnName {String} The name of the column to sort
       * @param dir {String} The sorting direction (asc or desc)
       * @return {qx.ui.website.Table} <code>this</code> reference for chaining.
       */
      sort: function sort(columnName, dir) {
        this.__checkColumnExistance__P_562_30(columnName);

        this.setSortingClass(columnName, dir);

        this.__sortDOM__P_562_33(this.__sort__P_562_34(columnName, dir));

        this.emit("sort", {
          columName: columnName,
          direction: dir
        });
        return this;
      },

      /**
      * Filters rows or columns according to the given parameters
      * @param keyword {String} The keyword to use to filter
      * @param columnName {String ?} The column name
      * @return {qx.ui.website.Table} <code>this</code> reference for chaining.
      */
      filter: function filter(keyword, columnName) {
        if (columnName) {
          this.__checkColumnExistance__P_562_30(columnName);

          if (keyword == "") {
            this.resetFilter(columnName);
          }
        } else {
          columnName = qx.ui.website.Table.__allColumnSelector__P_562_10;
        }

        if (!this.__filters__P_562_23) {
          this.__filters__P_562_23 = {};
        }

        if (this.__filters__P_562_23[columnName]) {
          this.__filters__P_562_23[columnName].keyword = keyword;

          this.__getRoot__P_562_31().appendChild(this.__filters__P_562_23[columnName].rows);
        } else {
          this.__filters__P_562_23[columnName] = {
            keyword: keyword,
            rows: document.createDocumentFragment()
          };
        }

        this.__filterDom__P_562_35(keyword, columnName);

        this.emit("filter", {
          columName: columnName,
          keyword: keyword
        });
        return this;
      },

      /**
      * Resets the filter applied on a specific column
      * @param columnName {String ?} The column name
      * @return {qx.ui.website.Table} <code>this</code> reference for chaining.
      */
      resetFilter: function resetFilter(columnName) {
        var filters = null;
        filters = this.__filters__P_562_23;

        if (filters) {
          if (columnName) {
            this.__getRoot__P_562_31().appendChild(filters[columnName].rows);
          } else {
            for (var col in filters) {
              this.__getRoot__P_562_31().appendChild(filters[col].rows);
            }
          }
        }

        return this;
      },

      /**
      * Removes the rows of in the table body
      * @param tableData {String|qxWeb} Html string or collection containing the rows to be added
      * @return {qx.ui.website.Table} <code>this</code> reference for chaining.
      */
      setContent: function setContent(tableData) {
        var rows = this.__extractTableRows__P_562_36(tableData);

        var tbody = this.find('tbody');
        tbody.empty();
        rows.appendTo(tbody);
        this.render();
        return this;
      },

      /**
      * Appends new rows to the table
      * @param tableData {String|qxWeb} Html string or collection containing the rows to be appended
      * @return {qx.ui.website.Table} <code>this</code> reference for chaining.
      */
      appendContent: function appendContent(tableData) {
        var rows = this.__extractTableRows__P_562_36(tableData);

        var tbody = this.find('tbody');
        rows.appendTo(tbody);
        this.render();
        return this;
      },

      /**
      * Extracts table rows from a given HTML String or qxWeb collection
      * @param data {qxWeb|String} Data containing the rows to be extracted
      * @return {qxWeb} Collection containing extracted rows
      */
      __extractTableRows__P_562_36: function __extractTableRows__P_562_36(data) {
        var rows = qxWeb();

        if (typeof data == "string") {
          var markup = data;
          data = qxWeb.create(data);

          if (qxWeb.getNodeName(data) != "table") {
            data = qxWeb.create("<table>" + markup + "</table>");
          }

          rows = data.find("tbody tr");
        } else if (qxWeb.isNode(data) || data instanceof qxWeb) {
          data = qxWeb(data);
          var nodeName = qxWeb.getNodeName(data);

          switch (nodeName) {
            case "table":
              rows = qxWeb(data).find("tbody tr");
              break;

            case "tr":
              rows = data;
              break;

            case "tbody":
              rows = qxWeb(data).find("tr");
              break;
          }
        }

        return rows;
      },

      /**
      * Filters the rendered table cells
      * @param keyword {String} The keyword to use to filter
      * @param columnName {String ?} The column name
      * @return {qx.ui.website.Table} <code>this</code> reference for chaining.
      */
      __filterDom__P_562_35: function __filterDom__P_562_35(keyword, columnName) {
        var colIndex = this.__getColumnIndex__P_562_37(columnName);

        var filterFunc = columnName == qx.ui.website.Table.__allColumnSelector__P_562_10 ? this.getRowFilter() : this.getColumnFilter(columnName);
        filterFunc = filterFunc || this.__defaultColumnFilter__P_562_32;

        var rows = this.__getDataRows__P_562_38(),
            data = {};

        for (var i = 0; i < rows.length; i++) {
          data = {
            columnName: columnName,
            columnIndex: colIndex,
            cell: colIndex > -1 ? qxWeb(rows[i].cells.item(colIndex)) : null,
            row: qxWeb(rows[i]),
            keyword: keyword
          };

          if (!filterFunc.bind(this)(data)) {
            this.__filters__P_562_23[columnName].rows.appendChild(rows[i]);
          }
        }

        return this;
      },

      /**
       * Get the current column sorting information for the first widget in the collection
       * @return {Map} The map containing the current sorting information
       */
      getSortingData: function getSortingData() {
        return this.__sortingData__P_562_26;
      },
      //overridden
      render: function render() {
        var sortingData = this.getSortingData();
        var rowSelection = this.getConfig("rowSelection");

        this.__applyTemplate__P_562_39(this.__model__P_562_0);

        if (qx.ui.website.Table.__selectionTypes__P_562_5.indexOf(rowSelection) != -1) {
          this.__processSelectionInputs__P_562_40(rowSelection);
        }

        if (sortingData) {
          this.__sortDOM__P_562_33(this.__sort__P_562_34(sortingData.columnName, sortingData.direction));
        }

        return this;
      },
      //Private API

      /**
      * Renders or removes the selection inputs according to the specified widget selection mode
      * @param rowSelection {String} The selection mode
      * @return {qx.ui.website.Table} <code>this</code> reference for chaining.
      */
      __processSelectionInputs__P_562_40: function __processSelectionInputs__P_562_40(rowSelection) {
        switch (rowSelection) {
          case "none":
            qxWeb("." + qx.ui.website.Table.__internalSelectionClass__P_562_8).remove();
            break;

          case "multiple":
          case "single":
            this.__createInputs__P_562_41("checkbox");

            break;

          case "single":
            this.__createInputs__P_562_41("radio");

            break;
        }

        return this;
      },

      /**
       * Creates input nodes for the row selection
       * @param type {String} The type of the inputs to creates
       * @return {qx.ui.website.Table} <code>this</code> reference for chaining.
       */
      __createInputs__P_562_41: function __createInputs__P_562_41(type) {
        this.__createInput__P_562_42(this.__getHeaderRow__P_562_43(), type);

        var rows = this.find("tbody")[0].getElementsByTagName("tr");

        for (var i = 0; i < rows.length; i++) {
          this.__createInput__P_562_42(rows.item(i), type);
        }

        return this;
      },

      /**
      * Creates an input an input node for a specific row
      * @param row {HTMLTableRowElement} The row to create the input for
      * @param type {String} The type of the input tom create (radio or checkbox)
      * @param nodeName {String} The nodename of the table cell that will contain the input
      */
      __createInput__P_562_42: function __createInput__P_562_42(row, type, nodeName) {
        var cssPrefix = this.getCssPrefix();
        var clazz = qx.ui.website.Table;
        var headerInput = qxWeb("." + clazz.__internalHeaderClass__P_562_7 + " input");
        var selectionMode = this.getConfig("rowSelection");
        var checked = "";

        if (headerInput.length > 0) {
          checked = selectionMode == "multiple" && headerInput[0].checked ? "checked" : "";
        }

        if (typeof nodeName == "undefined") {
          nodeName = qxWeb.getNodeName(qxWeb(row.cells.item(0)));
        }

        var inputName = this.__inputName__P_562_24;
        var className = nodeName == "th" ? clazz.__internalSelectionClass__P_562_8 + " " + clazz.__internalHeaderClass__P_562_7 : clazz.__internalSelectionClass__P_562_8;
        var currentInput = qxWeb(row).find("." + clazz.__internalSelectionClass__P_562_8);

        if (currentInput.length > 0) {
          if (currentInput[0].type != type) {
            currentInput[0].type = type;
          }
        } else {
          var id = qx.ui.website.Table.__getUID__P_562_4();

          var inputNode = qxWeb.create("<" + nodeName + " class='" + className + "'><input id='" + id + "' name='" + inputName + "' " + checked + " class='" + cssPrefix + "-" + type + " " + clazz.__internalInputClass__P_562_9 + "' type='" + type + "' /><label class='" + clazz.__inputLabelClass__P_562_15 + "' for='" + id + "'></label></" + nodeName + ">");

          if (row.cells.item(0)) {
            inputNode.insertBefore(qxWeb(row.cells.item(0)));
          } else {
            inputNode.appendTo(qxWeb(row));
          }
        }
      },

      /**
      * Checks if a column with the specified name exists
      * @param columnName {String} The name of the column to check
      */
      __checkColumnExistance__P_562_30: function __checkColumnExistance__P_562_30(columnName) {
        var data = this.__columnMeta__P_562_19;

        if (data && !data[columnName]) {
          throw new Error("Column " + columnName + " does not exists !");
        }
      },

      /**
      * Returns the row containing the cells with the column names
      * @return {HTMLTableRowElement} The row with meta information
      */
      __getHeaderRow__P_562_43: function __getHeaderRow__P_562_43() {
        var tHeadOrFoot = this[0].tHead;

        if (!tHeadOrFoot) {
          throw new Error("A Table header element is required for this widget.");
        }

        var rows = tHeadOrFoot.rows;

        if (rows.length == 1) {
          return rows.item(0);
        } else {
          rows = qxWeb(".qx-table-header-row");

          if (rows.length > 0) {
            return rows[0];
          }
        }

        return null;
      },

      /**
       * Initializes columns metadata
       * @param model {Array} The widget's model
      * @return {qx.ui.website.Table} <code>this</code> reference for chaining.
       */
      __getColumnMetaData__P_562_27: function __getColumnMetaData__P_562_27(model) {
        this.__addClassToHeaderAndFooter__P_562_44(this[0].tHead);

        this.__addClassToHeaderAndFooter__P_562_44(this[0].tFoot);

        var data = {},
            cells = null,
            colName = null,
            cell = null;

        var headerRow = this.__getHeaderRow__P_562_43();

        cells = headerRow.cells;

        for (var i = 0, l = cells.length; i < l; i++) {
          cell = qxWeb(cells.item(i));
          colName = this.__getColumName__P_562_45(cell[0]) || qx.ui.website.Table.__getUID__P_562_4();

          if (!cell[0].getAttribute(qx.ui.website.Table.__dataColName__P_562_11)) {
            cell.setAttribute(qx.ui.website.Table.__dataColName__P_562_11, colName);
          }

          data[colName] = {
            type: cell[0].getAttribute(qx.ui.website.Table.__dataColType__P_562_12) || "String",
            name: colName
          };
        }

        this.__columnMeta__P_562_19 = data;
        return this;
      },

      /**
       * Adds the internal css class to the header and footer cells
       * @param footOrHead {HTMLElement} Html element representing the header or footer of the table
      * @return {qx.ui.website.Table} <code>this</code> reference for chaining.
       */
      __addClassToHeaderAndFooter__P_562_44: function __addClassToHeaderAndFooter__P_562_44(footOrHead) {
        if (footOrHead && footOrHead.rows.length > 0) {
          if (footOrHead.rows.item(0).cells.length > 0) {
            var row = this.__getHeaderRow__P_562_43();

            if (!qxWeb(row.cells.item(0)).hasClass(qx.ui.website.Table.__internalHeaderClass__P_562_7)) {
              qxWeb(row.cells).addClass(qx.ui.website.Table.__internalHeaderClass__P_562_7);
            }
          }
        }

        return this;
      },

      /**
       * Sorts the rows of the table widget
       * @param dataRows {Array} Array containing the sorted rows
       * @return {qx.ui.website.Table} <code>this</code> reference for chaining.
       */
      __sortDOM__P_562_33: function __sortDOM__P_562_33(dataRows) {
        for (var i = 0, l = dataRows.length; i < l; i++) {
          if (i) {
            qxWeb(dataRows[i]).insertAfter(dataRows[i - 1]);
          } else {
            qxWeb(dataRows[i]).insertBefore(qxWeb(this.__getRoot__P_562_31().rows.item(0)));
          }
        }

        return this;
      },

      /**
       * registers global events
       * @return {qx.ui.website.Table} <code>this</code> reference for chaining.
       */
      __registerEvents__P_562_29: function __registerEvents__P_562_29() {
        this.on("tap", this.__detectClickedCell__P_562_46);
        this.on("cellClick", function (data) {
          if (data.cell && data.cell.hasClass(qx.ui.website.Table.__internalHeaderClass__P_562_7)) {
            this.__sortingFunction__P_562_20.bind(this)(data);
          }
        }, this);
        this.on("pointerover", this.__cellHover__P_562_47, this);
        this.on("pointerout", this.__cellOut__P_562_48, this);
        return this;
      },

      /**
      * Checks if the selection inputs are already rendered
      * @return {Boolean} True if the inputs are rendered and false otherwise
      */
      __selectionRendered__P_562_49: function __selectionRendered__P_562_49() {
        return qxWeb("." + qx.ui.website.Table.__internalSelectionClass__P_562_8).length > 0;
      },

      /**
      * Handles clicks that happen on the selection inputs
      * @param cell {qxWeb} The table cell containing the clicked input
      * @return {qx.ui.website.Table} <code>this</code> reference for chaining.
      */
      __processSelection__P_562_50: function __processSelection__P_562_50(cell) {
        var clazz = qx.ui.website.Table;
        var inputs = qxWeb("." + clazz.__internalInputClass__P_562_9);
        var clickedInput = cell.find("input");
        var selectionMode = this.getConfig("rowSelection");
        var headerInput = qxWeb("." + clazz.__internalHeaderClass__P_562_7 + " input");
        var selection = [];

        if (selectionMode == "multiple") {
          if (cell.hasClass(clazz.__internalHeaderClass__P_562_7)) {
            inputs.setAttribute("checked", clickedInput[0].checked);
          }

          var checked = true;

          for (var i = 0; i < inputs.length; i++) {
            if (inputs[i] != headerInput[0] && !inputs[i].checked) {
              checked = false;
              break;
            }
          }

          headerInput.setAttribute("checked", checked);
          inputs = inputs.toArray();

          if (checked) {
            qxWeb.array.remove(inputs, headerInput[0]);
            selection = inputs;
          } else {
            selection = inputs.filter(function (input) {
              return input.checked;
            });
          }
        } else {
          if (clickedInput[0] != headerInput[0]) {
            selection.push(clickedInput[0]);
          }
        }

        var selectedRows = selection.map(function (elem) {
          return elem.parentNode.parentNode;
        });
        selectedRows = qxWeb(selectedRows);
        qxWeb("." + clazz.__selectedRowClass__P_562_16).removeClass(clazz.__selectedRowClass__P_562_16);
        selectedRows.addClass(clazz.__selectedRowClass__P_562_16);
        this.emit("selectionChange", {
          rows: qxWeb(selectedRows)
        });
        return this;
      },

      /**
      * Fires a custom table events
      * @param eventType {String} The event type
      * @param cell {HTMLTableCellElement} The event target
      * @param target {HTMLElement} The native event target
      * @return {Map} Map containing the event data
      */
      __fireEvent__P_562_51: function __fireEvent__P_562_51(eventType, cell, target) {
        var row = cell[0].parentNode,
            cells = row.cells;

        var colNumber = qx.ui.website.Table.__getIndex__P_562_3(cells, cell[0]);

        var tHead = this.__getHeaderRow__P_562_43();

        var headCell = tHead.cells.item(colNumber);

        var colName = this.__getColumName__P_562_45(headCell);

        var columnIndex = this.getConfig("rowSelection") != "none" ? this.__getColumnIndex__P_562_37(colName) - 1 : this.__getColumnIndex__P_562_37(colName);
        var data = {
          cell: qxWeb(cell),
          row: qxWeb(row),
          target: target,
          columnIndex: columnIndex,
          columnName: colName
        };
        this.emit(eventType, data);
        return data;
      },

      /**
       * Click callback
       *
       * @param e {Event} The native click event.
       * @return {qx.ui.website.Table} <code>this</code> reference for chaining.
       */
      __detectClickedCell__P_562_46: function __detectClickedCell__P_562_46(e) {
        var target = e.getTarget();
        var cell = qxWeb(target);
        var clazz = qx.ui.website.Table;

        while (!(cell.hasClass(clazz.__internalCellClass__P_562_6) || cell.hasClass(clazz.__internalHeaderClass__P_562_7) || cell.hasClass(clazz.__internalSelectionClass__P_562_8))) {
          if (cell.hasClass(this.classname)) {
            cell = null;
            break;
          }

          cell = cell.getParents().eq(0);
        }

        if (cell.hasClass(clazz.__internalSelectionClass__P_562_8)) {
          window.setTimeout(function () {
            this.__processSelection__P_562_50(cell);
          }.bind(this), 5);
        } else {
          if (cell && cell.length > 0) {
            this.__fireEvent__P_562_51("cellClick", cell, target);
          }
        }

        return this;
      },

      /**
      * Pointerover callback
      *
      * @param e {Event} The native over event.
      */
      __cellHover__P_562_47: function __cellHover__P_562_47(e) {
        var target = e.getTarget();
        var cell = qxWeb(target);
        var hovered = this.__hovered__P_562_25;

        if (!cell.hasClass("qx-table-cell") && !cell.hasClass("qx-table-header")) {
          cell = cell.getClosest(".qx-table-cell, .qx-table-header");
        }

        if (cell && cell.length > 0 && (hovered && hovered.cell[0] != cell[0] || !hovered) && !cell.hasClass("qx-table-row-selection")) {
          if (hovered) {
            this.emit("cellOut", hovered);
          }

          this.__hovered__P_562_25 = this.__fireEvent__P_562_51("cellHover", cell, target);
        }
      },

      /**
      * pointerout callback
      *
      * @param e {Event} The native over event.
      */
      __cellOut__P_562_48: function __cellOut__P_562_48(e) {
        var relatedTarget = e.getRelatedTarget();
        var cell = qxWeb(relatedTarget);

        if (this.__hovered__P_562_25) {
          if (!cell.isChildOf(this)) {
            this.emit("cellOut", this.__hovered__P_562_25);
            this.__hovered__P_562_25 = null;
          } else {
            if (!cell.hasClass("qx-table-cell") && !cell.hasClass("qx-table-header")) {
              cell = cell.getClosest(".qx-table-cell, .qx-table-header");

              if (cell.hasClass("qx-table-row-selection")) {
                this.emit("cellOut", this.__hovered__P_562_25);
                this.__hovered__P_562_25 = null;
              }
            }
          }
        }
      },

      /**
       * Applies the given model to the table cells depending on
       * the mustache template specified before
       * @param model {Array} The model to apply
       * @return {qx.ui.website.Table} <code>this</code> reference for chaining.
       */
      __applyTemplate__P_562_39: function __applyTemplate__P_562_39(model) {
        if (model && model.length > 0) {
          var cell, row;

          var tHead = this.__getHeaderRow__P_562_43();

          var createdRow = null,
              colMeta = null;
          var renderedRow = null;
          var inputType = this.getConfig("rowSelection") == "single" ? "radio" : "checkbox";

          if (this.__getRoot__P_562_31().rows.length > model.length) {
            this.__deleteRows__P_562_52(model.length);
          }

          var renderedColIndex = 0,
              templateApplied = false;
          var coltemplate = this.getTemplate("columnDefault");
          var colName = null;

          for (var i = 0, rowCount = model.length; i < rowCount; i++) {
            row = model[i];

            if (!this.__isRowRendered__P_562_53(i)) {
              createdRow = this.__getRoot__P_562_31().insertRow(i);

              if (this.__selectionRendered__P_562_49()) {
                this.__createInput__P_562_42(createdRow, inputType, "td");
              }
            }

            for (var j = 0, colCount = row.length; j < colCount; j++) {
              renderedColIndex = this.__selectionRendered__P_562_49() ? j + 1 : j;
              colName = this.__getColumName__P_562_45(tHead.cells.item(renderedColIndex));
              colMeta = this.__getDataForColumn__P_562_54(colName);
              coltemplate = this.getTemplate(colName) || coltemplate;
              renderedRow = this.__getRoot__P_562_31().rows.item(i);
              cell = qxWeb.create(qxWeb.template.render(coltemplate, model[i][j]))[0];

              if (cell.nodeName.toUpperCase() != "TD") {
                break;
              }

              if (!this.__isCellRendered__P_562_55(i, renderedColIndex)) {
                renderedRow.appendChild(cell);
              } else {
                renderedRow.replaceChild(cell, this.getCell(i, renderedColIndex)[0]);
              }

              this.emit("cellRender", {
                cell: cell,
                row: i,
                col: j,
                value: model[i][j]
              });
            }

            if (i == rowCount - 1) {
              templateApplied = true;
            }
          }

          if (templateApplied) {
            this.emit("modelApplied", model);
          }
        }

        return this;
      },

      /**
      * Removes row from the DOM starting from the specified index
      * @param  rowCount {Integer} The number of rows the kept
      * @return {qx.ui.website.Table} <code>this</code> reference for chaining.
      */
      __deleteRows__P_562_52: function __deleteRows__P_562_52(rowCount) {
        var renderedRows = this.__getRoot__P_562_31().rows;

        while (renderedRows.length > rowCount) {
          this[0].deleteRow(renderedRows.length);
        }

        return this;
      },

      /**
      * Gets the metadata of the column width the specified name
      * @param columName {String} The name of the column to get the metadata for
      * @return {Map} Map containing the metadata
      */
      __getDataForColumn__P_562_54: function __getDataForColumn__P_562_54(columName) {
        return this.__columnMeta__P_562_19[columName];
      },

      /**
       * Gets the Root element containing the data rows
       * @return {HTMLElement} The element containing the data rows
       */
      __getRoot__P_562_31: function __getRoot__P_562_31() {
        return this[0].tBodies.item(0) || this[0];
      },

      /**
       * Checks if the row with the given index is rendered
       * @param index {Integer} The index of the row to check
       * @return {Boolean} The result of the check
       */
      __isRowRendered__P_562_53: function __isRowRendered__P_562_53(index) {
        if (this.__getRoot__P_562_31().rows.item(index)) {
          return true;
        }

        return false;
      },

      /**
       * Checks if the cell with the given row and column indexes is rendered
       * @param rowIndex {Integer} The index of the row to check
       * @param colIndex {Integer} The index of the column
       * @return {Boolean} The result of the check
       */
      __isCellRendered__P_562_55: function __isCellRendered__P_562_55(rowIndex, colIndex) {
        if (!this.__isRowRendered__P_562_53(rowIndex)) {
          return false;
        }

        if (this.__getRoot__P_562_31().rows.item(rowIndex).cells.item(colIndex)) {
          return true;
        }

        return false;
      },

      /**
       * Adds a class to the head and footer of the current sorted column
       * @param columnName {String} The name of the sorted column
       * @param dir {String} The sorting direction
       */
      setSortingClass: function setSortingClass(columnName, dir) {
        var data = {
          columnName: columnName,
          direction: dir
        };
        this.__sortingData__P_562_26 = data;

        this.__addSortingClassToCol__P_562_56(this[0].tHead, columnName, dir);
      },

      /**
       * Adds a class to the head or footer of the current sorted column
       * @param HeaderOrFooter {Node} The n
       * @param columnName {String} The name of the sorted column
       * @param dir {String} The sorting direction
       */
      __addSortingClassToCol__P_562_56: function __addSortingClassToCol__P_562_56(HeaderOrFooter, columnName, dir) {
        var rows = this.__getHeaderRow__P_562_43();

        if (HeaderOrFooter && rows) {
          qxWeb(rows.cells).removeClasses(["qx-table-sort-asc", "qx-table-sort-desc"]);
          var cell = qxWeb("[" + qx.ui.website.Table.__dataColName__P_562_11 + "='" + columnName + "'], #" + columnName);
          cell.addClass("qx-table-sort-" + dir);
        }
      },

      /**
       * Sorts the table rows for the given row and direction
       * @param columnName {String} The name of the column to be sorted
       * @param direction {String} The sorting direction
       * @return {Array} Array containing the sorted rows
       */
      __sort__P_562_34: function __sort__P_562_34(columnName, direction) {
        var meta = this.__getDataForColumn__P_562_54(columnName);

        var columnType = qxWeb.string.firstUp(meta.type);

        if (!this["_compare" + columnType] && !this.getProperty("_compare" + columnType)) {
          columnType = "String";
        }

        var compareFunc = this.getCompareFunction(columnType).bind(this);

        var model = this.__getDataRows__P_562_38();

        var columnIndex = this.__getColumnIndex__P_562_37(columnName);

        return model.sort(function (a, b) {
          var x = this.__getSortingKey__P_562_57(qxWeb(a.cells.item(columnIndex)));

          var y = this.__getSortingKey__P_562_57(qxWeb(b.cells.item(columnIndex)));

          return compareFunc(x, y, direction);
        }.bind(this));
      },

      /**
       * Compares two number
       * @param x {String} The String value of the first number to compare
       * @param y {String} The String value of the second number to compare
       * @param direction {String} The sorting direction
       * @return {Integer} The result of the comparison
       */
      _compareNumber: function _compareNumber(x, y, direction) {
        x = qx.ui.website.Table.__isNumber__P_562_1(x) ? Number(x) : 0;
        y = qx.ui.website.Table.__isNumber__P_562_1(y) ? Number(y) : 0;

        if (direction == "asc") {
          return x - y;
        } else if (direction == "desc") {
          return y - x;
        }

        return 0;
      },

      /**
      * Gets the name of the column containing the given cell
      * @param headerCell {HTMLTableCellElement} The cell to get the column name for
      * @return {String} The column name
      */
      __getColumName__P_562_45: function __getColumName__P_562_45(headerCell) {
        return headerCell.getAttribute(qx.ui.website.Table.__dataColName__P_562_11) || headerCell.getAttribute("id");
      },

      /**
       * Compares two Dates
       * @param x {String} The String value of the first date to compare
       * @param y {String} The String value of the second date to compare
       * @param direction {String} The sorting direction
       * @return {Integer} The result of the comparison
       */
      _compareDate: function _compareDate(x, y, direction) {
        x = qx.ui.website.Table.__isDate__P_562_2(x) ? new Date(x) : new Date(0);
        y = qx.ui.website.Table.__isDate__P_562_2(y) ? new Date(y) : new Date(0);

        if (direction == "asc") {
          return x - y;
        } else if (direction == "desc") {
          return y - x;
        }

        return 0;
      },

      /**
       * Compares two Strings
       * @param x {String} The first string to compare
       * @param y {String} The second string to compare
       * @param direction {String} The sorting direction
       * @return {Integer} The result of the comparison
       */
      _compareString: function _compareString(x, y, direction) {
        if (!this.getConfig("caseSensitive")) {
          x = x.toLowerCase();
          y = y.toLowerCase();
        }

        if (direction == "asc") {
          return x < y ? -1 : x > y ? 1 : 0;
        } else if (direction == "desc") {
          return x > y ? -1 : x < y ? 1 : 0;
        }

        return 0;
      },

      /**
      * Returns the value of the cell to use for sorting
      * @param cell {qxWeb} The cell to get the value of.
      * @return {String} The sorting key
      */
      __getSortingKey__P_562_57: function __getSortingKey__P_562_57(cell) {
        return cell.getAttribute(qx.ui.website.Table.__dataSortingKey__P_562_13) || this.__getCellValue__P_562_58(cell);
      },

      /**
       * Returns the value of the cell that will be used for sorting
       * @param cell {qxWeb} The cell to get the value of
       * @return {String} The text content of the cell
       */
      __getCellValue__P_562_58: function __getCellValue__P_562_58(cell) {
        return cell[0].textContent || cell[0].innerText || "";
      },

      /**
       * Gets the table's data rows from the DOM
       * @return {Array} Array containing the rows of the table
       */
      __getDataRows__P_562_38: function __getDataRows__P_562_38() {
        var rows = this.find("tbody")[0].rows,
            model = [],
            cell = null,
            cells = [];

        for (var i = 0, l = rows.length; i < l; i++) {
          cells = rows.item(i).cells;

          if (cells.length > 0 && cells[0].nodeName.toUpperCase() != "TD") {
            continue;
          }

          for (var j = 0, len = cells.length; j < len; j++) {
            cell = qxWeb(cells[j]);

            if (!cell.hasClass(qx.ui.website.Table.__internalCellClass__P_562_6)) {
              cell.addClass(qx.ui.website.Table.__internalCellClass__P_562_6);
            }
          }

          model.push(rows.item(i));
        }

        return model;
      },

      /**
       * Default sorting processing
       * @param data {Map} Sorting data
       */
      __defaultColumnSort__P_562_28: function __defaultColumnSort__P_562_28(data) {
        var dir = "asc";
        var sortedData = this.getSortingData();

        if (sortedData) {
          if (data.columnName == sortedData.columnName) {
            if (sortedData.direction == dir) {
              dir = "desc";
            }
          }
        }

        if (data.cell.hasClass("qx-table-header")) {
          this.sort(data.columnName, dir);
        }
      },

      /**
      * Default column filter function
      * @param data {Map} Map containing the filter data
      * @return {Boolean} True wenn the row containing the current cell should be kept
      */
      __defaultColumnFilter__P_562_32: function __defaultColumnFilter__P_562_32(data) {
        var caseSensitive = this.getConfig("caseSensitive");
        var cell = data.columnName == qx.ui.website.Table.__allColumnSelector__P_562_10 ? data.row : data.cell;

        var cellValue = this.__getCellValue__P_562_58(cell);

        if (caseSensitive) {
          return cellValue.indexOf(data.keyword) != -1;
        } else {
          return cellValue.toLowerCase().indexOf(data.keyword.toLowerCase()) != -1;
        }
      },

      /**
       * Gets the index of the column with the specified name
       * @param columnName {String} The colukn name
       * @return {Integer} The index of the column or -1 if the column doesn't exists
       */
      __getColumnIndex__P_562_37: function __getColumnIndex__P_562_37(columnName) {
        var tHead = this.__getHeaderRow__P_562_43();

        var cells = tHead.cells;

        for (var i = 0; i < cells.length; i++) {
          if (columnName == this.__getColumName__P_562_45(cells.item(i))) {
            return i;
          }
        }

        return -1;
      }
    },
    defer: function defer(statics) {
      qxWeb.$attach({
        table: statics.table
      });
    }
  });
  qx.ui.website.Table.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.core.Widget": {
        "construct": true,
        "require": true
      },
      "qx.ui.core.MChildrenHandling": {
        "require": true
      },
      "qx.ui.window.MDesktop": {
        "require": true
      },
      "qx.ui.core.MBlocker": {
        "require": true
      },
      "qx.ui.window.IDesktop": {
        "require": true
      },
      "qx.ui.window.Window": {
        "construct": true
      },
      "qx.ui.layout.Canvas": {
        "construct": true
      }
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
  
  ************************************************************************ */

  /**
   * The desktop is a widget, which can act as container for windows. It can be
   * used to define a clipping region for internal windows e.g. to create
   * an MDI like application.
   */
  qx.Class.define("qx.ui.window.Desktop", {
    extend: qx.ui.core.Widget,
    include: [qx.ui.core.MChildrenHandling, qx.ui.window.MDesktop, qx.ui.core.MBlocker],
    implement: qx.ui.window.IDesktop,

    /**
     * @param windowManager {qx.ui.window.IWindowManager} The window manager to use for the desktop.
     *    If not provided, an instance of {@link qx.ui.window.Window#DEFAULT_MANAGER_CLASS} is used.
     */
    construct: function construct(windowManager) {
      qx.ui.core.Widget.constructor.call(this);
      windowManager = windowManager || new qx.ui.window.Window.DEFAULT_MANAGER_CLASS();
      this.getContentElement().disableScrolling();

      this._setLayout(new qx.ui.layout.Canvas().set({
        desktop: true
      }));

      this.setWindowManager(windowManager);
    }
  });
  qx.ui.window.Desktop.$$dbClassInfo = $$dbClassInfo;
})();

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
      "qx.lang.Type": {
        "construct": true
      },
      "qx.lang.Array": {
        "construct": true
      },
      "qx.Promise": {},
      "qx.util.ResourceManager": {},
      "qx.bom.request.Script": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2016 Visionet GmbH, http://www.visionet.de
       2016 OETIKER+PARTNER AG, https://www.oetiker.ch
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Dietrich Streifert (level420)
       * Tobias Oetiker (oetiker)
  
  ************************************************************************ */

  /**
   * Dynamically load non qx scripts. This class is aware of all scripts that have
   * been loaded using its instances, so if two instances load jquery, it will only
   * be loaded once, and the second instance will wait for the jquery to be loaded
   * before continuing to load additional scripts.
   *
   * Usage example:
   *
   * <pre>
   *  ... assets ...
   * /**
   *  * @asset(myapp/jquery/*)
   *  * @asset(myapp/highcharts/*)
   *  *
   *  * @ignore(jQuery.*)
   *  * @ignore(Highcharts.*)
   *  ...
   *
   *
   *    // in debug mode load the uncompressed unobfuscated scripts
   *    var src = '';
   *    var min = '.min';
   *    if (qx.core.Environment.get("qx.debug")) {
   *      src = '.src';
   *      min = '';
   *    }
   *
   *    // initialize the script loading
   *    var dynLoader = new qx.util.DynamicScriptLoader([
   *        "myapp/jquery/jquery"+min+".js",
   *        "myapp/highcharts/highcharts"+src+".js",
   *        "myapp/highcharts/highcharts-more"+src+".js",
   *        "myapp/highcharts/highcharts-modifications.js"
   *    ]);
   *
   *
   *    dynLoader.addListenerOnce('ready',function(e){
   *      console.log("all scripts have been loaded!");
   *    });
   *
   *    dynLoader.addListener('failed',function(e){
   *      var data = e.getData();
   *      console.log("failed to load "+data.script);
   *    });
   *
   *    dynLoader.start();
   *    
   * </pre>
   */
  qx.Class.define("qx.util.DynamicScriptLoader", {
    extend: qx.core.Object,

    /**
     * Create a loader for the given scripts.
     *
     * @param scriptArr {Array|String} the uri name(s) of the script(s) to load 
     */
    construct: function construct(scriptArr) {
      qx.core.Object.constructor.call(this);
      this.__started__P_574_0 = false;
      this.__QUEUE__P_574_1 = qx.lang.Type.isString(scriptArr) ? [scriptArr] : qx.lang.Array.clone(scriptArr);
    },

    /*
    *****************************************************************************
       EVENTS
    *****************************************************************************
    */
    events: {
      /**
       * fired when a script is loaded successfully. The data contains 'script' and 'status' keys.
       */
      loaded: 'qx.event.type.Data',

      /**
       * fired when a specific script fails loading.  The data contains 'script' and 'status' keys.
       */
      failed: 'qx.event.type.Data',

      /**
       * fired when all given scripts are loaded, each time loadScriptsDynamic is called.
       */
      ready: 'qx.event.type.Event'
    },
    statics: {
      /**
       * Map of scripts being added at the present time. Key is script name; value is instance of this class which
       * is loading it.
       */
      __IN_PROGRESS__P_574_2: {},

      /**
       * Map of scripts that have fully loaded. Key is script name; value is true
       */
      __LOADED__P_574_3: {}
    },

    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */
    members: {
      /**
       * Array of the scripts to be loaded
       */
      __QUEUE__P_574_1: null,

      /**
       * True if start has been called.
       */
      __started__P_574_0: null,

      /**
       * Start loading scripts. This may only be called once!
       * @return {Promise?} a promise which will be resolved after load of all scripts if promise support is enabled; nothing (undefined) if promises are not enabled.
       */
      start: function start() {
        return new qx.Promise(function (resolve, reject) {
          this.addListenerOnce("ready", resolve, this);
          this.addListenerOnce("failed", function (e) {
            reject(new Error(e.getData()));
          }, this);

          if (this.isDisposed()) {
            reject(new Error('disposed'));
          }

          if (this.__started__P_574_0) {
            reject(new Error('you can only call start once per instance'));
          }

          this.__started__P_574_0 = true;

          this.__loadScripts__P_574_4();
        }, this);
      },

      /**
       * Chain loading scripts.
       *
       * Recursively called until the array of scripts is consumed
       *
       */
      __loadScripts__P_574_4: function __loadScripts__P_574_4() {
        var DynamicScriptLoader = qx.util.DynamicScriptLoader;
        var script;
        var dynLoader;
        var id1, id2;
        var uri;
        var loader;
        script = this.__QUEUE__P_574_1.shift();

        if (!script) {
          this.fireEvent("ready");
          return;
        }

        if (DynamicScriptLoader.__LOADED__P_574_3[script]) {
          this.fireDataEvent('loaded', {
            script: script,
            status: 'preloaded'
          });

          this.__loadScripts__P_574_4();

          return;
        }

        dynLoader = DynamicScriptLoader.__IN_PROGRESS__P_574_2[script];

        if (dynLoader) {
          id1 = dynLoader.addListener('loaded', function (e) {
            if (this.isDisposed()) {
              return;
            }

            var data = e.getData();

            if (data.script === script) {
              dynLoader.removeListenerById(id2);
              dynLoader.removeListenerById(id1);
              this.fireDataEvent('loaded', data);

              this.__loadScripts__P_574_4();
            }
          }, this);
          id2 = dynLoader.addListener('failed', function (e) {
            if (this.isDisposed()) {
              return;
            }

            var data = e.getData();
            dynLoader.removeListenerById(id1);
            dynLoader.removeListenerById(id2);
            this.fireDataEvent('failed', {
              script: script,
              status: 'loading of ' + data.script + ' failed while waiting for ' + script
            });
          }, this);
          return;
        }

        uri = qx.util.ResourceManager.getInstance().toUri(script);
        loader = new qx.bom.request.Script();
        loader.on("load", function (request) {
          if (this.isDisposed()) {
            return;
          }

          DynamicScriptLoader.__LOADED__P_574_3[script] = true;
          delete DynamicScriptLoader.__IN_PROGRESS__P_574_2[script];
          this.fireDataEvent('loaded', {
            script: script,
            status: request.status
          });

          this.__loadScripts__P_574_4();
        }, this);

        var onError = function onError(request) {
          if (this.isDisposed()) {
            return;
          }

          delete DynamicScriptLoader.__IN_PROGRESS__P_574_2[script];
          this.fireDataEvent('failed', {
            script: script,
            status: request.status
          });
        };

        loader.on("error", onError, this);
        loader.on("timeout", onError, this); // this.debug("Loading " + script + " started");

        loader.open("GET", uri);
        DynamicScriptLoader.__IN_PROGRESS__P_574_2[script] = this;
        loader.send();
      }
    },
    destruct: function destruct() {
      var DynamicScriptLoader = qx.util.DynamicScriptLoader;

      for (var key in DynamicScriptLoader.__IN_PROGRESS__P_574_2) {
        if (DynamicScriptLoader.__IN_PROGRESS__P_574_2[key] === this) {
          delete DynamicScriptLoader.__IN_PROGRESS__P_574_2[key];
        }
      }

      this.__QUEUE__P_574_1 = undefined;
    }
  });
  qx.util.DynamicScriptLoader.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      }
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
       * Sebastian Werner (wpbasti)
       * Fabian Jakobs (fjakobs)
  
  ************************************************************************ */

  /**
   * Class to implement different edit distance ideas.
   *
   * <a href="http://en.wikipedia.org/wiki/Edit_distance">Edit distance on Wikipedia</a>
   * <a href="http://en.wikipedia.org/wiki/Levenshtein_distance">Levenshtein distance on Wikipedia</a>
   */
  qx.Class.define("qx.util.EditDistance", {
    statics: {
      OPERATION_DELETE: 1,
      OPERATION_INSERT: 2,
      OPERATION_REPLACE: 3,

      /**
       * Returns a distant matrix following a concept
       * named Levenshtein distance for two data structures
       *
       * @param dataA {Array} incoming source data
       * @param dataB {Array} incoming target data
       * @return {Integer[][]} outgoing matrix
       */
      __computeLevenshteinDistance__P_575_0: function __computeLevenshteinDistance__P_575_0(dataA, dataB) {
        // distance is dataA table with dataA.length+1 rows and dataB.length+1 columns
        var distance = []; // posA and posB are used to iterate over str1 and str2

        var posA, posB, cost;

        for (posA = 0; posA <= dataA.length; posA++) {
          distance[posA] = [];
          distance[posA][0] = posA;
        }

        for (posB = 1; posB <= dataB.length; posB++) {
          distance[0][posB] = posB;
        }

        for (posA = 1; posA <= dataA.length; posA++) {
          for (posB = 1; posB <= dataB.length; posB++) {
            cost = dataA[posA - 1] === dataB[posB - 1] ? 0 : 1;

            if (distance[posA] === undefined) {
              distance[posA] = [];
            }

            distance[posA][posB] = Math.min(distance[posA - 1][posB] + 1, // deletion
            distance[posA][posB - 1] + 1, // insertion
            distance[posA - 1][posB - 1] + cost // substitution
            );
          }
        }

        return distance;
      },

      /**
       * Computes the operations needed to transform dataA to dataB.
       *
       * @param distance {Integer[][]} Precomputed matrix for the data fields
       * @param dataA {Array} incoming source data
       * @param dataB {Array} incoming target data
       * @return {Map[]} Array of maps describing the operations needed
       */
      __computeEditOperations__P_575_1: function __computeEditOperations__P_575_1(distance, dataA, dataB) {
        var operations = [];
        var posA = dataA.length;
        var posB = dataB.length;

        if (posA === 0) {
          // insert from begin to end
          // reverted order than in all other cases for optimal performance
          for (var i = 0; i < posB; i++) {
            operations.push({
              operation: this.OPERATION_INSERT,
              pos: i,
              old: null,
              value: dataB[i]
            });
          }

          return operations;
        }

        if (posB === 0) {
          // remove from end to begin
          for (var i = posA - 1; i >= 0; i--) {
            operations.push({
              operation: this.OPERATION_DELETE,
              pos: i,
              old: dataA[i],
              value: null
            });
          }

          return operations;
        }

        while (posA !== 0 || posB !== 0) {
          if (posA != 0 && distance[posA][posB] == distance[posA - 1][posB] + 1) {
            operations.push({
              operation: this.OPERATION_DELETE,
              pos: posA - 1,
              old: dataA[posA - 1],
              value: null
            });
            posA -= 1;
          } else if (posB != 0 && distance[posA][posB] == distance[posA][posB - 1] + 1) {
            operations.push({
              operation: this.OPERATION_INSERT,
              pos: posA,
              old: null,
              value: dataB[posB - 1]
            });
            posB -= 1;
          } else {
            if (dataA[posA - 1] !== dataB[posB - 1]) {
              operations.push({
                operation: this.OPERATION_REPLACE,
                pos: posA - 1,
                old: dataA[posA - 1],
                value: dataB[posB - 1]
              });
            }

            posA -= 1;
            posB -= 1;
          }
        }

        return operations;
      },

      /**
       * Returns the operations needed to transform dataA to dataB.
       *
       * @param dataA {Array} incoming source data
       * @param dataB {Array} incoming target data
       * @return {Map[]} Array of maps describing the operations needed
       */
      getEditOperations: function getEditOperations(dataA, dataB) {
        var distance = this.__computeLevenshteinDistance__P_575_0(dataA, dataB);

        var operations = this.__computeEditOperations__P_575_1(distance, dataA, dataB);

        return operations;
      }
    }
  });
  qx.util.EditDistance.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.util.ColorUtil": {}
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
       * Sebastian Werner (wpbasti)
       * Andreas Ecker (ecker)
  
  ************************************************************************ */

  /**
   * Support for extended CSS color names
   */
  qx.Class.define("qx.util.ExtendedColor", {
    statics: {
      /**
       * CSS 3 colors (http://www.w3.org/TR/css3-color/#svg-color)
       * This includes all classic HTML Color names (http://www.w3.org/TR/css3-color/#html4) and the <code>transparent</code> keyword.
       */
      EXTENDED: {
        transparent: [-1, -1, -1],
        aliceblue: [240, 248, 255],
        antiquewhite: [250, 235, 215],
        aqua: [0, 255, 255],
        aquamarine: [127, 255, 212],
        azure: [240, 255, 255],
        beige: [245, 245, 220],
        bisque: [255, 228, 196],
        black: [0, 0, 0],
        blanchedalmond: [255, 235, 205],
        blue: [0, 0, 255],
        blueviolet: [138, 43, 226],
        brown: [165, 42, 42],
        burlywood: [222, 184, 135],
        cadetblue: [95, 158, 160],
        chartreuse: [127, 255, 0],
        chocolate: [210, 105, 30],
        coral: [255, 127, 80],
        cornflowerblue: [100, 149, 237],
        cornsilk: [255, 248, 220],
        crimson: [220, 20, 60],
        cyan: [0, 255, 255],
        darkblue: [0, 0, 139],
        darkcyan: [0, 139, 139],
        darkgoldenrod: [184, 134, 11],
        darkgray: [169, 169, 169],
        darkgreen: [0, 100, 0],
        darkgrey: [169, 169, 169],
        darkkhaki: [189, 183, 107],
        darkmagenta: [139, 0, 139],
        darkolivegreen: [85, 107, 47],
        darkorange: [255, 140, 0],
        darkorchid: [153, 50, 204],
        darkred: [139, 0, 0],
        darksalmon: [233, 150, 122],
        darkseagreen: [143, 188, 143],
        darkslateblue: [72, 61, 139],
        darkslategray: [47, 79, 79],
        darkslategrey: [47, 79, 79],
        darkturquoise: [0, 206, 209],
        darkviolet: [148, 0, 211],
        deeppink: [255, 20, 147],
        deepskyblue: [0, 191, 255],
        dimgray: [105, 105, 105],
        dimgrey: [105, 105, 105],
        dodgerblue: [30, 144, 255],
        firebrick: [178, 34, 34],
        floralwhite: [255, 250, 240],
        forestgreen: [34, 139, 34],
        fuchsia: [255, 0, 255],
        gainsboro: [220, 220, 220],
        ghostwhite: [248, 248, 255],
        gold: [255, 215, 0],
        goldenrod: [218, 165, 32],
        gray: [128, 128, 128],
        green: [0, 128, 0],
        greenyellow: [173, 255, 47],
        grey: [128, 128, 128],
        honeydew: [240, 255, 240],
        hotpink: [255, 105, 180],
        indianred: [205, 92, 92],
        indigo: [75, 0, 130],
        ivory: [255, 255, 240],
        khaki: [240, 230, 140],
        lavender: [230, 230, 250],
        lavenderblush: [255, 240, 245],
        lawngreen: [124, 252, 0],
        lemonchiffon: [255, 250, 205],
        lightblue: [173, 216, 230],
        lightcoral: [240, 128, 128],
        lightcyan: [224, 255, 255],
        lightgoldenrodyellow: [250, 250, 210],
        lightgray: [211, 211, 211],
        lightgreen: [144, 238, 144],
        lightgrey: [211, 211, 211],
        lightpink: [255, 182, 193],
        lightsalmon: [255, 160, 122],
        lightseagreen: [32, 178, 170],
        lightskyblue: [135, 206, 250],
        lightslategray: [119, 136, 153],
        lightslategrey: [119, 136, 153],
        lightsteelblue: [176, 196, 222],
        lightyellow: [255, 255, 224],
        lime: [0, 255, 0],
        limegreen: [50, 205, 50],
        linen: [250, 240, 230],
        magenta: [255, 0, 255],
        maroon: [128, 0, 0],
        mediumaquamarine: [102, 205, 170],
        mediumblue: [0, 0, 205],
        mediumorchid: [186, 85, 211],
        mediumpurple: [147, 112, 219],
        mediumseagreen: [60, 179, 113],
        mediumslateblue: [123, 104, 238],
        mediumspringgreen: [0, 250, 154],
        mediumturquoise: [72, 209, 204],
        mediumvioletred: [199, 21, 133],
        midnightblue: [25, 25, 112],
        mintcream: [245, 255, 250],
        mistyrose: [255, 228, 225],
        moccasin: [255, 228, 181],
        navajowhite: [255, 222, 173],
        navy: [0, 0, 128],
        oldlace: [253, 245, 230],
        olive: [128, 128, 0],
        olivedrab: [107, 142, 35],
        orange: [255, 165, 0],
        orangered: [255, 69, 0],
        orchid: [218, 112, 214],
        palegoldenrod: [238, 232, 170],
        palegreen: [152, 251, 152],
        paleturquoise: [175, 238, 238],
        palevioletred: [219, 112, 147],
        papayawhip: [255, 239, 213],
        peachpuff: [255, 218, 185],
        peru: [205, 133, 63],
        pink: [255, 192, 203],
        plum: [221, 160, 221],
        powderblue: [176, 224, 230],
        purple: [128, 0, 128],
        red: [255, 0, 0],
        rosybrown: [188, 143, 143],
        royalblue: [65, 105, 225],
        saddlebrown: [139, 69, 19],
        salmon: [250, 128, 114],
        sandybrown: [244, 164, 96],
        seagreen: [46, 139, 87],
        seashell: [255, 245, 238],
        sienna: [160, 82, 45],
        silver: [192, 192, 192],
        skyblue: [135, 206, 235],
        slateblue: [106, 90, 205],
        slategray: [112, 128, 144],
        slategrey: [112, 128, 144],
        snow: [255, 250, 250],
        springgreen: [0, 255, 127],
        steelblue: [70, 130, 180],
        tan: [210, 180, 140],
        teal: [0, 128, 128],
        thistle: [216, 191, 216],
        tomato: [255, 99, 71],
        turquoise: [64, 224, 208],
        violet: [238, 130, 238],
        wheat: [245, 222, 179],
        white: [255, 255, 255],
        whitesmoke: [245, 245, 245],
        yellow: [255, 255, 0],
        yellowgreen: [154, 205, 50]
      },

      /**
       * Whether the incoming value is an extended named color.
       *
       * @param value {String} the color value to test
       * @return {Boolean} true if the color is an extended named color
       */
      isExtendedColor: function isExtendedColor(value) {
        return this.EXTENDED[value] !== undefined;
      },

      /**
       * Converts an extended color to the RGB value
       *
       * @param value {String} The incoming string
       * @return {Array} the resulting RGB array
       */
      toRgb: function toRgb(value) {
        var ret = this.EXTENDED[value];

        if (ret) {
          return ret;
        }

        throw new Error("Could not convert other than extended colors to RGB: " + value);
      },

      /**
       * Converts an extended color to a CSS RGB string
       *
       * @param value {String} The incoming string
       * @return {String} the resulting RGB string
       */
      toRgbString: function toRgbString(value) {
        return qx.util.ColorUtil.rgbToRgbString(this.toRgb(value));
      }
    }
  });
  qx.util.ExtendedColor.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /**
   * Generate permutations of a map.
   */
  qx.Class.define("qx.util.Permutation", {
    statics: {
      /**
       * The first parameter is a map with array values. This function computes
       * all combinations of the array values and call the callback for each
       * combination.
       *
       * e.g. a value of
       * <pre class="javascript">
       *   {
       *     a: [1, 2],
       *     b: ["a", "b"]
       *   }
       * </pre>
       * would call the callback for each of these maps:
       * <pre class="javascript">
       *  { a: 1, b: "a" },
       *  { a: 1, b: "b" },
       *  { a: 2, b: "a" },
       *  { a: 2, b: "b" }
       * </pre>
       *
       * @param options {Map} map with array values to generate the permutations of
       * @param callback {Function} This callback is called for each permuted map
       * @param context {Object} The callback's <code>this</code> context.
       */
      permute: function permute(options, callback, context) {
        var keys = Object.keys(options); // init

        var map = {};
        var indices = [];

        for (var i = 0; i < keys.length; i++) {
          indices[i] = 0;
          var key = keys[i];
          map[key] = options[key][0];
        }

        var _perm = function _perm(index, ignore) {
          if (index >= keys.length) {
            return;
          }

          var key = keys[index];
          var values = options[key];

          for (var i = 0; i < values.length; i++) {
            if (ignore !== i) {
              indices[index] = i;
              map[key] = values[i];
              callback.call(context || window, map);
            }

            _perm(index + 1, indices[index + 1]);
          }
        };

        _perm(0, -1);
      }
    }
  });
  qx.util.Permutation.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.locale.Manager": {},
      "qx.core.ValidationError": {},
      "qx.util.ColorUtil": {}
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
       * Martin Wittemann (martinwittemann)
       * Adrian Olaru (adrianolaru)
  
  ************************************************************************ */

  /**
   * This static class contains a set of default validators.
   * These validators are listed twice
   * <ul>
   *   <li>number</li>
   *   <li>email</li>
   *   <li>string</li>
   *   <li>url</li>
   *   <li>color</li>
   * </ul>
   * All these validators don't need an input so the listed function just return a
   * method fitting for the use in the property system.
   * The methods with the check prefix are the returned methods and can be used in
   * other contexts without the property system.
   *
   * There are three more validators
   * <ul>
   *   <li>range</li>
   *   <li>inArray</li>
   *   <li>regExp</li>
   * </ul>
   * These methods do need some addition parameters to specify the validator. So
   * there is no check function which you can use in other contexts because the
   * check function for the validation is created based on the given parameter.
   *
   * *Example usage for a property*
   *
   * <code>validate: qx.util.Validate.number()</code>
   * <br>
   * <code>validate: qx.util.Validate.range(0, 100)</code>
   *
   * Because the methods without the check prefix return a validation method,
   * the function must be called at the property definition. So don't forget the
   * ending brackets for those methods without parameters!
   * For the correct usage, take an additional look at the documentation of the
   * {@link qx.core.Property} class.
   */
  qx.Class.define("qx.util.Validate", {
    statics: {
      /**
       * Returns the function that checks for a number.
       *
       * @param errorMessage {String?null} Custom error message.
       * @return {Function} The {@link #checkNumber} Function.
       */
      number: function number(errorMessage) {
        return function (value) {
          qx.util.Validate.checkNumber(value, null, errorMessage);
        };
      },

      /**
       * The function checks the incoming value to see if it is a number.
       * If not, an ValidationError will be thrown.
       * If you want to use the number check in a property definition,
       * use the {@link #number} method.
       *
       * @param value {var} The value to check.
       * @param formItem {qx.ui.form.IForm} The form item to check if used in a
       *   {@link qx.ui.form.Form}.
       * @param errorMessage {String?undefined} Custom error message.
       * @throws {qx.core.ValidationError} If the value parameter is not a
       *    finite number
       */
      checkNumber: function checkNumber(value, formItem, errorMessage) {
        errorMessage = errorMessage || qx.locale.Manager.tr("%1 is not a number.", value);

        if (typeof value !== "number" && !(value instanceof Number) || !isFinite(value)) {
          throw new qx.core.ValidationError("Validation Error", errorMessage);
        }
      },

      /**
       * Returns the function that checks for an email address.
       *
       * @param errorMessage {String?null} Custom error message.
       * @return {Function} The {@link #checkEmail} Function.
       */
      email: function email(errorMessage) {
        return function (value) {
          qx.util.Validate.checkEmail(value, null, errorMessage);
        };
      },

      /**
       * The function checks the incoming value to see if it is an email address.
       * If not, an ValidationError will be thrown.
       * If you want to use the email check in a property definition,
       * use the {@link #email} method.
       *
       * @param value {var} The value to check.
       * @param formItem {qx.ui.form.IForm} The form item to check if used in a
       *   {@link qx.ui.form.Form}.
       * @param errorMessage {String?null} Custom error message.
       * @throws {qx.core.ValidationError} If the value parameter is not
       *    a valid email address.
       */
      checkEmail: function checkEmail(value, formItem, errorMessage) {
        errorMessage = errorMessage || qx.locale.Manager.tr("'%1' is not an email address.", value || "");
        var reg = /^([A-Za-z0-9_\-.+])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,})$/;

        if (reg.test(value) === false) {
          throw new qx.core.ValidationError("Validation Error", errorMessage);
        }
      },

      /**
       * Returns the function that checks for a string.
       *
       * @param errorMessage {String?null} Custom error message.
       * @return {Function} The {@link #checkString} Function.
       */
      string: function string(errorMessage) {
        return function (value) {
          qx.util.Validate.checkString(value, null, errorMessage);
        };
      },

      /**
       * The function checks the incoming value to see if it is a string.
       * If not, an ValidationError will be thrown.
       * If you want to use the string check in a property definition,
       * use the {@link #string} method.
       *
       * @param value {var} The value to check.
       * @param formItem {qx.ui.form.IForm} The form item to check if used in a
       *   {@link qx.ui.form.Form}.
       * @param errorMessage {String?null} Custom error message.
       * @throws {qx.core.ValidationError} If the value parameter is not a string.
       */
      checkString: function checkString(value, formItem, errorMessage) {
        errorMessage = errorMessage || qx.locale.Manager.tr("%1 is not a string.", value);

        if (typeof value !== "string" && !(value instanceof String)) {
          throw new qx.core.ValidationError("Validation Error", errorMessage);
        }
      },

      /**
       * Returns the function that checks for an url.
       *
       * @param errorMessage {String?null} Custom error message.
       * @return {Function} The {@link #checkUrl} Function.
       */
      url: function url(errorMessage) {
        return function (value) {
          qx.util.Validate.checkUrl(value, null, errorMessage);
        };
      },

      /**
       * The function checks the incoming value to see if it is an url.
       * If not, an ValidationError will be thrown.
       * If you want to use the url check in a property definition,
       * use the {@link #url} method.
       *
       * @param value {var} The value to check.
       * @param formItem {qx.ui.form.IForm} The form item to check if used in a
       *   {@link qx.ui.form.Form}.
       * @param errorMessage {String?null} Custom error message.
       * @throws {qx.core.ValidationError} If the value parameter is not an url.
       */
      checkUrl: function checkUrl(value, formItem, errorMessage) {
        errorMessage = errorMessage || qx.locale.Manager.tr("%1 is not an url.", value);
        var reg = /([A-Za-z0-9])+:\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;

        if (!reg.test(value)) {
          throw new qx.core.ValidationError("Validation Error", errorMessage);
        }
      },

      /**
       * Returns the function that checks for a color.
       *
       * @param errorMessage {String?null} Custom error message.
       * @return {Function} The {@link #checkColor} Function.
       */
      color: function color(errorMessage) {
        return function (value) {
          qx.util.Validate.checkColor(value, null, errorMessage);
        };
      },

      /**
       * The function checks the incoming value to see if it is a color.
       * If not, an ValidationError will be thrown. The check itself will be
       * delegated to the {@link qx.util.ColorUtil#stringToRgb} method.
       * If you want to use the color check in a property definition,
       * use the {@link #color} method.
       *
       * @param value {var} The value to check.
       * @param formItem {qx.ui.form.IForm} The form item to check if used in a
       *   {@link qx.ui.form.Form}.
       * @param errorMessage {String?null} Custom error message.
       * @throws {qx.core.ValidationError} If the value parameter is not a color.
       */
      checkColor: function checkColor(value, formItem, errorMessage) {
        try {
          qx.util.ColorUtil.stringToRgb(value);
        } catch (e) {
          var message = errorMessage || qx.locale.Manager.tr("%1 is not a color! %2", value, e);
          throw new qx.core.ValidationError("Validation Error", message);
        }
      },

      /**
       * Returns a function that checks if the number is in the given range.
       * The range includes the border values.
       * A range from 1 to 2 accepts the values 1 equally as everything up to 2
       * including the 2.
       * If the value given to the returned function is out of the range, a
       * ValidationError will be thrown.
       *
       * @param from {Number} The lower border of the range.
       * @param to {Number} The upper border of the range.
       * @param errorMessage {String?null} Custom error message.
       * @return {Function} A function taking one parameter (value).
       */
      range: function range(from, to, errorMessage) {
        return function (value) {
          var message = errorMessage || qx.locale.Manager.tr("%1 is not in the range from [%2, %3].", value, from, to);

          if (value < from || value > to) {
            throw new qx.core.ValidationError("Validation Error", message);
          }
        };
      },

      /**
       * Returns a function that checks if the given value is in the array.
       * If the value given to the returned function is not in the array, a
       * ValidationError will be thrown.
       *
       * @param array {Array} The array holding the possibilities.
       * @param errorMessage {String?null} Custom error message.
       * @return {Function} A function taking one parameter (value).
       */
      inArray: function inArray(array, errorMessage) {
        return function (value) {
          var message = errorMessage || qx.locale.Manager.tr("%1 is not in %2", value, array);

          if (array.indexOf(value) === -1) {
            throw new qx.core.ValidationError("Validation Error", message);
          }
        };
      },

      /**
       * Returns a function that checks if the given value fits the RegExp.
       * For testing, the function uses the RegExp.test function.
       * If the value given to the returned function does not fit the RegExp, a
       * ValidationError will be thrown.
       * incoming
       * @param reg {RegExp} The RegExp for the check.
       * @param errorMessage {String?null} Custom error message.
       * @return {Function} A function taking one parameter (value).
       */
      regExp: function regExp(reg, errorMessage) {
        return function (value) {
          var message = errorMessage || qx.locale.Manager.tr("%1 does not fit %2.", value, reg);

          if (!reg.test(value)) {
            throw new qx.core.ValidationError("Validation Error", message);
          }
        };
      }
    }
  });
  qx.util.Validate.$$dbClassInfo = $$dbClassInfo;
})();

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
      "qx.util.fsm.State": {},
      "qx.core.ObjectRegistry": {},
      "qx.event.Registration": {},
      "qx.event.type.Data": {},
      "qx.event.type.Event": {},
      "qx.event.Timer": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2006, 2007, 2011 Derrell Lipman
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Derrell Lipman (derrell)
  
  ************************************************************************ */

  /**
   * A finite state machine.
   *
   * See {@link qx.util.fsm.State} for details on creating States,
   * and {@link qx.util.fsm.Transition} for details on creating
   * transitions between states.
   */
  qx.Class.define("qx.util.fsm.FiniteStateMachine", {
    extend: qx.core.Object,

    /**
     * @param machineName {String} The name of this finite state machine
     */
    construct: function construct(machineName) {
      // Call our superclass' constructor
      qx.core.Object.constructor.call(this); // Save the machine name

      this.setName(machineName); // Initialize the states object

      this.__states__P_586_0 = {}; // The first state added will become the start state

      this.__startState__P_586_1 = null; // Initialize the saved-states stack

      this.__savedStates__P_586_2 = []; // Initialize the pending event queue

      this.__eventQueue__P_586_3 = []; // Initialize the blocked events queue

      this.__blockedEvents__P_586_4 = []; // Create the friendlyToObject" object.  Each object has as its property
      // name, the friendly name of the object; and as its property value, the
      // object itself.

      this.__friendlyToObject__P_586_5 = {}; // Create the "friendlyToHash" object.  Each object has as its property
      // name, the friendly name of the object; and as its property value, the
      // hash code of the object.

      this.__friendlyToHash__P_586_6 = {}; // Create the "hashToFriendly" object.  Each object has as its property
      // name, the hash code of the object; and as its property value, the
      // friendly name of the object.

      this.__hashToFriendly__P_586_7 = {}; // Friendly names can be added to groups, for easy manipulation of
      // enabling and disabling groups of widgets.  Track which friendly names
      // are in which group.

      this.__groupToFriendly__P_586_8 = {}; // We also need to be able to map back from friendly name to the groups it
      // is in.

      this.__friendlyToGroups__P_586_9 = {};
    },
    statics: {
      /**
       * Constants which may be values of the nextState member in the
       * transitionInfo parameter of the Transition constructor.
       */
      StateChange: {
        /** When used as a nextState value, means remain in current state */
        CURRENT_STATE: 1,

        /**
         * When used as a nextState value, means go to most-recently pushed state
         */
        POP_STATE_STACK: 2,

        /** When used as a nextState value, means terminate this state machine */
        TERMINATE: 3
      },

      /**
       * Constants for use in the events member of the transitionInfo parameter
       * of the Transition constructor.
       */
      EventHandling: {
        /**
         * This event is handled by this state, but the predicate of a transition
         * will determine whether to use that transition.
         */
        PREDICATE: 1,

        /** Enqueue this event for possible use by the next state */
        BLOCKED: 2
      },

      /**
       * Debug bitmask values.
       */
      DebugFlags: {
        /** Show events */
        EVENTS: 1,

        /** Show transitions */
        TRANSITIONS: 2,

        /** Show individual function invocations during transitions */
        FUNCTION_DETAIL: 4,

        /**
         * When object friendly names are referenced but not found, show message
         */
        OBJECT_NOT_FOUND: 8
      }
    },
    events: {
      /**
       * Fired when the finite state machine terminates. Data is the last state
       * before termination.
       */
      "terminated": "qx.event.type.Data"
    },
    properties: {
      /**
       * The name of this finite state machine (for debug messages)
       */
      name: {
        check: "String",
        nullable: true
      },

      /**
       * The current state of the finite state machine.
       */
      state: {
        check: "String",
        nullable: true
      },

      /**
       * The previous state of the finite state machine, i.e. the state from
       * which we most recently transitioned.  Note that this could be the same
       * as the current state if a successful transition brought us back to the
       * same state.
       */
      previousState: {
        check: "String",
        nullable: true
      },

      /**
       * The state to which we will be transitioning.  This property is valid
       * only during a Transition's ontransition function and a State's onexit
       * function.  At all other times, it is null.
       */
      nextState: {
        check: "String",
        nullable: true
      },

      /**
       * The maximum number of states which may pushed onto the state-stack.  It
       * is generally a poor idea to have very many states saved on a stack.
       * Following program logic becomes very difficult, and the code can be
       * highly unmaintainable.  The default should be more than adequate.
       * You've been warned.
       */
      maxSavedStates: {
        check: "Number",
        init: 2
      },

      /**
       * Debug flags, composed of the bitmask values in the DebugFlags constant.
       *
       * Set the debug flags from the application by or-ing together bits, akin
       * to this:
       *
       * <pre class='javascript'>
       * var FSM = qx.util.fsm.FiniteStateMachine;
       * fsm.setDebugFlags(FSM.DebugFlags.EVENTS |
       *                   FSM.DebugFlags.TRANSITIONS |
       *                   FSM.DebugFlags.FUNCTION_DETAIL |
       *                   FSM.DebugFlags.OBJECT_NOT_FOUND);
       * </pre>
       */
      debugFlags: {
        check: "Number",
        // Default:
        // (qx.util.fsm.FiniteStateMachine.DebugFlags.EVENTS |
        //  qx.util.fsm.FiniteStateMachine.DebugFlags.TRANSITIONS |
        //  qx.util.fsm.FiniteStateMachine.DebugFlags.OBJECT_NOT_FOUND)
        init: 7
      }
    },
    members: {
      __states__P_586_0: null,
      __startState__P_586_1: null,
      __eventQueue__P_586_3: null,
      __blockedEvents__P_586_4: null,
      __savedStates__P_586_2: null,
      __friendlyToObject__P_586_5: null,
      __friendlyToHash__P_586_6: null,
      __hashToFriendly__P_586_7: null,
      __groupToFriendly__P_586_8: null,
      __friendlyToGroups__P_586_9: null,
      __bEventProcessingInProgress__P_586_10: false,
      __bTerminated__P_586_11: true,

      /**
       * Checks whether the finite state machine is terminated or not.
       *
       * @return {Boolean} If the finite state machine is terminated.
       */
      isTerminated: function isTerminated() {
        return this.__bTerminated__P_586_11;
      },

      /**
       * Add a state to the finite state machine.
       *
       *
       * @param state {qx.util.fsm.State}
       *   An object of class qx.util.fsm.State representing a state which is to
       *   be a part of this finite state machine.
       *
       *
       * @throws {Error} If the given state is not an instanceof of qx.util.fsm.State.
       * @throws {Error} If the given state already exists.
       */
      addState: function addState(state) {
        // Ensure that we got valid state info
        if (!state instanceof qx.util.fsm.State) {
          throw new Error("Invalid state: not an instance of qx.util.fsm.State");
        } // Retrieve the name of this state


        var stateName = state.getName(); // Ensure that the state name doesn't already exist

        if (stateName in this.__states__P_586_0) {
          throw new Error("State " + stateName + " already exists");
        } // Is this the first state being added?


        if (this.__startState__P_586_1 == null) {
          // Yup.  Save this state as the start state.
          this.__startState__P_586_1 = stateName;
        } // Add the new state object to the finite state machine


        this.__states__P_586_0[stateName] = state;
      },

      /**
       * Replace a state in the finite state machine.  This is useful if
       * initially "dummy" states are created which load the real state table
       * for a series of operations (and possibly also load the gui associated
       * with the new states at the same time).  Having portions of the finite
       * state machine and their associated gui pages loaded at run time can
       * help prevent long delays at application start-up time.
       *
       *
       * @param state {qx.util.fsm.State}
       *   An object of class qx.util.fsm.State representing a state which is to
       *   be a part of this finite state machine.
       *
       * @param bDispose {Boolean}
       *   If <i>true</i>, then dispose the old state object.  If <i>false</i>,
       *   the old state object is returned for disposing by the caller.
       *
       * @return {Object}
       *   The old state object if it was not disposed; otherwise null.
       *
       * @throws {Error} If the given state is not an instanceof of qx.util.fsm.State.
       */
      replaceState: function replaceState(state, bDispose) {
        // Ensure that we got valid state info
        if (!state instanceof qx.util.fsm.State) {
          throw new Error("Invalid state: not an instance of qx.util.fsm.State");
        } // Retrieve the name of this state


        var stateName = state.getName(); // Save the old state object, so we can return it to be disposed

        var oldState = this.__states__P_586_0[stateName]; // Replace the old state with the new state object.

        this.__states__P_586_0[stateName] = state; // Did they request that the old state be disposed?

        if (bDispose) {
          // Yup.  Mark it to be disposed.
          oldState._bNeedDispose = true;
        }

        return oldState;
      },

      /**
       * Add an object (typically a widget) that is to be accessed during state
       * transitions, to the finite state machine.
       *
       *
       * @param friendlyName {String}
       *   The friendly name to used for access to the object being added.
       *
       * @param obj {Object}
       *   The object to associate with the specified friendly name
       *
       * @param groupNames {Array}
       *   An optional list of group names of which this object is a member.
       *
       */
      addObject: function addObject(friendlyName, obj, groupNames) {
        var hash = qx.core.ObjectRegistry.toHashCode(obj);
        this.__friendlyToHash__P_586_6[friendlyName] = hash;
        this.__hashToFriendly__P_586_7[hash] = friendlyName;
        this.__friendlyToObject__P_586_5[friendlyName] = obj; // If no groupNames are specified, we're done.

        if (!groupNames) {
          return;
        } // Allow either a single group name or an array of group names.  If the
        // former, we convert it to the latter to make the subsequent code
        // simpler.


        if (typeof groupNames == "string") {
          groupNames = [groupNames];
        } // For each group that this friendly name is to be a member of...


        for (var i = 0; i < groupNames.length; i++) {
          var groupName = groupNames[i]; // If the group name doesn't yet exist...

          if (!this.__groupToFriendly__P_586_8[groupName]) {
            // ... then create it.
            this.__groupToFriendly__P_586_8[groupName] = {};
          } // Add the friendly name to the list of names in this group


          this.__groupToFriendly__P_586_8[groupName][friendlyName] = true; // If the friendly name group mapping doesn't yet exist...

          if (!this.__friendlyToGroups__P_586_9[friendlyName]) {
            // ... then create it.
            this.__friendlyToGroups__P_586_9[friendlyName] = [];
          } // Append this group name to the list of groups this friendly name is
          // in


          this.__friendlyToGroups__P_586_9[friendlyName].push(groupName);
        }
      },

      /**
       * Remove an object which had previously been added by {@link #addObject}.
       *
       *
       * @param friendlyName {String}
       *   The friendly name associated with an object, specifying which object
       *   is to be removed.
       *
       */
      removeObject: function removeObject(friendlyName) {
        var hash;
        var groupName;
        var objName;
        var bGroupEmpty;
        hash = this.__friendlyToHash__P_586_6[friendlyName]; // Delete references to any groups this friendly name was in

        if (this.__friendlyToGroups__P_586_9[friendlyName]) {
          for (var i = 0; i < this.__friendlyToGroups__P_586_9[friendlyName].length; i++) {
            groupName = this.__friendlyToGroups__P_586_9[friendlyName][i];
            delete this.__groupToFriendly__P_586_8[groupName][friendlyName]; // Is the group empty now?

            bGroupEmpty = true;

            for (objName in this.__groupToFriendly__P_586_8[groupName]) {
              // The group is not empty. That's all we wanted to know.
              bGroupEmpty = false;
              break;
            } // If the group is empty...


            if (bGroupEmpty) {
              // ... then we can delete the entire entry
              delete this.__groupToFriendly__P_586_8[groupName];
            }
          }

          delete this.__friendlyToGroups__P_586_9[friendlyName];
        } // Delete the friendly name


        delete this.__hashToFriendly__P_586_7[hash];
        delete this.__friendlyToHash__P_586_6[friendlyName];
        delete this.__friendlyToObject__P_586_5[friendlyName];
      },

      /**
       * Retrieve an object previously saved via {@link #addObject}, using its
       * Friendly Name.
       *
       *
       * @param friendlyName {String}
       *   The friendly name of the object to be retrieved.
       *
       * @return {Object}
       *   The object which has the specified friendly name, or undefined if no
       *   object has been associated with that name.
       */
      getObject: function getObject(friendlyName) {
        return this.__friendlyToObject__P_586_5[friendlyName];
      },

      /**
       * Get the friendly name of an object.
       *
       *
       * @param obj {Object}
       *   The object for which the friendly name is desired
       *
       * @return {String}
       *   If the object has been previously registered via {@link #addObject},
       *   then the friendly name of the object is returned; otherwise, null.
       */
      getFriendlyName: function getFriendlyName(obj) {
        var hash = obj ? qx.core.ObjectRegistry.toHashCode(obj) : null;
        return hash ? this.__hashToFriendly__P_586_7[hash] : null;
      },

      /**
       * Retrieve the list of objects which have registered, via {@link #addObject}
       * as being members of the specified group.
       *
       *
       * @param groupName {String}
       *   The name of the group for which the member list is desired.
       *
       * @return {Array}
       *   An array containing the friendly names of any objects which are
       *   members of the specified group.  The resultant array may be empty.
       */
      getGroupObjects: function getGroupObjects(groupName) {
        var a = [];

        for (var name in this.__groupToFriendly__P_586_8[groupName]) {
          a.push(name);
        }

        return a;
      },

      /**
       * Display all of the saved objects and their reverse mappings.
       *
       */
      displayAllObjects: function displayAllObjects() {
        for (var friendlyName in this.__friendlyToHash__P_586_6) {
          var hash = this.__friendlyToHash__P_586_6[friendlyName];
          var obj = this.getObject(friendlyName);
          this.debug(friendlyName + " => " + hash);
          this.debug("  " + hash + " => " + this.__hashToFriendly__P_586_7[hash]);
          this.debug("  " + friendlyName + " => " + this.getObject(friendlyName));
          this.debug("  " + this.getObject(friendlyName) + " => " + this.getFriendlyName(obj));
        }
      },

      /**
       * Get internal data for debugging
       *
       * @return {Map}
       *   A map containing the following:
       *     __states
       *     __startState
       *     __eventQueue
       *     __blockedEvents
       *     __savedStates
       *     __friendlyToObject
       *     __friendlyToHash
       *     __hashToFriendly
       *     __groupToFriendly
       *     __friendlyToGroups
       *     __bEventProcessingInProgress
       */
      _getInternalData: function _getInternalData() {
        return {
          "states": this.__states__P_586_0,
          "startState": this.__startState__P_586_1,
          "eventQueue": this.__eventQueue__P_586_3,
          "blockedEvents": this.__blockedEvents__P_586_4,
          "savedStates": this.__savedStates__P_586_2,
          "friendlyToObject": this.__friendlyToObject__P_586_5,
          "friendlyToHash": this.__friendlyToHash__P_586_6,
          "hashToFriendly": this.__hashToFriendly__P_586_7,
          "groupToFriendly": this.__groupToFriendly__P_586_8,
          "friendlyToGroups": this.__friendlyToGroups__P_586_9
        };
      },

      /**
       * Start (or restart, after it has terminated) the finite state machine
       * from the starting state.  The starting state is defined as the first
       * state added to the finite state machine.
       *
       * @throws {Error} If the machine stared with not available state.
       */
      start: function start() {
        this.__bTerminated__P_586_11 = false;
        var stateName = this.__startState__P_586_1;

        if (stateName == null) {
          throw new Error("Machine started with no available states");
        } // Set the start state to be the first state which was added to the
        // machine


        this.setState(stateName);
        this.setPreviousState(null);
        this.setNextState(null);
        var debugFunctions = this.getDebugFlags() & qx.util.fsm.FiniteStateMachine.DebugFlags.FUNCTION_DETAIL; // Run the actionsBeforeOnentry actions for the initial state

        if (debugFunctions) {
          this.debug(this.getName() + "#" + stateName + "#actionsBeforeOnentry");
        }

        this.__states__P_586_0[stateName].getAutoActionsBeforeOnentry()(this); // Run the entry function for the new state, if one is specified


        if (debugFunctions) {
          this.debug(this.getName() + "#" + stateName + "#entry");
        }

        this.__states__P_586_0[stateName].getOnentry()(this, null); // Run the actionsAfterOnentry actions for the initial state


        if (debugFunctions) {
          this.debug(this.getName() + "#" + stateName + "#actionsAfterOnentry");
        }

        this.__states__P_586_0[stateName].getAutoActionsAfterOnentry()(this);
      },

      /**
       * Save the current or previous state on the saved-state stack.  A future
       * transition can then provide, as its nextState value, the class
       * constant:
       *
       *   <code>
       *   qx.util.fsm.FiniteStateMachine.StateChange.POP_STATE_STACK
       *   </code>
       *
       * which will cause the next state to be whatever is at the top of the
       * saved-state stack, and remove that top element from the saved-state
       * stack.
       *
       *
       * @param state {Boolean|String}
       *   When <i>true</i>, then push the current state onto the stack.  This
       *   might be used in a transition, before the state has changed.  When
       *   <i>false</i>, then push the previous state onto the stack.  This
       *   might be used in an on entry function to save the previous state to
       *   return to.  If this parameter is a string, it is taken to be the
       *   name of the state to transition to.
       *
       *
       * @throws {Error} If the saved-state stack is full.
       */
      pushState: function pushState(state) {
        // See if there's room on the state stack for a new state
        if (this.__savedStates__P_586_2.length >= this.getMaxSavedStates()) {
          // Nope.  Programmer error.
          throw new Error("Saved-state stack is full");
        }

        if (state === true) {
          // Push the current state onto the saved-state stack
          this.__savedStates__P_586_2.push(this.getState());
        } else if (state) {
          this.__savedStates__P_586_2.push(state);
        } else {
          // Push the previous state onto the saved-state stack
          this.__savedStates__P_586_2.push(this.getPreviousState());
        }
      },

      /**
       * Pop the saved state stack.
       *
       * @return {String|Boolean}
       *   The name of a state or a boolean flag that had most recently been
       *   pushed onto the saved-state stack.
       */
      popState: function popState() {
        // Is there anything on the saved-state stack?
        if (this.__savedStates__P_586_2.length == 0) {
          // Nope. Programmer error.
          throw new Error("Saved-state stack is empty");
        }

        return this.__savedStates__P_586_2.pop();
      },

      /**
       * Add the specified event to a list of events to be passed to the next
       * state following state transition.
       *
       *
       * @param event {qx.event.type.Event}
       *   The event to add to the event queue for processing after state change.
       *
       */
      postponeEvent: function postponeEvent(event) {
        // Add this event to the blocked event queue, so it will be passed to the
        // next state upon transition.
        this.__blockedEvents__P_586_4.unshift(event);
      },

      /**
       * Enqueue an event for processing
       *
       *
       * @param event {qx.event.type.Event}
       *   The event to be enqueued
       *
       * @param bAddAtHead {Boolean}
       *   If <i>true</i>, put the event at the head of the queue for immediate
       *   processing.  If <i>false</i>, place the event at the tail of the
       *   queue so that it receives in-order processing.
       *
       */
      enqueueEvent: function enqueueEvent(event, bAddAtHead) {
        // Add the event to the event queue
        if (bAddAtHead) {
          // Put event at the head of the queue
          this.__eventQueue__P_586_3.push(event);
        } else {
          // Put event at the tail of the queue
          this.__eventQueue__P_586_3.unshift(event);
        }

        if (this.getDebugFlags() & qx.util.fsm.FiniteStateMachine.DebugFlags.EVENTS) {
          // Individual objects are listed.  Ensure target is a saved object
          var friendly = this.getFriendlyName(event.getTarget());

          if (bAddAtHead) {
            this.debug(this.getName() + ": Pushed event: " + event.getType() + (friendly ? " on " + friendly : ""));
          } else {
            this.debug(this.getName() + ": Queued event: " + event.getType() + (friendly ? " on " + friendly : ""));
          }
        }
      },

      /**
       * Event listener for all event types in the finite state machine
       *
       * @param event {qx.event.type.Event} The event that was dispatched.
       */
      eventListener: function eventListener(event) {
        if (this.__bTerminated__P_586_11) {
          this.debug(this.getName() + ": Cannot listen to event '" + event.getType() + "', because the finite state machine is not running.");
          return;
        } // Events are enqueued upon receipt.  Some events are then processed
        // immediately; other events get processed later.  We need to allow the
        // event dispatcher to free the source event upon our return, so we'll
        // clone it and enqueue our clone.  The source event can then be
        // disposed upon our return.


        var e = event.clone(); // Enqueue the new event on the tail of the queue

        this.enqueueEvent(e, false); // Process events

        this.__processEvents__P_586_12();
      },

      /**
       * Create an event and send it immediately to the finite state machine.
       *
       * @param type {String}
       *   The type of event, e.g. "execute"
       *
       * @param target {qx.core.Object}
       *   The target of the event
       *
       * @param data {Object|null}
       *   The data, if any, to issue in the event.  If this parameter is null
       *   then a qx.event.type.Event is instantiated.  Otherwise, an event of
       *   type qx.event.type.Data is instantiated and this data is applied to
       *   it.
       *
       */
      fireImmediateEvent: function fireImmediateEvent(type, target, data) {
        if (this.__bTerminated__P_586_11) {
          this.debug(this.getName() + ": Cannot listen to event '" + type + "', because the finite state machine is not running.");
          return;
        }

        if (data) {
          var event = qx.event.Registration.createEvent(type, qx.event.type.Data, [data, null, false]);
        } else {
          var event = qx.event.Registration.createEvent(type, qx.event.type.Event, [false, false]);
        }

        event.setTarget(target);
        this.eventListener(event);
      },

      /**
       * Create and schedule an event to be sent to the finite state machine
       * "shortly".  This allows such things as letting a progress cursor
       * display prior to handling the event.
       *
       * @param type {String}
       *   The type of event, e.g. "execute"
       *
       * @param target {qx.core.Object}
       *   The target of the event
       *
       * @param data {Object|null}
       *   See {@link #fireImmediateEvent} for details.
       *
       * @param timeout {Integer|null}
       *   If provided, this is the number of milliseconds to wait before firing
       *   the event.  If not provided, a default short interval (on the order
       *   of 20 milliseconds) is used.
       *
       */
      scheduleEvent: function scheduleEvent(type, target, data, timeout) {
        qx.event.Timer.once(function () {
          this.fireImmediateEvent(type, target, data);
        }, this, timeout || 20);
      },

      /**
       * Process all of the events on the event queue.
       *
       */
      __processEvents__P_586_12: function __processEvents__P_586_12() {
        // eventListener() can potentially be called while we're processing
        // events
        if (this.__bEventProcessingInProgress__P_586_10) {
          // We were processing already, so don't process concurrently.
          return;
        } // Track that we're processing events


        this.__bEventProcessingInProgress__P_586_10 = true; // Process each of the events on the event queue

        while (this.__eventQueue__P_586_3.length > 0) {
          // Pull the next event from the pending event queue
          var event = this.__eventQueue__P_586_3.pop(); // Run the finite state machine with this event


          var bDispose = this.__run__P_586_13(event); // If we didn't block (and re-queue) the event, dispose it.


          if (bDispose) {
            event.dispose();
          }
        } // We're no longer processing events


        this.__bEventProcessingInProgress__P_586_10 = false;
      },

      /**
       * Run the finite state machine to process a single event.
       *
       *
       * @param event {qx.event.type.Event}
       *   An event that has been dispatched.  The event may be handled (if the
       *   current state handles this event type), queued (if the current state
       *   blocks this event type), or discarded (if the current state neither
       *   handles nor blocks this event type).
       *
       * @return {Boolean}
       *   Whether the event should be disposed.  If it was blocked, we've
       *   pushed it back onto the event queue, and it should not be disposed.
       *
       * @throws {Error} If the explicit transitions does not exist.
       * @throws {Error} If the transition returns an invalid value.
       * @throws {Error} If the next step will transit to an nonexistent state.
       * @throws {Error} If the state stack is empty and the next state is POP_STATE_STACK
       * @throws {Error} If the next state is invalid.
       */
      __run__P_586_13: function __run__P_586_13(event) {
        // For use in generated functions...
        // State name variables
        var thisState;
        var nextState;
        var prevState; // The current State object

        var currentState; // The transitions available in the current State

        var transitions; // Events handled by the current State

        var e; // The action to take place upon receipt of a particular event

        var action; // Get the debug flags

        var debugFlags = this.getDebugFlags(); // Allow slightly faster access to determine if debug is enabled

        var debugEvents = debugFlags & qx.util.fsm.FiniteStateMachine.DebugFlags.EVENTS;
        var debugTransitions = debugFlags & qx.util.fsm.FiniteStateMachine.DebugFlags.TRANSITIONS;
        var debugFunctions = debugFlags & qx.util.fsm.FiniteStateMachine.DebugFlags.FUNCTION_DETAIL;
        var debugObjectNotFound = debugFlags & qx.util.fsm.FiniteStateMachine.DebugFlags.OBJECT_NOT_FOUND; // Individual objects are listed.  Ensure target is a saved object

        var friendly = this.getFriendlyName(event.getTarget());

        if (debugEvents) {
          this.debug(this.getName() + ": Process event: " + event.getType() + (friendly ? " on " + friendly : ""));
        } // Get the current state name


        thisState = this.getState(); // Get the current State object

        currentState = this.__states__P_586_0[thisState]; // Get a list of the transitions available from this state

        transitions = currentState.transitions; // Determine how to handle this event

        e = currentState.getEvents()[event.getType()]; // See if we actually found this event type

        if (!e) {
          if (debugEvents) {
            this.debug(this.getName() + ": Event '" + event.getType() + "'" + " not handled.  Ignoring.");
          }

          return true;
        } // We might have found a constant (PREDICATE or BLOCKED) or an object
        // with each property name being the friendly name of a saved object,
        // and the property value being one of the constants (PREDICATE or
        // BLOCKED).


        if (typeof e == "object") {
          if (!friendly) {
            // Nope, it doesn't seem so.  Just discard it.
            if (debugObjectNotFound) {
              this.debug(this.getName() + ": Could not find friendly name for '" + event.getType() + "' on '" + event.getTarget() + "'");
            }

            return true;
          }

          action = e[friendly]; // Do we handle this event type for the widget from which it
          // originated?

          if (!action) {
            // Nope.
            if (debugEvents) {
              this.debug(this.getName() + ": Event '" + event.getType() + "'" + " not handled for target " + friendly + ".  Ignoring.");
            }

            return true;
          }
        } else {
          action = e;
        }

        switch (action) {
          case qx.util.fsm.FiniteStateMachine.EventHandling.PREDICATE:
            // Process this event.  One of the transitions should handle it.
            break;

          case qx.util.fsm.FiniteStateMachine.EventHandling.BLOCKED:
            // This event is blocked.  Enqueue it for later, and get outta here.
            if (debugEvents) {
              this.debug(this.getName() + ": Event '" + event.getType() + "'" + " blocked.  Re-queuing.");
            }

            this.__blockedEvents__P_586_4.unshift(event);

            return false;

          default:
            // See if we've been given an explicit transition name
            if (typeof action == "string") {
              // Yup!  Ensure that it exists
              if (transitions[action]) {
                // Yup.  Create a transitions object containing only this
                // transition.
                var trans = transitions[action];
                transitions = {};
                transitions[action] = trans;
              } else {
                throw new Error("Explicit transition " + action + " does not exist");
              }

              break;
            }

        } // We handle the event.  Try each transition in turn until we find one
        // that is acceptable.


        for (var t in transitions) {
          var trans = transitions[t]; // Does the predicate allow use of this transition?

          switch (trans.getPredicate()(this, event)) {
            case true:
              // Transition is allowed.  Proceed.
              break;

            case false:
              // Transition is not allowed.  Try next transition.
              continue;

            case null:
              // Transition indicates not to try further transitions
              return true;

            default:
              throw new Error("Transition " + thisState + ":" + t + " returned a value other than " + "true, false, or null.");
          } // We think we can transition to the next state.  Set next state.


          nextState = trans.getNextState();

          if (typeof nextState == "string") {
            // We found a literal state name.  Ensure it exists.
            if (!nextState in this.__states__P_586_0) {
              throw new Error("Attempt to transition to nonexistent state " + nextState);
            } // It exists.  Track it being the next state.


            this.setNextState(nextState);
          } else {
            // If it's not a string, nextState must be a StateChange constant
            switch (nextState) {
              case qx.util.fsm.FiniteStateMachine.StateChange.CURRENT_STATE:
                // They want to remain in the same state.
                nextState = thisState;
                this.setNextState(nextState);
                break;

              case qx.util.fsm.FiniteStateMachine.StateChange.POP_STATE_STACK:
                // Switch to the state at the top of the state stack.
                if (this.__savedStates__P_586_2.length == 0) {
                  throw new Error("Attempt to transition to POP_STATE_STACK while state stack is empty.");
                } // Pop the state stack to retrieve the state to transition to


                nextState = this.__savedStates__P_586_2.pop();
                this.setNextState(nextState);
                break;

              case qx.util.fsm.FiniteStateMachine.StateChange.TERMINATE:
                // Terminate fsm
                this.__bTerminated__P_586_11 = true;
                this.setNextState(null);
                break;

              default:
                throw new Error("Internal error: invalid nextState");
            }
          } // Run the actionsBeforeOntransition actions for this transition


          if (debugFunctions) {
            this.debug(this.getName() + "#" + thisState + "#" + t + "#autoActionsBeforeOntransition");
          }

          trans.getAutoActionsBeforeOntransition()(this); // Run the 'ontransition' function

          if (debugFunctions) {
            this.debug(this.getName() + "#" + thisState + "#" + t + "#ontransition");
          }

          trans.getOntransition()(this, event); // Run the autoActionsAfterOntransition actions for this transition

          if (debugFunctions) {
            this.debug(this.getName() + "#" + thisState + "#" + t + "#autoActionsAfterOntransition");
          }

          trans.getAutoActionsAfterOntransition()(this); // Run the autoActionsBeforeOnexit actions for the old state

          if (debugFunctions) {
            this.debug(this.getName() + "#" + thisState + "#autoActionsBeforeOnexit");
          }

          currentState.getAutoActionsBeforeOnexit()(this); // Run the exit function for the old state

          if (debugFunctions) {
            this.debug(this.getName() + "#" + thisState + "#exit");
          }

          currentState.getOnexit()(this, event); // Run the autoActionsAfterOnexit actions for the old state

          if (debugFunctions) {
            this.debug(this.getName() + "#" + thisState + "#autoActionsAfterOnexit");
          }

          currentState.getAutoActionsAfterOnexit()(this); // If this state has been replaced and we're supposed to dispose it...

          if (currentState._bNeedDispose) {
            // ... then dispose it now that it's no longer in use
            currentState.dispose();
          } // It the fsm has terminated, stop right here


          if (this.__bTerminated__P_586_11) {
            if (debugFunctions) {
              this.debug(this.getName() + "#" + "TERMINATED");
            }

            this.fireDataEvent("terminated", thisState);
            return true;
          } // Reset currentState to the new state object


          currentState = this.__states__P_586_0[this.getNextState()]; // set previousState and state, and clear nextState, for transition

          this.setPreviousState(thisState);
          this.setState(this.getNextState());
          this.setNextState(null);
          prevState = thisState;
          thisState = nextState;
          nextState = undefined; // Run the autoActionsBeforeOnentry actions for the new state

          if (debugFunctions) {
            this.debug(this.getName() + "#" + thisState + "#autoActionsBeforeOnentry");
          }

          currentState.getAutoActionsBeforeOnentry()(this); // Run the entry function for the new state, if one is specified

          if (debugFunctions) {
            this.debug(this.getName() + "#" + thisState + "#entry");
          }

          currentState.getOnentry()(this, event); // Run the autoActionsAfterOnentry actions for the new state

          if (debugFunctions) {
            this.debug(this.getName() + "#" + thisState + "#autoActionsAfterOnentry");
          }

          currentState.getAutoActionsAfterOnentry()(this); // Add any blocked events back onto the pending event queue

          for (var i = 0; i < this.__blockedEvents__P_586_4.length; i++) {
            e = this.__blockedEvents__P_586_4.pop();

            this.__eventQueue__P_586_3.unshift(e);
          }

          if (debugTransitions) {
            this.debug(this.getName() + "#" + prevState + " => " + this.getName() + "#" + thisState);
          } // See ya!


          return true;
        }

        if (debugTransitions) {
          this.debug(this.getName() + "#" + thisState + ": event '" + event.getType() + "'" + ": no transition found.  No state change.");
        }

        return true;
      }
    },
    destruct: function destruct() {
      this._disposeArray("__eventQueue__P_586_3");

      this._disposeArray("__blockedEvents__P_586_4");

      this.__savedStates__P_586_2 = this.__states__P_586_0 = null;
    }
  });
  qx.util.fsm.FiniteStateMachine.$$dbClassInfo = $$dbClassInfo;
})();

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
      "qx.lang.Function": {},
      "qx.util.fsm.FiniteStateMachine": {},
      "qx.util.fsm.Transition": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2006, 2007, 2011 Derrell Lipman
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Derrell Lipman (derrell)
  
  ************************************************************************ */

  /**
   * Create a new state which may be added to a finite state machine.
   */
  qx.Class.define("qx.util.fsm.State", {
    extend: qx.core.Object,

    /**
     * @param stateName {String}
     *   The name of this state.  This is the name which may be referenced in
     *   objects of class qx.util.fsm.Transition, when passing of
     *   the transition's predicate means transition to this state.
     *
     * @param stateInfo {Map}
     *   <pre>
     *   An object containing any of the following properties:
     *
     *     context -
     *       A context in which all of the following functions should be run.
     *
     *     onentry -
     *       A function which is called upon entry to the state.  Its signature
     *       is function(fsm, event) and it is saved in the onentry property of
     *       the state object.  (This function is called after the Transition's
     *       action function and after the previous state's onexit function.)
     *
     *       In the onentry function:
     *
     *         fsm -
     *           The finite state machine object to which this state is attached.
     *
     *         event -
     *           The event that caused the finite state machine to run
     *
     *     onexit -
     *       A function which is called upon exit from the state.  Its signature
     *       is function(fsm, event) and it is saved in the onexit property of
     *       the state object.  (This function is called after the Transition's
     *       action function and before the next state's onentry function.)
     *
     *       In the onexit function:
     *
     *         fsm -
     *           The finite state machine object to which this state is attached.
     *
     *         event -
     *           The event that caused the finite state machine to run
     *
     *     autoActionsBeforeOnentry -
     *     autoActionsAfterOnentry -
     *     autoActionsBeforeOnexit -
     *     autoActionsAfterOnexit -
     *       Automatic actions which take place at the time specified by the
     *       property name.  In all cases, the action takes place immediately
     *       before or after the specified function.
     *
     *       The property value for each of these properties is an object which
     *       describes some number of functions to invoke on a set of specified
     *       objects (typically widgets).
     *
     *       An example, using autoActionsBeforeOnentry, might look like this:
     *
     *       "autoActionsBeforeOnentry" :
     *       {
     *         // The name of a function.
     *         "setEnabled" :
     *         [
     *           {
     *             // The parameter value, thus "setEnabled(true);"
     *             "parameters" : [ true ],
     *
     *             // The function would be called on each object:
     *             //  this.getObject("obj1").setEnabled(true);
     *             //  this.getObject("obj2").setEnabled(true);
     *             "objects" : [ "obj1", "obj2" ],
     *
     *             // And similarly for each object in each specified group.
     *             "groups"  : [ "group1", "group2" ]
     *           }
     *         ],
     *
     *         // The name of another function.
     *         "setVisible" :
     *         [
     *           {
     *             // The parameter value, thus "setVisible(false);"
     *             "parameters" : [ false ],
     *
     *             // The function would be called on each object and group, as
     *             // described above.
     *             "objects" : [ "obj3", "obj4" ],
     *             "groups"  : [ "group3", "group4" ]
     *           }
     *         ]
     *       };
     *
     *     events (required) -
     *       A description to the finite state machine of how to handle a
     *       particular event, optionally associated with a specific target
     *       object on which the event was dispatched.  This should be an object
     *       containing one property for each event which is either handled or
     *       blocked.  The property name should be the event name.  The property
     *       value should be one of:
     *
     *         (a) qx.util.fsm.FiniteStateMachine.EventHandling.PREDICATE
     *
     *         (b) qx.util.fsm.FiniteStateMachine.EventHandling.BLOCKED
     *
     *         (c) a string containing the name of an explicit Transition to use
     *
     *         (d) an object where each property name is the Friendly Name of an
     *             object (meaning that this rule applies if both the event and
     *             the event's target object's Friendly Name match), and its
     *             property value is one of (a), (b) or (c), above.
     *
     *       This object is saved in the events property of the state object.
     *
     *     Additional properties may be provided in stateInfo.  They will not be
     *     used by the finite state machine, but will be available via
     *     this.getUserData("<propertyName>") during the state's onentry and
     *     onexit functions.
     *   </pre>
     *
     * @throws {Error} If the state info is not a valid object.
     * @throws {Error} If the events object is not provided in new state info.
     *
     */
    construct: function construct(stateName, stateInfo) {
      var context; // Call our superclass' constructor

      qx.core.Object.constructor.call(this); // Save the state name

      this.setName(stateName); // Ensure they passed in an object

      if (typeof stateInfo != "object") {
        throw new Error("State info must be an object");
      } // If a context was specified, retrieve it.


      context = stateInfo.context || window; // Save it for future use

      this.setUserData("context", context); // Save data from the stateInfo object

      for (var field in stateInfo) {
        // If we find one of our properties, call its setter.
        switch (field) {
          case "onentry":
            this.setOnentry(this.__bindIfFunction__P_587_0(stateInfo[field], context));
            break;

          case "onexit":
            this.setOnexit(this.__bindIfFunction__P_587_0(stateInfo[field], context));
            break;

          case "autoActionsBeforeOnentry":
            this.setAutoActionsBeforeOnentry(stateInfo[field]);
            break;

          case "autoActionsAfterOnentry":
            this.setAutoActionsAfterOnentry(stateInfo[field]);
            break;

          case "autoActionsBeforeOnexit":
            this.setAutoActionsBeforeOnexit(stateInfo[field]);
            break;

          case "autoActionsAfterOnexit":
            this.setAutoActionsAfterOnexit(stateInfo[field]);
            break;

          case "events":
            this.setEvents(stateInfo[field]);
            break;

          case "context":
            // already handled
            break;

          default:
            // Anything else is user-provided data for their own use.  Save it.
            this.setUserData(field, stateInfo[field]); // Log it in case it was a typo and they intended a built-in field

            this.debug("State " + stateName + ": " + "Adding user-provided field to state: " + field);
            break;
        }
      } // Check for required but missing properties


      if (!this.getEvents()) {
        throw new Error("The events object must be provided in new state info");
      } // Initialize the transition list


      this.transitions = {};
    },
    statics: {
      /**
       * Common function for checking the value provided for
       * auto actions.
       *
       * Auto-action property values passed to us look akin to:
       *
       *     <pre class='javascript'>
       *     {
       *       // The name of a function.
       *       "setEnabled" :
       *       [
       *         {
       *           // The parameter value(s), thus "setEnabled(true);"
       *           "parameters"   : [ true ],
       *
       *           // The function would be called on each object:
       *           //  this.getObject("obj1").setEnabled(true);
       *           //  this.getObject("obj2").setEnabled(true);
       *           "objects" : [ "obj1", "obj2" ]
       *
       *           // And similarly for each object in each specified group.
       *           "groups"  : [ "group1", "group2" ],
       *         }
       *       ];
       *
       *       "setTextColor" :
       *       [
       *         {
       *           "parameters" : [ "blue" ]
       *           "groups"     : [ "group3", "group4" ],
       *           "objects"    : [ "obj3", "obj4" ]
       *         }
       *       ];
       *     };
       *     </pre>
       *
       *
       * @param actionType {String}
       *   The name of the action being validated (for debug messages)
       *
       * @param value {Object}
       *   The property value which is being validated
       *
       * @param context {Object}
       *   The object to which the created function should be bound.
       *
       * @return {Function}
       *   Function that implements calls to each of the requested automatic
       *   actions
       *
       * @throws {Error} If the value has an invalid type.
       * @throws {Error} If the function type is not an array.
       * @throws {Error} If the function request parameter type is not valid.
       * @throws {Error} If the function parameters are not valid.
       * @throws {Error} If 'objects' list is invalid.
       * @throws {Error} If a name in the 'objects' list is not valid.
       * @throws {Error} If the 'groups' list is not valid.
       */
      _commonTransformAutoActions: function _commonTransformAutoActions(actionType, value, context) {
        // Validate that we received an object property value
        if (typeof value != "object") {
          throw new Error("Invalid " + actionType + " value: " + typeof value);
        } // We'll create a function to do the requested actions.  Initialize the
        // string into which we'll generate the common fragment added to the
        // function for each object.


        var funcFragment; // Here, we'll keep the function body.  Initialize a try block.

        var func = "try{";
        var param;
        var objectAndGroupList; // Retrieve the function request, e.g.
        // "enabled" :

        for (var f in value) {
          // Get the function request value object, e.g.
          // "setEnabled" :
          // [
          //   {
          //     "parameters"   : [ true ],
          //     "objects" : [ "obj1", "obj2" ]
          //     "groups"  : [ "group1", "group2" ],
          //   }
          // ];
          var functionRequest = value[f]; // The function request value should be an object

          if (!functionRequest instanceof Array) {
            throw new Error("Invalid function request type: expected array, found " + typeof functionRequest);
          } // For each function request...


          for (var i = 0; i < functionRequest.length; i++) {
            // Retrieve the object and group list object
            objectAndGroupList = functionRequest[i]; // The object and group list should be an object, e.g.
            // {
            //   "parameters"   : [ true ],
            //   "objects" : [ "obj1", "obj2" ]
            //   "groups"  : [ "group1", "group2" ],
            // }

            if (typeof objectAndGroupList != "object") {
              throw new Error("Invalid function request parameter type: expected object, found " + typeof functionRequest[param]);
            } // Retrieve the parameter list


            var params = objectAndGroupList["parameters"]; // If it didn't exist, ...

            if (!params) {
              // ... use an empty array.
              params = [];
            } else {
              // otherwise, ensure we got an array
              if (!params instanceof Array) {
                throw new Error("Invalid function parameters: expected array, found " + typeof params);
              }
            } // Create the function to call on each object.  The object on which
            // the function is called will be prepended later.


            funcFragment = f + "("; // For each parameter...

            for (var j = 0; j < params.length; j++) {
              // If this isn't the first parameter, add a separator
              if (j != 0) {
                funcFragment += ",";
              }

              if (typeof params[j] == "function") {
                // If the parameter is a function, arrange for it to be called
                // at run time.
                funcFragment += "(" + params[j] + ")(fsm)";
              } else if (typeof params[j] == "string") {
                // If the parameter is a string, quote it.
                funcFragment += '"' + params[j] + '"';
              } else {
                // Otherwise, just add the parameter's literal value
                funcFragment += params[j];
              }
            } // Complete the function call


            funcFragment += ")"; // Get the "objects" list, e.g.
            //   "objects" : [ "obj1", "obj2" ]

            var a = objectAndGroupList["objects"]; // Was there an "objects" list?

            if (!a) {
              // Nope.  Simplify code by creating an empty array.
              a = [];
            } else if (!a instanceof Array) {
              throw new Error("Invalid 'objects' list: expected array, got " + typeof a);
            }

            for (var j = 0; j < a.length; j++) {
              // Ensure we got a string
              if (typeof a[j] != "string") {
                throw new Error("Invalid friendly name in 'objects' list: " + a[j]);
              }

              func += " fsm.getObject('" + a[j] + "')." + funcFragment + ";";
            } // Get the "groups" list, e.g.
            //   "groups" : [ "group1, "group2" ]


            var g = objectAndGroupList["groups"]; // Was a "groups" list found?

            if (g) {
              // Yup.  Ensure it's an array.
              if (!g instanceof Array) {
                throw new Error("Invalid 'groups' list: expected array, got " + typeof g);
              }

              for (j = 0; j < g.length; j++) {
                // Arrange to call the function on each object in each group
                func += "  var groupObjects =     fsm.getGroupObjects('" + g[j] + "');" + "  for (var i = 0; i < groupObjects.length; i++)" + "  {" + "    var objName = groupObjects[i];" + "    fsm.getObject(objName)." + funcFragment + ";" + "  }";
              }
            }
          }
        } // Terminate the try block for function invocations


        func += "}catch(ex){  fsm.debug(ex);}"; // We've now built the entire body of a function that implements calls
        // to each of the requested automatic actions.  Create and return the
        // function, which will become the property value.

        return qx.lang.Function.bind(new Function("fsm", func), context);
      }
    },
    properties: {
      /**
       * The name of this state.  This name may be used as a Transition's
       * nextState value, or an explicit next state in the 'events' handling
       * list in a State.
       */
      name: {
        transform: "__transformName__P_587_1",
        nullable: true
      },

      /**
       * The onentry function for this state.  This is documented in the
       * constructor, and is typically provided through the constructor's
       * stateInfo object, but it is also possible (but highly NOT recommended)
       * to change this dynamically.
       */
      onentry: {
        transform: "__transformOnentry__P_587_2",
        nullable: true,
        init: function init(fsm, event) {}
      },

      /**
       * The onexit function for this state.  This is documented in the
       * constructor, and is typically provided through the constructor's
       * stateInfo object, but it is also possible (but highly NOT recommended)
       * to change this dynamically.
       */
      onexit: {
        transform: "__transformOnexit__P_587_3",
        nullable: true,
        init: function init(fsm, event) {}
      },

      /**
       * Automatic actions to take prior to calling the state's onentry function.
       *
       * The value passed to setAutoActionsBeforeOnentry() should like something
       * akin to:
       *
       *     <pre class='javascript'>
       *     "autoActionsBeforeOnentry" :
       *     {
       *       // The name of a function.  This would become "setEnabled("
       *       "enabled" :
       *       [
       *         {
       *           // The parameter value, thus "setEnabled(true);"
       *           "parameters" : [ true ],
       *
       *           // The function would be called on each object:
       *           //  this.getObject("obj1").setEnabled(true);
       *           //  this.getObject("obj2").setEnabled(true);
       *           "objects" : [ "obj1", "obj2" ]
       *
       *           // And similarly for each object in each specified group.
       *           "groups"  : [ "group1", "group2" ],
       *         }
       *       ];
       *     };
       *     </pre>
       */
      autoActionsBeforeOnentry: {
        transform: "__transformAutoActionsBeforeOnentry__P_587_4",
        nullable: true,
        init: function init(fsm, event) {}
      },

      /**
       * Automatic actions to take after return from the state's onentry
       * function.
       *
       * The value passed to setAutoActionsAfterOnentry() should like something
       * akin to:
       *
       *     <pre class='javascript'>
       *     "autoActionsAfterOnentry" :
       *     {
       *       // The name of a function.  This would become "setEnabled("
       *       "enabled" :
       *       [
       *         {
       *           // The parameter value, thus "setEnabled(true);"
       *           "parameters" : [ true ],
       *
       *           // The function would be called on each object:
       *           //  this.getObject("obj1").setEnabled(true);
       *           //  this.getObject("obj2").setEnabled(true);
       *           "objects" : [ "obj1", "obj2" ]
       *
       *           // And similarly for each object in each specified group.
       *           "groups"  : [ "group1", "group2" ],
       *         }
       *       ];
       *     };
       *     </pre>
       */
      autoActionsAfterOnentry: {
        transform: "__transformAutoActionsAfterOnentry__P_587_5",
        nullable: true,
        init: function init(fsm, event) {}
      },

      /**
       * Automatic actions to take prior to calling the state's onexit function.
       *
       * The value passed to setAutoActionsBeforeOnexit() should like something
       * akin to:
       *
       *     <pre class='javascript'>
       *     "autoActionsBeforeOnexit" :
       *     {
       *       // The name of a function.  This would become "setEnabled("
       *       "enabled" :
       *       [
       *         {
       *           // The parameter value, thus "setEnabled(true);"
       *           "parameters" : [ true ],
       *
       *           // The function would be called on each object:
       *           //  this.getObject("obj1").setEnabled(true);
       *           //  this.getObject("obj2").setEnabled(true);
       *           "objects" : [ "obj1", "obj2" ]
       *
       *           // And similarly for each object in each specified group.
       *           "groups"  : [ "group1", "group2" ],
       *         }
       *       ];
       *     };
       *     </pre>
       */
      autoActionsBeforeOnexit: {
        transform: "__transformAutoActionsBeforeOnexit__P_587_6",
        nullable: true,
        init: function init(fsm, event) {}
      },

      /**
       * Automatic actions to take after returning from the state's onexit
       * function.
       *
       * The value passed to setAutoActionsAfterOnexit() should like something
       * akin to:
       *
       *     <pre class='javascript'>
       *     "autoActionsBeforeOnexit" :
       *     {
       *       // The name of a function.  This would become "setEnabled("
       *       "enabled" :
       *       [
       *         {
       *           // The parameter value, thus "setEnabled(true);"
       *           "parameters" : [ true ],
       *
       *           // The function would be called on each object:
       *           //  this.getObject("obj1").setEnabled(true);
       *           //  this.getObject("obj2").setEnabled(true);
       *           "objects" : [ "obj1", "obj2" ]
       *
       *           // And similarly for each object in each specified group.
       *           "groups"  : [ "group1", "group2" ],
       *         }
       *       ];
       *     };
       *     </pre>
       */
      autoActionsAfterOnexit: {
        transform: "__transformAutoActionsAfterOnexit__P_587_7",
        nullable: true,
        init: function init(fsm, event) {}
      },

      /**
       * The object representing handled and blocked events for this state.
       * This is documented in the constructor, and is typically provided
       * through the constructor's stateInfo object, but it is also possible
       * (but highly NOT recommended) to change this dynamically.
       */
      events: {
        transform: "__transformEvents__P_587_8",
        nullable: true
      }
    },
    members: {
      /**
       * Internal transform method
       *
       * @param value {var} Value passed to setter
       * @return {var} the final value
       * @throws {Error} when an invalid value is detected
       */
      __transformName__P_587_1: function __transformName__P_587_1(value) {
        // Ensure that we got a valid state name
        if (typeof value != "string" || value.length < 1) {
          throw new Error("Invalid state name");
        }

        return value;
      },

      /**
       * Internal transform method
       *
       * @param value {var} Current value
       * @return {var} the final value
       * @throws {Error} when an invalid value is detected
       */
      __transformOnentry__P_587_2: function __transformOnentry__P_587_2(value) {
        // Validate the onentry function
        switch (typeof value) {
          case "undefined":
            // None provided.  Convert it to a null function
            return function (fsm, event) {};

          case "function":
            // We're cool.  No changes required
            return qx.lang.Function.bind(value, this.getUserData("context"));

          default:
            throw new Error("Invalid onentry type: " + typeof value);
        }
      },

      /**
       * Internal transform method
       *
       * @param value {var} Current value
       * @return {var} the final value
       * @throws {Error} when an invalid value is detected
       */
      __transformOnexit__P_587_3: function __transformOnexit__P_587_3(value) {
        // Validate the onexit function
        switch (typeof value) {
          case "undefined":
            // None provided.  Convert it to a null function
            return function (fsm, event) {};

          case "function":
            // We're cool.  No changes required
            return qx.lang.Function.bind(value, this.getUserData("context"));

          default:
            throw new Error("Invalid onexit type: " + typeof value);
        }
      },

      /**
       * Internal transform method
       *
       * @param value {var} Current value
       * @return {var} the final value
       * @throws {Error} when an invalid value is detected
       */
      __transformEvents__P_587_8: function __transformEvents__P_587_8(value) {
        // Validate that events is an object
        if (typeof value != "object") {
          throw new Error("events must be an object");
        } // Confirm that each property is a valid value
        // The property value should be one of:
        //
        // (a) qx.util.fsm.FiniteStateMachine.EventHandling.PREDICATE
        //
        // (b) qx.util.fsm.FiniteStateMachine.EventHandling.BLOCKED
        //
        // (c) a string containing the name of an explicit Transition to use
        //
        // (d) an object where each property name is the Friendly Name of an
        //     object (meaning that this rule applies if both the event and
        //     the event's target object's Friendly Name match), and its
        //     property value is one of (a), (b) or (c), above.


        for (var e in value) {
          var action = value[e];

          if (typeof action == "number" && action != qx.util.fsm.FiniteStateMachine.EventHandling.PREDICATE && action != qx.util.fsm.FiniteStateMachine.EventHandling.BLOCKED) {
            throw new Error("Invalid numeric value in events object: " + e + ": " + action);
          } else if (typeof action == "object") {
            for (var action_e in action) {
              if (typeof action[action_e] == "number" && action[action_e] != qx.util.fsm.FiniteStateMachine.EventHandling.PREDICATE && action[action_e] != qx.util.fsm.FiniteStateMachine.EventHandling.BLOCKED) {
                throw new Error("Invalid numeric value in events object (" + e + "): " + action_e + ": " + action[action_e]);
              } else if (typeof action[action_e] != "string" && typeof action[action_e] != "number") {
                throw new Error("Invalid value in events object (" + e + "): " + action_e + ": " + action[action_e]);
              }
            }
          } else if (typeof action != "string" && typeof action != "number") {
            throw new Error("Invalid value in events object: " + e + ": " + value[e]);
          }
        } // We're cool.  No changes required.


        return value;
      },

      /**
       * Internal transform method
       *
       * @param value {var} Current value
       * @return {var} the final value
       */
      __transformAutoActionsBeforeOnentry__P_587_4: function __transformAutoActionsBeforeOnentry__P_587_4(value) {
        return qx.util.fsm.State._commonTransformAutoActions("autoActionsBeforeOnentry", value, this.getUserData("context"));
      },

      /**
       * Internal transform method
       *
       * @param value {var} Current value
       * @return {var} the final value
       */
      __transformAutoActionsAfterOnentry__P_587_5: function __transformAutoActionsAfterOnentry__P_587_5(value) {
        return qx.util.fsm.State._commonTransformAutoActions("autoActionsAfterOnentry", value, this.getUserData("context"));
      },

      /**
       * Internal transform method
       *
       * @param value {var} Current value
       * @return {var} the final value
       */
      __transformAutoActionsBeforeOnexit__P_587_6: function __transformAutoActionsBeforeOnexit__P_587_6(value) {
        return qx.util.fsm.State._commonTransformAutoActions("autoActionsBeforeOnexit", value, this.getUserData("context"));
      },

      /**
       * Internal transform method
       *
       * @param value {var} Current value
       * @return {var} the final value
       */
      __transformAutoActionsAfterOnexit__P_587_7: function __transformAutoActionsAfterOnexit__P_587_7(value) {
        return qx.util.fsm.State._commonTransformAutoActions("autoActionsAfterOnexit", value, this.getUserData("context"));
      },

      /**
       * If given a function, bind it to a specified context.
       *
       * @param f {Function|var}
       *   The (possibly) function to be bound to the specified context.
       *
       * @param context {Object}
       *   The context to bind the function to.
       *
       * @return {Function}
       *   If f was a function, the return value is f wrapped such that it will
       *   be called in the specified context. Otherwise, f is returned
       *   unaltered.
       */
      __bindIfFunction__P_587_0: function __bindIfFunction__P_587_0(f, context) {
        // Is the first parameter a function?
        if (typeof f == "function") {
          // Yup. Bind it to the specified context.
          f = qx.lang.Function.bind(f, context);
        }

        return f;
      },

      /**
       * Add a transition to a state
       *
       *
       * @param trans {qx.util.fsm.Transition}
       *   An object of class qx.util.fsm.Transition representing a transition
       *   which is to be a part of this state.
       *
       */
      addTransition: function addTransition(trans) {
        // Ensure that we got valid transition info
        if (!trans instanceof qx.util.fsm.Transition) {
          throw new Error("Invalid transition: not an instance of qx.util.fsm.Transition");
        } // Add the new transition object to the state


        this.transitions[trans.getName()] = trans;
      }
    }
  });
  qx.util.fsm.State.$$dbClassInfo = $$dbClassInfo;
})();

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
      "qx.util.fsm.FiniteStateMachine": {
        "require": true
      },
      "qx.lang.Function": {},
      "qx.util.fsm.State": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2006, 2007, 2011 Derrell Lipman
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Derrell Lipman (derrell)
  
  ************************************************************************ */

  /**
   * Create a new possible transition from one state to another.
   */
  qx.Class.define("qx.util.fsm.Transition", {
    extend: qx.core.Object,

    /**
     * @param transitionName {String}
     *   The name of this transition, used in debug messages.
     *
     * @param transitionInfo {Object}
     *   <pre>
     *   An object optionally containing any of the following properties:
     *
     *     context -
     *       A context in which all of the following functions should be run.
     *
     *     predicate -
     *       A function which is called to determine whether this transition is
     *       acceptable.  An acceptable transition will cause the transition's
     *       "ontransition" function to be run, the current state's "onexit"
     *       function to be run, and the new state's "onentry" function to be
     *       run.
     *
     *       The predicate function's signature is function(fsm, event) and it
     *       is saved in the predicate property of the transition object.  In
     *       the predicate function:
     *
     *         fsm -
     *           The finite state machine object to which this state is
     *           attached.
     *
     *         event -
     *           The event that caused a run of the finite state machine
     *
     *       The predicate function should return one of the following three
     *       values:
     *
     *         - true means the transition is acceptable
     *
     *         - false means the transition is not acceptable, and the next
     *           transition (if one exists) should be tried to determine if it
     *           is acceptable
     *
     *         - null means that the transition determined that no further
     *           transitions should be tried.  This might be used when the
     *           transition ascertained that the event is for a target that is
     *           not available in the current state, and the event has called
     *           fsm.queueEvent() to have the event delivered upon state
     *           transition.
     *
     *       It is possible to create a default predicate -- one that will cause
     *       a transition to be acceptable always -- by either not providing a
     *       predicate property, or by explicitly either setting the predicate
     *       property to 'true' or setting it to a function that unconditionally
     *       returns 'true'.  This default transition should, of course, always
     *       be the last transition added to a state, since no transition added
     *       after it will ever be tried.
     *
     *     nextState -
     *       The state to which we transition, if the predicate returns true
     *       (meaning the transition is acceptable).  The value of nextState may
     *       be:
     *
     *         - a string, the state name of the state to transition to
     *
     *         - One of the constants:
     *           - qx.util.fsm.FiniteStateMachine.StateChange.CURRENT_STATE:
     *               Remain in whatever is the current state
     *           - qx.util.fsm.FiniteStateMachine.StateChange.POP_STATE_STACK:
     *               Transition to the state at the top of the saved-state
     *               stack, and remove the top element from the saved-state
     *               stack.  Elements are added to the saved-state stack using
     *               fsm.pushState().  It is an error if no state exists on the
     *               saved-state stack.
     *           - qx.util.fsm.FiniteStateMachine.StateChange.TERMINATE:
     *               TBD
     *
     *     autoActionsBeforeOntransition -
     *     autoActionsAfterOntransition -
     *       Automatic actions which take place at the time specified by the
     *       property name.  In all cases, the action takes place immediately
     *       before or after the specified function.
     *
     *       The property value for each of these properties is an object which
     *       describes some number of functions to invoke on a set of specified
     *       objects (typically widgets).
     *
     *       See {@link qx.util.fsm.State} for an example of autoActions.
     *
     *     ontransition -
     *       A function which is called if the predicate function for this
     *       transition returns true.  Its signature is function(fsm, event) and
     *       it is saved in the ontransition property of the transition object.
     *       In the ontransition function:
     *
     *         fsm -
     *           The finite state machine object to which this state is
     *           attached.
     *
     *         event -
     *           The event that caused a run of the finite state machine
     *
     *     Additional properties may be provided in transInfo.  They will not be
     *     used by the finite state machine, but will be available via
     *     this.getUserData("<propertyName>") during the transition's predicate
     *     and ontransition functions.
     *   </pre>
     */
    construct: function construct(transitionName, transitionInfo) {
      var context; // Call our superclass' constructor

      qx.core.Object.constructor.call(this); // Save the state name

      this.setName(transitionName); // If a context was specified, retrieve it.

      context = transitionInfo.context || window; // Save it for future use

      this.setUserData("context", context); // Save data from the transitionInfo object

      for (var field in transitionInfo) {
        // If we find one of our properties, call its setter.
        switch (field) {
          case "predicate":
            this.setPredicate(this.__bindIfFunction__P_588_0(transitionInfo[field], context));
            break;

          case "nextState":
            this.setNextState(transitionInfo[field]);
            break;

          case "autoActionsBeforeOntransition":
            this.setAutoActionsBeforeOntransition(this.__bindIfFunction__P_588_0(transitionInfo[field], context));
            break;

          case "autoActionsAfterOntransition":
            this.setAutoActionsAfterOntransition(this.__bindIfFunction__P_588_0(transitionInfo[field], context));
            break;

          case "ontransition":
            this.setOntransition(this.__bindIfFunction__P_588_0(transitionInfo[field], context));
            break;

          case "context":
            // already handled
            break;

          default:
            // Anything else is user-provided data for their own use.  Save it.
            this.setUserData(field, transitionInfo[field]); // Log it in case it was a typo and they intended a built-in field

            this.debug("Transition " + transitionName + ": " + "Adding user-provided field to transition: " + field);
            break;
        }
      }
    },
    properties: {
      /**
       * The name of this transition
       */
      name: {
        check: "String",
        nullable: true
      },

      /**
       * The predicate function for this transition.  This is documented in the
       * constructor, and is typically provided through the constructor's
       * transitionInfo object, but it is also possible (but highly NOT
       * recommended) to change this dynamically.
       */
      predicate: {
        init: function init(fsm, event) {
          return true;
        },
        transform: "__transformPredicate__P_588_1"
      },

      /**
       * The state to transition to, if the predicate determines that this
       * transition is acceptable.  This is documented in the constructor, and
       * is typically provided through the constructor's transitionInfo object,
       * but it is also possible (but highly NOT recommended) to change this
       * dynamically.
       */
      nextState: {
        init: qx.util.fsm.FiniteStateMachine.StateChange.CURRENT_STATE,
        transform: "__transformNextState__P_588_2"
      },

      /**
       * Automatic actions to take prior to calling the transition's
       * ontransition function.  This is documented in the constructor, and is
       * typically provided through the constructor's transitionInfo object, but
       * it is also possible (but highly NOT recommended) to change this
       * dynamically.
       */
      autoActionsBeforeOntransition: {
        init: function init(fsm, event) {},
        transform: "__transformAutoActionsBeforeOntransition__P_588_3"
      },

      /**
       * Automatic actions to take immediately after calling the transition's
       * ontransition function.  This is documented in the constructor, and is
       * typically provided through the constructor's transitionInfo object, but
       * it is also possible (but highly NOT recommended) to change this
       * dynamically.
       */
      autoActionsAfterOntransition: {
        init: function init(fsm, event) {},
        transform: "__transformAutoActionsAfterOntransition__P_588_4"
      },

      /**
       * The function run when the transition is accepted.  This is documented
       * in the constructor, and is typically provided through the constructor's
       * transitionInfo object, but it is also possible (but highly NOT
       * recommended) to change this dynamically.
       */
      ontransition: {
        init: function init(fsm, event) {},
        transform: "__transformOntransition__P_588_5"
      }
    },
    members: {
      /**
       * Validate the predicate. Converts all incoming values to functions.
       *
       * @param value {var} incoming value
       * @return {Function} predicate function
       */
      __transformPredicate__P_588_1: function __transformPredicate__P_588_1(value) {
        // Validate the predicate.  Convert all valid types to function.
        switch (typeof value) {
          case "undefined":
            // No predicate means predicate passes
            return function (fsm, event) {
              return true;
            };

          case "boolean":
            // Convert boolean predicate to a function which returns that value
            return function (fsm, event) {
              return value;
            };

          case "function":
            // Use user-provided function.
            return qx.lang.Function.bind(value, this.getUserData("context"));

          default:
            throw new Error("Invalid transition predicate type: " + typeof value);
        }
      },

      /**
       * Internal transform method
       *
       * @param value {var} Current value
       * @return {Function} the final value
       */
      __transformNextState__P_588_2: function __transformNextState__P_588_2(value) {
        // Validate nextState.  It must be a string or a number.
        switch (typeof value) {
          case "string":
            return value;

          case "number":
            // Ensure that it's one of the possible state-change constants
            switch (value) {
              case qx.util.fsm.FiniteStateMachine.StateChange.CURRENT_STATE:
              case qx.util.fsm.FiniteStateMachine.StateChange.POP_STATE_STACK:
              case qx.util.fsm.FiniteStateMachine.StateChange.TERMINATE:
                return value;

              default:
                throw new Error("Invalid transition nextState value: " + value + ": " + "nextState must be an explicit state name, " + "or one of the Fsm.StateChange constants");
            }

            break;

          default:
            throw new Error("Invalid transition nextState type: " + typeof value);
        }
      },

      /**
       * Internal transform method
       *
       * @param value {var} Current value
       * @return {Function} the final value
       */
      __transformAutoActionsBeforeOntransition__P_588_3: function __transformAutoActionsBeforeOntransition__P_588_3(value) {
        return qx.util.fsm.State._commonTransformAutoActions("autoActionsBeforeOntransition", value, this.getUserData("context"));
      },

      /**
       * Internal transform method
       *
       * @param value {var} Current value
       * @return {Function} the final value
       */
      __transformAutoActionsAfterOntransition__P_588_4: function __transformAutoActionsAfterOntransition__P_588_4(value) {
        return qx.util.fsm.State._commonTransformAutoActions("autoActionsAfterOntransition", value, this.getUserData("context"));
      },

      /**
       * Internal transform method
       *
       * @param value {var} Current value
       * @return {Function} the final value
       */
      __transformOntransition__P_588_5: function __transformOntransition__P_588_5(value) {
        // Validate the ontransition function.  Convert undefined to function.
        switch (typeof value) {
          case "undefined":
            // No provided function just means do nothing.  Use a null
            // function.
            return function (fsm, event) {};

          case "function":
            // Use user-provided function.
            return qx.lang.Function.bind(value, this.getUserData("context"));

          default:
            throw new Error("Invalid ontransition type: " + typeof value);
        }
      },

      /**
       * If given a function, bind it to a specified context.
       *
       * @param f {Function|var}
       *   The (possibly) function to be bound to the specified context.
       *
       * @param context {Object}
       *   The context to bind the function to.
       *
       * @return {Function}
       *   If f was a function, the return value is f wrapped such that it will
       *   be called in the specified context. Otherwise, f is returned
       *   unaltered.
       */
      __bindIfFunction__P_588_0: function __bindIfFunction__P_588_0(f, context) {
        // Is the first parameter a function?
        if (typeof f == "function") {
          // Yup. Bind it to the specified context.
          f = qx.lang.Function.bind(f, context);
        }

        return f;
      }
    }
  });
  qx.util.fsm.Transition.$$dbClassInfo = $$dbClassInfo;
})();

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
      "qx.dom.Node": {},
      "qx.bom.client.Html": {},
      "qx.bom.client.Xml": {},
      "qx.bom.client.Engine": {
        "defer": "runtime"
      },
      "qx.bom.client.Browser": {
        "defer": "runtime"
      }
    },
    "environment": {
      "provided": [],
      "required": {
        "html.xpath": {
          "className": "qx.bom.client.Html"
        },
        "xml.selectsinglenode": {
          "className": "qx.bom.client.Xml"
        },
        "xml.selectnodes": {
          "className": "qx.bom.client.Xml"
        },
        "xml.getelementsbytagnamens": {
          "className": "qx.bom.client.Xml"
        },
        "xml.domproperties": {
          "className": "qx.bom.client.Xml"
        },
        "xml.attributens": {
          "className": "qx.bom.client.Xml"
        },
        "xml.createnode": {
          "className": "qx.bom.client.Xml"
        },
        "xml.getqualifieditem": {
          "className": "qx.bom.client.Xml"
        },
        "xml.createelementns": {
          "className": "qx.bom.client.Xml"
        },
        "engine.name": {
          "defer": true,
          "className": "qx.bom.client.Engine"
        },
        "engine.version": {
          "defer": true,
          "className": "qx.bom.client.Engine"
        },
        "browser.documentmode": {
          "defer": true,
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
       2004-2008 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Sebastian Werner (wpbasti)
       * Andreas Ecker (ecker)
       * Fabian Jakobs (fjakobs)
  
  ************************************************************************ */

  /**
   * Cross browser XML Element API
   *
   * API to select, query and serialize XML elements.
   *
   * Further information:
   *
   * * <a href="https://developer.mozilla.org/en-US/docs/Parsing_and_serializing_XML">MDN Parsing and Serializing XML</a>
   *
   * Please note that nodes selected using the <code>selectSingleNode()</code> and
   * <code>selectNodes()</code> methods remain in their document context so
   * <code>qx.xml.Element.selectNodes(foo, "//bar");</code>
   * will search the entire document for any nodes named "bar", not just the
   * <code>foo</code> node.
   */
  qx.Class.define("qx.xml.Element", {
    statics: {
      __xpe__P_590_0: null,

      /**
       * @type {Boolean} <code>true</code> if the native XMLSerializer should be used,
       * <code>false</code> otherwise.
       */
      XML_SERIALIZER: false,

      /**
       * The subtree rooted by the specified element or document is serialized to a string.
       *
       * @param element {Element | Document} The root of the subtree to be serialized. This could be any node, including a Document.
       * @return {String} Serialized subtree
       */
      serialize: function serialize(element) {
        if (qx.dom.Node.isDocument(element)) {
          element = element.documentElement;
        }

        if (this.XML_SERIALIZER) {
          return new XMLSerializer().serializeToString(element);
        } else {
          return element.xml || element.outerHTML;
        }
      },

      /**
       * Selects the first XmlNode that matches the XPath expression.
       *
       * @param element {Element | Document} root element for the search
       * @param query {String} XPath query
       * @param namespaces {Map} optional map of prefixes and their namespace URIs
       * @return {Element} first matching element
       */
      selectSingleNode: function selectSingleNode(element, query, namespaces) {
        if (qx.core.Environment.get("html.xpath")) {
          if (!this.__xpe__P_590_0) {
            this.__xpe__P_590_0 = new XPathEvaluator();
          }

          var xpe = this.__xpe__P_590_0;
          var resolver;

          if (namespaces) {
            resolver = function resolver(prefix) {
              return namespaces[prefix] || null;
            };
          } else {
            resolver = xpe.createNSResolver(element);
          }

          try {
            return xpe.evaluate(query, element, resolver, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
          } catch (err) {
            throw new Error("selectSingleNode: query: " + query + ", element: " + element + ", error: " + err);
          }
        }

        if (qx.core.Environment.get("xml.selectsinglenode")) {
          if (namespaces) {
            var namespaceString = "";

            for (var prefix in namespaces) {
              namespaceString += "xmlns:" + prefix + "='" + namespaces[prefix] + "' ";
            } // If the element is a node, set the selection namespace on its parent document.


            if (element.ownerDocument) {
              element.ownerDocument.setProperty("SelectionNamespaces", namespaceString);
            } // element is a document
            else {
                element.setProperty("SelectionNamespaces", namespaceString);
              }
          }

          return element.selectSingleNode(query);
        }

        throw new Error("No XPath implementation available!");
      },

      /**
       * Selects a list of nodes matching the XPath expression.
       *
       * @param element {Element | Document} root element for the search
       * @param query {String} XPath query
       * @param namespaces {Map} optional map of prefixes and their namespace URIs
       * @return {Element[]} List of matching elements
       */
      selectNodes: function selectNodes(element, query, namespaces) {
        if (qx.core.Environment.get("html.xpath")) {
          var xpe = this.__xpe__P_590_0;

          if (!xpe) {
            this.__xpe__P_590_0 = xpe = new XPathEvaluator();
          }

          var resolver;

          if (namespaces) {
            resolver = function resolver(prefix) {
              return namespaces[prefix] || null;
            };
          } else {
            resolver = xpe.createNSResolver(element);
          }

          try {
            var result = xpe.evaluate(query, element, resolver, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
          } catch (err) {
            throw new Error("selectNodes: query: " + query + ", element: " + element + ", error: " + err);
          }

          var nodes = [];

          for (var i = 0; i < result.snapshotLength; i++) {
            nodes[i] = result.snapshotItem(i);
          }

          return nodes;
        }

        if (qx.core.Environment.get("xml.selectnodes")) {
          if (namespaces) {
            var namespaceString = "";

            for (var prefix in namespaces) {
              namespaceString += "xmlns:" + prefix + "='" + namespaces[prefix] + "' ";
            } // If the element is a node, set the selection namespace on its parent document.


            if (element.ownerDocument) {
              element.ownerDocument.setProperty("SelectionNamespaces", namespaceString);
            } // element is a document
            else {
                element.setProperty("SelectionNamespaces", namespaceString);
              }
          }

          return element.selectNodes(query);
        }

        throw new Error("No XPath implementation available!");
      },

      /**
       * Returns a list of elements with the given tag name belonging to the given namespace
       *
       * (See
       * <a href="https://developer.mozilla.org/en-US/docs/DOM/element.getElementsByTagNameNS">MDN
       * Reference</a>).
       *
       * @param element {Element | Document} the element from where the search should start.
       *       Note that only the descendants of this element are included in the search, not the node itself.
       * @param namespaceURI {var} is the namespace URI of elements to look for . For example, if you need to look
       *       for XHTML elements, use the XHTML namespace URI, <tt>http://www.w3.org/1999/xhtml/</tt>.
       * @param tagname {String} the tagname to look for
       * @return {Element[]} a list of found elements in the order they appear in the tree.
       */
      getElementsByTagNameNS: function getElementsByTagNameNS(element, namespaceURI, tagname) {
        if (qx.core.Environment.get("xml.getelementsbytagnamens")) {
          return element.getElementsByTagNameNS(namespaceURI, tagname);
        }

        if (qx.core.Environment.get("xml.domproperties")) {
          var doc = element.ownerDocument || element;
          doc.setProperty("SelectionLanguage", "XPath");
          doc.setProperty("SelectionNamespaces", "xmlns:ns='" + namespaceURI + "'");
          return qx.xml.Element.selectNodes(element, 'descendant-or-self::ns:' + tagname);
        }

        throw new Error("The client does not support this operation!");
      },

      /**
       * Selects the first XmlNode that matches the XPath expression and returns the text content of the element
       *
       * @param element {Element|Document} root element for the search
       * @param query {String}  XPath query
       * @return {String} the joined text content of the found element or null if not appropriate.
       */
      getSingleNodeText: function getSingleNodeText(element, query) {
        var node = this.selectSingleNode(element, query);
        return qx.dom.Node.getText(node);
      },

      /**
       * Adds or sets an attribute with the given namespace on a node
       *
       * @param document {Document} The node's parent document, created e.g. by
       * {@link qx.xml.Document#create}
       * @param element {Element} XML/DOM element to modify
       * @param namespaceUri {String} Namespace URI
       * @param name {String} Attribute name
       * @param value {String} Attribute value
       */
      setAttributeNS: function setAttributeNS(document, element, namespaceUri, name, value) {
        if (qx.core.Environment.get("xml.attributens")) {
          element.setAttributeNS(namespaceUri, name, value);
        } else if (qx.core.Environment.get("xml.createnode")) {
          var attr = document.createNode(2, name, namespaceUri);
          attr.nodeValue = value;
          element.setAttributeNode(attr);
        } else {
          throw new Error("The client does not support this operation!");
        }
      },

      /**
       * Get the value of the attribute with the given namespace and name
       *
       * @param element {Element} XML/DOM element to modify
       * @param namespaceUri {String} Namespace URI
       * @param name {String} Attribute name
       * @return {String} the value of the attribute, empty string if not found
       */
      getAttributeNS: function getAttributeNS(element, namespaceUri, name) {
        if (qx.core.Environment.get("xml.attributens")) {
          var value = element.getAttributeNS(namespaceUri, name);
          return value === null ? '' : value;
        }

        if (qx.core.Environment.get("xml.getqualifieditem")) {
          var attributes = element.attributes;
          var value = null;

          if (attributes) {
            var attribute = attributes.getQualifiedItem(name, namespaceUri);

            if (attribute) {
              value = attribute.nodeValue;
            }
          }

          return value === null ? '' : value;
        }

        throw new Error("The client does not support this operation!");
      },

      /**
       * Creates an element with the given namespace and appends it to an existing
       * element
       *
       * @param document {Document} The node's parent document, created e.g. by
       * {@link qx.xml.Document#create}
       * @param parent {Element} The parent element for the new sub-element
       * @param name {String} The new element's name
       * @param namespaceUri {String} Namespace URI for the new element
       *
       * @return {Element} The newly created sub-element
       */
      createSubElementNS: function createSubElementNS(document, parent, name, namespaceUri) {
        if (qx.core.Environment.get("xml.createelementns")) {
          // the "x" prefix has no importance. when there's a conflict,
          // mozilla engine assigns an alternative prefix automatically.
          // not putting a prefix means to assign default namespace prefix
          // to the given namespace uri.
          var node = document.createElementNS(namespaceUri, "x:" + name);
          parent.appendChild(node);
          return node;
        }

        if (qx.core.Environment.get("xml.createnode")) {
          var node = document.createNode(1, name, namespaceUri);
          parent.appendChild(node);
          return node;
        }

        throw new Error("The client does not support this operation!");
      }
    },

    /*
    *****************************************************************************
       DEFER
    *****************************************************************************
    */
    defer: function defer(statics) {
      statics.XML_SERIALIZER = window.XMLSerializer && !(qx.core.Environment.get("engine.name") == "mshtml" && qx.core.Environment.get("engine.version") >= 9 && qx.core.Environment.get("browser.documentmode") >= 9);
    }
  });
  qx.xml.Element.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.util.StringEscape": {}
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
  
  ************************************************************************ */

  /**
   * Escaping and unescaping of XML strings.
   */
  qx.Class.define("qx.xml.String", {
    statics: {
      /** Mapping of XML entity names to the corresponding char code */
      TO_CHARCODE: {
        "quot": 34,
        // " - double-quote
        "amp": 38,
        // &
        "lt": 60,
        // <
        "gt": 62,
        // >
        "apos": 39 // XML apostrophe

      },

      /** Mapping of char codes to XML entity names */
      FROM_CHARCODE: {
        34: "quot",
        // " - double-quote
        38: "amp",
        // &
        60: "lt",
        // <
        62: "gt",
        // >
        39: "apos" // XML apostrophe

      },

      /**
       * Escapes the characters in a <code>String</code> using XML entities.
       *
       * For example: <tt>"bread" & "butter"</tt> =>
       * <tt>&amp;quot;bread&amp;quot; &amp;amp; &amp;quot;butter&amp;quot;</tt>.
       *
       * Supports only the four basic XML entities (gt, lt, quot, amp).
       * Does not support DTDs or external entities.
       * Note that unicode characters greater than 0x7f are currently escaped to their numerical \\u equivalent.
       *
       * @param str {String} the string to be escaped
       * @return {String} the escaped string
       */
      escape: function escape(str) {
        return qx.util.StringEscape.escape(str, this.FROM_CHARCODE);
      },

      /**
       * Unescapes a string containing XML entity escapes to a string
       * containing the actual Unicode characters corresponding to the
       * escapes.
       *
       * Supports only the four basic XML entities (gt, lt, quot, amp).
       * Does not support DTDs or external entities.
       *
       * @param str {String} the string to be unescaped
       * @return {String} the unescaped string
       */
      unescape: function unescape(str) {
        return qx.util.StringEscape.unescape(str, this.TO_CHARCODE);
      }
    }
  });
  qx.xml.String.$$dbClassInfo = $$dbClassInfo;
})();

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
      "qx.application.Standalone": {
        "construct": true,
        "require": true
      },
      "qx.util.ResourceManager": {
        "construct": true
      },
      "qx.bom.Stylesheet": {
        "construct": true
      },
      "qx.log.appender.Native": {},
      "qx.log.appender.Console": {},
      "qx.ui.core.Widget": {},
      "qxl.apiviewer.MWidgetRegistry": {},
      "qxl.apiviewer.Viewer": {},
      "qxl.apiviewer.Controller": {}
    },
    "environment": {
      "provided": [],
      "required": {
        "apiviewer": {}
      }
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
  
  ************************************************************************ */

  /* ************************************************************************
  
  
  ************************************************************************ */

  /**
   * Your apiviewer application
   *
   * @asset(qxl/apiviewer/*)
   */
  qx.Class.define("qxl.apiviewer.Application", {
    extend: qx.application.Standalone,
    construct: function construct() {
      qx.application.Standalone.constructor.call(this);
      var uri = qx.util.ResourceManager.getInstance().toUri("qxl/apiviewer/css/apiviewer.css");
      qx.bom.Stylesheet.includeFile(uri);
    },

    /*
    *****************************************************************************
     MEMBERS
    *****************************************************************************
    */
    members: {
      // overridden
      main: function main() {
        // Call super class
        qxl.apiviewer.Application.prototype.main.base.call(this); // Add log appenders

        {
          qx.log.appender.Native;
          qx.log.appender.Console;
        }
        qx.Class.include(qx.ui.core.Widget, qxl.apiviewer.MWidgetRegistry);
        this.viewer = new qxl.apiviewer.Viewer();
        this.controller = new qxl.apiviewer.Controller(); // set variables for later usage.

        this.getRoot().add(this.viewer, {
          edge: 0
        });
      },
      // overridden
      finalize: function finalize() {
        qxl.apiviewer.Application.prototype.finalize.base.call(this); // Finally load the data

        let apidata = qx.core.Environment.get("apiviewer");
        this.viewer._searchView.apiindex = apidata.apiindex;
        this.controller.load(apidata);
      }
    },

    /*
    *****************************************************************************
     DESTRUCTOR
    *****************************************************************************
    */
    destruct: function destruct() {
      this._disposeObjects("viewer", "controller");
    }
  });
  qxl.apiviewer.Application.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Mixin": {
        "usage": "dynamic",
        "require": true
      }
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
       * Fabian Jakobs (fjakobs)
  
  ************************************************************************ */
  qx.Mixin.define("qxl.apiviewer.MWidgetRegistry", {
    properties: {
      id: {
        check: "String",
        apply: "_applyId",
        nullable: true,
        init: null
      }
    },
    members: {
      _applyId: function _applyId(id, oldId) {
        var statics = qxl.apiviewer.MWidgetRegistry;

        if (oldId) {
          statics.unregister(this, oldId);
        }

        if (id) {
          statics.register(this, id);
        }
      },
      getWidgetById: function getWidgetById(id) {
        return qxl.apiviewer.MWidgetRegistry.getWidgetById(id);
      }
    },
    statics: {
      __objectDb__P_594_0: {},

      /**
       * Returns the widget registered under the given id by {@link #register}
       *
       * @param id {String} the id of the widget
       * @return {qx.ui.core.Widget} the widget.
       */
      getWidgetById: function getWidgetById(id) {
        return this.__objectDb__P_594_0[id];
      },

      /**
       * Registers a widget under the given widget id to be used with
       * {@link #getWidgetById}.
       *
       * @param widget {qx.ui.core.Widget} the widget to register
       * @param id {String} the id of the widget.
       */
      register: function register(object, id) {
        if (this.__objectDb__P_594_0[id]) {
          throw new Error("An object with the id '" + id + "' already exists.");
        }

        this.__objectDb__P_594_0[id] = object;
      },
      unregister: function unregister(object, id) {
        if (this.__objectDb__P_594_0[id] !== object) {
          throw new Error("The object is not registered with the id '" + id + "'.");
        }

        delete this.__objectDb__P_594_0[id];
      }
    }
  });
  qxl.apiviewer.MWidgetRegistry.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.container.Composite": {
        "construct": true,
        "require": true
      },
      "qx.ui.layout.VBox": {
        "construct": true
      },
      "qxl.apiviewer.ui.PackageTree": {
        "construct": true
      },
      "qxl.apiviewer.ui.SearchView": {
        "construct": true
      },
      "qxl.apiviewer.ui.LegendView": {
        "construct": true
      },
      "qx.util.Uri": {
        "construct": true
      },
      "qx.ui.container.Stack": {},
      "qx.lang.Function": {},
      "qx.ui.toolbar.ToolBar": {},
      "qx.ui.toolbar.Part": {},
      "qx.ui.toolbar.RadioButton": {},
      "qx.ui.form.RadioGroup": {},
      "qx.ui.toolbar.CheckBox": {},
      "qx.ui.toolbar.MenuButton": {},
      "qx.ui.menu.Menu": {},
      "qx.ui.menu.CheckBox": {},
      "qx.ui.menu.Button": {},
      "qx.ui.menu.Separator": {},
      "qx.ui.menu.RadioButton": {},
      "qx.ui.layout.Canvas": {},
      "qx.ui.embed.Html": {},
      "qxl.apiviewer.DetailFrameTabView": {},
      "qx.ui.splitpane.Pane": {},
      "qx.ui.layout.HBox": {},
      "qx.ui.basic.Label": {},
      "qxl.versionlabel.VersionLabel": {},
      "qx.ui.core.Spacer": {}
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
       * Til Schneider (til132)
       * Sebastian Werner (wpbasti)
       * Andreas Ecker (ecker)
       * Fabian Jakobs (fjakobs)
       * Jonathan Weiß (jonathan_rass)
  
  ************************************************************************ */

  /* ************************************************************************
  
  
  ************************************************************************ */

  /**
   * The GUI definition of the API viewer.
   *
   * The connections between the GUI components are established in
   * the {@link Controller}.
   *
   * @asset(qx/icon/Tango/22/apps/utilities-dictionary.png)
   * @asset(qx/icon/Tango/22/actions/edit-find.png)
   * @asset(qx/icon/Tango/22/apps/utilities-help.png)
   * @asset(qx/icon/Tango/22/apps/utilities-graphics-viewer.png)
   * @asset(qx/icon/Tango/22/actions/media-seek-forward.png)
   *
   * @ignore(location.*)
   */
  qx.Class.define("qxl.apiviewer.Viewer", {
    extend: qx.ui.container.Composite,

    /*
    *****************************************************************************
     CONSTRUCTOR
    *****************************************************************************
    */
    construct: function construct() {
      qx.ui.container.Composite.constructor.call(this);
      this.__menuItemStore__P_595_0 = {};
      var layout = new qx.ui.layout.VBox();
      this.setLayout(layout);
      this.add(this.__createHeader__P_595_1());
      this.add(this.__createToolbar__P_595_2());
      var tree = new qxl.apiviewer.ui.PackageTree();
      tree.setId("tree");
      this._searchView = new qxl.apiviewer.ui.SearchView();
      var legend = new qxl.apiviewer.ui.LegendView();

      var toggleView = this.__createToggleView__P_595_3(tree, this._searchView, legend);

      var mainFrame = this.__createDetailFrame__P_595_4();

      this.add(this.__createSplitPane__P_595_5(toggleView, mainFrame), {
        flex: 1
      }); // Search for the value of the "search" URL query key.

      var parsedUri = qx.util.Uri.parseUri(location.href);

      if (parsedUri.queryKey && parsedUri.queryKey.search) {
        this._searchView.search(parsedUri.queryKey.search);

        toggleView.setSelection([this._searchView]);

        this.__toggleGroup__P_595_6.setSelection([this.__toggleGroup__P_595_6.getChildren()[1]]);
      }
    },

    /*
    *****************************************************************************
     MEMBERS
    *****************************************************************************
    */
    members: {
      __firstPartHash__P_595_7: null,
      __overflowMenu__P_595_8: null,
      __menuItemStore__P_595_0: null,
      __toggleGroup__P_595_6: null,

      /**
       * Creates the button view widget on the left
       *
       * @param treeWidget {qx.ui.core.Widget} The widget for the "tree" pane
       * @param infoWidget {qx.ui.core.Widget} The widget for the "legend" pane
       * @return {qx.ui.tabview.TabView} The configured button view widget
       */
      __createToggleView__P_595_3: function __createToggleView__P_595_3(treeWidget, searchWidget, infoWidget) {
        var stack = new qx.ui.container.Stack();
        stack.setAppearance("toggleview");
        stack.add(treeWidget);
        stack.add(searchWidget);
        stack.add(infoWidget);

        this.__toggleGroup__P_595_6.addListener("changeSelection", function (e) {
          var selected = e.getData()[0];
          var show = selected != null ? selected.getUserData("value") : null;

          switch (show) {
            case "packages":
              stack.setSelection([treeWidget]);
              stack.show();
              break;

            case "search":
              stack.setSelection([searchWidget]);
              stack.show();
              /**
               * Delay focussing the text field in case it's html element
               * has no been added to the DOM yet.
               */

              qx.lang.Function.delay(this._onShowSearch, 100, this);
              break;

            case "legend":
              stack.setSelection([infoWidget]);
              stack.show();
              break;

            default:
              stack.exclude();
          }
        }, this);

        return stack;
      },

      /**
       * Creates the tool bar
       *
       * @return {qx.ui.toolbar.ToolBar} The configured tool bar
       */
      __createToolbar__P_595_2: function __createToolbar__P_595_2() {
        var toolbar = new qx.ui.toolbar.ToolBar();
        var part = new qx.ui.toolbar.Part();
        toolbar.add(part);
        this.__firstPartHash__P_595_7 = part.toHashCode();
        var showPackages = new qx.ui.toolbar.RadioButton(this.tr("Content"), "icon/22/apps/utilities-dictionary.png");
        showPackages.setUserData("value", "packages");
        showPackages.setValue(true);
        showPackages.setToolTipText(this.tr("Show/hide the packages."));
        part.add(showPackages);
        var showSearch = new qx.ui.toolbar.RadioButton(this.tr("Search"), "icon/22/actions/edit-find.png");
        showSearch.setUserData("value", "search");
        showSearch.setToolTipText(this.tr("Search for packages, classes and members."));
        part.add(showSearch);
        var showLegend = new qx.ui.toolbar.RadioButton(this.tr("Legend"), "icon/22/apps/utilities-help.png");
        showLegend.setUserData("value", "legend");
        showLegend.setToolTipText(this.tr("Show/hide the legend."));
        part.add(showLegend);
        var group = new qx.ui.form.RadioGroup(showPackages, showSearch, showLegend);
        group.setAllowEmptySelection(true);
        this.__toggleGroup__P_595_6 = group;
        toolbar.addSpacer();
        var part = new qx.ui.toolbar.Part();
        toolbar.add(part);
        var expandBtn = new qx.ui.toolbar.CheckBox(this.tr("Properties"), "qxl/apiviewer/image/property18.gif");
        expandBtn.setId("btn_expand");
        expandBtn.setValue(true);
        expandBtn.setToolTipText(this.tr("Show/hide all generated property methods."));
        part.add(expandBtn);
        var includesBtn = new qx.ui.toolbar.MenuButton(this.tr("Includes"), "qxl/apiviewer/image/overlay_mixin18.gif");
        includesBtn.setId("menubtn_includes");
        includesBtn.setToolTipText(this.tr("Show/hide members of other classes/mixins inherited/included in the current class"));
        part.add(includesBtn);
        var includesMenu = new qx.ui.menu.Menu();
        var inheritBtn = new qx.ui.menu.CheckBox(this.tr("Inherited"));
        inheritBtn.setId("btn_inherited");
        inheritBtn.setToolTipText(this.tr("Show/hide inherited members of the current class."));
        includesMenu.add(inheritBtn);
        var mixinIncludedBtn = new qx.ui.menu.CheckBox(this.tr("Mixin Included"));
        mixinIncludedBtn.setId("btn_included");
        mixinIncludedBtn.setToolTipText(this.tr("Show/hide included members of the current class."));
        mixinIncludedBtn.setValue(true);
        includesMenu.add(mixinIncludedBtn);
        includesBtn.setMenu(includesMenu);
        var protectedBtn = new qx.ui.toolbar.CheckBox(this.tr("Protected"), "qxl/apiviewer/image/method_protected18.gif");
        protectedBtn.setId("btn_protected");
        protectedBtn.setToolTipText(this.tr("Show/hide protected members of the current class."));
        part.add(protectedBtn);
        var privateBtn = new qx.ui.toolbar.CheckBox(this.tr("Private"), "qxl/apiviewer/image/method_private18.gif");
        privateBtn.setId("btn_private");
        privateBtn.setToolTipText(this.tr("Show/hide private members of the current class."));
        part.add(privateBtn);
        var internalBtn = new qx.ui.toolbar.CheckBox(this.tr("Internal"), "qxl/apiviewer/image/method_internal18.gif");
        internalBtn.setId("btn_internal");
        internalBtn.setToolTipText(this.tr("Show/hide internal members of the current class."));
        part.add(internalBtn); // overflow handling

        toolbar.setOverflowHandling(true); // add a button for overflow handling

        var chevron = new qx.ui.toolbar.MenuButton(null, "icon/22/actions/media-seek-forward.png");
        chevron.setAppearance("toolbar-button"); // hide the down arrow icon

        toolbar.add(chevron);
        toolbar.setOverflowIndicator(chevron); // add the overflow menu

        this.__overflowMenu__P_595_8 = new qx.ui.menu.Menu();
        chevron.setMenu(this.__overflowMenu__P_595_8); // add the listener

        toolbar.addListener("hideItem", function (e) {
          var item = e.getData();

          var menuItems = this._getMenuItems(item);

          for (var i = 0; i < menuItems.length; i++) {
            menuItems[i].setVisibility("visible");

            if (menuItems[i] instanceof qx.ui.menu.Button) {
              menuItems[i].getMenu().setPosition("right-top");
            }
          }
        }, this);
        toolbar.addListener("showItem", function (e) {
          var item = e.getData();

          var menuItems = this._getMenuItems(item);

          for (var i = 0; i < menuItems.length; i++) {
            menuItems[i].setVisibility("excluded");

            if (menuItems[i] instanceof qx.ui.menu.Button) {
              menuItems[i].getMenu().setPosition("bottom-left");
            }
          }
        }, this);
        return toolbar;
      },

      /**
       * Helper for the overflow handling. It is responsible for returning a
       * corresponding menu item for the given toolbar item.
       *
       * @param toolbarPart {qx.ui.toolbar.Part} The toolbar part to look for.
       * @return {qx.ui.core.Widget[]} The coresponding menu items.
       */
      _getMenuItems: function _getMenuItems(toolbarPart) {
        var partChildren = toolbarPart.getChildren();
        var menuItems = []; // only add a separator if the first part pops in

        if (toolbarPart.toHashCode() === this.__firstPartHash__P_595_7) {
          var cachedItem = this.__menuItemStore__P_595_0[toolbarPart.toHashCode()];

          if (!cachedItem) {
            cachedItem = new qx.ui.menu.Separator();

            this.__overflowMenu__P_595_8.addAt(cachedItem, 0);

            this.__menuItemStore__P_595_0[toolbarPart.toHashCode()] = cachedItem;
          }

          menuItems.push(cachedItem);
        } // take every item in the part


        for (var i = partChildren.length - 1; i >= 0; i--) {
          var toolbarItem = partChildren[i];
          cachedItem = this.__menuItemStore__P_595_0[toolbarItem.toHashCode()];

          if (!cachedItem) {
            if (toolbarItem instanceof qx.ui.toolbar.RadioButton) {
              var cachedItem = new qx.ui.menu.RadioButton(toolbarItem.getLabel()); // bidirectional binding takes care of everything

              toolbarItem.bind("value", cachedItem, "value");
              cachedItem.bind("value", toolbarItem, "value");
            } else if (toolbarItem instanceof qx.ui.toolbar.MenuButton) {
              cachedItem = new qx.ui.menu.Button(toolbarItem.getLabel().translate(), toolbarItem.getIcon(), toolbarItem.getCommand(), toolbarItem.getMenu());
              cachedItem.setToolTipText(toolbarItem.getToolTipText());
              cachedItem.setEnabled(toolbarItem.getEnabled());
              toolbarItem.bind("enabled", cachedItem, "enabled");
            } else {
              cachedItem = new qx.ui.menu.CheckBox(toolbarItem.getLabel()); // bidirectional binding takes care of everything

              toolbarItem.bind("value", cachedItem, "value");
              cachedItem.bind("value", toolbarItem, "value");
            }

            this.__overflowMenu__P_595_8.addAt(cachedItem, 0);

            this.__menuItemStore__P_595_0[toolbarItem.toHashCode()] = cachedItem;
          }

          menuItems.push(cachedItem);
        }

        return menuItems;
      },

      /**
       * Create the detail Frame and adds the Class-, Package and Loader-views to it.
       *
       * @return {qx.ui.layout.CanvasLayout} The detail Frame
       */
      __createDetailFrame__P_595_4: function __createDetailFrame__P_595_4() {
        var detailFrame = new qx.ui.container.Composite(new qx.ui.layout.Canvas());
        detailFrame.getContentElement().setAttribute("class", "content");
        this._detailLoader = new qx.ui.embed.Html("<div style=\"padding:10px;\"><h1><small>please wait</small>Loading data...</h1></div>");

        this._detailLoader.getContentElement().setAttribute("id", "SplashScreen");

        this._detailLoader.setAppearance("detailviewer");

        this._detailLoader.setId("detail_loader");

        detailFrame.add(this._detailLoader, {
          edge: 0
        });
        this._tabView = new qxl.apiviewer.DetailFrameTabView();

        this._tabView.setId("tabView");

        this._tabView.exclude();

        detailFrame.add(this._tabView, {
          edge: 0
        });
        return detailFrame;
      },

      /**
       * Creates the main frame at the right
       *
       * @param toolbar {qx.ui.toolbar.ToolBar} Toolbar of the main frame
       * @param detailFrame {qx.ui.core.Widget} the detail widget
       * @return {qx.ui.layout.VBox} the main frame
       */
      __createMainFrame__P_595_9: function __createMainFrame__P_595_9(toolbar, detailFrame) {
        var mainFrame = new qx.ui.container.Composite();
        mainFrame.setLayout(new qx.ui.layout.VBox());
        mainFrame.add(toolbar);
        mainFrame.add(detailFrame, {
          flex: 1
        });
        return mainFrame;
      },

      /**
       * Creates the vertical splitter and populates the split panes
       *
       * @param leftWidget {qx.ui.core.Widget} the widget on the left of the splitter
       * @param rightWidget {qx.ui.core.Widget} the widget on the right of the splitter
       * @return {qx.ui.splitpane.SplitPane} the split pane
       */
      __createSplitPane__P_595_5: function __createSplitPane__P_595_5(leftWidget, rightWidget) {
        var mainSplitPane = new qx.ui.splitpane.Pane("horizontal");
        mainSplitPane.setAppearance("app-splitpane");
        mainSplitPane.add(leftWidget, 0);
        mainSplitPane.add(rightWidget, 1);
        return mainSplitPane;
      },

      /**
       * Creates the application header.
       */
      __createHeader__P_595_1: function __createHeader__P_595_1() {
        var layout = new qx.ui.layout.HBox();
        var header = new qx.ui.container.Composite(layout);
        header.setAppearance("app-header");
        var title = new qx.ui.basic.Label("API Documentation");
        var version = new qxl.versionlabel.VersionLabel();
        version.setFont("default");
        header.add(title);
        header.add(new qx.ui.core.Spacer(), {
          flex: 1
        });
        header.add(version);
        return header;
      },

      /**
       * Focusses the search view's text field.
       */
      _onShowSearch: function _onShowSearch() {
        this._searchView.sinput.focus();
      }
    },

    /*
    *****************************************************************************
     SETTINGS
    *****************************************************************************
    */
    environment: {
      "qxl.apiviewer.title": "qooxdoo",
      "qxl.apiviewer.initialTreeDepth": 1
    },

    /*
    *****************************************************************************
     DESTRUCTOR
    *****************************************************************************
    */
    destruct: function destruct() {
      this._classTreeNodeHash = this.__toggleGroup__P_595_6 = null;

      this._disposeObjects("_tree", "_detailLoader", "_classViewer", "_packageViewer", "_searchView", "_tabView");
    }
  });
  qxl.apiviewer.Viewer.$$dbClassInfo = $$dbClassInfo;
})();

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
     */
    // @ignore (qx.$$appRoot)
    construct: function construct(widgetRegistry) {
      qx.core.Object.constructor.call(this);
      this._widgetRegistry = qxl.apiviewer.MWidgetRegistry;
      this._titlePrefix = "API Documentation";
      document.title = this._titlePrefix;
      qxl.apiviewer.ClassLoader.setBaseUri(qx.$$appRoot + "..");
      this._detailLoader = this._widgetRegistry.getWidgetById("detail_loader");
      this._tabViewController = new qxl.apiviewer.TabViewController(this._widgetRegistry);

      this.__bindTabViewController__P_596_0();

      this._tree = this._widgetRegistry.getWidgetById("tree");

      this.__bindTree__P_596_1();

      this.__bindToolbar__P_596_2();

      var btn_inherited = this._widgetRegistry.getWidgetById("btn_inherited");

      var btn_included = this._widgetRegistry.getWidgetById("btn_included");

      btn_inherited.addListener("changeValue", this.__syncMenuButton__P_596_3, this);
      btn_included.addListener("changeValue", this.__syncMenuButton__P_596_3, this);
      this._history = qx.bom.History.getInstance();

      this.__bindHistory__P_596_4();

      qx.core.Init.getApplication().getRoot().addListener("pointerdown", function (e) {
        this.__openInNewTab__P_596_5 = e.isShiftPressed() || e.isCtrlOrCommandPressed();
      }, this, true);
    },
    members: {
      __openInNewTab__P_596_5: false,
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
          var start = new Date();

          this._tree.setTreeData(rootPackage);

          var end = new Date();
          {
            this.debug("Time to update tree: " + (end.getTime() - start.getTime()) + "ms");
          }
          setTimeout(() => {
            // Handle bookmarks
            var state = this._history.getState();

            if (state) {
              this.__selectItem__P_596_6(this.__decodeState__P_596_7(state));
            } else {
              this.__selectItem__P_596_6("");
            }
          });
        });
      },

      /**
       * binds the events of the TabView controller
       */
      __bindTabViewController__P_596_0: function __bindTabViewController__P_596_0() {
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

            if (itemName != null) {
              this._updateHistory(nodeName + "#" + itemName);
            } else {
              this._updateHistory(nodeName);
            }
          } else {
            this._tree.resetSelection();
          }
        }, this);
      },

      /**
       * binds the selection event of the package tree.
       */
      __bindTree__P_596_1: function __bindTree__P_596_1() {
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
      __bindToolbar__P_596_2: function __bindToolbar__P_596_2() {
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
      __syncMenuButton__P_596_3: function __syncMenuButton__P_596_3() {
        var menuButton = this._widgetRegistry.getWidgetById("menubtn_includes");

        var btn_inherited = this._widgetRegistry.getWidgetById("btn_inherited");

        var btn_included = this._widgetRegistry.getWidgetById("btn_included");

        var showInherited = btn_inherited.getValue();
        var showMixins = btn_included.getValue();

        if (showMixins && showInherited) {
          menuButton.setIcon('qxl/apiviewer/image/inherited_and_mixins_included.gif');
        }

        if (showInherited && !showMixins) {
          menuButton.setIcon('qxl/apiviewer/image/method_public_inherited18.gif');
        }

        if (!showInherited && showMixins) {
          menuButton.setIcon('qxl/apiviewer/image/overlay_mixin18.gif');
        }

        if (!showInherited && !showMixins) {
          menuButton.setIcon('qxl/apiviewer/image/includes.gif');
        }
      },

      /**
       * bind history events
       */
      __bindHistory__P_596_4: function __bindHistory__P_596_4() {
        this._history.addListener("changeState", function (evt) {
          var item = this.__decodeState__P_596_7(evt.getData());

          if (item) {
            this.__selectItem__P_596_6(item);
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
        qx.bom.History.getInstance().addToHistory(this.__encodeState__P_596_8(className), newTitle);
      },

      /**
       * Display information about a class
       * 
       * @param classNode
       *          {qxl.apiviewer.dao.Class} class node to display
       */
      _selectClass: function _selectClass(classNode, callback, self) {
        this._detailLoader.exclude();

        this._tabViewController.showTabView();

        return classNode.loadDependedClasses().then(() => {
          if (classNode instanceof qxl.apiviewer.dao.Class) {
            return this._tabViewController.openClass(classNode, this.__openInNewTab__P_596_5);
          } else {
            return this._tabViewController.openPackage(classNode, this.__openInNewTab__P_596_5);
          }
        }).then(() => callback && callback.call(self));
      },

      /**
       * Selects an item (class, property, method or constant).
       * 
       * @param fullItemName
       *          {String} the full name of the item to select. (e.g.
       *          "qx.mypackage.MyClass" or "qx.mypackage.MyClass#myProperty")
       * 
       * @lint ignoreDeprecated(alert)
       */
      __selectItem__P_596_6: function __selectItem__P_596_6(fullItemName) {
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
            this.error("Unknown class: " + className); //alert("Unknown class: " + className);

            qxl.apiviewer.LoadingIndicator.getInstance().hide();
            return;
          }

          var sel = this._tree.getSelection();

          var nodeName = sel[0].getUserData("nodeName") || className;
          /**
           * @lint ignoreDeprecated(alert)
           */

          this._ignoreTabViewSelection = true;

          this._selectClass(qxl.apiviewer.ClassLoader.getClassOrPackage(nodeName), () => {
            if (itemName) {
              if (!this._tabViewController.showItem(itemName)) {
                this.error("Unknown item of class '" + className + "': " + itemName); //alert("Unknown item of class '"+ className +"': " + itemName);

                qxl.apiviewer.LoadingIndicator.getInstance().hide();

                this._updateHistory(className);

                this._ignoreTabViewSelection = false;
                return;
              }
            }

            this._updateHistory(fullItemName);

            this._ignoreTabViewSelection = false;
          });
        });
      },
      __encodeState__P_596_8: function __encodeState__P_596_8(state) {
        return state.replace(/(.*)#(.*)/g, "$1~$2");
      },
      __decodeState__P_596_7: function __decodeState__P_596_7(encodedState) {
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

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.tree.Tree": {
        "construct": true,
        "require": true
      },
      "qx.ui.tree.TreeFolder": {
        "construct": true
      },
      "qx.Promise": {},
      "qxl.apiviewer.TreeUtil": {}
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
       * Til Schneider    (til132)
       * Sebastian Werner (wpbasti)
       * Andreas Ecker    (ecker)
       * Fabian Jakobs    (fjakobs)
       * Jonathan Weiß    (jonathan_rass)
       * John Spackman    (johnspackman)
       * Henner Kollmann  (hkollmann)
  
  ************************************************************************ */

  /**
   * The package tree.
   */
  qx.Class.define("qxl.apiviewer.ui.PackageTree", {
    extend: qx.ui.tree.Tree,
    construct: function construct() {
      qx.ui.tree.Tree.constructor.call(this, "Documentation");
      this.setDecorator(null);
      this.setPadding(0);
      this.__root__P_597_0 = new qx.ui.tree.TreeFolder("Packages");

      this.__root__P_597_0.setOpen(true);

      this.setRoot(this.__root__P_597_0);
      this.setSelection([this.__root__P_597_0]); // TODO: Is this workaround still needed?
      // Workaround: Since navigating in qx.ui.tree.Tree doesn't work, we've to
      // maintain a hash that keeps the tree nodes for class names

      this._classTreeNodeHash = {};
    },

    /*
    * ****************************************************************************
    * MEMBERS
    * ****************************************************************************
    */
    members: {
      __root__P_597_0: null,

      /**
       * Updates the tree on the left.
       *
       * @param docTree
       *          {qxl.apiviewer.dao.Package} the documentation tree to use for
       *          updating.
       * @return {void}
       */
      setTreeData: function setTreeData(docTree) {
        this._docTree = docTree; // Fill the packages tree

        this.__fillPackageNode__P_597_1(this.__root__P_597_0, docTree, 0);

        if (this._wantedClassName) {
          this.selectTreeNodeByClassName(this._wantedClassName);
          this._wantedClassName = null;
        }
      },

      /**
       * Selects a certain class.
       *
       * @param className {String} the name of the class to show.
       * @async
       * @return {Boolean} Whether the class name was valid and could be selected.
       */
      selectTreeNodeByClassName: function selectTreeNodeByClassName(className) {
        if (this._docTree == null) {
          // The doc tree has not been loaded yet
          // -> Remember the wanted class and show when loading is done
          this._wantedClassName = className;
          return qx.Promise.resolve(true);
        }

        if (!className) {
          this.__root__P_597_0.setOpen(true);

          this.setSelection([this.__root__P_597_0]);
          this.scrollChildIntoView(this.__root__P_597_0);
          return qx.Promise.resolve(true);
        }

        var nameParts = className.split(".");
        var name = "";
        var nameIndex = 0;

        let next = () => {
          if (nameIndex > 0) {
            name += ".";
          }

          name += nameParts[nameIndex];
          var treeNode = this._classTreeNodeHash[name];

          if (!treeNode) {
            return qx.Promise.resolve(false);
          }

          treeNode.setOpen(true);
          return treeNode.loading.then(() => {
            nameIndex++;

            if (nameIndex < nameParts.length) {
              return next();
            }

            return treeNode;
          });
        };

        return next().then(treeNode => {
          if (treeNode) {
            this.setSelection([treeNode]);
            this.scrollChildIntoView(treeNode);
            return true;
          }

          this.setSelection([]);
          return false;
        });
      },

      /**
       * Create a callback which loads the child nodes of a tree folder
       *
       * @param packageTreeNode
       *          {qx.ui.tree.TreeFolder} the package tree folder.
       * @param packageDoc
       *          {qxl.apiviewer.dao.Package} the documentation node of the package.
       * @param depth
       *          {var} current depth in the tree
       * @return {Function} the opener callback function
       */
      __getPackageNodeOpener__P_597_2: function __getPackageNodeOpener__P_597_2(packageTreeNode, packageDoc, depth) {
        var self = this;
        return function () {
          if (!packageTreeNode.loaded) {
            packageTreeNode.loaded = true;

            self.__fillPackageNode__P_597_1(packageTreeNode, packageDoc, depth + 1);

            packageTreeNode.setOpenSymbolMode("always");
          }
        };
      },

      /**
       * Fills a package tree node with tree nodes for the sub packages and
       * classes.
       *
       * @param treeNode
       *          {qx.ui.tree.TreeFolder} the package tree node.
       * @param docNode
       *          {qxl.apiviewer.dao.Package} the documentation node of the package.
       * @param depth
       *          {var} current depth in the tree
       */
      __fillPackageNode__P_597_1: function __fillPackageNode__P_597_1(treeNode, docNode, depth) {
        var PackageTree = qxl.apiviewer.ui.PackageTree;
        var packagesDoc = docNode.getPackages();
        packagesDoc.sort((l, r) => {
          l = l.getFullName();
          r = r.getFullName();
          return l < r ? -1 : l > r ? 1 : 0;
        });
        qx.Promise.map(packagesDoc, packageDoc => {
          var iconUrl = qxl.apiviewer.TreeUtil.getIconUrl(packageDoc);
          var segs = packageDoc.getName().split(".");
          var packageTreeNode = new qx.ui.tree.TreeFolder(segs[segs.length - 1]);
          packageTreeNode.setIcon(iconUrl);
          packageTreeNode.setOpenSymbolMode("always");
          packageTreeNode.setUserData("nodeName", packageDoc.getFullName());
          treeNode.add(packageTreeNode); // defer adding of child nodes

          packageTreeNode.addListener("changeOpen", this.__getPackageNodeOpener__P_597_2(packageTreeNode, packageDoc, depth + 1), this); // Register the tree node

          this._classTreeNodeHash[packageDoc.getFullName()] = packageTreeNode;
          return packageDoc.load();
        });
        treeNode.loading = docNode.loadDependedClasses().then(classes => {
          classes.sort((l, r) => {
            l = l.getFullName();
            r = r.getFullName();
            return l < r ? -1 : l > r ? 1 : 0;
          });
          classes.forEach(classDoc => {
            var iconUrl = qxl.apiviewer.TreeUtil.getIconUrl(classDoc);
            var segs = classDoc.getName().split(".");
            var classTreeNode = new qx.ui.tree.TreeFolder(segs[segs.length - 1]);
            classTreeNode.setIcon(iconUrl);
            classTreeNode.setUserData("nodeName", classDoc.getFullName());
            classTreeNode.treeType = PackageTree.PACKAGE_TREE;
            treeNode.add(classTreeNode);
            classTreeNode.loading = qx.Promise.resolve();
            classTreeNode.loaded = true; // Register the tree node

            this._classTreeNodeHash[classDoc.getFullName()] = classTreeNode;
          });
          return null;
        });
      }
    },

    /*
    * ****************************************************************************
    * DESTRUCTOR
    * ****************************************************************************
    */
    destruct: function destruct() {
      this._docTree = this._classTreeNodeHash = null;

      this._disposeObjects("__root__P_597_0");
    }
  });
  qxl.apiviewer.ui.PackageTree.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.container.Composite": {
        "construct": true,
        "require": true
      },
      "qx.ui.layout.VBox": {
        "construct": true
      },
      "qx.lang.Object": {},
      "qx.ui.layout.Grid": {},
      "qx.ui.form.TextField": {},
      "qx.data.Array": {},
      "qx.ui.layout.HBox": {},
      "qx.ui.form.ToggleButton": {},
      "qx.ui.basic.Label": {},
      "qx.ui.table.model.Simple": {},
      "qx.ui.table.columnmodel.Resize": {},
      "qx.ui.table.Table": {},
      "qx.ui.table.cellrenderer.Image": {},
      "qxl.apiviewer.TreeUtil": {},
      "qxl.apiviewer.dao.Class": {},
      "qx.io.remote.Request": {},
      "qx.core.Init": {},
      "qxl.apiviewer.UiModel": {},
      "qx.ui.popup.Popup": {},
      "qx.ui.layout.Canvas": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2007-2008 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Stefan Kloiber (skloiber)
       * Jonathan Weiß (jonathan_rass)
  
  ************************************************************************ */

  /**
   * Shows the search pane.
   */
  qx.Class.define("qxl.apiviewer.ui.SearchView", {
    extend: qx.ui.container.Composite,

    /*
    *****************************************************************************
     CONSTRUCTOR
    *****************************************************************************
    */
    construct: function construct() {
      qx.ui.container.Composite.constructor.call(this);
      var layout = new qx.ui.layout.VBox();
      this.setLayout(layout);
      this.setBackgroundColor("white");
      this.__initresult__P_598_0 = false;
      this.listdata = [];
      this.apiindex = {};

      this._showSearchForm();
    },

    /*
    *****************************************************************************
     EVENTS
    *****************************************************************************
    */
    events: {
      /**
       * Fired when a search operation has finished
       */
      searchFinished: "qx.event.type.Event"
    },

    /*
    *****************************************************************************
     MEMBERS
    *****************************************************************************
    */
    members: {
      __note__P_598_1: null,
      __initresult__P_598_0: null,
      __table__P_598_2: null,
      __typeFilter__P_598_3: null,
      __typesIndex__P_598_4: null,
      __searchTerm__P_598_5: null,

      /**
       * Enters a term into the search box and selects the
       * first result
       *
       * @param term {String} Search term
       */
      search: function search(term) {
        this.addListenerOnce("searchFinished", function () {
          // select the first result
          // the timeout is needed since the detail view might not
          // be done rendering the initially selected item, in
          // which case it won't update when the selection changes
          setTimeout(function () {
            this._selectionModel.addSelectionInterval(0, 0);
          }.bind(this), 300);
        }, this);

        if (qx.lang.Object.getLength(this.apiindex) == 0) {
          // Index not ready yet, defer search
          this.__searchTerm__P_598_5 = term;
        } else {
          this.__searchTerm__P_598_5 = null; // Set search box value

          this.sinput.setValue(term);
        }
      },

      /**
       * Generate the search form.
       */
      _showSearchForm: function _showSearchForm() {
        //--------------------------------------------------------
        // Outputs the generated index file content to a textarea
        //--------------------------------------------------------
        // Search form
        var layout = new qx.ui.layout.Grid(4, 4);
        layout.setColumnFlex(1, 1);
        layout.setRowAlign(2, "left", "middle");
        var sform = new qx.ui.container.Composite(layout);
        sform.setPadding(10); // Search form - input field

        this.sinput = new qx.ui.form.TextField().set({
          placeholder: "Enter search term ...",
          liveUpdate: true
        });
        sform.add(this.sinput, {
          row: 0,
          column: 0,
          colSpan: 2
        });
        this.__typesIndex__P_598_4 = {
          "PACKAGE": 0,
          "ENTRY": 4,
          "CLASS": 1,
          "INTERFACE": 1,
          "METHOD_PUB": 2,
          "METHOD_PROT": 2,
          "METHOD_PRIV": 2,
          "PROPERTY_PUB": 4,
          "EVENT": 5,
          "CONSTANT": 3,
          "CHILDCONTROL": 6
        };
        this.__typeFilter__P_598_3 = new qx.data.Array([true, true, true, true, true, true, true]);
        var types = ["Packages", "Classes, Mixins, Interfaces", "Methods", "Constants", "Properties", "Events", "Child Controls"];
        var iconNameParts = ["package", "class", "method_public", "constant", "property", "event", "childcontrol"];
        var typeContainer = new qx.ui.container.Composite(new qx.ui.layout.HBox());

        for (var i = 0; i < types.length; i++) {
          var type = types[i];
          var iconNamePart = iconNameParts[i];
          var typeToggleButton = new qx.ui.form.ToggleButton("", "qxl/apiviewer/image/" + iconNamePart + "18.gif");
          typeToggleButton.setToolTipText(type); // we need variable paddingLeft in order to accommodate the icons in the center of the toggleButton

          var paddingLeft = 0;
          var paddingBottom = 0;
          var paddingTop = 0;

          if (["class", "interface"].indexOf(iconNamePart) != -1) {
            paddingLeft = 2;
          } else if (["package", "childcontrol"].indexOf(iconNamePart) != -1) {
            paddingLeft = 1;

            if (iconNamePart === "childcontrol") {
              paddingBottom = 2;
            }
          } else if (iconNamePart === "constant") {
            paddingTop = 1;
          }

          typeToggleButton.setFocusable(false);
          typeToggleButton.setPadding(paddingTop, 0, paddingBottom, paddingLeft);
          typeToggleButton.setMarginRight(2);
          typeToggleButton.setGap(0);
          typeToggleButton.setIconPosition("top");
          typeToggleButton.setShow("icon");
          typeToggleButton.bind("value", this.__typeFilter__P_598_3, "[" + i + "]");
          typeToggleButton.setKeepFocus(true);
          typeToggleButton.setValue(true);
          typeContainer.add(typeToggleButton);
          typeToggleButton.addListener("changeValue", function (e) {
            this._searchResult(this.sinput.getValue() || "");
          }, this);

          this.__typeFilter__P_598_3.bind("[" + i + "]", typeToggleButton, "value");
        }

        var typeToggleButtonAll = new qx.ui.form.ToggleButton("Toggle Filters");
        typeToggleButtonAll.setFocusable(false);
        typeToggleButtonAll.setPadding(1, 3, 1, 3);
        typeToggleButtonAll.setShow("label");
        typeToggleButtonAll.setValue(true);
        typeToggleButtonAll.setGap(0);
        typeToggleButtonAll.setToolTipText("Deactivate all filters");
        typeToggleButtonAll.setKeepFocus(true);
        typeToggleButtonAll.setMarginLeft(10);
        typeContainer.add(typeToggleButtonAll);
        typeToggleButtonAll.addListener("changeValue", function (e) {
          for (var i = 0; i < this.__typeFilter__P_598_3.length; i++) {
            this.__typeFilter__P_598_3.setItem(i, e.getData());
          }

          this._searchResult(this.sinput.getValue() || "");

          typeToggleButtonAll.setToolTipText(e.getData() ? "Deactivate all filters" : "Activate all filters");
        }, this);
        sform.add(typeContainer, {
          row: 1,
          column: 0,
          colSpan: 2
        });
        this.namespaceTextField = new qx.ui.form.TextField().set({
          placeholder: ""
        });
        sform.add(new qx.ui.basic.Label("Namespace filter: "), {
          row: 2,
          column: 0
        });
        sform.add(this.namespaceTextField, {
          row: 2,
          column: 1
        });
        this.namespaceTextField.addListener("keyup", function (e) {
          this._searchResult(this.sinput.getValue() || "");
        }, this);
        this.add(sform); // Create the initial data

        var rowData = []; // table model

        var tableModel = this._tableModel = new qx.ui.table.model.Simple();
        tableModel.setColumns(["", "Results"]);
        tableModel.setData(rowData);
        var customModel = {
          tableColumnModel: function tableColumnModel(obj) {
            return new qx.ui.table.columnmodel.Resize(obj);
          }
        }; // table

        var table = new qx.ui.table.Table(tableModel, customModel);
        table.setDecorator(null);
        table.setShowCellFocusIndicator(false);
        table.setStatusBarVisible(false);
        table.setColumnVisibilityButtonVisible(false);
        this._selectionModel = table.getSelectionManager().getSelectionModel();

        this._selectionModel.addListener("changeSelection", this._callDetailFrame, this);

        this._table = table; // resize behavior

        var tcm = table.getTableColumnModel();
        var resizeBehavior = tcm.getBehavior();
        resizeBehavior.set(0, {
          width: "0*",
          minWidth: 42,
          maxWidth: 100
        });
        resizeBehavior.set(1, {
          width: "1*"
        });
        tcm.setDataCellRenderer(0, new qx.ui.table.cellrenderer.Image(20, 20));
        this.__initresult__P_598_0 = true;
        this.__table__P_598_2 = table; // table.addListener("appear", this.__handleNote, this);
        // table.addListener("disappear", function(e) {
        //  this.__note.hide();
        // }, this);

        this.add(table, {
          flex: 1
        }); // Load index file
        //      qx.event.Timer.once(this._load, this, 0);
        // Give keyboard focus to the search field

        this.sinput.focus(); // Submit events

        this.sinput.addListener("changeValue", function (e) {
          this._searchResult(this.sinput.getValue() || "");
        }, this);
      },

      /**
       * Execute the search query.
       *
       * @param svalue {String} input value
       */
      _searchResult: function _searchResult(svalue) {
        // Trim search string
        var svalue = svalue.trim(); // Hide the note if text is typed into to search field.
        //      if (svalue.length > 0) {
        //        this.__note.hide();
        //      } else {
        //        this.__note.show();
        //      }
        // If all toggle butons are disabled stop here

        var allFiltersDisabled = true;

        for (var i = 0; i < this.__typeFilter__P_598_3.length; i++) {
          if (this.__typeFilter__P_598_3.getItem(i) === true) {
            allFiltersDisabled = false;
            break;
          }
        } // If empty or too short search string stop here


        if (svalue.length < 3 || allFiltersDisabled) {
          // Reset the result list
          if (this.__initresult__P_598_0) {
            this.listdata.splice(0, this.listdata.length);
          }

          this._resetElements();

          return;
        }

        var sresult = [];

        try {
          var search = this._validateInput(svalue);

          new RegExp(search[0]);
        } catch (ex) {
          // Reset the result list
          if (this.__initresult__P_598_0) {
            this.listdata.splice(0, this.listdata.length);
          }

          this._resetElements();

          return;
        }

        sresult = this._searchIndex(search[0], search[1]);
        sresult.sort(this._sortByIcons);

        this._tableModel.setColumns(["", sresult.length + " Result" + (sresult.length != 1 ? "s" : "")]);

        this._tableModel.setData(sresult); // Clear old selection


        this._table.resetSelection();

        setTimeout(function () {
          this.fireEvent("searchFinished");
        }.bind(this), 0);
      },

      /**
       * Validation
       *
       * @param svalue {String} input value
       */
      _validateInput: function _validateInput(svalue) {
        var validated = []; // RegExp matches full pathname (RegExp.$1) and
        // method (RegExp.$2) stated with path#method or path.method()
        // ([\w\.]*\w+) -> RegExp.$1: Matches any alphanumeric character including the dot (.) e.g. "qx.application.basic"
        // (#\w+|\.\w+\(\)|#\.[\*|\+|\?]?)? -> RegExp.$2: Matches a method statement noted with a hash (#meth) or parentheses (.meth())

        if (/^([\w\.]*\w+)(#\w+|\.\w+\(\)|#\.[\*|\+|\?]?)?$/.test(svalue)) {
          if (RegExp.$2 && RegExp.$2.length > 1) {
            validated = [RegExp.$2, RegExp.$1];
          } else if (RegExp.$1.length > 1) {
            validated = [RegExp.$1, null];
          } else {
            return null;
          }
        } else {
          validated = [svalue, null];
        }

        return validated;
      },

      /**
       * Sets the output
       *
       * @param svalue {String} input value or 1st RegExp subexpression from _validateInput
       * @param spath {String} matched 2nd subexpression from _validateInput
       */
      _searchIndex: function _searchIndex(svalue, spath) {
        var sresult = []; // Match object

        var mo = new RegExp(svalue, /^.*[A-Z].*$/.test(svalue) ? "" : "i");
        var index = this.apiindex.__index____P_598_6;
        var fullNames = this.apiindex.__fullNames____P_598_7;
        var types = this.apiindex.__types____P_598_8;
        var namespaceFilter = this.namespaceTextField.getValue() != null ? this.namespaceTextField.getValue().trim() : "";
        var namespaceRegexp = new RegExp(".*");

        if (namespaceFilter.length > 0) {
          try {
            var search = this._validateInput(namespaceFilter);

            namespaceRegexp = new RegExp(search[0], /^.*[A-Z].*$/.test(search[0]) ? "" : "i");
          } catch (ex) {
            namespaceRegexp = new RegExp(".*");
          }
        }

        for (var key in index) {
          if (mo.test(key)) {
            if (spath) {
              for (var i = 0, l = index[key].length; i < l; i++) {
                var fullname = fullNames[index[key][i][1]];

                if (namespaceRegexp && namespaceRegexp.test(fullname)) {
                  if (new RegExp(spath, "i").test(fullname)) {
                    var elemtype = types[index[key][i][0]].toUpperCase();

                    if (this._isTypeFilteredIn(elemtype)) {
                      var icon = qxl.apiviewer.TreeUtil["ICON_" + elemtype];
                      sresult.push([icon, fullname + key]);
                    }
                  }
                }
              }
            } else {
              for (var i = 0, l = index[key].length; i < l; i++) {
                elemtype = types[index[key][i][0]].toUpperCase();
                fullname = fullNames[index[key][i][1]];

                if (this._isTypeFilteredIn(elemtype)) {
                  if (namespaceRegexp && namespaceRegexp.test(fullname)) {
                    if (elemtype == "CLASS") {
                      icon = qxl.apiviewer.TreeUtil.getIconUrl(qxl.apiviewer.dao.Class.getClassByName(fullname));
                    } else {
                      if (elemtype != "PACKAGE" && elemtype != "INTERFACE") {
                        // just consider attribute types
                        fullname += key;
                      }

                      if (elemtype === "ENTRY") {
                        fullname = key.substring(1);
                      }

                      icon = qxl.apiviewer.TreeUtil["ICON_" + elemtype];
                    }

                    sresult.push([icon, fullname]);
                  }
                }
              }
            }
          }
        }

        return sresult;
      },

      /**
       * Checks whether the type passed as argument is in the filter list or not
       *
       * @param type {String} the type in uppercase
       */
      _isTypeFilteredIn: function _isTypeFilteredIn(type) {
        return this.__typeFilter__P_598_3.getItem(this.__typesIndex__P_598_4[type]);
      },

      /**
       * Set data for the listview
       *
       * @param sresult {Array} search value
       */
      _setListdata: function _setListdata(sresult) {
        sresult.sort(function (a, b) {
          if (a[1] < b[1]) {
            return -1;
          }

          if (a[1] > b[1]) {
            return 1;
          }

          return 0;
        });

        for (var i = 0, l = sresult.length; i < l; i++) {
          var iconDisplay = sresult[i][0];
          var ldicon = {
            icon: iconDisplay,
            html: "",
            iconWidth: 18,
            iconHeight: 18
          };
          this.listdata.push({
            icon: ldicon,
            result: {
              text: sresult[i][1]
            }
          });
        }
      },

      /**
       * Sort elements in order of type
       *
       * @param a {String} icon url first argument
       * @param b {String} icon url second argument
       */
      _sortByIcons: function _sortByIcons(a, b) {
        var icons = {
          "package": 0,
          "class_abstract": 1,
          "class": 2,
          "class_singleton": 3,
          "class_static": 4,
          "class_warning": 5,
          "class_static_warning": 6,
          "class_abstract_warning": 7,
          "class_singleton_warning": 8,
          "interface": 9,
          "mixin": 10,
          "mixin_warning": 11,
          "method_public": 12,
          "method_protected": 13,
          "method_private": 14,
          "property": 15,
          "property_protected": 16,
          "property_private": 17,
          "event": 18,
          "constructor": 19,
          "constant": 20,
          "childcontrol": 21
        }; // Get the filename

        var aType = a[0];
        var bType = b[0];
        var iconfile = aType.substr(aType.lastIndexOf("/") + 1);
        var iconfileNext = bType.substr(bType.lastIndexOf("/") + 1); // Map the type to a number

        aType = icons[iconfile.substr(0, iconfile.length - 6)];
        bType = icons[iconfileNext.substr(0, iconfileNext.length - 6)];
        var diff = aType - bType;

        if (diff == 0) {
          if (a[1] < b[1]) {
            return -1;
          }

          if (a[1] > b[1]) {
            return 1;
          }

          return 0;
        }

        return aType - bType;
      },

      /**
       * Load the api index
       * @lint ignoreDeprecated(eval)
       */
      _load: function _load() {
        var url = "./script/apiindex.json";
        var req = new qx.io.remote.Request(url);
        req.setAsynchronous(true);
        req.setTimeout(30000); // 30 sec

        req.setProhibitCaching(false);
        req.addListener("completed", function (evt) {
          this.apiindex = eval("(" + evt.getContent() + ")");

          if (this.__searchTerm__P_598_5) {
            setTimeout(function () {
              this.sinput.setValue(this.__searchTerm__P_598_5);
              this.__searchTerm__P_598_5 = null;
            }.bind(this), 0);
          }
        }, this);
        req.addListener("failed", function (evt) {
          this.warn("Couldn't load file: " + url);
        }, this);
        req.send();
      },

      /**
       * Display information in the detail frame
       */
      _callDetailFrame: function _callDetailFrame() {
        var sel = this._selectionModel.getAnchorSelectionIndex();

        var selected = this._tableModel.getData()[sel];

        var controller = qx.core.Init.getApplication().controller;
        var uiModel = qxl.apiviewer.UiModel.getInstance();

        if (selected != undefined) {
          var fullItemName = selected[1];
          var itemType = selected[0];
          var elemType = itemType.substr(itemType.lastIndexOf("/") + 1);
          elemType = elemType.substr(0, elemType.length - 6); // Display protected stated items

          if (/protected/.test(itemType)) {
            uiModel.setShowProtected(true);
          } // Display private stated items
          else if (/private/.test(itemType)) {
              uiModel.setShowPrivate(true);
            } // Display internal stated items
            else if (/internal/.test(itemType)) {
                uiModel.setShowInternal(true);
              } // Highlight item


          if (elemType.indexOf("method") != -1 || elemType.indexOf("property") != -1 || elemType.indexOf("event") != -1 || elemType.indexOf("constant") != -1 || elemType.indexOf("childcontrol") != -1) {
            controller._updateHistory(fullItemName + "!" + elemType);
          } else {
            controller._updateHistory(fullItemName);
          }
        }
      },
      _resetElements: function _resetElements() {
        this._tableModel.setData([]);

        this._tableModel.setColumns(["", ""]);
      },
      __initNote__P_598_9: function __initNote__P_598_9(table) {
        this.__note__P_598_1 = new qx.ui.popup.Popup(new qx.ui.layout.Canvas()).set({
          autoHide: false,
          width: 170
        });
        var hintText = this.tr("Hint: You can use regular expressions in the search field.");
        var hint = new qx.ui.basic.Label(hintText);
        hint.setRich(true);

        this.__note__P_598_1.add(hint, {
          edge: 3
        });

        this.__note__P_598_1.setPosition("bottom-left");

        this.__note__P_598_1.placeToWidget(this.sinput, false);

        this.__note__P_598_1.show();
      },
      __handleNote__P_598_10: function __handleNote__P_598_10(e) {
        if (this.__note__P_598_1) {
          if ((this.sinput.getValue() || "").trim().length == 0) {
            this.__note__P_598_1.show();
          }
        } else {
          this.__initNote__P_598_9();
        }
      }
    },

    /*
    *****************************************************************************
     DESTRUCTOR
    *****************************************************************************
    */
    destruct: function destruct() {
      this.apiindex = this._table = this.__table__P_598_2 = this._tableModel = this.__typeFilter__P_598_3 = this.__typesIndex__P_598_4 = this._selectionModel = null;

      this._disposeObjects("sinput", "__note__P_598_1");

      this._disposeArray("listdata");
    }
  });
  qxl.apiviewer.ui.SearchView.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.container.Scroll": {
        "construct": true,
        "require": true
      },
      "qx.ui.layout.Grid": {
        "construct": true
      },
      "qx.ui.container.Composite": {
        "construct": true
      },
      "qxl.apiviewer.TreeUtil": {
        "construct": true
      },
      "qx.ui.basic.Image": {
        "construct": true
      },
      "qx.ui.basic.Label": {
        "construct": true
      }
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
       * Til Schneider (til132)
       * Sebastian Werner (wpbasti)
       * Andreas Ecker (ecker)
       * Fabian Jakobs (fjakobs)
       * Jonathan Weiß (jonathan_rass)
       * John Spackman (johnspackman)
  
  ************************************************************************ */

  /**
   * Shows the info pane.
   */
  qx.Class.define("qxl.apiviewer.ui.LegendView", {
    extend: qx.ui.container.Scroll,

    /*
    *****************************************************************************
     CONSTRUCTOR
    *****************************************************************************
    */
    construct: function construct() {
      qx.ui.container.Scroll.constructor.call(this);
      this.setAppearance("legend");
      var layout = new qx.ui.layout.Grid(10, 10);
      layout.setColumnWidth(1, 150);
      layout.setColumnFlex(1, 1);
      var content = new qx.ui.container.Composite(layout);
      this.__legend__P_599_0 = [{
        icon: "ICON_PACKAGE",
        desc: "Package"
      }, {
        icon: "ICON_CLASS",
        desc: "Class"
      }, {
        icon: "ICON_CLASS_STATIC",
        desc: "Static Class"
      }, {
        icon: "ICON_CLASS_ABSTRACT",
        desc: "Abstract Class"
      }, {
        icon: "ICON_CLASS_SINGLETON",
        desc: "Singleton Class"
      }, {
        icon: "ICON_INTERFACE",
        desc: "Interface"
      }, {
        icon: "ICON_MIXIN",
        desc: "Mixin"
      }, {
        icon: "ICON_CHILDCONTROL",
        desc: "Child Control"
      }, {
        icon: "ICON_METHOD_PUB",
        desc: "Public Method"
      }, {
        icon: "ICON_METHOD_PROT",
        desc: "Protected Method"
      }, {
        icon: "ICON_METHOD_PRIV",
        desc: "Private Method"
      }, {
        icon: "ICON_PROPERTY_PUB",
        desc: "Public Property"
      }, {
        icon: "ICON_PROPERTY_PROT",
        desc: "Protected Property"
      }, {
        icon: "ICON_PROPERTY_PRIV",
        desc: "Private Property"
      }, {
        icon: "ICON_PROPERTY_PUB_THEMEABLE",
        desc: "Themeable Property"
      }, {
        icon: "ICON_EVENT",
        desc: "Event"
      }, {
        icon: "ICON_CONSTANT",
        desc: "Constant"
      }, {
        icon: "ICON_BLANK",
        desc: "<span style=\"text-decoration: line-through;color: #7193b9;\">deprecated</span>"
      }, {
        icon: "OVERLAY_WARN",
        desc: "Package/Class/Mixin/Interface is not fully documented"
      }, {
        icon: "OVERLAY_ERROR",
        desc: "Method/Property/Event is not fully documented"
      }, {
        icon: "OVERLAY_MIXIN",
        desc: "Method/Property is included from a mixin"
      }, {
        icon: "OVERLAY_INHERITED",
        desc: "Method/Property/Event is inherited from one of the super classes"
      }, {
        icon: "OVERLAY_OVERRIDDEN",
        desc: "Method/Property overrides the Method/Property of the super class"
      }];
      var length = this.__legend__P_599_0.length;
      var entry, imageUrl;

      for (var i = 0; i < length; i++) {
        entry = this.__legend__P_599_0[i];
        imageUrl = qxl.apiviewer.TreeUtil.iconNameToIconPath(entry.icon);

        if (typeof imageUrl != "string") {
          imageUrl = imageUrl[0];
        }

        content.add(new qx.ui.basic.Image(imageUrl).set({
          alignX: "center",
          alignY: "middle"
        }), {
          row: i,
          column: 0
        });
        content.add(new qx.ui.basic.Label(entry.desc).set({
          rich: true,
          appearance: i < 17 ? "legendview-label-important" : "legendview-label"
        }), {
          row: i,
          column: 1
        });
      }

      this.add(content);
    },

    /*
    *****************************************************************************
     MEMBERS
    *****************************************************************************
    */
    members: {
      __legend__P_599_0: null
    },

    /*
    *****************************************************************************
     DESTRUCTOR
    *****************************************************************************
    */
    destruct: function destruct() {
      this._disposeMap("__legend__P_599_0");
    }
  });
  qxl.apiviewer.ui.LegendView.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.tabview.TabView": {
        "require": true
      }
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
       * Fabian Jakobs (fjakobs)
  
  ************************************************************************ */
  qx.Class.define("qxl.apiviewer.DetailFrameTabView", {
    extend: qx.ui.tabview.TabView,

    /*
    *****************************************************************************
     MEMBERS
    *****************************************************************************
    */
    members: {
      add: function add(page) {
        qxl.apiviewer.DetailFrameTabView.prototype.add.base.call(this, page);

        if (this.getChildren().length == 1) {
          this.getChildren()[0].setShowCloseButton(false);
        } else {
          for (var i = 0, l = this.getChildren().length; i < l; i++) {
            this.getChildren()[i].setShowCloseButton(true);
          }
        }
      },
      remove: function remove(page) {
        if (this.getChildren().length > 1) {
          qxl.apiviewer.DetailFrameTabView.prototype.remove.base.call(this, page);

          if (this.getChildren().length == 1) {
            this.getChildren()[0].setShowCloseButton(false);
          }
        }
      }
    }
  });
  qxl.apiviewer.DetailFrameTabView.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.core.Environment": {
        "defer": "load",
        "construct": true,
        "require": true
      },
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.basic.Label": {
        "construct": true,
        "require": true
      }
    },
    "environment": {
      "provided": ["versionLabel.name", "versionLabel.version"],
      "required": {
        "versionLabel.name": {
          "construct": true
        },
        "versionLabel.version": {
          "construct": true
        },
        "qx.revision": {
          "construct": true
        },
        "qx.version": {
          "construct": true
        }
      }
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
       * Thomas Herchenroeder (thron7)
  
  ************************************************************************ */

  /**
   * Slightly extended form of a @{qx.ui.basic.Label}, to include a version/
   * revision string of qooxdoo.
   */
  qx.Class.define("qxl.versionlabel.VersionLabel", {
    extend: qx.ui.basic.Label,
    construct: function construct(value, version) {
      if (value == undefined) {
        // if no parameter value given: use the environment variable
        value = qx.core.Environment.get("versionLabel.name");
      }

      if (version == undefined) {
        // if no parameter value given: use the environment variable
        version = qx.core.Environment.get("versionLabel.version");

        if (version == null) {
          // revision or version number as fallback
          version = qx.core.Environment.get("qx.revision");

          if (version == "") {
            version = qx.core.Environment.get("qx.version");
          }
        }
      }

      qx.ui.basic.Label.constructor.call(this, value + " " + version);
    },
    defer: function defer() {
      /**
       * The name of the version label which is shown in the upper right corner.
       * Defaults to 'qooxdoo'.
       */
      qx.core.Environment.add("versionLabel.name", "qooxdoo");
      /**
       * The version string of the version label which is shown in the upper right corner.
       * Defaults to 'null' to be able to fallback to 'qx.revision' or 'qx.version' easily.
       */

      qx.core.Environment.add("versionLabel.version", null);
    }
  });
  qxl.versionlabel.VersionLabel.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.core.Object": {
        "require": true
      },
      "qx.Promise": {},
      "qxl.apiviewer.dao.Class": {},
      "qxl.apiviewer.dao.Package": {}
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
       * Fabian Jakobs (fjakobs)
  
  ************************************************************************ */

  /**
   * Module for on demand class data loading.
   */
  qx.Class.define("qxl.apiviewer.ClassLoader", {
    extend: qx.core.Object,
    statics: {
      __baseUri__P_600_0: null,
      setBaseUri: function setBaseUri(baseUri) {
        this.__baseUri__P_600_0 = baseUri;
      },
      getBaseUri: function getBaseUri() {
        return this.__baseUri__P_600_0;
      },
      loadClassList: function loadClassList(classes, callback, self) {
        if (!classes.length) {
          callback && callback.call(self || this, []);
          return new qx.Promise.resolve([]);
        }

        var all = classes.map(clazz => clazz.load());
        return qx.Promise.all(all).then(() => callback && callback.call(self || this, classes)).then(() => classes);
      },
      getClassOrPackage: function getClassOrPackage(name) {
        if (name) {
          var cls = qxl.apiviewer.dao.Class.getClassByName(name);

          if (cls) {
            return qxl.apiviewer.dao.Class.isNativeObject(cls) ? null : cls;
          }
        }

        var pkg = qxl.apiviewer.dao.Package.getPackage(name);
        return pkg;
      }
    }
  });
  qxl.apiviewer.ClassLoader.$$dbClassInfo = $$dbClassInfo;
})();

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
      "qx.ui.core.queue.Manager": {},
      "qxl.apiviewer.ui.tabview.PackagePage": {},
      "qxl.apiviewer.ui.tabview.ClassPage": {},
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
       * Fabian Jakobs (fjakobs)
  
  ************************************************************************ */
  qx.Class.define("qxl.apiviewer.TabViewController", {
    extend: qx.core.Object,
    construct: function construct(widgetRegistry) {
      qx.core.Object.constructor.call(this);
      qxl.apiviewer.TabViewController.instance = this;
      this._tabView = widgetRegistry.getWidgetById("tabView");

      this._tabView.addListener("changeSelection", this.__onChangeSelection__P_601_0, this);
    },
    events: {
      /** This event if dispatched if one of the internal links is tapped */
      "classLinkTapped": "qx.event.type.Data",
      "changeSelection": "qx.event.type.Data"
    },
    members: {
      showTabView: function showTabView() {
        this._tabView.show();
      },

      /**
       * Callback for internal links to other classes/items.
       * This code is called directly from the generated HTML of the
       * class viewer.
       */
      onSelectItem: function onSelectItem(itemName) {
        this.fireDataEvent("classLinkTapped", itemName);
      },
      showItem: function showItem(itemName) {
        qx.ui.core.queue.Manager.flush();

        var page = this._tabView.getSelection()[0];

        page.setUserData("itemName", itemName);
        return page.getChildren()[0].showItem(itemName);
      },
      openPackage: function openPackage(classNode, newTab) {
        return this.__open__P_601_1(classNode, qxl.apiviewer.ui.tabview.PackagePage, newTab);
      },
      openClass: function openClass(classNode, newTab) {
        return this.__open__P_601_1(classNode, qxl.apiviewer.ui.tabview.ClassPage, newTab);
      },
      __open__P_601_1: function __open__P_601_1(classNode, clazz, newTab) {
        var currentPage = this._tabView.getSelection()[0] || null;

        if (currentPage && (!(currentPage instanceof clazz) || newTab)) {
          this._tabView.remove(currentPage);

          currentPage.destroy();
          currentPage = null;
        }

        if (!currentPage) {
          currentPage = new clazz(classNode);

          this._tabView.add(currentPage);
        }

        this._tabView.setSelection([currentPage]);

        currentPage.setUserData("itemName", null);
        return currentPage.setClassNodeAsync(classNode).then(() => qxl.apiviewer.LoadingIndicator.getInstance().hide());
      },
      __onChangeSelection__P_601_0: function __onChangeSelection__P_601_0(event) {
        var oldData = event.getOldData();
        var data = event.getData();
        this.fireDataEvent("changeSelection", data, oldData);
      }
    },
    destruct: function destruct() {
      this._tabView.destroy();

      this._tabView = null;
    }
  });
  qxl.apiviewer.TabViewController.$$dbClassInfo = $$dbClassInfo;
})();

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
       2004-2008 1&1 Internet AG, Germany, http://www.1und1.de
       2018 Zenesis Limited, http://www.zenesis.com
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * John Spackman (johnspackman)
       * Fabian Jakobs (fjakobs)
  
  ************************************************************************ */

  /**
   * This class wraps the access to documentation nodes.
   */
  qx.Class.define("qxl.apiviewer.dao.Node", {
    extend: qx.core.Object,
    construct: function construct(meta) {
      qx.core.Object.constructor.call(this);
      this._meta = {};
      this._jsdoc = {};

      if (meta !== undefined) {
        this._initMeta(meta);
      }
    },
    members: {
      _meta: null,
      _jsdoc: null,
      _errors: null,
      _initMeta: function _initMeta(meta) {
        this._meta = meta;
        this._jsdoc = meta.jsdoc || {};
        this._errors = [];
      },

      /**
       * Get description
       *
       * @return {String} description
       */
      getDescription: function getDescription() {
        var arr = this._jsdoc["@description"];

        if (arr && arr.length) {
          return arr[arr.length - 1].body;
        }

        return "";
      },

      /**
       * Get a list of errors of this item.
       *
       * @return {Map[]} errors of this item.
       */
      getErrors: function getErrors() {
        return this._errors;
      },

      /**
       * Get the line number of this item in the source file
       *
       * @return {Integer|null} line number or <code>null</code> if unknown
       */
      getLineNumber: function getLineNumber() {
        return this._meta.location ? this._meta.location.start.line : null;
      },

      /**
       * Get whether the node is deprecated.
       *
       * @return {Boolean} whether the node is deprecated.
       */
      isDeprecated: function isDeprecated() {
        return this._jsdoc["@deprecated"] !== undefined;
      },

      /**
       * Get the text of the deprecation message.
       *
       * @return {String} the deprecation message.
       */
      getDeprecationText: function getDeprecationText() {
        return this.isDeprecated() && this._jsdoc["@deprecated"].body || "";
      },

      /**
       * Get whether the node is internal.
       *
       * @return {Boolean} whether the node is internal.
       */
      isInternal: function isInternal() {
        return this._jsdoc["@internal"] !== undefined;
      },

      /**
       * Get whether the node is private.
       *
       * @return {Boolean} whether the node is private.
       */
      isPrivate: function isPrivate() {
        return this._meta.access == "private";
      },

      /**
       * Get whether the node is protected.
       *
       * @return {Boolean} whether the node is protected.
       */
      isProtected: function isProtected() {
        return this._meta.access == "protected";
      },

      /**
       * Get whether the node is property generated.
       *
       * @return {Boolean} whether the node is property generated.
       */
      isPropertyGenerated: function isPropertyGenerated() {
        return Boolean(this._meta.property);
      },

      /**
       * Get whether the node is public.
       *
       * @return {Boolean} Whether the node is public.
       */
      isPublic: function isPublic() {
        return !this.isPrivate() && !this.isProtected() && !this.isInternal();
      },

      /**
       * Get whether the node has a warning.
       *
       * @return {Boolean} whether the node has a warning.
       */
      hasWarning: function hasWarning() {
        return this._meta.hasWarning || false;
      },

      /**
       * Initialize all internal fields. This method will be called by the
       * constructor before the child nodes are parsed.
       */
      _initializeFields: function _initializeFields() {
        this._errors = [];
      }
    }
  });
  qxl.apiviewer.dao.Node.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qxl.apiviewer.dao.Node": {
        "construct": true,
        "require": true
      },
      "qxl.apiviewer.dao.Package": {
        "construct": true
      },
      "qxl.apiviewer.ClassLoader": {},
      "qxl.apiviewer.RequestUtil": {},
      "qxl.apiviewer.dao.Method": {},
      "qxl.apiviewer.dao.Constant": {},
      "qxl.apiviewer.dao.Property": {},
      "qxl.apiviewer.dao.Event": {},
      "qxl.apiviewer.dao.ChildControl": {},
      "qx.Promise": {},
      "qx.lang.Array": {}
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
       * Fabian Jakobs (fjakobs)
  
  ************************************************************************ */

  /**
   * This Class wraps the access to the documentation data of classes.
   */
  qx.Class.define("qxl.apiviewer.dao.Class", {
    extend: qxl.apiviewer.dao.Node,

    /**
     * @param classDocNode
     *          {Map} class documentation node
     */
    construct: function construct(className) {
      qxl.apiviewer.dao.Node.constructor.call(this);
      this._className = className;
      this._package = qxl.apiviewer.dao.Package.getParentPackage(className);

      this._package.addClass(this);
    },
    members: {
      _package: null,
      _construct: null,
      _destruct: null,
      _defer: null,
      _staticMethods: null,
      _constants: null,
      _members: null,
      _mixinMembers: null,
      _properties: null,
      _mixinProperties: null,
      _events: null,
      _mixinEvents: null,
      _superClass: null,
      _superInterfaces: null,
      _superMixins: null,
      _mixins: null,
      _loadingPromise: null,
      _loaded: false,

      /**
       * Loads the class
       *
       * @return {Promise}
       */
      load: function load() {
        if (this._loadingPromise) {
          return this._loadingPromise;
        }

        var url = qxl.apiviewer.ClassLoader.getBaseUri() + "/transpiled/" + this._className.replace(/\./g, "/") + ".json";
        return this._loadingPromise = qxl.apiviewer.RequestUtil.get(url).then(content => {
          var meta = eval("(" + content + ")");
          return this._initMeta(meta).then(() => {
            this._loaded = true;
            return this;
          });
        }).catch(e => {
          this.error("Couldn't load file: " + url + " " + e.message);
        });
      },
      isLoaded: function isLoaded() {
        return this._loaded;
      },

      /**
       * Loads meta data, including super classes/interfaces/mixins
       *
       * @return {qx.Promise}
       */
      _initMeta: function _initMeta(meta) {
        qxl.apiviewer.dao.Class.prototype._initMeta.base.call(this, meta);

        this._jsdoc = meta.clazz.jsdoc || {};
        this._construct = meta.construct ? [new qxl.apiviewer.dao.Method(meta.construct, this, "construct")] : [];
        this._destruct = meta.destruct ? [new qxl.apiviewer.dao.Method(meta.destruct, this, "destruct")] : [];
        this._defer = meta.defer ? [new qxl.apiviewer.dao.Method(meta.defer, this, "defer")] : [];
        this._staticMethods = [];
        this._constants = [];

        if (meta.statics) {
          for (let name in meta.statics) {
            let data = meta.statics[name];

            if (data.type == "variable") {
              this._constants.push(new qxl.apiviewer.dao.Constant(data, this, name));
            } else {
              this._staticMethods.push(new qxl.apiviewer.dao.Method(data, this, name));
            }
          }
        }

        this._members = [];
        this._mixinMembers = [];

        if (meta.members) {
          for (let name in meta.members) {
            let data = meta.members[name];

            if (data.type == "function") {
              let obj = new qxl.apiviewer.dao.Method(data, this, name);

              if (data.mixin) {
                this._mixinMembers.push(obj);
              } else {
                this._members.push(obj);
              }
            }
          }
        }

        this._properties = [];
        this._mixinProperties = [];

        if (meta.properties) {
          for (let name in meta.properties) {
            let data = meta.properties[name];
            let obj = new qxl.apiviewer.dao.Property(data, this, name);

            if (data.mixin) {
              this._mixinProperties.push(obj);
            } else {
              this._properties.push(obj);
            }
          }
        }

        this._events = [];
        this._mixinEvents = [];

        if (meta.events) {
          for (let name in meta.events) {
            let data = meta.events[name];
            let obj = new qxl.apiviewer.dao.Event(data, this);

            if (data.mixin) {
              this._mixinEvents.push(obj);
            } else {
              this._events.push(obj);
            }
          }
        }

        this._childControls = [];
        let arr = this._jsdoc["@childControl"];

        if (arr) {
          arr.forEach(elem => {
            this._childControls.push(new qxl.apiviewer.dao.ChildControl(elem, this));
          });
        }

        var all = [];

        function findClasses(tmp) {
          let p = qxl.apiviewer.dao.Class.findClasses(tmp);
          return p.then(classes => {
            classes.forEach(item => {
              all.push(item);
            });
            return classes;
          });
        }

        this._superClass = null;
        this._superInterfaces = [];
        this._superMixins = [];

        if (this._meta.type == "interface") {
          all.push(findClasses(meta.superClass).then(arr => this._superInterfaces = arr));
        } else if (this._meta.type == "mixin") {
          all.push(findClasses(meta.superClass).then(arr => this._superMixins = arr));
        } else {
          all.push(findClasses(meta.superClass).then(arr => this._superClass = arr[0] || null));
        }

        this._interfaces = [];
        findClasses(meta.interfaces).then(arr => this._interfaces = arr);
        this._mixins = [];
        findClasses(meta.mixins).then(arr => this._mixins = arr);
        return qx.Promise.all(all);
      },
      getPackage: function getPackage() {
        return this._package;
      },

      /**
       * Get the name of the class.
       *
       * @return {String} name of the class
       */
      getName: function getName() {
        return this._className;
      },

      /**
       * Get the full name of the class, including the package name.
       *
       * @return {String} full name of the class
       */
      getFullName: function getFullName() {
        return this._className;
      },

      /**
       * Get the package name of the class.
       *
       * @return {String} package name of the class
       */
      getPackageName: function getPackageName() {
        return this._package.getFullName();
      },

      /**
       * Get type of the class. Valid types are "class", "interface" and "mixin".
       *
       * @return {String} The type of the class. Valid types are "class",
       *         "interface" and "mixin".
       */
      getType: function getType() {
        return this._meta.type;
      },

      /**
       * Get whether the class is abstract.
       *
       * @return {Boolean} Whether the class is abstract.
       */
      isAbstract: function isAbstract() {
        return this._meta.isAbstract || false;
      },

      /**
       * Get whether the class is a static class.
       *
       * @return {Boolean} Whether the class is static.
       */
      isStatic: function isStatic() {
        return this._meta.isStatic || false;
      },

      /**
       * Get whether the class is a singleton.
       *
       * @return {Boolean} Whether the class is a singleton.
       */
      isSingleton: function isSingleton() {
        return this._meta.isSingleton || false;
      },

      /**
       * Get the super class of the class.
       *
       * @return {qxl.apiviewer.dao.Class} The super class of the class.
       */
      getSuperClass: function getSuperClass() {
        return this._superClass;
      },

      /**
       * Get the direct child classes of the class.
       *
       * @return {qx.Promise(qxl.apiviewer.dao.Class[])} A list of direct child classes of the
       *         class.
       */
      getChildClasses: function getChildClasses() {
        if (!this._childClassesPromise) {
          if (this._meta.type == "class") {
            this._childClassesPromise = qxl.apiviewer.dao.Class.findClasses(this._meta.descendants);
          } else {
            this._childClassesPromise = qx.Promise.resolve([]);
          }
        }

        return this._childClassesPromise;
      },

      /**
       * Get all interfaces declared at the class declaration.
       *
       * @return {qxl.apiviewer.dao.Class[]} All interfaces declared at the class
       *         declaration.
       */
      getInterfaces: function getInterfaces() {
        return this._interfaces;
      },

      /**
       * Get all super interfaces. (Only for interfaces)
       *
       * @return {qxl.apiviewer.dao.Class[]} All super interfaces.
       */
      getSuperInterfaces: function getSuperInterfaces() {
        return this._superInterfaces;
      },

      /**
       * Get all mixins declared at the class declaration.
       *
       * @return {qxl.apiviewer.dao.Class[]} All mixins declared at the class
       *         declaration.
       */
      getMixins: function getMixins() {
        return this._mixins;
      },

      /**
       * Get all super mixins. (Only for mixins)
       *
       * @return {qxl.apiviewer.dao.Class[]} All super mixins.
       */
      getSuperMixins: function getSuperMixins() {
        return this._superMixins;
      },

      /**
       * Get all classes including this mixin. (Only for mixins)
       *
       * @return {qx.Promise(qxl.apiviewer.dao.Class[])} All classes including this mixin.
       */
      getIncluder: function getIncluder() {
        if (!this._includersPromise) {
          if (this._meta.type == "mixin") {
            this._includersPromise = qxl.apiviewer.dao.Class.findClasses(this._meta.descendants);
          } else {
            this._includersPromise = qx.Promise.resolve([]);
          }
        }

        return this._includersPromise;
      },

      /**
       * Get all implementations of this interface. (Only for interfaces)
       *
       * @return {qx.Promise(qxl.apiviewer.dao.Class[])} All implementations of this interface.
       */
      getImplementations: function getImplementations() {
        if (!this._implementationsPromise) {
          if (this._meta.type == "interface") {
            this._implementationsPromise = qxl.apiviewer.dao.Class.findClasses(this._meta.descendants);
          } else {
            this._implementationsPromise = qx.Promise.resolve([]);
          }
        }

        return this._implementationsPromise;
      },

      /**
       * Get the constructor of the class.
       *
       * @return {qxl.apiviewer.dao.Method} The constructor of the class.
       */
      getConstructor: function getConstructor() {
        return this._construct;
      },

      /**
       * Get all child controls
       *
       * @return {qxl.apiviewer.dao.ChildControl[]} All child controls.
       */
      getChildControls: function getChildControls() {
        return this._childControls;
      },

      /**
       * Get the members of the class.
       *
       * @return {qxl.apiviewer.dao.Method[]} The members of the class.
       * @deprecated Is this used any more????
       */
      getMembers: function getMembers() {
        return this._members;
      },

      /**
       * Get the members of the class.
       *
       * @return {qxl.apiviewer.dao.Method[]} The members of the class.
       */
      getMethods: function getMethods() {
        return this._members;
      },

      /**
       * Get the members of the class, contributed from mixins
       *
       * @return {qxl.apiviewer.dao.Method[]} The members of the class.
       * @deprecated Is this used any more????
       */
      getMixinMembers: function getMixinMembers() {
        return this._mixinMembers;
      },

      /**
       * Get the members of the class, contributed from mixins
       *
       * @return {qxl.apiviewer.dao.Method[]} The members of the class.
       */
      getMixinMethods: function getMixinMethods() {
        return this._mixinMembers;
      },

      /**
       * Get the statics of the class.
       *
       * @return {qxl.apiviewer.dao.Method[]} The statics of the class.
       */
      getStatics: function getStatics() {
        return this._staticMethods;
      },

      /**
       * Get the events of the class.
       *
       * @return {qxl.apiviewer.dao.Event[]} The events of the class.
       */
      getEvents: function getEvents() {
        return this._events;
      },

      /**
       * Get the events of the class, contributed from mixins
       *
       * @return {qxl.apiviewer.dao.Event[]} The events of the class.
       */
      getMixinEvents: function getMixinEvents() {
        return this._mixinEvents;
      },

      /**
       * Get the properties of the class.
       *
       * @return {qxl.apiviewer.dao.Property[]} The properties of the class.
       */
      getProperties: function getProperties() {
        return this._properties;
      },

      /**
       * Returns a property with a given name
       *
       * @return {qxl.apiviewer.dao.Property} The named property
       */
      getProperty: function getProperty(name) {
        for (var i = 0; i < this._properties.length; i++) {
          var prop = this._properties[i];

          if (prop.getName() == name) {
            return prop;
          }
        }

        return null;
      },

      /**
       * Get the properties of the class, contributed from mixins
       *
       * @return {qxl.apiviewer.dao.Property[]} The properties of the class.
       */
      getMixinProperties: function getMixinProperties() {
        return this._mixinProperties;
      },

      /**
       * Get the constants of the class.
       *
       * @return {qxl.apiviewer.dao.Constant[]} The constants of the class.
       */
      getConstants: function getConstants() {
        return this._constants;
      },

      /**
       * Get all references declared using the "see" attribute.
       *
       * @return {String[]} A list of all references declared using the "see" attribute.
       */
      getSee: function getSee() {
        return (this._jsdoc["@see"] || []).map(item => item.body);
      },
      getErrors: function getErrors() {
        return [];
      },

      /* COMPLEX FUNCTIONS */

      /**
       * Get the documentation nodes of all classes in the inheritance chain of a
       * class. The first entry in the list is the class itself.
       *
       * @param includeNativeObjects
       *          {Boolean} true if you want to get native JS objects too
       * @return {qxl.apiviewer.dao.Class[]} array of super classes of the given
       *         class.
       */
      getClassHierarchy: function getClassHierarchy(includeNativeObjects) {
        var result = [];

        for (var currentClass = this; currentClass; currentClass = currentClass.getSuperClass()) {
          var isNative = qxl.apiviewer.dao.Class.isNativeObject(currentClass);

          if (!isNative || includeNativeObjects) {
            result.push(currentClass);
          }

          if (isNative) {
            break;
          }
        }

        return result;
      },

      /**
       * Get the documentation nodes of all interfaces in the inheritance chain of
       * an interface. The first entry in the list is the interface itself.
       *
       * @return {qxl.apiviewer.dao.Class[]} array of super interfaces of the given
       *         interface.
       */
      getInterfaceHierarchy: function getInterfaceHierarchy() {
        var currentClass = this;
        var result = [];

        function add(currentClass) {
          result.push(currentClass);
          currentClass.getSuperInterfaces().forEach(itf => add(itf));
        }

        add(this);
        return result;
      },

      /**
       * Returns a list of all interfaces the class implements directly.
       *
       * @param includeSuperClasses
       *          {Boolean?false} Whether the interfaces of all super classes
       *          should be returned as well.
       */
      getAllInterfaces: function getAllInterfaces(includeSuperClasses) {
        var interfaceNodes = [];

        let ifaceRecurser = ifaceNode => {
          interfaceNodes.push(ifaceNode);
          ifaceNode.getSuperInterfaces().forEach(ifaceRecurser);
        };

        var classNodes = includeSuperClasses ? this.getClassHierarchy() : [this];
        classNodes.forEach(classNode => (classNode.getInterfaces() || []).forEach(ifaceRecurser));
        return interfaceNodes;
      },

      /**
       * Return a class item matching the given name.
       *
       * @param itemName
       *          {String} name of the class item
       * @return {qxl.apiviewer.dao.ClassItem} the class item.
       */
      getItemByNameFromMixins: function getItemByNameFromMixins(itemName) {
        return this._mixinMembers[itemName] || this._mixinProperties[itemName] || this._mixinEvents[itemName] || null;
      },

      /**
       * Return a class item matching the given name.
       *
       * @param itemName {String} name of the class item
       * @return {qxl.apiviewer.dao.ClassItem} the class item.
       */
      getItem: function getItem(itemName) {
        var itemListNames = ["getMembers", "getStatics", "getEvents", "getProperties", "getConstants", // "getAppearances",
        "getChildControls"];

        for (var i = 0; i < itemListNames.length; i++) {
          var list = this[itemListNames[i]]();

          if (list) {
            for (var j = 0; j < list.length; j++) {
              if (itemName == list[j].getName()) {
                return list[j];
              }
            }
          }
        }

        return null;
      },
      loadDependedClasses: function loadDependedClasses() {
        return qxl.apiviewer.ClassLoader.loadClassList(this.getDependedClasses());
      },

      /**
       * Return a list of all classes, mixins and interfaces this class depends
       * on. This includes all super classes and their mixins/interfaces and the
       * class itself.
       *
       * @return {qx.Promise(Class[])} array of dependent classes.
       */
      getDependedClasses: function getDependedClasses() {
        let foundClasses = [];

        function findClasses(clazz) {
          if (qxl.apiviewer.dao.Class.isNativeObject(clazz)) {
            return;
          }

          return clazz.load().then(() => {});
          foundClasses.push(clazz);
          clazz.getSuperClass() && findClasses(clazz.getSuperClass());
          clazz.getMixins().forEach(mixin => findClasses);
          clazz.getSuperMixins().forEach(mixin => findClasses);
          clazz.getInterfaces().forEach(mixin => findClasses);
          clazz.getSuperInterfaces().forEach(mixin => findClasses);
        }

        findClasses(this);
        return foundClasses;
      }
    },
    statics: {
      _native_classes: {
        "Array": Array,
        "Boolean": Boolean,
        "Date": Date,
        "Error": Error,
        "Function": Function,
        "Math": Math,
        "Number": Number,
        "Object": Object,
        "RegExp": RegExp,
        "String": String
      },

      /**
       * Get a class documentation by the class name.
       *
       * @param className
       *          {String} name of the class
       * @return {qxl.apiviewer.dao.Class} The class documentation
       */
      getClassByName: function getClassByName(className, create) {
        var nativeClass = qxl.apiviewer.dao.Class._native_classes[className];

        if (nativeClass !== undefined) {
          return nativeClass;
        }

        var pkg = qxl.apiviewer.dao.Package.getParentPackage(className);

        if (!pkg) {
          throw new Error("Cannot find a package for " + className);
        }

        var cls = pkg.getClassByName(className);

        if (!cls && create) {
          cls = new qxl.apiviewer.dao.Class(className);
        }

        return cls;
      },

      /**
       * Get a class documentation by the class name.
       *
       * @param className
       *          {String} name of the class
       * @return {qxl.apiviewer.dao.Class} The class documentation
       */
      getClassesByName: function getClassesByName(classNames, create) {
        classNames = qx.lang.Array.toNativeArray(classNames);
        var result = classNames.map(name => qxl.apiviewer.dao.Class.getClassByName(name, create));
        return result;
      },
      findClasses: function findClasses(name) {
        if (!name) {
          return qx.Promise.resolve([]);
        }

        var all = qx.lang.Array.toNativeArray(name).filter(name => !qxl.apiviewer.dao.Class._native_classes[name]).map(name => {
          let c = qxl.apiviewer.dao.Class.getClassByName(name);

          if (c) {
            c.load();
          }

          return c;
        });
        return qx.Promise.all(all);
      },

      /**
       * Checks if the Class is a qooxdoo qxl.apiviewer.dao.Class Object or a native
       * one
       *
       * @param clazz
       *          {qxl.apiviewer.dao.Class} the object to be checked
       * @return {Boolean} true if it is a JS native object
       */
      isNativeObject: function isNativeObject(clazz) {
        return clazz.classname !== "qxl.apiviewer.dao.Class";
      }
    }
  });
  qxl.apiviewer.dao.Class.$$dbClassInfo = $$dbClassInfo;
})();

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
      "qxl.apiviewer.ClassLoader": {},
      "qxl.apiviewer.RequestUtil": {}
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
       * Fabian Jakobs (fjakobs)
  
  ************************************************************************ */
  qx.Class.define("qxl.apiviewer.dao.Package", {
    extend: qx.core.Object,
    construct: function construct(packageName) {
      qx.core.Object.constructor.call(this);
      this._packageName = packageName;
      this._classes = {};
      this._packages = {};

      if (packageName) {
        this._parentPackage = qxl.apiviewer.dao.Package.getParentPackage(packageName);

        this._parentPackage.addPackage(this);
      }
    },
    members: {
      _packageName: null,
      _parentPackage: null,
      _classes: null,
      _packages: null,
      _loadingPromise: null,
      _loaded: false,

      /**
       * Loads the class
       *
       * @return {Promise}
       */
      load: function load() {
        if (this._loadingPromise) {
          return this._loadingPromise;
        }

        var url = qxl.apiviewer.ClassLoader.getBaseUri() + "/transpiled/" + this._packageName.replace(/\./g, "/") + "/package.html";
        return this._loadingPromise = qxl.apiviewer.RequestUtil.get(url).then(content => {
          this._desc = content;
          this._loaded = true;
        }).catch(e => {
          console.error("Couldn't load file: " + url + " " + e.message);
          this._loaded = true;
        });
      },
      isLoaded: function isLoaded() {
        return this._loaded;
      },
      getName: function getName() {
        return this._packageName;
      },
      getFullName: function getFullName() {
        return this._packageName;
      },
      getDescription: function getDescription() {
        return this._desc || "";
      },
      getClasses: function getClasses() {
        return Object.values(this._classes);
      },
      getPackages: function getPackages() {
        return Object.values(this._packages);
      },
      getPackage: function getPackage() {
        return this._parentPackage;
      },
      addClass: function addClass(clazz) {
        this._classes[clazz.getFullName()] = clazz;
      },
      getClassByName: function getClassByName(name) {
        return this._classes[name];
      },
      getPackageByName: function getPackageByName(name) {
        return this._packages[name];
      },
      addPackage: function addPackage(pkg) {
        this._packages[pkg.getFullName()] = pkg;
      },
      loadDependedClasses: function loadDependedClasses() {
        return qxl.apiviewer.ClassLoader.loadClassList(this.getClasses());
      },
      hasWarning: function hasWarning() {
        return false;
      }
    },
    statics: {
      __rootPackage__P_602_0: null,

      /**
       * Locates a package by name
       *
       * @param name {String} package name, null or "" for top level
       * @return {Package?}
       */
      getPackage: function getPackage(name, create) {
        var root = qxl.apiviewer.dao.Package.__rootPackage__P_602_0;

        if (!root) {
          root = qxl.apiviewer.dao.Package.__rootPackage__P_602_0 = new qxl.apiviewer.dao.Package("");
        }

        if (!name) {
          return root;
        }

        var current = root;
        var segs = name.split(".");
        var parentName = "";

        for (var i = 0; i < segs.length; i++) {
          var tmp = current.getPackageByName(parentName + segs[i]);

          if (!tmp) {
            if (!create) {
              return null;
            }

            tmp = new qxl.apiviewer.dao.Package(i == 0 ? segs[i] : current.getFullName() + "." + segs[i]);
          }

          current = tmp;
          parentName += segs[i] + ".";
        }

        return current;
      },

      /**
       * Returns the package that a given package or class is a direct child of
       *
       * @param name {String} the name
       * @return {Package} the package
       */
      getParentPackage: function getParentPackage(name) {
        if (!name) {
          throw new Error("Cannot get the parent package of a root package");
        }

        var pos = name.lastIndexOf(".");

        if (pos < 0) {
          return qxl.apiviewer.dao.Package.getPackage("");
        }

        var parentName = name.substring(0, pos);
        return qxl.apiviewer.dao.Package.getPackage(parentName, true);
      }
    }
  });
  qxl.apiviewer.dao.Package.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.core.Object": {
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  qx.Class.define("qxl.apiviewer.UiModel", {
    extend: qx.core.Object,
    type: "singleton",
    properties: {
      /** whether to display inherited items */
      showInherited: {
        check: "Boolean",
        init: false,
        event: "changeShowInherited"
      },

      /** whether to display included items */
      showIncluded: {
        check: "Boolean",
        init: true,
        event: "changeShowIncluded"
      },

      /** whether to display protected items */
      expandProperties: {
        check: "Boolean",
        init: false,
        event: "changeExpandProperties"
      },

      /** whether to display protected items */
      showProtected: {
        check: "Boolean",
        init: false,
        event: "changeShowProtected"
      },

      /** whether to display private items */
      showPrivate: {
        check: "Boolean",
        init: false,
        event: "changeShowPrivate"
      },

      /** whether to display internal items */
      showInternal: {
        check: "Boolean",
        init: false,
        event: "changeShowInternal"
      }
    }
  });
  qxl.apiviewer.UiModel.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.core.Object": {
        "require": true
      },
      "qx.ui.core.Blocker": {
        "construct": true
      },
      "qxl.apiviewer.MWidgetRegistry": {
        "construct": true
      },
      "qx.html.Element": {
        "construct": true
      },
      "qx.util.ResourceManager": {
        "construct": true
      }
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
       * Fabian Jakobs (fjakobs)
  
  ************************************************************************ */
  qx.Class.define("qxl.apiviewer.LoadingIndicator", {
    type: "singleton",
    extend: qx.core.Object,
    construct: function construct() {
      this.__blocker__P_603_0 = new qx.ui.core.Blocker(qxl.apiviewer.MWidgetRegistry.getWidgetById("tabView"));

      this.__blocker__P_603_0.setColor("#D5D5D5");

      this.__blocker__P_603_0.setOpacity(0.5);

      this.__blocker__P_603_0.getBlockerElement().setStyle("padding-top", "100px");

      this.__blocker__P_603_0.getBlockerElement().setStyle("text-align", "center");

      var loadingImage = new qx.html.Element("img");
      loadingImage.setAttribute("src", qx.util.ResourceManager.getInstance().toUri("qxl/apiviewer/image/loading66.gif"));

      this.__blocker__P_603_0.getBlockerElement().add(loadingImage);
    },
    members: {
      __blocker__P_603_0: null,
      show: function show() {
        this.__blocker__P_603_0.block();
      },
      hide: function hide() {
        this.__blocker__P_603_0.unblock();
      }
    }
  });
  qxl.apiviewer.LoadingIndicator.$$dbClassInfo = $$dbClassInfo;
})();

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
       2004-2008 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Til Schneider (til132)
       * Sebastian Werner (wpbasti)
       * Andreas Ecker (ecker)
       * Fabian Jakobs (fjakobs)
  
  ************************************************************************ */

  /**
   * A util class for handling the documentation tree.
   *
   * @ignore(qxl.apiviewer.dao)
   */
  qx.Class.define("qxl.apiviewer.TreeUtil", {
    extend: qx.core.Object,

    /*
    *****************************************************************************
     CONSTRUCTOR
    *****************************************************************************
    */
    construct: function construct() {
      qx.core.Object.constructor.call(this);
    },

    /*
    *****************************************************************************
     STATICS
    *****************************************************************************
    */
    statics: {
      /**
       * Gets the child of a doc node having a certain type.
       *
       * @param docNode {Map} the doc node to get the child of.
       * @param childType {String} the type of the child to get.
       * @return {Map} the wanted child or <code>null</code> if <code>docNode</code>
       *           is <code>null</code> or has no such child.
       */
      getChild: function getChild(docNode, childType) {
        if (docNode != null && docNode.children != null) {
          for (var i = 0; i < docNode.children.length; i++) {
            if (docNode.children[i].type == childType) {
              return docNode.children[i];
            }
          }
        }

        return null;
      },

      /**
       * Gets the child of a doc node having a certain attribute value.
       *
       * @param docNode {Map} the doc node to get the child of.
       * @param attributeName {String} the name of the attribute the wanted child must have.
       * @param attributeValue {String} the value of the attribute the wanted child must have.
       * @return {Map} the wanted child or <code>code</code> if there is no such child.
       */
      getChildByAttribute: function getChildByAttribute(docNode, attributeName, attributeValue) {
        if (docNode.children != null) {
          for (var i = 0; i < docNode.children.length; i++) {
            var node = docNode.children[i];

            if (node.attributes && node.attributes[attributeName] == attributeValue) {
              return node;
            }
          }
        }

        return null;
      },

      /**
       * Gets the icon URL of a doc node.
       *
       * @param node {Map} the node to get the icon for.
       * @param inherited {Boolean? false} whether the node was inherited.
       * @return {var} the URL of the icon. May be a string or an array of string
       *           (in case of an overlay icon).
       * @throws {Error} If node is of an unknown type.
       */
      getIconUrl: function getIconUrl(node, inherited) {
        var constName;
        var dao = qxl.apiviewer.dao;

        if (node instanceof dao.Package) {
          constName = "ICON_PACKAGE";
        } else if (node instanceof dao.Class) {
          switch (node.getType()) {
            case "mixin":
              constName = "ICON_MIXIN";
              break;

            case "interface":
              constName = "ICON_INTERFACE";
              break;

            default:
              constName = "ICON_CLASS";

              if (node.isStatic()) {
                constName += "_STATIC";
              } else if (node.isAbstract()) {
                constName += "_ABSTRACT";
              } else if (node.isSingleton()) {
                constName += "_SINGLETON";
              }

          }
        } else if (node instanceof dao.Property) {
          constName = "ICON_PROPERTY";

          if (node.isPublic()) {
            constName += "_PUB";
          } else if (node.isProtected()) {
            constName += "_PROT";
          } else if (node.isPrivate()) {
            constName += "_PRIV";
          } else if (node.isInternal()) {
            constName += "_INTERN";
          }

          if (node.isThemeable()) {
            constName += "_THEMEABLE";
          }
        } else if (node instanceof dao.Event) {
          constName = "ICON_EVENT";
        } else if (node instanceof dao.Method) {
          if (node.isConstructor()) {
            var constName = "ICON_CTOR";
          } else {
            constName = "ICON_METHOD";

            if (node.isPublic()) {
              constName += "_PUB";
            } else if (node.isProtected()) {
              constName += "_PROT";
            } else if (node.isPrivate()) {
              constName += "_PRIV";
            } else if (node.isInternal()) {
              constName += "_INTERN";
            }
          }

          if (node.isStatic()) {
            constName += "_STATIC";
          } else if (node.isAbstract()) {
            constName += "_ABSTRACT";
          }

          if (node.getClass().getType() == "mixin") {
            constName += "_MIXIN";
          }
        } else if (node instanceof dao.Constant) {
          constName = "ICON_CONSTANT";
        } else if (node instanceof dao.ChildControl) {
          constName = "ICON_CHILDCONTROL";
        } else {} //        throw new Error("Unknown node type: " + (node.type || node.name));

        /*
        if (node.attributes.isMixin) {
          constName += "_MIXIN";
        }
        */


        if (node instanceof dao.ClassItem) {
          if (inherited) {
            constName += "_INHERITED";
          } else if (node.getOverriddenFrom && node.getOverriddenFrom()) {
            constName += "_OVERRIDDEN";
          }

          if (node.getErrors().length > 0) {
            constName += "_ERROR";
          }
        }

        if (node.hasWarning ? node.hasWarning() : false) {
          constName += "_WARN";
        }

        return qxl.apiviewer.TreeUtil.iconNameToIconPath(constName);
      },
      iconNameToIconPath: function iconNameToIconPath(iconName) {
        if (!iconName) {
          return "";
        }

        var iconUrl = qxl.apiviewer.TreeUtil[iconName];

        if (!iconUrl) {
          var iconParts = iconName.split("_");
          var itemName = iconParts[0] + "_" + iconParts[1];

          if (iconParts[2] == "PUB" || iconParts[2] == "PROT" || iconParts[2] == "PRIV" || iconParts[2] == "INTERN") {
            itemName += "_" + iconParts[2];
            var startIndex = 3;
          } else {
            startIndex = 2;
          }

          iconUrl = [qxl.apiviewer.TreeUtil[itemName]];

          if (iconUrl[0] == null) {
            throw new Error("Unknown img constant: " + itemName);
          }

          for (var i = startIndex; i < iconParts.length; i++) {
            var iconPart = qxl.apiviewer.TreeUtil["OVERLAY_" + iconParts[i]];

            if (iconPart == null) {
              throw new Error("Unknown img constant: OVERLAY_" + iconParts[i]);
            }

            iconUrl.push(iconPart);
          }
        }

        return iconUrl;
      },

      /** {string} The URL of the blank icon. */
      ICON_BLANK: "qxl/apiviewer/image/blank.gif",

      /** {string} The URL of the overlay "abstract". */
      OVERLAY_ABSTRACT: "qxl/apiviewer/image/overlay_abstract18.gif",

      /** {string} The URL of the overlay "error". */
      OVERLAY_ERROR: "qxl/apiviewer/image/overlay_error18.gif",

      /** {string} The URL of the overlay "inherited". */
      OVERLAY_INHERITED: "qxl/apiviewer/image/overlay_inherited18.gif",

      /** {string} The URL of the overlay "overridden". */
      OVERLAY_OVERRIDDEN: "qxl/apiviewer/image/overlay_overridden18.gif",

      /** {string} The URL of the overlay "themeable". */
      OVERLAY_THEMEABLE: "qxl/apiviewer/image/overlay_themeable18.gif",

      /** {string} The URL of the overlay "static". */
      OVERLAY_STATIC: "qxl/apiviewer/image/overlay_static18.gif",

      /** {string} The URL of the overlay "warning". */
      OVERLAY_WARN: "qxl/apiviewer/image/overlay_warning18.gif",

      /** {string} The URL of the overlay "mixin". */
      OVERLAY_MIXIN: "qxl/apiviewer/image/overlay_mixin18.gif",

      /** {string} The icon URL of a package. */
      ICON_PACKAGE: "qxl/apiviewer/image/package18.gif",

      /** {string} The icon URL of a package with warning. */
      ICON_PACKAGE_WARN: "qxl/apiviewer/image/package_warning18.gif",

      /** {string} The icon URL of a class. */
      ICON_CLASS: "qxl/apiviewer/image/class18.gif",

      /** {string} The icon URL of a class with warning. */
      ICON_CLASS_WARN: "qxl/apiviewer/image/class_warning18.gif",

      /** {string} The icon URL of a class with error. */
      ICON_CLASS_ERROR: "qxl/apiviewer/image/class_warning18.gif",

      /** {string} The icon URL of a static class. */
      ICON_CLASS_STATIC: "qxl/apiviewer/image/class_static18.gif",

      /** {string} The icon URL of a static class with warning. */
      ICON_CLASS_STATIC_WARN: "qxl/apiviewer/image/class_static_warning18.gif",

      /** {string} The icon URL of a static class with error. */
      ICON_CLASS_STATIC_ERROR: "qxl/apiviewer/image/class_static_warning18.gif",

      /** {string} The icon URL of an abstract class. */
      ICON_CLASS_ABSTRACT: "qxl/apiviewer/image/class_abstract18.gif",

      /** {string} The icon URL of an abstract class with warning. */
      ICON_CLASS_ABSTRACT_WARN: "qxl/apiviewer/image/class_abstract_warning18.gif",

      /** {string} The icon URL of an abstract class with error. */
      ICON_CLASS_ABSTRACT_ERROR: "qxl/apiviewer/image/class_abstract_warning18.gif",

      /** {string} The icon URL of an singleton class. */
      ICON_CLASS_SINGLETON: "qxl/apiviewer/image/class_singleton18.gif",

      /** {string} The icon URL of an singleton class with warning. */
      ICON_CLASS_SINGLETON_WARN: "qxl/apiviewer/image/class_singleton_warning18.gif",

      /** {string} The icon URL of an singleton class with error. */
      ICON_CLASS_SINGLETON_ERROR: "qxl/apiviewer/image/class_singleton_warning18.gif",

      /** {string} The icon URL of a property. */
      ICON_PROPERTY_PUB: "qxl/apiviewer/image/property18.gif",

      /** {string} The icon URL of a protected property. */
      ICON_PROPERTY_PROT: "qxl/apiviewer/image/property_protected18.gif",

      /** {string} The icon URL of a private property. */
      ICON_PROPERTY_PRIV: "qxl/apiviewer/image/property_private18.gif",

      /** {string} The icon URL of a internal property. */
      ICON_PROPERTY_INTERN: "qxl/apiviewer/image/property_internal18.gif",

      /** {string} The icon URL of a themeable property. */
      ICON_PROPERTY_PUB_THEMEABLE: "qxl/apiviewer/image/property_themeable18.gif",

      /** {string} The icon URL of an event. */
      ICON_EVENT: "qxl/apiviewer/image/event18.gif",

      /** {string} The icon URL of an entry. Entry is a group property */
      ICON_ENTRY: "qxl/apiviewer/image/property18.gif",

      /** {string} The icon URL of an interface. */
      ICON_INTERFACE: "qxl/apiviewer/image/interface18.gif",

      /** {string} The icon URL of an interface. */
      ICON_INTERFACE_WARN: "qxl/apiviewer/image/interface_warning18.gif",

      /** {string} The icon URL of an mixin. */
      ICON_MIXIN: "qxl/apiviewer/image/mixin18.gif",

      /** {string} The icon URL of an mixin. */
      ICON_MIXIN_WARN: "qxl/apiviewer/image/mixin_warning18.gif",

      /** {string} The icon URL of a public method. */
      ICON_METHOD_PUB: "qxl/apiviewer/image/method_public18.gif",

      /** {string} The icon URL of a public inherited method. */
      ICON_METHOD_PUB_INHERITED: "qxl/apiviewer/image/method_public_inherited18.gif",

      /** {string} The icon URL of a constructor. */
      ICON_CTOR: "qxl/apiviewer/image/constructor18.gif",

      /** {string} The icon URL of a protected method. */
      ICON_METHOD_PROT: "qxl/apiviewer/image/method_protected18.gif",

      /** {string} The icon URL of a private method. */
      ICON_METHOD_PRIV: "qxl/apiviewer/image/method_private18.gif",

      /** {string} The icon URL of a internal method. */
      ICON_METHOD_INTERN: "qxl/apiviewer/image/method_internal18.gif",

      /** {string} The icon URL of a constant. */
      ICON_CONSTANT: "qxl/apiviewer/image/constant18.gif",

      /** {string} The icon URL of an appearance. */
      ICON_APPEARANCE: "qxl/apiviewer/image/constant18.gif",

      /** {string} The icon URL of a child control. */
      ICON_CHILDCONTROL: "qxl/apiviewer/image/childcontrol18.gif"
    },

    /*
    *****************************************************************************
     DEFER
    *****************************************************************************
    */
    defer: function defer(statics, members, properties) {
      /** {string[]} images to preload */
      statics.PRELOAD_IMAGES = [statics.ICON_INFO, statics.ICON_SEARCH, statics.OVERLAY_ABSTRACT, statics.OVERLAY_ERROR, statics.OVERLAY_INHERITED, statics.OVERLAY_OVERRIDDEN, statics.OVERLAY_STATIC, statics.OVERLAY_WARN, statics.OVERLAY_MIXIN, statics.OVERLAY_THEMEABLE, statics.ICON_PACKAGE, statics.ICON_PACKAGE_WARN, statics.ICON_CLASS, statics.ICON_CLASS_WARN, statics.ICON_CLASS_ERROR, statics.ICON_CLASS_STATIC, statics.ICON_CLASS_STATIC_WARN, statics.ICON_CLASS_STATIC_ERROR, statics.ICON_CLASS_ABSTRACT, statics.ICON_CLASS_ABSTRACT_WARN, statics.ICON_CLASS_ABSTRACT_ERROR, statics.ICON_CLASS_SINGLETON, statics.ICON_CLASS_SINGLETON_WARN, statics.ICON_CLASS_SINGLETON_ERROR, statics.ICON_PROPERTY_PUB, statics.ICON_PROPERTY_PROT, statics.ICON_PROPERTY_PRIV, statics.ICON_PROPERTY_INTERN, statics.ICON_PROPERTY_PUB_THEMEABLE, statics.ICON_EVENT, statics.ICON_INTERFACE, statics.ICON_INTERFACE_WARN, statics.ICON_MIXIN, statics.ICON_MIXIN_WARN, statics.ICON_METHOD_PUB, statics.ICON_METHOD_PUB_INHERITED, statics.ICON_CTOR, statics.ICON_METHOD_PROT, statics.ICON_METHOD_PRIV, statics.ICON_METHOD_INTERN, statics.ICON_CONSTANT, statics.ICON_CHILDCONTROL];
    }
  });
  qxl.apiviewer.TreeUtil.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.tabview.Page": {
        "construct": true,
        "require": true
      },
      "qx.ui.layout.Canvas": {
        "construct": true
      },
      "qxl.apiviewer.TreeUtil": {},
      "qx.event.Timer": {},
      "qxl.apiviewer.UiModel": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2004-2010 1&1 Internet AG, Germany, http://www.1und1.de
       2018 Zenesis Limited, http://www.zenesis.com
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Christian Hagendorn (chris_schmidt)
       * John Spackman (johnspackman) of Zenesis Ltd (http://www.zenesis.com)
  
  ************************************************************************ */
  qx.Class.define("qxl.apiviewer.ui.tabview.AbstractPage", {
    extend: qx.ui.tabview.Page,
    type: "abstract",
    construct: function construct() {
      qx.ui.tabview.Page.constructor.call(this);
      this.setLayout(new qx.ui.layout.Canvas());
      this.setShowCloseButton(true);
      this._bindings = [];
      this._viewer = this._createViewer(); // while using edge 0, we need to set the padding to 0 as well [BUG #4688]

      this.add(this._viewer, {
        edge: 0
      });
      this.setPadding(0);

      this.__bindViewer__P_604_0(this._viewer);
    },
    properties: {
      classNode: {
        apply: "_applyClassNode",
        async: true
      }
    },
    members: {
      _viewer: null,
      _bindings: null,
      _createViewer: function _createViewer() {
        throw new Error("Abstract method call!");
      },
      _applyClassNode: function _applyClassNode(value, old) {
        return this._viewer.setDocNodeAsync(value).then(() => {
          this.setLabel(value.getFullName());
          this.setIcon(qxl.apiviewer.TreeUtil.getIconUrl(value));
          this.setUserData("nodeName", value.getFullName());
          qx.event.Timer.once(function (e) {
            this._viewer.getContentElement().scrollToY(0);
          }, this, 0);
        });
      },
      __bindViewer__P_604_0: function __bindViewer__P_604_0(viewer) {
        var uiModel = qxl.apiviewer.UiModel.getInstance();
        var bindings = this._bindings;
        bindings.push(uiModel.bind("showInherited", viewer, "showInherited"));
        bindings.push(uiModel.bind("showIncluded", viewer, "showIncluded"));
        bindings.push(uiModel.bind("expandProperties", viewer, "expandProperties"));
        bindings.push(uiModel.bind("showProtected", viewer, "showProtected"));
        bindings.push(uiModel.bind("showPrivate", viewer, "showPrivate"));
        bindings.push(uiModel.bind("showInternal", viewer, "showInternal"));
      },
      __removeBinding__P_604_1: function __removeBinding__P_604_1() {
        var uiModel = qxl.apiviewer.UiModel.getInstance();
        var bindings = this._bindings;

        while (bindings.length > 0) {
          var id = bindings.pop();
          uiModel.removeBinding(id);
        }
      }
    },
    destruct: function destruct() {
      this.__removeBinding__P_604_1();

      this._viewer.destroy();

      this._viewer = null;
    }
  });
  qxl.apiviewer.ui.tabview.AbstractPage.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qxl.apiviewer.ui.tabview.AbstractPage": {
        "require": true
      },
      "qxl.apiviewer.ui.PackageViewer": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2004-2010 1&1 Internet AG, Germany, http://www.1und1.de
       2018 Zenesis Limited, http://www.zenesis.com
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Christian Hagendorn (chris_schmidt)
       * John Spackman (johnspackman) of Zenesis Ltd (http://www.zenesis.com)
  
  ************************************************************************ */

  /**
   * Implements the dynamic behavior of the API viewer.
   * The GUI is defined in {@link Viewer}.
   */
  qx.Class.define("qxl.apiviewer.ui.tabview.PackagePage", {
    extend: qxl.apiviewer.ui.tabview.AbstractPage,
    members: {
      _createViewer: function _createViewer() {
        return new qxl.apiviewer.ui.PackageViewer();
      }
    }
  });
  qxl.apiviewer.ui.tabview.PackagePage.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qxl.apiviewer.ui.tabview.AbstractPage": {
        "require": true
      },
      "qxl.apiviewer.ui.ClassViewer": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2004-2010 1&1 Internet AG, Germany, http://www.1und1.de
       2018 Zenesis Limited, http://www.zenesis.com
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Christian Hagendorn (chris_schmidt)
       * John Spackman (johnspackman) of Zenesis Ltd (http://www.zenesis.com)
  
  ************************************************************************ */
  qx.Class.define("qxl.apiviewer.ui.tabview.ClassPage", {
    extend: qxl.apiviewer.ui.tabview.AbstractPage,
    members: {
      _createViewer: function _createViewer() {
        return new qxl.apiviewer.ui.ClassViewer();
      }
    }
  });
  qxl.apiviewer.ui.tabview.ClassPage.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.core.Object": {
        "require": true
      },
      "qx.Promise": {},
      "qx.io.remote.Request": {}
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
       * Fabian Jakobs (fjakobs)
  
  ************************************************************************ */
  qx.Class.define("qxl.apiviewer.RequestUtil", {
    extend: qx.core.Object,
    statics: {
      get: function get(url, opts) {
        return new qx.Promise((resolve, reject) => {
          var req = new qx.io.remote.Request(url);
          req.setAsynchronous(true);
          req.setTimeout(180000);
          req.setProhibitCaching(false);

          if (opts) {
            req.set(opts);
          }

          req.addListener("completed", evt => {
            resolve(evt.getContent());
          });
          req.addListener("failed", () => reject());
          req.addListener("aborted", () => reject());
          req.send();
        });
      }
    }
  });
  qxl.apiviewer.RequestUtil.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qxl.apiviewer.dao.Node": {
        "construct": true,
        "require": true
      },
      "qxl.apiviewer.dao.Class": {}
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
       * Fabian Jakobs (fjakobs)
  
  ************************************************************************ */

  /**
   * This Class wraps the access to the documentation data of a class item.
   */
  qx.Class.define("qxl.apiviewer.dao.ClassItem", {
    extend: qxl.apiviewer.dao.Node,

    /**
    * @param classDocNode {Map} class documentation node
    * @param parentClass {qxl.apiviewer.dao.Class} reference to the class this item belongs to
    * @param name {String} name of the list in the JSON structure of the class
    */
    construct: function construct(meta, parentClass, name) {
      qxl.apiviewer.dao.Node.constructor.call(this, meta);
      this._class = parentClass;
      this._name = name;
    },
    members: {
      _class: null,
      _name: null,

      /**
       * Get the class, this item belongs to
       *
       * @return {qxl.apiviewer.dao.Class} the class this item belongs to
       */
      getClass: function getClass() {
        return this._class;
      },

      /**
       * Get the name of the item.
       *
       * @return {String} name of the item
       */
      getName: function getName() {
        return this._name;
      },
      getFullName: function getFullName() {
        return this.getClass().getFullName() + "#" + this._name;
      },

      /**
       * Get the types of the item.
       *
       * @return {Map[]} Array of types of the item. A type has the keys 'type' and 'dimensions', where
       * dimensions is the number of array dimensions (eg "Integer[][]" has a type of "Integer" and
       * dimensions of 2, and "Integer" has type if "Integer" but dimensions is undefined
       */
      getTypes: function getTypes() {
        var result = [];
        var arr = this._jsdoc["@param"];

        if (arr) {
          arr.map(item => {
            var result = {
              type: item.type
            };

            if (result.type) {
              var dims = result.type.match(/\[\]/g);

              if (dims) {
                result.dimensions = dims.length;
              }
            }

            return result;
          });
        }

        return result;
      },

      /**
       * Get all references declared using the "see" attribute.
       *
       * @return {String[]} A list of all references declared using the "see" attribute.
       */
      getSee: function getSee() {
        return (this._jsdoc["@see"] || []).map(item => item.body);
      },

      /**
       * If the item is overwridden from one of the super classes, get the item, which is overwridden.
       *
       * @return {ClassItem} the overwridden class item
       */
      getOverriddenFrom: function getOverriddenFrom() {
        return this._meta.overriddenFrom ? qxl.apiviewer.dao.Class.getClassByName(this._meta.overriddenFrom) : null;
      },

      /**
       * Checks whether the node is required by the given interface.
       *
       * @param ifaceNode {qxl.apiviewer.dao.Class} interface to check for
       * @return {Boolean} whether the item is required by the interface.
       */
      isRequiredByInterface: function isRequiredByInterface(ifaceNode) {
        throw new Error("No implementation for " + this.classname + ".isRequiredByInterface");
      },

      /**
       * Get the interface this item is required by.
       *
       * @return {qxl.apiviewer.dao.Class} The interface this item is required by.
       */
      getRequiredBy: function getRequiredBy() {
        if (this._requiredBy) {
          return this._requiredBy;
        }

        var requiredBy = [];
        var interfaces = this.getClass().getAllInterfaces(true);

        for (var j = 0; j < interfaces.length; j++) {
          if (this.isRequiredByInterface(interfaces[j])) {
            requiredBy.push(interfaces[j]);
          }
        }

        this._requiredBy = requiredBy;
        return requiredBy;
      }
    },

    /*
    *****************************************************************************
      DESTRUCTOR
    *****************************************************************************
    */
    destruct: function destruct() {
      this._class = this._itemDocNode = this._requiredBy = this._see = this._types = null;
    }
  });
  qxl.apiviewer.dao.ClassItem.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qxl.apiviewer.dao.ClassItem": {
        "construct": true,
        "require": true
      },
      "qxl.apiviewer.dao.Param": {
        "construct": true
      },
      "qx.lang.String": {
        "construct": true
      }
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
       * Fabian Jakobs (fjakobs)
  
  ************************************************************************ */
  qx.Class.define("qxl.apiviewer.dao.Method", {
    extend: qxl.apiviewer.dao.ClassItem,
    construct: function construct(meta, clazz, name) {
      qxl.apiviewer.dao.ClassItem.constructor.call(this, meta, clazz, name);
      this._params = (this._jsdoc["@params"] || this._jsdoc["@param"] || []).map(item => new qxl.apiviewer.dao.Param(item, this));
      var arr = this._jsdoc["@return"];

      if (arr && arr.length) {
        this._return = new qxl.apiviewer.dao.Param(arr[0], this);
      }

      var arr = this._jsdoc["@throws"];
      this._throws = arr && arr.length ? new qxl.apiviewer.dao.Param(arr[0], this) : [];

      if (meta.property) {
        var m = name.match(/^(get|set|is)(.*)$/);

        if (m) {
          this._propertyName = qx.lang.String.firstLow(m[2]);
        }
      }

      this._applyFor = meta.applyFor || [];
    },
    members: {
      _params: null,
      _return: null,
      _throws: null,
      _propertyName: null,
      _applyFor: null,
      isStatic: function isStatic() {
        return this._meta.isStatic || false;
      },
      isAbstract: function isAbstract() {
        return this._meta.isAbstract || false;
      },
      isConstructor: function isConstructor() {
        return this.getName() == "construct";
      },
      isFromProperty: function isFromProperty() {
        return Boolean(this._meta.property);
      },

      /**
      * @Override
      */
      isDeprecated: function isDeprecated() {
        return qxl.apiviewer.dao.Method.prototype.isDeprecated.base.call(this) || this.getFromProperty() && this.getFromProperty().isDeprecated();
      },
      getParams: function getParams() {
        return this._params;
      },
      getReturn: function getReturn() {
        return this._return;
      },
      getThrows: function getThrows() {
        return this._throws;
      },
      getFromProperty: function getFromProperty() {
        return this._propertyName ? this.getClass().getProperty(this._propertyName) : null;
      },
      getApplyFor: function getApplyFor() {
        return this._applyFor;
      },

      /**
      * @Override
      */
      isRequiredByInterface: function isRequiredByInterface(iface) {
        return iface.getMethods().some(method => method.getName() == this.getName());
      }
    }
  });
  qxl.apiviewer.dao.Method.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qxl.apiviewer.dao.ClassItem": {
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
       2004-2008 1&1 Internet AG, Germany, http://www.1und1.de
       2018 Zenesis Limited, http://www.zenesis.com
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * John Spackman (johnspackman)
       * Fabian Jakobs (fjakobs)
  
  ************************************************************************ */
  qx.Class.define("qxl.apiviewer.dao.Constant", {
    extend: qxl.apiviewer.dao.ClassItem,
    construct: function construct(meta, clazz, name) {
      qxl.apiviewer.dao.ClassItem.constructor.call(this, meta, clazz, name);
      this._value = meta.value;
    },
    members: {
      _value: undefined,
      getValue: function getValue() {
        return this._value;
      }
    }
  });
  qxl.apiviewer.dao.Constant.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qxl.apiviewer.dao.ClassItem": {
        "construct": true,
        "require": true
      },
      "qxl.apiviewer.dao.Class": {},
      "qxl.apiviewer.ui.ClassViewer": {}
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
       * Fabian Jakobs (fjakobs)
  
  ************************************************************************ */

  /**
   * Represents a property
   *
      "paddingTop": {
        "location": {
          "start": {
            "line": 393,
            "column": 4
          },
          "end": {
            "line": 399,
            "column": 5
          }
        },
        "jsdoc": {
          "@description": [
            {
              "name": "@description",
              "body": "---------------------------------------------------------------------------\nPADDING\n---------------------------------------------------------------------------"
            },
            {
              "name": "@description",
              "body": "Padding of the widget (top)"
            }
          ]
        },
        "name": "paddingTop",
        "propertyType": "new",
        "themeable": true,
        "apply": "_applyPadding",
        "check": "Integer",
        "defaultValue": 0
      },
  
   */
  qx.Class.define("qxl.apiviewer.dao.Property", {
    extend: qxl.apiviewer.dao.ClassItem,
    construct: function construct(meta, clazz, name) {
      qxl.apiviewer.dao.ClassItem.constructor.call(this, meta, clazz, name);
    },
    members: {
      getTypes: function getTypes() {
        var result = [];

        if (this._meta.check) {
          result.push({
            type: this._meta.check
          });
        }

        return result;
      },

      /**
      * Returns the check attribute of the property definition if
      * the check attribute does not define an internal type or a
      * class. In this case use {@link #getTypes}.
      *
      * @return {String} the contents of the check attribute.
      */
      getCheck: function getCheck() {
        var check = this._meta.check;

        if (check && !qxl.apiviewer.dao.Class.getClassByName(check) && !qxl.apiviewer.ui.ClassViewer.PRIMITIVES[check]) {
          return check;
        }

        return null;
      },

      /**
      * @Override
      */
      isRequiredByInterface: function isRequiredByInterface(iface) {
        return iface.getProperties().some(method => method.getName() == this.getName());
      },
      getClassname: function getClassname() {
        return this._class.getName();
      },
      getPossibleValues: function getPossibleValues() {
        return this._meta.possibleValues || [];
      },
      getGroup: function getGroup() {
        return this._meta.group || [];
      },
      isPropertyGroup: function isPropertyGroup() {
        return Boolean(this._meta.group);
      },
      getType: function getType() {
        return this.getCheck();
      },
      getEvent: function getEvent() {
        return this._meta.event;
      },
      getApplyMethod: function getApplyMethod() {
        return this._meta.apply;
      },
      isNullable: function isNullable() {
        return Boolean(this._meta.nullable);
      },
      getDefaultValue: function getDefaultValue() {
        return this._meta.defaultValue;
      },
      isInheritable: function isInheritable() {
        return this._meta.inheritable || false;
      },
      isThemeable: function isThemeable() {
        return this._meta.themeable || false;
      },
      isRefined: function isRefined() {
        return this._meta.refine || false;
      }
    }
  });
  qxl.apiviewer.dao.Property.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qxl.apiviewer.dao.ClassItem": {
        "construct": true,
        "require": true
      },
      "qxl.apiviewer.dao.Class": {}
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
       * Fabian Jakobs (fjakobs)
  
  ************************************************************************ */
  qx.Class.define("qxl.apiviewer.dao.Event", {
    extend: qxl.apiviewer.dao.ClassItem,
    construct: function construct(meta, clazz) {
      qxl.apiviewer.dao.ClassItem.constructor.call(this, meta, clazz, meta.name);
      this._type = meta.type;
    },
    members: {
      getType: function getType() {
        return qxl.apiviewer.dao.Class.getClassByName(this._type);
      },
      getTypes: function getTypes() {
        if (this._type) {
          return [{
            type: this._type
          }];
        }

        return [];
      },

      /**
       * @Override
       */
      isRequiredByInterface: function isRequiredByInterface(iface) {
        return iface.getEvents().some(method => method.getName() == this.getName());
      }
    }
  });
  qxl.apiviewer.dao.Event.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qxl.apiviewer.dao.ClassItem": {
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
       2004-2008 1&1 Internet AG, Germany, http://www.1und1.de
       2018 Zenesis Limited, http://www.zenesis.com
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * John Spackman (johnspackman)
       * Daniel Wagner (d_wagner)
  
  ************************************************************************ */
  qx.Class.define("qxl.apiviewer.dao.ChildControl", {
    extend: qxl.apiviewer.dao.ClassItem,
    construct: function construct(meta, parentClass) {
      qxl.apiviewer.dao.ClassItem.constructor.call(this, meta, parentClass, meta.controlName);
    },
    members: {
      getDefaultValue: function getDefaultValue() {
        return "";
      }
    }
  });
  qxl.apiviewer.dao.ChildControl.$$dbClassInfo = $$dbClassInfo;
})();

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
      "qx.ui.embed.Html": {
        "construct": true,
        "require": true
      },
      "qxl.apiviewer.ObjectRegistry": {
        "construct": true
      },
      "qx.bom.client.Engine": {},
      "qx.dev.Tokenizer": {},
      "qx.util.StringBuilder": {},
      "qx.Promise": {},
      "qxl.apiviewer.LoadingIndicator": {},
      "qx.dom.Element": {},
      "qx.util.ResourceManager": {},
      "qxl.apiviewer.dao.Package": {}
    },
    "environment": {
      "provided": [],
      "required": {
        "engine.name": {
          "className": "qx.bom.client.Engine"
        }
      }
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
       * Til Schneider (til132)
       * Sebastian Werner (wpbasti)
       * Andreas Ecker (ecker)
       * Fabian Jakobs (fjakobs)
       * Jonathan Weiß (jonathan_rass)
       * John Spackman (johnspackman)
  
  ************************************************************************ */
  qx.Class.define("qxl.apiviewer.ui.AbstractViewer", {
    type: "abstract",
    extend: qx.ui.embed.Html,
    construct: function construct() {
      qx.ui.embed.Html.constructor.call(this);
      this._infoPanelHash = {};
      this._infoPanels = [];
      this.setOverflowX("auto");
      this.setOverflowY("auto");
      this.getContentElement().setStyle("-webkit-overflow-scrolling", "touch");
      this.getContentElement().setStyle("touch-action", "pan-y");
      this.getContentElement().setStyle("-ms-touch-action", "pan-y");
      this.setAppearance("detailviewer");
      this._infoPanelHash = {};
      this._infoPanels = [];
      qxl.apiviewer.ObjectRegistry.register(this);
    },
    properties: {
      /** The class to display */
      docNode: {
        init: null,
        nullable: true,
        apply: "_applyDocNode",
        async: true
      },

      /** whether to display inherited items */
      showInherited: {
        check: "Boolean",
        init: false,
        apply: "_updatePanelsWithInheritedMembers"
      },

      /** whether to display included items */
      showIncluded: {
        check: "Boolean",
        init: true,
        apply: "_updatePanelsWithInheritedMembers"
      },

      /** whether to display protected items */
      expandProperties: {
        check: "Boolean",
        init: false,
        apply: "_updatePanels"
      },

      /** whether to display protected items */
      showProtected: {
        check: "Boolean",
        init: false,
        apply: "_updatePanels"
      },

      /** whether to display private items */
      showPrivate: {
        check: "Boolean",
        init: false,
        apply: "_updatePanels"
      },

      /** whether to display internal items */
      showInternal: {
        check: "Boolean",
        init: false,
        apply: "_updatePanels"
      }
    },
    statics: {
      /**
       * Change the target of all external links inside the given element to open in a new browser window.
       *
       * @param el {Element} Root element
       */
      fixLinks: function fixLinks(el) {
        var a = el.getElementsByTagName("a");

        for (var i = 0; i < a.length; i++) {
          if (typeof a[i].href == "string" && a[i].href.indexOf("http://") == 0) {
            a[i].target = "_blank";
          }
        }
      },
      highlightCode: function highlightCode(el) {
        var pres = el.getElementsByTagName("pre");

        for (var i = 0; i < pres.length; i++) {
          var element = pres[i];

          if (element.className !== "javascript") {
            continue;
          }

          if (qx.core.Environment.get("engine.name") == "mshtml") {
            // IE parser treats html added to a pre tag like normal html and removes
            // the whitespaces. To prevent this we create a wrapper element, add
            // to its innerHTML the pre tag and the javaScript code and replace the
            // existing pre element with the wrapper element.
            var preWrapper = document.createElement("div");
            var content = element.textContent || element.innerText;
            preWrapper.innerHTML = "<pre class=\"javascript\">" + qx.dev.Tokenizer.javaScriptToHtml(content, true) + "</pre>";
            element.parentNode.replaceChild(preWrapper, element);
          } else {
            element.innerHTML = qx.dev.Tokenizer.javaScriptToHtml(element.textContent);
          }
        }
      }
    },
    members: {
      _infoPanelHash: null,
      _infoPanels: null,
      _init: function _init(pkg) {
        this.__initHtml__P_606_0();

        this.addListenerOnce("appear", () => this._syncHtml());
      },
      __initHtml__P_606_0: function __initHtml__P_606_0() {
        var html = new qx.util.StringBuilder();
        html.add("<div style=\"padding:24px;\">"); // Add title

        html.add("<h1></h1>"); // Add TOC

        html.add("<div class=\"tocContainer\"></div>"); // Add description

        html.add("<div>", "</div>"); // render panels

        var panels = this.getPanels();

        for (var i = 0; i < panels.length; i++) {
          var panel = panels[i];
          html.add(panel.getPanelHtml(this));
        }

        html.add("</div>");
        this.setHtml(html.get());
      },

      /**
       * Returns the HTML fragment for the title
       *
       * @abstract
       * @param classNode {qxl.apiviewer.dao.Class} the class documentation node for the title
       * @return {String} HTML fragment of the title
       */
      _getTitleHtml: function _getTitleHtml(classNode) {
        throw new Error("Abstract method called!");
      },
      _getTocHtml: function _getTocHtml(classNode) {
        throw new Error("Abstract method called!");
      },
      _getDescriptionHtml: function _getDescriptionHtml(classNode) {
        throw new Error("Abstract method called!");
      },

      /**
       * Initializes the content of the embedding DIV. Will be called by the
       * HtmlEmbed element initialization routine.
       *
       */
      _syncHtml: function _syncHtml() {
        var oldTitleElem = this._titleElem;
        var element = this.getContentElement().getDomElement().firstChild;
        var divArr = element.childNodes;
        var panels = this.getPanels();
        qxl.apiviewer.ui.AbstractViewer.fixLinks(element);
        this._titleElem = divArr[0];
        this._tocElem = divArr[1];
        this._classDescElem = divArr[2];

        for (var i = 0; i < panels.length; i++) {
          var panel = panels[i];
          panel.setElement(divArr[i + 3]);
        }

        if (oldTitleElem !== this._titleElem && this.getDocNode()) {
          this._applyDocNode(this.getDocNode());
        }
      },
      addInfoPanel: function addInfoPanel(panel) {
        this._infoPanelHash[panel.toHashCode()] = panel;

        this._infoPanels.push(panel);
      },
      getPanels: function getPanels() {
        return this._infoPanels;
      },
      getPanelFromHashCode: function getPanelFromHashCode(hashCode) {
        return this._infoPanelHash[hashCode];
      },

      /**
       * Updates all info panels
       *
       * @return {qx.Promise}
       */
      _updatePanels: function _updatePanels() {
        if (!this.getDocNode()) {
          return qx.Promise.resolve();
        }

        qxl.apiviewer.LoadingIndicator.getInstance().show();
        var panels = this.getPanels();
        var all = panels.map(panel => panel.update(this, this.getDocNode()));
        return qx.Promise.all(all).then(() => qxl.apiviewer.LoadingIndicator.getInstance().hide());
      },

      /**
       * Updates all info panels and TOC with items reflecting appearance/disappearance of panels
       * due to inherited members
       *
       * @return {qx.Promise}
       */
      _updatePanelsWithInheritedMembers: function _updatePanelsWithInheritedMembers() {
        if (!this.getDocNode()) {
          return qx.Promise.resolve();
        }

        return this._updatePanels().then(() => {
          if (this._tocElem) {
            qx.dom.Element.empty(this._tocElem);

            this._tocElem.appendChild(this._getTocHtml(this.getDocNode()));
          }
        });
      },

      /**
       * Shows the information about a class.
       *
       * @param classNode {qxl.apiviewer.dao.Class} the doc node of the class to show.
       */
      _applyDocNode: function _applyDocNode(classNode) {
        if (!this._titleElem) {
          return;
        }

        this._titleElem.innerHTML = this._getTitleHtml(classNode);
        qx.dom.Element.empty(this._tocElem);

        this._tocElem.appendChild(this._getTocHtml(classNode));

        return this._getDescriptionHtml(classNode).then(html => {
          this._classDescElem.innerHTML = html;
          qxl.apiviewer.ui.AbstractViewer.fixLinks(this._classDescElem);
          qxl.apiviewer.ui.AbstractViewer.highlightCode(this._classDescElem); // Refresh the info viewers

          return this._updatePanels();
        });
      },

      /**
       * Event handler. Called when the user tapped a button for showing/hiding the
       * body of an info panel.
       *
       * @param panelHashCode {Integer} hash code of the panel object.
       * @return {qx.Promise}
       */
      togglePanelVisibility: function togglePanelVisibility(panel) {
        try {
          panel.setIsOpen(!panel.getIsOpen());
          var imgElem = panel.getTitleElement().getElementsByTagName("img")[0];
          imgElem.src = qx.util.ResourceManager.getInstance().toUri(panel.getIsOpen() ? "qxl/apiviewer/image/close.gif" : "qxl/apiviewer/image/open.gif");
          return panel.update(this, this.getDocNode());
        } catch (exc) {
          this.error("Toggling info body failed", exc);
        }
      },

      /**
       * Sorts the nodes in place.
       *
       * @param nodeArr {qxl.apiviewer.dao.ClassItem[]} array of class items
       */
      sortItems: function sortItems(nodeArr) {
        let WEIGHT = ["qxl.apiviewer.dao.Package", "qxl.apiviewer.dao.Class"]; // Sort the nodeArr by name
        // Move protected methods to the end

        nodeArr.sort((obj1, obj2) => {
          if (obj1.classname != obj2.classname) {
            var w1 = WEIGHT.indexOf(obj1.classname);
            var w2 = WEIGHT.indexOf(obj2.classname);

            if (w1 < 0) {
              w1 = 999;
            }

            if (w2 < 0) {
              w2 = 999;
            }

            return w1 < w2 ? -1 : w1 > w2 ? 1 : 0;
          }

          if (obj1 instanceof qxl.apiviewer.dao.Package) {
            var n1 = obj1.getFullName().toLowerCase();
            var n2 = obj2.getFullName().toLowerCase();
            return n1 < n2 ? -1 : n1 > n2 ? 1 : 0;
          }

          var sum1 = 0;

          if (obj1.isInternal()) {
            sum1 += 4;
          }

          if (obj1.isPrivate()) {
            sum1 += 2;
          }

          if (obj1.isProtected()) {
            sum1 += 1;
          }

          var sum2 = 0;

          if (obj2.isInternal()) {
            sum2 += 4;
          }

          if (obj2.isPrivate()) {
            sum2 += 2;
          }

          if (obj2.isProtected()) {
            sum2 += 1;
          }

          if (sum1 == sum2) {
            var name1 = obj1.getName();
            var name2 = obj2.getName();
            return name1.toLowerCase() < name2.toLowerCase() ? -1 : 1;
          }

          return sum1 - sum2;
        });
      }
    }
  });
  qxl.apiviewer.ui.AbstractViewer.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.core.ObjectRegistry": {}
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
       * Fabian Jakobs (fjakobs)
  
  ************************************************************************ */
  qx.Class.define("qxl.apiviewer.ObjectRegistry", {
    statics: {
      __objectDb__P_610_0: {},
      register: function register(object) {
        var hash = qx.core.ObjectRegistry.toHashCode(object);
        this.__objectDb__P_610_0[hash] = object;
      },
      getObjectFromHashCode: function getObjectFromHashCode(hashCode) {
        return this.__objectDb__P_610_0[hashCode];
      }
    }
  });
  qxl.apiviewer.ObjectRegistry.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qxl.apiviewer.ui.AbstractViewer": {
        "construct": true,
        "require": true
      },
      "qxl.apiviewer.ui.panels.ClassPanel": {
        "construct": true
      },
      "qxl.apiviewer.ui.panels.PackagePanel": {
        "construct": true
      },
      "qxl.apiviewer.dao.Package": {
        "construct": true
      },
      "qx.util.StringBuilder": {},
      "qxl.apiviewer.ui.panels.InfoPanel": {},
      "qx.Promise": {}
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
       * Til Schneider (til132)
       * Sebastian Werner (wpbasti)
       * Andreas Ecker (ecker)
       * Fabian Jakobs (fjakobs)
       * Jonathan Weiß (jonathan_rass)
       * John Spackman (johnspackman)
  
  ************************************************************************ */

  /**
   * Shows the package details.
   */
  qx.Class.define("qxl.apiviewer.ui.PackageViewer", {
    extend: qxl.apiviewer.ui.AbstractViewer,

    /*
    *****************************************************************************
     CONSTRUCTOR
    *****************************************************************************
    */
    construct: function construct() {
      qxl.apiviewer.ui.AbstractViewer.constructor.call(this);
      this.addInfoPanel(new qxl.apiviewer.ui.panels.ClassPanel("class").set({
        type: "class"
      }));
      this.addInfoPanel(new qxl.apiviewer.ui.panels.ClassPanel("interface").set({
        type: "interface"
      }));
      this.addInfoPanel(new qxl.apiviewer.ui.panels.ClassPanel("mixin").set({
        type: "mixin"
      }));
      this.addInfoPanel(new qxl.apiviewer.ui.panels.PackagePanel("packages"));
      this.getContentElement().setAttribute("class", "ClassViewer");

      this._init(qxl.apiviewer.dao.Package.getPackage(null));
    },

    /*
    *****************************************************************************
     MEMBERS
    *****************************************************************************
    */
    members: {
      /**
       * Returns the HTML fragment for the title
       *
       * @param classNode {qxl.apiviewer.dao.Package} the package documentation node for the title
       * @return {String} HTML fragment of the title
       */
      _getTitleHtml: function _getTitleHtml(classNode) {
        var vHtml = ""; // Title

        vHtml += "<small>package</small>";
        vHtml += classNode.getFullName();
        return vHtml;
      },
      _getTocHtml: function _getTocHtml(classNode) {
        return document.createTextNode("");
      },
      _getDescriptionHtml: function _getDescriptionHtml(classNode) {
        var descHtml = new qx.util.StringBuilder();
        var desc = classNode.getDescription();

        if (desc != "") {
          descHtml.add("<div class=\"class-description\">", qxl.apiviewer.ui.panels.InfoPanel.resolveLinkAttributes(desc, classNode), "</div>");
        }

        return qx.Promise.resolve(descHtml.get());
      }
    }
  });
  qxl.apiviewer.ui.PackageViewer.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.module.event.GestureHandler": {
        "require": true
      },
      "qx.core.Environment": {
        "defer": "load",
        "require": true
      },
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qxl.apiviewer.ui.AbstractViewer": {
        "construct": true,
        "require": true
      },
      "qxl.apiviewer.ui.panels.ConstructorPanel": {
        "construct": true
      },
      "qxl.apiviewer.ui.panels.EventPanel": {
        "construct": true
      },
      "qxl.apiviewer.ui.panels.StaticMethodsPanel": {
        "construct": true
      },
      "qxl.apiviewer.ui.panels.ConstantPanel": {
        "construct": true
      },
      "qxl.apiviewer.ui.panels.PropertyPanel": {
        "construct": true
      },
      "qxl.apiviewer.ui.panels.MethodPanel": {
        "construct": true
      },
      "qxl.apiviewer.ui.panels.ChildControlsPanel": {
        "construct": true
      },
      "qx.util.ResourceManager": {},
      "qx.bom.client.Engine": {},
      "qxl.apiviewer.dao.Class": {},
      "qx.util.LibraryManager": {},
      "qx.log.Logger": {},
      "qx.util.StringBuilder": {},
      "qxl.apiviewer.ui.panels.InfoPanel": {},
      "qx.dom.Element": {},
      "qx.bom.element.Class": {},
      "qx.bom.element.Scroll": {},
      "qx.bom.element.Style": {},
      "qxl.apiviewer.TreeUtil": {},
      "qx.lang.String": {},
      "qx.event.Timer": {},
      "qxl.apiviewer.UiModel": {}
    },
    "environment": {
      "provided": [],
      "required": {
        "qx.revision": {},
        "qx.version": {},
        "engine.name": {
          "className": "qx.bom.client.Engine"
        }
      }
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
       * Til Schneider (til132)
       * Sebastian Werner (wpbasti)
       * Andreas Ecker (ecker)
       * Fabian Jakobs (fjakobs)
       * Jonathan Weiß (jonathan_rass)
       * John Spackman (johnspackman)
  
  ************************************************************************ */

  /**
   * Shows the class details.
   * @require(qx.module.event.GestureHandler)
   */
  qx.Class.define("qxl.apiviewer.ui.ClassViewer", {
    extend: qxl.apiviewer.ui.AbstractViewer,

    /*
    *****************************************************************************
     CONSTRUCTOR
    *****************************************************************************
    */
    construct: function construct() {
      qxl.apiviewer.ui.AbstractViewer.constructor.call(this);
      this.addInfoPanel(new qxl.apiviewer.ui.panels.ConstructorPanel("constructor"));
      this.addInfoPanel(new qxl.apiviewer.ui.panels.EventPanel("events", true, true));
      this.addInfoPanel(new qxl.apiviewer.ui.panels.StaticMethodsPanel("static methods"));
      this.addInfoPanel(new qxl.apiviewer.ui.panels.ConstantPanel("constants", false, true));
      this.addInfoPanel(new qxl.apiviewer.ui.panels.PropertyPanel("properties", true, true));
      this.addInfoPanel(new qxl.apiviewer.ui.panels.MethodPanel("methods"));
      this.addInfoPanel(new qxl.apiviewer.ui.panels.ChildControlsPanel("child controls"));
      this.getContentElement().setAttribute("class", "ClassViewer");

      this._init(null);
    },

    /*
    *****************************************************************************
     STATICS
    *****************************************************************************
    */
    statics: {
      /** {Map} The primitive types. These types will not be shown with links. */
      PRIMITIVES: {
        "var": true,
        "void": true,
        "undefined": true,
        "arguments": true,
        "null": true,
        "varargs": true,
        "Boolean": true,
        "String": true,
        "Number": true,
        "Integer": true,
        "PositiveNumber": true,
        "PositiveInteger": true,
        "Float": true,
        "Double": true,
        "Color": true,
        "Error": true,
        "RegExp": true,
        "Object": true,
        "Array": true,
        "Map": true,
        "Function": true,
        "Date": true,
        "Node": true,
        "Element": true,
        "Document": true,
        "Window": true,
        "Event": true
      },
      MDC_LINKS: {
        "Event": "https://developer.mozilla.org/en/DOM/event",
        "Window": "https://developer.mozilla.org/en/DOM/window",
        "Document": "https://developer.mozilla.org/en/DOM/document",
        "Element": "https://developer.mozilla.org/en/DOM/element",
        "Node": "https://developer.mozilla.org/en/DOM/node",
        "Date": "https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Date",
        "Function": "https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Function",
        "Array": "https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array",
        "Object": "https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Object",
        "Map": "https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Object",
        "RegExp": "https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/RegExp",
        "Error": "https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Error",
        "Number": "https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Number",
        "Boolean": "https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Boolean",
        "String": "https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/String",
        "undefined": "https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/undefined",
        "arguments": "https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Function/arguments",
        "Font": "https://developer.mozilla.org/en/CSS/font",
        "Color": "https://developer.mozilla.org/en/CSS/color"
      },

      /**
       * {Map} Replacement rules for placeholders in the source view URI.
       * Functions will be called with the current @link{qxl.apiviewer.dao.Node} as the
       * only parameter and must return a string.
      * */
      SOURCE_VIEW_MACROS: {
        classFilePath: function classFilePath(node) {
          var classNode = node.getClass ? node.getClass() : node;
          return classNode.getFullName().replace(/\./gi, "/") + ".js";
        },
        lineNumber: function lineNumber(node) {
          if (node.getLineNumber && typeof node.getLineNumber() == "number") {
            return String(node.getLineNumber());
          }

          return "0";
        },
        qxGitBranch: function qxGitBranch(node) {
          return qx.core.Environment.get("qx.revision") ? // e.g. "master:47ac02f"
          qx.core.Environment.get("qx.revision").split(":")[1] : qx.core.Environment.get("qx.version") ? // e.g. "2.1.2"
          "release_" + qx.core.Environment.get("qx.version").replace(/\./g, "_") : "master";
        }
      },

      /**
       * Creates the HTML showing an image. Optionally with overlays
       *
       * @param imgUrl {String|String[]} the URL of the image. May be a string or an array of
       *          strings (for overlay images).
       * @param tooltip {String} the tooltip to show.
       * @param styleAttributes {String} the style attributes to add to the image.
       * @return {String} HTML fragment for the image
       */
      createImageHtml: function createImageHtml(imgUrl, tooltip, styleAttributes) {
        if (typeof imgUrl == "string") {
          return "<img src=\"" + qx.util.ResourceManager.getInstance().toUri(imgUrl) + "\" class=\"img\"" + (styleAttributes ? " style=\"" + styleAttributes + "\"" : "") + "/>";
        }

        if (styleAttributes) {
          styleAttributes += ";vertical-align:top";
        } else {
          styleAttributes = "vertical-align:top";
        }

        return qxl.apiviewer.ui.ClassViewer.createOverlayImageHtml(18, 18, imgUrl, tooltip, styleAttributes);
      },

      /**
       * Creates HTML that shows an overlay image (several images on top of each other).
       * The resulting HTML will behave inline.
       *
       * @param width {Integer} the width of the images.
       * @param height {Integer} the height of the images.
       * @param imgUrlArr {String[]} the URLs of the images. The last image will be
       *          painted on top.
       * @param toolTip {String?null} the tooltip of the icon.
       * @param styleAttributes {String?null} custom CSS style attributes.
       * @return {String} the HTML with the overlay image.
       */
      createOverlayImageHtml: function createOverlayImageHtml(width, height, imgUrlArr, toolTip, styleAttributes) {
        var html = "";
        var style;

        if (qx.core.Environment.get("engine.name") == "webkit") {
          html = "<span style=\"display:inline;position:relative;top:-2px;width:" + width + "px;height:" + height + "px" + (styleAttributes == null ? "" : ";" + styleAttributes) + "\">";
        } else {
          html = "<span style=\"display:inline-block;display:inline;padding-right:18px;position:relative;top:-2px;left:0;width:" + width + "px;height:" + height + "px" + (styleAttributes == null ? "" : ";" + styleAttributes) + "\">";
        }

        if (qx.core.Environment.get("engine.name") == "webkit") {
          style = "position:absolute;top:0px;left:0px;padding-right:18px;";
        } else if (qx.core.Environment.get("engine.name") == "opera") {
          style = "margin-right:-18px;";
        } else {
          style = "position:absolute;top:0px;left:0px";
        }

        for (var i = 0; i < imgUrlArr.length; i++) {
          html += "<img";

          if (toolTip != null) {
            html += " title=\"" + toolTip + "\"";
          }

          html += " style=\"" + style + "\" src=\"" + qx.util.ResourceManager.getInstance().toUri(imgUrlArr[i]) + "\"/>";
        }

        html += "</span>";
        return html;
      },

      /**
       * Returns the source view URI for a doc node. This is determined by getting
       * the value for the "sourceViewUri" key from the library that contains the
       * item represented by the node. Placeholders of the form %{key} in the URI
       * are then resolved by applying the rules defined in the SOURCE_VIEW_MACROS
       * map.
       *
       * @param node {qxl.apiviewer.dao.Node} the documentation node for the title
       * @return {String|null} Source view URI or <code>null</code> if it couldn't
       * be determined
       */
      getSourceUri: function getSourceUri(node) {
        var classNode;

        if (node instanceof qxl.apiviewer.dao.Class) {
          classNode = node;
        } else {
          classNode = node.getClass();
        } // get the library's top-level namespace


        var libNs = classNode.getFullName().split(".")[0];

        if (!qx.util.LibraryManager.getInstance().has(libNs)) {
          return null;
        }

        var sourceViewUri = qx.util.LibraryManager.getInstance().get(libNs, "sourceViewUri");

        if (!sourceViewUri) {
          return null;
        }

        var replacements = this.SOURCE_VIEW_MACROS;

        for (var key in replacements) {
          var macro = "%{" + key + "}";

          if (sourceViewUri.indexOf(macro) >= 0 && typeof replacements[key] == "function") {
            var replacement = replacements[key](node);

            if (typeof replacement == "string") {
              sourceViewUri = sourceViewUri.replace(new RegExp(macro), replacement);
            }
          }
        }

        if (sourceViewUri.indexOf("%{") >= 0) {
          {
            qx.log.Logger.warn("Source View URI contains unresolved macro(s):", sourceViewUri);
          }
          return null;
        }

        return sourceViewUri;
      }
    },

    /*
    *****************************************************************************
     MEMBERS
    *****************************************************************************
    */
    members: {
      /**
       * Returns the HTML fragment for the title
       *
       * @param classNode {qxl.apiviewer.dao.Class} the class documentation node for the title
       * @return {String} HTML fragment of the title
       */
      _getTitleHtml: function _getTitleHtml(classNode) {
        var objectName = "Class";

        switch (classNode.getType()) {
          case "mixin":
            objectName = "Mixin";
            break;

          case "interface":
            objectName = "Interface";
            break;
        }

        var titleHtml = new qx.util.StringBuilder();
        titleHtml.add("<small>", classNode.getPackageName(), "</small>");
        titleHtml.add("<span class=\"type\">");

        if (classNode.isAbstract()) {
          titleHtml.add("Abstract ");
        } else if (classNode.isStatic()) {
          titleHtml.add("Static ");
        } else if (classNode.isSingleton()) {
          titleHtml.add("Singleton ");
        }

        titleHtml.add(objectName, " </span>");
        var className = classNode.getName();
        var sourceUri = qxl.apiviewer.ui.ClassViewer.getSourceUri(classNode);

        if (sourceUri) {
          className = "<a href=\"" + sourceUri + "\" target=\"_blank\" title=\"View Source\">" + className + "</a>";
        }

        titleHtml.add(qxl.apiviewer.ui.panels.InfoPanel.setTitleClass(classNode, className));
        return titleHtml.get();
      },
      _getTocHtml: function _getTocHtml(classNode) {
        var tocHtml = document.createDocumentFragment();
        var lastTocItem = null;
        this.getPanels().forEach(panel => {
          var items = panel.getPanelItemObjects(this.getDocNode(), this.getShowInherited() || this.getShowIncluded());

          if (items.length == 0) {
            return;
          }

          if (lastTocItem) {
            tocHtml.appendChild(document.createTextNode(" | "));
          }

          var tocItem = qx.dom.Element.create("span");
          qx.bom.element.Class.add(tocItem, "tocitem"); // add icon in front of the TOC item

          tocItem.innerHTML = qxl.apiviewer.ui.ClassViewer.createImageHtml(panel.getPanelIcon(), panel.getPanelTitle()) + " ";
          q(tocItem).on("tap", function (firstItem) {
            return function () {
              this.__enableSection__P_605_0(firstItem, firstItem.getName());

              qx.bom.element.Scroll.intoView(panel.getTitleElement(), null, "left", "top");

              if (!panel.getIsOpen()) {
                this.togglePanelVisibility(panel);
              }
            }.bind(this);
          }.bind(this)(items[0]), false);
          var textSpan = qx.dom.Element.create("span");

          if (panel instanceof qxl.apiviewer.ui.panels.StaticMethodsPanel && qx.core.Environment.get("engine.name") == "webkit") {
            qx.bom.element.Style.set(textSpan, "margin-left", "25px");
          }

          textSpan.appendChild(document.createTextNode(" "));
          textSpan.appendChild(document.createTextNode(panel.getPanelTitle()));
          tocItem.appendChild(textSpan);
          tocHtml.appendChild(tocItem);
          lastTocItem = tocItem;
        });
        return tocHtml;
      },

      /**
       * @return {Promise}
       */
      _getDescriptionHtml: function _getDescriptionHtml(classNode) {
        var subObjectsName = "sub classes";
        var desc = classNode.getDescription();

        switch (classNode.getType()) {
          case "mixin":
            subObjectsName = "sub mixins";
            break;

          case "interface":
            subObjectsName = "sub interfaces";
            break;
        }

        var classHtml = new qx.util.StringBuilder(); // Add the class description

        if (desc !== "") {
          classHtml.add("<div class=\"class-description\">", qxl.apiviewer.ui.panels.InfoPanel.resolveLinkAttributes(desc, classNode), "</div>");
        }

        var seeAlso = qxl.apiviewer.ui.panels.InfoPanel.createSeeAlsoHtml(classNode);

        if (seeAlso) {
          if (classHtml.length > 0) {
            classHtml.splice(-1, 0, seeAlso);
          } else {
            classHtml.add(seeAlso);
          }
        }

        if (classNode.getErrors().length > 0) {
          classHtml.add("<div class=\"class-description\">", qxl.apiviewer.ui.panels.InfoPanel.createErrorHtml(classNode, classNode), "</div>");
        } // Add the class hierarchy


        if (classNode.getType() === "interface") {
          classHtml.add(this.__getInterfaceHierarchyHtml__P_605_1(classNode));
        } else {
          classHtml.add(this.__getClassHierarchyHtml__P_605_2(classNode));
        }

        return classNode.getChildClasses().then(childClasses => {
          classHtml.add(this.__getDependentClassesHtml__P_605_3(childClasses, "Direct " + subObjectsName + ":"));
          classHtml.add(this.__getDependentClassesHtml__P_605_3(classNode.getInterfaces(), "Implemented interfaces:"));
          classHtml.add(this.__getDependentClassesHtml__P_605_3(classNode.getMixins(), "Included mixins:"));
          return classNode.getImplementations();
        }).then(classes => {
          classHtml.add(this.__getDependentClassesHtml__P_605_3(classes, "Implementations of this interface:"));
          return classNode.getIncluder();
        }).then(classes => {
          classHtml.add(this.__getDependentClassesHtml__P_605_3(classes, "Classes including this mixin:"));

          if (classNode.isDeprecated()) {
            classHtml.add("<h2 class=\"warning\">", "Deprecated:", "</h2>");
            classHtml.add("<p>");
            desc = classNode.getDeprecationText();

            if (desc) {
              classHtml.add(qxl.apiviewer.ui.panels.InfoPanel.resolveLinkAttributes(desc, classNode));
            } else {
              classHtml.add("This ", classNode.getType(), " is deprecated!");
            }

            classHtml.add("</p>");
          }

          if (classNode.isInternal()) {
            classHtml.add("<h2 class=\"warning\">", "Internal:", "</h2>");
            classHtml.add("<p>");
            var type = classNode.getType();

            if (type == "bootstrap") {
              type += " class";
            }

            classHtml.add("This ", type, " is internal!");
            classHtml.add("</p>");
          }

          return classHtml.get();
        });
      },

      /**
       * Create a HTML fragment containing information of dependent classes
       * like implemented interfaces, included mixins, direct sub classes, ...
       *
       * @param dependentClasses {qxl.apiviewer.dao.Class[]} array of dependent classes
       * @param title {String} headline
       * @return {String} HTML Fragement
       */
      __getDependentClassesHtml__P_605_3: function __getDependentClassesHtml__P_605_3(dependentClasses, title) {
        var result = "";

        if (dependentClasses.length > 0) {
          result = new qx.util.StringBuilder("<h2>", title, "</h2>");

          for (var i = 0; i < dependentClasses.length; i++) {
            if (i !== 0) {
              result.add(", ");
            }

            result.add(qxl.apiviewer.ui.panels.InfoPanel.createItemLinkHtml(dependentClasses[i], null, true, false));
          }

          result = result.get();
        }

        return result;
      },

      /**
       * Generate HTML fragment to display the inheritance hierarchy of a class.
       *
       * @param classNode {qxl.apiviewer.dao.Class} class node
       * @return {String} HTML fragemnt
       */
      __getClassHierarchyHtml__P_605_2: function __getClassHierarchyHtml__P_605_2(classNode) {
        var ClassViewer = qxl.apiviewer.ui.ClassViewer; // Create the class hierarchy

        var classHtml = new qx.util.StringBuilder("<h2>", "Inheritance hierarchy:", "</h2>");
        var classHierarchy = classNode.getClassHierarchy(true);
        classHtml.add(ClassViewer.createImageHtml("qxl/apiviewer/image/class18.gif"), "<span style=\"white-space: nowrap;\"><a href=\"https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Object\" target=\"_blank\" title=\"Object\">Object</a></span>");
        var indent = 0;

        for (var i = classHierarchy.length - 1; i >= 0; i--) {
          if (qxl.apiviewer.dao.Class.isNativeObject(classHierarchy[i]) && classHierarchy[i] === Object) {
            continue;
          }

          classHtml.add("<div>");
          classHtml.add(ClassViewer.createImageHtml("qxl/apiviewer/image/nextlevel.gif", null, "margin-left:" + indent + "px"), !qxl.apiviewer.dao.Class.isNativeObject(classHierarchy[i]) ? ClassViewer.createImageHtml(qxl.apiviewer.TreeUtil.getIconUrl(classHierarchy[i])) : ClassViewer.createImageHtml("qxl/apiviewer/image/class18.gif"));

          if (i !== 0) {
            if (!qxl.apiviewer.dao.Class.isNativeObject(classHierarchy[i])) {
              classHtml.add(qxl.apiviewer.ui.panels.InfoPanel.createItemLinkHtml(classHierarchy[i].getFullName(), null, false));
            } else {
              // it is safe to get the name of the type of the object as below, because only standard native objects are used here.
              // the method below returns Object for user defined objects
              var name = Object.prototype.toString.call(new classHierarchy[i]()).match(/^\[object (.*)\]$/)[1];
              classHtml.add("<span style=\"white-space: nowrap;\"><a href=\"" + qxl.apiviewer.ui.ClassViewer.MDC_LINKS[name] + "\" target=\"_blank\" title=\"" + name + "\">" + name + "</a></span>");
            }
          } else {
            classHtml.add(classHierarchy[i].getFullName());
          }

          indent += 18;
          classHtml.add("</div>");
        }

        return classHtml.get();
      },

      /**
       * Generate HTML fragment to display the inheritance hierarchy of an Interface.
       *
       * @param classNode {qxl.apiviewer.dao.Class} class node
       * @return {String} HTML fragemnt
       */
      __getInterfaceHierarchyHtml__P_605_1: function __getInterfaceHierarchyHtml__P_605_1(classNode) {
        var ClassViewer = qxl.apiviewer.ui.ClassViewer;
        var TreeUtil = qxl.apiviewer.TreeUtil;
        var InfoPanel = qxl.apiviewer.ui.panels.InfoPanel;
        var hierarchy = classNode.getInterfaceHierarchy();
        var html = new qx.util.StringBuilder(); // show nothing if we don't have a hierarchy

        if (hierarchy.length <= 1) {
          return;
        }

        html.add("<h2>", "Inheritance hierarchy:", "</h2>");
        var indent = 0;

        for (var i = hierarchy.length - 1; i >= 0; i--) {
          var name = hierarchy[i].getFullName();
          var icon = TreeUtil.getIconUrl(hierarchy[i]);
          html.add("<div>");

          if (hierarchy[i].getSuperInterfaces().length > 0) {
            html.add(ClassViewer.createImageHtml("qxl/apiviewer/image/nextlevel.gif", null, "margin-left:" + indent + "px"));
            html.add(ClassViewer.createImageHtml(icon));
            html.add(i !== 0 ? InfoPanel.createItemLinkHtml(name, null, false) : name);
            indent += 18;
          } else {
            html.add(ClassViewer.createImageHtml(icon));
            html.add(InfoPanel.createItemLinkHtml(name, null, false));
          }

          html.add("</div>");
        }

        return html.get();
      },

      /**
       * Highlights an item (property, method or constant) and scrolls it visible.
       *
       * @param itemName {String} the name of the item to highlight.
       * @return {Boolean} whether the item name was valid and could be selected.
       */
      showItem: function showItem(itemName) {
        var itemNode;
        var nameMap = {
          "event": "events",
          "method_public": "methods",
          "method_protected": "methods",
          "method_private": "methods",
          "property": "properties",
          "property_private": "properties",
          "property_protected": "properties",
          "constant": "constants",
          "childcontrol": "childControls"
        }; // special handling for constructor methods since the constructor
        // cannot be obtained with the "getItem" (which works on lists)

        if (itemName == "construct") {
          itemNode = this.getDocNode().getConstructor();
        } else if (itemName.indexOf("!") != -1) {
          var parts = itemName.split("!");
          let upname = "get" + qx.lang.String.firstUp(nameMap[parts[1]]);
          itemNode = this.getDocNode()[upname](parts[0]);

          if (!itemNode) {
            itemNode = this.getDocNode().getItem(parts[0]);
          }
        } else {
          itemNode = this.getDocNode().getItem(itemName);
        }

        if (!itemNode) {
          return false;
        } // Show properties, private or protected methods if they are hidden


        this.__enableSection__P_605_0(itemNode, itemName);

        var panel = this._getPanelForItemNode(itemNode);

        if (!panel.getIsOpen()) {
          this.togglePanelVisibility(panel);
        }

        var itemElement = panel.getItemElement(itemNode.getName());

        if (!itemElement) {
          return false;
        }

        var elem = itemElement.parentNode.parentNode; // Handle mark

        if (this._markedElement) {
          this._markedElement.className = qxl.apiviewer.ui.panels.InfoPanel.getItemCssClasses(this._markedItemNode);
        }

        elem.className = "marked";
        this._markedElement = elem;
        this._markedItemNode = itemNode; // Use a timeout as pragmatic solution
        // Replace this later on with a kind of post-processing
        // to get rid off this timer

        qx.event.Timer.once(function (e) {
          qx.bom.element.Scroll.intoView(elem, null, "left", "top");
        }, this, 0);
        return true;
      },

      /**
       * Programatically enables the button to show private, protected function or
       * properties so that the selected item can be shown.
       *
       * @param itemName {String} the name of the item to highlight.
       * @param itemName {String} The doc node of the item
       */
      __enableSection__P_605_0: function __enableSection__P_605_0(itemNode, itemName) {
        var uiModel = qxl.apiviewer.UiModel.getInstance(); // Check for property

        if (itemNode.isFromProperty && itemNode.isFromProperty()) {
          uiModel.setExpandProperties(true);

          if (itemNode.isProtected()) {
            uiModel.setShowProtected(true);
          }

          if (itemNode.isPrivate()) {
            uiModel.setShowPrivate(true);
          }

          if (itemNode.isInternal()) {
            uiModel.setShowInternal(true);
          }
        } else {
          // Check for privates
          if (itemNode.isPrivate()) {
            uiModel.setShowPrivate(true);
          } // Check for internals


          if (itemNode.isInternal()) {
            uiModel.setShowInternal(true);
          } // Check for protected
          else if (itemNode.isProtected()) {
              uiModel.setShowProtected(true);
            }
        }
      },

      /**
       * Gets the node panel for a doc node.
       *
       * @param itemNode {qxl.apiviewer.dao.Class} the doc node of the item.
       * @return {InfoPanel} the item's info panel instance
       */
      _getPanelForItemNode: function _getPanelForItemNode(itemNode) {
        var panels = this.getPanels();

        for (var i = 0; i < panels.length; i++) {
          var panel = panels[i];

          if (panel.canDisplayItem(itemNode)) {
            return panel;
          }
        }
      }
    },

    /*
    *****************************************************************************
     DESTRUCTOR
    *****************************************************************************
    */
    destruct: function destruct() {
      this._titleElem = this._classDescElem = this._markedElement = this._markedItemNode = null;
    }
  });
  qxl.apiviewer.ui.ClassViewer.$$dbClassInfo = $$dbClassInfo;
})();

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
      "qx.lang.Array": {
        "construct": true
      }
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
       * Fabian Jakobs (fjakobs)
  
  ************************************************************************ */

  /**
   * Represents a parameter or return type, taken from JSDoc meta data
   *
   * Example data:
   *      qooxdoo style
          "@param": [
            {
              "name": "@param",
              "body": "options {Map?null} Optional layout data for widget.",
              "paramName": "options",
              "description": " Optional layout data for widget.",
              "optional": true,
              "defaultValue": "null",
              "type": "Map"
            }
          ],
          jsdoc style
          "@param": [
            {
              "name": "@param",
              "body": "{Map?null} options Optional layout data for widget.",
              "paramName": "options",
              "description": " Optional layout data for widget.",
              "optional": true,
              "defaultValue": "null",
              "type": "Map"
            }
          ],
          "@return": [
            {
              "name": "@return",
              "body": "{Integer} The index position or <code>-1</code> when\nthe given widget is no child of this layout.",
              "docComment": "",
              "type": "Integer",
              "desc": " The index position or <code>-1</code> when\nthe given widget is no child of this layout."
            }
          ]
   */
  qx.Class.define("qxl.apiviewer.dao.Param", {
    extend: qx.core.Object,
    construct: function construct(meta, method) {
      qx.core.Object.constructor.call(this);
      this._meta = meta;
      this._method = method;
      this._types = [{
        type: "var"
      }];

      if (meta.type) {
        this._types = qx.lang.Array.toNativeArray(meta.type).map(type => {
          if (typeof type === "object") {
            return {
              type: type.type,
              arrayDimensions: type.dimensions
            };
          }

          var m = type.match(/^([^[]+)((\[\])+)?$/);

          if (m && m[2]) {
            return {
              type: m[1],
              arrayDimensions: m[2].length / 2
            };
          }

          return {
            type: type
          };
        });
      }
    },
    members: {
      _method: null,
      _meta: null,
      _types: null,
      _arrayDimensions: 0,
      getMethod: function getMethod() {
        return this._method;
      },
      getClass: function getClass() {
        return this._method.getClass();
      },
      getName: function getName() {
        return this._meta.paramName;
      },
      getTypes: function getTypes() {
        return this._types;
      },
      getArrayDimensions: function getArrayDimensions() {
        return this._arrayDimensions;
      },
      getDefaultValue: function getDefaultValue() {
        return this._meta.defaultValue;
      },
      isOptional: function isOptional() {
        return Boolean(this._meta.optional);
      },
      getDescription: function getDescription() {
        return this._meta.description || this._meta.body;
      }
    }
  });
  qxl.apiviewer.dao.Param.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.module.event.GestureHandler": {
        "require": true
      },
      "qx.module.Attribute": {
        "require": true
      },
      "qx.module.event.Native": {
        "require": true
      },
      "qx.core.Environment": {
        "defer": "load",
        "require": true
      },
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.core.Object": {
        "construct": true,
        "require": true
      },
      "qxl.apiviewer.ObjectRegistry": {
        "construct": true
      },
      "qxl.apiviewer.dao.Class": {},
      "qxl.apiviewer.dao.Package": {},
      "qx.util.StringBuilder": {},
      "qxl.apiviewer.TreeUtil": {},
      "qxl.apiviewer.ui.ClassViewer": {},
      "qx.util.ResourceManager": {},
      "qx.lang.Array": {},
      "qxl.apiviewer.ui.AbstractViewer": {},
      "qxl.apiviewer.UiModel": {},
      "qxl.apiviewer.dao.ClassItem": {},
      "qx.bom.client.Engine": {}
    },
    "environment": {
      "provided": [],
      "required": {
        "engine.name": {
          "className": "qx.bom.client.Engine"
        },
        "engine.version": {
          "className": "qx.bom.client.Engine"
        }
      }
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
       * Til Schneider (til132)
       * Sebastian Werner (wpbasti)
       * Andreas Ecker (ecker)
       * Fabian Jakobs (fjakobs)
       * John Spackman (johnspackman) of Zenesis Ltd (http://www.zenesis.com)
  
  ************************************************************************ */

  /**
   * @require(qx.module.event.GestureHandler)
   * @require(qx.module.Attribute)
   * @require(qx.module.event.Native)
   *
   * @ignore(location.*)
   */
  qx.Class.define("qxl.apiviewer.ui.panels.InfoPanel", {
    type: "abstract",
    extend: qx.core.Object,

    /**
     * Creates an info panel. An info panel shows the information about one item
     * type (e.g. for public methods).
     *
     * @param labelText
     *          {String} the label text describing the node type.
     */
    construct: function construct(labelText, icon) {
      qx.core.Object.constructor.call(this);
      this._labelText = labelText;
      this._icon = icon;
      qxl.apiviewer.ObjectRegistry.register(this);
    },
    properties: {
      /** top level DOM node of the panel */
      element: {
        check: "Element",
        init: null,
        nullable: true,
        apply: "_applyElement"
      },

      /** whether the info panel is open */
      isOpen: {
        check: "Boolean",
        init: true
      },
      docNode: {
        nullable: true,
        async: true
      }
    },
    members: {
      _labelText: null,
      _icon: null,

      /**
       * Returns the title of the panel
       *
       * @return {String}
       */
      getPanelTitle: function getPanelTitle() {
        return this._labelText;
      },

      /**
       * Returns the icon for the panel
       *
       * @return {String}
       */
      getPanelIcon: function getPanelIcon() {
        return this._icon;
      },

      /**
       * Whether the panel can display the given item node
       *
       * @return {Boolean} Whether the panel can display the given item node
       */
      canDisplayItem: function canDisplayItem(dao) {
        throw new Error("No implementation for " + this.classname + ".canDisplayItem");
      },

      /**
       * Get the type HTML string of an item.
       *
       * @abstract
       * @param node
       *          {qxl.apiviewer.dao.ClassItem} the doc node of the item.
       * @param currentClassDocNode
       *          {qxl.apiviewer.dao.Class} the doc node of the currently displayed
       *          class
       * @return {String} the HTML showing the information about the method.
       */
      getItemTypeHtml: function getItemTypeHtml(node, currentClassDocNode) {
        throw new Error("Abstract method called!");
      },

      /**
       * Get the title HTML string of an item.
       *
       * @abstract
       * @param node
       *          {qxl.apiviewer.dao.ClassItem} the doc node of the item.
       * @param currentClassDocNode
       *          {qxl.apiviewer.dao.Class} the doc node of the currently displayed
       *          class
       * @return {String} the HTML showing the information about the method.
       */
      getItemTitleHtml: function getItemTitleHtml(node, currentClassDocNode) {
        throw new Error("Abstract method called!");
      },

      /**
       * Get the description text HTML string of an item.
       *
       * @abstract
       * @param node
       *          {qxl.apiviewer.dao.ClassItem} the doc node of the item.
       * @param currentClassDocNode
       *          {qxl.apiviewer.dao.Class} the doc node of the currently displayed
       *          class
       * @param showDetails
       *          {Boolean} whether to show the details.
       * @return {String} the HTML showing the information about the method.
       */
      getItemTextHtml: function getItemTextHtml(node, currentClassDocNode, showDetails) {
        throw new Error("Abstract method called!");
      },
      getItemTooltip: function getItemTooltip(node, currentClassDocNode) {
        return "";
      },

      /**
       * Creates the HTML showing the information about a class item. The root
       * HTML element must be a table row (&lt;tr&gt;).
       *
       * @abstract
       * @param node
       *          {qxl.apiviewer.dao.ClassItem} the doc node of the item.
       * @param showDetails
       *          {Boolean} whether to show the details.
       * @return {String} the HTML showing the information about the method.
       */
      getItemHtml: function getItemHtml(node, currentDocNode, showDetails) {
        if (node instanceof qxl.apiviewer.dao.Class || node instanceof qxl.apiviewer.dao.Package) {
          var parentNode = node.getPackage();
        } else {
          var parentNode = node.getClass();
        }

        var html = new qx.util.StringBuilder();
        var inherited = parentNode && parentNode != currentDocNode && parentNode.getType() == "class";
        var iconUrl = qxl.apiviewer.TreeUtil.getIconUrl(node, inherited); // Create the title row

        html.add("<tr class=\"", qxl.apiviewer.ui.panels.InfoPanel.getItemCssClasses(node), "\">");
        var tooltipText = this.getItemTooltip(node, currentDocNode);
        var tooltip = tooltipText ? "title=\"" + tooltipText + "\" alt=\"" + tooltipText + "\"" : "";
        html.add("<td class=\"icon\" ", tooltip, ">", qxl.apiviewer.ui.ClassViewer.createImageHtml(iconUrl), "</td>");
        var typeHtml = this.getItemTypeHtml(node, currentDocNode);
        html.add("<td class=\"type\">", typeHtml ? typeHtml + "&nbsp;" : "&nbsp;", "</td>");
        html.add("<td class=\"toggle\">");

        if (this.itemHasDetails(node, currentDocNode)) {
          // This node has details -> Show the detail button
          html.add("<img src=\"", qx.util.ResourceManager.getInstance().toUri("qxl/apiviewer/image/open.gif"), "\" onclick=\"", this.__encodeObject__P_607_0(this), ".toggleShowItemDetails('", node.getName(), "'", parentNode != currentDocNode ? ",'" + parentNode.getFullName() + "'" : "", ")\"/>");
        } else {
          html.add("&#160;");
        }

        html.add("</td>");
        html.add("<td class=\"text\">"); // Create headline

        html.add("<h3");

        if (this.itemHasDetails(node, currentDocNode)) {
          html.add(" onclick=\"", this.__encodeObject__P_607_0(this), ".toggleShowItemDetails('", node.getName(), "'", parentNode != currentDocNode ? ",'" + parentNode.getFullName() + "'" : "", ")\">");
        } else {
          html.add(">");
        }

        html.add(this.getItemTitleHtml(node, currentDocNode));
        html.add("</h3>"); // Create content area

        html.add("<div _itemName=\"", node.getName(), "\">");
        html.add(this.getItemTextHtml(node, currentDocNode, showDetails));
        html.add("</div>");
        html.add("</td>");
        html.add("</tr>");
        return html.get();
      },

      /**
       * Checks whether a class item has details. This method is abstract. Sub
       * classes must override it.
       *
       * @abstract
       * @param node
       *          {qxl.apiviewer.dao.ClassItem} the doc node of the item.
       * @param currentClassDocNode
       *          {qxl.apiviewer.dao.Class} the doc node of the currently displayed
       *          class
       * @return {Boolean} whether the class item has details.
       */
      itemHasDetails: function itemHasDetails(node, currentClassDocNode) {
        return true;
      },
      __encodeObject__P_607_0: function __encodeObject__P_607_0(object) {
        return "qxl.apiviewer.ObjectRegistry.getObjectFromHashCode('" + object.toHashCode() + "')";
      },

      /**
       * Get the HTML fragment of the info panel
       *
       * @return {String} HTML fragment of the info panel
       */
      getPanelHtml: function getPanelHtml(viewer) {
        var uppercaseLabelText = this._labelText.charAt(0).toUpperCase() + this._labelText.substring(1);

        var html = new qx.util.StringBuilder("<div class=\"info-panel\"><h2>");
        html.add("<img class=\"openclose\" src=\"", qx.util.ResourceManager.getInstance().toUri("qxl/apiviewer/image/" + (this.getIsOpen() ? "close.gif" : "open.gif")), "\" onclick=\"", this.__encodeObject__P_607_0(viewer), ".togglePanelVisibility(" + this.__encodeObject__P_607_0(this), ")\"/> ", "<span onclick=\"", this.__encodeObject__P_607_0(viewer), ".togglePanelVisibility(", this.__encodeObject__P_607_0(this), ")\">", uppercaseLabelText, "</span>");
        html.add("</h2><div></div></div>");
        return html.get();
      },

      /**
       * Returns a list of all items to display in the panel
       *
       * @param showInherited
       *          {Boolean} whether to show inherited items
       * @param currentClassDocNode
       *          {qxl.apiviewer.dao.Class} the currently displayed class
       * @return {qxl.apiviewer.dao.ClassItem[]} list of all items to display in the
       *         panel
       */
      _getPanelItems: function _getPanelItems(showInherited, showIncluded, daoClass) {
        if (!daoClass) {
          return [];
        }

        var result = [];
        var fromClassHash = {};
        var classes; // Get the classes to show

        if (showInherited && this._canShowInherited()) {
          if (daoClass.getType() == "interface") {
            classes = daoClass.getInterfaceHierarchy();
          } else {
            classes = daoClass.getClassHierarchy();
          }
        } else {
          classes = [daoClass];
        }

        for (var classIndex = 0; classIndex < classes.length; classIndex++) {
          var currClassNode = classes[classIndex];
          this.getPanelItemObjects(currClassNode, showInherited || showIncluded).forEach(item => {
            var name = item.getName();

            if (fromClassHash[name] === undefined) {
              result.push(item);
              fromClassHash[name] = item;
            }
          });
        }

        return result;
      },
      _canShowInherited: function _canShowInherited() {
        return false;
      },
      getPanelItemObjects: function getPanelItemObjects(daoClass, showInherited) {
        throw new Error("No implementation for " + this.classname + ".getPanelItemObjects");
      },

      /**
       * Filter the item list to display only the desired items.
       *
       * @param nodeArr
       *          {qxl.apiviewer.dao.ClassItem[]} array of class items
       * @param showProtected
       *          {Boolean} whether to show protected items
       * @param showPrivate
       *          {Boolean} whether to show private items
       * @param showInternal
       *          {Boolean} whether to show internal items
       * @return {qxl.apiviewer.dao.ClassItem[]} filtered list of items
       */
      __filterItems__P_607_1: function __filterItems__P_607_1(nodeArr, expandProperties, showProtected, showPrivate, showInternal) {
        var copyArr = nodeArr.concat();

        for (var i = nodeArr.length - 1; i >= 0; i--) {
          var node = nodeArr[i];

          if (node.isPropertyGenerated() && !expandProperties) {
            qx.lang.Array.removeAt(copyArr, i);
          } else if (node.isPrivate() && !showPrivate) {
            qx.lang.Array.removeAt(copyArr, i);
          } else if (node.isProtected() && !showProtected) {
            qx.lang.Array.removeAt(copyArr, i);
          } else if (node.isInternal() && !showInternal) {
            qx.lang.Array.removeAt(copyArr, i);
          }
        }

        return copyArr;
      },
      _displayNodes: function _displayNodes(nodes, currentClassDocNode) {
        // Show the nodes
        if (nodes && nodes.length > 0) {
          var html = new qx.util.StringBuilder("<table cellspacing=\"0\" cellpadding=\"0\" class=\"info\" width=\"100%\">");

          for (var i = 0; i < nodes.length; i++) {
            html.add(this.getItemHtml(nodes[i], currentClassDocNode, false));
          }

          html.add("</table>");
          this.getBodyElement().innerHTML = html.get();

          this._postProcessLinks(this.getBodyElement());

          qxl.apiviewer.ui.AbstractViewer.fixLinks(this.getBodyElement());
          qxl.apiviewer.ui.AbstractViewer.highlightCode(this.getBodyElement());
          this.getBodyElement().style.display = !this.getIsOpen() ? "none" : "";
          this.getElement().style.display = "";
        } else {
          this.getElement().style.display = "none";
        }
      },

      /**
       * Updates an info panel.
       *
       * @param classViewer
       *          {qxl.apiviewer.ui.ClassViewer} parent class viewer widget.
       * @param currentClassDocNode
       *          {qxl.apiviewer.dao.Class} the currently displayed class
       * @return {qx.Promise}
       */
      update: function update(classViewer, currentClassDocNode) {
        if (!this.getElement()) {
          return;
        }

        return this.setDocNodeAsync(currentClassDocNode).then(() => {
          var showInherited = classViewer.getShowInherited();
          var showIncluded = classViewer.getShowIncluded();

          var nodeArr = this._getPanelItems(showInherited, showIncluded, currentClassDocNode);

          if (nodeArr && nodeArr.length > 0) {
            var expandProperties = classViewer.getExpandProperties();
            var showProtected = classViewer.getShowProtected();
            var showPrivate = classViewer.getShowPrivate();
            var showInternal = classViewer.getShowInternal();
            nodeArr = this.__filterItems__P_607_1(nodeArr, expandProperties, showProtected, showPrivate, showInternal);
            classViewer.sortItems(nodeArr);
          }

          this._displayNodes(nodeArr, currentClassDocNode);
        });
      },
      _applyElement: function _applyElement(element) {
        this._titleElement = element.firstChild;
        this._bodyElement = element.lastChild;
      },

      /** DOM node of the title of the panel */
      getTitleElement: function getTitleElement() {
        return this._titleElement;
      },

      /** DOM node of the body of the panel */
      getBodyElement: function getBodyElement() {
        return this._bodyElement;
      },

      /**
       * Gets the HTML element showing the details of an item.
       *
       * @param panel
       *          {InfoPanel} the info panel of the item.
       * @param name
       *          {String} the item's name.
       * @return {Element} the HTML element showing the details of the item.
       * @ignore(getElementsByTagName)
       */
      getItemElement: function getItemElement(name) {
        var elemArr = this.getBodyElement().getElementsByTagName("TBODY")[0].childNodes;

        for (var i = 0; i < elemArr.length; i++) {
          // ARRG, should be implemented in a more fault-tolerant way
          // iterate over tr's, look inside the third "td" and there the second
          // element
          if (elemArr[i].childNodes[3].childNodes[1].getAttribute("_itemName") == name) {
            return elemArr[i].childNodes[3].childNodes[1];
          }
        }
      },

      /**
       * Event handler. Called when the user clicked a button for showing/hiding
       * the details of an item.
       *
       * @param panelHashCode
       *          {Integer} hash code of the panel object.
       * @param name
       *          {String} the name of the item.
       * @param fromClassName
       *          {String} the name of the class the item the item was defined in.
       */
      toggleShowItemDetails: function toggleShowItemDetails(itemName, fromClassName) {
        try {
          var textDiv = this.getItemElement(itemName);

          if (!textDiv) {
            throw Error("Element for name '" + itemName + "' not found!");
          }

          var showDetails = textDiv._showDetails ? !textDiv._showDetails : true;
          textDiv._showDetails = showDetails;
          var fromClassNode = fromClassName ? qxl.apiviewer.dao.Class.getClassByName(fromClassName) : this.getDocNode();
          var node = null;

          for (var arr = this.getPanelItemObjects(fromClassNode), i = 0; i < arr.length && !node; i++) {
            var tmp = arr[i];

            if (tmp.getName() == itemName) {
              node = tmp;
            }
          }

          if (!node) {
            return;
          } // Update the close/open image


          var opencloseImgElem = textDiv.parentNode.previousSibling.firstChild;
          opencloseImgElem.src = qx.util.ResourceManager.getInstance().toUri(showDetails ? "qxl/apiviewer/image/close.gif" : "qxl/apiviewer/image/open.gif"); // Update content

          textDiv.innerHTML = this.getItemTextHtml(node, this.getDocNode(), showDetails);

          this._postProcessLinks(textDiv);

          qxl.apiviewer.ui.AbstractViewer.fixLinks(textDiv);
          qxl.apiviewer.ui.AbstractViewer.highlightCode(textDiv);
        } catch (exc) {
          this.error("Toggling item details failed");
          this.error(exc);
        }
      },

      /**
       * Convert mouseup and click listener attached to tap / pointerup listener.
       *
       * @param el
       *          {Element} The element containing the links.
       */
      _postProcessLinks: function _postProcessLinks(el) {
        if (el._processed) {
          return;
        }

        q(el).on("pointerup", function (e) {
          var target = e.getTarget();
          var mouseup = target.getAttribute("onmouseup");

          if (mouseup) {
            target.removeAttribute("onmouseup");
            target.setAttribute("oldonmouseup", mouseup);
          } else {
            mouseup = target.getAttribute("oldonmouseup");
          }

          if (mouseup) {
            Function(mouseup)();
          }
        });
        q(el).on("tap", function (e) {
          var onClickValue = "event.preventDefault ? event.preventDefault() : event.returnValue = false; return false;";
          var target = e.getTarget();
          var click = target.getAttribute("onclick");

          if (click && click != onClickValue) {
            target.removeAttribute("onclick");
            target.setAttribute("oldonclick", click);
            target.setAttribute("onclick", onClickValue);
          } else {
            click = target.getAttribute("oldonclick");
          }

          if (click) {
            Function(click)();
          }
        });
        el._processed = true;
      }
    },

    /*
     * ****************************************************************************
     * DESTRUCTOR
     * ****************************************************************************
     */
    destruct: function destruct() {
      this._titleElement = this._bodyElement = null;
    },
    statics: {
      /**
       * {regexp} The regexp for parsing a item name (e.g.
       * "mypackage.MyClass#MY_CONSTANT alternative text").
       */
      ITEM_SPEC_REGEX: /^(([\w\.]+)?(#\w+(\([^\)]*\))?)?)(\s+(.*))?$/,

      /** {regexp} The regexp that finds the end of a sentence. */
      SENTENCE_END_REGEX: /[^\.].\.(\s|<)/,

      /**
       * Creates HTML that replaces all &#64;link-attributes with links.
       *
       * @param description
       *          {String} the description.
       * @param packageBaseClass
       *          {qxl.apiviewer.dao.Class?null} the doc node of the class to use for
       *          auto-adding packages.
       * @return {String} HTML fragment
       */
      resolveLinkAttributes: function resolveLinkAttributes(description, packageBaseClass) {
        var linkRegex = /\{@link([^\}]*)\}/mg;
        var html = new qx.util.StringBuilder();
        var hit;
        var lastPos = 0;

        while ((hit = linkRegex.exec(description)) != null) {
          // Add the text before the link
          html.add(description.substring(lastPos, hit.index) + this.createItemLinkHtml(hit[1], packageBaseClass));
          lastPos = hit.index + hit[0].length;
        } // Add the text after the last hit


        html.add(description.substring(lastPos, description.length));
        return html.get();
      },

      /**
       * Creates the HTML for a link to an item.
       *
       * @param linkText
       *          {String} the link text (e.g. "mypackage.MyClass#myMethod alt
       *          text")
       * @param packageBaseClass
       *          {qxl.apiviewer.dao.Class?null} the doc node of the class to use when
       *          auto-adding the package to a class name having no package
       *          specified. If null, no automatic package addition is done.
       * @param useIcon
       *          {Boolean?true} whether to add an icon to the link.
       * @param useShortName
       *          {Boolean?false} whether to use the short name.
       * @return {String} HTML fragment of the link
       */
      createItemLinkHtml: function createItemLinkHtml(linkText, packageBaseClass, useIcon, useShortName) {
        var classNode = null;

        if (useIcon == null) {
          useIcon = true;
        }

        var className;
        var itemName = null;
        var label = "";
        var style = "";

        if (typeof linkText == "string") {
          linkText = linkText.trim();

          if (linkText.charAt(0) == "\"" || linkText.charAt(0) == "<") {
            // This is a String or a link to a URL -> Just use it as it is
            return linkText;
          } // This is a link to another class or method -> Create an item link
          // Separate item name from label


          var hit = this.ITEM_SPEC_REGEX.exec(linkText);

          if (hit == null) {
            // Malformed item name
            return linkText;
          }

          className = hit[2];
          itemName = hit[3];
          label = hit[6]; // Make the item name absolute

          if (className == null || className.length == 0) {
            // This is a relative link to a method -> Add the current class
            className = packageBaseClass.getFullName();
          } else if (packageBaseClass && className.indexOf(".") == -1) {
            classNode = qxl.apiviewer.dao.Class.getClassByName(className); // classNode could be a native JS constructor (String, Boolean, ...)

            if (!classNode || !classNode.classname || classNode.getPackage().getName() !== "") {
              // The class name has no package -> Use the same package as the
              // current class
              if (packageBaseClass instanceof qxl.apiviewer.dao.Package) {
                className = packageBaseClass.getFullName() + "." + className;
              } else {
                let fullName = packageBaseClass.getFullName();
                let pos = fullName.lastIndexOf(".");
                let baseClassname = fullName.substring(pos + 1);

                if (baseClassname == className) {
                  className = fullName;
                  classNode = packageBaseClass;
                } else {
                  className = fullName.substring(0, pos + 1) + className;
                }
              }
            }
          } // Get the node info


          if (label == null || label.length == 0) {
            // We have no label -> Use the item name as label
            label = hit[1];
          } // Add the right icon


          if (useIcon) {
            if (!classNode) {
              classNode = qxl.apiviewer.dao.Class.getClassByName(className);
            } // If the class is not loaded, then itemNode is not available - the only side effect of which is that
            //  the icon is not available.  However, this is acceptable because the only time the classes might
            //  not be loaded will be if referenced from within comments and where the class is not a dependent
            //  class, in which cases icons are not needed.


            if (classNode && classNode.isLoaded()) {
              var itemNode;

              if (itemName) {
                // The links points to a item of the class
                var cleanItemName = itemName.substring(1);
                var parenPos = cleanItemName.indexOf("(");

                if (parenPos != -1) {
                  cleanItemName = cleanItemName.substring(0, parenPos).trim();
                }

                itemNode = this.__getItemFromClassHierarchy__P_607_2(cleanItemName, classNode);

                if (!itemNode && qxl.apiviewer.UiModel.getInstance().getShowIncluded()) {
                  if (qxl.apiviewer.UiModel.getInstance().getShowInherited()) {
                    var classNodes = [classNode];

                    if (classNode.getType() == "interface") {
                      classNodes = classNode.getInterfaceHierarchy();
                    } else {
                      classNodes = classNode.getClassHierarchy();
                    }

                    for (var i = 0, l = classNodes.length; i < l; i++) {
                      itemNode = classNodes[i].getItemByNameFromMixins(cleanItemName);

                      if (itemNode) {
                        break;
                      }
                    }
                  } else {
                    itemNode = classNode.getItemByNameFromMixins(cleanItemName);
                  }
                }
              } else {
                // The links points to the class
                itemNode = classNode;
              }

              if (itemNode && !(itemNode instanceof qxl.apiviewer.dao.Package)) {
                className = itemNode.getFullName ? itemNode.getFullName() : itemNode.name;
              }
            }
          }
        } else {
          itemNode = linkText;

          if (itemNode instanceof qxl.apiviewer.dao.Class) {
            className = label = itemNode.getFullName();
          } else if (itemNode instanceof qxl.apiviewer.dao.ClassItem) {
            className = itemNode.getClass().getName();
            itemName = label = itemNode.getFullName();
          }
        }

        if (itemNode) {
          var iconUrl = qxl.apiviewer.TreeUtil.getIconUrl(itemNode);
          var iconCode = qxl.apiviewer.ui.ClassViewer.createImageHtml(iconUrl);

          if (qx.core.Environment.get("engine.name") == "webkit") {
            if (iconCode.indexOf("overlay_") !== -1) {
              style = "margin-left:18px;";
            }
          }
        } // Create a real bookmarkable link
        // NOTE: The onclick-handler must be added by HTML code. If it
        // is added using the DOM element then the href is followed.


        var fullItemName = itemNode && itemNode.getFullName ? itemNode.getFullName() : classNode && classNode.getFullName ? classNode.getFullName() : className;
        var protocol, host, pathname; // Opera 10.5 loses the reference to "window"
        // See http://bugzilla.qooxdoo.org/show_bug.cgi?id=3516 for details

        if (qx.core.Environment.get("engine.name") == "opera" && qx.core.Environment.get("engine.version") > 9) {
          protocol = location.protocol;
          host = location.host;
          pathname = location.pathname;
        } else {
          protocol = window.location.protocol;
          host = window.location.host;
          pathname = window.location.pathname;
        }

        var linkHtml = ["<span style=\"white-space: nowrap;\">", typeof iconCode != "undefined" ? iconCode : "", "<a style=\"" + style + "\" href=\"" + protocol, "//", host, pathname, "#", fullItemName, "\" onclick=\"return false;\"", "\" onmouseup=\"qxl.apiviewer.TabViewController.instance.onSelectItem('", fullItemName, "'); return false;\"", " title=\"", fullItemName, "\">", label, "</a></span>"];
        return linkHtml.join("");
      },

      /**
       * Creates the HTML showing the &#64;see attributes of an item.
       *
       * @param node
       *          {qxl.apiviewer.dao.ClassItem} the doc node of the item.
       * @return {String} the HTML showing the &#64;see attributes.
       */
      createSeeAlsoHtml: function createSeeAlsoHtml(node) {
        var see = node.getSee();

        if (see.length > 0) {
          var seeAlsoLinks = new qx.util.StringBuilder();

          for (var i = 0; i < see.length; i++) {
            if (seeAlsoLinks.length != 0) {
              seeAlsoLinks.add(", ");
            }

            var link = this.createItemLinkHtml(see[i], node);

            if (link.indexOf("http") === 0) {
              link = "<a target='_blank' href='" + link + "'>" + link + "</a>";
            }

            seeAlsoLinks.add(link);
          }

          if (!seeAlsoLinks.isEmpty()) {
            // We had @see attributes
            var seeAlsoHtml = new qx.util.StringBuilder();
            seeAlsoHtml.add("<div class=\"item-detail-headline\">", "See also:", "</div>", "<div class=\"item-detail-text\">", seeAlsoLinks, "</div>");
            return seeAlsoHtml.get();
          }
        } // Nothing found


        return "";
      },

      /**
       * Creates the HTML showing information about inheritance
       *
       * @param node
       *          {qxl.apiviewer.dao.ClassItem} item to get the information from
       * @param currentClassDocNode
       *          {qxl.apiviewer.dao.Class} the current class shown in the class
       *          viewer
       * @return {String} HTML fragment
       */
      createInheritedFromHtml: function createInheritedFromHtml(node, currentClassDocNode) {
        if (node.getClass().getType() != "mixin" && node.getClass() != currentClassDocNode) {
          var html = new qx.util.StringBuilder("<div class=\"item-detail-headline\">", "Inherited from:", "</div>", "<div class=\"item-detail-text\">", qxl.apiviewer.ui.panels.InfoPanel.createItemLinkHtml(node.getClass().getFullName() + "#" + node.getName()), "</div>");
          return html.get();
        }

        return "";
      },

      /**
       * Creates the HTML showing whether the item is overridden
       *
       * @param node
       *          {qxl.apiviewer.dao.ClassItem} item to get the the information from
       * @return {String} HTML fragment
       */
      createOverwriddenFromHtml: function createOverwriddenFromHtml(node) {
        if (node.getOverriddenFrom()) {
          var html = new qx.util.StringBuilder("<div class=\"item-detail-headline\">", "Overrides:", "</div>", "<div class=\"item-detail-text\">", qxl.apiviewer.ui.panels.InfoPanel.createItemLinkHtml(node.getOverriddenFrom().getFullName() + "#" + node.getName()), "</div>");
          return html.get();
        }

        return "";
      },

      /**
       * Creates the HTML showing whether the item is included from a mixin
       *
       * @param node
       *          {qxl.apiviewer.dao.ClassItem} item to get the the information from
       * @param currentClassDocNode
       *          {qxl.apiviewer.dao.Class} the current class shown in the class
       *          viewer
       * @return {String} HTML fragment
       */
      createIncludedFromHtml: function createIncludedFromHtml(node, currentClassDocNode) {
        if (node.getClass() != currentClassDocNode) {
          if (node.getClass().getType() == "mixin") {
            var html = new qx.util.StringBuilder("<div class=\"item-detail-headline\">", "Included from mixin:", "</div>", "<div class=\"item-detail-text\">", qxl.apiviewer.ui.panels.InfoPanel.createItemLinkHtml(node.getClass().getFullName() + "#" + node.getName()), "</div>");
            return html.get();
          }
        } else {
          return "";
        }
      },

      /**
       * Gets a class item from baseClassNode. if it is not found there, the
       * class' hierarchy is searched until the item is found.
       *
       * @param itemName
       *          {String} the name of the item.
       * @param baseClassNode
       *          {qxl.apiviewer.dao.Class} class doc node
       * @return {qxl.apiviewer.dao.ClassItem} the classItem
       *
       */
      __getItemFromClassHierarchy__P_607_2: function __getItemFromClassHierarchy__P_607_2(itemName, baseClassNode) {
        var itemNode = baseClassNode.getItem(itemName);

        if (itemNode) {
          return itemNode;
        }

        var classNodes = baseClassNode.getClassHierarchy();

        for (var i = 0, l = classNodes.length; i < l; i++) {
          var currClassNode = classNodes[i];
          itemNode = currClassNode.getItem(itemName);

          if (itemNode) {
            break;
          }
        }

        return itemNode;
      },

      /**
       * Creates the HTML showing the description of an item.
       *
       * @param node
       *          {qxl.apiviewer.dao.Node} the doc node of the item.
       * @param packageBaseClass
       *          {qxl.apiviewer.dao.Class|qxl.apiviewer.dao.Package?null} the doc node of
       *          the class to use for auto-adding packages.
       * @param showDetails
       *          {Boolean} whether to show details. If <code>false</code> only
       *          the first sentence of the description will be shown.
       * @return {String} the HTML showing the description.
       */
      createDescriptionHtml: function createDescriptionHtml(node, packageBaseClass, showDetails) {
        var desc = node.getDescription();

        if (desc) {
          if (!showDetails) {
            desc = this.__extractFirstSentence__P_607_3(desc);
          }

          return "<div class=\"item-desc\">" + this.resolveLinkAttributes(desc, packageBaseClass) + "</div>";
        }

        return "";
      },

      /**
       * Extracts the first sentence from a text.
       *
       * @param text
       *          {String} the text.
       * @return {String} the first sentence from the text.
       */
      __extractFirstSentence__P_607_3: function __extractFirstSentence__P_607_3(text) {
        var ret = text; // Extract first block

        var pos = ret.indexOf("</p>");

        if (pos != -1) {
          ret = ret.substr(0, pos + 4);
          var hit = this.SENTENCE_END_REGEX.exec(ret);

          if (hit != null) {
            ret = text.substring(0, hit.index + hit[0].length - 1) + "</p>";
          }
        }

        return ret;
      },

      /**
       * Returns whether the description of an item has details (has more than one
       * sentence).
       *
       * @param node
       *          {qxl.apiviewer.dao.Node} the doc node of the item.
       * @return {Boolean} whether the description of an item has details.
       */
      descriptionHasDetails: function descriptionHasDetails(node) {
        var desc = node.getDescription();

        if (desc) {
          return this.__extractFirstSentence__P_607_3(desc) != desc;
        }

        return false;
      },

      /**
       * Creates the HTML showing the type of a doc node.
       *
       * @param typeNode
       *          {qxl.apiviewer.dao.ClassItem} the doc node to show the type for.
       * @param defaultType
       *          {String} the type name to use if <code>typeNode</code> is
       *          <code>null</code> or defines no type.
       * @param useShortName
       *          {Boolean?true} whether to use short class names (without
       *          package).
       * @return {String} the HTML showing the type.
       */
      createTypeHtml: function createTypeHtml(typeNode, defaultType, useShortName) {
        if (useShortName == null) {
          useShortName = true;
        }

        var types = [];
        var typeDimensions, typeName, linkText;

        if (typeNode) {
          types = typeNode.getTypes();
        }

        var typeHtml = new qx.util.StringBuilder();

        if (types.length == 0) {
          typeHtml.add(defaultType);
        } else {
          if (types.length > 1) {
            typeHtml.add("(");
          }

          for (var j = 0; j < types.length; j++) {
            if (j > 0) {
              typeHtml.add(" | ");
            }

            typeName = types[j].type;
            typeDimensions = types[j].dimensions;

            if (qxl.apiviewer.ui.ClassViewer.PRIMITIVES[typeName]) {
              if (qxl.apiviewer.ui.ClassViewer.MDC_LINKS[typeName]) {
                typeHtml.add("<span style=\"white-space: nowrap;\"><a href=\"" + qxl.apiviewer.ui.ClassViewer.MDC_LINKS[typeName] + "\" target=\"_blank\" title=\"" + typeName + "\">" + typeName + "</a></span>");
              } else {
                typeHtml.add(typeName);
              }
            } else {
              linkText = typeName;

              if (useShortName) {
                var lastDot = typeName.lastIndexOf(".");

                if (lastDot != -1) {
                  linkText += " " + typeName.substring(lastDot + 1);
                }
              }

              typeHtml.add(qxl.apiviewer.ui.panels.InfoPanel.createItemLinkHtml(linkText, typeNode.getClass(), false, true));
            }

            if (typeDimensions) {
              for (var i = 0; i < parseInt(typeDimensions); i++) {
                typeHtml.add("[]");
              }
            }
          }

          if (types.length > 1) {
            typeHtml.add(")");
          }
        }

        return typeHtml.get();
      },

      /**
       * Creates the HTML showing the documentation errors of an item.
       *
       * @param node
       *          {qxl.apiviewer.dao.Node} the doc node of the item.
       * @param currentClassDocNode
       *          {Map} the doc node of the currently displayed class
       * @return {String} the HTML showing the documentation errors.
       */
      createErrorHtml: function createErrorHtml(node, currentClassDocNode) {
        var errors = node.getErrors();

        if (errors.length > 0) {
          var html = new qx.util.StringBuilder("<div class=\"item-detail-error\">", "Documentation errors:", "</div>");

          for (var i = 0; i < errors.length; i++) {
            html.add("<div class=\"item-detail-text\">", errors[i].attributes.msg, " <br/>");

            if (errors[i].attributes.line || node.getClass() != currentClassDocNode) {
              html.add("(");

              if (node.getClass() != currentClassDocNode) {
                html.add(node.getClass().getFullName(), "; ");
              }

              if (errors[i].attributes.line) {
                html.add("Line: ", errors[i].attributes.line);

                if (errors[i].attributes.column) {
                  html.add(", Column:", errors[i].attributes.column);
                }
              }

              html.add(")");
            }

            html.add("</div>");
          }

          return html.get();
        }

        return "";
      },

      /**
       * Creates the HTML showing whether the item is deprecated
       *
       * @param node
       *          {qxl.apiviewer.dao.ClassItem} the doc node of the item.
       * @param itemName
       *          {String} type of the item, e.g. "method", "property",
       *          "constant", ...
       * @return {String} the HTML fragment.
       */
      createDeprecationHtml: function createDeprecationHtml(node, itemName) {
        if (!node.isDeprecated()) {
          return "";
        }

        var html = new qx.util.StringBuilder();
        html.add("<div class=\"item-detail-error\">", "Deprecated:", "</div>");
        html.add("<div class=\"item-detail-text\">");
        var desc = node.getDeprecationText();

        if (desc) {
          html.add(desc);
        } else {
          html.add("This ", itemName, " is deprecated!");
        }

        html.add("</div>");
        return html.get();
      },

      /**
       * Creates the HTML showing the access protection for a class item.
       *
       * @param node
       *          {qxl.apiviewer.dao.ClassItem} the doc node of the item.
       * @return {String} the HTML fragment.
       */
      createAccessHtml: function createAccessHtml(node) {
        if (node.isPublic()) {
          return "";
        }

        var html = new qx.util.StringBuilder();
        html.add("<div class=\"item-detail-headline\">", "Access:", "</div>");
        html.add("<div class=\"item-detail-text\">");
        var access = [];

        if (node.isPrivate()) {
          access.push("private");
        }

        if (node.isInternal()) {
          access.push("internal");
        }

        if (node.isProtected()) {
          access.push("protected");
        }

        html.add(access.join(" "));
        html.add("</div>");
        return html.get();
      },

      /**
       * Creates the HTML showing interfaces requiring this node
       *
       * @param node
       *          {qxl.apiviewer.dao.ClassItem} the doc node of the item.
       * @return {String} the HTML.
       */
      createInfoRequiredByHtml: function createInfoRequiredByHtml(node) {
        var html = new qx.util.StringBuilder();
        var requiredBy = node.getRequiredBy();

        if (requiredBy.length > 0) {
          html.add("<div class=\"item-detail-headline\">", "Required by:", "</div>");

          for (var i = 0; i < requiredBy.length; i++) {
            html.add("<div class=\"item-detail-text\">", qxl.apiviewer.ui.panels.InfoPanel.createItemLinkHtml(requiredBy[i].getFullName() + "#" + node.getName()), "</div>");
          }
        }

        return html.get();
      },

      /**
       * Creates the link to the source file that definen an item
       *
       * @param node
       *          {qxl.apiviewer.dao.ClassItem} the doc node of the item.
       * @return {String} the HTML.
       */
      createSourceLinkHtml: function createSourceLinkHtml(node) {
        if (!node.getLineNumber || !node.getLineNumber()) {
          return "";
        }

        var sourceUri = qxl.apiviewer.ui.ClassViewer.getSourceUri(node);

        if (!sourceUri) {
          return "";
        }

        var title;

        if (node instanceof qxl.apiviewer.dao.Class) {
          title = node.getFullName();
        } else {
          title = node.getClass().getFullName() + "#" + node.getName();
        }

        var html = new qx.util.StringBuilder();
        html.add("<div class=\"item-detail-headline\">", "View Source:", "</div>");
        html.add("<div class=\"item-detail-text\">", "<a href=\"" + sourceUri + "\" target=\"_blank\">" + title + "</a>", "</div>");
        return html.get();
      },

      /**
       * Wraps a HTML fragment with a "span" element with CSS classes for the
       * item.
       *
       * @param node
       *          {qxl.apiviewer.dao.Class} class doc node
       * @param title
       *          {String} original title
       * @return {String} HMTL fragment
       */
      setTitleClass: function setTitleClass(node, title) {
        var html = ["<span class='", "", "'>", title, "</span>"];
        html[1] = this.getItemCssClasses(node);
        return html.join("");
      },

      /**
       * Gets CSS classes for a class item
       *
       * @param node
       *          {qxl.apiviewer.dao.Class} class doc node
       * @return {String} CSS classes separated by " "
       */
      getItemCssClasses: function getItemCssClasses(node) {
        var cssClasses = [];

        if (node instanceof qxl.apiviewer.dao.Class) {
          if (node.isDeprecated()) {
            cssClasses.push("item-deprecated");
          }

          if (node.isPrivate()) {
            cssClasses.push("item-private");
          }

          if (node.isInternal()) {
            cssClasses.push("item-internal");
          }

          if (node.isProtected()) {
            cssClasses.push("item-protected");
          }
        }

        return cssClasses.join(" ");
      }
    }
  });
  qxl.apiviewer.ui.panels.InfoPanel.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qxl.apiviewer.ui.panels.InfoPanel": {
        "construct": true,
        "require": true
      },
      "qxl.apiviewer.dao.Class": {}
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
       * Til Schneider (til132)
       * Sebastian Werner (wpbasti)
       * Andreas Ecker (ecker)
       * Fabian Jakobs (fjakobs)
       * John Spackman (johnspackman) of Zenesis Ltd (http://www.zenesis.com)
  
  ************************************************************************ */
  qx.Class.define("qxl.apiviewer.ui.panels.ClassPanel", {
    extend: qxl.apiviewer.ui.panels.InfoPanel,

    /**
    * Creates class panel. An class panel shows information about classes, mixins
    * and interfaces
    *
    * @param labelText {String} the label text describing the node type.
    */
    construct: function construct(labelText) {
      qxl.apiviewer.ui.panels.InfoPanel.constructor.call(this, labelText);
    },
    properties: {
      type: {
        init: "class",
        check: ["class", "mixin", "interface"]
      }
    },
    members: {
      /**
       * @Override
       */
      canDisplayItem: function canDisplayItem(dao) {
        if (!(dao instanceof qxl.apiviewer.dao.Class)) {
          return false;
        }

        return dao.getType() == this.getType();
      },
      getItemTypeHtml: function getItemTypeHtml(node) {
        return qxl.apiviewer.ui.panels.InfoPanel.createItemLinkHtml(node.getName(), node, false, true);
      },
      getItemTitleHtml: function getItemTitleHtml(node) {
        return node.getFullName();
      },
      getItemTextHtml: function getItemTextHtml(node, getDocNode, showDetails) {
        if (showDetails) {
          return qxl.apiviewer.ui.panels.InfoPanel.resolveLinkAttributes(node.getDescription(), node);
        }

        return qxl.apiviewer.ui.panels.InfoPanel.createDescriptionHtml(node, node, showDetails);
      },
      getItemTooltip: function getItemTooltip(classNode, currentClassDocNode) {
        if (classNode.isAbstract()) {
          var tooltip = "Abstract ";
        } else if (classNode.isStatic()) {
          var tooltip = "Static ";
        } else if (classNode.isSingleton()) {
          var tooltip = "Singleton ";
        } else {
          var tooltip = "";
        }

        switch (classNode.getType()) {
          case "mixin":
            tooltip += "Mixin";
            break;

          case "interface":
            tooltip += "Interface";
            break;

          default:
            tooltip += "Class";
            break;
        }

        return tooltip;
      },
      itemHasDetails: function itemHasDetails(node, currentClassDocNode) {
        return qxl.apiviewer.ui.panels.InfoPanel.descriptionHasDetails(node);
      },

      /**
       * Updates an info panel.
       *
       * @param classViewer {qxl.apiviewer.ui.ClassViewer} parent class viewer widget.
       * @param currentClassDocNode {qxl.apiviewer.dao.Class} the currently displayed class
       * @return {qx.Promise}
       */
      update: function update(classViewer, currentClassDocNode) {
        if (!this.getElement()) {
          return;
        }

        return this.setDocNodeAsync(currentClassDocNode).then(() => currentClassDocNode.loadDependedClasses()).then(classes => {
          var nodeArr = [];
          var clType;

          for (var i = 0; i < classes.length; i++) {
            clType = classes[i].getType(); // Normalize pseudo-classes (for the user this detail is often not relevant)

            if (clType === "bootstrap" || clType === "list") {
              clType = "class";
            }

            if (clType === this.getType()) {
              nodeArr.push(classes[i]);
            }
          }

          if (nodeArr && nodeArr.length > 0) {
            classViewer.sortItems(nodeArr);
          }

          this._displayNodes(nodeArr, currentClassDocNode);
        });
      }
    }
  });
  qxl.apiviewer.ui.panels.ClassPanel.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qxl.apiviewer.ui.panels.InfoPanel": {
        "require": true
      },
      "qxl.apiviewer.dao.Package": {}
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
       * Til Schneider (til132)
       * Sebastian Werner (wpbasti)
       * Andreas Ecker (ecker)
       * Fabian Jakobs (fjakobs)
       * John Spackman (johnspackman) of Zenesis Ltd (http://www.zenesis.com)
  
  ************************************************************************ */
  qx.Class.define("qxl.apiviewer.ui.panels.PackagePanel", {
    extend: qxl.apiviewer.ui.panels.InfoPanel,
    members: {
      /**
       * @Override
       */
      canDisplayItem: function canDisplayItem(dao) {
        return dao instanceof qxl.apiviewer.dao.Package;
      },
      getPanelItemObjects: function getPanelItemObjects(daoClass, showInherited) {
        return daoClass.getPackages();
      },
      getItemTypeHtml: function getItemTypeHtml(node) {
        return qxl.apiviewer.ui.panels.InfoPanel.createItemLinkHtml(node.getFullName(), null, false, true);
      },
      getItemTitleHtml: function getItemTitleHtml(node) {
        return node.getFullName();
      },
      getItemTextHtml: function getItemTextHtml(node, getDocNode, showDetails) {
        if (showDetails) {
          return qxl.apiviewer.ui.panels.InfoPanel.resolveLinkAttributes(node.getDescription(), node);
        }

        return qxl.apiviewer.ui.panels.InfoPanel.createDescriptionHtml(node, node.getPackage(), showDetails);
      },
      getItemTooltip: function getItemTooltip(classNode, currentClassDocNode) {
        return "Package";
      },
      itemHasDetails: function itemHasDetails(node, currentClassDocNode) {
        return qxl.apiviewer.ui.panels.InfoPanel.descriptionHasDetails(node);
      },

      /**
       * Updates an info panel.
       *
       * @param classViewer {qxl.apiviewer.ui.ClassViewer} parent class viewer widget.
       * @param currentClassDocNode {qxl.apiviewer.dao.Class} the currently displayed class
       */
      update: function update(classViewer, currentClassDocNode) {
        if (!this.getElement()) {
          return;
        }

        return this.setDocNodeAsync(currentClassDocNode).then(() => {
          var nodeArr = currentClassDocNode.getPackages();

          if (nodeArr && nodeArr.length > 0) {
            classViewer.sortItems(nodeArr);
          }

          this._displayNodes(nodeArr, currentClassDocNode);
        });
      }
    }
  });
  qxl.apiviewer.ui.panels.PackagePanel.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qxl.apiviewer.ui.panels.InfoPanel": {
        "construct": true,
        "require": true
      },
      "qx.util.StringBuilder": {},
      "qxl.apiviewer.ui.ClassViewer": {}
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
       * Til Schneider (til132)
       * Sebastian Werner (wpbasti)
       * Andreas Ecker (ecker)
       * Fabian Jakobs (fjakobs)
       * John Spackman (johnspackman) of Zenesis Ltd (http://www.zenesis.com)
  
  ************************************************************************ */
  qx.Class.define("qxl.apiviewer.ui.panels.AbstractMethodPanel", {
    extend: qxl.apiviewer.ui.panels.InfoPanel,
    construct: function construct(caption, icon) {
      qxl.apiviewer.ui.panels.InfoPanel.constructor.call(this, caption, icon);
    },
    members: {
      _canShowInherited: function _canShowInherited() {
        return true;
      },
      getPanelItemObjects: function getPanelItemObjects(daoClass, showInherited) {
        var arr = daoClass.getMethods();

        if (showInherited) {
          arr = arr.concat(daoClass.getMixinMethods());
        }

        return arr;
      },

      /**
      * Get the title HTML for a method
      *
      * @param method {qxl.apiviewer.dao.Method} The method doc node.
      * @return {String} The HTML fragment of the title.
      */
      getItemTitleHtml: function getItemTitleHtml(method) {
        if (method.isConstructor()) {
          var title = method.getClass().getName();
        } else {
          title = method.getName();
        }

        var titleHtml = new qx.util.StringBuilder(qxl.apiviewer.ui.panels.InfoPanel.setTitleClass(method, title)); // Add the title (the method signature)

        titleHtml.add("<span class=\"method-signature\"><span class=\"parenthesis\">(</span>");
        var params = method.getParams();

        for (var i = 0; i < params.length; i++) {
          var param = params[i];

          if (i != 0) {
            titleHtml.add("<span class=\"separator\">,</span> ");
          }

          titleHtml.add("<span class=\"parameter-type\">", qxl.apiviewer.ui.panels.InfoPanel.createTypeHtml(param, "var"), "</span> <code>", param.getName(), "</code>");

          if (param.isOptional()) {
            titleHtml.add("?");
          }
        }

        titleHtml.add("<span class=\"parenthesis\">)</span></span>");
        return titleHtml.get();
      },

      /**
      * Get the type HTML for a method
      *
      * @param method {qxl.apiviewer.dao.Method} The method doc node.
      * @return {String} The HTML fragment of the type.
      */
      getItemTypeHtml: function getItemTypeHtml(method) {
        var typeHtml = new qx.util.StringBuilder();

        if (method.isAbstract() && method.getClass().isAbstract()) {
          typeHtml.add("abstract ");
        }

        if (!method.isConstructor()) {
          typeHtml.add(qxl.apiviewer.ui.panels.InfoPanel.createTypeHtml(method.getReturn(), "void"));
        }

        return typeHtml.get();
      },

      /**
      * Creates the HTML showing the information about a method.
      *
      * @param method {qxl.apiviewer.dao.Method} the doc node of the method.
      * @param currentClassDocNode {qxl.apiviewer.dao.Class} the doc node of the currently displayed class
      * @param showDetails {Boolean} whether to show the details.
      * @return {String} the HTML showing the information about the method.
      */
      getItemTextHtml: function getItemTextHtml(method, currentClassDocNode, showDetails) {
        var docClass = method.getClass(); // Add the description

        var textHtml = new qx.util.StringBuilder();

        if (method.isConstructor() && !method.getDescription()) {
          textHtml.add("Creates a new instance of ", docClass.getName(), ".");
        } else {
          textHtml.add(qxl.apiviewer.ui.panels.InfoPanel.createDescriptionHtml(method, docClass, showDetails));
        }

        if (showDetails) {
          // Add Parameters
          var params = method.getParams();

          if (params.length > 0) {
            textHtml.add("<div class=\"item-detail-headline\">", "Parameters:", "</div>");

            for (var i = 0; i < params.length; i++) {
              var param = params[i];
              var paramType = param.getTypes() ? param.getTypes() : "var";
              var dims = param.getArrayDimensions();

              if (dims) {
                for (var i = 0; i < dims; i++) {
                  paramType += "[]";
                }
              }

              var defaultValue = param.getDefaultValue();
              textHtml.add("<div class=\"item-detail-text\">");

              if (defaultValue) {
                textHtml.add("<span class=\"item-detail-optional\">");
              }

              textHtml.add("<code>", param.getName(), "</code>");

              if (defaultValue) {
                textHtml.add(" (" + (param.isOptional() ? "optional; " : "") + "default: ", defaultValue, ") ");
              } else if (param.isOptional()) {
                textHtml.add(" (optional) ");
              }

              textHtml.add("</span>");
              var desc = param.getDescription();

              if (desc) {
                textHtml.add(" ", qxl.apiviewer.ui.panels.InfoPanel.resolveLinkAttributes(desc, docClass));
              }

              textHtml.add("</div>");
            }
          } // Add return value


          var returnNode = method.getReturn();

          if (returnNode) {
            var desc = returnNode.getDescription();

            if (desc) {
              textHtml.add("<div class=\"item-detail-headline\">", "Returns:", "</div>", "<div class=\"item-detail-text\">", qxl.apiviewer.ui.panels.InfoPanel.resolveLinkAttributes(desc, docClass), "</div>");
            }
          }

          var applyToProperties = method.getApplyFor();

          if (applyToProperties && applyToProperties.length > 0) {
            // gabi check
            textHtml.add("<div class=\"item-detail-headline\">", applyToProperties.length == 1 ? "Apply method of property:" : "Apply method of properties:", "</div>", "<div class=\"item-detail-text\">");

            for (var i = 0; i < applyToProperties.length; i++) {
              textHtml.add(qxl.apiviewer.ui.panels.InfoPanel.createItemLinkHtml(applyToProperties[i], method.getClass(), true, true), ", ");
            }

            textHtml.add("</div>");
          } // Add throws


          var throwsEntries = method.getThrows();

          if (throwsEntries.length > 0) {
            textHtml.add("<div class=\"item-detail-headline\">", "Throws:", "</div>");

            for (var i = 0; i < throwsEntries.length; i++) {
              var throwsEntry = throwsEntries[i];
              var throwsEntryType = throwsEntry.getType() ? throwsEntry.getType() : throwsEntry.getDefaultType();
              textHtml.add("<div class=\"item-detail-text\">");
              textHtml.add("<span class=\"parameter-type\">", throwsEntryType === throwsEntry.getDefaultType() ? throwsEntry.getDefaultType() : qxl.apiviewer.ui.panels.InfoPanel.createItemLinkHtml(throwsEntryType), "</span>");
              var desc = throwsEntry.getDescription();

              if (desc) {
                textHtml.add(" ", qxl.apiviewer.ui.panels.InfoPanel.resolveLinkAttributes(desc, docClass));
              }

              textHtml.add("</div>");
            }
          }

          textHtml.add(qxl.apiviewer.ui.panels.InfoPanel.createAccessHtml(method));
          textHtml.add(qxl.apiviewer.ui.panels.InfoPanel.createIncludedFromHtml(method, currentClassDocNode));
          textHtml.add(qxl.apiviewer.ui.panels.InfoPanel.createOverwriddenFromHtml(method));
          textHtml.add(qxl.apiviewer.ui.panels.InfoPanel.createInheritedFromHtml(method, currentClassDocNode));
          textHtml.add(qxl.apiviewer.ui.panels.InfoPanel.createInfoRequiredByHtml(method));
          textHtml.add(qxl.apiviewer.ui.panels.InfoPanel.createSeeAlsoHtml(method));
          textHtml.add(qxl.apiviewer.ui.panels.InfoPanel.createErrorHtml(method, currentClassDocNode));
          textHtml.add(qxl.apiviewer.ui.panels.InfoPanel.createDeprecationHtml(method, "function"));
          textHtml.add(qxl.apiviewer.ui.panels.InfoPanel.createSourceLinkHtml(method));
        }

        return textHtml.get();
      },

      /**
      * Checks whether a method has details.
      *
      * @param node {Map} the doc node of the method.
      * @param currentClassDocNode {Map} the doc node of the currently displayed class
      * @return {Boolean} whether the method has details.
      */
      itemHasDetails: function itemHasDetails(node, currentClassDocNode) {
        // Get the method node that holds the documentation
        var hasReturn = node.getReturn() && node.getReturn().getDescription();
        return node.getClass() != currentClassDocNode || // method is inherited
        node.getOverriddenFrom() != null || node.getRequiredBy().length > 0 || node.getParams().length > 0 || node.getThrows().length > 0 || hasReturn || node.getSee().length > 0 || node.getErrors().length > 0 || node.isDeprecated() || node.getApplyFor() || qxl.apiviewer.ui.panels.InfoPanel.descriptionHasDetails(node) || qxl.apiviewer.ui.ClassViewer.getSourceUri(node);
      }
    }
  });
  qxl.apiviewer.ui.panels.AbstractMethodPanel.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qxl.apiviewer.ui.panels.AbstractMethodPanel": {
        "construct": true,
        "require": true
      },
      "qxl.apiviewer.dao.Method": {}
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
       * Til Schneider (til132)
       * Sebastian Werner (wpbasti)
       * Andreas Ecker (ecker)
       * Fabian Jakobs (fjakobs)
       * John Spackman (johnspackman) of Zenesis Ltd (http://www.zenesis.com)
  
  ************************************************************************ */
  qx.Class.define("qxl.apiviewer.ui.panels.ConstructorPanel", {
    extend: qxl.apiviewer.ui.panels.AbstractMethodPanel,
    construct: function construct() {
      qxl.apiviewer.ui.panels.AbstractMethodPanel.constructor.call(this, "Constructor", "qxl/apiviewer/image/constructor18.gif");
    },
    members: {
      /**
       * @Override
       */
      canDisplayItem: function canDisplayItem(dao) {
        return dao instanceof qxl.apiviewer.dao.Method && dao.getName() == "construct";
      },
      getPanelItemObjects: function getPanelItemObjects(daoClass, showInherited) {
        return daoClass.getConstructor();
      }
    }
  });
  qxl.apiviewer.ui.panels.ConstructorPanel.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qxl.apiviewer.ui.panels.InfoPanel": {
        "construct": true,
        "require": true
      },
      "qxl.apiviewer.dao.Event": {},
      "qx.util.StringBuilder": {}
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
       * Til Schneider (til132)
       * Sebastian Werner (wpbasti)
       * Andreas Ecker (ecker)
       * Fabian Jakobs (fjakobs)
       * John Spackman (johnspackman) of Zenesis Ltd (http://www.zenesis.com)
  
  ************************************************************************ */
  qx.Class.define("qxl.apiviewer.ui.panels.EventPanel", {
    extend: qxl.apiviewer.ui.panels.InfoPanel,
    construct: function construct() {
      qxl.apiviewer.ui.panels.InfoPanel.constructor.call(this, "Events", "qxl/apiviewer/image/event18.gif");
    },
    members: {
      /**
       * @Override
       */
      canDisplayItem: function canDisplayItem(dao) {
        return dao instanceof qxl.apiviewer.dao.Event;
      },
      _canShowInherited: function _canShowInherited() {
        return true;
      },
      getPanelItemObjects: function getPanelItemObjects(daoClass, showInherited) {
        var arr = daoClass.getEvents();

        if (showInherited) {
          arr = arr.concat(daoClass.getMixinEvents());
        }

        return arr;
      },

      /**
       * Checks whether an event has details.
       *
       * @param node {Map} the doc node of the event.
       * @param currentClassDocNode {Map} the doc node of the currently displayed class
       * @return {Boolean} whether the event has details.
       */
      itemHasDetails: function itemHasDetails(node, currentClassDocNode) {
        return node.getClass() != currentClassDocNode || // event is inherited
        node.getSee().length > 0 || node.getErrors().length > 0 || qxl.apiviewer.ui.panels.InfoPanel.descriptionHasDetails(node);
      },
      getItemTypeHtml: function getItemTypeHtml(node) {
        return qxl.apiviewer.ui.panels.InfoPanel.createTypeHtml(node, "var");
      },
      getItemTitleHtml: function getItemTitleHtml(node) {
        return qxl.apiviewer.ui.panels.InfoPanel.setTitleClass(node, node.getName());
      },

      /**
       * Creates the HTML showing the information about an event.
       *
       * @param node {Map} the doc node of the event.
       * @param currentClassDocNode {Map} the doc node of the currently displayed class
       * @param showDetails {Boolean} whether to show the details.
       * @return {String} the HTML showing the information about the event.
       */
      getItemTextHtml: function getItemTextHtml(node, currentClassDocNode, showDetails) {
        // Add the description
        var textHtml = new qx.util.StringBuilder(qxl.apiviewer.ui.panels.InfoPanel.createDescriptionHtml(node, node.getClass(), showDetails));

        if (showDetails) {
          textHtml.add(qxl.apiviewer.ui.panels.InfoPanel.createInheritedFromHtml(node, currentClassDocNode));
          textHtml.add(qxl.apiviewer.ui.panels.InfoPanel.createSeeAlsoHtml(node));
          textHtml.add(qxl.apiviewer.ui.panels.InfoPanel.createErrorHtml(node, currentClassDocNode));
          textHtml.add(qxl.apiviewer.ui.panels.InfoPanel.createDeprecationHtml(node, "event"));
        }

        return textHtml.get();
      }
    }
  });
  qxl.apiviewer.ui.panels.EventPanel.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qxl.apiviewer.ui.panels.AbstractMethodPanel": {
        "construct": true,
        "require": true
      },
      "qxl.apiviewer.dao.Method": {}
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
       * Til Schneider (til132)
       * Sebastian Werner (wpbasti)
       * Andreas Ecker (ecker)
       * Fabian Jakobs (fjakobs)
       * John Spackman (johnspackman) of Zenesis Ltd (http://www.zenesis.com)
  
  ************************************************************************ */
  qx.Class.define("qxl.apiviewer.ui.panels.StaticMethodsPanel", {
    extend: qxl.apiviewer.ui.panels.AbstractMethodPanel,
    construct: function construct() {
      qxl.apiviewer.ui.panels.AbstractMethodPanel.constructor.call(this, "Static Members", ["qxl/apiviewer/image/method_public18.gif", "qxl/apiviewer/image/overlay_static18.gif"]);
    },
    members: {
      /**
       * @Override
       */
      canDisplayItem: function canDisplayItem(dao) {
        return dao instanceof qxl.apiviewer.dao.Method && dao.isStatic();
      },
      getPanelItemObjects: function getPanelItemObjects(daoClass, showInherited) {
        return daoClass.getStatics();
      }
    }
  });
  qxl.apiviewer.ui.panels.StaticMethodsPanel.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qxl.apiviewer.ui.panels.InfoPanel": {
        "construct": true,
        "require": true
      },
      "qxl.apiviewer.dao.Constant": {},
      "qx.lang.Json": {},
      "qx.bom.String": {},
      "qx.util.StringBuilder": {}
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
       * Til Schneider (til132)
       * Sebastian Werner (wpbasti)
       * Andreas Ecker (ecker)
       * Fabian Jakobs (fjakobs)
       * John Spackman (johnspackman) of Zenesis Ltd (http://www.zenesis.com)
  
  ************************************************************************ */
  qx.Class.define("qxl.apiviewer.ui.panels.ConstantPanel", {
    extend: qxl.apiviewer.ui.panels.InfoPanel,
    construct: function construct() {
      qxl.apiviewer.ui.panels.InfoPanel.constructor.call(this, "Constants", "qxl/apiviewer/image/constant18.gif");
    },
    members: {
      /**
       * @Override
       */
      canDisplayItem: function canDisplayItem(dao) {
        return dao instanceof qxl.apiviewer.dao.Constant;
      },
      getPanelItemObjects: function getPanelItemObjects(daoClass, showInherited) {
        return daoClass.getConstants();
      },

      /**
       * Checks whether a constant has details.
       *
       * @param node {Map} the doc node of the constant.
       * @param currentClassDocNode {Map} the doc node of the currently displayed class
       * @return {Boolean} whether the constant has details.
       */
      itemHasDetails: function itemHasDetails(node, currentClassDocNode) {
        return node.getSee().length > 0 || node.getErrors().length > 0 || qxl.apiviewer.ui.panels.InfoPanel.descriptionHasDetails(node) || this.__hasConstantValueHtml__P_608_0(node);
      },
      getItemTypeHtml: function getItemTypeHtml(node) {
        return qxl.apiviewer.ui.panels.InfoPanel.createTypeHtml(node, "var");
      },
      getItemTitleHtml: function getItemTitleHtml(node) {
        return qxl.apiviewer.ui.panels.InfoPanel.setTitleClass(node, node.getName());
      },

      /**
       * Creates the HTML showing the information about a constant.
       *
       * @param node {Map} the doc node of the constant.
       * @param currentClassDocNode {Map} the doc node of the currently displayed class
       * @param showDetails {Boolean} whether to show the details.
       * @return {String} the HTML showing the information about the constant.
       */
      getItemTextHtml: function getItemTextHtml(node, currentClassDocNode, showDetails) {
        var textHtml = qxl.apiviewer.ui.panels.InfoPanel.createDescriptionHtml(node, node.getClass(), showDetails);

        if (showDetails) {
          textHtml += this.__createConstantValueHtml__P_608_1(node);
          textHtml += qxl.apiviewer.ui.panels.InfoPanel.createSeeAlsoHtml(node);
          textHtml += qxl.apiviewer.ui.panels.InfoPanel.createErrorHtml(node, currentClassDocNode);
          textHtml += qxl.apiviewer.ui.panels.InfoPanel.createDeprecationHtml(node, "constant");
        }

        return textHtml;
      },

      /**
       * Checks whether a constant value is provided
       *
       * @param node {Map} the doc node of the item.
       * @return {Boolean} whether the constant provides a value
       */
      __hasConstantValueHtml__P_608_0: function __hasConstantValueHtml__P_608_0(node) {
        return Boolean(node.getValue());
      },

      /**
       * Creates the HTML showing the value of a constant
       *
       * @param node {Map} the doc node of the item.
       * @return {String} the HTML showing the value of the constant
       */
      __createConstantValueHtml__P_608_1: function __createConstantValueHtml__P_608_1(node) {
        if (this.__hasConstantValueHtml__P_608_0(node)) {
          var value = node.getValue();

          if (typeof value !== "string") {
            value = qx.lang.Json.stringify(value);
          }

          value = qx.bom.String.escape(value);
          var html = new qx.util.StringBuilder("<div class=\"item-detail-headline\">", "Value: ", "</div>", "<div class=\"item-detail-text\">", value, "</div>");
          return html.get();
        }

        return "";
      }
    }
  });
  qxl.apiviewer.ui.panels.ConstantPanel.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qxl.apiviewer.ui.panels.InfoPanel": {
        "construct": true,
        "require": true
      },
      "qxl.apiviewer.dao.Property": {},
      "qx.lang.String": {},
      "qx.util.StringBuilder": {},
      "qx.lang.Array": {},
      "qx.dev.Tokenizer": {}
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
       * Til Schneider (til132)
       * Sebastian Werner (wpbasti)
       * Andreas Ecker (ecker)
       * Fabian Jakobs (fjakobs)
       * John Spackman (johnspackman) of Zenesis Ltd (http://www.zenesis.com)
  
  ************************************************************************ */
  qx.Class.define("qxl.apiviewer.ui.panels.PropertyPanel", {
    extend: qxl.apiviewer.ui.panels.InfoPanel,
    construct: function construct() {
      qxl.apiviewer.ui.panels.InfoPanel.constructor.call(this, "Properties", "qxl/apiviewer/image/property18.gif");
    },
    members: {
      /**
       * @Override
       */
      canDisplayItem: function canDisplayItem(dao) {
        return dao instanceof qxl.apiviewer.dao.Property;
      },
      _canShowInherited: function _canShowInherited() {
        return true;
      },
      getPanelItemObjects: function getPanelItemObjects(daoClass, showInherited) {
        var arr = daoClass.getProperties();

        if (showInherited) {
          arr = arr.concat(daoClass.getMixinProperties());
        }

        return arr;
      },
      __createGeneratedMethodsHtml__P_609_0: function __createGeneratedMethodsHtml__P_609_0(node, currentClassDocNode) {
        if (node.isRefined()) {
          return "";
        }

        if (node.isPrivate()) {
          var access = "____P_609_1";
          var name = node.getName().substring(2);
        } else if (node.isProtected()) {
          access = "_";
          name = node.getName().substring(1);
        } else {
          access = "";
          name = node.getName();
        }

        name = qx.lang.String.firstUp(name);
        var generatedMethods = [];
        generatedMethods.push("{@link #" + access + "set" + name + "}</td><td> Set the property value.");

        if (!node.isPropertyGroup()) {
          generatedMethods.push("{@link #" + access + "get" + name + "}</td><td> Get the property value.");
          generatedMethods.push("{@link #" + access + "init" + name + "}</td><td> Call apply method with the init value.");
        }

        generatedMethods.push("{@link #" + access + "reset" + name + "}</td><td> Reset the property value.");

        if (node.getType() == "Boolean") {
          generatedMethods.push("{@link #" + access + "toggle" + name + "}</td><td> Toggle the property value.");
          generatedMethods.push("{@link #" + access + "is" + name + "}</td><td> Check whether the property equals <code>true</code>.");
        }

        var textHtml = new qx.util.StringBuilder();
        textHtml.add("<div class=\"item-detail-headline\">", "Generated methods:", "</div>", "<div class=\"item-detail-text\">");
        textHtml.add("<table><tr><td>");
        textHtml.add(generatedMethods.join("</td></tr><tr><td>"));
        textHtml.add("</td></tr></table>");
        textHtml.add("</div>");
        return qxl.apiviewer.ui.panels.InfoPanel.resolveLinkAttributes(textHtml.get(), currentClassDocNode);
      },
      __createAttributesHtml__P_609_2: function __createAttributesHtml__P_609_2(node) {
        var attributes = [];

        if (node.isNullable()) {
          attributes.push("This property allows 'null' values");
        }

        if (node.isInheritable()) {
          attributes.push("The property value can be inherited from a parent object.");
        }

        if (node.isThemeable()) {
          attributes.push("The property value can be set using appearance themes.");
        }

        if (node.isPropertyGroup()) {
          attributes.push("The property is a property group.");
        }

        if (node.isRefined()) {
          attributes.push("The property refines the init value of an existing property.");
        }

        if (attributes.length > 0) {
          var textHtml = new qx.util.StringBuilder();
          textHtml.add("<div class=\"item-detail-headline\">", "Property attributes:", "</div>", "<div class=\"item-detail-text\">");
          textHtml.add("<ul><li>");
          textHtml.add(attributes.join("</li><li>"));
          textHtml.add("</li></ul>");
          textHtml.add("</div>");
          return textHtml.get();
        }

        return "";
      },

      /**
       * Creates the HTML showing whether the item is refined
       *
       * @param node {qxl.apiviewer.dao.ClassItem} item to get the the information from
       * @return {String} HTML fragment
       */
      __createRefinedFromHtml__P_609_3: function __createRefinedFromHtml__P_609_3(node) {
        if (node.isRefined()) {
          var html = new qx.util.StringBuilder("<div class=\"item-detail-headline\">", "Refined property:", "</div>", "<div class=\"item-detail-text\">", qxl.apiviewer.ui.panels.InfoPanel.createItemLinkHtml(node.getOverriddenFrom().getFullName() + "#" + node.getName()), "</div>");
          return html.get();
        }

        return "";
      },
      getItemTypeHtml: function getItemTypeHtml(node) {
        return qxl.apiviewer.ui.panels.InfoPanel.createTypeHtml(node, "var");
      },
      getItemTitleHtml: function getItemTitleHtml(node) {
        return qxl.apiviewer.ui.panels.InfoPanel.setTitleClass(node, node.getName());
      },

      /**
       * Creates the HTML showing the information about a property.
       *
       * @param node {Map} the doc node of the property.
       * @param currentClassDocNode {Map} the doc node of the currently displayed class
       * @param showDetails {Boolean} whether to show the details.
       * @return {String} the HTML showing the information about the property.
       */
      getItemTextHtml: function getItemTextHtml(node, currentClassDocNode, showDetails) {
        // Add the description
        var textHtml = new qx.util.StringBuilder(qxl.apiviewer.ui.panels.InfoPanel.createDescriptionHtml(node, node.getClass(), showDetails));

        if (showDetails) {
          // Add allowed values
          var allowedValue = null;
          var possibleValues = qx.lang.Array.clone(node.getPossibleValues());

          if (possibleValues.length > 0) {
            if (node.isNullable()) {
              possibleValues.push("null");
            }

            allowedValue = "<code>" + possibleValues.join("</code>, <code>") + "</code>";
          } else if (node.getClassname()) {
            allowedValue = "instances of " + node.getClassname();
          } else if (node.getInstance()) {
            allowedValue = "instances of " + node.getInstance() + " or sub classes";
          } else if (node.getType()) {
            allowedValue = "any " + node.getType();
          }

          if (allowedValue) {
            textHtml.add("<div class=\"item-detail-headline\">", "Allowed values:", "</div>", "<div class=\"item-detail-text\">");
            textHtml.add(allowedValue, "</div>");
          } // Add check


          if (node.getCheck()) {
            textHtml.add("<div class=\"item-detail-headline\">", "Check:", "</div>", "<div class=\"javascript\">", qx.dev.Tokenizer.javaScriptToHtml(node.getCheck()), "</div>");
          } // Add default value


          if (!node.isPropertyGroup()) {
            textHtml.add("<div class=\"item-detail-headline\">", "Init value:", "</div>", "<div class=\"item-detail-text\">", "<code>", node.getDefaultValue() ? node.getDefaultValue() : "null", "</code>", "</div>");
          } // add event


          if (node.getEvent() && !node.isRefined()) {
            textHtml.add("<div class=\"item-detail-headline\">", "Change event:", "</div>", "<div class=\"item-detail-text\">", qxl.apiviewer.ui.panels.InfoPanel.createItemLinkHtml("#" + node.getEvent(), node.getClass(), true, true), "</div>");
          } // add apply method


          if (node.getApplyMethod() && !node.isRefined()) {
            textHtml.add("<div class=\"item-detail-headline\">", "Apply method:", "</div>", "<div class=\"item-detail-text\">", qxl.apiviewer.ui.panels.InfoPanel.createItemLinkHtml("#" + node.getApplyMethod(), node.getClass(), true, true), "</div>");
          }

          textHtml.add(this.__createAttributesHtml__P_609_2(node));
          textHtml.add(this.__createGeneratedMethodsHtml__P_609_0(node, currentClassDocNode));
          textHtml.add(qxl.apiviewer.ui.panels.InfoPanel.createIncludedFromHtml(node, currentClassDocNode));
          textHtml.add(this.__createRefinedFromHtml__P_609_3(node));
          textHtml.add(qxl.apiviewer.ui.panels.InfoPanel.createInheritedFromHtml(node, currentClassDocNode));
          textHtml.add(qxl.apiviewer.ui.panels.InfoPanel.createInfoRequiredByHtml(node));
          textHtml.add(qxl.apiviewer.ui.panels.InfoPanel.createSeeAlsoHtml(node));
          textHtml.add(qxl.apiviewer.ui.panels.InfoPanel.createErrorHtml(node, currentClassDocNode));
          textHtml.add(qxl.apiviewer.ui.panels.InfoPanel.createDeprecationHtml(node, "property"));
        }

        return textHtml.get();
      }
    }
  });
  qxl.apiviewer.ui.panels.PropertyPanel.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qxl.apiviewer.ui.panels.AbstractMethodPanel": {
        "construct": true,
        "require": true
      },
      "qxl.apiviewer.dao.Method": {}
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
       * Til Schneider (til132)
       * Sebastian Werner (wpbasti)
       * Andreas Ecker (ecker)
       * Fabian Jakobs (fjakobs)
       * John Spackman (johnspackman) of Zenesis Ltd (http://www.zenesis.com)
  
  ************************************************************************ */
  qx.Class.define("qxl.apiviewer.ui.panels.MethodPanel", {
    extend: qxl.apiviewer.ui.panels.AbstractMethodPanel,
    construct: function construct() {
      qxl.apiviewer.ui.panels.AbstractMethodPanel.constructor.call(this, "Members", "qxl/apiviewer/image/method_public18.gif");
    },
    members: {
      /**
       * @Override
       */
      canDisplayItem: function canDisplayItem(dao) {
        return dao instanceof qxl.apiviewer.dao.Method && !dao.isStatic();
      }
    }
  });
  qxl.apiviewer.ui.panels.MethodPanel.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qxl.apiviewer.ui.panels.InfoPanel": {
        "construct": true,
        "require": true
      },
      "qxl.apiviewer.dao.ChildControl": {},
      "qx.util.StringBuilder": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2004-2010 1&1 Internet AG, Germany, http://www.1und1.de
       2018 Zenesis Limited, http://www.zenesis.com
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Til Schneider (til132)
       * Sebastian Werner (wpbasti)
       * Andreas Ecker (ecker)
       * Fabian Jakobs (fjakobs)
       * Daniel Wagner (d_wagner)
       * John Spackman (johnspackman) of Zenesis Ltd (http://www.zenesis.com)
  
  ************************************************************************ */
  qx.Class.define("qxl.apiviewer.ui.panels.ChildControlsPanel", {
    extend: qxl.apiviewer.ui.panels.InfoPanel,
    construct: function construct() {
      qxl.apiviewer.ui.panels.InfoPanel.constructor.call(this, "Child Controls", "qxl/apiviewer/image/childcontrol18.gif");
    },
    members: {
      /**
       * @Override
       */
      canDisplayItem: function canDisplayItem(dao) {
        return dao instanceof qxl.apiviewer.dao.ChildControl;
      },
      getPanelItemObjects: function getPanelItemObjects(daoClass, showInherited) {
        return daoClass.getChildControls();
      },
      getItemTypeHtml: function getItemTypeHtml(node, currentClassDocNode) {
        return qxl.apiviewer.ui.panels.InfoPanel.createTypeHtml(node, "var", true);
      },
      getItemTitleHtml: function getItemTitleHtml(node, currentClassDocNode) {
        return qxl.apiviewer.ui.panels.InfoPanel.setTitleClass(node, node.getName());
      },
      getItemTextHtml: function getItemTextHtml(node, currentClassDocNode, showDetails) {
        var textHtml = new qx.util.StringBuilder(node.getDescription());

        if (showDetails) {
          textHtml.add("<div class=\"item-detail-headline\">", "Default value:", "</div>", "<div class=\"item-detail-text\">", "<code>", node.getDefaultValue() ? node.getDefaultValue() : "null", "</code>", "</div>");
        }

        return textHtml.get();
      }
    }
  });
  qxl.apiviewer.ui.panels.ChildControlsPanel.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Theme": {
        "usage": "dynamic",
        "require": true
      },
      "qx.theme.indigo.Appearance": {
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2004-2008 1&1 Internet AG, Germany, http://www.1und1.de
       2006 STZ-IDA, Germany, http://www.stz-ida.de
       2018 Zenesis Limited, http://www.zenesis.com
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * John Spackman (johnspackman)
       * Jonathan Weiß (jonathan_rass)
  
  ************************************************************************ */

  /**
   * Extends the default qooxdoo appearance theme.
   */
  qx.Theme.define("qxl.apiviewer.Appearance", {
    title: "Theme for API Viewer",
    extend: qx.theme.indigo.Appearance,
    appearances: {
      "toggleview": {
        style: function style(states) {
          return {
            width: 240,
            decorator: "main"
          };
        }
      },
      "detailviewer": {
        style: function style(states) {
          return {
            backgroundColor: "white",
            decorator: "main",
            padding: [10, 0, 10, 0]
          };
        }
      },
      "legend": {
        include: "scrollarea",
        alias: "scrollarea",
        style: function style(states) {
          return {
            contentPadding: [10, 10, 10, 10],
            backgroundColor: "white"
          };
        }
      },
      "legendview-label-important": {
        style: function style(states) {
          return {
            textColor: "#134275",
            font: "bold"
          };
        }
      },
      "legendview-label": {
        style: function style(states) {
          return {
            textColor: "#134275"
          };
        }
      },
      "tabview": {
        style: function style(states) {
          return {
            contentPadding: 0
          };
        }
      },
      "tabview/pane": {
        style: function style(states) {
          return {
            minHeight: 100,
            marginBottom: states.barBottom ? -1 : 0,
            marginTop: states.barTop ? -1 : 0,
            marginLeft: states.barLeft ? -1 : 0,
            marginRight: states.barRight ? -1 : 0
          };
        }
      }
    }
  });
  qxl.apiviewer.Appearance.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Theme": {
        "usage": "dynamic",
        "require": true
      },
      "qx.theme.indigo.Color": {
        "require": true
      },
      "qx.theme.indigo.Decoration": {
        "require": true
      },
      "qx.theme.indigo.Font": {
        "require": true
      },
      "qxl.apiviewer.Appearance": {
        "require": true
      },
      "qx.theme.icon.Tango": {
        "require": true
      }
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
       * Sebastian Werner (wpbasti)
       * Fabian Jakobs (fjakobs)
  
  ************************************************************************ */

  /**
   * Contemporary Theme
   */
  qx.Theme.define("qxl.apiviewer.Theme", {
    title: "APIViewer theme",
    meta: {
      color: qx.theme.indigo.Color,
      decoration: qx.theme.indigo.Decoration,
      font: qx.theme.indigo.Font,
      appearance: qxl.apiviewer.Appearance,
      icon: qx.theme.icon.Tango
    }
  });
  qxl.apiviewer.Theme.$$dbClassInfo = $$dbClassInfo;
})();
//# sourceMappingURL=package-9.js.map?dt=1592520367358
qx.$$packageData['9'] = {
  "locales": {},
  "resources": {},
  "translations": {
    "en": {}
  }
};
