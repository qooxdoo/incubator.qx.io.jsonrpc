/**
 * This namespace contains an interface for and different implementations of
 * a transport for jsonrpc data.
 *
 * {@link qx.io.jsonrpc.transport.ITransport} specifies that a transport has to
 * provide for three things: 1) it must have an "endpoint" property which identifies
 * where the json-rpc peer server is located, 2) it must have a "send" method
 * which takes an UTF-8 encoded message string and passes it to the endpoint and 3) it must
 * fire a "message" event when it receives such a message from the peer.
 */
