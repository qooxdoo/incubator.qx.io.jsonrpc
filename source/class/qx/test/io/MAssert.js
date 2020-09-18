/**
 * Mixin containing special assert methods
 */
qx.Mixin.define("qx.test.io.MAssert", {

  members : {

    /**
     * Deep equal comparison, using Sinon's `deepEqual` comparison.
     * Two values are "deep equal" if:
     *
     *   - They are equal, according to samsam.identical
     *   (https://sinonjs.github.io/samsam/)
     *   - They are both date objects representing the same time
     *   - They are both arrays containing elements that are all deepEqual
     *   - They are objects with the same set of properties, and each property
     *     in obj1 is deepEqual to the corresponding property in obj2
     *
     * Supports cyclic objects.
     * @param {*} expected
     * @param {*} actual
     * @param {String?} msg
     */
    assertDeepEquals : function(expected, actual, msg) {
      if (!msg) {
        msg = `Failed to assert that ${qx.lang.Json.stringify(actual)} deeply equals ${qx.lang.Json.stringify(expected)}.`;
      }
      this.assert(qx.dev.unit.Sinon.getSinon().deepEqual(expected, actual), msg);
    },

    /**
     * Assert that an message is dispatched via the message bus.
     *
     * @param {String} name The name of the message
     * @param {*|Function|undefined} data The data of the message, if any, or a
     * valiation function which returns true of false depending on whether the
     * data was correct. If you dont want to check the data and want to provide
     * a message as the third argument, pass `undefined` explicitly.
     * @param msg {String?""} Message to be shows if the assertion fails.
     */
    assertMessageDispatched : function(name, data, msg) {
      throw new Error("Needs to be implemented");
    }
  }
});
