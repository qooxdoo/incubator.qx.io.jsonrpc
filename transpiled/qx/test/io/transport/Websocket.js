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
      "qx.io.transport.Websocket": {},
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
   * Tests for the websocket transport
   */
  qx.Class.define("qx.test.io.transport.Websocket", {
    extend: qx.dev.unit.TestCase,
    members: {
      setUp() {
        let url = "wss://echo.websocket.org";
        this.transport = new qx.io.transport.Websocket(url);
      },

      async "test: send message to public websocket echo server and check response"() {
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
  qx.test.io.transport.Websocket.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Websocket.js.map?dt=1601118689025