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
 * Tests for qx.io.jsonrpc.transport.Http
 * Based on qx.test.io.request.Xhr
 */
qx.Class.define("qx.test.io.jsonrpc.HttpTransport",
{
  extend : qx.dev.unit.TestCase,

  include : [
    qx.dev.unit.MMock,
    qx.test.io.jsonrpc.MTransport
  ],

  members : {

    setUp() {
      this.sinon = qx.dev.unit.Sinon.getSinon();
      this.setUpRequest();
      this.setUpFakeTransport();
      qx.io.jsonrpc.protocol.Request.resetId();
    },

    setUpRequest: function () {
      this.req && this.req.dispose();
      this.req = new qx.io.request.Xhr();
      this.req.setUrl("url");
    },

    setUpFakeTransport: function () {
      if (this.transport && this.transport.send.restore) {
        return;
      }
      this.transport = this.injectStub(qx.io.request.Xhr.prototype, "_createTransport");
      this.setUpRequest();
    },

    setUpFakeXhr: function () {
      // Not fake transport
      this.getSandbox().restore();
      this.useFakeXMLHttpRequest();
      this.setUpRequest();
    },

    /**
     * Sets up the fake server and instructs it to send the given response(s)
     * @param {String|Array} messages One (string) or more (Array) messages
     */
    setUpFakeServer: function (messages) {
      if (qx.lang.Type.isString(messages)) {
        messages = [messages];
      }
      this.assertArray(messages);
      // Not fake transport
      this.getSandbox().restore();
      this.useFakeServer();
      this.setUpRequest();
      this.server = this.getServer();

      messages.forEach(message => this.server.respondWith(
        "POST", /.*/,
        [200, {"Content-Type": "application/json; charset=utf-8"}, JSON.stringify(message)]
      ));
    },

    /**
     * Asserts that given a message, the correct json data is sent out.
     * This test relies on {@link qx.test.io.jsonrpc.protocols} to check that
     * the expected data is correctly produced by the "toObject()" method.
     * @param message
     * @return {Promise<void>}
     */
    assertSendCreatesValidRequest: async function (message) {
      this.assertInstance(message, qx.io.jsonrpc.protocol.Message);
      this.setUpFakeXhr();
      const transport = new qx.io.jsonrpc.transport.Http("jsonrpc");
      this.stub(transport);
      await transport.send(message);
      var expected = message.toObject();
      this.assertCalledWith(this.transport.send, expected);
    },

    /**
     * Asserts that if the server responds with the given result, it is correctly
     * passed to the handlers
     * @param {*} result
     */
    assertJsonRpcResult: function (result) {
      this.assertInstance(message_out, qx.io.jsonrpc.protocol.Message);
      let message_out = new qx.io.jsonrpc.protocol.Request("foo", ["bar"]);
      let message_in  = new qx.io.jsonrpc.protocol.Result(message_out.getId(), result);
      this.setUpFakeServer(message_in.toString());
      const transport = new qx.io.jsonrpc.transport.Http("jsonrpc");
      this.stub(transport);
      this.stub(message_out);
      transport.send(message_out);
      this.wait(100, () => {
        if (message_out instanceof qx.io.jsonrpc.protocol.Request) {
          this.assertCalledWith(transport.handleMessage, this.sinon.match(value => sinon.assertDeepEqual(message_in.toObject(), value.toObject()), `Expected '${message_in.toString()}, got '${value.toString()}'`));
          this.assertCalledWith(message_out.then, result);
        }
      });
    },

    /**
     * Assert that the given exception is thrown on receiving the given result
     * @param {qx.io.jsonrpc.protocol.Message} message_out
     * @param {String} response
     * @param {qx.io.Exception} exceptionClass The exception class, not an instance
     */
    assertExceptionThrown: function (message_out, response, exceptionClass) {
      this.assertInstance(message_out, qx.io.jsonrpc.protocol.Message);
      this.setUpFakeServer(response);
      const transport = new qx.io.jsonrpc.transport.Http("jsonrpc");
      var errorCallback = this.spy(err => this.assertInstance(err, exceptionClass));
      // check message promise
      message_out.catch(errorCallback);
      // check event
      transport.addListener("error", errorCallback);
      // check transport promise
      transport.send(message_out).catch(errorCallback);
      this.wait(100, () => this.assertCalledCount(errorCallback, 3));
    },

    tearDown: function () {
      this.getSandbox().restore();
      this.req.dispose();
    },

    //
    // Auth, should be moved into qx.test.io.request.Xhr
    //

    "test: Bearer authentication": function () {
      this.setUpFakeTransport();

      var transport = this.transport, auth, call, key, credentials;

      auth = new qx.io.request.authentication.Bearer("TOKEN");
      this.req.setAuthentication(auth);
      this.req.send();

      call = transport.setRequestHeader.getCall(1);
      key = "Authorization";
      credentials = /Bearer\s(.*)/.exec(call.args[1])[1];
      this.assertEquals(key, call.args[0]);
      this.assertEquals("TOKEN", credentials);
    },

    //
    // JSON-RPC
    //

    "test: call jsonrpc method with positional parameters" : function() {
      this.assertSendCreatesValidRequest(new qx.io.jsonrpc.protocol.Request("subtract", [42, 23]));
    },

    "test: call jsonrpc method with named parameters" : function() {
      this.assertSendCreatesValidRequest(new qx.io.jsonrpc.protocol.Request("subtract", {"minuend": 42, "subtrahend": 23}));
    },

    "test: send notification" : function() {
      this.assertSendCreatesValidRequest(new qx.io.jsonrpc.protocol.Notification("logout"));
    },

    "test: send notification and throw on response" : function() {
      qx.io.remote.Rpc.reset();
      var response = qx.lang.Json.stringify({"jsonrpc": "2.0", "result": 19, "id": 1});
      this.assertResponseThrowsException("logout", [], true, response, {
        send: qx.io.remote.exception.Transport
      });
    },

    "test: call jsonrpc method and validate reponse" : function() {
      qx.io.remote.Rpc.reset();
      var response = qx.lang.Json.stringify({"jsonrpc": "2.0", "result": 19, "id": 1});
      this.assertResponseIs("subtract", [42, 23], response);
    },

    "test: call jsonrpc method and expect error on invalid reponse - not array or object" : function() {
      qx.io.remote.Rpc.reset();
      var response = qx.lang.Json.stringify("foo");
      this.assertResponseThrowsException("doStuff", [], false, response, {
        send: qx.io.remote.exception.Transport
      });
    },

    "test: call jsonrpc method and expect error on invalid reponse - missing result" : function() {
      qx.io.remote.Rpc.reset();
      var response = qx.lang.Json.stringify({"jsonrpc": "2.0", "id": 1});
      this.assertResponseThrowsException("doStuff", [], false, response, {
        request: qx.io.remote.exception.Transport
      });
    },

    "test: call jsonrpc method and expect error on invalid reponse - unknown id" : function() {
      qx.io.remote.Rpc.reset();
      var response = qx.lang.Json.stringify({"jsonrpc": "2.0", result: "foo", "id": 5});
      this.assertResponseThrowsException("doStuff", [], false, response, {
        send: qx.io.remote.exception.Transport
      });
    },

    "test: call jsonrpc method and expect error response" : function() {
      qx.io.remote.Rpc.reset();
      var response = qx.lang.Json.stringify({"jsonrpc": "2.0", "error" : {"code": -32600, "message": "Division by zero!"}, "id": 1});
      this.assertResponseThrowsException("divide", [42, 0], false, response, {
        request: qx.io.remote.exception.JsonRpc
      });
    },

    "test: send batched requests" : function() {
      qx.io.remote.Rpc.reset();
      var response = qx.lang.Json.stringify([
        {"jsonrpc": "2.0", "result": 7, "id": 1},
        {"jsonrpc": "2.0", "result": "foo", "id": 2},
        {"jsonrpc": "2.0", "error": {"code": -32600, "message": "Invalid Request"}, "id": 3},
        {"jsonrpc": "2.0", "error": {"code": -32601, "message": "Method not found"}, "id": 4},
        {"jsonrpc": "2.0", "result": ["hello", 5], "id": 5}]);
      this.setUpFakeServer(response);
      var client = new qx.io.remote.Rpc("jsonrpc");
      var spies = [];
      for( var i=1; i < 6; i++) {
        spies[i] = { result: this.spy(), error: this.spy() };
        client.addRequest("someMethod", [])
          .then(spies[i].result)
          .catch(spies[i].error);
      }
      client.send();
      this.getServer().respond();
      this.wait(100, function(){
        this.assertCalledWith(spies[1].result, 7);
        this.assertCalledWith(spies[2].result, "foo");
        this.assertCalled(spies[3].error);
        this.assertCalled(spies[4].error);
        this.assertCalledWith(spies[5].result, ["hello", 5]);
      },this);
    },

    "test: receive jsonrpc requests from server" : function() {
      qx.io.remote.Rpc.reset();
      var response = [
        {"jsonrpc": "2.0", "method": "clientMethod", "params": ["foo", "bar"], "id": 1},
        {"jsonrpc": "2.0", "method": "clientNotification", "params": []}
      ];
      this.setUpFakeServer(qx.lang.Json.stringify(response));
      var client = new qx.io.remote.Rpc("jsonrpc");
      var spy = this.spy();
      client.addListener("request", function(evt){
        spy(evt.getData());
      });
      client.sendNotification("ping");
      this.getServer().respond();
      this.wait(100, function(){
        this.assertCalledTwice(spy);
        //this.assertCalledWith(spy.firstCall, response[1]); // recursion error
        //this.assertCalledWith(spy.secondCall, response[2]); // recursion error
      },this);
    }
  }
});
