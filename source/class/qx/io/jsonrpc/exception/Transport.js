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
 *  A class for representing errors that occurred during the request transport.
 *  In the context of HTTP requests, the error code is the HTTP error code.
 */
qx.Class.define("qx.io.jsonrpc.exception.Transport",
{
  extend : qx.io.Exception,
  statics: {
    TIMEOUT          : 1,
    ABORTED          : 2,
    NO_DATA          : 3,
    INVALID_MSG_DATA : 4,
    CANCELLED        : 5,
    INVALD_URI       : 6,
    FAILED           : 7,
    INVALID_ID       : 8,
    INVALID_JSON     : 9,
    DUPLICATE_ID     : 10,
    UNKNOWN_ID       : 11
  }
});
