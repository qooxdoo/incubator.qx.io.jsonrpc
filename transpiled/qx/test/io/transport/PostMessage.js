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
      "qx.io.transport.PostMessage": {},
      "qx.Promise": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2004-2011 1&1 Internet AG, Germany, http://www.1und1.de & contributors
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Tristan Koch (tristankoch)
       * Christian Boulanger (cboulanger)
  
  ************************************************************************ */

  /**
   * Tests for the postMessage transport
   * @ignore(URL)
   * @ignore(Worker)
   * @ignore(self)
   */
  qx.Class.define("qx.test.io.transport.PostMessage", {
    extend: qx.dev.unit.TestCase,
    members: {
      setUp() {
        // see https://medium.com/@dee_bloo/make-multithreading-easier-with-inline-web-workers-a58723428a42
        function createWorker(fn) {
          var blob = new Blob(['self.onmessage = ', fn.toString()], {
            type: 'text/javascript'
          });
          var url = URL.createObjectURL(blob);
          return new Worker(url);
        } // create echo server


        const worker = createWorker(evt => {
          self.postMessage(evt.data);
        });
        this.transport = new qx.io.transport.PostMessage(worker);
      },

      async "test: send message to worker and check response"() {
        let message = "Hello World!";
        await new qx.Promise((resolve, reject) => {
          this.transport.addListenerOnce("message", evt => {
            this.assertEquals(message, evt.getData());
          });
          this.transport.send(message).then(resolve).catch(reject);
        });
      }

    }
  });
  qx.test.io.transport.PostMessage.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=PostMessage.js.map?dt=1606253511370