(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.io.remote.transport.Iframe": {},
      "qx.io.remote.transport.Script": {},
      "qx.core.Environment": {
        "defer": "load",
        "require": true
      },
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.core.Object": {
        "construct": true,
        "require": true
      },
      "qx.core.IDisposable": {
        "require": true
      },
      "qx.lang.Object": {},
      "qx.log.Logger": {},
      "qx.io.remote.transport.XmlHttp": {},
      "qx.event.Registration": {},
      "qx.io.remote.Response": {}
    },
    "environment": {
      "provided": [],
      "required": {
        "qx.debug.io.remote": {}
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2004-2008 1&1 Internet AG, Germany, http://www.1und1.de
       2006 Derrell Lipman
       2006 STZ-IDA, Germany, http://www.stz-ida.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Sebastian Werner (wpbasti)
       * Andreas Ecker (ecker)
       * Derrell Lipman (derrell)
       * Andreas Junghans (lucidcake)
  
  ************************************************************************ */

  /**
   * Transport layer to control which transport class (XmlHttp, Iframe or Script)
   * can be used.
   *
   * NOTE: Instances of this class must be disposed of after use
   *
   * @use(qx.io.remote.transport.Iframe)
   * @use(qx.io.remote.transport.Script)
   * @internal
   */
  qx.Class.define("qx.io.remote.Exchange", {
    extend: qx.core.Object,
    implement: [qx.core.IDisposable],

    /*
    *****************************************************************************
       CONSTRUCTOR
    *****************************************************************************
    */

    /**
     * Constructor method.
     *
     * @param vRequest {qx.io.remote.Request} request object
     */
    construct: function construct(vRequest) {
      qx.core.Object.constructor.call(this);
      this.setRequest(vRequest);
      vRequest.setTransport(this);
    },

    /*
    *****************************************************************************
       EVENTS
    *****************************************************************************
    */
    events: {
      /** Fired whenever a request is send */
      "sending": "qx.event.type.Event",

      /** Fired whenever a request is received */
      "receiving": "qx.event.type.Event",

      /** Fired whenever a request is completed */
      "completed": "qx.io.remote.Response",

      /** Fired whenever a request is aborted */
      "aborted": "qx.event.type.Event",

      /** Fired whenever a request has failed */
      "failed": "qx.io.remote.Response",

      /** Fired whenever a request has timed out */
      "timeout": "qx.io.remote.Response"
    },

    /*
    *****************************************************************************
       STATICS
    *****************************************************************************
    */
    statics: {
      /* ************************************************************************
         Class data, properties and methods
      ************************************************************************ */

      /*
      ---------------------------------------------------------------------------
        TRANSPORT TYPE HANDLING
      ---------------------------------------------------------------------------
      */

      /**
       * Predefined order of types.
       *
       * @internal
       */
      typesOrder: ["qx.io.remote.transport.XmlHttp", "qx.io.remote.transport.Iframe", "qx.io.remote.transport.Script"],

      /**
       * Marker for initialized types.
       *
       * @internal
       */
      typesReady: false,

      /**
       * Map of all available types.
       *
       * @internal
       */
      typesAvailable: {},

      /**
       * Map of all supported types.
       *
       * @internal
       */
      typesSupported: {},

      /**
       * Registers a transport type.
       * At the moment one out of XmlHttp, Iframe or Script.
       *
       * @param vClass {Object} transport class
       * @param vId {String} unique id
       */
      registerType: function registerType(vClass, vId) {
        qx.io.remote.Exchange.typesAvailable[vId] = vClass;
      },

      /**
       * Initializes the available type of transport classes and
       * checks for the supported ones.
       *
       * @throws {Error} an error if no supported transport type is available
       */
      initTypes: function initTypes() {
        if (qx.io.remote.Exchange.typesReady) {
          return;
        }

        for (var vId in qx.io.remote.Exchange.typesAvailable) {
          var vTransporterImpl = qx.io.remote.Exchange.typesAvailable[vId];

          if (vTransporterImpl.isSupported()) {
            qx.io.remote.Exchange.typesSupported[vId] = vTransporterImpl;
          }
        }

        qx.io.remote.Exchange.typesReady = true;

        if (qx.lang.Object.isEmpty(qx.io.remote.Exchange.typesSupported)) {
          throw new Error("No supported transport types were found!");
        }
      },

      /**
       * Checks which supported transport class can handle the request with the
       * given content type.
       *
       * @param vImpl {Object} transport implementation
       * @param vNeeds {Map} requirements for the request like e.g. "cross-domain"
       * @param vResponseType {String} content type
       * @return {Boolean} <code>true</code> if the transport implementation supports
       * the request's requirements
       */
      canHandle: function canHandle(vImpl, vNeeds, vResponseType) {
        if (!vImpl.handles.responseTypes.includes(vResponseType)) {
          return false;
        }

        for (var vKey in vNeeds) {
          if (!vImpl.handles[vKey]) {
            return false;
          }
        }

        return true;
      },

      /*
      ---------------------------------------------------------------------------
        MAPPING
      ---------------------------------------------------------------------------
      */

      /**
       * http://msdn.microsoft.com/en-us/library/ie/ms534359%28v=vs.85%29.aspx
       *
       * 0: UNINITIALIZED
       * The object has been created, but not initialized (the open method has not been called).
       *
       * 1: LOADING
       * The object has been created, but the send method has not been called.
       *
       * 2: LOADED
       * The send method has been called, but the status and headers are not yet available.
       *
       * 3: INTERACTIVE
       * Some data has been received. Calling the responseBody and responseText properties at this state to obtain partial results will return an error, because status and response headers are not fully available.
       *
       * 4: COMPLETED
       * All the data has been received, and the complete data is available in the
       *
       * @internal
       */
      _nativeMap: {
        0: "created",
        1: "configured",
        2: "sending",
        3: "receiving",
        4: "completed"
      },

      /*
      ---------------------------------------------------------------------------
        UTILS
      ---------------------------------------------------------------------------
      */

      /**
       * Called from the transport class when a request was completed.
       *
       * @param vStatusCode {Integer} status code of the request
       * @param vReadyState {String} readystate of the request
       * @param vIsLocal {Boolean} whether the request is a local one
       * @return {Boolean | var} Returns boolean value depending on the status code
       */
      wasSuccessful: function wasSuccessful(vStatusCode, vReadyState, vIsLocal) {
        if (vIsLocal) {
          switch (vStatusCode) {
            case null:
            case 0:
              return true;

            case -1:
              // Not Available (OK for readystates: MSXML<4=1-3, MSXML>3=1-2, Gecko=1)
              return vReadyState < 4;

            default:
              // at least older versions of Safari don't set the status code for local file access
              return typeof vStatusCode === "undefined";
          }
        } else {
          switch (vStatusCode) {
            case -1:
              // Not Available (OK for readystates: MSXML<4=1-3, MSXML>3=1-2, Gecko=1)
              {
                if (qx.core.Environment.get("qx.debug.io.remote") && vReadyState > 3) {
                  qx.log.Logger.debug(this, "Failed with statuscode: -1 at readyState " + vReadyState);
                }
              }
              return vReadyState < 4;

            case 200: // OK

            case 304:
              // Not Modified
              return true;

            case 201: // Created

            case 202: // Accepted

            case 203: // Non-Authoritative Information

            case 204: // No Content

            case 205:
              // Reset Content
              return true;

            case 206:
              // Partial Content
              {
                if (qx.core.Environment.get("qx.debug.io.remote") && vReadyState === 4) {
                  qx.log.Logger.debug(this, "Failed with statuscode: 206 (Partial content while being complete!)");
                }
              }
              return vReadyState !== 4;

            case 300: // Multiple Choices

            case 301: // Moved Permanently

            case 302: // Moved Temporarily

            case 303: // See Other

            case 305: // Use Proxy

            case 400: // Bad Request

            case 401: // Unauthorized

            case 402: // Payment Required

            case 403: // Forbidden

            case 404: // Not Found

            case 405: // Method Not Allowed

            case 406: // Not Acceptable

            case 407: // Proxy Authentication Required

            case 408: // Request Time-Out

            case 409: // Conflict

            case 410: // Gone

            case 411: // Length Required

            case 412: // Precondition Failed

            case 413: // Request Entity Too Large

            case 414: // Request-URL Too Large

            case 415: // Unsupported Media Type

            case 500: // Server Error

            case 501: // Not Implemented

            case 502: // Bad Gateway

            case 503: // Out of Resources

            case 504: // Gateway Time-Out

            case 505:
              // HTTP Version not supported
              {
                if (qx.core.Environment.get("qx.debug.io.remote")) {
                  qx.log.Logger.debug(this, "Failed with typical HTTP statuscode: " + vStatusCode);
                }
              }
              return false;
            // The following case labels are wininet.dll error codes that may
            // be encountered.
            // Server timeout

            case 12002: // Internet Name Not Resolved

            case 12007: // 12029 to 12031 correspond to dropped connections.

            case 12029:
            case 12030:
            case 12031: // Connection closed by server.

            case 12152: // See above comments for variable status.

            case 13030:
              {
                if (qx.core.Environment.get("qx.debug.io.remote")) {
                  qx.log.Logger.debug(this, "Failed with MSHTML specific HTTP statuscode: " + vStatusCode);
                }
              }
              return false;

            default:
              // Handle all 20x status codes as OK as defined in the corresponding RFC
              // http://www.w3.org/Protocols/rfc2616/rfc2616.html
              if (vStatusCode > 206 && vStatusCode < 300) {
                return true;
              }

              qx.log.Logger.debug(this, "Unknown status code: " + vStatusCode + " (" + vReadyState + ")");
              return false;
          }
        }
      },

      /**
       * Status code to string conversion
       *
       * @param vStatusCode {Integer} request status code
       * @return {String} String presentation of status code
       */
      statusCodeToString: function statusCodeToString(vStatusCode) {
        switch (vStatusCode) {
          case -1:
            return "Not available";

          case 0:
            // Attempt to generate a potentially meaningful error.
            // Get the current URL
            var url = window.location.href; // Are we on a local page obtained via file: protocol?

            if (url.toLowerCase().startsWith("file:")) {
              // Yup. Can't issue remote requests from here.
              return "Unknown status code. Possibly due to application URL using 'file:' protocol?";
            } else {
              return "Unknown status code. Possibly due to a cross-domain request?";
            }

            break;

          case 200:
            return "Ok";

          case 304:
            return "Not modified";

          case 206:
            return "Partial content";

          case 204:
            return "No content";

          case 300:
            return "Multiple choices";

          case 301:
            return "Moved permanently";

          case 302:
            return "Moved temporarily";

          case 303:
            return "See other";

          case 305:
            return "Use proxy";

          case 400:
            return "Bad request";

          case 401:
            return "Unauthorized";

          case 402:
            return "Payment required";

          case 403:
            return "Forbidden";

          case 404:
            return "Not found";

          case 405:
            return "Method not allowed";

          case 406:
            return "Not acceptable";

          case 407:
            return "Proxy authentication required";

          case 408:
            return "Request time-out";

          case 409:
            return "Conflict";

          case 410:
            return "Gone";

          case 411:
            return "Length required";

          case 412:
            return "Precondition failed";

          case 413:
            return "Request entity too large";

          case 414:
            return "Request-URL too large";

          case 415:
            return "Unsupported media type";

          case 500:
            return "Server error";

          case 501:
            return "Not implemented";

          case 502:
            return "Bad gateway";

          case 503:
            return "Out of resources";

          case 504:
            return "Gateway time-out";

          case 505:
            return "HTTP version not supported";

          case 12002:
            return "Server timeout";

          case 12029:
            return "Connection dropped";

          case 12030:
            return "Connection dropped";

          case 12031:
            return "Connection dropped";

          case 12152:
            return "Connection closed by server";

          case 13030:
            return "MSHTML-specific HTTP status code";

          default:
            return "Unknown status code";
        }
      }
    },

    /*
    *****************************************************************************
       PROPERTIES
    *****************************************************************************
    */
    properties: {
      /** Set the request to send with this transport. */
      request: {
        check: "qx.io.remote.Request",
        nullable: true
      },

      /**
       * Set the implementation to use to send the request with.
       *
       *  The implementation should be a subclass of qx.io.remote.transport.Abstract and
       *  must implement all methods in the transport API.
       */
      implementation: {
        check: "qx.io.remote.transport.Abstract",
        nullable: true,
        apply: "_applyImplementation"
      },

      /** Current state of the transport layer. */
      state: {
        check: ["configured", "sending", "receiving", "completed", "aborted", "timeout", "failed"],
        init: "configured",
        event: "changeState",
        apply: "_applyState"
      }
    },

    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */
    members: {
      /*
      ---------------------------------------------------------------------------
        CORE METHODS
      ---------------------------------------------------------------------------
      */

      /**
       * Sends the request.
       *
       * @return {var | Boolean} Returns true if the request was sent.
       * @lint ignoreUnused(field)
       */
      send: function send() {
        var vRequest = this.getRequest();

        if (!vRequest) {
          return this.error("Please attach a request object first");
        }

        qx.io.remote.Exchange.initTypes();
        var vUsage = qx.io.remote.Exchange.typesOrder;
        var vSupported = qx.io.remote.Exchange.typesSupported; // Mapping settings to contenttype and needs to check later
        // if the selected transport implementation can handle
        // fulfill these requirements.

        var vResponseType = vRequest.getResponseType();
        var vNeeds = {};

        if (vRequest.getAsynchronous()) {
          vNeeds.asynchronous = true;
        } else {
          vNeeds.synchronous = true;
        }

        if (vRequest.getCrossDomain()) {
          vNeeds.crossDomain = true;
        }

        if (vRequest.getFileUpload()) {
          vNeeds.fileUpload = true;
        } // See if there are any programmatic form fields requested


        for (var field in vRequest.getFormFields()) {
          // There are.
          vNeeds.programmaticFormFields = true; // No need to search further

          break;
        }

        var vTransportImpl, vTransport;

        for (var i = 0, l = vUsage.length; i < l; i++) {
          vTransportImpl = vSupported[vUsage[i]];

          if (vTransportImpl) {
            if (!qx.io.remote.Exchange.canHandle(vTransportImpl, vNeeds, vResponseType)) {
              continue;
            }

            try {
              {
                if (qx.core.Environment.get("qx.debug.io.remote")) {
                  this.debug("Using implementation: " + vTransportImpl.classname);
                }
              }
              vTransport = new vTransportImpl();
              this.setImplementation(vTransport);
              vTransport.setUseBasicHttpAuth(vRequest.getUseBasicHttpAuth());
              vTransport.send();
              return true;
            } catch (ex) {
              this.error("Request handler throws error");
              this.error(ex);
              return false;
            }
          }
        }

        this.error("There is no transport implementation available to handle this request: " + vRequest);
      },

      /**
       * Force the transport into the aborted ("aborted")
       *  state.
       *
       */
      abort: function abort() {
        var vImplementation = this.getImplementation();

        if (vImplementation) {
          {
            if (qx.core.Environment.get("qx.debug.io.remote")) {
              this.debug("Abort: implementation " + vImplementation.toHashCode());
            }
          }
          vImplementation.abort();
        } else {
          {
            if (qx.core.Environment.get("qx.debug.io.remote")) {
              this.debug("Abort: forcing state to be aborted");
            }
          }
          this.setState("aborted");
        }
      },

      /**
       * Force the transport into the timeout state.
       *
       */
      timeout: function timeout() {
        var vImplementation = this.getImplementation();

        if (vImplementation) {
          var str = "";

          for (var key in vImplementation.getParameters()) {
            str += "&" + key + "=" + vImplementation.getParameters()[key];
          }

          this.warn("Timeout: implementation " + vImplementation.toHashCode() + ", " + vImplementation.getUrl() + " [" + vImplementation.getMethod() + "], " + str);
          vImplementation.timeout();
        } else {
          this.warn("Timeout: forcing state to timeout");
          this.setState("timeout");
        } // Disable future timeouts in case user handler blocks


        this.__disableRequestTimeout__P_164_0();
      },

      /*
      ---------------------------------------------------------------------------
        PRIVATES
      ---------------------------------------------------------------------------
      */

      /**
       * Disables the timer of the request to prevent that the timer is expiring
       * even if the user handler (e.g. "completed") was already called.
       *
       */
      __disableRequestTimeout__P_164_0: function __disableRequestTimeout__P_164_0() {
        var vRequest = this.getRequest();

        if (vRequest) {
          vRequest.setTimeout(0);
        }
      },

      /*
      ---------------------------------------------------------------------------
        EVENT HANDLER
      ---------------------------------------------------------------------------
      */

      /**
       * Event listener for "sending" event.
       *
       * @param e {qx.event.type.Event} event object
       */
      _onsending: function _onsending(e) {
        this.setState("sending");
      },

      /**
       * Event listener for "receiving" event.
       *
       * @param e {qx.event.type.Event} event object
       */
      _onreceiving: function _onreceiving(e) {
        this.setState("receiving");
      },

      /**
       * Event listener for "completed" event.
       *
       * @param e {qx.event.type.Event} event object
       */
      _oncompleted: function _oncompleted(e) {
        this.setState("completed");
      },

      /**
       * Event listener for "abort" event.
       *
       * @param e {qx.event.type.Event} event object
       */
      _onabort: function _onabort(e) {
        this.setState("aborted");
      },

      /**
       * Event listener for "failed" event.
       *
       * @param e {qx.event.type.Event} event object
       */
      _onfailed: function _onfailed(e) {
        this.setState("failed");
      },

      /**
       * Event listener for "timeout" event.
       *
       * @param e {qx.event.type.Event} event object
       */
      _ontimeout: function _ontimeout(e) {
        this.setState("timeout");
      },

      /*
      ---------------------------------------------------------------------------
        APPLY ROUTINES
      ---------------------------------------------------------------------------
      */

      /**
       * Apply method for the implementation property.
       *
       * @param value {var} Current value
       * @param old {var} Previous value
       */
      _applyImplementation: function _applyImplementation(value, old) {
        if (old) {
          old.removeListener("sending", this._onsending, this);
          old.removeListener("receiving", this._onreceiving, this);
          old.removeListener("completed", this._oncompleted, this);
          old.removeListener("aborted", this._onabort, this);
          old.removeListener("timeout", this._ontimeout, this);
          old.removeListener("failed", this._onfailed, this);
        }

        if (value) {
          var vRequest = this.getRequest();
          value.setUrl(vRequest.getUrl());
          value.setMethod(vRequest.getMethod());
          value.setAsynchronous(vRequest.getAsynchronous());
          value.setUsername(vRequest.getUsername());
          value.setPassword(vRequest.getPassword());
          value.setParameters(vRequest.getParameters(false));
          value.setFormFields(vRequest.getFormFields());
          value.setRequestHeaders(vRequest.getRequestHeaders()); // Set the parseJson property which is currently only supported for XmlHttp transport
          // (which is the only transport supporting JSON parsing so far).

          if (value instanceof qx.io.remote.transport.XmlHttp) {
            value.setParseJson(vRequest.getParseJson());
          }

          var data = vRequest.getData();

          if (data === null) {
            var vParameters = vRequest.getParameters(true);
            var vParametersList = [];

            for (var vId in vParameters) {
              var paramValue = vParameters[vId];

              if (paramValue instanceof Array) {
                for (var i = 0; i < paramValue.length; i++) {
                  vParametersList.push(encodeURIComponent(vId) + "=" + encodeURIComponent(paramValue[i]));
                }
              } else {
                vParametersList.push(encodeURIComponent(vId) + "=" + encodeURIComponent(paramValue));
              }
            }

            if (vParametersList.length > 0) {
              value.setData(vParametersList.join("&"));
            }
          } else {
            value.setData(data);
          }

          value.setResponseType(vRequest.getResponseType());
          value.addListener("sending", this._onsending, this);
          value.addListener("receiving", this._onreceiving, this);
          value.addListener("completed", this._oncompleted, this);
          value.addListener("aborted", this._onabort, this);
          value.addListener("timeout", this._ontimeout, this);
          value.addListener("failed", this._onfailed, this);
        }
      },

      /**
       * Apply method for the state property.
       *
       * @param value {var} Current value
       * @param old {var} Previous value
       */
      _applyState: function _applyState(value, old) {
        {
          if (qx.core.Environment.get("qx.debug.io.remote")) {
            this.debug("State: " + old + " => " + value);
          }
        }

        switch (value) {
          case "sending":
            this.fireEvent("sending");
            break;

          case "receiving":
            this.fireEvent("receiving");
            break;

          case "completed":
          case "aborted":
          case "timeout":
          case "failed":
            var vImpl = this.getImplementation();

            if (!vImpl) {
              // implementation has already been disposed
              break;
            } // Disable future timeouts in case user handler blocks


            this.__disableRequestTimeout__P_164_0();

            if (this.hasListener(value)) {
              var vResponse = qx.event.Registration.createEvent(value, qx.io.remote.Response);

              if (value == "completed") {
                var vContent = vImpl.getResponseContent();
                vResponse.setContent(vContent);
                /*
                 * Was there acceptable content?  This might occur, for example, if
                 * the web server was shut down unexpectedly and thus the connection
                 * closed with no data having been sent.
                 */

                if (vContent === null) {
                  // Nope.  Change COMPLETED to FAILED.
                  {
                    if (qx.core.Environment.get("qx.debug.io.remote")) {
                      this.debug("Altered State: " + value + " => failed");
                    }
                  }
                  value = "failed";
                }
              } else if (value == "failed") {
                vResponse.setContent(vImpl.getResponseContent());
              }

              vResponse.setStatusCode(vImpl.getStatusCode());
              vResponse.setResponseHeaders(vImpl.getResponseHeaders());
              this.dispatchEvent(vResponse);
            } // Disconnect and dispose implementation


            this.setImplementation(null);
            vImpl.dispose(); // Fire event to listeners
            //this.fireDataEvent(vEventType, vResponse);

            break;
        }
      }
    },

    /*
    *****************************************************************************
       ENVIRONMENT SETTINGS
    *****************************************************************************
    */
    environment: {
      "qx.debug.io.remote": false,
      "qx.debug.io.remote.data": false
    },

    /*
    *****************************************************************************
       DESTRUCTOR
    *****************************************************************************
    */
    destruct: function destruct() {
      var vImpl = this.getImplementation();

      if (vImpl) {
        this.setImplementation(null);
        vImpl.dispose();
      }

      this.setRequest(null);
    }
  });
  qx.io.remote.Exchange.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.core.Environment": {
        "defer": "load",
        "require": true
      },
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.core.Object": {
        "construct": true,
        "require": true
      }
    },
    "environment": {
      "provided": [],
      "required": {
        "qx.debug.io.remote": {}
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2004-2008 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Sebastian Werner (wpbasti)
       * Andreas Ecker (ecker)
  
  ************************************************************************ */

  /**
   * Abstract for all transport implementations
   */
  qx.Class.define("qx.io.remote.transport.Abstract", {
    type: "abstract",
    extend: qx.core.Object,

    /*
    *****************************************************************************
       CONSTRUCTOR
    *****************************************************************************
    */
    construct: function construct() {
      qx.core.Object.constructor.call(this);
      this.setRequestHeaders({});
      this.setParameters({});
      this.setFormFields({});
    },

    /*
    *****************************************************************************
       EVENTS
    *****************************************************************************
    */
    events: {
      /** Event when a request is created */
      "created": "qx.event.type.Event",

      /** Event when a request is configured */
      "configured": "qx.event.type.Event",

      /** Event when a request is send */
      "sending": "qx.event.type.Event",

      /** Event when a request is received */
      "receiving": "qx.event.type.Event",

      /** Event when a request is completed */
      "completed": "qx.event.type.Event",

      /** Event when a request is aborted */
      "aborted": "qx.event.type.Event",

      /** Event when a request has failed */
      "failed": "qx.event.type.Event",

      /** Event when a request has timed out */
      "timeout": "qx.event.type.Event"
    },

    /*
    *****************************************************************************
       PROPERTIES
    *****************************************************************************
    */
    properties: {
      /** Target url to issue the request to */
      url: {
        check: "String",
        nullable: true
      },

      /** Determines what type of request to issue */
      method: {
        check: "String",
        nullable: true,
        init: "GET"
      },

      /** Set the request to asynchronous */
      asynchronous: {
        check: "Boolean",
        nullable: true,
        init: true
      },

      /** Set the data to be sent via this request */
      data: {
        check: "String",
        nullable: true
      },

      /** Username to use for HTTP authentication */
      username: {
        check: "String",
        nullable: true
      },

      /** Password to use for HTTP authentication */
      password: {
        check: "String",
        nullable: true
      },

      /** The state of the current request */
      state: {
        check: ["created", "configured", "sending", "receiving", "completed", "aborted", "timeout", "failed"],
        init: "created",
        event: "changeState",
        apply: "_applyState"
      },

      /** Request headers */
      requestHeaders: {
        check: "Object",
        nullable: true
      },

      /** Request parameters to send. */
      parameters: {
        check: "Object",
        nullable: true
      },

      /** Request form fields to send. */
      formFields: {
        check: "Object",
        nullable: true
      },

      /** Response Type */
      responseType: {
        check: "String",
        nullable: true
      },

      /** Use Basic HTTP Authentication */
      useBasicHttpAuth: {
        check: "Boolean",
        nullable: true
      }
    },

    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */
    members: {
      /*
      ---------------------------------------------------------------------------
        USER METHODS
      ---------------------------------------------------------------------------
      */

      /**
       * Sending a request.
       *
       * This method is virtual and concrete subclasses are supposed to
       * implement it.
       *
       * @abstract
       * @throws {Error} the abstract function warning.
       */
      send: function send() {
        throw new Error("send is abstract");
      },

      /**
       * Force the transport into the aborted state ("aborted").
       *
       * Listeners of the "aborted" signal are notified about the event.
       *
       */
      abort: function abort() {
        {
          if (qx.core.Environment.get("qx.debug.io.remote")) {
            this.warn("Aborting...");
          }
        }
        this.setState("aborted");
      },

      /**
       * Force the transport into the timeout state ("timeout").
       *
       * Listeners of the "timeout" signal are notified about the event.
       *
       */
      timeout: function timeout() {
        {
          if (qx.core.Environment.get("qx.debug.io.remote")) {
            this.warn("Timeout...");
          }
        }
        this.setState("timeout");
      },

      /**
       * Force the transport into the failed state ("failed").
       *
       * Listeners of the "failed" signal are notified about the event.
       *
       */
      failed: function failed() {
        {
          if (qx.core.Environment.get("qx.debug.io.remote")) {
            this.warn("Failed...");
          }
        }
        this.setState("failed");
      },

      /*
      ---------------------------------------------------------------------------
        REQUEST HEADER SUPPORT
      ---------------------------------------------------------------------------
      */

      /**
       * Add a request header to this transports qx.io.remote.Request.
       *
       * This method is virtual and concrete subclasses are supposed to
       * implement it.
       *
       * @abstract
       * @param vLabel {String} Request header name
       * @param vValue {var} Value for the header
       * @throws {Error} the abstract function warning.
       */
      setRequestHeader: function setRequestHeader(vLabel, vValue) {
        throw new Error("setRequestHeader is abstract");
      },

      /*
      ---------------------------------------------------------------------------
        RESPONSE HEADER SUPPORT
      ---------------------------------------------------------------------------
      */

      /**
       * Returns the request header of the request.
       *
       * This method is virtual and concrete subclasses are supposed to
       * implement it.
       *
       * @abstract
       * @param vLabel {String} Response header name
       * @return {Object}
       * @throws {Error} the abstract function warning.
       */
      getResponseHeader: function getResponseHeader(vLabel) {
        throw new Error("getResponseHeader is abstract");
      },

      /**
       * Provides an hash of all response headers.
       *
       * This method is virtual and concrete subclasses are supposed to
       * implement it.
       *
       * @abstract
       * @return {Object}
       * @throws {Error} the abstract function warning.
       */
      getResponseHeaders: function getResponseHeaders() {
        throw new Error("getResponseHeaders is abstract");
      },

      /*
      ---------------------------------------------------------------------------
        STATUS SUPPORT
      ---------------------------------------------------------------------------
      */

      /**
       * Returns the current status code of the request if available or -1 if not.
       *
       * This method is virtual and concrete subclasses are supposed to
       * implement it.
       *
       * @abstract
       * @return {Integer}
       * @throws {Error} the abstract function warning.
       */
      getStatusCode: function getStatusCode() {
        throw new Error("getStatusCode is abstract");
      },

      /**
       * Provides the status text for the current request if available and null otherwise.
       *
       * This method is virtual and concrete subclasses are supposed to
       * implement it.
       *
       * @abstract
       * @return {String}
       * @throws {Error} the abstract function warning.
       */
      getStatusText: function getStatusText() {
        throw new Error("getStatusText is abstract");
      },

      /*
      ---------------------------------------------------------------------------
        RESPONSE DATA SUPPORT
      ---------------------------------------------------------------------------
      */

      /**
       * Provides the response text from the request when available and null otherwise.
       * By passing true as the "partial" parameter of this method, incomplete data will
       * be made available to the caller.
       *
       * This method is virtual and concrete subclasses are supposed to
       * implement it.
       *
       * @abstract
       * @return {String}
       * @throws {Error} the abstract function warning.
       */
      getResponseText: function getResponseText() {
        throw new Error("getResponseText is abstract");
      },

      /**
       * Provides the XML provided by the response if any and null otherwise.
       * By passing true as the "partial" parameter of this method, incomplete data will
       * be made available to the caller.
       *
       * This method is virtual and concrete subclasses are supposed to
       * implement it.
       *
       * @abstract
       * @return {Object}
       * @throws {Error} the abstract function warning.
       */
      getResponseXml: function getResponseXml() {
        throw new Error("getResponseXml is abstract");
      },

      /**
       * Returns the length of the content as fetched thus far.
       *
       * This method is virtual and concrete subclasses are supposed to
       * implement it.
       *
       * @abstract
       * @return {Integer}
       * @throws {Error} the abstract function warning.
       */
      getFetchedLength: function getFetchedLength() {
        throw new Error("getFetchedLength is abstract");
      },

      /*
      ---------------------------------------------------------------------------
        APPLY ROUTINES
      ---------------------------------------------------------------------------
      */

      /**
       * Apply method for "state" property. For each state value a corresponding
       * event is fired to inform the listeners.
       *
       * @param value {var} Current value
       * @param old {var} Previous value
       */
      _applyState: function _applyState(value, old) {
        {
          if (qx.core.Environment.get("qx.debug.io.remote")) {
            this.debug("State: " + value);
          }
        }

        switch (value) {
          case "created":
            this.fireEvent("created");
            break;

          case "configured":
            this.fireEvent("configured");
            break;

          case "sending":
            this.fireEvent("sending");
            break;

          case "receiving":
            this.fireEvent("receiving");
            break;

          case "completed":
            this.fireEvent("completed");
            break;

          case "aborted":
            this.fireEvent("aborted");
            break;

          case "failed":
            this.fireEvent("failed");
            break;

          case "timeout":
            this.fireEvent("timeout");
            break;
        }

        return true;
      }
    },

    /*
    *****************************************************************************
       DESTRUCTOR
    *****************************************************************************
    */
    destruct: function destruct() {
      this.setRequestHeaders(null);
      this.setParameters(null);
      this.setFormFields(null);
    }
  });
  qx.io.remote.transport.Abstract.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.core.Environment": {
        "defer": "load",
        "construct": true,
        "require": true
      },
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.io.remote.transport.Abstract": {
        "construct": true,
        "require": true
      },
      "qx.core.IDisposable": {
        "require": true
      },
      "qx.bom.client.Engine": {
        "construct": true,
        "defer": "runtime"
      },
      "qx.bom.Iframe": {
        "construct": true
      },
      "qx.bom.element.Style": {
        "construct": true
      },
      "qx.dom.Element": {
        "construct": true,
        "defer": "runtime"
      },
      "qx.dom.Node": {
        "construct": true
      },
      "qx.event.Registration": {
        "construct": true,
        "defer": "runtime"
      },
      "qx.lang.Function": {
        "construct": true
      },
      "qx.bom.Event": {
        "construct": true,
        "defer": "runtime"
      },
      "qx.event.GlobalError": {
        "usage": "dynamic",
        "require": true
      },
      "qx.io.remote.Exchange": {
        "defer": "runtime"
      },
      "qx.lang.Json": {},
      "qx.util.ResourceManager": {
        "defer": "runtime"
      }
    },
    "environment": {
      "provided": [],
      "required": {
        "engine.name": {
          "construct": true,
          "className": "qx.bom.client.Engine",
          "defer": true
        },
        "qx.debug.io.remote": {},
        "qx.debug.io.remote.data": {}
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2004-2008 1&1 Internet AG, Germany, http://www.1und1.de
       2006 Derrell Lipman
       2006 STZ-IDA, Germany, http://www.stz-ida.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Sebastian Werner (wpbasti)
       * Andreas Ecker (ecker)
       * Derrell Lipman (derrell)
       * Andreas Junghans (lucidcake)
  
  ************************************************************************ */

  /* ************************************************************************
  
  
  ************************************************************************ */

  /**
   * Transports requests to a server using an IFRAME.
   *
   * This class should not be used directly by client programmers.
   *
   * NOTE: Instances of this class must be disposed of after use
   *
   * @asset(qx/static/blank.gif)
   */
  qx.Class.define("qx.io.remote.transport.Iframe", {
    extend: qx.io.remote.transport.Abstract,
    implement: [qx.core.IDisposable],

    /*
    *****************************************************************************
       CONSTRUCTOR
    *****************************************************************************
    */
    construct: function construct() {
      qx.io.remote.transport.Abstract.constructor.call(this); // Unique identifiers for iframe and form

      var vUniqueId = new Date().valueOf();
      var vFrameName = "frame_" + vUniqueId;
      var vFormName = "form_" + vUniqueId; // This is to prevent the "mixed secure and insecure content" warning in IE with https

      var vFrameSource;

      if (qx.core.Environment.get("engine.name") == "mshtml") {
        vFrameSource = "javascript:void(0)";
      } // Create a hidden iframe.
      // The purpose of the iframe is to receive data coming back from the server (see below).


      this.__frame__P_169_0 = qx.bom.Iframe.create({
        id: vFrameName,
        name: vFrameName,
        src: vFrameSource
      });
      qx.bom.element.Style.set(this.__frame__P_169_0, "display", "none"); // Create form element with textarea as conduit for request data.
      // The target of the form is the hidden iframe, which means the response
      // coming back from the server is written into the iframe.

      this.__form__P_169_1 = qx.dom.Element.create("form", {
        id: vFormName,
        name: vFormName,
        target: vFrameName
      });
      qx.bom.element.Style.set(this.__form__P_169_1, "display", "none");
      qx.dom.Element.insertEnd(this.__form__P_169_1, qx.dom.Node.getBodyElement(document));
      this.__data__P_169_2 = qx.dom.Element.create("textarea", {
        id: "_data_",
        name: "_data_"
      });
      qx.dom.Element.insertEnd(this.__data__P_169_2, this.__form__P_169_1); // Finally, attach iframe to DOM and add listeners

      qx.dom.Element.insertEnd(this.__frame__P_169_0, qx.dom.Node.getBodyElement(document));
      qx.event.Registration.addListener(this.__frame__P_169_0, "load", this._onload, this); // qx.event.handler.Iframe does not yet support the readystatechange event

      this.__onreadystatechangeWrapper__P_169_3 = qx.lang.Function.listener(this._onreadystatechange, this);
      qx.bom.Event.addNativeListener(this.__frame__P_169_0, "readystatechange", this.__onreadystatechangeWrapper__P_169_3);
    },

    /*
    *****************************************************************************
       STATICS
    *****************************************************************************
    */
    statics: {
      /**
       * Capabilities of this transport type.
       *
       * @internal
       */
      handles: {
        synchronous: false,
        asynchronous: true,
        crossDomain: false,
        fileUpload: true,
        programmaticFormFields: true,
        responseTypes: ["text/plain", "text/javascript", "application/json", "application/xml", "text/html"]
      },

      /**
       * Returns always true, because iframe transport is supported by all browsers.
       *
       * @return {Boolean}
       */
      isSupported: function isSupported() {
        return true;
      },

      /*
      ---------------------------------------------------------------------------
        EVENT LISTENER
      ---------------------------------------------------------------------------
      */

      /**
       * For reference:
       * http://msdn.microsoft.com/en-us/library/ie/ms534359%28v=vs.85%29.aspx
       *
       * @internal
       */
      _numericMap: {
        "uninitialized": 1,
        "loading": 2,
        "loaded": 2,
        "interactive": 3,
        "complete": 4
      }
    },

    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */
    members: {
      __data__P_169_2: null,
      __lastReadyState__P_169_4: 0,
      __form__P_169_1: null,
      __frame__P_169_0: null,
      __onreadystatechangeWrapper__P_169_3: null,

      /*
      ---------------------------------------------------------------------------
        USER METHODS
      ---------------------------------------------------------------------------
      */

      /**
       * Sends a request with the use of a form.
       *
       */
      send: function send() {
        var vMethod = this.getMethod();
        var vUrl = this.getUrl(); // --------------------------------------
        //   Adding parameters
        // --------------------------------------

        var vParameters = this.getParameters(false);
        var vParametersList = [];

        for (var vId in vParameters) {
          var value = vParameters[vId];

          if (value instanceof Array) {
            for (var i = 0; i < value.length; i++) {
              vParametersList.push(encodeURIComponent(vId) + "=" + encodeURIComponent(value[i]));
            }
          } else {
            vParametersList.push(encodeURIComponent(vId) + "=" + encodeURIComponent(value));
          }
        }

        if (vParametersList.length > 0) {
          vUrl += (vUrl.indexOf("?") >= 0 ? "&" : "?") + vParametersList.join("&");
        } // --------------------------------------------------------
        //   Adding data parameters (if no data is already present)
        // --------------------------------------------------------


        if (this.getData() === null) {
          var vParameters = this.getParameters(true);
          var vParametersList = [];

          for (var vId in vParameters) {
            var value = vParameters[vId];

            if (value instanceof Array) {
              for (var i = 0; i < value.length; i++) {
                vParametersList.push(encodeURIComponent(vId) + "=" + encodeURIComponent(value[i]));
              }
            } else {
              vParametersList.push(encodeURIComponent(vId) + "=" + encodeURIComponent(value));
            }
          }

          if (vParametersList.length > 0) {
            this.setData(vParametersList.join("&"));
          }
        } // --------------------------------------
        //   Adding form fields
        // --------------------------------------


        var vFormFields = this.getFormFields();

        for (var vId in vFormFields) {
          var vField = document.createElement("textarea");
          vField.name = vId;
          vField.appendChild(document.createTextNode(vFormFields[vId]));

          this.__form__P_169_1.appendChild(vField);
        } // --------------------------------------
        //   Preparing form
        // --------------------------------------


        this.__form__P_169_1.action = vUrl;
        this.__form__P_169_1.method = vMethod; // --------------------------------------
        //   Sending data
        // --------------------------------------

        this.__data__P_169_2.appendChild(document.createTextNode(this.getData()));

        this.__form__P_169_1.submit();

        this.setState("sending");
      },

      /**
       * Converting complete state to numeric value and update state property
       *
       * @signature function(e)
       * @param e {qx.event.type.Event} event object
       */
      _onload: qx.event.GlobalError.observeMethod(function (e) {
        // Timing-issue in Opera
        // Do not switch state to complete in case load event fires before content
        // of iframe was updated
        if (qx.core.Environment.get("engine.name") == "opera" && this.getIframeHtmlContent() == "") {
          return;
        }

        if (this.__form__P_169_1.src) {
          return;
        }

        this._switchReadyState(qx.io.remote.transport.Iframe._numericMap.complete);
      }),

      /**
       * Converting named readyState to numeric value and update state property
       *
       * @signature function(e)
       * @param e {qx.event.type.Event} event object
       */
      _onreadystatechange: qx.event.GlobalError.observeMethod(function (e) {
        this._switchReadyState(qx.io.remote.transport.Iframe._numericMap[this.__frame__P_169_0.readyState]);
      }),

      /**
       * Switches the readystate by setting the internal state.
       *
       * @param vReadyState {String} readystate value
       */
      _switchReadyState: function _switchReadyState(vReadyState) {
        // Ignoring already stopped requests
        switch (this.getState()) {
          case "completed":
          case "aborted":
          case "failed":
          case "timeout":
            this.warn("Ignore Ready State Change");
            return;
        } // Updating internal state


        while (this.__lastReadyState__P_169_4 < vReadyState) {
          this.setState(qx.io.remote.Exchange._nativeMap[++this.__lastReadyState__P_169_4]);
        }
      },

      /*
      ---------------------------------------------------------------------------
        REQUEST HEADER SUPPORT
      ---------------------------------------------------------------------------
      */

      /**
       * Sets a request header with the given value.
       *
       * This method is not implemented at the moment.
       *
       * @param vLabel {String} request header name
       * @param vValue {var} request header value
       */
      setRequestHeader: function setRequestHeader(vLabel, vValue) {},

      /*
      ---------------------------------------------------------------------------
        RESPONSE HEADER SUPPORT
      ---------------------------------------------------------------------------
      */

      /**
       * Returns the value of the given response header.
       *
       * This method is not implemented at the moment and returns always "null".
       *
       * @param vLabel {String} Response header name
       * @return {null} Returns null
       */
      getResponseHeader: function getResponseHeader(vLabel) {
        return null;
      },

      /**
       * Provides an hash of all response headers.
       *
       * This method is not implemented at the moment and returns an empty map.
       *
       * @return {Map} empty map
       */
      getResponseHeaders: function getResponseHeaders() {
        return {};
      },

      /*
      ---------------------------------------------------------------------------
        STATUS SUPPORT
      ---------------------------------------------------------------------------
      */

      /**
       * Returns the current status code of the request if available or -1 if not.
       * This method needs implementation (returns always 200).
       *
       * @return {Integer} status code
       */
      getStatusCode: function getStatusCode() {
        return 200;
      },

      /**
       * Provides the status text for the current request if available and null otherwise.
       * This method needs implementation (returns always an empty string)
       *
       * @return {String} status code text
       */
      getStatusText: function getStatusText() {
        return "";
      },

      /*
      ---------------------------------------------------------------------------
        FRAME UTILITIES
      ---------------------------------------------------------------------------
      */

      /**
       * Returns the DOM window object of the used iframe.
       *
       * @return {Object} DOM window object
       */
      getIframeWindow: function getIframeWindow() {
        return qx.bom.Iframe.getWindow(this.__frame__P_169_0);
      },

      /**
       * Returns the document node of the used iframe.
       *
       * @return {Object} document node
       */
      getIframeDocument: function getIframeDocument() {
        return qx.bom.Iframe.getDocument(this.__frame__P_169_0);
      },

      /**
       * Returns the body node of the used iframe.
       *
       * @return {Object} body node
       */
      getIframeBody: function getIframeBody() {
        return qx.bom.Iframe.getBody(this.__frame__P_169_0);
      },

      /*
      ---------------------------------------------------------------------------
        RESPONSE DATA SUPPORT
      ---------------------------------------------------------------------------
      */

      /**
       * Returns the iframe content (innerHTML) as text.
       *
       * @return {String} iframe content as text
       */
      getIframeTextContent: function getIframeTextContent() {
        var vBody = this.getIframeBody();

        if (!vBody) {
          return null;
        }

        if (!vBody.firstChild) {
          return "";
        } // Mshtml returns the content inside a PRE
        // element if we use plain text


        if (vBody.firstChild.tagName && vBody.firstChild.tagName.toLowerCase() == "pre") {
          return vBody.firstChild.innerHTML;
        } else {
          return vBody.innerHTML;
        }
      },

      /**
       * Returns the iframe content as HTML.
       *
       * @return {String} iframe content as HTML
       */
      getIframeHtmlContent: function getIframeHtmlContent() {
        var vBody = this.getIframeBody();
        return vBody ? vBody.innerHTML : null;
      },

      /**
       * Returns the length of the content as fetched thus far.
       * This method needs implementation (returns always 0).
       *
       * @return {Integer} Returns 0
       */
      getFetchedLength: function getFetchedLength() {
        return 0;
      },

      /**
       * Returns the content of the response
       *
       * @return {null | String} null or text of the response (=iframe content).
       */
      getResponseContent: function getResponseContent() {
        if (this.getState() !== "completed") {
          {
            if (qx.core.Environment.get("qx.debug.io.remote")) {
              this.warn("Transfer not complete, ignoring content!");
            }
          }
          return null;
        }

        {
          if (qx.core.Environment.get("qx.debug.io.remote")) {
            this.debug("Returning content for responseType: " + this.getResponseType());
          }
        }
        var vText = this.getIframeTextContent();

        switch (this.getResponseType()) {
          case "text/plain":
            {
              if (qx.core.Environment.get("qx.debug.io.remote.data")) {
                this.debug("Response: " + this._responseContent);
              }
            }
            return vText;

          case "text/html":
            vText = this.getIframeHtmlContent();
            {
              if (qx.core.Environment.get("qx.debug.io.remote.data")) {
                this.debug("Response: " + this._responseContent);
              }
            }
            return vText;

          case "application/json":
            vText = this.getIframeHtmlContent();
            {
              if (qx.core.Environment.get("qx.debug.io.remote.data")) {
                this.debug("Response: " + this._responseContent);
              }
            }

            try {
              return vText && vText.length > 0 ? qx.lang.Json.parse(vText) : null;
            } catch (ex) {
              return this.error("Could not execute json: (" + vText + ")", ex);
            }

          case "text/javascript":
            vText = this.getIframeHtmlContent();
            {
              if (qx.core.Environment.get("qx.debug.io.remote.data")) {
                this.debug("Response: " + this._responseContent);
              }
            }

            try {
              return vText && vText.length > 0 ? window.eval(vText) : null;
            } catch (ex) {
              return this.error("Could not execute javascript: (" + vText + ")", ex);
            }

          case "application/xml":
            vText = this.getIframeDocument();
            {
              if (qx.core.Environment.get("qx.debug.io.remote.data")) {
                this.debug("Response: " + this._responseContent);
              }
            }
            return vText;

          default:
            this.warn("No valid responseType specified (" + this.getResponseType() + ")!");
            return null;
        }
      }
    },

    /*
    *****************************************************************************
       DEFER
    *****************************************************************************
    */
    defer: function defer() {
      // basic registration to qx.io.remote.Exchange
      // the real availability check (activeX stuff and so on) follows at the first real request
      qx.io.remote.Exchange.registerType(qx.io.remote.transport.Iframe, "qx.io.remote.transport.Iframe");
    },

    /*
    *****************************************************************************
       DESTRUCTOR
    *****************************************************************************
    */
    destruct: function destruct() {
      if (this.__frame__P_169_0) {
        qx.event.Registration.removeListener(this.__frame__P_169_0, "load", this._onload, this);
        qx.bom.Event.removeNativeListener(this.__frame__P_169_0, "readystatechange", this.__onreadystatechangeWrapper__P_169_3); // Reset source to a blank image for gecko
        // Otherwise it will switch into a load-without-end behaviour

        if (qx.core.Environment.get("engine.name") == "gecko") {
          this.__frame__P_169_0.src = qx.util.ResourceManager.getInstance().toUri("qx/static/blank.gif");
        } // Finally, remove element node


        qx.dom.Element.remove(this.__frame__P_169_0);
      }

      if (this.__form__P_169_1) {
        qx.dom.Element.remove(this.__form__P_169_1);
      }

      this.__frame__P_169_0 = this.__form__P_169_1 = this.__data__P_169_2 = null;
    }
  });
  qx.io.remote.transport.Iframe.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.core.Environment": {
        "defer": "load",
        "require": true
      },
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.io.remote.transport.Abstract": {
        "construct": true,
        "require": true
      },
      "qx.core.IDisposable": {
        "require": true
      },
      "qx.event.GlobalError": {
        "usage": "dynamic",
        "require": true
      },
      "qx.io.remote.Exchange": {
        "defer": "runtime"
      }
    },
    "environment": {
      "provided": [],
      "required": {
        "qx.debug.io.remote": {},
        "qx.debug.io.remote.data": {}
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2004-2008 1&1 Internet AG, Germany, http://www.1und1.de
       2006 Derrell Lipman
       2006 STZ-IDA, Germany, http://www.stz-ida.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Sebastian Werner (wpbasti)
       * Andreas Ecker (ecker)
       * Derrell Lipman (derrell)
       * Andreas Junghans (lucidcake)
  
  ************************************************************************ */

  /**
   * Transports requests to a server using dynamic script tags.
   *
   * This class should not be used directly by client programmers.
   * 
   * NOTE: Instances of this class must be disposed of after use
   *
   */
  qx.Class.define("qx.io.remote.transport.Script", {
    extend: qx.io.remote.transport.Abstract,
    implement: [qx.core.IDisposable],

    /*
    *****************************************************************************
       CONSTRUCTOR
    *****************************************************************************
    */
    construct: function construct() {
      qx.io.remote.transport.Abstract.constructor.call(this);
      var vUniqueId = ++qx.io.remote.transport.Script.__uniqueId__P_170_0;

      if (vUniqueId >= 2000000000) {
        qx.io.remote.transport.Script.__uniqueId__P_170_0 = vUniqueId = 1;
      }

      this.__element__P_170_1 = null;
      this.__uniqueId__P_170_0 = vUniqueId;
    },

    /*
    *****************************************************************************
       STATICS
    *****************************************************************************
    */
    statics: {
      /**
       * Unique identifier for each instance.
       *
       * @internal
       */
      __uniqueId__P_170_0: 0,

      /**
       * Registry for all script transport instances.
       *
       * @internal
       */
      _instanceRegistry: {},

      /**
       * Internal URL parameter prefix.
       *
       * @internal
       */
      ScriptTransport_PREFIX: "_ScriptTransport_",

      /**
       * Internal URL parameter ID.
       *
       * @internal
       */
      ScriptTransport_ID_PARAM: "_ScriptTransport_id",

      /**
       * Internal URL parameter data prefix.
       *
       * @internal
       */
      ScriptTransport_DATA_PARAM: "_ScriptTransport_data",

      /**
       * Capabilities of this transport type.
       *
       * @internal
       */
      handles: {
        synchronous: false,
        asynchronous: true,
        crossDomain: true,
        fileUpload: false,
        programmaticFormFields: false,
        responseTypes: ["text/plain", "text/javascript", "application/json"]
      },

      /**
       * Returns always true, because script transport is supported by all browsers.
       * @return {Boolean} <code>true</code>
       */
      isSupported: function isSupported() {
        return true;
      },

      /*
      ---------------------------------------------------------------------------
        EVENT LISTENER
      ---------------------------------------------------------------------------
      */

      /**
       * For reference:
       * http://msdn.microsoft.com/en-us/library/ie/ms534359%28v=vs.85%29.aspx
       *
       * @internal
       */
      _numericMap: {
        "uninitialized": 1,
        "loading": 2,
        "loaded": 2,
        "interactive": 3,
        "complete": 4
      },

      /**
       * This method can be called by the script loaded by the ScriptTransport
       * class.
       *
       * @signature function(id, content)
       * @param id {String} Id of the corresponding transport object,
       *     which is passed as an URL parameter to the server an
       * @param content {String} This string is passed to the content property
       *     of the {@link qx.io.remote.Response} object.
       */
      _requestFinished: qx.event.GlobalError.observeMethod(function (id, content) {
        var vInstance = qx.io.remote.transport.Script._instanceRegistry[id];

        if (vInstance == null) {
          {
            if (qx.core.Environment.get("qx.debug.io.remote")) {
              this.warn("Request finished for an unknown instance (probably aborted or timed out before)");
            }
          }
        } else {
          vInstance._responseContent = content;

          vInstance._switchReadyState(qx.io.remote.transport.Script._numericMap.complete);
        }
      })
    },

    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */
    members: {
      __lastReadyState__P_170_2: 0,
      __element__P_170_1: null,
      __uniqueId__P_170_0: null,

      /*
      ---------------------------------------------------------------------------
        USER METHODS
      ---------------------------------------------------------------------------
      */

      /**
       * Sends the request using "script" elements
       *
       */
      send: function send() {
        var vUrl = this.getUrl(); // --------------------------------------
        //   Adding parameters
        // --------------------------------------

        vUrl += (vUrl.indexOf("?") >= 0 ? "&" : "?") + qx.io.remote.transport.Script.ScriptTransport_ID_PARAM + "=" + this.__uniqueId__P_170_0;
        var vParameters = this.getParameters();
        var vParametersList = [];

        for (var vId in vParameters) {
          if (vId.indexOf(qx.io.remote.transport.Script.ScriptTransport_PREFIX) == 0) {
            this.error("Illegal parameter name. The following prefix is used internally by qooxdoo): " + qx.io.remote.transport.Script.ScriptTransport_PREFIX);
          }

          var value = vParameters[vId];

          if (value instanceof Array) {
            for (var i = 0; i < value.length; i++) {
              vParametersList.push(encodeURIComponent(vId) + "=" + encodeURIComponent(value[i]));
            }
          } else {
            vParametersList.push(encodeURIComponent(vId) + "=" + encodeURIComponent(value));
          }
        }

        if (vParametersList.length > 0) {
          vUrl += "&" + vParametersList.join("&");
        } // --------------------------------------
        //   Sending data
        // --------------------------------------


        var vData = this.getData();

        if (vData != null) {
          vUrl += "&" + qx.io.remote.transport.Script.ScriptTransport_DATA_PARAM + "=" + encodeURIComponent(vData);
        }

        qx.io.remote.transport.Script._instanceRegistry[this.__uniqueId__P_170_0] = this;
        this.__element__P_170_1 = document.createElement("script"); // IE needs this (it ignores the
        // encoding from the header sent by the
        // server for dynamic script tags)

        this.__element__P_170_1.charset = "utf-8";
        this.__element__P_170_1.src = vUrl;
        {
          if (qx.core.Environment.get("qx.debug.io.remote.data")) {
            this.debug("Request: " + vUrl);
          }
        }
        document.body.appendChild(this.__element__P_170_1);
      },

      /**
       * Switches the readystate by setting the internal state.
       *
       * @param vReadyState {String} readystate value
       */
      _switchReadyState: function _switchReadyState(vReadyState) {
        // Ignoring already stopped requests
        switch (this.getState()) {
          case "completed":
          case "aborted":
          case "failed":
          case "timeout":
            this.warn("Ignore Ready State Change");
            return;
        } // Updating internal state


        while (this.__lastReadyState__P_170_2 < vReadyState) {
          this.setState(qx.io.remote.Exchange._nativeMap[++this.__lastReadyState__P_170_2]);
        }
      },

      /*
      ---------------------------------------------------------------------------
        REQUEST HEADER SUPPORT
      ---------------------------------------------------------------------------
      */

      /**
       * Sets a request header with the given value.
       *
       * This method is not implemented at the moment.
       *
       * @param vLabel {String} Request header name
       * @param vValue {var} Request header value
       */
      setRequestHeader: function setRequestHeader(vLabel, vValue) {},

      /*
      ---------------------------------------------------------------------------
        RESPONSE HEADER SUPPORT
      ---------------------------------------------------------------------------
      */

      /**
       * Returns the value of the given response header.
       *
       * This method is not implemented at the moment and returns always "null".
       *
       * @param vLabel {String} Response header name
       * @return {null} Returns null
       */
      getResponseHeader: function getResponseHeader(vLabel) {
        return null;
      },

      /**
       * Provides an hash of all response headers.
       *
       * This method is not implemented at the moment and returns an empty map.
       *
       * @return {Map} empty map
       */
      getResponseHeaders: function getResponseHeaders() {
        return {};
      },

      /*
      ---------------------------------------------------------------------------
        STATUS SUPPORT
      ---------------------------------------------------------------------------
      */

      /**
       * Returns the current status code of the request if available or -1 if not.
       * This method needs implementation (returns always 200).
       *
       * @return {Integer} status code
       */
      getStatusCode: function getStatusCode() {
        return 200;
      },

      /**
       * Provides the status text for the current request if available and null otherwise.
       * This method needs implementation (returns always an empty string)
       *
       * @return {String} always an empty string.
       */
      getStatusText: function getStatusText() {
        return "";
      },

      /*
      ---------------------------------------------------------------------------
        RESPONSE DATA SUPPORT
      ---------------------------------------------------------------------------
      */

      /**
       * Returns the length of the content as fetched thus far.
       * This method needs implementation (returns always 0).
       *
       * @return {Integer} Returns 0
       */
      getFetchedLength: function getFetchedLength() {
        return 0;
      },

      /**
       * Returns the content of the response.
       *
       * @return {null | String} If successful content of response as string.
       */
      getResponseContent: function getResponseContent() {
        if (this.getState() !== "completed") {
          {
            if (qx.core.Environment.get("qx.debug.io.remote")) {
              this.warn("Transfer not complete, ignoring content!");
            }
          }
          return null;
        }

        {
          if (qx.core.Environment.get("qx.debug.io.remote")) {
            this.debug("Returning content for responseType: " + this.getResponseType());
          }
        }

        switch (this.getResponseType()) {
          case "text/plain": // server is responsible for using a string as the response

          case "application/json":
          case "text/javascript":
            {
              if (qx.core.Environment.get("qx.debug.io.remote.data")) {
                this.debug("Response: " + this._responseContent);
              }
            }
            var ret = this._responseContent;
            return ret === 0 ? 0 : ret || null;

          default:
            this.warn("No valid responseType specified (" + this.getResponseType() + ")!");
            return null;
        }
      }
    },

    /*
    *****************************************************************************
       DEFER
    *****************************************************************************
    */
    defer: function defer() {
      // basic registration to qx.io.remote.Exchange
      // the real availability check (activeX stuff and so on) follows at the first real request
      qx.io.remote.Exchange.registerType(qx.io.remote.transport.Script, "qx.io.remote.transport.Script");
    },

    /*
    *****************************************************************************
       DESTRUCTOR
    *****************************************************************************
    */
    destruct: function destruct() {
      if (this.__element__P_170_1) {
        delete qx.io.remote.transport.Script._instanceRegistry[this.__uniqueId__P_170_0];
        document.body.removeChild(this.__element__P_170_1);
      }

      this.__element__P_170_1 = this._responseContent = null;
    }
  });
  qx.io.remote.transport.Script.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.core.Environment": {
        "defer": "load",
        "usage": "dynamic",
        "require": true
      },
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.io.remote.transport.Abstract": {
        "require": true
      },
      "qx.core.IDisposable": {
        "require": true
      },
      "qx.bom.client.Engine": {
        "require": true
      },
      "qx.xml.Document": {},
      "qx.lang.Function": {},
      "qx.bom.client.Browser": {},
      "qx.event.Timer": {},
      "qx.event.GlobalError": {
        "usage": "dynamic",
        "require": true
      },
      "qx.io.remote.Exchange": {
        "defer": "runtime"
      },
      "qx.lang.Json": {}
    },
    "environment": {
      "provided": [],
      "required": {
        "engine.name": {
          "load": true,
          "className": "qx.bom.client.Engine"
        },
        "qx.debug.io.remote.data": {},
        "engine.version": {
          "className": "qx.bom.client.Engine"
        },
        "browser.documentmode": {
          "className": "qx.bom.client.Browser"
        },
        "qx.debug.io.remote": {}
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2004-2008 1&1 Internet AG, Germany, http://www.1und1.de
       2006 Derrell Lipman
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Sebastian Werner (wpbasti)
       * Andreas Ecker (ecker)
       * Derrell Lipman (derrell)
  
  ************************************************************************ */

  /**
   * Transports requests to a server using the native XmlHttpRequest object.
   *
   * This class should not be used directly by client programmers.
   */
  qx.Class.define("qx.io.remote.transport.XmlHttp", {
    extend: qx.io.remote.transport.Abstract,
    implement: [qx.core.IDisposable],

    /*
    *****************************************************************************
       STATICS
    *****************************************************************************
    */
    statics: {
      /**
       * Capabilities of this transport type.
       *
       * @internal
       */
      handles: {
        synchronous: true,
        asynchronous: true,
        crossDomain: false,
        fileUpload: false,
        programmaticFormFields: false,
        responseTypes: ["text/plain", "text/javascript", "application/json", "application/xml", "text/html"]
      },

      /**
       * Return a new XMLHttpRequest object suitable for the client browser.
       *
       * @return {Object} native XMLHttpRequest object
       * @signature function()
       */
      createRequestObject: qx.core.Environment.select("engine.name", {
        "default": function _default() {
          return new XMLHttpRequest();
        },
        // IE7's native XmlHttp does not care about trusted zones. To make this
        // work in the localhost scenario, you can use the following registry setting:
        //
        // [HKEY_CURRENT_USER\Software\Microsoft\Internet Explorer\Main\
        // FeatureControl\FEATURE_XMLHTTP_RESPECT_ZONEPOLICY]
        // "Iexplore.exe"=dword:00000001
        //
        // Generally it seems that the ActiveXObject is more stable. jQuery
        // seems to use it always. We prefer the ActiveXObject for the moment, but allow
        // fallback to XMLHTTP if ActiveX is disabled.
        "mshtml": function mshtml() {
          if (window.ActiveXObject && qx.xml.Document.XMLHTTP) {
            return new ActiveXObject(qx.xml.Document.XMLHTTP);
          }

          if (window.XMLHttpRequest) {
            return new XMLHttpRequest();
          }
        }
      }),

      /**
       * Whether the transport type is supported by the client.
       *
       * @return {Boolean} supported or not
       */
      isSupported: function isSupported() {
        return !!this.createRequestObject();
      },

      /** The timeout for Xhr requests */
      __timeout__P_171_0: 0,

      /**
       * Sets the timeout for requests
       * @deprecated {6.0} This method is deprecated from the start because synchronous I/O itself is deprecated
       *  in the W3C spec {@link https://xhr.spec.whatwg.org/} and timeouts are indicative of synchronous I/O and/or
       *  other server issues.  However, this API is still supported by many browsers and this API is useful
       *  for code which has not made the transition to asynchronous I/O   
       */
      setTimeout: function setTimeout(timeout) {
        this.__timeout__P_171_0 = timeout;
      },

      /**
       * Returns the timeout for requests
       */
      getTimeout: function getTimeout() {
        return this.__timeout__P_171_0;
      }
    },

    /*
     *****************************************************************************
        PROPERTIES
     *****************************************************************************
     */
    properties: {
      /**
       * If true and the responseType property is set to "application/json", getResponseContent() will
       * return a Javascript map containing the JSON contents, i. e. the result qx.lang.Json.parse().
       * If false, the raw string data will be returned and the parsing must be done manually.
       * This is useful for special JSON dialects / extensions which are not supported by
       * qx.lang.Json.
       */
      parseJson: {
        check: "Boolean",
        init: true
      }
    },

    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */
    members: {
      /*
      ---------------------------------------------------------------------------
        CORE METHODS
      ---------------------------------------------------------------------------
      */
      __localRequest__P_171_1: false,
      __lastReadyState__P_171_2: 0,
      __request__P_171_3: null,

      /**
       * Returns the native request object
       *
       * @return {Object} native XmlHTTPRequest object
       */
      getRequest: function getRequest() {
        if (this.__request__P_171_3 === null) {
          this.__request__P_171_3 = qx.io.remote.transport.XmlHttp.createRequestObject();
          this.__request__P_171_3.onreadystatechange = qx.lang.Function.bind(this._onreadystatechange, this);
        }

        return this.__request__P_171_3;
      },

      /*
      ---------------------------------------------------------------------------
        USER METHODS
      ---------------------------------------------------------------------------
      */

      /**
       * Implementation for sending the request
       *
       */
      send: function send() {
        this.__lastReadyState__P_171_2 = 0;
        var vRequest = this.getRequest();
        var vMethod = this.getMethod();
        var vAsynchronous = this.getAsynchronous();
        var vUrl = this.getUrl(); // --------------------------------------
        //   Local handling
        // --------------------------------------

        var vLocalRequest = window.location.protocol === "file:" && !/^http(s){0,1}\:/.test(vUrl);
        this.__localRequest__P_171_1 = vLocalRequest; // --------------------------------------
        //   Adding URL parameters
        // --------------------------------------

        var vParameters = this.getParameters(false);
        var vParametersList = [];

        for (var vId in vParameters) {
          var value = vParameters[vId];

          if (value instanceof Array) {
            for (var i = 0; i < value.length; i++) {
              vParametersList.push(encodeURIComponent(vId) + "=" + encodeURIComponent(value[i]));
            }
          } else {
            vParametersList.push(encodeURIComponent(vId) + "=" + encodeURIComponent(value));
          }
        }

        if (vParametersList.length > 0) {
          vUrl += (vUrl.indexOf("?") >= 0 ? "&" : "?") + vParametersList.join("&");
        } // --------------------------------------------------------
        //   Adding data parameters (if no data is already present)
        // --------------------------------------------------------


        if (this.getData() === null) {
          var vParameters = this.getParameters(true);
          var vParametersList = [];

          for (var vId in vParameters) {
            var value = vParameters[vId];

            if (value instanceof Array) {
              for (var i = 0; i < value.length; i++) {
                vParametersList.push(encodeURIComponent(vId) + "=" + encodeURIComponent(value[i]));
              }
            } else {
              vParametersList.push(encodeURIComponent(vId) + "=" + encodeURIComponent(value));
            }
          }

          if (vParametersList.length > 0) {
            this.setData(vParametersList.join("&"));
          }
        }

        var encode64 = function encode64(input) {
          var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
          var output = "";
          var chr1, chr2, chr3;
          var enc1, enc2, enc3, enc4;
          var i = 0;

          do {
            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);
            enc1 = chr1 >> 2;
            enc2 = (chr1 & 3) << 4 | chr2 >> 4;
            enc3 = (chr2 & 15) << 2 | chr3 >> 6;
            enc4 = chr3 & 63;

            if (isNaN(chr2)) {
              enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
              enc4 = 64;
            }

            output += keyStr.charAt(enc1) + keyStr.charAt(enc2) + keyStr.charAt(enc3) + keyStr.charAt(enc4);
          } while (i < input.length);

          return output;
        }; // --------------------------------------
        //   Opening connection
        // --------------------------------------


        try {
          if (this.getUsername()) {
            if (this.getUseBasicHttpAuth()) {
              vRequest.open(vMethod, vUrl, vAsynchronous);
              vRequest.setRequestHeader('Authorization', 'Basic ' + encode64(this.getUsername() + ':' + this.getPassword()));
            } else {
              vRequest.open(vMethod, vUrl, vAsynchronous, this.getUsername(), this.getPassword());
            }
          } else {
            vRequest.open(vMethod, vUrl, vAsynchronous);
          }
        } catch (ex) {
          this.error("Failed with exception: " + ex);
          this.failed();
          return;
        } // Apply timeout


        var timeout = qx.io.remote.transport.XmlHttp.getTimeout();

        if (timeout && vAsynchronous) {
          vRequest.timeout = timeout;
        } // --------------------------------------
        //   Applying request header
        // --------------------------------------
        // Removed adding a referer header as this is not allowed anymore on most
        // browsers
        // See issue https://github.com/qooxdoo/qooxdoo/issues/9298


        var vRequestHeaders = this.getRequestHeaders();

        for (var vId in vRequestHeaders) {
          vRequest.setRequestHeader(vId, vRequestHeaders[vId]);
        } // --------------------------------------
        //   Sending data
        // --------------------------------------


        try {
          {
            if (qx.core.Environment.get("qx.debug.io.remote.data")) {
              this.debug("Request: " + this.getData());
            }
          } // IE9 executes the call synchronous when the call is to file protocol
          // See [BUG #4762] for details

          if (vLocalRequest && vAsynchronous && qx.core.Environment.get("engine.name") == "mshtml" && qx.core.Environment.get("engine.version") == 9 && qx.core.Environment.get("browser.documentmode") == 9) {
            qx.event.Timer.once(function () {
              vRequest.send(this.getData());
            }, this, 0);
          } else {
            vRequest.send(this.getData());
          }
        } catch (ex) {
          if (vLocalRequest) {
            this.failedLocally();
          } else {
            this.error("Failed to send data to URL '" + vUrl + "': " + ex, "send");
            this.failed();
          }

          return;
        } // --------------------------------------
        //   Readystate for sync requests
        // --------------------------------------


        if (!vAsynchronous) {
          this._onreadystatechange();
        }
      },

      /**
       * Force the transport into the failed state ("failed").
       *
       * This method should be used only if the requests URI was local
       * access. I.e. it started with "file://".
       *
       */
      failedLocally: function failedLocally() {
        if (this.getState() === "failed") {
          return;
        } // should only occur on "file://" access


        this.warn("Could not load from file: " + this.getUrl());
        this.failed();
      },

      /*
      ---------------------------------------------------------------------------
        EVENT HANDLER
      ---------------------------------------------------------------------------
      */

      /**
       * Listener method for change of the "readystate".
       * Sets the internal state and informs the transport layer.
       *
       * @signature function(e)
       * @param e {Event} native event
       */
      _onreadystatechange: qx.event.GlobalError.observeMethod(function (e) {
        // Ignoring already stopped requests
        switch (this.getState()) {
          case "completed":
          case "aborted":
          case "failed":
          case "timeout":
            {
              if (qx.core.Environment.get("qx.debug.io.remote")) {
                this.warn("Ignore Ready State Change");
              }
            }
            return;
        } // Checking status code


        var vReadyState = this.getReadyState();

        if (vReadyState == 4) {
          // The status code is only meaningful when we reach ready state 4.
          // (Important for Opera since it goes through other states before
          // reaching 4, and the status code is not valid before 4 is reached.)
          if (!qx.io.remote.Exchange.wasSuccessful(this.getStatusCode(), vReadyState, this.__localRequest__P_171_1)) {
            // Fix for bug #2272
            // The IE doesn't set the state to 'sending' even though the send method
            // is called. This only occurs if the server (which is called) goes
            // down or a network failure occurs.
            if (this.getState() === "configured") {
              this.setState("sending");
            }

            this.failed();
            return;
          }
        } // Sometimes the xhr call skips the send state


        if (vReadyState == 3 && this.__lastReadyState__P_171_2 == 1) {
          this.setState(qx.io.remote.Exchange._nativeMap[++this.__lastReadyState__P_171_2]);
        } // Updating internal state


        while (this.__lastReadyState__P_171_2 < vReadyState) {
          this.setState(qx.io.remote.Exchange._nativeMap[++this.__lastReadyState__P_171_2]);
        }
      }),

      /*
      ---------------------------------------------------------------------------
        READY STATE
      ---------------------------------------------------------------------------
      */

      /**
       * Get the ready state of this transports request.
       *
       * For qx.io.remote.transport.XmlHttp, ready state is a number between 1 to 4.
       *
       * @return {Integer} ready state number
       */
      getReadyState: function getReadyState() {
        var vReadyState = null;

        try {
          vReadyState = this.getRequest().readyState;
        } catch (ex) {}

        return vReadyState;
      },

      /*
      ---------------------------------------------------------------------------
        REQUEST HEADER SUPPORT
      ---------------------------------------------------------------------------
      */

      /**
       * Set a request header to this transports request.
       *
       * @param vLabel {String} Request header name
       * @param vValue {var} Request header value
       */
      setRequestHeader: function setRequestHeader(vLabel, vValue) {
        this.getRequestHeaders()[vLabel] = vValue;
      },

      /*
      ---------------------------------------------------------------------------
        RESPONSE HEADER SUPPORT
      ---------------------------------------------------------------------------
      */

      /**
       * Returns a specific header provided by the server upon sending a request,
       * with header name determined by the argument headerName.
       *
       * Only available at readyState 3 and 4 universally and in readyState 2
       * in Gecko.
       *
       * Please note: Some servers/proxies (such as Selenium RC) will capitalize
       * response header names. This is in accordance with RFC 2616[1], which
       * states that HTTP 1.1 header names are case-insensitive, so your
       * application should be case-agnostic when dealing with response headers.
       *
       * [1]<a href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec4.html#sec4.2">RFC 2616: HTTP Message Headers</a>
       *
       * @param vLabel {String} Response header name
       * @return {String|null} Response header value
       */
      getResponseHeader: function getResponseHeader(vLabel) {
        var vResponseHeader = null;

        try {
          vResponseHeader = this.getRequest().getResponseHeader(vLabel) || null;
        } catch (ex) {}

        return vResponseHeader;
      },

      /**
       * Returns all response headers of the request.
       *
       * @return {var} response headers
       */
      getStringResponseHeaders: function getStringResponseHeaders() {
        var vSourceHeader = null;

        try {
          var vLoadHeader = this.getRequest().getAllResponseHeaders();

          if (vLoadHeader) {
            vSourceHeader = vLoadHeader;
          }
        } catch (ex) {}

        return vSourceHeader;
      },

      /**
       * Provides a hash of all response headers.
       *
       * @return {var} hash of all response headers
       */
      getResponseHeaders: function getResponseHeaders() {
        var vSourceHeader = this.getStringResponseHeaders();
        var vHeader = {};

        if (vSourceHeader) {
          var vValues = vSourceHeader.split(/[\r\n]+/g);

          for (var i = 0, l = vValues.length; i < l; i++) {
            var vPair = vValues[i].match(/^([^:]+)\s*:\s*(.+)$/i);

            if (vPair) {
              vHeader[vPair[1]] = vPair[2];
            }
          }
        }

        return vHeader;
      },

      /*
      ---------------------------------------------------------------------------
        STATUS SUPPORT
      ---------------------------------------------------------------------------
      */

      /**
       * Returns the current status code of the request if available or -1 if not.
       *
       * @return {Integer} current status code
       */
      getStatusCode: function getStatusCode() {
        var vStatusCode = -1;

        try {
          vStatusCode = this.getRequest().status; // [BUG #4476]
          // IE sometimes tells 1223 when it should be 204

          if (vStatusCode === 1223) {
            vStatusCode = 204;
          }
        } catch (ex) {}

        return vStatusCode;
      },

      /**
       * Provides the status text for the current request if available and null
       * otherwise.
       *
       * @return {String} current status code text
       */
      getStatusText: function getStatusText() {
        var vStatusText = "";

        try {
          vStatusText = this.getRequest().statusText;
        } catch (ex) {}

        return vStatusText;
      },

      /*
      ---------------------------------------------------------------------------
        RESPONSE DATA SUPPORT
      ---------------------------------------------------------------------------
      */

      /**
       * Provides the response text from the request when available and null
       * otherwise.  By passing true as the "partial" parameter of this method,
       * incomplete data will be made available to the caller.
       *
       * @return {String} Content of the response as string
       */
      getResponseText: function getResponseText() {
        var vResponseText = null;

        try {
          vResponseText = this.getRequest().responseText;
        } catch (ex) {
          vResponseText = null;
        }

        return vResponseText;
      },

      /**
       * Provides the XML provided by the response if any and null otherwise.  By
       * passing true as the "partial" parameter of this method, incomplete data will
       * be made available to the caller.
       *
       * @return {String} Content of the response as XML
       * @throws {Error} If an error within the response occurs.
       */
      getResponseXml: function getResponseXml() {
        var vResponseXML = null;
        var vStatus = this.getStatusCode();
        var vReadyState = this.getReadyState();

        if (qx.io.remote.Exchange.wasSuccessful(vStatus, vReadyState, this.__localRequest__P_171_1)) {
          try {
            vResponseXML = this.getRequest().responseXML;
          } catch (ex) {}
        } // Typical behaviour on file:// on mshtml
        // Could we check this with something like: /^file\:/.test(path); ?
        // No browser check here, because it doesn't seem to break other browsers
        //    * test for this.req.responseXML's objecthood added by *
        //    * FRM, 20050816                                       *


        if (typeof vResponseXML == "object" && vResponseXML != null) {
          if (!vResponseXML.documentElement) {
            // Clear xml file declaration, this breaks non unicode files (like ones with Umlauts)
            var s = String(this.getRequest().responseText).replace(/<\?xml[^\?]*\?>/, "");
            vResponseXML.loadXML(s);
          } // Re-check if fixed...


          if (!vResponseXML.documentElement) {
            throw new Error("Missing Document Element!");
          }

          if (vResponseXML.documentElement.tagName == "parseerror") {
            throw new Error("XML-File is not well-formed!");
          }
        } else {
          throw new Error("Response was not a valid xml document [" + this.getRequest().responseText + "]");
        }

        return vResponseXML;
      },

      /**
       * Returns the length of the content as fetched thus far
       *
       * @return {Integer} Length of the response text.
       */
      getFetchedLength: function getFetchedLength() {
        var vText = this.getResponseText();
        return typeof vText == "string" ? vText.length : 0;
      },

      /**
       * Returns the content of the response
       *
       * @return {null | String} Response content if available
       */
      getResponseContent: function getResponseContent() {
        var state = this.getState();

        if (state !== "completed" && state != "failed") {
          {
            if (qx.core.Environment.get("qx.debug.io.remote")) {
              this.warn("Transfer not complete or failed, ignoring content!");
            }
          }
          return null;
        }

        {
          if (qx.core.Environment.get("qx.debug.io.remote")) {
            this.debug("Returning content for responseType: " + this.getResponseType());
          }
        }
        var vText = this.getResponseText();

        if (state == "failed") {
          {
            if (qx.core.Environment.get("qx.debug.io.remote.data")) {
              this.debug("Failed: " + vText);
            }
          }
          return vText;
        }

        switch (this.getResponseType()) {
          case "text/plain":
          case "text/html":
            {
              if (qx.core.Environment.get("qx.debug.io.remote.data")) {
                this.debug("Response: " + vText);
              }
            }
            return vText;

          case "application/json":
            {
              if (qx.core.Environment.get("qx.debug.io.remote.data")) {
                this.debug("Response: " + vText);
              }
            }

            try {
              if (vText && vText.length > 0) {
                var ret;

                if (this.getParseJson()) {
                  ret = qx.lang.Json.parse(vText);
                  ret = ret === 0 ? 0 : ret || null;
                } else {
                  ret = vText;
                }

                return ret;
              } else {
                return null;
              }
            } catch (ex) {
              this.error("Could not execute json: [" + vText + "]", ex);
              return "<pre>Could not execute json: \n" + vText + "\n</pre>";
            }

          case "text/javascript":
            {
              if (qx.core.Environment.get("qx.debug.io.remote.data")) {
                this.debug("Response: " + vText);
              }
            }

            try {
              if (vText && vText.length > 0) {
                var ret = window.eval(vText);
                return ret === 0 ? 0 : ret || null;
              } else {
                return null;
              }
            } catch (ex) {
              this.error("Could not execute javascript: [" + vText + "]", ex);
              return null;
            }

          case "application/xml":
            vText = this.getResponseXml();
            {
              if (qx.core.Environment.get("qx.debug.io.remote.data")) {
                this.debug("Response: " + vText);
              }
            }
            return vText === 0 ? 0 : vText || null;

          default:
            this.warn("No valid responseType specified (" + this.getResponseType() + ")!");
            return null;
        }
      },

      /*
      ---------------------------------------------------------------------------
        APPLY ROUTINES
      ---------------------------------------------------------------------------
      */

      /**
       * Apply method for the "state" property.
       * Fires an event for each state value to inform the listeners.
       *
       * @param value {var} Current value
       * @param old {var} Previous value
       */
      _applyState: function _applyState(value, old) {
        {
          if (qx.core.Environment.get("qx.debug.io.remote")) {
            this.debug("State: " + value);
          }
        }

        switch (value) {
          case "created":
            this.fireEvent("created");
            break;

          case "configured":
            this.fireEvent("configured");
            break;

          case "sending":
            this.fireEvent("sending");
            break;

          case "receiving":
            this.fireEvent("receiving");
            break;

          case "completed":
            this.fireEvent("completed");
            break;

          case "failed":
            this.fireEvent("failed");
            break;

          case "aborted":
            this.getRequest().abort();
            this.fireEvent("aborted");
            break;

          case "timeout":
            this.getRequest().abort();
            this.fireEvent("timeout");
            break;
        }
      }
    },

    /*
    *****************************************************************************
       DEFER
    *****************************************************************************
    */
    defer: function defer() {
      // basic registration to qx.io.remote.Exchange
      // the real availability check (activeX stuff and so on) follows at the first real request
      qx.io.remote.Exchange.registerType(qx.io.remote.transport.XmlHttp, "qx.io.remote.transport.XmlHttp");
    },

    /*
    *****************************************************************************
       DESTRUCTOR
    *****************************************************************************
    */
    destruct: function destruct() {
      var vRequest = this.getRequest();

      if (vRequest) {
        // Clean up state change handler
        // Note that for IE the proper way to do this is to set it to a
        // dummy function, not null (Google on "onreadystatechange dummy IE unhook")
        // http://groups.google.com/group/Google-Web-Toolkit-Contributors/browse_thread/thread/7e7ee67c191a6324
        vRequest.onreadystatechange = function () {}; // Aborting


        switch (vRequest.readyState) {
          case 1:
          case 2:
          case 3:
            vRequest.abort();
        }
      }

      this.__request__P_171_3 = null;
    }
  });
  qx.io.remote.transport.XmlHttp.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.event.type.Event": {
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2004-2008 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Sebastian Werner (wpbasti)
       * Andreas Ecker (ecker)
  
  ************************************************************************ */

  /**
   * This class is used to work with the result of a HTTP request.
   */
  qx.Class.define("qx.io.remote.Response", {
    extend: qx.event.type.Event,

    /*
    *****************************************************************************
       PROPERTIES
    *****************************************************************************
    */
    properties: {
      /*
      ---------------------------------------------------------------------------
        PROPERTIES
      ---------------------------------------------------------------------------
      */

      /** State of the response. */
      state: {
        check: "Integer",
        nullable: true
      },

      /** Status code of the response. */
      statusCode: {
        check: "Integer",
        nullable: true
      },

      /** Content of the response. */
      content: {
        nullable: true
      },

      /** The headers of the response. */
      responseHeaders: {
        check: "Object",
        nullable: true,
        apply: "_applyResponseHeaders"
      }
    },

    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */
    members: {
      __lowerHeaders__P_167_0: null,

      /*
      ---------------------------------------------------------------------------
        USER METHODS
      ---------------------------------------------------------------------------
      */
      // overridden
      clone: function clone(embryo) {
        var clone = qx.io.remote.Response.prototype.clone.base.call(this, embryo);
        clone.setType(this.getType());
        clone.setState(this.getState());
        clone.setStatusCode(this.getStatusCode());
        clone.setContent(this.getContent());
        clone.setResponseHeaders(this.getResponseHeaders());
        return clone;
      },

      /**
       * Returns a specific response header
       * @param vHeader {String} Response header name
       * @return {Object | null} The header value or null;
       */
      getResponseHeader: function getResponseHeader(vHeader) {
        if (this.__lowerHeaders__P_167_0) {
          return this.__lowerHeaders__P_167_0[vHeader.toLowerCase()] || null;
        }

        return null;
      },

      /**
       * Keep lower-cased shadow of response headers for later
       * case-insensitive matching.
       *
       * @param value {var} Current value
       * @param old {var} Previous value
       */
      _applyResponseHeaders: function _applyResponseHeaders(value, old) {
        var lowerHeaders = {};

        if (value !== null) {
          Object.keys(value).forEach(function (key) {
            lowerHeaders[key.toLowerCase()] = value[key];
          });
          this.__lowerHeaders__P_167_0 = lowerHeaders;
        }
      }
    }
  });
  qx.io.remote.Response.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.core.Environment": {
        "defer": "load",
        "require": true
      },
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.core.Object": {
        "construct": true,
        "require": true
      },
      "qx.core.IDisposable": {
        "require": true
      },
      "qx.io.remote.RequestQueue": {},
      "qx.event.GlobalError": {
        "usage": "dynamic",
        "require": true
      }
    },
    "environment": {
      "provided": [],
      "required": {
        "qx.debug.io.remote": {}
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2004-2008 1&1 Internet AG, Germany, http://www.1und1.de
       2006 Derrell Lipman
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Sebastian Werner (wpbasti)
       * Andreas Ecker (ecker)
       * Derrell Lipman (derrell)
  
  ************************************************************************ */

  /**
   * This class is used to send HTTP requests to the server.
   *
   * NOTE: Instances of this class must be disposed of after use
   *
   */
  qx.Class.define("qx.io.remote.Request", {
    extend: qx.core.Object,
    implement: [qx.core.IDisposable],

    /*
    *****************************************************************************
       CONSTRUCTOR
    *****************************************************************************
    */

    /**
     * @param vUrl {String}
     *   Target url to issue the request to.
     *
     * @param vMethod {String}
     *   Determines http method (GET, POST, PUT, etc.) to use. See "method" property
     *   for valid values and default value.
     *
     * @param vResponseType {String}
     *   The mime type of the response. Default is text/plain.
     */
    construct: function construct(vUrl, vMethod, vResponseType) {
      qx.core.Object.constructor.call(this);
      this.__requestHeaders__P_165_0 = {};
      this.__urlParameters__P_165_1 = {};
      this.__dataParameters__P_165_2 = {};
      this.__formFields__P_165_3 = {};

      if (vUrl !== undefined) {
        this.setUrl(vUrl);
      }

      if (vMethod !== undefined) {
        this.setMethod(vMethod);
      }

      if (vResponseType !== undefined) {
        this.setResponseType(vResponseType);
      }

      this.setProhibitCaching(true); // Get the next sequence number for this request

      this.__seqNum__P_165_4 = ++qx.io.remote.Request.__seqNum__P_165_4;
    },

    /*
    *****************************************************************************
       EVENTS
    *****************************************************************************
    */
    events: {
      /** Fired when the Request object changes its state to 'created' */
      "created": "qx.event.type.Event",

      /** Fired when the Request object changes its state to 'configured' */
      "configured": "qx.event.type.Event",

      /** Fired when the Request object changes its state to 'sending' */
      "sending": "qx.event.type.Event",

      /** Fired when the Request object changes its state to 'receiving' */
      "receiving": "qx.event.type.Event",

      /**
       * Fired once the request has finished successfully. The event object
       * can be used to read the transferred data.
       */
      "completed": "qx.io.remote.Response",

      /** Fired when the pending request has been aborted. */
      "aborted": "qx.event.type.Event",

      /** Fired when the pending request fails. */
      "failed": "qx.io.remote.Response",

      /** Fired when the pending request times out. */
      "timeout": "qx.io.remote.Response"
    },

    /*
    *****************************************************************************
       STATICS
    *****************************************************************************
    */
    statics: {
      /*
      ---------------------------------------------------------------------------
        SEQUENCE NUMBER
      ---------------------------------------------------------------------------
      */

      /**
       * Sequence (id) number of a request, used to associate a response or error
       * with its initiating request.
       */
      __seqNum__P_165_4: 0,

      /**
       * Returns true if the given HTTP method allows a request body being transferred to the server.
       * This is currently POST and PUT. Other methods require their data being encoded into
       * the URL
       *
       * @param httpMethod {String} one of the values of the method property
       * @return {Boolean}
       */
      methodAllowsRequestBody: function methodAllowsRequestBody(httpMethod) {
        return httpMethod == "POST" || httpMethod == "PUT";
      }
    },

    /*
    *****************************************************************************
       PROPERTIES
    *****************************************************************************
    */
    properties: {
      /**
       * Target url to issue the request to.
       */
      url: {
        check: "String",
        init: ""
      },

      /**
       * Determines what type of request to issue (GET, POST, PUT, HEAD, DELETE).
       */
      method: {
        check: ["GET", "POST", "PUT", "HEAD", "DELETE"],
        apply: "_applyMethod",
        init: "GET"
      },

      /**
       * Set the request to asynchronous.
       */
      asynchronous: {
        check: "Boolean",
        init: true
      },

      /**
       * Set the data to be sent via this request
       */
      data: {
        check: "String",
        nullable: true
      },

      /**
       * Username to use for HTTP authentication.
       * Set to NULL if HTTP authentication is not used.
       */
      username: {
        check: "String",
        nullable: true
      },

      /**
       * Password to use for HTTP authentication.
       * Set to NULL if HTTP authentication is not used.
       */
      password: {
        check: "String",
        nullable: true
      },

      /**
       * The state that the request is in, while being processed.
       */
      state: {
        check: ["configured", "queued", "sending", "receiving", "completed", "aborted", "timeout", "failed"],
        init: "configured",
        apply: "_applyState",
        event: "changeState"
      },

      /**
       * Response type of request.
       *
       * The response type is a MIME type, default is text/plain. Other supported
       * MIME types are text/javascript, text/html, application/json,
       * application/xml.
       */
      responseType: {
        check: ["text/plain", "text/javascript", "application/json", "application/xml", "text/html"],
        init: "text/plain",
        apply: "_applyResponseType"
      },

      /**
       * Number of milliseconds before the request is being timed out.
       *
       * If this property is null, the timeout for the request comes is the
       * qx.io.remote.RequestQueue's property defaultTimeout.
       */
      timeout: {
        check: "Integer",
        nullable: true
      },

      /**
       * Prohibit request from being cached.
       *
       * Setting the value to <i>true</i> adds a parameter "nocache" to the
       * request URL with a value of the current time, as well as adding request
       * headers Pragma:no-cache and Cache-Control:no-cache.
       *
       * Setting the value to <i>false</i> removes the parameter and request
       * headers.
       *
       * As a special case, this property may be set to the string value
       * "no-url-params-on-post" which will prevent the nocache parameter from
       * being added to the URL if the POST method is used but will still add
       * the Pragma and Cache-Control headers.  This is useful if your backend
       * does nasty things like mixing parameters specified in the URL into
       * form fields in the POST request.  (One example of this nasty behavior
       * is known as "mixed mode" in Oracle, as described here:
       * http://docs.oracle.com/cd/B32110_01/web.1013/b28963/concept.htm#i1005684)
       */
      prohibitCaching: {
        check: function check(v) {
          return typeof v == "boolean" || v === "no-url-params-on-post";
        },
        init: true,
        apply: "_applyProhibitCaching"
      },

      /**
       * Indicate that the request is cross domain.
       *
       * A request is cross domain if the request's URL points to a host other than
       * the local host. This switches the concrete implementation that is used for
       * sending the request from qx.io.remote.transport.XmlHttp to
       * qx.io.remote.transport.Script, because only the latter can handle cross
       * domain requests.
       */
      crossDomain: {
        check: "Boolean",
        init: false
      },

      /**
       * Indicate that the request will be used for a file upload.
       *
       * The request will be used for a file upload.  This switches the concrete
       * implementation that is used for sending the request from
       * qx.io.remote.transport.XmlHttp to qx.io.remote.IFrameTransport, because only
       * the latter can handle file uploads.
       */
      fileUpload: {
        check: "Boolean",
        init: false
      },

      /**
       * The transport instance used for the request.
       *
       * This is necessary to be able to abort an asynchronous request.
       */
      transport: {
        check: "qx.io.remote.Exchange",
        nullable: true
      },

      /**
       * Use Basic HTTP Authentication.
       */
      useBasicHttpAuth: {
        check: "Boolean",
        init: false
      },

      /**
       * If true and the responseType property is set to "application/json", getContent() will
       * return a Javascript map containing the JSON contents, i. e. the result qx.lang.Json.parse().
       * If false, the raw string data will be returned and the parsing must be done manually.
       * This is useful for special JSON dialects / extensions which are not supported by
       * qx.lang.Json.
       *
       * Note that this is currently only respected by qx.io.remote.transport.XmlHttp, i. e.
       * if the transport used is the one using XMLHttpRequests. The other transports
       * do not support JSON parsing, so this property has no effect.
       */
      parseJson: {
        check: "Boolean",
        init: true
      }
    },

    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */
    members: {
      __requestHeaders__P_165_0: null,
      __urlParameters__P_165_1: null,
      __dataParameters__P_165_2: null,
      __formFields__P_165_3: null,
      __seqNum__P_165_4: null,

      /*
      ---------------------------------------------------------------------------
        CORE METHODS
      ---------------------------------------------------------------------------
      */

      /**
       * Schedule this request for transport to server.
       *
       * The request is added to the singleton class qx.io.remote.RequestQueue's
       * list of pending requests.
       *
       */
      send: function send() {
        qx.io.remote.RequestQueue.getInstance().add(this);
      },

      /**
       * Abort sending this request.
       *
       * The request is removed from the singleton class qx.io.remote.RequestQueue's
       * list of pending events. If the request haven't been scheduled this
       * method is a noop.
       *
       */
      abort: function abort() {
        qx.io.remote.RequestQueue.getInstance().abort(this);
      },

      /**
       * Abort sending this request if it has not already been aborted.
       *
       */
      reset: function reset() {
        switch (this.getState()) {
          case "sending":
          case "receiving":
            this.error("Aborting already sent request!");
          // no break

          case "queued":
            this.abort();
            break;
        }
      },

      /*
      ---------------------------------------------------------------------------
        STATE ALIASES
      ---------------------------------------------------------------------------
      */

      /**
       * Determine if this request is in the configured state.
       *
       * @return {Boolean} <true> if the request is in the configured state; <false> otherwise.
       */
      isConfigured: function isConfigured() {
        return this.getState() === "configured";
      },

      /**
       * Determine if this request is in the queued state.
       *
       * @return {Boolean} <true> if the request is in the queued state; <false> otherwise.
       */
      isQueued: function isQueued() {
        return this.getState() === "queued";
      },

      /**
       * Determine if this request is in the sending state.
       *
       * @return {Boolean} <true> if the request is in the sending state; <false> otherwise.
       */
      isSending: function isSending() {
        return this.getState() === "sending";
      },

      /**
       * Determine if this request is in the receiving state.
       *
       * @return {Boolean} <true> if the request is in the receiving state; <false> otherwise.
       */
      isReceiving: function isReceiving() {
        return this.getState() === "receiving";
      },

      /**
       * Determine if this request is in the completed state.
       *
       * @return {Boolean} <true> if the request is in the completed state; <false> otherwise.
       */
      isCompleted: function isCompleted() {
        return this.getState() === "completed";
      },

      /**
       * Determine if this request is in the aborted state.
       *
       * @return {Boolean} <true> if the request is in the aborted state; <false> otherwise.
       */
      isAborted: function isAborted() {
        return this.getState() === "aborted";
      },

      /**
       * Determine if this request is in the timeout state.
       *
       * @return {Boolean} <true> if the request is in the timeout state; <false> otherwise.
       */
      isTimeout: function isTimeout() {
        return this.getState() === "timeout";
      },

      /**
       * Determine if this request is in the failed state.
       *
       * @return {Boolean} <true> if the request is in the failed state; <false> otherwise.
       */
      isFailed: function isFailed() {
        return this.getState() === "failed";
      },

      /*
      ---------------------------------------------------------------------------
        EVENT HANDLER
      ---------------------------------------------------------------------------
      */

      /**
       * Dispatches a clone of the given event on this instance
       *
       * @param e {qx.event.type.Event} The original event
       */
      __forwardEvent__P_165_5: qx.event.GlobalError.observeMethod(function (e) {
        var clonedEvent = e.clone();
        clonedEvent.setTarget(this);
        this.dispatchEvent(clonedEvent);
      }),

      /**
       * Event handler called when the request enters the queued state.
       *
       * @param e {qx.event.type.Event} Event indicating state change
       */
      _onqueued: function _onqueued(e) {
        // Modify internal state
        this.setState("queued"); // Bubbling up

        this.__forwardEvent__P_165_5(e);
      },

      /**
       * Event handler called when the request enters the sending state.
       *
       * @param e {qx.event.type.Event} Event indicating state change
       */
      _onsending: function _onsending(e) {
        // Modify internal state
        this.setState("sending"); // Bubbling up

        this.__forwardEvent__P_165_5(e);
      },

      /**
       * Event handler called when the request enters the receiving state.
       *
       * @param e {qx.event.type.Event} Event indicating state change
       */
      _onreceiving: function _onreceiving(e) {
        // Modify internal state
        this.setState("receiving"); // Bubbling up

        this.__forwardEvent__P_165_5(e);
      },

      /**
       * Event handler called when the request enters the completed state.
       *
       * @param e {qx.event.type.Event} Event indicating state change
       */
      _oncompleted: function _oncompleted(e) {
        // Modify internal state
        this.setState("completed"); // Bubbling up

        this.__forwardEvent__P_165_5(e); // Automatically dispose after event completion


        this.dispose();
      },

      /**
       * Event handler called when the request enters the aborted state.
       *
       * @param e {qx.event.type.Event} Event indicating state change
       */
      _onaborted: function _onaborted(e) {
        // Modify internal state
        this.setState("aborted"); // Bubbling up

        this.__forwardEvent__P_165_5(e); // Automatically dispose after event completion


        this.dispose();
      },

      /**
       * Event handler called when the request enters the timeout state.
       *
       * @param e {qx.event.type.Event} Event indicating state change
       */
      _ontimeout: function _ontimeout(e) {
        /*
          // User's handler can block until timeout.
          switch(this.getState())
          {
            // If we're no longer running...
            case "completed":
            case "timeout":
            case "aborted":
            case "failed":
              // then don't bubble up the timeout event
              return;
          }
        */
        // Modify internal state
        this.setState("timeout"); // Bubbling up

        this.__forwardEvent__P_165_5(e); // Automatically dispose after event completion


        this.dispose();
      },

      /**
       * Event handler called when the request enters the failed state.
       *
       * @param e {qx.event.type.Event} Event indicating state change
       */
      _onfailed: function _onfailed(e) {
        // Modify internal state
        this.setState("failed"); // Bubbling up

        this.__forwardEvent__P_165_5(e); // Automatically dispose after event completion


        this.dispose();
      },

      /*
      ---------------------------------------------------------------------------
        APPLY ROUTINES
      ---------------------------------------------------------------------------
      */
      // property apply
      _applyState: function _applyState(value, old) {
        {
          if (qx.core.Environment.get("qx.debug.io.remote")) {
            this.debug("State: " + value);
          }
        }
      },
      // property apply
      _applyProhibitCaching: function _applyProhibitCaching(value, old) {
        if (!value) {
          this.removeParameter("nocache");
          this.removeRequestHeader("Pragma");
          this.removeRequestHeader("Cache-Control");
          return;
        } // If value isn't "no-url-params-on-post" or this isn't a POST request


        if (value !== "no-url-params-on-post" || this.getMethod() != "POST") {
          // ... then add a parameter to the URL to make it unique on each
          // request.  The actual id, "nocache" is irrelevant; it's the fact
          // that a (usually) different date is added to the URL on each request
          // that prevents caching.
          this.setParameter("nocache", new Date().valueOf());
        } else {
          // Otherwise, we don't want the nocache parameter in the URL.
          this.removeParameter("nocache");
        } // Add the HTTP 1.0 request to avoid use of a cache


        this.setRequestHeader("Pragma", "no-cache"); // Add the HTTP 1.1 request to avoid use of a cache

        this.setRequestHeader("Cache-Control", "no-cache");
      },
      // property apply
      _applyMethod: function _applyMethod(value, old) {
        if (qx.io.remote.Request.methodAllowsRequestBody(value)) {
          this.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        } else {
          this.removeRequestHeader("Content-Type");
        } // Re-test the prohibit caching property.  We may need to add or remove
        // the "nocache" parameter.  We explicitly call the _apply method since
        // it wouldn't be called normally when setting the value to its already
        // existant value.


        var prohibitCaching = this.getProhibitCaching();

        this._applyProhibitCaching(prohibitCaching, prohibitCaching);
      },
      // property apply
      _applyResponseType: function _applyResponseType(value, old) {
        this.setRequestHeader("X-Qooxdoo-Response-Type", value);
      },

      /*
      ---------------------------------------------------------------------------
        REQUEST HEADER
      ---------------------------------------------------------------------------
      */

      /**
       * Add a request header to the request.
       *
       * Example: request.setRequestHeader("Content-Type", "text/html")
       *
       * Please note: Some browsers, such as Safari 3 and 4, will capitalize
       * header field names. This is in accordance with RFC 2616[1], which states
       * that HTTP 1.1 header names are case-insensitive, so your server backend
       * should be case-agnostic when dealing with request headers.
       *
       * [1]<a href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec4.html#sec4.2">RFC 2616: HTTP Message Headers</a>
       *
       * @param vId {String} The identifier to use for this added header
       * @param vValue {String} The value to use for this added header
       */
      setRequestHeader: function setRequestHeader(vId, vValue) {
        this.__requestHeaders__P_165_0[vId] = vValue;
      },

      /**
       * Remove a previously-added request header
       *
       * @param vId {String} The id of the header to be removed
       */
      removeRequestHeader: function removeRequestHeader(vId) {
        delete this.__requestHeaders__P_165_0[vId];
      },

      /**
       * Retrieve the value of a header which was previously set
       *
       * @param vId {String} The id of the header value being requested
       * @return {String} The value of the header with the specified id
       */
      getRequestHeader: function getRequestHeader(vId) {
        return this.__requestHeaders__P_165_0[vId] || null;
      },

      /**
       * Return the object containing all of the headers which have been added.
       *
       * @return {Object} The returned object has as its property names each of the ids of headers
       *     which have been added, and as each property value, the value of the
       *     property corresponding to that id.
       */
      getRequestHeaders: function getRequestHeaders() {
        return this.__requestHeaders__P_165_0;
      },

      /*
      ---------------------------------------------------------------------------
        PARAMETERS
      ---------------------------------------------------------------------------
      */

      /**
       * Add a parameter to the request.
       *
       * @param vId {String}
       *   String identifier of the parameter to add.
       *
       * @param vValue {var}
       *   Value of parameter. May be a string (for one parameter) or an array
       *   of strings (for setting multiple parameter values with the same
       *   parameter name).
       *
       * @param bAsData {Boolean}
       *   If <i>false</i>, add the parameter to the URL.  If <i>true</i> then
       *   instead the parameters added by calls to this method will be combined
       *   into a string added as the request data, as if the entire set of
       *   parameters had been pre-build and passed to setData().
       *
       * Note: Parameters requested to be sent as data will be silently dropped
       *       if data is manually added via a call to setData().
       *
       * Note: Some transports, e.g. Script, do not support passing parameters
       *       as data.
       *
       */
      setParameter: function setParameter(vId, vValue, bAsData) {
        if (bAsData) {
          this.__dataParameters__P_165_2[vId] = vValue;
        } else {
          this.__urlParameters__P_165_1[vId] = vValue;
        }
      },

      /**
       * Remove a parameter from the request.
       *
       * @param vId {String}
       *   Identifier of the parameter to remove.
       *
       * @param bFromData {Boolean}
       *   If <i>false</i> then remove the parameter of the URL parameter list.
       *   If <i>true</i> then remove it from the list of parameters to be sent
       *   as request data.
       *
       */
      removeParameter: function removeParameter(vId, bFromData) {
        if (bFromData) {
          delete this.__dataParameters__P_165_2[vId];
        } else {
          delete this.__urlParameters__P_165_1[vId];
        }
      },

      /**
       * Get a parameter in the request.
       *
       * @param vId {String}
       *   Identifier of the parameter to get.
       *
       * @param bFromData {Boolean}
       *   If <i>false</i> then retrieve the parameter from the URL parameter
       *   list. If <i>true</i> then retrieve it from the list of parameters to
       *   be sent as request data.
       *
       * @return {var}
       *   The requested parameter value
       *
       */
      getParameter: function getParameter(vId, bFromData) {
        if (bFromData) {
          return this.__dataParameters__P_165_2[vId] || null;
        } else {
          return this.__urlParameters__P_165_1[vId] || null;
        }
      },

      /**
       * Returns the object containing all parameters for the request.
       *
       * @param bFromData {Boolean}
       *   If <i>false</i> then retrieve the URL parameter list.
       *   If <i>true</i> then retrieve the data parameter list.
       *
       * @return {Object}
       *   The returned object has as its property names each of the ids of
       *   parameters which have been added, and as each property value, the
       *   value of the property corresponding to that id.
       */
      getParameters: function getParameters(bFromData) {
        return bFromData ? this.__dataParameters__P_165_2 : this.__urlParameters__P_165_1;
      },

      /*
      ---------------------------------------------------------------------------
        FORM FIELDS
      ---------------------------------------------------------------------------
      */

      /**
       * Add a form field to the POST request.
       *
       * NOTE: Adding any programmatic form fields using this method will switch the
       *       Transport implementation to IframeTransport.
       *
       * NOTE: Use of these programmatic form fields disallow use of synchronous
       *       requests and cross-domain requests.  Be sure that you do not need
       *       those features when setting these programmatic form fields.
       *
       * @param vId {String} String identifier of the form field to add.
       * @param vValue {String} Value of form field
       */
      setFormField: function setFormField(vId, vValue) {
        this.__formFields__P_165_3[vId] = vValue;
      },

      /**
       * Remove a form field from the POST request.
       *
       * @param vId {String} Identifier of the form field to remove.
       */
      removeFormField: function removeFormField(vId) {
        delete this.__formFields__P_165_3[vId];
      },

      /**
       * Get a form field in the POST request.
       *
       * @param vId {String} Identifier of the form field to get.
       * @return {String|null} Value of form field or <code>null</code> if no value
       *    exists for the passed identifier.
       */
      getFormField: function getFormField(vId) {
        return this.__formFields__P_165_3[vId] || null;
      },

      /**
       * Returns the object containing all form fields for the POST request.
       *
       * @return {Object} The returned object has as its property names each of the ids of
       *     form fields which have been added, and as each property value, the value
       *     of the property corresponding to that id.
       */
      getFormFields: function getFormFields() {
        return this.__formFields__P_165_3;
      },

      /**
       * Obtain the sequence (id) number used for this request
       *
       * @return {Integer} The sequence number of this request
       */
      getSequenceNumber: function getSequenceNumber() {
        return this.__seqNum__P_165_4;
      }
    },

    /*
    *****************************************************************************
       DESTRUCTOR
    *****************************************************************************
    */
    destruct: function destruct() {
      this.setTransport(null);
      this.__requestHeaders__P_165_0 = this.__urlParameters__P_165_1 = this.__dataParameters__P_165_2 = this.__formFields__P_165_3 = null;
    }
  });
  qx.io.remote.Request.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.core.Environment": {
        "defer": "load",
        "usage": "dynamic",
        "require": true
      },
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.core.Object": {
        "construct": true,
        "require": true
      },
      "qx.core.IDisposable": {
        "require": true
      },
      "qx.event.Timer": {
        "construct": true
      },
      "qx.bom.client.Transport": {
        "require": true
      },
      "qx.io.remote.Exchange": {},
      "qx.lang.Array": {},
      "qx.event.Registration": {},
      "qx.event.type.Event": {}
    },
    "environment": {
      "provided": [],
      "required": {
        "io.maxrequests": {
          "load": true,
          "className": "qx.bom.client.Transport"
        },
        "qx.debug.io.remote": {}
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2004-2008 1&1 Internet AG, Germany, http://www.1und1.de
       2006 Derrell Lipman
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Sebastian Werner (wpbasti)
       * Andreas Ecker (ecker)
       * Derrell Lipman (derrell)
  
  ************************************************************************ */

  /**
   * Handles scheduling of requests to be sent to a server.
   *
   * This class is a singleton and is used by qx.io.remote.Request to schedule its
   * requests. It should not be used directly.
   *
   * NOTE: Instances of this class must be disposed of after use
   *
   * @internal
   */
  qx.Class.define("qx.io.remote.RequestQueue", {
    type: "singleton",
    extend: qx.core.Object,
    implement: [qx.core.IDisposable],

    /*
    *****************************************************************************
       CONSTRUCTOR
    *****************************************************************************
    */
    construct: function construct() {
      qx.core.Object.constructor.call(this);
      this.__queue__P_166_0 = [];
      this.__active__P_166_1 = [];
      this.__totalRequests__P_166_2 = 0; // timeout handling

      this.__timer__P_166_3 = new qx.event.Timer(500);

      this.__timer__P_166_3.addListener("interval", this._oninterval, this);
    },

    /*
    *****************************************************************************
       PROPERTIES
    *****************************************************************************
    */
    properties: {
      /**
       * Indicates whether queue is enabled or not.
       */
      enabled: {
        init: true,
        check: "Boolean",
        apply: "_applyEnabled"
      },

      /**
       * The maximum number of total requests.
       */
      maxTotalRequests: {
        check: "Integer",
        nullable: true
      },

      /**
       * Maximum number of parallel requests.
       */
      maxConcurrentRequests: {
        check: "Integer",
        init: qx.core.Environment.get("io.maxrequests")
      },

      /**
       * Default timeout for remote requests in milliseconds.
       */
      defaultTimeout: {
        check: "Integer",
        init: 5000
      }
    },

    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */
    members: {
      __queue__P_166_0: null,
      __active__P_166_1: null,
      __totalRequests__P_166_2: null,
      __timer__P_166_3: null,

      /*
      ---------------------------------------------------------------------------
        QUEUE HANDLING
      ---------------------------------------------------------------------------
      */

      /**
       * Get a list of queued requests
       *
       * @return {qx.io.remote.Request[]} The list of queued requests
       */
      getRequestQueue: function getRequestQueue() {
        return this.__queue__P_166_0;
      },

      /**
       * Get a list of active queued requests, each one wrapped in an instance of
       * {@link qx.io.remote.Exchange}
       *
       * @return {qx.io.remote.Exchange[]} The list of active queued requests, each one
       *   wrapped in an instance of {@link qx.io.remote.Exchange}
       */
      getActiveQueue: function getActiveQueue() {
        return this.__active__P_166_1;
      },

      /**
       * Generates debug output
       */
      _debug: function _debug() {
        {
          if (qx.core.Environment.get("qx.debug.io.remote")) {
            // Debug output
            var vText = this.__active__P_166_1.length + "/" + (this.__queue__P_166_0.length + this.__active__P_166_1.length);
            this.debug("Progress: " + vText);
            window.status = "Request-Queue Progress: " + vText;
          }
        }
      },

      /**
       * Checks the queue if any request is left to send and uses the transport
       * layer to send the open requests.
       * This method calls itself until every request in the queue is send.
       *
       */
      _check: function _check() {
        // Debug output
        this._debug(); // Check queues and stop timer if not needed anymore


        if (this.__active__P_166_1.length == 0 && this.__queue__P_166_0.length == 0) {
          this.__timer__P_166_3.stop();
        } // Checking if enabled


        if (!this.getEnabled()) {
          return;
        } // Checking active queue fill


        if (this.__queue__P_166_0.length == 0 || this.__queue__P_166_0[0].isAsynchronous() && this.__active__P_166_1.length >= this.getMaxConcurrentRequests()) {
          return;
        } // Checking number of total requests


        if (this.getMaxTotalRequests() != null && this.__totalRequests__P_166_2 >= this.getMaxTotalRequests()) {
          return;
        }

        var vRequest = this.__queue__P_166_0.shift();

        var vTransport = new qx.io.remote.Exchange(vRequest); // Increment counter

        this.__totalRequests__P_166_2++; // Add to active queue

        this.__active__P_166_1.push(vTransport); // Debug output


        this._debug(); // Establish event connection between qx.io.remote.Exchange and me.


        vTransport.addListener("sending", this._onsending, this);
        vTransport.addListener("receiving", this._onreceiving, this);
        vTransport.addListener("completed", this._oncompleted, this);
        vTransport.addListener("aborted", this._oncompleted, this);
        vTransport.addListener("timeout", this._oncompleted, this);
        vTransport.addListener("failed", this._oncompleted, this); // Store send timestamp

        vTransport._start = new Date().valueOf(); // Send

        vTransport.send(); // Retry

        if (this.__queue__P_166_0.length > 0) {
          this._check();
        }
      },

      /**
       * Removes a transport object from the active queue and disposes the
       * transport object in order stop the request.
       *
       * @param vTransport {qx.io.remote.Exchange} Transport object
       */
      _remove: function _remove(vTransport) {
        // Remove from active transports
        qx.lang.Array.remove(this.__active__P_166_1, vTransport); // Dispose transport object

        vTransport.dispose(); // Check again

        this._check();
      },

      /*
      ---------------------------------------------------------------------------
        EVENT HANDLING
      ---------------------------------------------------------------------------
      */
      __activeCount__P_166_4: 0,

      /**
       * Listens for the "sending" event of the transport object and increases
       * the counter for active requests.
       *
       * @param e {qx.event.type.Event} event object
       */
      _onsending: function _onsending(e) {
        {
          if (qx.core.Environment.get("qx.debug.io.remote")) {
            this.__activeCount__P_166_4++;
            e.getTarget()._counted = true;
            this.debug("ActiveCount: " + this.__activeCount__P_166_4);
          }
        }

        e.getTarget().getRequest()._onsending(e);
      },

      /**
       * Listens for the "receiving" event of the transport object and delegate
       * the event to the current request object.
       *
       * @param e {qx.event.type.Event} event object
       */
      _onreceiving: function _onreceiving(e) {
        e.getTarget().getRequest()._onreceiving(e);
      },

      /**
       * Listens for the "completed" event of the transport object and decreases
       * the counter for active requests.
       *
       * @param e {qx.event.type.Event} event object
       */
      _oncompleted: function _oncompleted(e) {
        {
          if (qx.core.Environment.get("qx.debug.io.remote")) {
            if (e.getTarget()._counted) {
              this.__activeCount__P_166_4--;
              this.debug("ActiveCount: " + this.__activeCount__P_166_4);
            }
          }
        } // delegate the event to the handler method of the request depending
        // on the current type of the event ( completed|aborted|timeout|failed )

        var request = e.getTarget().getRequest();
        var requestHandler = "_on" + e.getType(); // remove the request from the queue,
        // keep local reference, see [BUG #4422]

        this._remove(e.getTarget()); // It's possible that the request handler can fail, possibly due to
        // being sent garbage data. We want to prevent that from crashing
        // the program, but instead display an error.


        try {
          if (request[requestHandler]) {
            request[requestHandler](e);
          }
        } catch (ex) {
          this.error("Request " + request + " handler " + requestHandler + " threw an error: ", ex); // Issue an "aborted" event so the application gets notified.
          // If that too fails, or if there's no "aborted" handler, ignore it.

          try {
            if (request["_onaborted"]) {
              var event = qx.event.Registration.createEvent("aborted", qx.event.type.Event);
              request["_onaborted"](event);
            }
          } catch (ex1) {}
        }
      },

      /*
      ---------------------------------------------------------------------------
        TIMEOUT HANDLING
      ---------------------------------------------------------------------------
      */

      /**
       * Listens for the "interval" event of the transport object and checks
       * if the active requests are timed out.
       *
       * @param e {qx.event.type.Event} event object
       */
      _oninterval: function _oninterval(e) {
        var vActive = this.__active__P_166_1;

        if (vActive.length == 0) {
          this.__timer__P_166_3.stop();

          return;
        }

        var vCurrent = new Date().valueOf();
        var vTransport;
        var vRequest;
        var vDefaultTimeout = this.getDefaultTimeout();
        var vTimeout;
        var vTime;

        for (var i = vActive.length - 1; i >= 0; i--) {
          vTransport = vActive[i];
          vRequest = vTransport.getRequest();

          if (vRequest.isAsynchronous()) {
            vTimeout = vRequest.getTimeout(); // if timer is disabled...

            if (vTimeout == 0) {
              // then ignore it.
              continue;
            }

            if (vTimeout == null) {
              vTimeout = vDefaultTimeout;
            }

            vTime = vCurrent - vTransport._start;

            if (vTime > vTimeout) {
              this.warn("Timeout: transport " + vTransport.toHashCode());
              this.warn(vTime + "ms > " + vTimeout + "ms");
              vTransport.timeout();
            }
          }
        }
      },

      /*
      ---------------------------------------------------------------------------
        MODIFIERS
      ---------------------------------------------------------------------------
      */
      // property apply
      _applyEnabled: function _applyEnabled(value, old) {
        if (value) {
          this._check();
        }

        this.__timer__P_166_3.setEnabled(value);
      },

      /*
      ---------------------------------------------------------------------------
        CORE METHODS
      ---------------------------------------------------------------------------
      */

      /**
       * Add the request to the pending requests queue.
       *
       * @param vRequest {var} The request
       */
      add: function add(vRequest) {
        vRequest.setState("queued");

        if (vRequest.isAsynchronous()) {
          this.__queue__P_166_0.push(vRequest);
        } else {
          this.__queue__P_166_0.unshift(vRequest);
        }

        this._check();

        if (this.getEnabled()) {
          this.__timer__P_166_3.start();
        }
      },

      /**
       * Remove the request from the pending requests queue.
       *
       *  The underlying transport of the request is forced into the aborted
       *  state ("aborted") and listeners of the "aborted"
       *  signal are notified about the event. If the request isn't in the
       *  pending requests queue, this method is a noop.
       *
       * @param vRequest {var} The request
       */
      abort: function abort(vRequest) {
        var vTransport = vRequest.getTransport();

        if (vTransport) {
          vTransport.abort();
        } else if (this.__queue__P_166_0.includes(vRequest)) {
          qx.lang.Array.remove(this.__queue__P_166_0, vRequest);
        }
      }
    },

    /*
    *****************************************************************************
       DESTRUCTOR
    *****************************************************************************
    */
    destruct: function destruct() {
      this._disposeArray("__active__P_166_1");

      this._disposeObjects("__timer__P_166_3");

      this.__queue__P_166_0 = null;
    }
  });
  qx.io.remote.RequestQueue.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.core.Object": {
        "construct": true,
        "require": true
      },
      "qx.io.remote.Request": {},
      "qx.lang.Json": {},
      "qx.io.remote.Exchange": {},
      "qx.lang.Type": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2006 STZ-IDA, Germany, http://www.stz-ida.de
       2006 Derrell Lipman
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Andreas Junghans (lucidcake)
       * Derrell Lipman (derrell)
  
  ************************************************************************ */

  /**
   * Provides a Remote Procedure Call (RPC) implementation.
   *
   * Each instance of this class represents a "Service". These services can
   * correspond to various concepts on the server side (depending on the
   * programming language/environment being used), but usually, a service means
   * a class on the server.
   *
   * In case multiple instances of the same service are needed, they can be
   * distinguished by ids. If such an id is specified, the server routes all
   * calls to a service that have the same id to the same server-side instance.
   *
   * When calling a server-side method, the parameters and return values are
   * converted automatically. Supported types are int (and Integer), double
   * (and Double), String, Date, Map, and JavaBeans. Beans must have a default
   * constructor on the server side and are represented by simple JavaScript
   * objects on the client side (used as associative arrays with keys matching
   * the server-side properties). Beans can also be nested, but be careful not to
   * create circular references! There are no checks to detect these (which would
   * be expensive), so you as the user are responsible for avoiding them.
   *
   * A simple example:
   * <pre class='javascript'>
   *   function callRpcServer ()
   *   {
   *     var rpc = new qx.io.remote.Rpc();
   *     rpc.setTimeout(10000);
   *     rpc.setUrl("http://127.0.0.1:8007");
   *     rpc.setServiceName("qooxdoo.admin");
   *
   *     // call a remote procedure -- takes no arguments, returns a string
   *     var that = this;
   *     this.RpcRunning = rpc.callAsync(
   *       function(result, ex, id)
   *       {
   *         that.RpcRunning = null;
   *         if (ex == null) {
   *             alert(result);
   *         } else {
   *             alert("Async(" + id + ") exception: " + ex);
   *         }
   *       },
   *       "fss.getBaseDir");
   *   }
   * </pre>
   * __fss.getBaseDir__ is the remote procedure in this case, potential arguments
   * would be listed after the procedure name.
   * <p>
   * Passing data from the client (qooxdoo) side is demonstrated in the
   * qooxdoo-contrib project RpcExample. There are three ways to issue a remote
   * procedure call: synchronously (qx.io.remote.Rpc.callSync -- dangerous
   * because it blocks the whole browser, not just your application, so is
   * highly discouraged); async with results via a callback function
   * (qx.io.remote.Rpc.callAsync) and async with results via an event listener
   * (qx.io.remote.Rpc.callAsyncListeners).
   * <p>
   * @ignore(qx.core.ServerSettings.*)
  */
  qx.Class.define("qx.io.remote.Rpc", {
    extend: qx.core.Object,

    /*
    *****************************************************************************
       CONSTRUCTOR
    *****************************************************************************
    */

    /**
     * @param url {String}            identifies the url where the service
     *                                is found.  Note that if the url is to
     *                                a domain (server) other than where the
     *                                qooxdoo script came from, i.e. it is
     *                                cross-domain, then you must also call
     *                                the setCrossDomain(true) method to
     *                                enable the ScriptTransport instead of
     *                                the XmlHttpTransport, since the latter
     *                                can not handle cross-domain requests.
     *
     * @param serviceName {String}    identifies the service. For the Java
     *                                implementation, this is the fully
     *                                qualified name of the class that offers
     *                                the service methods
     *                                (e.g. "my.pkg.MyService").
     */
    construct: function construct(url, serviceName) {
      qx.core.Object.constructor.call(this);

      if (url !== undefined) {
        this.setUrl(url);
      }

      if (serviceName != null) {
        this.setServiceName(serviceName);
      }

      if (qx.core.ServerSettings) {
        this.__currentServerSuffix__P_168_0 = qx.core.ServerSettings.serverPathSuffix;
      }
    },

    /*
    *****************************************************************************
       EVENTS
    *****************************************************************************
    */
    events: {
      /**
       * Fired when call is completed.
       */
      "completed": "qx.event.type.Event",

      /**
       * Fired when call aborted.
       */
      "aborted": "qx.event.type.Event",

      /**
       * Fired when call failed.
       */
      "failed": "qx.event.type.Event",

      /**
       * Fired when call timed out.
       */
      "timeout": "qx.event.type.Event"
    },

    /*
    *****************************************************************************
       STATICS
    *****************************************************************************
    */
    statics: {
      /**
       * Origins of errors
       */
      origin: {
        server: 1,
        application: 2,
        transport: 3,
        local: 4
      },

      /**
       *  Locally-detected errors
       */
      localError: {
        timeout: 1,
        abort: 2,
        nodata: 3
      },

      /**
       * Boolean flag which controls the stringification of date objects.
       * <code>null</code> for the default behavior, acts like false
       * <code>true</code> for stringifying dates the old, qooxdoo specific way
       * <code>false</code> using the native toJSON of date objects.
       *
       * When enabled, dates are converted to and parsed from
       * a literal that complies to the format
       *
       * <code>new Date(Date.UTC(year,month,day,hour,min,sec,ms))</code>
       *
       * The server can fairly easily parse this in its JSON
       * implementation by stripping off "new Date(Date.UTC("
       * from the beginning of the string, and "))" from the
       * end of the string. What remains is the set of
       * comma-separated date components, which are also very
       * easy to parse.
       *
       * The work-around compensates for the fact that while the
       * Date object is a primitive type in Javascript, the
       * specification neglects to provide a literal form for it.
       */
      CONVERT_DATES: null,

      /**
       * Boolean flag which controls whether to expect and verify a JSON
       * response.
       *
       * Should be <code>true</code> when backend returns valid JSON.
       *
       * Date literals are parsed when CONVERT_DATES is <code>true</code>
       * and comply to the format
       *
       * <code>"new Date(Date.UTC(year,month,day,hour,min,sec,ms))"</code>
       *
       * Note the surrounding quotes that encode the literal as string.
       *
       * Using valid JSON is recommended, because it allows to use
       * {@link qx.lang.Json#parse} for parsing. {@link qx.lang.Json#parse}
       * is preferred over the potentially insecure <code>eval</code>.
       */
      RESPONSE_JSON: null,

      /**
       * Creates an URL for talking to a local service. A local service is one that
       * lives in the same application as the page calling the service. For backends
       * that don't support this auto-generation, this method returns null.
       *
       * @param instanceId {String ? null} an optional identifier for the
       *                                   server side instance that should be
       *                                   used. All calls to the same service
       *                                   with the same instance id are
       *                                   routed to the same object instance
       *                                   on the server. The instance id can
       *                                   also be used to provide additional
       *                                   data for the service instantiation
       *                                   on the server.
       * @return {String} the url.
       */
      makeServerURL: function makeServerURL(instanceId) {
        var retVal = null;

        if (qx.core.ServerSettings) {
          retVal = qx.core.ServerSettings.serverPathPrefix + "/.qxrpc" + qx.core.ServerSettings.serverPathSuffix;

          if (instanceId != null) {
            retVal += "?instanceId=" + instanceId;
          }
        }

        return retVal;
      }
    },

    /*
    *****************************************************************************
       PROPERTIES
    *****************************************************************************
    */
    properties: {
      /*
      ---------------------------------------------------------------------------
        PROPERTIES
      ---------------------------------------------------------------------------
      */

      /** The timeout for asynchronous calls in milliseconds. */
      timeout: {
        check: "Integer",
        nullable: true
      },

      /**
       * Indicate that the request is cross domain.
       *
       * A request is cross domain if the request's URL points to a host other
       * than the local host. This switches the concrete implementation that is
       * used for sending the request from qx.io.remote.transport.XmlHttp to
       * qx.io.remote.transport.Script because only the latter can handle cross
       * domain requests.
       */
      crossDomain: {
        check: "Boolean",
        init: false
      },

      /** The URL at which the service is located. */
      url: {
        check: "String",
        nullable: true
      },

      /** The service name.  */
      serviceName: {
        check: "String",
        nullable: true
      },

      /**
       * Data sent as "out of band" data in the request to the server.  The
       * format of the data is opaque to RPC and may be recognized only by
       * particular servers It is up to the server to decide what to do with
       * it: whether to ignore it, handle it locally before calling the
       * specified method, or pass it on to the method.  This server data is
       * not sent to the server if it has been set to 'null'.
       */
      serverData: {
        check: "Object",
        nullable: true
      },

      /**
       * Username to use for HTTP authentication. Null if HTTP authentication
       * is not used.
       */
      username: {
        check: "String",
        nullable: true
      },

      /**
       * Password to use for HTTP authentication. Null if HTTP authentication
       * is not used.
       */
      password: {
        check: "String",
        nullable: true
      },

      /**
        Use Basic HTTP Authentication
      */
      useBasicHttpAuth: {
        check: "Boolean",
        nullable: true
      },

      /**
       *
       * Whether to use the original qooxdoo RPC protocol or the
       * now-standardized Version 2 protocol.  Defaults to the original qooxdoo
       * protocol for backward compatibility.
       *
       * Valid values are "qx1" and "2.0".
       */
      protocol: {
        init: "2.0",
        check: function check(val) {
          return val == "qx1" || val == "2.0";
        }
      }
    },

    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */
    members: {
      __previousServerSuffix__P_168_1: null,
      __currentServerSuffix__P_168_0: null,

      /**
       * Factory method to create a request object. By default, a POST request
       * will be made, and the expected response type will be
       * "application/json". Classes extending this one may override this method
       * to obtain a Request object with different parameters.
       *
       * @return {qx.io.remote.Request}
       */
      createRequest: function createRequest() {
        return new qx.io.remote.Request(this.getUrl(), "POST", "application/json");
      },

      /**
       * Factory method to create the object containing the remote procedure
       * call data. By default, a qooxdoo-style RPC request is built, which
       * contains the following members: "service", "method", "id", and
       * "params". If a different style of RPC request is desired, a class
       * extending this one may override this method.
       *
       * @param id {Integer}
       *   The unique sequence number of this request.
       *
       * @param method {String}
       *   The name of the method to be called
       *
       * @param parameters {Array}
       *   An array containing the arguments to the called method.
       *
       * @param serverData {var}
       *   "Out-of-band" data to be provided to the server.
       *
       * @return {Object}
       *   The object to be converted to JSON and passed to the JSON-RPC
       *   server.
       */
      createRpcData: function createRpcData(id, method, parameters, serverData) {
        var requestObject;
        var service; // Create a protocol-dependent request object

        if (this.getProtocol() == "qx1") {
          // Create a qooxdoo-modified version 1.0 rpc data object
          requestObject = {
            "service": method == "refreshSession" ? null : this.getServiceName(),
            "method": method,
            "id": id,
            "params": parameters
          }; // Only add the server_data member if there is actually server data

          if (serverData) {
            requestObject.server_data = serverData;
          }
        } else {
          // If there's a service name, we'll prepend it to the method name
          service = this.getServiceName();

          if (service && service != "") {
            service += ".";
          } else {
            service = "";
          } // Create a standard version 2.0 rpc data object


          requestObject = {
            "jsonrpc": "2.0",
            "method": service + method,
            "id": id,
            "params": parameters
          };
        }

        return requestObject;
      },

      /**
       * Internal RPC call method
       *
       * @lint ignoreDeprecated(eval)
       *
       * @param args {Array}
       *   array of arguments
       *
       * @param callType {Integer}
       *   0 = sync,
       *   1 = async with handler,
       *   2 = async event listeners
       *
       * @param refreshSession {Boolean}
       *   whether a new session should be requested
       *
       * @return {var} the method call reference.
       * @throws {Error} An error.
       */
      _callInternal: function _callInternal(args, callType, refreshSession) {
        var self = this;
        var offset = callType == 0 ? 0 : 1;
        var whichMethod = refreshSession ? "refreshSession" : args[offset];
        var handler = args[0];
        var argsArray = [];
        var eventTarget = this;
        var protocol = this.getProtocol();

        for (var i = offset + 1; i < args.length; ++i) {
          argsArray.push(args[i]);
        }

        var req = this.createRequest(); // Get any additional out-of-band data to be sent to the server

        var serverData = this.getServerData(); // Create the request object

        var rpcData = this.createRpcData(req.getSequenceNumber(), whichMethod, argsArray, serverData);
        req.setCrossDomain(this.getCrossDomain());

        if (this.getUsername()) {
          req.setUseBasicHttpAuth(this.getUseBasicHttpAuth());
          req.setUsername(this.getUsername());
          req.setPassword(this.getPassword());
        }

        req.setTimeout(this.getTimeout());
        var ex = null;
        var id = null;
        var result = null;
        var response = null;

        var handleRequestFinished = function handleRequestFinished(eventType, eventTarget) {
          switch (callType) {
            case 0:
              // sync
              break;

            case 1:
              // async with handler function
              try {
                handler(result, ex, id);
              } catch (e) {
                eventTarget.error("rpc handler threw an error: id=" + id + " result=" + qx.lang.Json.stringify(result) + " ex=" + qx.lang.Json.stringify(ex), e);
              }

              break;

            case 2:
              // async with event listeners
              // Dispatch the event to our listeners.
              if (!ex) {
                eventTarget.fireDataEvent(eventType, response);
              } else {
                // Add the id to the exception
                ex.id = id;

                if (args[0]) // coalesce
                  {
                    // They requested that we coalesce all failure types to
                    // "failed"
                    eventTarget.fireDataEvent("failed", ex);
                  } else {
                  // No coalese so use original event type
                  eventTarget.fireDataEvent(eventType, ex);
                }
              }

          }
        };

        var addToStringToObject = function addToStringToObject(obj) {
          if (protocol == "qx1") {
            obj.toString = function () {
              switch (obj.origin) {
                case qx.io.remote.Rpc.origin.server:
                  return "Server error " + obj.code + ": " + obj.message;

                case qx.io.remote.Rpc.origin.application:
                  return "Application error " + obj.code + ": " + obj.message;

                case qx.io.remote.Rpc.origin.transport:
                  return "Transport error " + obj.code + ": " + obj.message;

                case qx.io.remote.Rpc.origin.local:
                  return "Local error " + obj.code + ": " + obj.message;

                default:
                  return "UNEXPECTED origin " + obj.origin + " error " + obj.code + ": " + obj.message;
              }
            };
          } else // protocol == "2.0"
            {
              obj.toString = function () {
                var ret;
                ret = "Error " + obj.code + ": " + obj.message;

                if (obj.data) {
                  ret += " (" + obj.data + ")";
                }

                return ret;
              };
            }
        };

        var makeException = function makeException(origin, code, message) {
          var ex = new Object();

          if (protocol == "qx1") {
            ex.origin = origin;
          }

          ex.code = code;
          ex.message = message;
          addToStringToObject(ex);
          return ex;
        };

        req.addListener("failed", function (evt) {
          var code = evt.getStatusCode();
          ex = makeException(qx.io.remote.Rpc.origin.transport, code, qx.io.remote.Exchange.statusCodeToString(code));
          id = this.getSequenceNumber();
          handleRequestFinished("failed", eventTarget);
        });
        req.addListener("timeout", function (evt) {
          this.debug("TIMEOUT OCCURRED");
          ex = makeException(qx.io.remote.Rpc.origin.local, qx.io.remote.Rpc.localError.timeout, "Local time-out expired for " + whichMethod);
          id = this.getSequenceNumber();
          handleRequestFinished("timeout", eventTarget);
        });
        req.addListener("aborted", function (evt) {
          ex = makeException(qx.io.remote.Rpc.origin.local, qx.io.remote.Rpc.localError.abort, "Aborted " + whichMethod);
          id = this.getSequenceNumber();
          handleRequestFinished("aborted", eventTarget);
        });
        req.addListener("completed", function (evt) {
          response = evt.getContent(); // server may have reset, giving us no data on our requests

          if (response === null) {
            ex = makeException(qx.io.remote.Rpc.origin.local, qx.io.remote.Rpc.localError.nodata, "No data in response to " + whichMethod);
            id = this.getSequenceNumber();
            handleRequestFinished("failed", eventTarget);
            return;
          } // Parse. Skip when response is already an object
          // because the script transport was used.


          if (!qx.lang.Type.isObject(response)) {
            // Handle converted dates
            if (self._isConvertDates()) {
              // Parse as JSON and revive date literals
              if (self._isResponseJson()) {
                response = qx.lang.Json.parse(response, function (key, value) {
                  if (value && typeof value === "string") {
                    if (value.indexOf("new Date(Date.UTC(") >= 0) {
                      var m = value.match(/new Date\(Date.UTC\((\d+),(\d+),(\d+),(\d+),(\d+),(\d+),(\d+)\)\)/);
                      return new Date(Date.UTC(m[1], m[2], m[3], m[4], m[5], m[6], m[7]));
                    }
                  }

                  return value;
                }); // Eval
              } else {
                response = response && response.length > 0 ? eval('(' + response + ')') : null;
              } // No special date handling required, JSON assumed

            } else {
              response = qx.lang.Json.parse(response);
            }
          }

          id = response["id"];

          if (id != this.getSequenceNumber()) {
            this.warn("Received id (" + id + ") does not match requested id " + "(" + this.getSequenceNumber() + ")!");
          } // Determine if an error was returned. Assume no error, initially.


          var eventType = "completed";
          var exTest = response["error"];

          if (exTest != null) {
            // There was an error
            result = null;
            addToStringToObject(exTest);
            ex = exTest; // Change the event type

            eventType = "failed";
          } else {
            result = response["result"];

            if (refreshSession) {
              result = eval("(" + result + ")");
              var newSuffix = qx.core.ServerSettings.serverPathSuffix;

              if (self.__currentServerSuffix__P_168_0 != newSuffix) {
                self.__previousServerSuffix__P_168_1 = self.__currentServerSuffix__P_168_0;
                self.__currentServerSuffix__P_168_0 = newSuffix;
              }

              self.setUrl(self.fixUrl(self.getUrl()));
            }
          }

          handleRequestFinished(eventType, eventTarget);
        }); // Provide a replacer when convert dates is enabled

        var replacer = null;

        if (this._isConvertDates()) {
          replacer = function replacer(key, value) {
            // The value passed in is of type string, because the Date's
            // toJson gets applied before. Get value from containing object.
            value = this[key];

            if (qx.lang.Type.isDate(value)) {
              var dateParams = value.getUTCFullYear() + "," + value.getUTCMonth() + "," + value.getUTCDate() + "," + value.getUTCHours() + "," + value.getUTCMinutes() + "," + value.getUTCSeconds() + "," + value.getUTCMilliseconds();
              return "new Date(Date.UTC(" + dateParams + "))";
            }

            return value;
          };
        }

        req.setData(qx.lang.Json.stringify(rpcData, replacer));
        req.setAsynchronous(callType > 0);

        if (req.getCrossDomain()) {
          // Our choice here has no effect anyway.  This is purely informational.
          req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        } else {
          // When not cross-domain, set type to text/json
          req.setRequestHeader("Content-Type", "application/json");
        } // Do not parse as JSON. Later done conditionally.


        req.setParseJson(false);
        req.send();

        if (callType == 0) {
          if (ex != null) {
            var error = new Error(ex.toString());
            error.rpcdetails = ex;
            throw error;
          }

          return result;
        } else {
          return req;
        }
      },

      /**
       * Helper method to rewrite a URL with a stale session id (so that it includes
       * the correct session id afterwards).
       *
       * @param url {String} the URL to examine.
       * @return {String} the (possibly re-written) URL.
       */
      fixUrl: function fixUrl(url) {
        if (this.__previousServerSuffix__P_168_1 == null || this.__currentServerSuffix__P_168_0 == null || this.__previousServerSuffix__P_168_1 == "" || this.__previousServerSuffix__P_168_1 == this.__currentServerSuffix__P_168_0) {
          return url;
        }

        var index = url.indexOf(this.__previousServerSuffix__P_168_1);

        if (index == -1) {
          return url;
        }

        return url.substring(0, index) + this.__currentServerSuffix__P_168_0 + url.substring(index + this.__previousServerSuffix__P_168_1.length);
      },

      /**
       * Makes a synchronous server call. The method arguments (if any) follow
       * after the method name (as normal JavaScript arguments, separated by
       * commas, not as an array).
       *
       * If a problem occurs when making the call, an exception is thrown.
       *
       *
       * WARNING.  With some browsers, the synchronous interface
       * causes the browser to hang while awaiting a response!  If the server
       * decides to pause for a minute or two, your browser may do nothing
       * (including refreshing following window changes) until the response is
       * received.  Instead, use the asynchronous interface.
       *
       *
       * YOU HAVE BEEN WARNED.
       *
       *
       * @param methodName {String} the name of the method to call.
       * @param args {Array} an array of values passed through to the backend.
       * @return {var} the result returned by the server.
       */
      callSync: function callSync(methodName, args) {
        return this._callInternal(arguments, 0);
      },

      /**
       * Makes an asynchronous server call. The method arguments (if any) follow
       * after the method name (as normal JavaScript arguments, separated by
       * commas, not as an array).
       *
       * When an answer from the server arrives, the <code>handler</code>
       * function is called with the result of the call as the first, an
       * exception as the second parameter, and the id (aka sequence number) of
       * the invoking request as the third parameter. If the call was
       * successful, the second parameter is <code>null</code>. If there was a
       * problem, the second parameter contains an exception, and the first one
       * is <code>null</code>.
       *
       *
       * The return value of this method is a call reference that you can store
       * if you want to abort the request later on. This value should be treated
       * as opaque and can change completely in the future! The only thing you
       * can rely on is that the <code>abort</code> method will accept this
       * reference and that you can retrieve the sequence number of the request
       * by invoking the getSequenceNumber() method (see below).
       *
       *
       * If a specific method is being called, asynchronously, a number of times
       * in succession, the getSequenceNumber() method may be used to
       * disambiguate which request a response corresponds to.  The sequence
       * number value is a value which increments with each request.)
       *
       *
       * @param handler {Function} the callback function.
       * @param methodName {String} the name of the method to call.
       * @param args {Array} an array of values passed through to the backend.
       * @return {var} the method call reference.
       */
      callAsync: function callAsync(handler, methodName, args) {
        return this._callInternal(arguments, 1);
      },

      /**
       * Makes an asynchronous server call and dispatches an event upon completion
       * or failure. The method arguments (if any) follow after the method name
       * (as normal JavaScript arguments, separated by commas, not as an array).
       *
       * When an answer from the server arrives (or fails to arrive on time), if
       * an exception occurred, a "failed", "timeout" or "aborted" event, as
       * appropriate, is dispatched to any waiting event listeners.  If no
       * exception occurred, a "completed" event is dispatched.
       *
       *
       * When a "failed", "timeout" or "aborted" event is dispatched, the event
       * data contains an object with the properties 'origin', 'code', 'message'
       * and 'id'.  The object has a toString() function which may be called to
       * convert the exception to a string.
       *
       *
       * When a "completed" event is dispatched, the event data contains a
       * map with the JSON-RPC sequence number and result:
       * <p>
       * {
       *   id: rpc_id,
       *   result: json-rpc result
       * }
       *
       *
       * The return value of this method is a call reference that you can store
       * if you want to abort the request later on. This value should be treated
       * as opaque and can change completely in the future! The only thing you
       * can rely on is that the <code>abort</code> method will accept this
       * reference and that you can retrieve the sequence number of the request
       * by invoking the getSequenceNumber() method (see below).
       *
       *
       * If a specific method is being called, asynchronously, a number of times
       * in succession, the getSequenceNumber() method may be used to
       * disambiguate which request a response corresponds to.  The sequence
       * number value is a value which increments with each request.)
       *
       *
       * @param coalesce {Boolean} coalesce all failure types ("failed",
       *                           "timeout", and "aborted") to "failed".
       *                           This is reasonable in many cases, as
       *                           the provided exception contains adequate
       *                           disambiguating information.
       * @param methodName {String} the name of the method to call.
       * @param args {Array} an array of values passed through to the backend.
       * @return {var} the method call reference.
       */
      callAsyncListeners: function callAsyncListeners(coalesce, methodName, args) {
        return this._callInternal(arguments, 2);
      },

      /**
       * Refreshes a server session by retrieving the session id again from the
       * server.
       *
       * The specified handler function is called when the refresh is
       * complete. The first parameter can be <code>true</code> (indicating that
       * a refresh either wasn't necessary at this time or it was successful) or
       * <code>false</code> (indicating that a refresh would have been necessary
       * but can't be performed because the server backend doesn't support
       * it). If there is a non-null second parameter, it's an exception
       * indicating that there was an error when refreshing the session.
       *
       *
       * @param handler {Function} a callback function that is called when the
       *                           refresh is complete (or failed).
       */
      refreshSession: function refreshSession(handler) {
        if (qx.core.ServerSettings && qx.core.ServerSettings.serverPathSuffix) {
          var timeDiff = new Date().getTime() - qx.core.ServerSettings.lastSessionRefresh;

          if (timeDiff / 1000 > qx.core.ServerSettings.sessionTimeoutInSeconds - 30) {
            // this.info("refreshing session");
            this._callInternal([handler], 1, true);
          } else {
            handler(true); // session refresh was OK (in this case: not needed)
          }
        } else {
          handler(false); // no refresh possible, but would be necessary
        }
      },

      /**
       * Whether to convert date objects to pseudo literals and
       * parse with eval.
       *
       * Controlled by {@link #CONVERT_DATES}.
       *
       * @return {Boolean} Whether to convert.
       */
      _isConvertDates: function _isConvertDates() {
        return !!qx.io.remote.Rpc.CONVERT_DATES;
      },

      /**
       * Whether to expect and verify a JSON response.
       *
       * Controlled by {@link #RESPONSE_JSON}.
       *
       * @return {Boolean} Whether to expect JSON.
       */
      _isResponseJson: function _isResponseJson() {
        return !!qx.io.remote.Rpc.RESPONSE_JSON;
      },

      /**
       * Aborts an asynchronous server call. Consequently, the callback function
       * provided to <code>callAsync</code> or <code>callAsyncListeners</code>
       * will be called with an exception.
       *
       * @param opaqueCallRef {var} the call reference as returned by
       *                            <code>callAsync</code> or
       *                            <code>callAsyncListeners</code>
       */
      abort: function abort(opaqueCallRef) {
        opaqueCallRef.abort();
      }
    }
  });
  qx.io.remote.Rpc.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2011 Derrell Lipman
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Derrell Lipman (derrell)
  
  ************************************************************************ */

  /**
   * The well-defined error codes for JSON-RPC.
   */
  qx.Class.define("qx.io.remote.RpcError", {
    statics: {
      /** Information pertaining to qooxdoo's modified JSON-RPC Version 1 */
      qx1: {
        /** Origin of the error */
        origin: {
          Server: 1,
          Application: 2,
          Transport: 3,
          Client: 4
        },

        /**
         * Error data. In Version 1, each origin can have its own error codes.
         * Only 'Server' error codes are globally-defined, however.
         */
        error: {
          /** Error codes for the Server origin */
          server: {
            /*
             * Script Error
             *
             * An error was thrown during the processing of a remote procedure
             * call.
             */
            ScriptError: -1,

            /*
             * Unknown Error
             *
             * The default error code, used only when no specific error code is
             * passed to the JsonRpcError constructor.  This code should
             * generally not be used.
             */
            Unknown: 0,

            /**
             * Illegal Service
             *
             * The service name contains illegal characters or is otherwise
             * deemed unacceptable to the JSON-RPC server.
             */
            IllegalService: 1,

            /**
             * Service Not Found
             *
             * The requested service does not exist at the JSON-RPC server.
             */
            ServiceNotFound: 2,

            /**
             * Class Not Found
             *
             * If the JSON-RPC server divides service methods into subsets
             * (classes), this indicates that the specified class was not found.
             * This is slightly more detailed than "Method Not Found", but that
             * error would always also be legal (and true) whenever this one is
             * returned. (Not used in this implementation)
             */
            ClassNotFound: 3,
            // not used in this implementation

            /**
             * Method Not Found
             *
             * The method specified in the request is not found in the requested
             * service.
             */
            MethodNotFound: 4,

            /**
             * Parameter Mismatch
             *
             * If a method discovers that the parameters (arguments) provided to
             * it do not match the requisite types for the method's parameters,
             * it should return this error code to indicate so to the caller.
             *
             * This error is also used to indicate an illegal parameter value,
             * in server scripts.
             */
            ParameterMismatch: 5,

            /**
             * Permission Denied
             *
             * A JSON-RPC service provider can require authentication, and that
             * authentication can be implemented such the method takes
             * authentication parameters, or such that a method or class of
             * methods requires prior authentication.  If the caller has not
             * properly authenticated to use the requested method, this error
             * code is returned.
             */
            PermissionDenied: 6
          }
        }
      },

      /** Information pertaining to a conformant JSON-RPC Version 2 */
      v2: {
        /**
         * Error data. In Version 1, each origin can have its own error codes.
         * Only 'Server' error codes are globally-defined, however.
         */
        error: {
          /**
           * Parse Error
           *
           * Invalid JSON was received by the server.
           * An error occurred on the server while parsing the JSON text.
           */
          ParseError: -32700,

          /**
           * Invalid Request
           *
           * The JSON received by the server is not a valid Request object.
           */
          InvalidRequest: -32600,

          /**
           * Method Not Found
           *
           * The method specified in the request is not found in the requested
           * service.
           */
          MethodNotFound: -32601,

          /**
           * Invalid method parameter(s)
           *
           * If a method discovers that the parameters (arguments) provided to
           * it do not match the requisite types for the method's parameters,
           * it should return this error code to indicate so to the caller.
           */
          InvalidParams: -32602,

          /**
           * Internal JSON-RPC error
           */
          InternalError: -32603,

          /*********************************************************************
           * The values -32099 to -32000 are reserved for implementation-defined
           * server errors. RPC-specific error codes must be outside of this
           * range, and should generally be positive values.
           *********************************************************************/

          /**
           * Permission Denied
           *
           * A JSON-RPC service provider can require authentication, and that
           * authentication can be implemented such the method takes
           * authentication parameters, or such that a method or class of
           * methods requires prior authentication.  If the caller has not
           * properly authenticated to use the requested method, this error
           * code is returned.
           */
          PermissionDenied: -32000
        }
      }
    }
  });
  qx.io.remote.RpcError.$$dbClassInfo = $$dbClassInfo;
})();
//# sourceMappingURL=package-3.js.map?dt=1592867943291
qx.$$packageData['3'] = {
  "locales": {},
  "resources": {},
  "translations": {}
};
