/**
 * <p>This namespace provides an API implementing the <a
 * href="https://www.jsonrpc.org/specification">JSON Remote
 * Procedure Call (JSON-RPC) version 2 specification</a></p>
 *
 * <p>JSON-RPC v2 is transport-agnostic. We provide a high-level
 * API interface (qx.io.jsonrpc.Client), a transport interface
 * (qx.io.jsonrpc.transport.ITransport) and an HTTP transport implementation.
 * Other transports based on websockets or other mechanisms can be added later.</p>
 *
 * Here is an example:
 *
 * <pre class="javascript">
 * (async()=>{
 *   const client = new qx.io.jsonrpc.Client("https://domain.com/endpoint");
 *   let result;
 *   try {
 *     client.sendNotification("other_method", [1,2,3]); // notifications are "fire & forget"
 *     result = await client.sendRequest("other_method", [1,2,3]);
 *   } catch(e) {
 *     // handle exceptions
 *   }
 * })();
 * </pre>
 *
 * or using a batch:
 *
 * <pre class="javascript">
 * (async()=>{
 *   const client = new qx.io.jsonrpc.Client("https://domain.com/endpoint");
 *   const batch = new qx.io.jsonrpc.protocol.Batch()
 *     .add(new qx.io.jsonrpc.protocol.Request("method3", [1,2,3]))
 *     .addNotification("method4") // or shorthand method
 *     .addRequest("method5",["foo", "bar"]) // positional parameters
 *     .addRequest("method6", {foo:"bar"}); // named parameters
 *   let results;
 *   try {
 *     results = await client.sendBatch(batch);
 *     // results will be an array with three items, the result of the requests
 *   } catch(e) {
 *     // handle exceptions
 *   }
 * })();
 * </pre>
 *
 * The high-level Client API does not handle transport-specific issues like
 * authentication - this needs to be done in the transport layer. For example,
 * to use HTTP Bearer authentication, do this:
 *
 * <pre class="javascript">
 * const client = new qx.io.jsonrpc.Client("https://domain.com/endpoint");
 * client.addListener("outgoingRequest", () => {
 *   const auth = new qx.io.request.authentication.Bearer("TOKEN");
 *   client.getTransport().getTransportImpl().setAuthentication(auth);
 * });
 * client.sendRequest("method-needing-authentication", [1,2,3]);
 * </pre>
 *
 * Instead, you can also to create a class that inherits from
 * {@link qx.io.jsonrpc.transport.Http} and overrides  {@link
 * qx.io.jsonrpc.transport.Http#_createTransportImpl}. To make
 * the client use this transport, and provide a `defer` section
 * which registers the behavior for your particular class of URIs:
 *
 * <pre class="javascript">
 * defer() {
 *   qx.io.jsonrpc.Client.registerTransport(/^http/, my.custom.Transport);
 * }
 * </pre>
 *
 * The client will always use the transport that was last registered for
 * a certain endpoint pattern, i.e. from then on, all clients created
 * with urls that start with "http" will use that custom behavior.
 *
 * <p>Incoming requests</p>
 * The client also supports *incoming* requests as part of the server
 * response. To receive them, register a listener for the `incomingRequest`
 * event. For the HTTP transport, notifications can be sent by the server
 * as part of the response to client requests. Once a WebSocket transport
 * has been added, the duplex JSON-RPC traffic can be implemented this way.
 *
 */
