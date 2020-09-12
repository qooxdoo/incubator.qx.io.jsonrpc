/**
 * <p>This namespace contains an interface for and different implementations of
 * a transport for higher-level protocol data.</p>
 *
 * <p>{@link qx.io.transport.ITransport} specifies that a
 * transport has to provide for three things:</p>
 * <ol>
 *   <li>It must have an "endpoint" property of type string which identifies where
 *      the server is located</li>
 *   <li>It must have a "send" method which knows how to deliver an UTF-8
 *      encoded message string to the endpoint, and</li>
 *   <li>It must fire a "message" event when it receives such a message from
 *      the peer, regardless if this message is a normal "response" (like in a
 *      HTTP request) or an incoming message in a duplex communication channel.</li>
 * </ol>
 */
