/**
 * Mixin containing methods and tests that are shared among transports
 */
qx.Mixin.define("qx.test.io.jsonrpc.MTransport",{

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
     * @param expected {*}
     * @param actual {*}
     * @param msg
     */
    assertDeepEqual : function(expected, actual, msg) {
      msg = msg || "Failed to assert that " + qx.lang.Json.stringify(actual) +
        " is deeply equal to " + qx.lang.Json.stringify(expected) + "."
      this.assertTrue(qx.dev.unit.Sinon.getSinon().deepEqual(expected, actual), msg);
    }

  }
});
