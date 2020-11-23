# Qooxdoo transport-agnostic high-level I/O APIs (JSON-RPC, GraphQl) 

![Build and Deploy](https://github.com/qooxdoo/incubator.qx.io.jsonrpc/workflows/Build%20and%20Deploy/badge.svg)

This incubator contains a proposal to add a framework for transport-agnostic 
higher-level i/o protocols to the `qx.io` namespace. 

Status: Stable (v2.0.0, see [release notes](#release-notes) for breaking changes).

- API: http://www.qooxdoo.org/incubator.qx.io.jsonrpc/apiviewer/#qx.io
- Test runner: http://www.qooxdoo.org/incubator.qx.io.jsonrpc/

It is called incubator.qx.io.jsonrpc because v1.0 implemented this protocol only.

## Installation for use in your project

```bash
npx qx package install qooxdoo/incubator.qx.io.jsonrpc
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

### Transport layer

The APIs in this incubator abstract the transport layer in a way
that it can support any transport that can send and receive a
UTF-8 encoded strings over the network no matter whether this is
implemented in a request/response style (such as HTTP) or a fully
duplex communication channel such as WebSockets or the [PostMessage
API](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage) (TBD).
Any transport must implement `qx.io.transport.ITransport`. For more information,
see https://qooxdoo.org/incubator.qx.io.jsonrpc/apiviewer/#qx.io.transport

This transport layer is used by implementations of the JSON-RPC and GraphQL 
protocols. 

#### Selecting a transport

All protocols that use the transport layer need to select the transport manually.
The easiest way to do this is to use a compiler hint in the docblock of your
application class or any class that uses JSON-RPC. For the http transport which 
uses XHR, this would be 

```javascript
/**
 * @use(qx.io.transport.Xhr)
 */
qx.Class.define("...
```

This way, this transport will be used for any HTTP(S)-URL. Alternatively,
you can also select a transport for each client instance individually.

### JSON-RPC

The `qx.io.jsonrpc` namespace provides an API implementing
the [JSON Remote Procedure Call (JSON-RPC) version 2
specification](https://www.jsonrpc.org/specification).

#### Outgoing requests

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

#### Request promises

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

#### Incoming requests

The client also supports *incoming* requests as part of the server
response. To receive them, register a listener for the `incomingRequest`
event. For the HTTP transport, notifications can be sent by the server
as part of the response to client requests. Once a WebSocket transport
has been added, the duplex JSON-RPC traffic can be implemented this way.

### Customizing the transport / Authentication

The high-level Client API does not (yet) handle transport-specific issues like
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
from `qx.io.transport.Http` and overrides
`qx.io.transport.Http#_createTransportImpl`. To make
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

### GraphQL

The GraphQL implementation is still under construction, docs will be added. 

Example:

```javascript
    let client = new qx.io.graphql.Client("https://countries-274616.ew.r.appspot.com/");
    let query = `query($country:String!) {
       Country(name: $country) {
         nativeName
         officialLanguages { name }
       }
     }`;
    let request = new qx.io.graphql.protocol.Request();
    request.setQuery(query);
    request.setVariables({country:"Belgium"});
    let response = await client.send(request);
```

## Release notes

### v2.0.0

- The exception and transport APIs have been abstracted so that 
they can be used in other protocols.

- Adds a GraphQl implementation in the `qx.io.graphql` namespace
based on these APIs (See the documentation in the API Viewer).

**Breaking changes**: 
 
- `qx.io.jsonrpc.exception` has been moved to `qx.io.exception`
and generalized, i.e. `qx.io.jsonrpc.exception.JsonRpc` has been
renamed to `qx.io.exception.Protocol`. 

- The same applies to the `qx.io.jsonrpc.transport`
namespace, which has been moved to `qx.io.transport`. `qx.io.jsonrpc.transport.Http`
has been renamed `qx.io.transport.Xhr`.

### v1.0.0

Initial release, featuring a JSONRPC implementation.
