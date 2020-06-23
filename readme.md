# Qooxdoo JSON-RPC API Incubator

![Build and Deploy](https://github.com/qooxdoo/incubator.qx.io.jsonrpc/workflows/Build%20and%20Deploy/badge.svg)

This incubator contains a proposal to add an extensible JSON-RPC v2 API 
to qooxdoo.

Development status: beta. The API should be fairly stable.

- API: http://www.qooxdoo.org/incubator.qx.io.jsonrpc/apiviewer/#qx.io.jsonrpc
- Test runner: http://www.qooxdoo.org/incubator.qx.io.jsonrpc/

## Installation for use in your project

```bash
npx qx install qooxdoo/incubator.qx.io.jsonrpc
```

## Installation & testing (development)

To run this incubator project as a standalone application
(for development purposes), execute the following steps

```bash
git clone https://github.com/qooxdoo/incubator.qx.io.jsonrpc.git
cd incubator.qx.io.jsonrpc/
npm install --no-save --no-package-lock @qooxdoo/compiler
npx qx package install
npx qx test
```

To update the dependencies, run

```bash
npm install --no-save --no-package-lock @qooxdoo/compiler
npx qx package install qooxdoo/qxl.testtapper --save=0
npx qx package install qooxdoo/qxl.apiviewer --save=0
```

## Usage

This namespace provides an API implementing the [JSON Remote Procedure Call
(JSON-RPC) version 2 specification](https://www.jsonrpc.org/specification).

JSON-RPC v2 is transport-agnostic. We provide a high-level
API interface (qx.io.jsonrpc.Client), a transport interface
(qx.io.jsonrpc.transport.ITransport) and an HTTP transport implementation.
Other transports based on websockets or other mechanisms can be added later.

### Outgoing requests

Here is an example for making a JSON-RPC request to a server endpoint: 

```javascript
(async()=>{
  const client = new qx.io.jsonrpc.Client("https://domain.com/endpoint");
  let result;
  try {
    client.sendNotification("some-method", [1,2,3]); // notifications are "fire & forget"
    result = await client.sendRequest("other-method", [1,2,3]);
  } catch(e) {
    // handle exceptions
  }
})();
```

or using a batch:

```javascript
(async()=>{
  const client = new qx.io.jsonrpc.Client("https://domain.com/endpoint");
  const batch = new qx.io.jsonrpc.protocol.Batch()
    .add(new qx.io.jsonrpc.protocol.Request("method3", [1,2,3]))
    .addNotification("method4") // or shorthand method
    .addRequest("method5",["foo", "bar"]) // positional parameters
    .addRequest("method6", {foo:"bar"}); // named parameters
  let results;
  try {
    results = await client.sendBatch(batch);
    // results will be an array with three items, the result of the requests
  } catch(e) {
    // handle exceptions
  }
})();
```

### Request promises

It is possible to resolve the promises of batched JSON-RPC requests individually,
i.e., the promises can be passed to other parts of the code to be `await`ed 
there. This works only with `qx.io.jsonrpc.protocol.Request`.

```javascript
async function doSomethingWithPromise(promise) {
  let result;
  try {
    result = await promise;
  } catch (e) {
    // handle error  
  }
  // do something with the result
}
(async () => {
  const client = new qx.io.jsonrpc.Client("https://domain.com/endpoint");
  const batch = new qx.io.jsonrpc.protocol.Batch();
  const request1 = new qx.io.jsonrpc.protocol.Request("some-method", [1,2,3]);
  const request2 = new qx.io.jsonrpc.protocol.Request("other-method", ["foo"]);
  batch.add(request1).add(request2);
  doSomethingWithPromise(request1.getPromise()); // no await here, the batch needs to be sent first
  doSomethingWithPromise(request2.getPromise());
  try {
    await client.sendBatch(batch);
  } catch(e) {
    // handle exceptions
  }
})();
``` 

### Customizing the transport / Authentication

The high-level Client API does not handle transport-specific issues like
authentication - this needs to be done in the transport layer. For example,
to use HTTP Bearer authentication, do this:

```javascript
const client = new qx.io.jsonrpc.Client("https://domain.com/endpoint");
client.addListener("outgoingRequest", () => {
  const auth = new qx.io.request.authentication.Bearer("TOKEN");
  client.getTransport().getTransportImpl().setAuthentication(auth);  
});
client.sendRequest("method-needing-authentication", [1,2,3]);
```

Instead, you can also to create a class that inherits
from `qx.io.jsonrpc.transport.Http` and overrides
`qx.io.jsonrpc.transport.Http#_createTransportImpl`. To make
the client use this transport, provide a `defer` section
which registers the behavior for your particular class of URIs:

```javascript 
  defer() {
    qx.io.jsonrpc.Client.registerTransport(/^http/, my.custom.Transport); 
  } 
```

`qx.io.jsonrpc.Client` will always use the transport that was last
registered for a certain endpoint pattern, i.e. from then on, all clients
created with urls that start with "http" will use that custom behavior.

### Incoming requests

The client also supports *incoming* requests as part of the server
response. To receive them, register a listener for the `incomingRequest`
event. For the HTTP transport, notifications can be sent by the server
as part of the response to client requests. Once a WebSocket transport
has been added, the duplex JSON-RPC traffic can be implemented this way.
