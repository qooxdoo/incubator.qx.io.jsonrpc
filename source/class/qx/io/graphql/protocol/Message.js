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
 * Abstract parent class for GraphQL messages and responses
 */
qx.Class.define("qx.io.graphql.protocol.Message",{
  extend: qx.core.Object,
  construct: function(data) {
    this.base(arguments);
    this.set(data);
  },
  members : {
    /**
     * Serialize to JSON string
     * @return {String}
     */
    toString() {
      return qx.util.Serializer.toJson(this);
    },

    /**
     * Serialize to a native javascript object
     * @return {Object}
     */
    toObject() {
      return qx.util.Serializer.toNativeObject(this);
    }
  }
});
