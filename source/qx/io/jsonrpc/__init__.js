/**
 * This namespace provides a JSON Remote Procedure Call (JSON-RPC) version 2 API .
 * See https://www.jsonrpc.org/specification
 *
 * JSON-RPC v2 is transport-agnostic. We provide an API interface
 * and an HTTP transport implementatio. Other transports
 * based on websockets or other mechanisms can be added later.
 *
 * There are two ways of working with this API.
 *
 * 1) Using the transport objects
 *
 * You can either work with the transports directly. For example, you can send
 * out requests, notifications, and batches like so:
 *
 * <pre>
 *   (async()=>{
 *    const transport = new qx.io.jsonrpc.transport.Http("https://domain.com/endpoint");
 *    const request = new qx.io.jsonrpc.message.Request("some_method", ["first-param","second-param"]);
 *    const notification = new qx.io.jsonrpc.message.Notification("other_method", [1,2,3]);
 *    let result;
 *    try {
 *      transport.send(request);
 *      transport.send(notifiation);
 *      result = await request.getPromise();
 *    } catch(e) {
 *      // handle exceptions
 *    }
 *   })();
 * </pre>
 *
 * or using a batch, like so:
 *
 * <pre>
 *   (async()=>{
 *    const transport = new qx.io.jsonrpc.transport.Http("https://domain.com/endpoint");
 *    const batch = ()new qx.io.jsonrpc.message.Batch())
 *      .addRequest("method3")
 *      .addNotification("method4")
 *      .addRequest("method5","foo)
 *      .addRequest("method6", [{foo:"bar"}]);
 *    let results;
 *    try {
 *      transport.send(batch);
 *      results = await qx.Promise.all(batch.getPromises());
 *      // results will be an array with three items, the result of the requests
 *    } catch(e) {
 *      // handle exceptions
 *    }
 *   })();
 * </pre>
 *
 * 2) Using qx.io.jsonrpc.Client
 *
 * qx.io.jsonrpc.Client is an API built on top of the transports. It will figure
 * out the type of transport from the URI passed to it, and provides a way to
 * prepend a "service name" to all the method names. This makes working with
 * a JSON-RPC service a bit more convenient, but is also less configurable, unless
 * you subclass the client and use a custom configuration behind the scenes.
 *
 * Here is an example
 *
 * <pre>
 *   (async()=>{
 *    const client = new qx.io.jsonrpc.Client("https://domain.com/endpoint", "myServiceName");
 *    let result;
 *    try {
 *      client.sendNotification("other_method", [1,2,3]);
 *      result = await client.sendRequest("other_method", [1,2,3]);
 *    } catch(e) {
 *      // handle exceptions
 *    }
 *   })();
 * </pre>
 *
 * or using a batch:
 *
 * <pre>
 *   (async()=>{
 *    const client = new qx.io.jsonrpc.Client("https://domain.com/endpoint", "myServiceName");
 *    const batch = new qx.io.jsonrpc.message.Batch())
 *      .addRequest("method3")
 *      .addNotification("method4")
 *      .addRequest("method5","foo)
 *      .addRequest("method6", [{foo:"bar"}]);
 *    let results;
 *    try {
 *      results = await client.sendBatch(batch);
 *      // results will be an array with three items, the result of the requests
 *    } catch(e) {
 *      // handle exceptions
 *    }
 *   })();
 * </pre>
 *
 */
