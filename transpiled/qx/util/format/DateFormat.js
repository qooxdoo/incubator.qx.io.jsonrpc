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
      "qx.util.format.IFormat": {
        "require": true
      },
      "qx.locale.Date": {
        "construct": true
      },
      "qx.locale.Manager": {},
      "qx.log.Logger": {},
      "qx.lang.String": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2006 STZ-IDA, Germany, http://www.stz-ida.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Til Schneider (til132)
       * Fabian Jakobs (fjakobs)
  
  ************************************************************************ */

  /**
   * A formatter and parser for dates, see
   * http://www.unicode.org/reports/tr35/#Date_Format_Patterns
   *
   * Here is a quick overview of the format pattern keys:
   * <table>
   * <tr><th>Key &nbsp;<th>Description
   * <tr><td><code> G </code><td> era, e.g. "AD"
   * <tr><td><code> y </code><td> year
   * <tr><td><code> Y </code><td> week year
   * <tr><td><code> u </code><td> extended year [Not supported yet]
   * <tr><td><code> Q </code><td> quarter
   * <tr><td><code> q </code><td> stand-alone quarter
   * <tr><td><code> M </code><td> month
   * <tr><td><code> L </code><td> stand-alone month
   * <tr><td><code> I </code><td> chinese leap month [Not supported yet]
   * <tr><td><code> w </code><td> week of year
   * <tr><td><code> W </code><td> week of month
   * <tr><td><code> d </code><td> day of month
   * <tr><td><code> D </code><td> day of year
   * <tr><td><code> F </code><td> day of week in month [Not supported yet]
   * <tr><td><code> g </code><td> modified Julian day [Not supported yet]
   * <tr><td><code> E </code><td> day of week
   * <tr><td><code> e </code><td> local day of week
   * <tr><td><code> c </code><td> stand-alone local day of week
   * <tr><td><code> a </code><td> period of day (am or pm)
   * <tr><td><code> h </code><td> 12-hour hour
   * <tr><td><code> H </code><td> 24-hour hour
   * <tr><td><code> K </code><td> hour [0-11]
   * <tr><td><code> k </code><td> hour [1-24]
   * <tr><td><code> j </code><td> special symbol [Not supported yet]
   * <tr><td><code> m </code><td> minute
   * <tr><td><code> s </code><td> second
   * <tr><td><code> S </code><td> fractional second
   * <tr><td><code> A </code><td> millisecond in day [Not supported yet]
   * <tr><td><code> z </code><td> time zone, specific non-location format
   * <tr><td><code> Z </code><td> time zone, rfc822/gmt format
   * <tr><td><code> v </code><td> time zone, generic non-location format [Not supported yet]
   * <tr><td><code> V </code><td> time zone, like z except metazone abbreviations [Not supported yet]
   * </table>
   *
   * (This list is preliminary, not all format keys might be implemented). Most
   * keys support repetitions that influence the meaning of the format. Parts of the
   * format string that should not be interpreted as format keys have to be
   * single-quoted.
   *
   * The same format patterns will be used for both parsing and output formatting.
   * 
   * NOTE: Instances of this class must be disposed of after use
   *
   */
  qx.Class.define("qx.util.format.DateFormat", {
    extend: qx.core.Object,
    implement: [qx.util.format.IFormat],

    /*
    *****************************************************************************
       CONSTRUCTOR
    *****************************************************************************
    */

    /**
     * @param format {String|null} The format to use. If null, the locale's default
     * format is used.
     * @param locale {String?} optional locale to be used. In case this is not present, the {@link #locale} property of DateFormat
     * will be following the {@link qx.locale.Manager#locale} property of qx.locale.Manager
     */
    construct: function construct(format, locale) {
      qx.core.Object.constructor.call(this);
      this.__initialLocale__P_583_0 = this.__locale__P_583_1 = locale;

      if (format != null) {
        this.__format__P_583_2 = format.toString();

        if (this.__format__P_583_2 in qx.util.format.DateFormat.ISO_MASKS) {
          if (this.__format__P_583_2 === 'isoUtcDateTime') {
            this.__UTC__P_583_3 = true;
          }

          this.__format__P_583_2 = qx.util.format.DateFormat.ISO_MASKS[this.__format__P_583_2];
        }
      } else {
        this.__format__P_583_2 = qx.locale.Date.getDateFormat("long", this.getLocale()) + " " + qx.locale.Date.getDateTimeFormat("HHmmss", "HH:mm:ss", this.getLocale());
      }
    },

    /*
    *****************************************************************************
       STATICS
    *****************************************************************************
    */
    statics: {
      /**
       * Convenience factory that returns a <code>DateFomat</code> instance that
       * uses a short date-only format. Beware that the overall layout of the
       * date/time format string is that of the locale in effect when the factory
       * function is called.
       *
       * Implemented as a quasi-singleton, so beware of side effects.
       *
       * @return {DateFormat} a DateFormat instance.
       */
      getDateInstance: function getDateInstance() {
        var DateFormat = qx.util.format.DateFormat;
        var format = qx.locale.Date.getDateFormat("short") + ""; // Memoizing the instance, so caller doesn't have to dispose it.

        if (DateFormat._dateInstance == null || DateFormat._dateInstance.__format__P_583_2 != format) {
          DateFormat._dateInstance = new DateFormat(format);
        }

        return DateFormat._dateInstance;
      },

      /**
       * Convenience factory that returns a <code>DateFomat</code> instance that
       * uses a long date/time format. Beware that the overall layout of the
       * date/time format string is that of the locale in effect when the factory
       * function is called.
       *
       * Implemented as a quasi-singleton, so beware of side effects.
       *
       * @return {DateFormat} a DateFormat instance.
       */
      getDateTimeInstance: function getDateTimeInstance() {
        var DateFormat = qx.util.format.DateFormat;
        var format = qx.locale.Date.getDateFormat("long") + " " + qx.locale.Date.getDateTimeFormat("HHmmss", "HH:mm:ss"); // Memoizing the instance, so caller doesn't have to dispose it.

        if (DateFormat._dateTimeInstance == null || DateFormat._dateTimeInstance.__format__P_583_2 != format) {
          DateFormat._dateTimeInstance = new DateFormat(format);
        }

        return DateFormat._dateTimeInstance;
      },

      /**
       * @type {Integer} The threshold until when a year should be assumed to belong to the
       *   21st century (e.g. 12 -> 2012). Years over this threshold but below 100 will be
       *   assumed to belong to the 20th century (e.g. 88 -> 1988). Years over 100 will be
       *   used unchanged (e.g. 1792 -> 1792).
       */
      ASSUME_YEAR_2000_THRESHOLD: 30,

      /** @type {Map} Special masks of patterns that are used frequently*/
      ISO_MASKS: {
        isoDate: "yyyy-MM-dd",
        isoTime: "HH:mm:ss",
        isoDateTime: "yyyy-MM-dd'T'HH:mm:ss",
        isoUtcDateTime: "yyyy-MM-dd'T'HH:mm:ss'Z'"
      },

      /** @type {String} The am marker. */
      AM_MARKER: "am",

      /** @type {String} The pm marker. */
      PM_MARKER: "pm"
    },

    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */
    members: {
      __locale__P_583_1: null,
      __initialLocale__P_583_0: null,
      __format__P_583_2: null,
      __parseFeed__P_583_4: null,
      __parseRules__P_583_5: null,
      __formatTree__P_583_6: null,
      __UTC__P_583_3: null,

      /**
       * Fills a number with leading zeros ("25" -> "0025").
       *
       * @param number {Integer} the number to fill.
       * @param minSize {Integer} the minimum size the returned string should have.
       * @return {String} the filled number as string.
       */
      __fillNumber__P_583_7: function __fillNumber__P_583_7(number, minSize) {
        var str = "" + (number < 0 ? -1 * number : number);

        while (str.length < minSize) {
          str = "0" + str;
        }

        return number < 0 ? "-" + str : str;
      },

      /**
       * Returns the day in year of a date.
       *
       * @param date {Date} the date.
       * @return {Integer} the day in year.
       */
      __getDayInYear__P_583_8: function __getDayInYear__P_583_8(date) {
        var helpDate = new Date(date.getTime());
        var day = helpDate.getDate();

        while (helpDate.getMonth() != 0) {
          // Set the date to the last day of the previous month
          helpDate.setDate(-1);
          day += helpDate.getDate() + 1;
        }

        return day;
      },

      /**
       * Returns the thursday in the same week as the date.
       *
       * @param date {Date} the date to get the thursday of.
       * @return {Date} the thursday in the same week as the date.
       */
      __thursdayOfSameWeek__P_583_9: function __thursdayOfSameWeek__P_583_9(date) {
        return new Date(date.getTime() + (3 - (date.getDay() + 6) % 7) * 86400000);
      },

      /**
       * Returns the week in year of a date.
       *
       * @param date {Date} the date to get the week in year of.
       * @return {Integer} the week in year.
       */
      __getWeekInYear__P_583_10: function __getWeekInYear__P_583_10(date) {
        // The following algorithm comes from http://www.salesianer.de/util/kalwoch.html
        // Get the thursday of the week the date belongs to
        var thursdayDate = this.__thursdayOfSameWeek__P_583_9(date); // Get the year the thursday (and therefore the week) belongs to


        var weekYear = thursdayDate.getFullYear(); // Get the thursday of the week january 4th belongs to
        // (which defines week 1 of a year)

        var thursdayWeek1 = this.__thursdayOfSameWeek__P_583_9(new Date(weekYear, 0, 4)); // Calculate the calendar week


        return Math.floor(1.5 + (thursdayDate.getTime() - thursdayWeek1.getTime()) / 86400000 / 7);
      },

      /**
       * Returns the week in month of a date.
       *
       * @param date {Date} the date to get the week in year of.
       * @return {Integer} the week in month.
       */
      __getWeekInMonth__P_583_11: function __getWeekInMonth__P_583_11(date) {
        var thursdayDate = this.__thursdayOfSameWeek__P_583_9(date);

        var thursdayWeek1 = this.__thursdayOfSameWeek__P_583_9(new Date(date.getFullYear(), date.getMonth(), 4));

        return Math.floor(1.5 + (thursdayDate.getTime() - thursdayWeek1.getTime()) / 86400000 / 7);
      },

      /**
       * Returns the week year of a date. (that is the year of the week where this date happens to be)
       * For a week in the middle of the summer, the year is easily obtained, but for a week
       * when New Year's Eve takes place, the year of that week is ambiguous.
       * The thursday day of that week is used to determine the year.
       *
       * @param date {Date} the date to get the week in year of.
       * @return {Integer} the week year.
       */
      __getWeekYear__P_583_12: function __getWeekYear__P_583_12(date) {
        var thursdayDate = this.__thursdayOfSameWeek__P_583_9(date);

        return thursdayDate.getFullYear();
      },

      /**
       * Returns true if the year is a leap one.
       *
       * @param year {Integer} the year to check.
       * @return {Boolean} true if it is a leap year.
       */
      __isLeapYear__P_583_13: function __isLeapYear__P_583_13(year) {
        var februaryDate = new Date(year, 2, 1);
        februaryDate.setDate(-1);
        return februaryDate.getDate() + 1 === 29;
      },

      /**
       * Returns a json object with month and day as keys.
       *
       * @param dayOfYear {Integer} the day of year.
       * @param year {Integer} the year to check.
       * @return {Object} a json object {month: M, day: D}.
       */
      __getMonthAndDayFromDayOfYear__P_583_14: function __getMonthAndDayFromDayOfYear__P_583_14(dayOfYear, year) {
        var month = 0;
        var day = 0; // if we don't know the year, we take a non-leap year'

        if (!year) {
          year = 1971;
        }

        var dayCounter = 0;

        for (var i = 1; i <= 12; i++) {
          var tempDate = new Date(year, i, 1);
          tempDate.setDate(-1);
          var days = tempDate.getDate() + 1;
          dayCounter += days;

          if (dayCounter < dayOfYear) {
            month++;
            day += days;
          } else {
            day = dayOfYear - (dayCounter - days);
            break;
          }
        }

        return {
          month: month,
          day: day
        };
      },

      /**
       * Returns the year of a date when we know the week year
       *
       * @param weekYear {Integer} the week year.
       * @param month {Integer} the month
       * @param dayOfMonth {Integer} the day in month
       * @return {Integer} the year.
       */
      __getYearFromWeekYearAndMonth__P_583_15: function __getYearFromWeekYearAndMonth__P_583_15(weekYear, month, dayOfMonth) {
        var year;

        switch (month) {
          case 11:
            year = weekYear - 1;

            if (weekYear != this.__getWeekYear__P_583_12(new Date(year, month, dayOfMonth))) {
              year = weekYear;
            }

            break;

          case 0:
            year = weekYear + 1;

            if (weekYear != this.__getWeekYear__P_583_12(new Date(year, month, dayOfMonth))) {
              year = weekYear;
            }

            break;

          default:
            year = weekYear;
        }

        return year;
      },

      /**
       * Sets the new value for locale property
       * @param value {String} The new value.
       *
       */
      setLocale: function setLocale(value) {
        if (value !== null && typeof value != "string") {
          throw new Error("Cannot set locale to " + value + " - please provide a string");
        }

        this.__locale__P_583_1 = value === null ? this.__initialLocale__P_583_0 : value;
      },

      /**
       * Resets the Locale
       */
      resetLocale: function resetLocale() {
        this.setLocale(null);
      },

      /**
       * Returns the locale
       */
      getLocale: function getLocale() {
        var locale = this.__locale__P_583_1;

        if (locale === undefined) {
          locale = qx.locale.Manager.getInstance().getLocale();
        }

        return locale;
      },

      /**
       * Formats a date.
       *
       * @param date {Date} The date to format.
       * @return {String} the formatted date.
       */
      format: function format(date) {
        // check for null dates
        if (date == null) {
          return null;
        }

        if (isNaN(date.getTime())) {
          {
            qx.log.Logger.error("Provided date is invalid");
          }
          return null;
        }

        if (this.__UTC__P_583_3) {
          date = new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds(), date.getUTCMilliseconds());
        }

        var locale = this.getLocale();
        var fullYear = date.getFullYear();
        var month = date.getMonth();
        var dayOfMonth = date.getDate();
        var dayOfWeek = date.getDay();
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var seconds = date.getSeconds();
        var ms = date.getMilliseconds();
        var timezoneOffset = date.getTimezoneOffset();
        var timezoneSign = timezoneOffset > 0 ? 1 : -1;
        var timezoneHours = Math.floor(Math.abs(timezoneOffset) / 60);
        var timezoneMinutes = Math.abs(timezoneOffset) % 60; // Create the output

        this.__initFormatTree__P_583_16();

        var output = "";

        for (var i = 0; i < this.__formatTree__P_583_6.length; i++) {
          var currAtom = this.__formatTree__P_583_6[i];

          if (currAtom.type == "literal") {
            output += currAtom.text;
          } else {
            // This is a wildcard
            var wildcardChar = currAtom.character;
            var wildcardSize = currAtom.size; // Get its replacement

            var replacement = "?";

            switch (wildcardChar) {
              case 'y':
                // Year
                if (wildcardSize == 2) {
                  replacement = this.__fillNumber__P_583_7(fullYear % 100, 2);
                } else {
                  var year = Math.abs(fullYear);
                  replacement = year + "";

                  if (wildcardSize > replacement.length) {
                    for (var j = replacement.length; j < wildcardSize; j++) {
                      replacement = "0" + replacement;
                    }
                  }

                  if (fullYear < 0) {
                    replacement = "-" + replacement;
                  }
                }

                break;

              case 'Y':
                // Year
                replacement = this.__getWeekYear__P_583_12(date) + "";
                var year = replacement.replace('-', '');

                if (wildcardSize > replacement.length) {
                  for (var j = year.length; j < wildcardSize; j++) {
                    year = "0" + year;
                  }
                }

                replacement = replacement.indexOf("-") != -1 ? "-" + year : year;
                break;

              case 'G':
                // Era - there is no CLDR data for ERA yet
                if (wildcardSize >= 1 && wildcardSize <= 3) {
                  replacement = fullYear > 0 ? 'AD' : 'BC';
                } else if (wildcardSize == 4) {
                  replacement = fullYear > 0 ? 'Anno Domini' : 'Before Christ';
                } else if (wildcardSize == 5) {
                  replacement = fullYear > 0 ? 'A' : 'B';
                }

                break;

              case 'Q':
                // quarter
                if (wildcardSize == 1 || wildcardSize == 2) {
                  replacement = this.__fillNumber__P_583_7(parseInt(month / 4) + 1, wildcardSize);
                }

                if (wildcardSize == 3) {
                  replacement = 'Q' + (parseInt(month / 4) + 1);
                }

                break;

              case 'q':
                // quarter stand alone
                if (wildcardSize == 1 || wildcardSize == 2) {
                  replacement = this.__fillNumber__P_583_7(parseInt(month / 4) + 1, wildcardSize);
                }

                if (wildcardSize == 3) {
                  replacement = 'Q' + (parseInt(month / 4) + 1);
                }

                break;

              case 'D':
                // Day in year (e.g. 189)
                replacement = this.__fillNumber__P_583_7(this.__getDayInYear__P_583_8(date), wildcardSize);
                break;

              case 'd':
                // Day in month
                replacement = this.__fillNumber__P_583_7(dayOfMonth, wildcardSize);
                break;

              case 'w':
                // Week in year (e.g. 27)
                replacement = this.__fillNumber__P_583_7(this.__getWeekInYear__P_583_10(date), wildcardSize);
                break;

              case 'W':
                // Week in year (e.g. 27)
                replacement = this.__getWeekInMonth__P_583_11(date);
                break;

              case 'E':
                // Day in week
                if (wildcardSize >= 1 && wildcardSize <= 3) {
                  replacement = qx.locale.Date.getDayName("abbreviated", dayOfWeek, locale, "format", true);
                } else if (wildcardSize == 4) {
                  replacement = qx.locale.Date.getDayName("wide", dayOfWeek, locale, "format", true);
                } else if (wildcardSize == 5) {
                  replacement = qx.locale.Date.getDayName("narrow", dayOfWeek, locale, "format", true);
                }

                break;

              case 'e':
                // Day in week
                var startOfWeek = qx.locale.Date.getWeekStart(locale); // the index is 1 based

                var localeDayOfWeek = 1 + (dayOfWeek - startOfWeek >= 0 ? dayOfWeek - startOfWeek : 7 + (dayOfWeek - startOfWeek));

                if (wildcardSize >= 1 && wildcardSize <= 2) {
                  replacement = this.__fillNumber__P_583_7(localeDayOfWeek, wildcardSize);
                } else if (wildcardSize == 3) {
                  replacement = qx.locale.Date.getDayName("abbreviated", dayOfWeek, locale, "format", true);
                } else if (wildcardSize == 4) {
                  replacement = qx.locale.Date.getDayName("wide", dayOfWeek, locale, "format", true);
                } else if (wildcardSize == 5) {
                  replacement = qx.locale.Date.getDayName("narrow", dayOfWeek, locale, "format", true);
                }

                break;

              case 'c':
                // Stand-alone local day in week
                var startOfWeek = qx.locale.Date.getWeekStart(locale); // the index is 1 based

                var localeDayOfWeek = 1 + (dayOfWeek - startOfWeek >= 0 ? dayOfWeek - startOfWeek : 7 + (dayOfWeek - startOfWeek));

                if (wildcardSize == 1) {
                  replacement = '' + localeDayOfWeek;
                } else if (wildcardSize == 3) {
                  replacement = qx.locale.Date.getDayName("abbreviated", dayOfWeek, locale, "stand-alone", true);
                } else if (wildcardSize == 4) {
                  replacement = qx.locale.Date.getDayName("wide", dayOfWeek, locale, "stand-alone", true);
                } else if (wildcardSize == 5) {
                  replacement = qx.locale.Date.getDayName("narrow", dayOfWeek, locale, "stand-alone", true);
                }

                break;

              case 'M':
                // Month
                if (wildcardSize == 1 || wildcardSize == 2) {
                  replacement = this.__fillNumber__P_583_7(month + 1, wildcardSize);
                } else if (wildcardSize == 3) {
                  replacement = qx.locale.Date.getMonthName("abbreviated", month, locale, "format", true);
                } else if (wildcardSize == 4) {
                  replacement = qx.locale.Date.getMonthName("wide", month, locale, "format", true);
                } else if (wildcardSize == 5) {
                  replacement = qx.locale.Date.getMonthName("narrow", month, locale, "format", true);
                }

                break;

              case 'L':
                // Stand-alone month
                if (wildcardSize == 1 || wildcardSize == 2) {
                  replacement = this.__fillNumber__P_583_7(month + 1, wildcardSize);
                } else if (wildcardSize == 3) {
                  replacement = qx.locale.Date.getMonthName("abbreviated", month, locale, "stand-alone", true);
                } else if (wildcardSize == 4) {
                  replacement = qx.locale.Date.getMonthName("wide", month, locale, "stand-alone", true);
                } else if (wildcardSize == 5) {
                  replacement = qx.locale.Date.getMonthName("narrow", month, locale, "stand-alone", true);
                }

                break;

              case 'a':
                // am/pm marker
                // NOTE: 0:00 is am, 12:00 is pm
                replacement = hours < 12 ? qx.locale.Date.getAmMarker(locale) : qx.locale.Date.getPmMarker(locale);
                break;

              case 'H':
                // Hour in day (0-23)
                replacement = this.__fillNumber__P_583_7(hours, wildcardSize);
                break;

              case 'k':
                // Hour in day (1-24)
                replacement = this.__fillNumber__P_583_7(hours == 0 ? 24 : hours, wildcardSize);
                break;

              case 'K':
                // Hour in am/pm (0-11)
                replacement = this.__fillNumber__P_583_7(hours % 12, wildcardSize);
                break;

              case 'h':
                // Hour in am/pm (1-12)
                replacement = this.__fillNumber__P_583_7(hours % 12 == 0 ? 12 : hours % 12, wildcardSize);
                break;

              case 'm':
                // Minute in hour
                replacement = this.__fillNumber__P_583_7(minutes, wildcardSize);
                break;

              case 's':
                // Second in minute
                replacement = this.__fillNumber__P_583_7(seconds, wildcardSize);
                break;

              case 'S':
                // Fractional second
                replacement = this.__fillNumber__P_583_7(ms, 3);

                if (wildcardSize < replacement.length) {
                  replacement = replacement.substr(0, wildcardSize);
                } else {
                  while (wildcardSize > replacement.length) {
                    // if needed, fill the remaining wildcard length with trailing zeros
                    replacement += "0";
                  }
                }

                break;

              case 'z':
                // Time zone
                if (wildcardSize >= 1 && wildcardSize <= 4) {
                  replacement = "GMT" + (timezoneSign > 0 ? "-" : "+") + this.__fillNumber__P_583_7(Math.abs(timezoneHours), 2) + ":" + this.__fillNumber__P_583_7(timezoneMinutes, 2);
                }

                break;

              case 'Z':
                // RFC 822 time zone
                if (wildcardSize >= 1 && wildcardSize <= 3) {
                  replacement = (timezoneSign > 0 ? "-" : "+") + this.__fillNumber__P_583_7(Math.abs(timezoneHours), 2) + this.__fillNumber__P_583_7(timezoneMinutes, 2);
                } else {
                  replacement = "GMT" + (timezoneSign > 0 ? "-" : "+") + this.__fillNumber__P_583_7(Math.abs(timezoneHours), 2) + ":" + this.__fillNumber__P_583_7(timezoneMinutes, 2);
                }

                break;
            }

            output += replacement;
          }
        }

        return output;
      },

      /**
       * Parses a date.
       *
       * @param dateStr {String} the date to parse.
       * @return {Date} the parsed date.
       * @throws {Error} If the format is not well formed or if the date string does not
       *       match to the format.
       */
      parse: function parse(dateStr) {
        this.__initParseFeed__P_583_17(); // Apply the regex


        var hit = this.__parseFeed__P_583_4.regex.exec(dateStr);

        if (hit == null) {
          throw new Error("Date string '" + dateStr + "' does not match the date format: " + this.__format__P_583_2);
        } // Apply the rules


        var dateValues = {
          era: 1,
          year: 1970,
          quarter: 1,
          month: 0,
          day: 1,
          dayOfYear: 1,
          hour: 0,
          ispm: false,
          weekDay: 4,
          weekYear: 1970,
          weekOfMonth: 1,
          weekOfYear: 1,
          min: 0,
          sec: 0,
          ms: 0
        };
        var currGroup = 1;
        var applyWeekYearAfterRule = false;
        var applyDayOfYearAfterRule = false;

        for (var i = 0; i < this.__parseFeed__P_583_4.usedRules.length; i++) {
          var rule = this.__parseFeed__P_583_4.usedRules[i];
          var value = hit[currGroup];

          if (rule.field != null) {
            dateValues[rule.field] = parseInt(value, 10);
          } else {
            rule.manipulator(dateValues, value, rule.pattern);
          }

          if (rule.pattern == "Y+") {
            var yearRuleApplied = false;

            for (var k = 0; k < this.__parseFeed__P_583_4.usedRules.length; k++) {
              if (this.__parseFeed__P_583_4.usedRules[k].pattern == 'y+') {
                yearRuleApplied = true;
                break;
              }
            }

            if (!yearRuleApplied) {
              applyWeekYearAfterRule = true;
            }
          }

          if (rule.pattern.indexOf("D") != -1) {
            var dayRuleApplied = false;

            for (var k = 0; k < this.__parseFeed__P_583_4.usedRules.length; k++) {
              if (this.__parseFeed__P_583_4.usedRules[k].pattern.indexOf("d") != -1) {
                dayRuleApplied = true;
                break;
              }
            }

            if (!dayRuleApplied) {
              applyDayOfYearAfterRule = true;
            }
          }

          currGroup += rule.groups == null ? 1 : rule.groups;
        }

        if (applyWeekYearAfterRule) {
          dateValues.year = this.__getYearFromWeekYearAndMonth__P_583_15(dateValues.weekYear, dateValues.month, dateValues.day);
        }

        if (applyDayOfYearAfterRule) {
          var dayAndMonth = this.__getMonthAndDayFromDayOfYear__P_583_14(dateValues.dayOfYear, dateValues.year);

          dateValues.month = dayAndMonth.month;
          dateValues.day = dayAndMonth.day;
        }

        if (dateValues.era < 0 && dateValues.year * dateValues.era < 0) {
          dateValues.year = dateValues.year * dateValues.era;
        }

        var date = new Date(dateValues.year, dateValues.month, dateValues.day, dateValues.ispm ? dateValues.hour + 12 : dateValues.hour, dateValues.min, dateValues.sec, dateValues.ms);

        if (this.__UTC__P_583_3) {
          date = new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds(), date.getUTCMilliseconds());
        }

        if (dateValues.month != date.getMonth() || dateValues.year != date.getFullYear()) {
          throw new Error("Error parsing date '" + dateStr + "': the value for day or month is too large");
        }

        return date;
      },

      /**
       * Helper method for {@link #format()} and {@link #parse()}.
       * Parses the date format.
       *
       */
      __initFormatTree__P_583_16: function __initFormatTree__P_583_16() {
        if (this.__formatTree__P_583_6 != null) {
          return;
        }

        this.__formatTree__P_583_6 = [];
        var currWildcardChar;
        var currWildcardSize = 0;
        var currLiteral = "";
        var format = this.__format__P_583_2;
        var state = "default";
        var i = 0;

        while (i < format.length) {
          var currChar = format.charAt(i);

          switch (state) {
            case "quoted_literal":
              // We are now inside a quoted literal
              // Check whether the current character is an escaped "'" character
              if (currChar == "'") {
                if (i + 1 >= format.length) {
                  // this is the last character
                  i++;
                  break;
                }

                var lookAhead = format.charAt(i + 1);

                if (lookAhead == "'") {
                  currLiteral += currChar;
                  i++;
                } else {
                  // quoted literal ends
                  i++;
                  state = "unkown";
                }
              } else {
                currLiteral += currChar;
                i++;
              }

              break;

            case "wildcard":
              // Check whether the currChar belongs to that wildcard
              if (currChar == currWildcardChar) {
                // It does -> Raise the size
                currWildcardSize++;
                i++;
              } else {
                // It does not -> The current wildcard is done
                this.__formatTree__P_583_6.push({
                  type: "wildcard",
                  character: currWildcardChar,
                  size: currWildcardSize
                });

                currWildcardChar = null;
                currWildcardSize = 0;
                state = "default";
              }

              break;

            default:
              // We are not (any more) in a wildcard or quoted literal -> Check what's starting here
              if (currChar >= 'a' && currChar <= 'z' || currChar >= 'A' && currChar <= 'Z') {
                // This is a letter -> All letters are wildcards
                // Start a new wildcard
                currWildcardChar = currChar;
                state = "wildcard";
              } else if (currChar == "'") {
                if (i + 1 >= format.length) {
                  // this is the last character
                  currLiteral += currChar;
                  i++;
                  break;
                }

                var lookAhead = format.charAt(i + 1);

                if (lookAhead == "'") {
                  currLiteral += currChar;
                  i++;
                }

                i++;
                state = "quoted_literal";
              } else {
                state = "default";
              }

              if (state != "default") {
                // Add the literal
                if (currLiteral.length > 0) {
                  this.__formatTree__P_583_6.push({
                    type: "literal",
                    text: currLiteral
                  });

                  currLiteral = "";
                }
              } else {
                // This is an unquoted literal -> Add it to the current literal
                currLiteral += currChar;
                i++;
              }

              break;
          }
        } // Add the last wildcard or literal


        if (currWildcardChar != null) {
          this.__formatTree__P_583_6.push({
            type: "wildcard",
            character: currWildcardChar,
            size: currWildcardSize
          });
        } else if (currLiteral.length > 0) {
          this.__formatTree__P_583_6.push({
            type: "literal",
            text: currLiteral
          });
        }
      },

      /**
       * Initializes the parse feed.
       *
       * The parse contains everything needed for parsing: The regular expression
       * (in compiled and uncompiled form) and the used rules.
       *
       * @throws {Error} If the date format is malformed.
       */
      __initParseFeed__P_583_17: function __initParseFeed__P_583_17() {
        if (this.__parseFeed__P_583_4 != null) {
          // We already have the parse feed
          return;
        }

        var format = this.__format__P_583_2; // Initialize the rules

        this.__initParseRules__P_583_18();

        this.__initFormatTree__P_583_16(); // Get the used rules and construct the regex pattern


        var usedRules = [];
        var pattern = "^";

        for (var atomIdx = 0; atomIdx < this.__formatTree__P_583_6.length; atomIdx++) {
          var currAtom = this.__formatTree__P_583_6[atomIdx];

          if (currAtom.type == "literal") {
            pattern += qx.lang.String.escapeRegexpChars(currAtom.text);
          } else {
            // This is a wildcard
            var wildcardChar = currAtom.character;
            var wildcardSize = currAtom.size; // Get the rule for this wildcard

            var wildcardRule;

            for (var ruleIdx = 0; ruleIdx < this.__parseRules__P_583_5.length; ruleIdx++) {
              var rule = this.__parseRules__P_583_5[ruleIdx];

              if (this.__isRuleForWildcard__P_583_19(rule, wildcardChar, wildcardSize)) {
                // We found the right rule for the wildcard
                wildcardRule = rule;
                break;
              }
            } // Check the rule


            if (wildcardRule == null) {
              // We have no rule for that wildcard -> Malformed date format
              var wildcardStr = "";

              for (var i = 0; i < wildcardSize; i++) {
                wildcardStr += wildcardChar;
              }

              throw new Error("Malformed date format: " + format + ". Wildcard " + wildcardStr + " is not supported");
            } else {
              // Add the rule to the pattern
              usedRules.push(wildcardRule);
              pattern += wildcardRule.regex;
            }
          }
        }

        pattern += "$"; // Create the regex

        var regex;

        try {
          regex = new RegExp(pattern);
        } catch (exc) {
          throw new Error("Malformed date format: " + format);
        } // Create the this.__parseFeed


        this.__parseFeed__P_583_4 = {
          regex: regex,
          "usedRules": usedRules,
          pattern: pattern
        };
      },

      /**
       * Checks whether the rule matches the wildcard or not.
       * @param rule {Object} the rule we try to match with the wildcard
       * @param wildcardChar {String} the character in the wildcard
       * @param wildcardSize {Integer} the number of  wildcardChar characters in the wildcard
       * @return {Boolean} if the rule matches or not
       */
      __isRuleForWildcard__P_583_19: function __isRuleForWildcard__P_583_19(rule, wildcardChar, wildcardSize) {
        if (wildcardChar === 'y' && rule.pattern === 'y+') {
          rule.regex = rule.regexFunc(wildcardSize);
          return true;
        } else if (wildcardChar === 'Y' && rule.pattern === 'Y+') {
          rule.regex = rule.regexFunc(wildcardSize);
          return true;
        } else {
          return wildcardChar == rule.pattern.charAt(0) && wildcardSize == rule.pattern.length;
        }
      },

      /**
       * Initializes the static parse rules.
       *
       */
      __initParseRules__P_583_18: function __initParseRules__P_583_18() {
        var DateFormat = qx.util.format.DateFormat;
        var LString = qx.lang.String;

        if (this.__parseRules__P_583_5 != null) {
          // The parse rules are already initialized
          return;
        }

        var rules = this.__parseRules__P_583_5 = [];
        var amMarker = qx.locale.Date.getAmMarker(this.getLocale()).toString() || DateFormat.AM_MARKER;
        var pmMarker = qx.locale.Date.getPmMarker(this.getLocale()).toString() || DateFormat.PM_MARKER;
        var locale = this.getLocale();

        var yearManipulator = function yearManipulator(dateValues, value) {
          value = parseInt(value, 10);

          if (value >= 0) {
            if (value < DateFormat.ASSUME_YEAR_2000_THRESHOLD) {
              value += 2000;
            } else if (value < 100) {
              value += 1900;
            }
          }

          dateValues.year = value;
        };

        var weekYearManipulator = function weekYearManipulator(dateValues, value) {
          value = parseInt(value, 10);

          if (value >= 0) {
            if (value < DateFormat.ASSUME_YEAR_2000_THRESHOLD) {
              value += 2000;
            } else if (value < 100) {
              value += 1900;
            }
          }

          dateValues.weekYear = value;
        };

        var monthManipulator = function monthManipulator(dateValues, value) {
          dateValues.month = parseInt(value, 10) - 1;
        };

        var localWeekDayManipulator = function localWeekDayManipulator(dateValues, value) {
          var startOfWeek = qx.locale.Date.getWeekStart(locale);
          var dayOfWeek = parseInt(value, 10) - 1 + startOfWeek <= 6 ? parseInt(value, 10) - 1 + startOfWeek : parseInt(value, 10) - 1 + startOfWeek - 7;
          dateValues.weekDay = dayOfWeek;
        };

        var ampmManipulator = function ampmManipulator(dateValues, value) {
          var pmMarker = qx.locale.Date.getPmMarker(locale).toString() || DateFormat.PM_MARKER;
          dateValues.ispm = value == pmMarker;
        };

        var noZeroHourManipulator = function noZeroHourManipulator(dateValues, value) {
          dateValues.hour = parseInt(value, 10) % 24;
        };

        var noZeroAmPmHourManipulator = function noZeroAmPmHourManipulator(dateValues, value) {
          dateValues.hour = parseInt(value, 10) % 12;
        };

        var ignoreManipulator = function ignoreManipulator(dateValues, value) {
          return;
        };

        var narrowEraNames = ['A', 'B'];

        var narrowEraNameManipulator = function narrowEraNameManipulator(dateValues, value) {
          dateValues.era = value == 'A' ? 1 : -1;
        };

        var abbrevEraNames = ['AD', 'BC'];

        var abbrevEraNameManipulator = function abbrevEraNameManipulator(dateValues, value) {
          dateValues.era = value == 'AD' ? 1 : -1;
        };

        var fullEraNames = ['Anno Domini', 'Before Christ'];

        var fullEraNameManipulator = function fullEraNameManipulator(dateValues, value) {
          dateValues.era = value == 'Anno Domini' ? 1 : -1;
        };

        var abbrevQuarterNames = ['Q1', 'Q2', 'Q3', 'Q4'];

        var abbrevQuarterManipulator = function abbrevQuarterManipulator(dateValues, value) {
          dateValues.quarter = abbrevQuarterNames.indexOf(value);
        };

        var fullQuarterNames = ['1st quarter', '2nd quarter', '3rd quarter', '4th quarter'];

        var fullQuarterManipulator = function fullQuarterManipulator(dateValues, value) {
          dateValues.quarter = fullQuarterNames.indexOf(value);
        };

        var cache = {};

        var dateNamesManipulator = function dateNamesManipulator(pattern) {
          var monthPatternLetters = ['L', 'M'];
          var dayPatternLetters = ['c', 'e', 'E'];
          var firstLetterInPattern = pattern.charAt(0);
          var isMonth = monthPatternLetters.indexOf(firstLetterInPattern) >= 0;

          var getContext = function getContext() {
            var letters = isMonth ? monthPatternLetters : dayPatternLetters;
            var context = firstLetterInPattern === letters[0] ? "stand-alone" : "format";
            var patternLength = pattern.length;
            var lengthName = 'abbreviated';

            switch (patternLength) {
              case 4:
                lengthName = 'wide';
                break;

              case 5:
                lengthName = 'narrow';
                break;

              default:
                lengthName = 'abbreviated';
            }

            return [context, lengthName];
          };

          if (!cache[pattern]) {
            cache[pattern] = {};
            var context = getContext();
            var func = isMonth ? qx.locale.Date.getMonthNames : qx.locale.Date.getDayNames;
            var names = func.call(qx.locale.Date, context[1], locale, context[0], true);

            for (var i = 0, l = names.length; i < l; i++) {
              names[i] = LString.escapeRegexpChars(names[i].toString());
            }

            cache[pattern].data = names;

            cache[pattern].func = function (dateValues, value) {
              value = LString.escapeRegexpChars(value);
              dateValues[isMonth ? 'month' : 'weekDay'] = names.indexOf(value);
            };
          }

          return cache[pattern];
        }; // Unsupported: F (Day of week in month)


        rules.push({
          pattern: "y+",
          regexFunc: function regexFunc(yNumber) {
            var regex = "(-*";

            for (var i = 0; i < yNumber; i++) {
              regex += "\\d";

              if (i === yNumber - 1 && i !== 1) {
                regex += "+?";
              }
            }

            regex += ")";
            return regex;
          },
          manipulator: yearManipulator
        });
        rules.push({
          pattern: "Y+",
          regexFunc: function regexFunc(yNumber) {
            var regex = "(-*";

            for (var i = 0; i < yNumber; i++) {
              regex += "\\d";

              if (i === yNumber - 1) {
                regex += "+?";
              }
            }

            regex += ")";
            return regex;
          },
          manipulator: weekYearManipulator
        });
        rules.push({
          pattern: "G",
          regex: "(" + abbrevEraNames.join("|") + ")",
          manipulator: abbrevEraNameManipulator
        });
        rules.push({
          pattern: "GG",
          regex: "(" + abbrevEraNames.join("|") + ")",
          manipulator: abbrevEraNameManipulator
        });
        rules.push({
          pattern: "GGG",
          regex: "(" + abbrevEraNames.join("|") + ")",
          manipulator: abbrevEraNameManipulator
        });
        rules.push({
          pattern: "GGGG",
          regex: "(" + fullEraNames.join("|") + ")",
          manipulator: fullEraNameManipulator
        });
        rules.push({
          pattern: "GGGGG",
          regex: "(" + narrowEraNames.join("|") + ")",
          manipulator: narrowEraNameManipulator
        });
        rules.push({
          pattern: "Q",
          regex: "(\\d\\d*?)",
          field: "quarter"
        });
        rules.push({
          pattern: "QQ",
          regex: "(\\d\\d?)",
          field: "quarter"
        });
        rules.push({
          pattern: "QQQ",
          regex: "(" + abbrevQuarterNames.join("|") + ")",
          manipulator: abbrevQuarterManipulator
        });
        rules.push({
          pattern: "QQQQ",
          regex: "(" + fullQuarterNames.join("|") + ")",
          manipulator: fullQuarterManipulator
        });
        rules.push({
          pattern: "q",
          regex: "(\\d\\d*?)",
          field: "quarter"
        });
        rules.push({
          pattern: "qq",
          regex: "(\\d\\d?)",
          field: "quarter"
        });
        rules.push({
          pattern: "qqq",
          regex: "(" + abbrevQuarterNames.join("|") + ")",
          manipulator: abbrevQuarterManipulator
        });
        rules.push({
          pattern: "qqqq",
          regex: "(" + fullQuarterNames.join("|") + ")",
          manipulator: fullQuarterManipulator
        });
        rules.push({
          pattern: "M",
          regex: "(\\d\\d*?)",
          manipulator: monthManipulator
        });
        rules.push({
          pattern: "MM",
          regex: "(\\d\\d?)",
          manipulator: monthManipulator
        });
        rules.push({
          pattern: "MMM",
          regex: "(" + dateNamesManipulator("MMM").data.join("|") + ")",
          manipulator: dateNamesManipulator("MMM").func
        });
        rules.push({
          pattern: "MMMM",
          regex: "(" + dateNamesManipulator("MMMM").data.join("|") + ")",
          manipulator: dateNamesManipulator("MMMM").func
        });
        rules.push({
          pattern: "MMMMM",
          regex: "(" + dateNamesManipulator("MMMMM").data.join("|") + ")",
          manipulator: dateNamesManipulator("MMMMM").func
        });
        rules.push({
          pattern: "L",
          regex: "(\\d\\d*?)",
          manipulator: monthManipulator
        });
        rules.push({
          pattern: "LL",
          regex: "(\\d\\d?)",
          manipulator: monthManipulator
        });
        rules.push({
          pattern: "LLL",
          regex: "(" + dateNamesManipulator("LLL").data.join("|") + ")",
          manipulator: dateNamesManipulator("LLL").func
        });
        rules.push({
          pattern: "LLLL",
          regex: "(" + dateNamesManipulator("LLLL").data.join("|") + ")",
          manipulator: dateNamesManipulator("LLLL").func
        });
        rules.push({
          pattern: "LLLLL",
          regex: "(" + dateNamesManipulator("LLLLL").data.join("|") + ")",
          manipulator: dateNamesManipulator("LLLLL").func
        });
        rules.push({
          pattern: "dd",
          regex: "(\\d\\d?)",
          field: "day"
        });
        rules.push({
          pattern: "d",
          regex: "(\\d\\d*?)",
          field: "day"
        });
        rules.push({
          pattern: "D",
          regex: "(\\d?)",
          field: "dayOfYear"
        });
        rules.push({
          pattern: "DD",
          regex: "(\\d\\d?)",
          field: "dayOfYear"
        });
        rules.push({
          pattern: "DDD",
          regex: "(\\d\\d\\d?)",
          field: "dayOfYear"
        });
        rules.push({
          pattern: "E",
          regex: "(" + dateNamesManipulator("E").data.join("|") + ")",
          manipulator: dateNamesManipulator("E").func
        });
        rules.push({
          pattern: "EE",
          regex: "(" + dateNamesManipulator("EE").data.join("|") + ")",
          manipulator: dateNamesManipulator("EE").func
        });
        rules.push({
          pattern: "EEE",
          regex: "(" + dateNamesManipulator("EEE").data.join("|") + ")",
          manipulator: dateNamesManipulator("EEE").func
        });
        rules.push({
          pattern: "EEEE",
          regex: "(" + dateNamesManipulator("EEEE").data.join("|") + ")",
          manipulator: dateNamesManipulator("EEEE").func
        });
        rules.push({
          pattern: "EEEEE",
          regex: "(" + dateNamesManipulator("EEEEE").data.join("|") + ")",
          manipulator: dateNamesManipulator("EEEEE").func
        });
        rules.push({
          pattern: "e",
          regex: "(\\d?)",
          manipulator: localWeekDayManipulator
        });
        rules.push({
          pattern: "ee",
          regex: "(\\d\\d?)",
          manipulator: localWeekDayManipulator
        });
        rules.push({
          pattern: "eee",
          regex: "(" + dateNamesManipulator("eee").data.join("|") + ")",
          manipulator: dateNamesManipulator("eee").func
        });
        rules.push({
          pattern: "eeee",
          regex: "(" + dateNamesManipulator("eeee").data.join("|") + ")",
          manipulator: dateNamesManipulator("eeee").func
        });
        rules.push({
          pattern: "eeeee",
          regex: "(" + dateNamesManipulator("eeeee").data.join("|") + ")",
          manipulator: dateNamesManipulator("eeeee").func
        });
        rules.push({
          pattern: "c",
          regex: "\\d?",
          manipulator: localWeekDayManipulator
        });
        rules.push({
          pattern: "ccc",
          regex: "(" + dateNamesManipulator("ccc").data.join("|") + ")",
          manipulator: dateNamesManipulator("ccc").func
        });
        rules.push({
          pattern: "cccc",
          regex: "(" + dateNamesManipulator("cccc").data.join("|") + ")",
          manipulator: dateNamesManipulator("cccc").func
        });
        rules.push({
          pattern: "ccccc",
          regex: "(" + dateNamesManipulator("ccccc").data.join("|") + ")",
          manipulator: dateNamesManipulator("ccccc").func
        });
        rules.push({
          pattern: "a",
          regex: "(" + amMarker + "|" + pmMarker + ")",
          manipulator: ampmManipulator
        });
        rules.push({
          pattern: "W",
          regex: "(\\d?)",
          field: "weekOfMonth"
        });
        rules.push({
          pattern: "w",
          regex: "(\\d\\d?)",
          field: "weekOfYear"
        });
        rules.push({
          pattern: "ww",
          regex: "(\\d\\d)",
          field: "weekOfYear"
        });
        rules.push({
          pattern: "HH",
          regex: "(\\d\\d?)",
          field: "hour"
        });
        rules.push({
          pattern: "H",
          regex: "(\\d\\d?)",
          field: "hour"
        });
        rules.push({
          pattern: "kk",
          regex: "(\\d\\d?)",
          manipulator: noZeroHourManipulator
        });
        rules.push({
          pattern: "k",
          regex: "(\\d\\d?)",
          manipulator: noZeroHourManipulator
        });
        rules.push({
          pattern: "KK",
          regex: "(\\d\\d?)",
          field: "hour"
        });
        rules.push({
          pattern: "K",
          regex: "(\\d\\d?)",
          field: "hour"
        });
        rules.push({
          pattern: "hh",
          regex: "(\\d\\d?)",
          manipulator: noZeroAmPmHourManipulator
        });
        rules.push({
          pattern: "h",
          regex: "(\\d\\d?)",
          manipulator: noZeroAmPmHourManipulator
        });
        rules.push({
          pattern: "mm",
          regex: "(\\d\\d?)",
          field: "min"
        });
        rules.push({
          pattern: "m",
          regex: "(\\d\\d?)",
          field: "min"
        });
        rules.push({
          pattern: "ss",
          regex: "(\\d\\d?)",
          field: "sec"
        });
        rules.push({
          pattern: "s",
          regex: "(\\d\\d?)",
          field: "sec"
        });
        rules.push({
          pattern: "SSS",
          regex: "(\\d\\d?\\d?)",
          field: "ms"
        });
        rules.push({
          pattern: "SS",
          regex: "(\\d\\d?\\d?)",
          field: "ms"
        });
        rules.push({
          pattern: "S",
          regex: "(\\d\\d?\\d?)",
          field: "ms"
        });
        rules.push({
          pattern: "Z",
          regex: "([\\+\\-]\\d\\d\\d\\d)",
          manipulator: ignoreManipulator
        });
        rules.push({
          pattern: "z",
          regex: "(GMT[\\+\\-]\\d\\d:\\d\\d)",
          manipulator: ignoreManipulator
        });
      }
    }
  });
  qx.util.format.DateFormat.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=DateFormat.js.map?dt=1605962053496