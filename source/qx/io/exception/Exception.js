/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2020 Christian Boulanger

   License:
     MIT: https://opensource.org/licenses/MIT
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Christian Boulanger (cboulanger)

************************************************************************ */

/**
 * A generic class for representing exceptions that occur during io operations.
 */
qx.Class.define("qx.io.Exception",
{
  extend : qx.type.BaseError,

  statics: {
    /* Error codes for exceptions that happen in the client execution
     * context:
     * TIMEOUT, ABORTED, NO_DATA, INVALID_DATA, CANCELLED
     */
    type:
      {
        TIMEOUT      : 1,
        ABORTED      : 2,
        NO_DATA      : 3,
        INVALID_DATA : 4,
        CANCELLED    : 5
      }
  },

  /**
   * Constructor
   * @param message {String}
   * @param code {Number}
   * @param data {*|null}
   */
  construct: function(message, code, data) {
    this.base(arguments, "", message);
    this.code = code;
    this.data = data;
    this.name = this.classname;
  }
});
