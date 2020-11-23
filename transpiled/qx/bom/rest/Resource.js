(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.core.Environment": {
        "defer": "load",
        "require": true
      },
      "qx.Bootstrap": {
        "usage": "dynamic",
        "require": true
      },
      "qx.event.Emitter": {
        "require": true
      },
      "qx.core.IDisposable": {
        "require": true
      },
      "qx.core.Assert": {
        "construct": true
      },
      "qx.bom.request.Xhr": {},
      "qx.bom.request.SimpleXhr": {},
      "qx.lang.Type": {},
      "qx.lang.Function": {},
      "qx.util.Request": {},
      "qx.lang.Json": {},
      "qx.lang.Object": {}
    },
    "environment": {
      "provided": [],
      "required": {
        "qx.debug.dispose.level": {}
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2013 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Richard Sternagel (rsternagel)
  
  ************************************************************************ */

  /**
   * Client-side wrapper of a REST resource.
   *
   * Each instance represents a resource in terms of REST. A number of actions
   * (usually HTTP methods) unique to the resource can be defined and invoked.
   * A resource with its actions is configured declaratively by passing a resource
   * description to the constructor, or programmatically using {@link #map}.
   *
   * Each action is associated to a route. A route is a combination of method,
   * URL pattern and optional parameter constraints.
   *
   * An action is invoked by calling a method with the same name. When a URL
   * pattern of a route contains positional parameters, those parameters must be
   * passed when invoking the associated action. Also, constraints defined in the
   * route must be satisfied.
   *
   * When an action is invoked, a request is configured according to the associated
   * route, is passed the URL parameters, request body data, and finally send.
   * What kind of request is send can be configured by overwriting {@link #_getRequest}.
   *
   * No constraints on the action's name or the scope of the URLs are imposed. However,
   * if you want to follow RESTful design patterns it is recommended to name actions
   * the same as the HTTP action.
   *
   * Strictly speaking, the <code>photos</code> instance represents two distinct resources
   * and could therefore just as well mapped to two distinct resources (for instance,
   * named photos and photosTagged). What style to choose depends on the kind of data
   * returned. For instance, it seems sensible to stick with one resource if the filter
   * only limits the result set (i.e. the individual results have the same properties).
   *
   * In order to respond to successful (or erroneous) invocations of actions,
   * either listen to the generic "success" or "error" event and get the action
   * from the event data, or listen to action specific events defined at runtime.
   * Action specific events follow the pattern "&lt;action&gt;Success" and
   * "&lt;action&gt;Error", e.g. "indexSuccess".
   *
   * @group (IO)
   * @ignore(qx.core.Object.*)
   */
  qx.Bootstrap.define("qx.bom.rest.Resource", {
    extend: qx.event.Emitter,
    implement: [qx.core.IDisposable],

    /**
     * @param description {Map?} Each key of the map is interpreted as
     *  <code>action</code> name. The value associated to the key must be a map
     *  with the properties <code>method</code> and <code>url</code>.
     *  <code>check</code> is optional. Also see {@link #map}.
     *
     * @see qx.bom.rest
     * @see qx.io.rest
     */
    construct: function construct(description) {
      this.__requests__P_64_0 = {};
      this.__routes__P_64_1 = {};
      this.__pollTimers__P_64_2 = {};
      this.__longPollHandlers__P_64_3 = {};

      try {
        if (typeof description !== "undefined") {
          {
            qx.core.Assert.assertMap(description);
          }

          this.__mapFromDescription__P_64_4(description);
        }
      } catch (e) {
        this.dispose();
        throw e;
      }
    },
    events: {
      /**
       * Fired when any request was successful.
       *
       * The action the successful request is associated to, as well as the
       * request itself, can be retrieved from the event’s properties.
       * Additionally, an action specific event is fired that follows the pattern
       * "<action>Success", e.g. "indexSuccess".
       */
      "success": "qx.bom.rest.Resource",

      /**
       * Fired when request associated to action given in prefix was successful.
       *
       * For example, "indexSuccess" is fired when <code>index()</code> was
       * successful.
       */
      "actionSuccess": "qx.bom.rest.Resource",

      /**
       * Fired when any request fails.
       *
       * The action the failed request is associated to, as well as the
       * request itself, can be retrieved from the event’s properties.
       * Additionally, an action specific event is fired that follows the pattern
       * "<action>Error", e.g. "indexError".
       */
      "error": "qx.bom.rest.Resource",

      /**
       * Fired when any request associated to action given in prefix fails.
       *
       * For example, "indexError" is fired when <code>index()</code> failed.
       */
      "actionError": "qx.bom.rest.Resource",

      /**
       * Fired when a request is sent to the given endpoint.
       */
      "sent": "qx.bom.rest.Resource",

      /**
       * Fired when any request associated to action is sent to the given endpoint.
       *
       * For example, "indexSent" is fired when <code>index()</code> was
       * called.
       */
      "actionSent": "qx.bom.rest.Resource",

      /**
       * Fired when a request is started to the given endpoint. This moment is right after the request
       * was opened and send.
       */
      "started": "qx.bom.rest.Resource",

      /**
       * Fired when any request associated to action is started to the given endpoint. This moment is
       * right after the request was opened and send.
       *
       * For example, "indexStarted" is fired when <code>index()</code> was called.
       */
      "actionStarted": "qx.bom.rest.Resource"
    },
    statics: {
      /**
       * Number of milliseconds below a long-poll request is considered immediate and
       * subject to throttling checks.
       */
      POLL_THROTTLE_LIMIT: 100,

      /**
       * Number of immediate long-poll responses accepted before throttling takes place.
       */
      POLL_THROTTLE_COUNT: 30,

      /**
       * A symbol used in checks to declare required parameter.
       */
      REQUIRED: true,

      /**
       * Get placeholders from URL.
       *
       * @param url {String} The URL to parse for placeholders.
       * @return {Array} Array of placeholders without the placeholder prefix.
       */
      placeholdersFromUrl: function placeholdersFromUrl(url) {
        var placeholderRe = /\{(\w+)(=\w+)?\}/g,
            match,
            placeholders = []; // With g flag set, searching begins at the regex object's
        // lastIndex, which is zero initially and increments with each match.

        while (match = placeholderRe.exec(url)) {
          placeholders.push(match[1]);
        }

        return placeholders;
      }
    },
    members: {
      __requests__P_64_0: null,
      __routes__P_64_1: null,
      __baseUrl__P_64_5: null,
      __pollTimers__P_64_2: null,
      __longPollHandlers__P_64_3: null,
      __configureRequestCallback__P_64_6: null,

      /**
       * @type {Map} Request callbacks for 'onsuccess', 'onfail' and 'onloadend' - see {@link #setRequestHandler}.
       */
      __requestHandler__P_64_7: null,

      /**
       * @type {Function} Function which returns instances from {@link qx.io.request.AbstractRequest}.
       */
      __begetRequest__P_64_8: null,
      //
      // Request
      //

      /**
       * Set a request factory function to switch the request implementation.
       * The created requests have to implement {@link qx.io.request.AbstractRequest}.
       *
       * @param fn {Function} Function which returns request instances.
       *
       * @internal
       */
      setRequestFactory: function setRequestFactory(fn) {
        this.__begetRequest__P_64_8 = fn;
      },

      /**
       * Sets request callbacks for 'onsuccess', 'onfail' and 'onloadend'.
       *
       * @param handler {Map} Map defining callbacks and their context.
       *
       * @internal
       */
      setRequestHandler: function setRequestHandler(handler) {
        this.__requestHandler__P_64_7 = handler;
      },

      /**
       * Provides the request callbacks for 'onsuccess', 'onfail' and 'onloadend'.
       *
       * @return {Map} Map defining callbacks and their context.
       */
      _getRequestHandler: function _getRequestHandler() {
        return this.__requestHandler__P_64_7 === null ? {
          onsuccess: {
            callback: function callback(req, action) {
              return function () {
                var response = {
                  "id": parseInt(req.toHashCode(), 10),
                  "response": req.getResponse(),
                  "request": req,
                  "action": action
                };
                this.emit(action + "Success", response);
                this.emit("success", response);
              };
            },
            context: this
          },
          onfail: {
            callback: function callback(req, action) {
              return function () {
                var response = {
                  "id": parseInt(req.toHashCode(), 10),
                  "response": req.getResponse(),
                  "request": req,
                  "action": action
                };
                this.emit(action + "Error", response);
                this.emit("error", response);
              };
            },
            context: this
          },
          onloadend: {
            callback: function callback(req, action) {
              return function () {
                // [#8315] // dispose asynchronous to work with Sinon.js
                window.setTimeout(function () {
                  req.dispose();
                }, 0);
              };
            },
            context: this
          },
          onreadystatechange: {
            callback: function callback(req, action) {
              return function () {
                if (req.getTransport().readyState === qx.bom.request.Xhr.HEADERS_RECEIVED) {
                  var response = {
                    "id": parseInt(req.toHashCode(), 10),
                    "request": req,
                    "action": action
                  };
                  this.emit(action + "Sent", response);
                  this.emit("sent", response);
                }

                if (req.getTransport().readyState === qx.bom.request.Xhr.OPENED) {
                  var payload = {
                    "id": parseInt(req.toHashCode(), 10),
                    "request": req,
                    "action": action
                  };
                  this.emit(action + "Started", payload);
                  this.emit("started", payload);
                }
              };
            },
            context: this
          },
          onprogress: {
            callback: function callback(req, action) {
              return function () {
                var payload = {
                  "id": parseInt(req.toHashCode(), 10),
                  "request": req,
                  "action": action,
                  "progress": {
                    "lengthComputable": req.getTransport().progress.lengthComputable,
                    "loaded": req.getTransport().progress.loaded,
                    "total": req.getTransport().progress.total
                  }
                };
                this.emit(action + "Progress", payload);
                this.emit("progress", payload);
              };
            },
            context: this
          }
        } : this.__requestHandler__P_64_7;
      },

      /**
       * Retrieve the currently stored request objects for an action.
       *
       * @param action {String} The action (e.g. "get", "post" ...).
       * @return {Array|null} Request objects.
       *
       * @internal
       */
      getRequestsByAction: function getRequestsByAction(action) {
        var hasRequests = this.__requests__P_64_0 !== null && action in this.__requests__P_64_0;
        return hasRequests ? this.__requests__P_64_0[action] : null;
      },

      /**
       * Configure request.
       *
       * @param callback {Function} Function called before request is send.
       *   Receives request, action, params and data.
       */
      configureRequest: function configureRequest(callback) {
        this.__configureRequestCallback__P_64_6 = callback;
      },

      /**
       * Get request.
       *
       * May be overridden to change type of request.
       * @return {qx.bom.request.SimpleXhr|qx.io.request.AbstractRequest} Request object
       */
      _getRequest: function _getRequest() {
        return this.__begetRequest__P_64_8 === null ? new qx.bom.request.SimpleXhr() : this.__begetRequest__P_64_8();
      },

      /**
       * Create request.
       *
       * @param action {String} The action the created request is associated to.
       * @return {qx.bom.request.SimpleXhr|qx.io.request.AbstractRequest} Request object
       */
      __createRequest__P_64_9: function __createRequest__P_64_9(action) {
        var req = this._getRequest();

        if (!qx.lang.Type.isArray(this.__requests__P_64_0[action])) {
          this.__requests__P_64_0[action] = [];
        }

        qx.core.ObjectRegistry.register(req);

        this.__requests__P_64_0[action].push(req);

        return req;
      },
      //
      // Routes and actions
      //

      /**
       * Map action to combination of method and URL pattern.
       *
       * @param action {String} Action to associate to request.
       * @param method {String} Method to configure request with.
       * @param url {String} URL to configure request with. May contain positional
       *   parameters (<code>{param}</code>) that are replaced by values given when the action
       *   is invoked. Parameters are optional, unless a check is defined. A default
       *   value can be provided (<code>{param=default}</code>).
       * @param check {Map?} Map defining parameter constraints, where the key is
       *   the URL parameter and the value a regular expression (to match string) or
       *   <code>qx.bom.rest.Resource.REQUIRED</code> (to verify existence).
       */
      map: function map(action, method, url, check) {
        this.__routes__P_64_1[action] = [method, url, check]; // Track requests

        this.__requests__P_64_0[action] = []; // Undefine generic getter when action is named "get"

        if (action == "get") {
          this[action] = undefined;
        } // Do not overwrite existing "non-action" methods unless the method is
        // null (i.e. because it exists as a stub for documentation)


        if (typeof this[action] !== "undefined" && this[action] !== null && this[action].action !== true) {
          throw new Error("Method with name of action (" + action + ") already exists");
        }

        this.__declareEvent__P_64_10(action + "Success");

        this.__declareEvent__P_64_10(action + "Error");

        this[action] = qx.lang.Function.bind(function () {
          Array.prototype.unshift.call(arguments, action);
          return this.invoke.apply(this, arguments);
        }, this); // Method is safe to overwrite

        this[action].action = true;
      },

      /**
       * Invoke action with parameters.
       *
       * Internally called by actions dynamically created.
       *
       * May be overridden to customize action and parameter handling.
       *
       * @lint ignoreUnused(successHandler, failHandler, loadEndHandler)
       *
       * @param action {String} Action to invoke.
       * @param params {Map} Map of parameters inserted into URL when a matching
       *  positional parameter is found.
       * @param data {Map|String} Data to be send as part of the request.
       *  See {@link qx.bom.request.SimpleXhr#getRequestData}.
       *  See {@link qx.io.request.AbstractRequest#requestData}.
       * @return {Number} Id of the action's invocation.
       */
      invoke: function invoke(action, params, data) {
        var req = this.__createRequest__P_64_9(action),
            params = params == null ? {} : params,
            config = this._getRequestConfig(action, params); // Cache parameters


        this.__routes__P_64_1[action].params = params; // Check parameters

        this.__checkParameters__P_64_11(params, config.check); // Configure request


        this.__configureRequest__P_64_12(req, config, data); // Run configuration callback, passing in pre-configured request


        if (this.__configureRequestCallback__P_64_6) {
          this.__configureRequestCallback__P_64_6.call(this, req, action, params, data);
        } // Configure JSON request (content type may have been set in configuration callback)


        this.__configureJsonRequest__P_64_13(req, config, data);

        var reqHandler = this._getRequestHandler(); // Handle successful request


        req.addListenerOnce("success", reqHandler.onsuccess.callback(req, action), reqHandler.onsuccess.context); // Handle erroneous request

        req.addListenerOnce("fail", reqHandler.onfail.callback(req, action), reqHandler.onfail.context); // Handle loadend (Note that loadEnd is fired after "success")

        req.addListenerOnce("loadEnd", reqHandler.onloadend.callback(req, action), reqHandler.onloadend.context);

        if (reqHandler.hasOwnProperty("onreadystatechange")) {
          req.addListener("readystatechange", reqHandler.onreadystatechange.callback(req, action), reqHandler.onreadystatechange.context);
        } // Handle progress (which is fired multiple times)


        if (reqHandler.hasOwnProperty("onprogress")) {
          req.addListener("progress", reqHandler.onprogress.callback(req, action), reqHandler.onprogress.context);
        }

        req.send();
        return parseInt(req.toHashCode(), 10);
      },

      /**
       * Set base URL.
       *
       * The base URL is prepended to the URLs given in the description.
       * Changes affect all future invocations.
       *
       * @param baseUrl {String} Base URL.
       */
      setBaseUrl: function setBaseUrl(baseUrl) {
        this.__baseUrl__P_64_5 = baseUrl;
      },

      /**
       * Check parameters.
       *
       * @param params {Map} Parameters.
       * @param check {Map} Checks.
       */
      __checkParameters__P_64_11: function __checkParameters__P_64_11(params, check) {
        if (typeof check !== "undefined") {
          {
            qx.core.Assert.assertObject(check, "Check must be object with params as keys");
          }
          Object.keys(check).forEach(function (param) {
            // Warn about invalid check
            {
              if (check[param] !== true) {
                {
                  qx.core.Assert.assertRegExp(check[param]);
                }
              }
            } // Missing parameter

            if (check[param] === qx.bom.rest.Resource.REQUIRED && typeof params[param] === "undefined") {
              throw new Error("Missing parameter '" + param + "'");
            } // Ignore invalid checks


            if (!(check[param] && typeof check[param].test == "function")) {
              return;
            } // Invalid parameter


            if (!check[param].test(params[param])) {
              throw new Error("Parameter '" + param + "' is invalid");
            }
          });
        }
      },

      /**
       * Configure request.
       *
       * @param req {qx.bom.request.SimpleXhr|qx.io.request.AbstractRequest} Request.
       * @param config {Map} Configuration.
       * @param data {Map} Data.
       */
      __configureRequest__P_64_12: function __configureRequest__P_64_12(req, config, data) {
        req.setUrl(config.url);

        if (!req.setMethod && config.method !== "GET") {
          throw new Error("Request (" + req.classname + ") doesn't support other HTTP methods than 'GET'");
        }

        if (req.setMethod) {
          req.setMethod(config.method);
        }

        if (data) {
          req.setRequestData(data);
        }
      },

      /**
       * Serialize data to JSON when content type indicates.
       *
       * @param req {qx.bom.request.SimpleXhr|qx.io.request.AbstractRequest} Request.
       * @param config {Map} Configuration.
       * @param data {Map} Data.
       */
      __configureJsonRequest__P_64_13: function __configureJsonRequest__P_64_13(req, config, data) {
        if (data) {
          var contentType = req.getRequestHeader("Content-Type");

          if (req.getMethod && qx.util.Request.methodAllowsRequestBody(req.getMethod())) {
            if (/application\/.*\+?json/.test(contentType)) {
              data = qx.lang.Json.stringify(data);
              req.setRequestData(data);
            }
          }
        }
      },

      /**
       * Abort action.
       *
       * @param varargs {String|Number} Action of which all invocations to abort
       *  (when string), or a single invocation of an action to abort (when number)
       */
      abort: function abort(varargs) {
        if (qx.lang.Type.isNumber(varargs)) {
          var id = varargs;
          var post = qx.core.ObjectRegistry.getPostId();
          var req = qx.core.ObjectRegistry.fromHashCode(id + post);

          if (req) {
            req.abort();
          }
        } else {
          var action = varargs;
          var reqs = this.__requests__P_64_0[action];

          if (this.__requests__P_64_0[action]) {
            reqs.forEach(function (req) {
              req.abort();
            });
          }
        }
      },

      /**
       * Resend request associated to action.
       *
       * Replays parameters given when action was invoked originally.
       *
       * @param action {String} Action to refresh.
       */
      refresh: function refresh(action) {
        this.invoke(action, this.__routes__P_64_1[action].params);
      },

      /**
       * Periodically invoke action.
       *
       * Replays parameters given when action was invoked originally. When the
       * action was not yet invoked and requires parameters, parameters must be
       * given.
       *
       * Please note that IE tends to cache overly aggressive. One work-around is
       * to disable caching on the client side by configuring the request with
       * <code>setCache(false)</code>. If you control the server, a better
       * work-around is to include appropriate headers to explicitly control
       * caching. This way you still avoid requests that can be correctly answered
       * from cache (e.g. when nothing has changed since the last poll). Please
       * refer to <a href="http://www.mnot.net/javascript/xmlhttprequest/cache.html">
       * XMLHttpRequest Caching Test</a> for available options.
       *
       * @lint ignoreUnused(intervalListener)
       *
       * @param action {String} Action to poll.
       * @param interval {Number} Interval in ms.
       * @param params {Map?} Map of parameters. See {@link #invoke}.
       * @param immediately {Boolean?false} <code>true</code>, if the poll should
       *   invoke a call immediately.
       */
      poll: function poll(action, interval, params, immediately) {
        // Dispose timer previously created for action
        if (this.__pollTimers__P_64_2[action]) {
          this.stopPollByAction(action);
        } // Fallback to previous params


        if (typeof params == "undefined") {
          params = this.__routes__P_64_1[action].params;
        } // Invoke immediately


        if (immediately) {
          this.invoke(action, params);
        }

        var intervalListener = function (scope) {
          return function () {
            var req = scope.__requests__P_64_0[action][0];

            if (!immediately && !req) {
              scope.invoke(action, params);
              return;
            }

            if (req.isDone() || req.isDisposed()) {
              scope.refresh(action);
            }
          };
        }(this);

        this._startPoll(action, intervalListener, interval);
      },

      /**
       * Start a poll process.
       *
       * @param action {String} Action to poll.
       * @param listener {Function} The function to repeatedly execute at the given interval.
       * @param interval {Number} Interval in ms.
       */
      _startPoll: function _startPoll(action, listener, interval) {
        this.__pollTimers__P_64_2[action] = {
          "id": window.setInterval(listener, interval),
          "interval": interval,
          "listener": listener
        };
      },

      /**
       * Stops a poll process by the associated action.
       *
       * @param action {String} Action to poll.
       */
      stopPollByAction: function stopPollByAction(action) {
        if (action in this.__pollTimers__P_64_2) {
          var intervalId = this.__pollTimers__P_64_2[action].id;
          window.clearInterval(intervalId);
        }
      },

      /**
       * Restarts a poll process by the associated action.
       *
       * @param action {String} Action to poll.
       */
      restartPollByAction: function restartPollByAction(action) {
        if (action in this.__pollTimers__P_64_2) {
          var timer = this.__pollTimers__P_64_2[action];
          this.stopPollByAction(action);

          this._startPoll(action, timer.listener, timer.interval);
        }
      },

      /**
       * Long-poll action.
       *
       * Use Ajax long-polling to continuously fetch a resource as soon as the
       * server signals new data. The server determines when new data is available,
       * while the client keeps open a request. Requires configuration on the
       * server side. Basically, the server must not close a connection until
       * new data is available. For a high level introduction to long-polling,
       * refer to <a href="http://en.wikipedia.org/wiki/Comet_(programming)#Ajax_with_long_polling">
       * Ajax with long polling</a>.
       *
       * Uses {@link #refresh} internally. Make sure you understand the
       * implications of IE's tendency to cache overly aggressive.
       *
       * Note no interval is given on the client side.
       *
       * @lint ignoreUnused(longPollHandler)
       *
       * @param action {String} Action to poll.
       * @return {String} Id of handler responsible for long-polling. To stop
       *  polling, remove handler using {@link qx.core.Object#removeListenerById}.
       */
      longPoll: function longPoll(action) {
        var res = this,
            lastResponse,
            // Keep track of last response
        immediateResponseCount = 0; // Count immediate responses
        // Throttle to prevent high load on server and client

        function throttle() {
          var isImmediateResponse = lastResponse && new Date() - lastResponse < res._getThrottleLimit();

          if (isImmediateResponse) {
            immediateResponseCount += 1;

            if (immediateResponseCount > res._getThrottleCount()) {
              {
                qx.Bootstrap.debug("Received successful response more than " + res._getThrottleCount() + " times subsequently, each within " + res._getThrottleLimit() + " ms. Throttling.");
              }
              return true;
            }
          } // Reset counter on delayed response


          if (!isImmediateResponse) {
            immediateResponseCount = 0;
          }

          return false;
        }

        var handlerId = this.__longPollHandlers__P_64_3[action] = this.addListener(action + "Success", function longPollHandler() {
          if (res.isDisposed()) {
            return;
          }

          if (!throttle()) {
            lastResponse = new Date();
            res.refresh(action);
          }
        });
        this.invoke(action);
        return handlerId;
      },

      /**
       * Get request configuration for action and parameters.
       *
       * This is were placeholders are replaced with parameters.
       *
       * @param action {String} Action associated to request.
       * @param params {Map} Parameters to embed in request.
       * @return {Map} Map of configuration settings. Has the properties
       *   <code>method</code>, <code>url</code> and <code>check</code>.
       */
      _getRequestConfig: function _getRequestConfig(action, params) {
        var route = this.__routes__P_64_1[action]; // Not modify original params

        var params = qx.lang.Object.clone(params);

        if (!qx.lang.Type.isArray(route)) {
          throw new Error("No route for action " + action);
        }

        var method = route[0],
            url = this.__baseUrl__P_64_5 !== null ? this.__baseUrl__P_64_5 + route[1] : route[1],
            check = route[2],
            placeholders = qx.bom.rest.Resource.placeholdersFromUrl(url);
        params = params || {};
        placeholders.forEach(function (placeholder) {
          // Placeholder part of template and default value
          var re = new RegExp("{" + placeholder + "=?(\\w+)?}"),
              defaultValue = url.match(re)[1]; // Fill in default or empty string when missing

          if (typeof params[placeholder] === "undefined") {
            if (defaultValue) {
              params[placeholder] = defaultValue;
            } else {
              params[placeholder] = "";
            }
          }

          url = url.replace(re, params[placeholder]);
        });
        return {
          method: method,
          url: url,
          check: check
        };
      },

      /**
       * Override to adjust the throttle limit.
       * @return {Integer} Throttle limit in milliseconds
       */
      _getThrottleLimit: function _getThrottleLimit() {
        return qx.bom.rest.Resource.POLL_THROTTLE_LIMIT;
      },

      /**
       * Override to adjust the throttle count.
       * @return {Integer} Throttle count
       */
      _getThrottleCount: function _getThrottleCount() {
        return qx.bom.rest.Resource.POLL_THROTTLE_COUNT;
      },

      /**
       * Map actions from description.
       *
       * Allows to decoratively define routes.
       *
       * @param description {Map} Map that defines the routes.
       */
      __mapFromDescription__P_64_4: function __mapFromDescription__P_64_4(description) {
        Object.keys(description).forEach(function (action) {
          var route = description[action],
              method = route.method,
              url = route.url,
              check = route.check;
          {
            qx.core.Assert.assertString(method, "Method must be string for route '" + action + "'");
            qx.core.Assert.assertString(url, "URL must be string for route '" + action + "'");
          }
          this.map(action, method, url, check);
        }, this);
      },

      /**
       * Declare event at runtime.
       *
       * @param type {String} Type of event.
       */
      __declareEvent__P_64_10: function __declareEvent__P_64_10(type) {
        if (!this.constructor.$$events) {
          this.constructor.$$events = {};
        }

        if (!this.constructor.$$events[type]) {
          this.constructor.$$events[type] = "qx.bom.rest.Resource";
        }
      },

      /*
      ---------------------------------------------------------------------------
        DISPOSER
      ---------------------------------------------------------------------------
      */

      /**
       * Returns true if the object is disposed.
       *
       * @return {Boolean} Whether the object has been disposed
       */
      isDisposed: function isDisposed() {
        return this.$$disposed || false;
      },

      /**
       * Dispose this object
       *
       */
      dispose: function dispose() {
        // Check first
        if (this.$$disposed) {
          return;
        } // Mark as disposed (directly, not at end, to omit recursions)


        this.$$disposed = true; // Debug output

        {
          if (qx.core.Environment.get("qx.debug.dispose.level") > 2) {
            qx.Bootstrap.debug(this, "Disposing " + this.classname + "[" + this.toHashCode() + "]");
          }
        }
        this.destruct(); // Additional checks

        {
          if (qx.core.Environment.get("qx.debug.dispose.level") > 0) {
            var key, value;

            for (key in this) {
              value = this[key]; // Check for Objects but respect values attached to the prototype itself

              if (value !== null && typeof value === "object" && !qx.Bootstrap.isString(value)) {
                // Check prototype value
                // undefined is the best, but null may be used as a placeholder for
                // private variables (hint: checks in qx.Class.define). We accept both.
                if (this.constructor.prototype[key] != null) {
                  continue;
                }

                var ff2 = navigator.userAgent.indexOf("rv:1.8.1") != -1;
                var ie6 = navigator.userAgent.indexOf("MSIE 6.0") != -1; // keep the old behavior for IE6 and FF2

                if (ff2 || ie6) {
                  if (qx.core.Object && value instanceof qx.core.Object || qx.core.Environment.get("qx.debug.dispose.level") > 1) {
                    qx.Bootstrap.warn(this, "Missing destruct definition for '" + key + "' in " + this.classname + "[" + this.toHashCode() + "]: " + value);
                    delete this[key];
                  }
                } else {
                  if (qx.core.Environment.get("qx.debug.dispose.level") > 1) {
                    qx.Bootstrap.warn(this, "Missing destruct definition for '" + key + "' in " + this.classname + "[" + this.toHashCode() + "]: " + value);
                    delete this[key];
                  }
                }
              }
            }
          }
        }
      },

      /**
       * Destructs the Resource.
       *
       * All created requests, routes and pollTimers will be disposed.
       */
      destruct: function destruct() {
        var action;

        for (action in this.__requests__P_64_0) {
          if (this.__requests__P_64_0[action]) {
            this.__requests__P_64_0[action].forEach(function (req) {
              req.dispose();
            });
          }
        }

        if (this.__pollTimers__P_64_2) {
          for (action in this.__pollTimers__P_64_2) {
            this.stopPollByAction(action);
          }
        }

        if (this.__longPollHandlers__P_64_3) {
          for (action in this.__longPollHandlers__P_64_3) {
            var id = this.__longPollHandlers__P_64_3[action];
            this.removeListenerById(id);
          }
        }

        this.__requests__P_64_0 = this.__routes__P_64_1 = this.__pollTimers__P_64_2 = null;
      }
    }
  });
  qx.bom.rest.Resource.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Resource.js.map?dt=1606150441004