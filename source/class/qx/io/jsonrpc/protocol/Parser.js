/**
 * The parser object has a parse() method, which takes a UTF-encoded string and
 * returns the correponding subclass of {@link qx.io.jsonrpc.protocol.Message}
 */
qx.Class.define("qx.io.jsonrpc.protocol.Parser", {
  extend: qx.core.Object,
  members: {
    /**
     * Given an UTF-8 encoded string, return the corresponding message object,
     * which is one of {@link qx.io.jsonrpc.protocol.Batch}, {@link qx.io.jsonrpc.protocol.Notification},
     * {@link qx.io.jsonrpc.protocol.Request}, {@link qx.io.jsonrpc.protocol.Result}, or
     * {@link qx.io.jsonrpc.protocol.Error}.
     *
     * @param {String} message
     * @return {qx.io.jsonrpc.protocol.Message}
     * @throws {qx.io.jsonrpc.exception.Transport}
     */
    parse(message) {
      try {
        message = JSON.parse(message);
      } catch (e) {
        throw new qx.io.jsonrpc.exception.Transport(
          e.toString(),
          qx.io.jsonrpc.exception.Transport.INVALID_JSON,
          {message}
        );
      }
      if (message === null) {
        throw new qx.io.jsonrpc.exception.Transport(
          "No data",
          qx.io.jsonrpc.exception.Transport.NO_DATA
        );
      }
      // batch
      if (qx.lang.Type.isArray(message)) {
        const batch = new qx.io.jsonrpc.protocol.Batch();
        message.forEach(item => batch.add(this.parse(JSON.stringify(item))));
        return batch;
      }
      // individual message
      let {id, result, method, params, error} = message;
      if (id !== undefined && result !== undefined && error === undefined && method === undefined) {
        return new qx.io.jsonrpc.protocol.Result(id, result);
      }
      if (id !== undefined && result === undefined && error !== undefined && method === undefined) {
        return new qx.io.jsonrpc.protocol.Error(id, error.code, error.message, error.data);
      }
      if (id !== undefined && result === undefined && error === undefined && method !== undefined) {
        return new qx.io.jsonrpc.protocol.Request(method, params, id);
      }
      if (id === undefined && result === undefined && error === undefined && method !== undefined) {
        return new qx.io.jsonrpc.protocol.Notification(method, params);
      }
      throw new qx.io.jsonrpc.exception.Transport(
        "Cannot parse message data.",
        qx.io.jsonrpc.exception.Transport.INVALID_MSG_DATA,
        {message}
      );
    }
  }
});