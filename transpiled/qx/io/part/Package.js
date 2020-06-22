(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Bootstrap": {
        "usage": "dynamic",
        "require": true
      },
      "qx.Part": {},
      "qx.bom.request.Script": {},
      "qx.bom.client.Engine": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2004-2009 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Fabian Jakobs (fjakobs)
       * Martin Wittemann (martinwittemann)
  
  ************************************************************************ */

  /**
   * The Package wraps a list of related script URLs, which are required by one
   * or more parts.
   *
   * @internal
   * @ignore(qx.util.ResourceManager)
   */
  qx.Bootstrap.define("qx.io.part.Package", {
    /**
     * @param urls {String[]} A list of script URLs
     * @param id {var} Unique package hash key
     * @param loaded {Boolean?false} Whether the package is already loaded
     */
    construct: function construct(urls, id, loaded) {
      this.__readyState__P_162_0 = loaded ? "complete" : "initialized";
      this.__urls__P_162_1 = urls;
      this.__id__P_162_2 = id;
    },
    members: {
      __readyState__P_162_0: null,
      __urls__P_162_1: null,
      __id__P_162_2: null,
      __closure__P_162_3: null,
      __loadWithClosure__P_162_4: null,
      __timeoutId__P_162_5: null,
      __notifyPackageResult__P_162_6: null,

      /**
       * Get the package ID.
       *
       * @return {String} The package id
       */
      getId: function getId() {
        return this.__id__P_162_2;
      },

      /**
       * Get the ready state of the package. The value is one of
       * <ul>
       * <li>
       *   <b>initialized</b>: The package is initialized. The {@link #load}
       *   method has not yet been called
       * </li>
       * <li><b>loading</b>: The package is still loading.</li>
       * <li><b>complete</b>: The package has been loaded successfully</li>
       * <li><b>cached</b>: The package is loaded but is not executed
       *   (for closure parts)</li>
       * </li>
       *
       * @return {String} The ready state.
       */
      getReadyState: function getReadyState() {
        return this.__readyState__P_162_0;
      },

      /**
       * Returns the urlsstored stored in the package.
       *
       * @internal
       * @return {String[]} An array of urls of this package.
       */
      getUrls: function getUrls() {
        return this.__urls__P_162_1;
      },

      /**
       * Method for storing the closure for this package. This is only relevant
       * if a {@link qx.io.part.ClosurePart} is used.
       *
       * @param closure {Function} The code of this package wrapped in a closure.
       */
      saveClosure: function saveClosure(closure) {
        if (this.__readyState__P_162_0 == "error") {
          return;
        }

        this.__closure__P_162_3 = closure;

        if (!this.__loadWithClosure__P_162_4) {
          this.execute();
        } else {
          clearTimeout(this.__timeoutId__P_162_5);
          this.__readyState__P_162_0 = "cached";

          this.__notifyPackageResult__P_162_6(this);
        }
      },

      /**
       * Executes the stored closure. This is only relevant if a
       * {@link qx.io.part.ClosurePart} is used.
       */
      execute: function execute() {
        if (this.__closure__P_162_3) {
          this.__closure__P_162_3();

          delete this.__closure__P_162_3;
        }

        if (qx.$$packageData[this.__id__P_162_2]) {
          this.__importPackageData__P_162_7(qx.$$packageData[this.__id__P_162_2]);

          delete qx.$$packageData[this.__id__P_162_2];
        }

        this.__readyState__P_162_0 = "complete";
      },

      /**
       * Load method if the package loads a closure. This is only relevant if a
       * {@link qx.io.part.ClosurePart} is used.
       *
       * @param notifyPackageResult {Function} The callback if all scripts are
       *   done loading in this package.
       * @param self {Object?} The context of the callback.
       */
      loadClosure: function loadClosure(notifyPackageResult, self) {
        if (this.__readyState__P_162_0 !== "initialized") {
          return;
        }

        this.__loadWithClosure__P_162_4 = true;
        this.__readyState__P_162_0 = "loading";
        this.__notifyPackageResult__P_162_6 = qx.Bootstrap.bind(notifyPackageResult, self);

        this.__loadScriptList__P_162_8(this.__urls__P_162_1, function () {}, function () {
          this.__readyState__P_162_0 = "error";
          notifyPackageResult.call(self, this);
        }, this);

        var pkg = this;
        this.__timeoutId__P_162_5 = setTimeout(function () {
          pkg.__readyState__P_162_0 = "error";
          notifyPackageResult.call(self, pkg);
        }, qx.Part.TIMEOUT);
      },

      /**
       * Load the part's script URLs in the correct order.
       *
       * @param notifyPackageResult {Function} The callback if all scripts are
       *   done loading in this package.
       * @param self {Object?} The context of the callback.
       */
      load: function load(notifyPackageResult, self) {
        if (this.__readyState__P_162_0 !== "initialized") {
          return;
        }

        this.__loadWithClosure__P_162_4 = false;
        this.__readyState__P_162_0 = "loading";

        this.__loadScriptList__P_162_8(this.__urls__P_162_1, function () {
          this.__readyState__P_162_0 = "complete";
          this.execute();
          notifyPackageResult.call(self, this);
        }, function () {
          this.__readyState__P_162_0 = "error";
          notifyPackageResult.call(self, this);
        }, this);
      },

      /**
       * Loads a list of scripts in the correct order.
       *
       * @param urlList {String[]} List of script urls
       * @param callback {Function} Function to execute on completion
       * @param errBack {Function} Function to execute on error
       * @param self {Object?window} Context to execute the given function in
       */
      __loadScriptList__P_162_8: function __loadScriptList__P_162_8(urlList, callback, errBack, self) {
        if (urlList.length == 0) {
          callback.call(self);
          return;
        }

        var urlsLoaded = 0;
        var self = this;

        var loadScripts = function loadScripts(urls) {
          if (urlsLoaded >= urlList.length) {
            callback.call(self);
            return;
          }

          var loader = new qx.bom.request.Script();
          loader.open("GET", urls.shift());

          loader.onload = function () {
            urlsLoaded += 1;
            loader.dispose(); // Important to use engine detection directly to keep the minimal
            // package size small [BUG #5068]

            if (qx.bom.client.Engine.getName() == "webkit") {
              // force asynchronous load
              // Safari fails with an "maximum recursion depth exceeded" error if it is
              // called sync.
              setTimeout(function () {
                loadScripts.call(self, urls, callback, self);
              }, 0);
            } else {
              loadScripts.call(self, urls, callback, self);
            }
          };

          loader.onerror = function () {
            if (self.__readyState__P_162_0 == "loading") {
              clearTimeout(self.__timeoutId__P_162_5);
              loader.dispose();
              return errBack.call(self);
            }
          }; // Force loading script asynchronously (IE may load synchronously)


          window.setTimeout(function () {
            loader.send();
          });
        };

        loadScripts(urlList.concat());
      },

      /**
       * Import the data of a package. The function is defined in the loader
       * script.
       *
       * @signature function(packageData)
       * @param packageData {Map} Map of package data categories ("resources",...)
       */
      __importPackageData__P_162_7: qx.$$loader.importPackageData
    }
  });
  qx.io.part.Package.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Package.js.map?dt=1592866007695