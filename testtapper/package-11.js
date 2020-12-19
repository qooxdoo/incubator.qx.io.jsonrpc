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
      __range__P_556_0: null,
      _value: null,
      _shownValue: null,
      // overridden
      init: function init() {
        if (!qx.ui.website.Calendar.prototype.init.base.call(this)) {
          return false;
        }

        this.__range__P_556_0 = [];
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
          if (!this.__range__P_556_0) {
            this.__range__P_556_0 = value.map(function (val) {
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
          var range = this.__range__P_556_0.slice(0);

          if (range.length == 2) {
            range = [];
          }

          range.push(newStr);
          this.__range__P_556_0 = range;
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
              var range = this.__range__P_556_0;

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
      __active__P_557_0: null,
      __pageContainer__P_557_1: null,
      __scrollContainer__P_557_2: null,
      __paginationLabels__P_557_3: null,
      __startPosLeft__P_557_4: null,
      __pagination__P_557_5: null,
      _ie9: false,
      __blocked__P_557_6: false,
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
        this.__scrollContainer__P_557_2 = qxWeb.create("<div>").addClass(prefix + "-container").appendTo(this);
        this.__pageContainer__P_557_1 = qxWeb.create("<div>").addClass("qx-hbox").setStyle("height", "100%").appendTo(this.__scrollContainer__P_557_2);
        this.__paginationLabels__P_557_3 = [];
        this.__pagination__P_557_5 = qxWeb.create("<div>").addClasses([prefix + "-pagination", "qx-hbox", "qx-flex1"]).setStyle("visibility", "excluded").appendTo(this);

        if (this._ie9) {
          this.__pageContainer__P_557_1.setStyle("display", "table");

          this.__pagination__P_557_5.setStyle("textAlign", "center");
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
        var old = this.__active__P_557_0;
        this.__active__P_557_0 = page;

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
        return this.__active__P_557_0;
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
        child.addClasses(["qx-flex1", this.getCssPrefix() + "-page"]).appendTo(this.__pageContainer__P_557_1);

        if (this.find("." + this.getCssPrefix() + "-page").length > this.__paginationLabels__P_557_3.length) {
          var paginationLabel = this._createPaginationLabel();

          this.__paginationLabels__P_557_3.push(paginationLabel);

          this.__pagination__P_557_5.append(paginationLabel);
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
          this.__scrollContainer__P_557_2.translate([-this.getWidth() + "px", 0, 0]);
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
          this.__pagination__P_557_5.empty();

          this.__paginationLabels__P_557_3 = [];
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

        this.__paginationLabels__P_557_3.splice(child.priorPosition, 1)[0].remove();

        for (var i = 0; i < this.__paginationLabels__P_557_3.length; i++) {
          this.__paginationLabels__P_557_3[i].getChildren(".label").setHtml(i + 1 + "");
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
            left = this._getPositionLeft() - this.__scrollContainer__P_557_2.getWidth();
          } else if (direction == "left") {
            left = this._getPositionLeft() + this.__scrollContainer__P_557_2.getWidth();
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
            this.__scrollContainer__P_557_2.translate([-left + "px", 0, 0]); // animate to the new page


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
          this.__scrollContainer__P_557_2.translate([-this.getWidth() + "px", 0, 0]);
        } // set the container width to total width of all pages


        var containerWidth = this.getWidth() * this._getPages().length;

        this.__pageContainer__P_557_1.setStyle("width", containerWidth + "px"); // set the width of all pages to the carousel width


        this._getPages().setStyle("width", this.getWidth() + "px");

        this.setStyle("visibility", "visible");
      },

      /**
       * Handler for trackstart. It saves the initial scroll position and
       * cancels any running animation.
       */
      _onTrackStart: function _onTrackStart() {
        if (this.__blocked__P_557_6) {
          return;
        }

        this.__startPosLeft__P_557_4 = this._getPositionLeft();

        this.__scrollContainer__P_557_2 // stop the current scroll animation
        .stop() // correct the scroll position as the stopped animation
        // resets to its initial value
        .translate([-Math.round(this.__startPosLeft__P_557_4) + "px", 0, 0]);
      },

      /**
       * Track handler which updates the scroll position.
       * @param e {Event} The track event.
       */
      _onTrack: function _onTrack(e) {
        if (this.__blocked__P_557_6) {
          return;
        }

        if (e.delta.axis == "x" && this._getPages().length > 2) {
          this.__scrollContainer__P_557_2.translate([-(this.__startPosLeft__P_557_4 - e.delta.x) + "px", 0, 0]);
        }
      },

      /**
       * TrackEnd handler for enabling the scroll events.
       */
      _onTrackEnd: function _onTrackEnd() {
        if (this.__startPosLeft__P_557_4 == null || this.__blocked__P_557_6) {
          // don't end if we didn't start
          return;
        } // make sure the trackend handling is done after the swipe handling


        window.setTimeout(function () {
          if (this._getPages().length < 3 || this.__scrollContainer__P_557_2.isPlaying()) {
            return;
          }

          this.__startPosLeft__P_557_4 = null;
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
        if (this.__blocked__P_557_6) {
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
        this.__paginationLabels__P_557_3.forEach(function (label, index) {
          if (label[0] === e.currentTarget) {
            var pages = this._getPages(); // wo don't reorder with two pages there just set the active property


            if (pages.length === 2) {
              this.setActive(pages.eq(index));
              return;
            }

            var activeIndex = pages.indexOf(this.getActive());
            var distance = index - activeIndex; // set the order to deault dom order

            this._setOrder(pages, 0); // get the active page into view


            this.__scrollContainer__P_557_2.translate([-activeIndex * this.getWidth() + "px", 0, 0]);

            this.__blocked__P_557_6 = true; // animate to the desired page

            this._translateTo((activeIndex + distance) * this.getWidth());

            this.__scrollContainer__P_557_2.once("animationEnd", function (page) {
              this.__blocked__P_557_6 = false; // set the viewport back to the default position

              this.__scrollContainer__P_557_2.translate([-this.getWidth() + "px", 0, 0]);

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
        this._getPages().length < 2 ? this.__pagination__P_557_5.setStyle("visibility", "excluded") : this.__pagination__P_557_5.setStyle("visibility", "visible");

        this.__pagination__P_557_5.find("." + this.getCssPrefix() + "-pagination-label").removeClass("active");

        var pages = this._getPages();

        this.__paginationLabels__P_557_3[pages.indexOf(this.getActive())].addClass("active");
      },

      /**
       * Resize handler. It updates the sizes, snap points and scroll position.
       */
      _onResize: function _onResize() {
        this._updateWidth();

        if (this._getPages().length > 2) {
          this.__scrollContainer__P_557_2.translate([-this.getWidth() + "px", 0, 0]);
        }
      },

      /**
       * Animates using CSS translations to the given left position.
       * @param left {Number} The new left position
       */
      _translateTo: function _translateTo(left) {
        this.__scrollContainer__P_557_2.animate({
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
        return this.__pageContainer__P_557_1.find("." + this.getCssPrefix() + "-page");
      },

      /**
       * Returns the current left position.
       * @return {Number} The position in px.
       */
      _getPositionLeft: function _getPositionLeft() {
        var containerRect = this.__scrollContainer__P_557_2[0].getBoundingClientRect();

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
      __validPositions__P_558_0: null,

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

        this.__setReadOnly__P_558_1(this);

        this.__setIcon__P_558_2(this);

        this.__addInputListener__P_558_3(this);

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

        this.__setReadOnly__P_558_1(this);

        this.__setIcon__P_558_2(this);

        this.__addInputListener__P_558_3(this);

        this.setEnabled(this.getEnabled());
        return this;
      },
      // overridden
      setConfig: function setConfig(name, config) {
        if (name === 'position') {
          var validPositions = qx.ui.website.DatePicker.__validPositions__P_558_0;

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
      __setReadOnly__P_558_1: function __setReadOnly__P_558_1(collection) {
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
      __setIcon__P_558_2: function __setIcon__P_558_2(collection) {
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
      __addInputListener__P_558_3: function __addInputListener__P_558_3(collection) {
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
      statics.__validPositions__P_558_0 = ['top-left', 'top-center', 'top-right', 'bottom-left', 'bottom-center', 'bottom-right', 'left-top', 'left-middle', 'left-bottom', 'right-top', 'right-middle', 'right-bottom'];
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
      __dragMode__P_559_0: null,
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
          this.__valueToPosition__P_559_1(value);

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
        if (this.__dragMode__P_559_0) {
          return;
        }

        this.__dragMode__P_559_0 = true;
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
        if (this.__dragMode__P_559_0 === true) {
          // Cleanup status flags
          delete this.__dragMode__P_559_0;

          this.__valueToPosition__P_559_1(this.getValue());

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

        if (this.__dragMode__P_559_0) {
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

        this.__valueToPosition__P_559_1(this._value);
      },

      /**
       * Positions the slider knob to the given value and fires the "changePosition"
       * event with the current position as integer.
       *
       * @param value {Integer} slider step value
       */
      __valueToPosition__P_559_1: function __valueToPosition__P_559_1(value) {
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
        table.__model__P_560_0 = model;
        table.init();
        return table;
      },

      /**
       * Checks if a given string is a number
       * @param n {String} The String to check the type for
       * @return {Boolean} The result of the check
       */
      __isNumber__P_560_1: function __isNumber__P_560_1(n) {
        return (Object.prototype.toString.call(n) === '[object Number]' || Object.prototype.toString.call(n) === '[object String]') && !isNaN(parseFloat(n)) && isFinite(n.toString().replace(/^-/, ''));
      },

      /**
       * Checks if a given string is a Date
       * @param val {String} The String to check the type for
       * @return {Boolean} The result of the check
       */
      __isDate__P_560_2: function __isDate__P_560_2(val) {
        var d = new Date(val);
        return !isNaN(d.valueOf());
      },

      /**
       * Gets the index of an HTMLElement inside of an HTMLCollection
       * @param htmlCollection {HTMLCollection} The HTMLCollection
       * @param htmlElement {HTMLElement} The HTMLElement
       * @return {Integer} The position of the htmlElement or -1
       */
      __getIndex__P_560_3: function __getIndex__P_560_3(htmlCollection, htmlElement) {
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
      __getUID__P_560_4: function __getUID__P_560_4() {
        return (new Date().getTime() + "" + Math.floor(Math.random() * 1000000)).substr(0, 18);
      },

      /** */
      __selectionTypes__P_560_5: ["single", "multiple", "none"],

      /** */
      __internalCellClass__P_560_6: "qx-table-cell",

      /** */
      __internalHeaderClass__P_560_7: "qx-table-header",

      /** */
      __internalSelectionClass__P_560_8: "qx-table-row-selection",

      /** */
      __internalInputClass__P_560_9: "qx-table-selection-input",

      /** */
      __allColumnSelector__P_560_10: "qx-table-all-columns",

      /** */
      __dataColName__P_560_11: "data-qx-table-col-name",

      /** */
      __dataColType__P_560_12: "data-qx-table-col-type",

      /** */
      __dataSortingKey__P_560_13: "data-qx-table-cell-key",

      /** */
      __modelSortingKey__P_560_14: "cellKey",

      /** */
      __inputLabelClass__P_560_15: "qx-table-input-label",

      /** */
      __selectedRowClass__P_560_16: "qx-table-row-selected",

      /** */
      __ascSortingClass__P_560_17: "qx-table-sort-asc",

      /** */
      __descSortingClass__P_560_18: "qqx-table-sort-desc"
    },
    members: {
      __model__P_560_0: null,
      __columnMeta__P_560_19: null,
      __sortingFunction__P_560_20: null,
      __filterFunction__P_560_21: null,
      __filterFunc__P_560_22: null,
      __filters__P_560_23: null,
      __inputName__P_560_24: null,
      __hovered__P_560_25: null,
      __sortingData__P_560_26: null,
      // overridden
      init: function init() {
        if (!qx.ui.website.Table.prototype.init.base.call(this)) {
          return false;
        }

        var model = this.__model__P_560_0;

        if (qxWeb.getNodeName(this).toUpperCase() !== "TABLE") {
          throw new Error("collection should contains only table elements !!");
        }

        if (!this[0].tHead) {
          throw new Error("A Table header element is required for this widget.");
        }

        this.find("tbody td").addClass("qx-table-cell");
        this.__inputName__P_560_24 = "input" + qx.ui.website.Table.__getUID__P_560_4();

        this.__getColumnMetaData__P_560_27(model);

        this.setModel(model);
        this.setSortingFunction(this.__defaultColumnSort__P_560_28);

        this.__registerEvents__P_560_29();

        this.__hovered__P_560_25 = null;
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
            this.__model__P_560_0 = model;
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
        this.__checkColumnExistance__P_560_30(columnName);

        this.__columnMeta__P_560_19[columnName].type = type;
        return this;
      },

      /**
       * Returns the type of the specified column
       * @param columnName {String} The column name
       * @return {String} The type of the specified column
       */
      getColumnType: function getColumnType(columnName) {
        this.eq(0).__checkColumnExistance__P_560_30(columnName);

        return this.eq(0).__columnMeta__P_560_19[columnName].type;
      },

      /**
       * Returns the cell at the given position for the first widget in the collection
       * @param row {Integer} The row number
       * @param col {Integer} The column number
       * @return {qxWeb} The cell found at the given position
       */
      getCell: function getCell(row, col) {
        return qxWeb(this.eq(0).__getRoot__P_560_31().rows.item(row).cells.item(col));
      },

      /**
      * Returns a collection containing the rows of the first table in the collection.
      * @return {qxWeb} The collection containing the table rows
      */
      getRows: function getRows() {
        return qxWeb(this.eq(0).__getRoot__P_560_31().rows);
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

        this.__sortingFunction__P_560_20 = func;
        return this;
      },

      /**
       * Unset the function that control the sorting process
       * @return {qx.ui.website.Table} <code>this</code> reference for chaining.
       */
      unsetSortingFunction: function unsetSortingFunction() {
        this.__sortingFunction__P_560_20 = this.__defaultColumnSort__P_560_28;
        return this;
      },

      /**
       * Set the function that will be used to process the column filtering
       * @param func {Function} The filter function
       * @return {qx.ui.website.Table} <code>this</code> reference for chaining.
       */
      setFilterFunction: function setFilterFunction(func) {
        this.__filterFunction__P_560_21 = func;
        return this;
      },

      /**
       * Unset the filter function
       * @return {qx.ui.website.Table} <code>this</code> reference for chaining.
       */
      unsetFilterFunction: function unsetFilterFunction() {
        this.__filterFunction__P_560_21 = this.__defaultColumnFilter__P_560_32;
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
        this.__checkColumnExistance__P_560_30(columnName);

        if (!this.__filterFunc__P_560_22) {
          this.__filterFunc__P_560_22 = {};
        }

        this.__filterFunc__P_560_22[columnName] = func;
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
        if (this.__filterFunc__P_560_22) {
          return this.__filterFunc__P_560_22[columnName];
        }

        return null;
      },

      /**
      * Set the filter function to use to filter the table rows
      * @param func {Function} The filter
      * @return {qx.ui.website.Table} <code>this</code> reference for chaining.
      */
      setRowFilter: function setRowFilter(func) {
        if (!this.__filterFunc__P_560_22) {
          this.__filterFunc__P_560_22 = {};
        }

        this.__filterFunc__P_560_22.row = func;
        return this;
      },

      /**
      * Returns the filter function set on a specific column
      * @return {Function} The filter function
      *
      */
      getRowFilter: function getRowFilter() {
        if (this.__filterFunc__P_560_22) {
          return this.__filterFunc__P_560_22.row;
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
        this.__checkColumnExistance__P_560_30(columnName);

        this.setSortingClass(columnName, dir);

        this.__sortDOM__P_560_33(this.__sort__P_560_34(columnName, dir));

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
          this.__checkColumnExistance__P_560_30(columnName);

          if (keyword == "") {
            this.resetFilter(columnName);
          }
        } else {
          columnName = qx.ui.website.Table.__allColumnSelector__P_560_10;
        }

        if (!this.__filters__P_560_23) {
          this.__filters__P_560_23 = {};
        }

        if (this.__filters__P_560_23[columnName]) {
          this.__filters__P_560_23[columnName].keyword = keyword;

          this.__getRoot__P_560_31().appendChild(this.__filters__P_560_23[columnName].rows);
        } else {
          this.__filters__P_560_23[columnName] = {
            keyword: keyword,
            rows: document.createDocumentFragment()
          };
        }

        this.__filterDom__P_560_35(keyword, columnName);

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
        filters = this.__filters__P_560_23;

        if (filters) {
          if (columnName) {
            this.__getRoot__P_560_31().appendChild(filters[columnName].rows);
          } else {
            for (var col in filters) {
              this.__getRoot__P_560_31().appendChild(filters[col].rows);
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
        var rows = this.__extractTableRows__P_560_36(tableData);

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
        var rows = this.__extractTableRows__P_560_36(tableData);

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
      __extractTableRows__P_560_36: function __extractTableRows__P_560_36(data) {
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
      __filterDom__P_560_35: function __filterDom__P_560_35(keyword, columnName) {
        var colIndex = this.__getColumnIndex__P_560_37(columnName);

        var filterFunc = columnName == qx.ui.website.Table.__allColumnSelector__P_560_10 ? this.getRowFilter() : this.getColumnFilter(columnName);
        filterFunc = filterFunc || this.__defaultColumnFilter__P_560_32;

        var rows = this.__getDataRows__P_560_38(),
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
            this.__filters__P_560_23[columnName].rows.appendChild(rows[i]);
          }
        }

        return this;
      },

      /**
       * Get the current column sorting information for the first widget in the collection
       * @return {Map} The map containing the current sorting information
       */
      getSortingData: function getSortingData() {
        return this.__sortingData__P_560_26;
      },
      //overridden
      render: function render() {
        var sortingData = this.getSortingData();
        var rowSelection = this.getConfig("rowSelection");

        this.__applyTemplate__P_560_39(this.__model__P_560_0);

        if (qx.ui.website.Table.__selectionTypes__P_560_5.indexOf(rowSelection) != -1) {
          this.__processSelectionInputs__P_560_40(rowSelection);
        }

        if (sortingData) {
          this.__sortDOM__P_560_33(this.__sort__P_560_34(sortingData.columnName, sortingData.direction));
        }

        return this;
      },
      //Private API

      /**
      * Renders or removes the selection inputs according to the specified widget selection mode
      * @param rowSelection {String} The selection mode
      * @return {qx.ui.website.Table} <code>this</code> reference for chaining.
      */
      __processSelectionInputs__P_560_40: function __processSelectionInputs__P_560_40(rowSelection) {
        switch (rowSelection) {
          case "none":
            qxWeb("." + qx.ui.website.Table.__internalSelectionClass__P_560_8).remove();
            break;

          case "multiple":
          case "single":
            this.__createInputs__P_560_41("checkbox");

            break;

          case "single":
            this.__createInputs__P_560_41("radio");

            break;
        }

        return this;
      },

      /**
       * Creates input nodes for the row selection
       * @param type {String} The type of the inputs to creates
       * @return {qx.ui.website.Table} <code>this</code> reference for chaining.
       */
      __createInputs__P_560_41: function __createInputs__P_560_41(type) {
        this.__createInput__P_560_42(this.__getHeaderRow__P_560_43(), type);

        var rows = this.find("tbody")[0].getElementsByTagName("tr");

        for (var i = 0; i < rows.length; i++) {
          this.__createInput__P_560_42(rows.item(i), type);
        }

        return this;
      },

      /**
      * Creates an input an input node for a specific row
      * @param row {HTMLTableRowElement} The row to create the input for
      * @param type {String} The type of the input tom create (radio or checkbox)
      * @param nodeName {String} The nodename of the table cell that will contain the input
      */
      __createInput__P_560_42: function __createInput__P_560_42(row, type, nodeName) {
        var cssPrefix = this.getCssPrefix();
        var clazz = qx.ui.website.Table;
        var headerInput = qxWeb("." + clazz.__internalHeaderClass__P_560_7 + " input");
        var selectionMode = this.getConfig("rowSelection");
        var checked = "";

        if (headerInput.length > 0) {
          checked = selectionMode == "multiple" && headerInput[0].checked ? "checked" : "";
        }

        if (typeof nodeName == "undefined") {
          nodeName = qxWeb.getNodeName(qxWeb(row.cells.item(0)));
        }

        var inputName = this.__inputName__P_560_24;
        var className = nodeName == "th" ? clazz.__internalSelectionClass__P_560_8 + " " + clazz.__internalHeaderClass__P_560_7 : clazz.__internalSelectionClass__P_560_8;
        var currentInput = qxWeb(row).find("." + clazz.__internalSelectionClass__P_560_8);

        if (currentInput.length > 0) {
          if (currentInput[0].type != type) {
            currentInput[0].type = type;
          }
        } else {
          var id = qx.ui.website.Table.__getUID__P_560_4();

          var inputNode = qxWeb.create("<" + nodeName + " class='" + className + "'><input id='" + id + "' name='" + inputName + "' " + checked + " class='" + cssPrefix + "-" + type + " " + clazz.__internalInputClass__P_560_9 + "' type='" + type + "' /><label class='" + clazz.__inputLabelClass__P_560_15 + "' for='" + id + "'></label></" + nodeName + ">");

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
      __checkColumnExistance__P_560_30: function __checkColumnExistance__P_560_30(columnName) {
        var data = this.__columnMeta__P_560_19;

        if (data && !data[columnName]) {
          throw new Error("Column " + columnName + " does not exists !");
        }
      },

      /**
      * Returns the row containing the cells with the column names
      * @return {HTMLTableRowElement} The row with meta information
      */
      __getHeaderRow__P_560_43: function __getHeaderRow__P_560_43() {
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
      __getColumnMetaData__P_560_27: function __getColumnMetaData__P_560_27(model) {
        this.__addClassToHeaderAndFooter__P_560_44(this[0].tHead);

        this.__addClassToHeaderAndFooter__P_560_44(this[0].tFoot);

        var data = {},
            cells = null,
            colName = null,
            cell = null;

        var headerRow = this.__getHeaderRow__P_560_43();

        cells = headerRow.cells;

        for (var i = 0, l = cells.length; i < l; i++) {
          cell = qxWeb(cells.item(i));
          colName = this.__getColumName__P_560_45(cell[0]) || qx.ui.website.Table.__getUID__P_560_4();

          if (!cell[0].getAttribute(qx.ui.website.Table.__dataColName__P_560_11)) {
            cell.setAttribute(qx.ui.website.Table.__dataColName__P_560_11, colName);
          }

          data[colName] = {
            type: cell[0].getAttribute(qx.ui.website.Table.__dataColType__P_560_12) || "String",
            name: colName
          };
        }

        this.__columnMeta__P_560_19 = data;
        return this;
      },

      /**
       * Adds the internal css class to the header and footer cells
       * @param footOrHead {HTMLElement} Html element representing the header or footer of the table
      * @return {qx.ui.website.Table} <code>this</code> reference for chaining.
       */
      __addClassToHeaderAndFooter__P_560_44: function __addClassToHeaderAndFooter__P_560_44(footOrHead) {
        if (footOrHead && footOrHead.rows.length > 0) {
          if (footOrHead.rows.item(0).cells.length > 0) {
            var row = this.__getHeaderRow__P_560_43();

            if (!qxWeb(row.cells.item(0)).hasClass(qx.ui.website.Table.__internalHeaderClass__P_560_7)) {
              qxWeb(row.cells).addClass(qx.ui.website.Table.__internalHeaderClass__P_560_7);
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
      __sortDOM__P_560_33: function __sortDOM__P_560_33(dataRows) {
        for (var i = 0, l = dataRows.length; i < l; i++) {
          if (i) {
            qxWeb(dataRows[i]).insertAfter(dataRows[i - 1]);
          } else {
            qxWeb(dataRows[i]).insertBefore(qxWeb(this.__getRoot__P_560_31().rows.item(0)));
          }
        }

        return this;
      },

      /**
       * registers global events
       * @return {qx.ui.website.Table} <code>this</code> reference for chaining.
       */
      __registerEvents__P_560_29: function __registerEvents__P_560_29() {
        this.on("tap", this.__detectClickedCell__P_560_46);
        this.on("cellClick", function (data) {
          if (data.cell && data.cell.hasClass(qx.ui.website.Table.__internalHeaderClass__P_560_7)) {
            this.__sortingFunction__P_560_20.bind(this)(data);
          }
        }, this);
        this.on("pointerover", this.__cellHover__P_560_47, this);
        this.on("pointerout", this.__cellOut__P_560_48, this);
        return this;
      },

      /**
      * Checks if the selection inputs are already rendered
      * @return {Boolean} True if the inputs are rendered and false otherwise
      */
      __selectionRendered__P_560_49: function __selectionRendered__P_560_49() {
        return qxWeb("." + qx.ui.website.Table.__internalSelectionClass__P_560_8).length > 0;
      },

      /**
      * Handles clicks that happen on the selection inputs
      * @param cell {qxWeb} The table cell containing the clicked input
      * @return {qx.ui.website.Table} <code>this</code> reference for chaining.
      */
      __processSelection__P_560_50: function __processSelection__P_560_50(cell) {
        var clazz = qx.ui.website.Table;
        var inputs = qxWeb("." + clazz.__internalInputClass__P_560_9);
        var clickedInput = cell.find("input");
        var selectionMode = this.getConfig("rowSelection");
        var headerInput = qxWeb("." + clazz.__internalHeaderClass__P_560_7 + " input");
        var selection = [];

        if (selectionMode == "multiple") {
          if (cell.hasClass(clazz.__internalHeaderClass__P_560_7)) {
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
        qxWeb("." + clazz.__selectedRowClass__P_560_16).removeClass(clazz.__selectedRowClass__P_560_16);
        selectedRows.addClass(clazz.__selectedRowClass__P_560_16);
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
      __fireEvent__P_560_51: function __fireEvent__P_560_51(eventType, cell, target) {
        var row = cell[0].parentNode,
            cells = row.cells;

        var colNumber = qx.ui.website.Table.__getIndex__P_560_3(cells, cell[0]);

        var tHead = this.__getHeaderRow__P_560_43();

        var headCell = tHead.cells.item(colNumber);

        var colName = this.__getColumName__P_560_45(headCell);

        var columnIndex = this.getConfig("rowSelection") != "none" ? this.__getColumnIndex__P_560_37(colName) - 1 : this.__getColumnIndex__P_560_37(colName);
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
      __detectClickedCell__P_560_46: function __detectClickedCell__P_560_46(e) {
        var target = e.getTarget();
        var cell = qxWeb(target);
        var clazz = qx.ui.website.Table;

        while (!(cell.hasClass(clazz.__internalCellClass__P_560_6) || cell.hasClass(clazz.__internalHeaderClass__P_560_7) || cell.hasClass(clazz.__internalSelectionClass__P_560_8))) {
          if (cell.hasClass(this.classname)) {
            cell = null;
            break;
          }

          cell = cell.getParents().eq(0);
        }

        if (cell.hasClass(clazz.__internalSelectionClass__P_560_8)) {
          window.setTimeout(function () {
            this.__processSelection__P_560_50(cell);
          }.bind(this), 5);
        } else {
          if (cell && cell.length > 0) {
            this.__fireEvent__P_560_51("cellClick", cell, target);
          }
        }

        return this;
      },

      /**
      * Pointerover callback
      *
      * @param e {Event} The native over event.
      */
      __cellHover__P_560_47: function __cellHover__P_560_47(e) {
        var target = e.getTarget();
        var cell = qxWeb(target);
        var hovered = this.__hovered__P_560_25;

        if (!cell.hasClass("qx-table-cell") && !cell.hasClass("qx-table-header")) {
          cell = cell.getClosest(".qx-table-cell, .qx-table-header");
        }

        if (cell && cell.length > 0 && (hovered && hovered.cell[0] != cell[0] || !hovered) && !cell.hasClass("qx-table-row-selection")) {
          if (hovered) {
            this.emit("cellOut", hovered);
          }

          this.__hovered__P_560_25 = this.__fireEvent__P_560_51("cellHover", cell, target);
        }
      },

      /**
      * pointerout callback
      *
      * @param e {Event} The native over event.
      */
      __cellOut__P_560_48: function __cellOut__P_560_48(e) {
        var relatedTarget = e.getRelatedTarget();
        var cell = qxWeb(relatedTarget);

        if (this.__hovered__P_560_25) {
          if (!cell.isChildOf(this)) {
            this.emit("cellOut", this.__hovered__P_560_25);
            this.__hovered__P_560_25 = null;
          } else {
            if (!cell.hasClass("qx-table-cell") && !cell.hasClass("qx-table-header")) {
              cell = cell.getClosest(".qx-table-cell, .qx-table-header");

              if (cell.hasClass("qx-table-row-selection")) {
                this.emit("cellOut", this.__hovered__P_560_25);
                this.__hovered__P_560_25 = null;
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
      __applyTemplate__P_560_39: function __applyTemplate__P_560_39(model) {
        if (model && model.length > 0) {
          var cell, row;

          var tHead = this.__getHeaderRow__P_560_43();

          var createdRow = null,
              colMeta = null;
          var renderedRow = null;
          var inputType = this.getConfig("rowSelection") == "single" ? "radio" : "checkbox";

          if (this.__getRoot__P_560_31().rows.length > model.length) {
            this.__deleteRows__P_560_52(model.length);
          }

          var renderedColIndex = 0,
              templateApplied = false;
          var coltemplate = this.getTemplate("columnDefault");
          var colName = null;

          for (var i = 0, rowCount = model.length; i < rowCount; i++) {
            row = model[i];

            if (!this.__isRowRendered__P_560_53(i)) {
              createdRow = this.__getRoot__P_560_31().insertRow(i);

              if (this.__selectionRendered__P_560_49()) {
                this.__createInput__P_560_42(createdRow, inputType, "td");
              }
            }

            for (var j = 0, colCount = row.length; j < colCount; j++) {
              renderedColIndex = this.__selectionRendered__P_560_49() ? j + 1 : j;
              colName = this.__getColumName__P_560_45(tHead.cells.item(renderedColIndex));
              colMeta = this.__getDataForColumn__P_560_54(colName);
              coltemplate = this.getTemplate(colName) || coltemplate;
              renderedRow = this.__getRoot__P_560_31().rows.item(i);
              cell = qxWeb.create(qxWeb.template.render(coltemplate, model[i][j]))[0];

              if (cell.nodeName.toUpperCase() != "TD") {
                break;
              }

              if (!this.__isCellRendered__P_560_55(i, renderedColIndex)) {
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
      __deleteRows__P_560_52: function __deleteRows__P_560_52(rowCount) {
        var renderedRows = this.__getRoot__P_560_31().rows;

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
      __getDataForColumn__P_560_54: function __getDataForColumn__P_560_54(columName) {
        return this.__columnMeta__P_560_19[columName];
      },

      /**
       * Gets the Root element containing the data rows
       * @return {HTMLElement} The element containing the data rows
       */
      __getRoot__P_560_31: function __getRoot__P_560_31() {
        return this[0].tBodies.item(0) || this[0];
      },

      /**
       * Checks if the row with the given index is rendered
       * @param index {Integer} The index of the row to check
       * @return {Boolean} The result of the check
       */
      __isRowRendered__P_560_53: function __isRowRendered__P_560_53(index) {
        if (this.__getRoot__P_560_31().rows.item(index)) {
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
      __isCellRendered__P_560_55: function __isCellRendered__P_560_55(rowIndex, colIndex) {
        if (!this.__isRowRendered__P_560_53(rowIndex)) {
          return false;
        }

        if (this.__getRoot__P_560_31().rows.item(rowIndex).cells.item(colIndex)) {
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
        this.__sortingData__P_560_26 = data;

        this.__addSortingClassToCol__P_560_56(this[0].tHead, columnName, dir);
      },

      /**
       * Adds a class to the head or footer of the current sorted column
       * @param HeaderOrFooter {Node} The n
       * @param columnName {String} The name of the sorted column
       * @param dir {String} The sorting direction
       */
      __addSortingClassToCol__P_560_56: function __addSortingClassToCol__P_560_56(HeaderOrFooter, columnName, dir) {
        var rows = this.__getHeaderRow__P_560_43();

        if (HeaderOrFooter && rows) {
          qxWeb(rows.cells).removeClasses(["qx-table-sort-asc", "qx-table-sort-desc"]);
          var cell = qxWeb("[" + qx.ui.website.Table.__dataColName__P_560_11 + "='" + columnName + "'], #" + columnName);
          cell.addClass("qx-table-sort-" + dir);
        }
      },

      /**
       * Sorts the table rows for the given row and direction
       * @param columnName {String} The name of the column to be sorted
       * @param direction {String} The sorting direction
       * @return {Array} Array containing the sorted rows
       */
      __sort__P_560_34: function __sort__P_560_34(columnName, direction) {
        var meta = this.__getDataForColumn__P_560_54(columnName);

        var columnType = qxWeb.string.firstUp(meta.type);

        if (!this["_compare" + columnType] && !this.getProperty("_compare" + columnType)) {
          columnType = "String";
        }

        var compareFunc = this.getCompareFunction(columnType).bind(this);

        var model = this.__getDataRows__P_560_38();

        var columnIndex = this.__getColumnIndex__P_560_37(columnName);

        return model.sort(function (a, b) {
          var x = this.__getSortingKey__P_560_57(qxWeb(a.cells.item(columnIndex)));

          var y = this.__getSortingKey__P_560_57(qxWeb(b.cells.item(columnIndex)));

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
        x = qx.ui.website.Table.__isNumber__P_560_1(x) ? Number(x) : 0;
        y = qx.ui.website.Table.__isNumber__P_560_1(y) ? Number(y) : 0;

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
      __getColumName__P_560_45: function __getColumName__P_560_45(headerCell) {
        return headerCell.getAttribute(qx.ui.website.Table.__dataColName__P_560_11) || headerCell.getAttribute("id");
      },

      /**
       * Compares two Dates
       * @param x {String} The String value of the first date to compare
       * @param y {String} The String value of the second date to compare
       * @param direction {String} The sorting direction
       * @return {Integer} The result of the comparison
       */
      _compareDate: function _compareDate(x, y, direction) {
        x = qx.ui.website.Table.__isDate__P_560_2(x) ? new Date(x) : new Date(0);
        y = qx.ui.website.Table.__isDate__P_560_2(y) ? new Date(y) : new Date(0);

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
      __getSortingKey__P_560_57: function __getSortingKey__P_560_57(cell) {
        return cell.getAttribute(qx.ui.website.Table.__dataSortingKey__P_560_13) || this.__getCellValue__P_560_58(cell);
      },

      /**
       * Returns the value of the cell that will be used for sorting
       * @param cell {qxWeb} The cell to get the value of
       * @return {String} The text content of the cell
       */
      __getCellValue__P_560_58: function __getCellValue__P_560_58(cell) {
        return cell[0].textContent || cell[0].innerText || "";
      },

      /**
       * Gets the table's data rows from the DOM
       * @return {Array} Array containing the rows of the table
       */
      __getDataRows__P_560_38: function __getDataRows__P_560_38() {
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

            if (!cell.hasClass(qx.ui.website.Table.__internalCellClass__P_560_6)) {
              cell.addClass(qx.ui.website.Table.__internalCellClass__P_560_6);
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
      __defaultColumnSort__P_560_28: function __defaultColumnSort__P_560_28(data) {
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
      __defaultColumnFilter__P_560_32: function __defaultColumnFilter__P_560_32(data) {
        var caseSensitive = this.getConfig("caseSensitive");
        var cell = data.columnName == qx.ui.website.Table.__allColumnSelector__P_560_10 ? data.row : data.cell;

        var cellValue = this.__getCellValue__P_560_58(cell);

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
      __getColumnIndex__P_560_37: function __getColumnIndex__P_560_37(columnName) {
        var tHead = this.__getHeaderRow__P_560_43();

        var cells = tHead.cells;

        for (var i = 0; i < cells.length; i++) {
          if (columnName == this.__getColumName__P_560_45(cells.item(i))) {
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
      "qx.application.Standalone": {
        "require": true
      },
      "qx.log.Logger": {},
      "qx.data.marshal.Json": {},
      "qx.ui.container.Composite": {},
      "qx.ui.layout.VBox": {},
      "qx.ui.basic.Label": {},
      "qx.ui.container.Scroll": {},
      "qx.ui.layout.Grow": {},
      "qx.ui.tree.VirtualTree": {},
      "qxl.testtapper.TreeItem": {},
      "qxl.logpane.LogPane": {},
      "qx.ui.splitpane.Pane": {},
      "qx.dev.unit.TestLoaderBasic": {},
      "qx.Promise": {},
      "qx.dev.unit.TestResult": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     Copyright: 2018 Oetiker+Partner AG
  
     License: MIT
  
     Authors: Tobias Oetiker
  
  ************************************************************************ */

  /**
   * Test Runner
   *
   * @asset(qxl/testtapper/run.js)
   * @asset(qx/icon/Oxygen/16/actions/dialog-ok.png)
   * @asset(qx/icon/Oxygen/16/actions/dialog-cancel.png)
   * @asset(qx/icon/Tango/16/places/folder.png)
   * @asset(qx/icon/Tango/16/places/folder-open.png)
   */
  qx.Class.define("qxl.testtapper.Application", {
    extend: qx.application.Standalone,
    members: {
      _cnt: null,
      _failed: null,
      __tree__P_589_0: null,
      __model__P_589_1: null,
      log: function log(text) {
        console.log(text);
        qx.log.Logger.debug(text);
      },
      info: function info(text) {
        console.info(text);
        qx.log.Logger.info(text);
      },
      error: function error(text) {
        console.error(text);
        qx.log.Logger.error(text);
      },
      // add an item in the tree
      addTreeItem: function addTreeItem(status, testNumber, testClass, testName, message = "") {
        let classNode = this.__model__P_589_1.getChildren().toArray().find(item => item.getLabel() === testClass);

        if (!classNode) {
          classNode = qx.data.marshal.Json.createModel({
            label: testClass,
            children: [],
            numberPassed: 0,
            numberFailed: 0
          });

          this.__model__P_589_1.getChildren().append(classNode);
        }

        let modelItem = qx.data.marshal.Json.createModel({
          label: testNumber + " " + testName,
          numberPassed: Number(status === "ok"),
          numberFailed: Number(status === "not ok"),
          message
        });
        classNode.getChildren().push(modelItem); // update parent nodes

        [classNode, this.__model__P_589_1].forEach(node => {
          node.setNumberPassed(node.getChildren().reduce((acc, curr) => acc + curr.getNumberPassed(), 0));
          node.setNumberFailed(node.getChildren().reduce((acc, curr) => acc + curr.getNumberFailed(), 0));
        });
      },

      getRootNodeData() {
        return {
          label: "Running tests...",
          children: [],
          numberPassed: 0,
          numberFailed: 0
        };
      },

      main: function main() {
        qxl.testtapper.Application.prototype.main.base.call(this);
        this._cnt = 0;
        this._failed = {}; // eslint-disable-next-line no-undef

        let cfg = {};

        if (typeof location !== "undefined" && location.search) {
          let params = decodeURI(location.search.substring(1));
          params += "&";
          params.split('&').forEach(item => {
            if (item.length) {
              let [key, value] = item.split('=');
              cfg[key] = value;
            }
          });
        }

        let main_container = new qx.ui.container.Composite();
        main_container.setLayout(new qx.ui.layout.VBox());
        main_container.add(new qx.ui.basic.Label(`
                <h1>TestTAPper - the Qooxdoo Testrunner is at work</h1>
                <p>For details, please open your browser's javascript console</p>
                `).set({
          rich: true
        }));
        this.getRoot().add(main_container, {
          edge: 5
        }); // tree

        var scroller = new qx.ui.container.Scroll();
        var container = new qx.ui.container.Composite(new qx.ui.layout.Grow()); //container.setAllowGrowX(false);
        //container.setAllowStretchX(false);

        scroller.add(container);
        const tree = this.__tree__P_589_0 = new qx.ui.tree.VirtualTree(null, "label", "children");
        container.add(tree);
        const delegate = {
          bindItem(controller, item, id) {
            controller.bindDefaultProperties(item, id);
            ["numberPassed", "numberFailed", "message"].forEach(prop => controller.bindProperty(prop, prop, null, item, id));
          },

          createItem() {
            return new qxl.testtapper.TreeItem();
          }

        };
        tree.setDelegate(delegate);
        let model = this.__model__P_589_1 = qx.data.marshal.Json.createModel(this.getRootNodeData(), true);
        tree.setModel(model); // log pane

        let logger = new qxl.logpane.LogPane();
        logger.setShowToolBar(false);
        logger.fetch(); // splitpane

        var pane = new qx.ui.splitpane.Pane("vertical");
        main_container.add(pane, {
          flex: 1
        });
        pane.add(scroller);
        pane.add(logger); // loader

        this.loader = new qx.dev.unit.TestLoaderBasic();
        let namespace = "qx.test.io";
        this.loader.setTestNamespace(namespace);
        let clazzes = this.loader.getSuite().getTestClasses();

        if (cfg.class) {
          let matcher = new RegExp(cfg.class);
          this.log("# running only test classes that match " + matcher);
          clazzes = clazzes.filter(clazz => clazz.getName().match(matcher));
        }

        let pChain = new qx.Promise(resolve => resolve(true));
        clazzes.forEach(clazz => {
          pChain = pChain.then(() => this.runAll(cfg, clazz).then(() => {
            this.info(`# done testing ${clazz.getName()}.`);
          }));
        });
        return pChain.then(() => {
          this.log(`1..${this._cnt}`);

          this.__model__P_589_1.setLabel("Tests have finished:");
        });
      },
      runAll: function runAll(cfg, clazz) {
        let that = this;
        this.info(`# start testing ${clazz.getName()}.`);
        let methods = clazz.getTestMethods();

        if (cfg.method) {
          let matcher = new RegExp(cfg.method);
          this.log("# running only test methods that match " + matcher);
          methods = methods.filter(method => method.getName().match(matcher));
        }

        return new qx.Promise(resolve => {
          let testResult = new qx.dev.unit.TestResult();
          let methodNameIndex = -1;

          let next = () => {
            methodNameIndex++;

            if (methodNameIndex < methods.length) {
              that.loader.runTests(testResult, clazz.getName(), methods[methodNameIndex].getName());
            } else {
              resolve();
            }
          };

          let showExceptions = arr => {
            arr.forEach(item => {
              if (item.test.getFullName) {
                let test = item.test.getFullName();
                that._failed[test] = true;
                that._cnt++;
                let message = String(item.exception);

                if (item.exception) {
                  if (item.exception.message) {
                    message = item.exception.message;
                    this.info(`not ok ${that._cnt} - ${test} - ${message}`);
                    let [testClass, ...testName] = test.split(":");
                    this.addTreeItem("not ok", that._cnt, testClass, testName.join(""), message);
                  } else {
                    this.error('# ' + item.exception);
                  }
                }
              } else {
                this.error('Unexpected Error - ', item);
              }
            });
            setTimeout(next, 0);
          };

          testResult.addListener("startTest", evt => {
            this.info('# start ' + evt.getData().getFullName());
          });
          testResult.addListener("wait", evt => {
            this.info('# wait ' + evt.getData().getFullName());
          });
          testResult.addListener("endMeasurement", evt => {
            this.info('# endMeasurement ' + evt.getData()[0].test.getFullName());
          });
          testResult.addListener("endTest", evt => {
            let test = evt.getData().getFullName();

            if (!that._failed[test]) {
              that._cnt++;
              this.info(`ok ${that._cnt} - ` + test);
              let [testClass, ...testName] = test.split(":");
              this.addTreeItem("ok", that._cnt, testClass, testName.join(""));
            }

            setTimeout(next, 0);
          });
          testResult.addListener("failure", evt => showExceptions(evt.getData()));
          testResult.addListener("error", evt => showExceptions(evt.getData()));
          testResult.addListener("skip", evt => {
            that._cnt++;
            let test = evt.getData()[0].test.getFullName();
            that._failed[test] = true;
            this.info(`ok ${that._cnt} - # SKIP ${test}`);
          });
          next();
        });
      }
    }
  });
  qxl.testtapper.Application.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.tree.VirtualTreeItem": {
        "require": true
      },
      "qx.ui.core.Spacer": {},
      "qx.ui.container.Composite": {},
      "qx.ui.layout.HBox": {},
      "qx.ui.basic.Image": {},
      "qx.ui.basic.Label": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  qx.Class.define("qxl.testtapper.TreeItem", {
    extend: qx.ui.tree.VirtualTreeItem,
    properties: {
      numberFailed: {
        check: "Number",
        event: "changeNumberFailed",
        init: "0"
      },
      numberPassed: {
        check: "Number",
        event: "changeNumberPassed",
        init: 0
      },
      testClass: {
        check: "String",
        event: "changeTestClass",
        init: ""
      },
      testName: {
        check: "String",
        event: "changeTestName",
        init: ""
      },
      message: {
        check: "String",
        event: "changeMessage",
        init: ""
      }
    },
    members: {
      _addWidgets: function _addWidgets() {
        qxl.testtapper.TreeItem.prototype._addWidgets.base.call(this);

        this.addWidget(new qx.ui.core.Spacer(), {
          flex: 1
        }); // number of passed tests

        let passedContainer = new qx.ui.container.Composite(new qx.ui.layout.HBox()).set({
          width: 60
        });
        let passedIcon = new qx.ui.basic.Image("qx/icon/Oxygen/16/actions/dialog-ok.png").set({
          width: 20
        });
        let passedLabel = new qx.ui.basic.Label();
        this.bind("numberPassed", passedLabel, "value");
        passedContainer.add(passedIcon);
        passedContainer.add(passedLabel);
        this.bind("numberPassed", passedContainer, "visibility", {
          converter: v => v > 0 ? "visible" : "hidden"
        });
        this.addWidget(passedContainer); // number of failed tests

        let failedContainer = new qx.ui.container.Composite(new qx.ui.layout.HBox()).set({
          width: 60
        });
        let failedIcon = new qx.ui.basic.Image("qx/icon/Oxygen/16/actions/dialog-cancel.png").set({
          width: 20
        });
        let failedLabel = new qx.ui.basic.Label();
        this.bind("numberFailed", failedLabel, "value");
        failedContainer.add(failedIcon);
        failedContainer.add(failedLabel);
        this.bind("numberFailed", failedContainer, "visibility", {
          converter: v => v > 0 ? "visible" : "hidden"
        });
        this.addWidget(failedContainer); // message

        var text = new qx.ui.basic.Label();
        this.bind("message", text, "value");
        text.setWidth(300);
        this.addWidget(text);
      }
    }
  });
  qxl.testtapper.TreeItem.$$dbClassInfo = $$dbClassInfo;
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
      "qx.ui.container.Composite": {
        "construct": true,
        "require": true
      },
      "qx.ui.layout.VBox": {
        "construct": true
      },
      "qx.ui.basic.Label": {
        "construct": true
      },
      "qx.ui.toolbar.ToolBar": {
        "construct": true
      },
      "qx.ui.toolbar.Button": {
        "construct": true
      },
      "qx.ui.embed.Html": {
        "construct": true
      },
      "qx.bom.client.Device": {
        "construct": true
      },
      "qx.log.appender.Element": {
        "construct": true
      },
      "qx.log.Logger": {
        "construct": true
      },
      "qx.ui.menu.Menu": {},
      "qx.ui.toolbar.MenuButton": {},
      "qx.ui.menu.Button": {}
    },
    "environment": {
      "provided": [],
      "required": {
        "device.type": {
          "construct": true,
          "className": "qx.bom.client.Device"
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
       * Martin Wittemann (martinwittemann)
  
  ************************************************************************ */

  /* ************************************************************************
  
  
  ************************************************************************ */

  /**
   *
   * @asset(qx/icon/Tango/16/actions/edit-clear.png)
   * @asset(qx/icon/Tango/16/categories/system.png)
   * @asset(qx/icon/Tango/16/status/dialog-information.png)
   * @asset(qx/icon/Tango/16/status/dialog-warning.png)
   * @asset(qx/icon/Tango/16/status/dialog-error.png)
   */
  qx.Class.define("qxl.logpane.LogPane", {
    extend: qx.ui.container.Composite,
    construct: function construct() {
      this.__logLevelData__P_591_0 = [["debug", "Debug", "icon/16/categories/system.png"], ["info", "Info", "icon/16/status/dialog-information.png"], ["warn", "Warning", "icon/16/status/dialog-warning.png"], ["error", "Error", "icon/16/status/dialog-error.png"]];
      var layout = new qx.ui.layout.VBox();
      layout.setSeparator("separator-vertical");
      qx.ui.container.Composite.constructor.call(this, layout);
      this.setDecorator("main"); // caption of the log pane

      var caption = new qx.ui.basic.Label(this.tr("Log")).set({
        font: "bold",
        padding: 10,
        alignY: "middle",
        allowGrowX: true,
        allowGrowY: true
      }); //this.add(caption);
      //toolbar of the log pane

      this.__toolbar__P_591_1 = new qx.ui.toolbar.ToolBar();

      this.__toolbar__P_591_1.add(caption);

      this.__toolbar__P_591_1.addSpacer();

      this.__toolbar__P_591_1.setBackgroundColor("white");

      var clearButton = new qx.ui.toolbar.Button(this.tr("Clear"), "icon/16/actions/edit-clear.png");
      clearButton.addListener("execute", function (e) {
        this.clear();
      }, this);

      this.__toolbar__P_591_1.add(clearButton);

      this.add(this.__toolbar__P_591_1); // log pane

      var logArea = new qx.ui.embed.Html('');
      logArea.set({
        backgroundColor: "white",
        overflowY: "scroll",
        overflowX: "auto",
        font: "monospace",
        padding: 3
      });

      if (qx.core.Environment.get("device.type") !== "desktop") {
        logArea.getContentElement().setStyle("WebkitOverflowScrolling", "touch");
        logArea.getContentElement().setStyle("touchAction", "auto");
      }

      this.add(logArea, {
        flex: 1
      }); // log appender

      this.__logAppender__P_591_2 = new qx.log.appender.Element();
      qx.log.Logger.unregister(this.__logAppender__P_591_2); // Directly create DOM element to use

      this.__logElem__P_591_3 = document.createElement("DIV");

      this.__logAppender__P_591_2.setElement(this.__logElem__P_591_3);

      logArea.addListenerOnce("appear", function () {
        logArea.getContentElement().getDomElement().appendChild(this.__logElem__P_591_3);
      }, this);
    },
    properties: {
      /** Shows the toolbar */

      /** Shows the log level button */
      showToolBar: {
        check: "Boolean",
        apply: "_applyShowToolBar",
        init: true
      },

      /** Current set log level.*/
      logLevel: {
        check: ["debug", "info", "warn", "error"],
        init: "debug",
        event: "changeLogLevel"
      }
    },
    members: {
      __logElem__P_591_3: null,
      __logAppender__P_591_2: null,
      __logLevelData__P_591_0: null,
      __logLevelButton__P_591_4: null,
      __toolbar__P_591_1: null,

      /**
       * Clears the log.
       */
      clear: function clear() {
        this.__logAppender__P_591_2.clear();
      },

      /**
       * Fetches all logged data from the qx logging system and puts in into the
       * log widget.
       *
       * @param Class {Logger?null} The logger class.
       */
      fetch: function fetch(Logger) {
        if (!Logger) {
          Logger = qx.log.Logger;
        } // Register to flush the log queue into the appender.


        Logger.register(this.__logAppender__P_591_2); // Clear buffer

        Logger.clear();
      },

      /**
       * Returns the div use as log appender element.
       * @return {DIV} The appender element.
       */
      getAppenderElement: function getAppenderElement() {
        return this.__logElem__P_591_3;
      },
      _applyShowToolBar: function _applyShowToolBar(value, old) {
        if (value) {
          this.__toolbar__P_591_1.show();
        } else {
          this.__toolbar__P_591_1.exclude();
        }
      },
      // property apply
      _applyShowLogLevel: function _applyShowLogLevel(value, old) {
        if (!this.__logLevelButton__P_591_4) {
          this.__logLevelButton__P_591_4 = this.__createLogLevelMenu__P_591_5();

          this.__toolbar__P_591_1.add(this.__logLevelButton__P_591_4);
        }

        if (value) {
          this.__logLevelButton__P_591_4.show();
        } else {
          this.__logLevelButton__P_591_4.exclude();
        }
      },

      /**
       * Returns the menu button used to select the AUT's log level
       *
       * @return {qx.ui.toolbar.MenuButton}
       */
      __createLogLevelMenu__P_591_5: function __createLogLevelMenu__P_591_5() {
        var logLevelMenu = new qx.ui.menu.Menu();
        var logLevelMenuButton = new qx.ui.toolbar.MenuButton("Log Level", "icon/16/categories/system.png");
        logLevelMenuButton.setMenu(logLevelMenu);

        for (var i = 0, l = this.__logLevelData__P_591_0.length; i < l; i++) {
          var data = this.__logLevelData__P_591_0[i];
          var button = new qx.ui.menu.Button(data[1], data[2]);
          button.setUserData("model", data[0]);
          button.addListener("execute", function (ev) {
            var pressedButton = ev.getTarget();
            this.setLogLevel(pressedButton.getUserData("model"));
            logLevelMenuButton.setIcon(pressedButton.getIcon());
          }, this);
          logLevelMenu.add(button);
        }

        return logLevelMenuButton;
      }
    },

    /*
     *****************************************************************************
        DESTRUCTOR
     *****************************************************************************
     */
    destruct: function destruct() {
      this._disposeObjects("__logAppender__P_591_2");

      this.__logElem__P_591_3 = null;
    }
  });
  qxl.logpane.LogPane.$$dbClassInfo = $$dbClassInfo;
})();
//# sourceMappingURL=package-11.js.map?dt=1608415704171
qx.$$packageData['11'] = {
  "locales": {},
  "resources": {},
  "translations": {
    "en": {}
  }
};
