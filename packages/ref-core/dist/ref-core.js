(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react'), require('mini-store'), require('axios'), require('tinper-bee'), require('ref-multiple-table/lib/index'), require('ref-multiple-table/lib/index.css'), require('ref-tree/lib/index'), require('ref-tree/lib/index.css')) :
	typeof define === 'function' && define.amd ? define(['exports', 'react', 'mini-store', 'axios', 'tinper-bee', 'ref-multiple-table/lib/index', 'ref-multiple-table/lib/index.css', 'ref-tree/lib/index', 'ref-tree/lib/index.css'], factory) :
	(global = global || self, factory(global.RefCore = {}, global.React, global.miniStore, global.axios, global.TinperBee, global.RefMultipleTableBaseUI, null, global.RefTreeBaseUI));
}(this, function (exports, React, miniStore, axios, tinperBee, RefMultipleTableBaseUI, index_css, RefTreeBaseUI) { 'use strict';

	var React__default = 'default' in React ? React['default'] : React;
	axios = axios && axios.hasOwnProperty('default') ? axios['default'] : axios;
	var tinperBee__default = 'default' in tinperBee ? tinperBee['default'] : tinperBee;
	var RefMultipleTableBaseUI__default = 'default' in RefMultipleTableBaseUI ? RefMultipleTableBaseUI['default'] : RefMultipleTableBaseUI;
	RefTreeBaseUI = RefTreeBaseUI && RefTreeBaseUI.hasOwnProperty('default') ? RefTreeBaseUI['default'] : RefTreeBaseUI;

	function unwrapExports (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
	}

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var runtime_1 = createCommonjsModule(function (module) {
	/**
	 * Copyright (c) 2014-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	var runtime = (function (exports) {

	  var Op = Object.prototype;
	  var hasOwn = Op.hasOwnProperty;
	  var undefined$1; // More compressible than void 0.
	  var $Symbol = typeof Symbol === "function" ? Symbol : {};
	  var iteratorSymbol = $Symbol.iterator || "@@iterator";
	  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
	  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

	  function wrap(innerFn, outerFn, self, tryLocsList) {
	    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
	    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
	    var generator = Object.create(protoGenerator.prototype);
	    var context = new Context(tryLocsList || []);

	    // The ._invoke method unifies the implementations of the .next,
	    // .throw, and .return methods.
	    generator._invoke = makeInvokeMethod(innerFn, self, context);

	    return generator;
	  }
	  exports.wrap = wrap;

	  // Try/catch helper to minimize deoptimizations. Returns a completion
	  // record like context.tryEntries[i].completion. This interface could
	  // have been (and was previously) designed to take a closure to be
	  // invoked without arguments, but in all the cases we care about we
	  // already have an existing method we want to call, so there's no need
	  // to create a new function object. We can even get away with assuming
	  // the method takes exactly one argument, since that happens to be true
	  // in every case, so we don't have to touch the arguments object. The
	  // only additional allocation required is the completion record, which
	  // has a stable shape and so hopefully should be cheap to allocate.
	  function tryCatch(fn, obj, arg) {
	    try {
	      return { type: "normal", arg: fn.call(obj, arg) };
	    } catch (err) {
	      return { type: "throw", arg: err };
	    }
	  }

	  var GenStateSuspendedStart = "suspendedStart";
	  var GenStateSuspendedYield = "suspendedYield";
	  var GenStateExecuting = "executing";
	  var GenStateCompleted = "completed";

	  // Returning this object from the innerFn has the same effect as
	  // breaking out of the dispatch switch statement.
	  var ContinueSentinel = {};

	  // Dummy constructor functions that we use as the .constructor and
	  // .constructor.prototype properties for functions that return Generator
	  // objects. For full spec compliance, you may wish to configure your
	  // minifier not to mangle the names of these two functions.
	  function Generator() {}
	  function GeneratorFunction() {}
	  function GeneratorFunctionPrototype() {}

	  // This is a polyfill for %IteratorPrototype% for environments that
	  // don't natively support it.
	  var IteratorPrototype = {};
	  IteratorPrototype[iteratorSymbol] = function () {
	    return this;
	  };

	  var getProto = Object.getPrototypeOf;
	  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
	  if (NativeIteratorPrototype &&
	      NativeIteratorPrototype !== Op &&
	      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
	    // This environment has a native %IteratorPrototype%; use it instead
	    // of the polyfill.
	    IteratorPrototype = NativeIteratorPrototype;
	  }

	  var Gp = GeneratorFunctionPrototype.prototype =
	    Generator.prototype = Object.create(IteratorPrototype);
	  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
	  GeneratorFunctionPrototype.constructor = GeneratorFunction;
	  GeneratorFunctionPrototype[toStringTagSymbol] =
	    GeneratorFunction.displayName = "GeneratorFunction";

	  // Helper for defining the .next, .throw, and .return methods of the
	  // Iterator interface in terms of a single ._invoke method.
	  function defineIteratorMethods(prototype) {
	    ["next", "throw", "return"].forEach(function(method) {
	      prototype[method] = function(arg) {
	        return this._invoke(method, arg);
	      };
	    });
	  }

	  exports.isGeneratorFunction = function(genFun) {
	    var ctor = typeof genFun === "function" && genFun.constructor;
	    return ctor
	      ? ctor === GeneratorFunction ||
	        // For the native GeneratorFunction constructor, the best we can
	        // do is to check its .name property.
	        (ctor.displayName || ctor.name) === "GeneratorFunction"
	      : false;
	  };

	  exports.mark = function(genFun) {
	    if (Object.setPrototypeOf) {
	      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
	    } else {
	      genFun.__proto__ = GeneratorFunctionPrototype;
	      if (!(toStringTagSymbol in genFun)) {
	        genFun[toStringTagSymbol] = "GeneratorFunction";
	      }
	    }
	    genFun.prototype = Object.create(Gp);
	    return genFun;
	  };

	  // Within the body of any async function, `await x` is transformed to
	  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
	  // `hasOwn.call(value, "__await")` to determine if the yielded value is
	  // meant to be awaited.
	  exports.awrap = function(arg) {
	    return { __await: arg };
	  };

	  function AsyncIterator(generator) {
	    function invoke(method, arg, resolve, reject) {
	      var record = tryCatch(generator[method], generator, arg);
	      if (record.type === "throw") {
	        reject(record.arg);
	      } else {
	        var result = record.arg;
	        var value = result.value;
	        if (value &&
	            typeof value === "object" &&
	            hasOwn.call(value, "__await")) {
	          return Promise.resolve(value.__await).then(function(value) {
	            invoke("next", value, resolve, reject);
	          }, function(err) {
	            invoke("throw", err, resolve, reject);
	          });
	        }

	        return Promise.resolve(value).then(function(unwrapped) {
	          // When a yielded Promise is resolved, its final value becomes
	          // the .value of the Promise<{value,done}> result for the
	          // current iteration.
	          result.value = unwrapped;
	          resolve(result);
	        }, function(error) {
	          // If a rejected Promise was yielded, throw the rejection back
	          // into the async generator function so it can be handled there.
	          return invoke("throw", error, resolve, reject);
	        });
	      }
	    }

	    var previousPromise;

	    function enqueue(method, arg) {
	      function callInvokeWithMethodAndArg() {
	        return new Promise(function(resolve, reject) {
	          invoke(method, arg, resolve, reject);
	        });
	      }

	      return previousPromise =
	        // If enqueue has been called before, then we want to wait until
	        // all previous Promises have been resolved before calling invoke,
	        // so that results are always delivered in the correct order. If
	        // enqueue has not been called before, then it is important to
	        // call invoke immediately, without waiting on a callback to fire,
	        // so that the async generator function has the opportunity to do
	        // any necessary setup in a predictable way. This predictability
	        // is why the Promise constructor synchronously invokes its
	        // executor callback, and why async functions synchronously
	        // execute code before the first await. Since we implement simple
	        // async functions in terms of async generators, it is especially
	        // important to get this right, even though it requires care.
	        previousPromise ? previousPromise.then(
	          callInvokeWithMethodAndArg,
	          // Avoid propagating failures to Promises returned by later
	          // invocations of the iterator.
	          callInvokeWithMethodAndArg
	        ) : callInvokeWithMethodAndArg();
	    }

	    // Define the unified helper method that is used to implement .next,
	    // .throw, and .return (see defineIteratorMethods).
	    this._invoke = enqueue;
	  }

	  defineIteratorMethods(AsyncIterator.prototype);
	  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
	    return this;
	  };
	  exports.AsyncIterator = AsyncIterator;

	  // Note that simple async functions are implemented on top of
	  // AsyncIterator objects; they just return a Promise for the value of
	  // the final result produced by the iterator.
	  exports.async = function(innerFn, outerFn, self, tryLocsList) {
	    var iter = new AsyncIterator(
	      wrap(innerFn, outerFn, self, tryLocsList)
	    );

	    return exports.isGeneratorFunction(outerFn)
	      ? iter // If outerFn is a generator, return the full iterator.
	      : iter.next().then(function(result) {
	          return result.done ? result.value : iter.next();
	        });
	  };

	  function makeInvokeMethod(innerFn, self, context) {
	    var state = GenStateSuspendedStart;

	    return function invoke(method, arg) {
	      if (state === GenStateExecuting) {
	        throw new Error("Generator is already running");
	      }

	      if (state === GenStateCompleted) {
	        if (method === "throw") {
	          throw arg;
	        }

	        // Be forgiving, per 25.3.3.3.3 of the spec:
	        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
	        return doneResult();
	      }

	      context.method = method;
	      context.arg = arg;

	      while (true) {
	        var delegate = context.delegate;
	        if (delegate) {
	          var delegateResult = maybeInvokeDelegate(delegate, context);
	          if (delegateResult) {
	            if (delegateResult === ContinueSentinel) continue;
	            return delegateResult;
	          }
	        }

	        if (context.method === "next") {
	          // Setting context._sent for legacy support of Babel's
	          // function.sent implementation.
	          context.sent = context._sent = context.arg;

	        } else if (context.method === "throw") {
	          if (state === GenStateSuspendedStart) {
	            state = GenStateCompleted;
	            throw context.arg;
	          }

	          context.dispatchException(context.arg);

	        } else if (context.method === "return") {
	          context.abrupt("return", context.arg);
	        }

	        state = GenStateExecuting;

	        var record = tryCatch(innerFn, self, context);
	        if (record.type === "normal") {
	          // If an exception is thrown from innerFn, we leave state ===
	          // GenStateExecuting and loop back for another invocation.
	          state = context.done
	            ? GenStateCompleted
	            : GenStateSuspendedYield;

	          if (record.arg === ContinueSentinel) {
	            continue;
	          }

	          return {
	            value: record.arg,
	            done: context.done
	          };

	        } else if (record.type === "throw") {
	          state = GenStateCompleted;
	          // Dispatch the exception by looping back around to the
	          // context.dispatchException(context.arg) call above.
	          context.method = "throw";
	          context.arg = record.arg;
	        }
	      }
	    };
	  }

	  // Call delegate.iterator[context.method](context.arg) and handle the
	  // result, either by returning a { value, done } result from the
	  // delegate iterator, or by modifying context.method and context.arg,
	  // setting context.delegate to null, and returning the ContinueSentinel.
	  function maybeInvokeDelegate(delegate, context) {
	    var method = delegate.iterator[context.method];
	    if (method === undefined$1) {
	      // A .throw or .return when the delegate iterator has no .throw
	      // method always terminates the yield* loop.
	      context.delegate = null;

	      if (context.method === "throw") {
	        // Note: ["return"] must be used for ES3 parsing compatibility.
	        if (delegate.iterator["return"]) {
	          // If the delegate iterator has a return method, give it a
	          // chance to clean up.
	          context.method = "return";
	          context.arg = undefined$1;
	          maybeInvokeDelegate(delegate, context);

	          if (context.method === "throw") {
	            // If maybeInvokeDelegate(context) changed context.method from
	            // "return" to "throw", let that override the TypeError below.
	            return ContinueSentinel;
	          }
	        }

	        context.method = "throw";
	        context.arg = new TypeError(
	          "The iterator does not provide a 'throw' method");
	      }

	      return ContinueSentinel;
	    }

	    var record = tryCatch(method, delegate.iterator, context.arg);

	    if (record.type === "throw") {
	      context.method = "throw";
	      context.arg = record.arg;
	      context.delegate = null;
	      return ContinueSentinel;
	    }

	    var info = record.arg;

	    if (! info) {
	      context.method = "throw";
	      context.arg = new TypeError("iterator result is not an object");
	      context.delegate = null;
	      return ContinueSentinel;
	    }

	    if (info.done) {
	      // Assign the result of the finished delegate to the temporary
	      // variable specified by delegate.resultName (see delegateYield).
	      context[delegate.resultName] = info.value;

	      // Resume execution at the desired location (see delegateYield).
	      context.next = delegate.nextLoc;

	      // If context.method was "throw" but the delegate handled the
	      // exception, let the outer generator proceed normally. If
	      // context.method was "next", forget context.arg since it has been
	      // "consumed" by the delegate iterator. If context.method was
	      // "return", allow the original .return call to continue in the
	      // outer generator.
	      if (context.method !== "return") {
	        context.method = "next";
	        context.arg = undefined$1;
	      }

	    } else {
	      // Re-yield the result returned by the delegate method.
	      return info;
	    }

	    // The delegate iterator is finished, so forget it and continue with
	    // the outer generator.
	    context.delegate = null;
	    return ContinueSentinel;
	  }

	  // Define Generator.prototype.{next,throw,return} in terms of the
	  // unified ._invoke helper method.
	  defineIteratorMethods(Gp);

	  Gp[toStringTagSymbol] = "Generator";

	  // A Generator should always return itself as the iterator object when the
	  // @@iterator function is called on it. Some browsers' implementations of the
	  // iterator prototype chain incorrectly implement this, causing the Generator
	  // object to not be returned from this call. This ensures that doesn't happen.
	  // See https://github.com/facebook/regenerator/issues/274 for more details.
	  Gp[iteratorSymbol] = function() {
	    return this;
	  };

	  Gp.toString = function() {
	    return "[object Generator]";
	  };

	  function pushTryEntry(locs) {
	    var entry = { tryLoc: locs[0] };

	    if (1 in locs) {
	      entry.catchLoc = locs[1];
	    }

	    if (2 in locs) {
	      entry.finallyLoc = locs[2];
	      entry.afterLoc = locs[3];
	    }

	    this.tryEntries.push(entry);
	  }

	  function resetTryEntry(entry) {
	    var record = entry.completion || {};
	    record.type = "normal";
	    delete record.arg;
	    entry.completion = record;
	  }

	  function Context(tryLocsList) {
	    // The root entry object (effectively a try statement without a catch
	    // or a finally block) gives us a place to store values thrown from
	    // locations where there is no enclosing try statement.
	    this.tryEntries = [{ tryLoc: "root" }];
	    tryLocsList.forEach(pushTryEntry, this);
	    this.reset(true);
	  }

	  exports.keys = function(object) {
	    var keys = [];
	    for (var key in object) {
	      keys.push(key);
	    }
	    keys.reverse();

	    // Rather than returning an object with a next method, we keep
	    // things simple and return the next function itself.
	    return function next() {
	      while (keys.length) {
	        var key = keys.pop();
	        if (key in object) {
	          next.value = key;
	          next.done = false;
	          return next;
	        }
	      }

	      // To avoid creating an additional object, we just hang the .value
	      // and .done properties off the next function object itself. This
	      // also ensures that the minifier will not anonymize the function.
	      next.done = true;
	      return next;
	    };
	  };

	  function values(iterable) {
	    if (iterable) {
	      var iteratorMethod = iterable[iteratorSymbol];
	      if (iteratorMethod) {
	        return iteratorMethod.call(iterable);
	      }

	      if (typeof iterable.next === "function") {
	        return iterable;
	      }

	      if (!isNaN(iterable.length)) {
	        var i = -1, next = function next() {
	          while (++i < iterable.length) {
	            if (hasOwn.call(iterable, i)) {
	              next.value = iterable[i];
	              next.done = false;
	              return next;
	            }
	          }

	          next.value = undefined$1;
	          next.done = true;

	          return next;
	        };

	        return next.next = next;
	      }
	    }

	    // Return an iterator with no values.
	    return { next: doneResult };
	  }
	  exports.values = values;

	  function doneResult() {
	    return { value: undefined$1, done: true };
	  }

	  Context.prototype = {
	    constructor: Context,

	    reset: function(skipTempReset) {
	      this.prev = 0;
	      this.next = 0;
	      // Resetting context._sent for legacy support of Babel's
	      // function.sent implementation.
	      this.sent = this._sent = undefined$1;
	      this.done = false;
	      this.delegate = null;

	      this.method = "next";
	      this.arg = undefined$1;

	      this.tryEntries.forEach(resetTryEntry);

	      if (!skipTempReset) {
	        for (var name in this) {
	          // Not sure about the optimal order of these conditions:
	          if (name.charAt(0) === "t" &&
	              hasOwn.call(this, name) &&
	              !isNaN(+name.slice(1))) {
	            this[name] = undefined$1;
	          }
	        }
	      }
	    },

	    stop: function() {
	      this.done = true;

	      var rootEntry = this.tryEntries[0];
	      var rootRecord = rootEntry.completion;
	      if (rootRecord.type === "throw") {
	        throw rootRecord.arg;
	      }

	      return this.rval;
	    },

	    dispatchException: function(exception) {
	      if (this.done) {
	        throw exception;
	      }

	      var context = this;
	      function handle(loc, caught) {
	        record.type = "throw";
	        record.arg = exception;
	        context.next = loc;

	        if (caught) {
	          // If the dispatched exception was caught by a catch block,
	          // then let that catch block handle the exception normally.
	          context.method = "next";
	          context.arg = undefined$1;
	        }

	        return !! caught;
	      }

	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        var record = entry.completion;

	        if (entry.tryLoc === "root") {
	          // Exception thrown outside of any try block that could handle
	          // it, so set the completion value of the entire function to
	          // throw the exception.
	          return handle("end");
	        }

	        if (entry.tryLoc <= this.prev) {
	          var hasCatch = hasOwn.call(entry, "catchLoc");
	          var hasFinally = hasOwn.call(entry, "finallyLoc");

	          if (hasCatch && hasFinally) {
	            if (this.prev < entry.catchLoc) {
	              return handle(entry.catchLoc, true);
	            } else if (this.prev < entry.finallyLoc) {
	              return handle(entry.finallyLoc);
	            }

	          } else if (hasCatch) {
	            if (this.prev < entry.catchLoc) {
	              return handle(entry.catchLoc, true);
	            }

	          } else if (hasFinally) {
	            if (this.prev < entry.finallyLoc) {
	              return handle(entry.finallyLoc);
	            }

	          } else {
	            throw new Error("try statement without catch or finally");
	          }
	        }
	      }
	    },

	    abrupt: function(type, arg) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.tryLoc <= this.prev &&
	            hasOwn.call(entry, "finallyLoc") &&
	            this.prev < entry.finallyLoc) {
	          var finallyEntry = entry;
	          break;
	        }
	      }

	      if (finallyEntry &&
	          (type === "break" ||
	           type === "continue") &&
	          finallyEntry.tryLoc <= arg &&
	          arg <= finallyEntry.finallyLoc) {
	        // Ignore the finally entry if control is not jumping to a
	        // location outside the try/catch block.
	        finallyEntry = null;
	      }

	      var record = finallyEntry ? finallyEntry.completion : {};
	      record.type = type;
	      record.arg = arg;

	      if (finallyEntry) {
	        this.method = "next";
	        this.next = finallyEntry.finallyLoc;
	        return ContinueSentinel;
	      }

	      return this.complete(record);
	    },

	    complete: function(record, afterLoc) {
	      if (record.type === "throw") {
	        throw record.arg;
	      }

	      if (record.type === "break" ||
	          record.type === "continue") {
	        this.next = record.arg;
	      } else if (record.type === "return") {
	        this.rval = this.arg = record.arg;
	        this.method = "return";
	        this.next = "end";
	      } else if (record.type === "normal" && afterLoc) {
	        this.next = afterLoc;
	      }

	      return ContinueSentinel;
	    },

	    finish: function(finallyLoc) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.finallyLoc === finallyLoc) {
	          this.complete(entry.completion, entry.afterLoc);
	          resetTryEntry(entry);
	          return ContinueSentinel;
	        }
	      }
	    },

	    "catch": function(tryLoc) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.tryLoc === tryLoc) {
	          var record = entry.completion;
	          if (record.type === "throw") {
	            var thrown = record.arg;
	            resetTryEntry(entry);
	          }
	          return thrown;
	        }
	      }

	      // The context.catch method must only be called with a location
	      // argument that corresponds to a known catch block.
	      throw new Error("illegal catch attempt");
	    },

	    delegateYield: function(iterable, resultName, nextLoc) {
	      this.delegate = {
	        iterator: values(iterable),
	        resultName: resultName,
	        nextLoc: nextLoc
	      };

	      if (this.method === "next") {
	        // Deliberately forget the last sent value so that we don't
	        // accidentally pass it on to the delegate.
	        this.arg = undefined$1;
	      }

	      return ContinueSentinel;
	    }
	  };

	  // Regardless of whether this script is executing as a CommonJS module
	  // or not, return the runtime object so that we can declare the variable
	  // regeneratorRuntime in the outer scope, which allows this module to be
	  // injected easily by `bin/regenerator --include-runtime script.js`.
	  return exports;

	}(
	  // If this script is executing as a CommonJS module, use module.exports
	  // as the regeneratorRuntime namespace. Otherwise create a new empty
	  // object. Either way, the resulting object will be used to initialize
	  // the regeneratorRuntime variable at the top of this file.
	  module.exports
	));

	try {
	  regeneratorRuntime = runtime;
	} catch (accidentalStrictMode) {
	  // This module should not be running in strict mode, so the above
	  // assignment should always work unless something is misconfigured. Just
	  // in case runtime.js accidentally runs in strict mode, we can escape
	  // strict mode using a global Function call. This could conceivably fail
	  // if a Content Security Policy forbids using Function, but in that case
	  // the proper solution is to fix the accidental strict mode problem. If
	  // you've misconfigured your bundler to force strict mode and applied a
	  // CSP to forbid Function, and you're not willing to fix either of those
	  // problems, please detail your unique predicament in a GitHub issue.
	  Function("r", "regeneratorRuntime = r")(runtime);
	}
	});

	var regenerator = runtime_1;

	function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
	  try {
	    var info = gen[key](arg);
	    var value = info.value;
	  } catch (error) {
	    reject(error);
	    return;
	  }

	  if (info.done) {
	    resolve(value);
	  } else {
	    Promise.resolve(value).then(_next, _throw);
	  }
	}

	function _asyncToGenerator(fn) {
	  return function () {
	    var self = this,
	        args = arguments;
	    return new Promise(function (resolve, reject) {
	      var gen = fn.apply(self, args);

	      function _next(value) {
	        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
	      }

	      function _throw(err) {
	        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
	      }

	      _next(undefined);
	    });
	  };
	}

	var asyncToGenerator = _asyncToGenerator;

	function _inheritsLoose(subClass, superClass) {
	  subClass.prototype = Object.create(superClass.prototype);
	  subClass.prototype.constructor = subClass;
	  subClass.__proto__ = superClass;
	}

	var inheritsLoose = _inheritsLoose;

	function getMeta(url) {
	  return axios({
	    timeout: 8000,
	    method: 'get',
	    url: url,
	    params: {
	      r: Math.random()
	    }
	  });
	}

	var refValParse = function refValParse(value, valueField, displayField) {
	  var _ref;

	  if (!value) return _ref = {}, _ref[displayField] = '', _ref[valueField] = '', _ref;

	  try {
	    var valueMap = JSON.parse(value);

	    if (!valueMap.hasOwnProperty(displayField) || !valueMap.hasOwnProperty(valueField)) {
	      var _ref2;

	      return _ref2 = {}, _ref2[displayField] = '', _ref2[valueField] = '', _ref2;
	    } else {
	      return JSON.parse(value);
	    }
	  } catch (e) {
	    var _ref3;

	    return _ref3 = {}, _ref3[displayField] = '', _ref3[valueField] = '', _ref3;
	  }
	};

	var _extends_1 = createCommonjsModule(function (module) {
	function _extends() {
	  module.exports = _extends = Object.assign || function (target) {
	    for (var i = 1; i < arguments.length; i++) {
	      var source = arguments[i];

	      for (var key in source) {
	        if (Object.prototype.hasOwnProperty.call(source, key)) {
	          target[key] = source[key];
	        }
	      }
	    }

	    return target;
	  };

	  return _extends.apply(this, arguments);
	}

	module.exports = _extends;
	});

	var refcorewithinput = createCommonjsModule(function (module, exports) {
	!function(e,t){module.exports=t(React__default,tinperBee__default);}(window,function(n,r){return function(n){var r={};function o(e){if(r[e])return r[e].exports;var t=r[e]={i:e,l:!1,exports:{}};return n[e].call(t.exports,t,t.exports,o),t.l=!0,t.exports}return o.m=n,o.c=r,o.d=function(e,t,n){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n});},o.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0});},o.t=function(t,e){if(1&e&&(t=o(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)o.d(n,r,function(e){return t[e]}.bind(null,r));return n},o.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="/",o(o.s=61)}([function(e,t,n){var o=n(7),r=n(26),i=Object.prototype.toString;function a(e){return "[object Array]"===i.call(e)}function s(e){return null!==e&&"object"==typeof e}function u(e){return "[object Function]"===i.call(e)}function c(e,t){if(null!=e)if("object"!=typeof e&&(e=[e]),a(e))for(var n=0,r=e.length;n<r;n++)t.call(null,e[n],n,e);else for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&t.call(null,e[o],o,e);}e.exports={isArray:a,isArrayBuffer:function(e){return "[object ArrayBuffer]"===i.call(e)},isBuffer:r,isFormData:function(e){return "undefined"!=typeof FormData&&e instanceof FormData},isArrayBufferView:function(e){return "undefined"!=typeof ArrayBuffer&&ArrayBuffer.isView?ArrayBuffer.isView(e):e&&e.buffer&&e.buffer instanceof ArrayBuffer},isString:function(e){return "string"==typeof e},isNumber:function(e){return "number"==typeof e},isObject:s,isUndefined:function(e){return void 0===e},isDate:function(e){return "[object Date]"===i.call(e)},isFile:function(e){return "[object File]"===i.call(e)},isBlob:function(e){return "[object Blob]"===i.call(e)},isFunction:u,isStream:function(e){return s(e)&&u(e.pipe)},isURLSearchParams:function(e){return "undefined"!=typeof URLSearchParams&&e instanceof URLSearchParams},isStandardBrowserEnv:function(){return ("undefined"==typeof navigator||"ReactNative"!==navigator.product)&&"undefined"!=typeof window&&"undefined"!=typeof document},forEach:c,merge:function n(){var r={};function e(e,t){"object"==typeof r[t]&&"object"==typeof e?r[t]=n(r[t],e):r[t]=e;}for(var t=0,o=arguments.length;t<o;t++)c(arguments[t],e);return r},extend:function(n,e,r){return c(e,function(e,t){n[t]=r&&"function"==typeof e?o(e,r):e;}),n},trim:function(e){return e.replace(/^\s*/,"").replace(/\s*$/,"")}};},function(e,t){e.exports=n;},function(e,t){e.exports=r;},function(e,t){var n;n=function(){return this}();try{n=n||new Function("return this")();}catch(e){"object"==typeof window&&(n=window);}e.exports=n;},function(e,t){var n,r,o=e.exports={};function i(){throw new Error("setTimeout has not been defined")}function a(){throw new Error("clearTimeout has not been defined")}function s(t){if(n===setTimeout)return setTimeout(t,0);if((n===i||!n)&&setTimeout)return n=setTimeout,setTimeout(t,0);try{return n(t,0)}catch(e){try{return n.call(null,t,0)}catch(e){return n.call(this,t,0)}}}!function(){try{n="function"==typeof setTimeout?setTimeout:i;}catch(e){n=i;}try{r="function"==typeof clearTimeout?clearTimeout:a;}catch(e){r=a;}}();var u,c=[],f=!1,l=-1;function p(){f&&u&&(f=!1,u.length?c=u.concat(c):l=-1,c.length&&d());}function d(){if(!f){var e=s(p);f=!0;for(var t=c.length;t;){for(u=c,c=[];++l<t;)u&&u[l].run();l=-1,t=c.length;}u=null,f=!1,function(t){if(r===clearTimeout)return clearTimeout(t);if((r===a||!r)&&clearTimeout)return r=clearTimeout,clearTimeout(t);try{r(t);}catch(e){try{return r.call(null,t)}catch(e){return r.call(this,t)}}}(e);}}function h(e,t){this.fun=e,this.array=t;}function y(){}o.nextTick=function(e){var t=new Array(arguments.length-1);if(1<arguments.length)for(var n=1;n<arguments.length;n++)t[n-1]=arguments[n];c.push(new h(e,t)),1!==c.length||f||s(d);},h.prototype.run=function(){this.fun.apply(null,this.array);},o.title="browser",o.browser=!0,o.env={},o.argv=[],o.version="",o.versions={},o.on=y,o.addListener=y,o.once=y,o.off=y,o.removeListener=y,o.removeAllListeners=y,o.emit=y,o.prependListener=y,o.prependOnceListener=y,o.listeners=function(e){return []},o.binding=function(e){throw new Error("process.binding is not supported")},o.cwd=function(){return "/"},o.chdir=function(e){throw new Error("process.chdir is not supported")},o.umask=function(){return 0};},function(s,e,u){(function(e){var n=u(0),r=u(28),t={"Content-Type":"application/x-www-form-urlencoded"};function o(e,t){!n.isUndefined(e)&&n.isUndefined(e["Content-Type"])&&(e["Content-Type"]=t);}var i,a={adapter:("undefined"!=typeof XMLHttpRequest?i=u(8):void 0!==e&&(i=u(8)),i),transformRequest:[function(e,t){return r(t,"Content-Type"),n.isFormData(e)||n.isArrayBuffer(e)||n.isBuffer(e)||n.isStream(e)||n.isFile(e)||n.isBlob(e)?e:n.isArrayBufferView(e)?e.buffer:n.isURLSearchParams(e)?(o(t,"application/x-www-form-urlencoded;charset=utf-8"),e.toString()):n.isObject(e)?(o(t,"application/json;charset=utf-8"),JSON.stringify(e)):e}],transformResponse:[function(e){if("string"==typeof e)try{e=JSON.parse(e);}catch(e){}return e}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,validateStatus:function(e){return 200<=e&&e<300}};a.headers={common:{Accept:"application/json, text/plain, */*"}},n.forEach(["delete","get","head"],function(e){a.headers[e]={};}),n.forEach(["post","put","patch"],function(e){a.headers[e]=n.merge(t);}),s.exports=a;}).call(this,u(4));},function(e,t,n){t.a=function(t){var n=this.constructor;return this.then(function(e){return n.resolve(t()).then(function(){return e})},function(e){return n.resolve(t()).then(function(){return n.reject(e)})})};},function(e,t,n){e.exports=function(n,r){return function(){for(var e=new Array(arguments.length),t=0;t<e.length;t++)e[t]=arguments[t];return n.apply(r,e)}};},function(e,t,p){var d=p(0),h=p(29),y=p(31),m=p(32),v=p(33),b=p(9),w="undefined"!=typeof window&&window.btoa&&window.btoa.bind(window)||p(34);e.exports=function(l){return new Promise(function(n,r){var o=l.data,i=l.headers;d.isFormData(o)&&delete i["Content-Type"];var a=new XMLHttpRequest,e="onreadystatechange",s=!1;if("undefined"==typeof window||!window.XDomainRequest||"withCredentials"in a||v(l.url)||(a=new window.XDomainRequest,e="onload",s=!0,a.onprogress=function(){},a.ontimeout=function(){}),l.auth){var t=l.auth.username||"",u=l.auth.password||"";i.Authorization="Basic "+w(t+":"+u);}if(a.open(l.method.toUpperCase(),y(l.url,l.params,l.paramsSerializer),!0),a.timeout=l.timeout,a[e]=function(){if(a&&(4===a.readyState||s)&&(0!==a.status||a.responseURL&&0===a.responseURL.indexOf("file:"))){var e="getAllResponseHeaders"in a?m(a.getAllResponseHeaders()):null,t={data:l.responseType&&"text"!==l.responseType?a.response:a.responseText,status:1223===a.status?204:a.status,statusText:1223===a.status?"No Content":a.statusText,headers:e,config:l,request:a};h(n,r,t),a=null;}},a.onerror=function(){r(b("Network Error",l,null,a)),a=null;},a.ontimeout=function(){r(b("timeout of "+l.timeout+"ms exceeded",l,"ECONNABORTED",a)),a=null;},d.isStandardBrowserEnv()){var c=p(35),f=(l.withCredentials||v(l.url))&&l.xsrfCookieName?c.read(l.xsrfCookieName):void 0;f&&(i[l.xsrfHeaderName]=f);}if("setRequestHeader"in a&&d.forEach(i,function(e,t){void 0===o&&"content-type"===t.toLowerCase()?delete i[t]:a.setRequestHeader(t,e);}),l.withCredentials&&(a.withCredentials=!0),l.responseType)try{a.responseType=l.responseType;}catch(e){if("json"!==l.responseType)throw e}"function"==typeof l.onDownloadProgress&&a.addEventListener("progress",l.onDownloadProgress),"function"==typeof l.onUploadProgress&&a.upload&&a.upload.addEventListener("progress",l.onUploadProgress),l.cancelToken&&l.cancelToken.promise.then(function(e){a&&(a.abort(),r(e),a=null);}),void 0===o&&(o=null),a.send(o);})};},function(e,t,n){var a=n(30);e.exports=function(e,t,n,r,o){var i=new Error(e);return a(i,t,n,r,o)};},function(e,t,n){e.exports=function(e){return !(!e||!e.__CANCEL__)};},function(e,t,n){function r(e){this.message=e;}r.prototype.toString=function(){return "Cancel"+(this.message?": "+this.message:"")},r.prototype.__CANCEL__=!0,e.exports=r;},function(e,t,n){e.exports=n(13)();},function(e,t,n){var s=n(14);function r(){}function o(){}o.resetWarningCache=r,e.exports=function(){function e(e,t,n,r,o,i){if(i!==s){var a=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw a.name="Invariant Violation",a}}function t(){return e}var n={array:e.isRequired=e,bool:e,func:e,number:e,object:e,string:e,symbol:e,any:e,arrayOf:t,element:e,elementType:e,instanceOf:t,node:e,objectOf:t,oneOf:t,oneOfType:t,shape:t,exact:t,checkPropTypes:o,resetWarningCache:r};return n.PropTypes=n};},function(e,t,n){e.exports="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";},function(e,t,n){var i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},r=s(n(16)),o=s(n(17)),a=s(n(20));function s(e){return e&&e.__esModule?e:{default:e}}n(21),void 0!==Object.assign&&"undefined"!==Object.assign||(Object.assign=r.default),void 0===window.Promise&&(window.Promise=o.default),void 0===Array.fill&&(Array.fill=a.default),String.prototype.format=function(e){var t=this;if(0<arguments.length)if(1==arguments.length&&"object"==(void 0===e?"undefined":i(e))){for(var n in e)if(null!=e[n]){var r=new RegExp("({"+n+"})","g");t=t.replace(r,e[n]);}}else for(var o=0;o<arguments.length;o++)if(null!=arguments[o]){r=new RegExp("({)"+o+"(})","g");t=t.replace(r,arguments[o]);}return t};},function(e,t,n){/*
	object-assign
	(c) Sindre Sorhus
	@license MIT
	*/var u=Object.getOwnPropertySymbols,c=Object.prototype.hasOwnProperty,f=Object.prototype.propertyIsEnumerable;e.exports=function(){try{if(!Object.assign)return !1;var e=new String("abc");if(e[5]="de","5"===Object.getOwnPropertyNames(e)[0])return !1;for(var t={},n=0;n<10;n++)t["_"+String.fromCharCode(n)]=n;if("0123456789"!==Object.getOwnPropertyNames(t).map(function(e){return t[e]}).join(""))return !1;var r={};return "abcdefghijklmnopqrst".split("").forEach(function(e){r[e]=e;}),"abcdefghijklmnopqrst"===Object.keys(Object.assign({},r)).join("")}catch(e){return !1}}()?Object.assign:function(e,t){for(var n,r,o=function(e){if(null==e)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(e)}(e),i=1;i<arguments.length;i++){for(var a in n=Object(arguments[i]))c.call(n,a)&&(o[a]=n[a]);if(u){r=u(n);for(var s=0;s<r.length;s++)f.call(n,r[s])&&(o[r[s]]=n[r[s]]);}}return o};},function(e,l,p){p.r(l),function(t){var e=p(6),n=setTimeout;function r(){}function i(e){if(!(this instanceof i))throw new TypeError("Promises must be constructed via new");if("function"!=typeof e)throw new TypeError("not a function");this._state=0,this._handled=!1,this._value=void 0,this._deferreds=[],f(e,this);}function o(n,r){for(;3===n._state;)n=n._value;0!==n._state?(n._handled=!0,i._immediateFn(function(){var e=1===n._state?r.onFulfilled:r.onRejected;if(null!==e){var t;try{t=e(n._value);}catch(e){return void s(r.promise,e)}a(r.promise,t);}else(1===n._state?a:s)(r.promise,n._value);})):n._deferreds.push(r);}function a(t,e){try{if(e===t)throw new TypeError("A promise cannot be resolved with itself.");if(e&&("object"==typeof e||"function"==typeof e)){var n=e.then;if(e instanceof i)return t._state=3,t._value=e,void u(t);if("function"==typeof n)return void f((r=n,o=e,function(){r.apply(o,arguments);}),t)}t._state=1,t._value=e,u(t);}catch(e){s(t,e);}var r,o;}function s(e,t){e._state=2,e._value=t,u(e);}function u(e){2===e._state&&0===e._deferreds.length&&i._immediateFn(function(){e._handled||i._unhandledRejectionFn(e._value);});for(var t=0,n=e._deferreds.length;t<n;t++)o(e,e._deferreds[t]);e._deferreds=null;}function c(e,t,n){this.onFulfilled="function"==typeof e?e:null,this.onRejected="function"==typeof t?t:null,this.promise=n;}function f(e,t){var n=!1;try{e(function(e){n||(n=!0,a(t,e));},function(e){n||(n=!0,s(t,e));});}catch(e){if(n)return;n=!0,s(t,e);}}i.prototype.catch=function(e){return this.then(null,e)},i.prototype.then=function(e,t){var n=new this.constructor(r);return o(this,new c(e,t,n)),n},i.prototype.finally=e.a,i.all=function(t){return new i(function(r,o){if(!t||void 0===t.length)throw new TypeError("Promise.all accepts an array");var i=Array.prototype.slice.call(t);if(0===i.length)return r([]);var a=i.length;function s(t,e){try{if(e&&("object"==typeof e||"function"==typeof e)){var n=e.then;if("function"==typeof n)return void n.call(e,function(e){s(t,e);},o)}i[t]=e,0==--a&&r(i);}catch(e){o(e);}}for(var e=0;e<i.length;e++)s(e,i[e]);})},i.resolve=function(t){return t&&"object"==typeof t&&t.constructor===i?t:new i(function(e){e(t);})},i.reject=function(n){return new i(function(e,t){t(n);})},i.race=function(o){return new i(function(e,t){for(var n=0,r=o.length;n<r;n++)o[n].then(e,t);})},i._immediateFn="function"==typeof t&&function(e){t(e);}||function(e){n(e,0);},i._unhandledRejectionFn=function(e){"undefined"!=typeof console&&console&&console.warn("Possible Unhandled Promise Rejection:",e);},l.default=i;}.call(this,p(18).setImmediate);},function(e,o,i){(function(e){var t=void 0!==e&&e||"undefined"!=typeof self&&self||window,n=Function.prototype.apply;function r(e,t){this._id=e,this._clearFn=t;}o.setTimeout=function(){return new r(n.call(setTimeout,t,arguments),clearTimeout)},o.setInterval=function(){return new r(n.call(setInterval,t,arguments),clearInterval)},o.clearTimeout=o.clearInterval=function(e){e&&e.close();},r.prototype.unref=r.prototype.ref=function(){},r.prototype.close=function(){this._clearFn.call(t,this._id);},o.enroll=function(e,t){clearTimeout(e._idleTimeoutId),e._idleTimeout=t;},o.unenroll=function(e){clearTimeout(e._idleTimeoutId),e._idleTimeout=-1;},o._unrefActive=o.active=function(e){clearTimeout(e._idleTimeoutId);var t=e._idleTimeout;0<=t&&(e._idleTimeoutId=setTimeout(function(){e._onTimeout&&e._onTimeout();},t));},i(19),o.setImmediate="undefined"!=typeof self&&self.setImmediate||void 0!==e&&e.setImmediate||this&&this.setImmediate,o.clearImmediate="undefined"!=typeof self&&self.clearImmediate||void 0!==e&&e.clearImmediate||this&&this.clearImmediate;}).call(this,i(3));},function(e,t,n){(function(e,h){!function(n,r){if(!n.setImmediate){var o,i,t,a,e,s=1,u={},c=!1,f=n.document,l=Object.getPrototypeOf&&Object.getPrototypeOf(n);l=l&&l.setTimeout?l:n,o="[object process]"==={}.toString.call(n.process)?function(e){h.nextTick(function(){d(e);});}:function(){if(n.postMessage&&!n.importScripts){var e=!0,t=n.onmessage;return n.onmessage=function(){e=!1;},n.postMessage("","*"),n.onmessage=t,e}}()?(a="setImmediate$"+Math.random()+"$",e=function(e){e.source===n&&"string"==typeof e.data&&0===e.data.indexOf(a)&&d(+e.data.slice(a.length));},n.addEventListener?n.addEventListener("message",e,!1):n.attachEvent("onmessage",e),function(e){n.postMessage(a+e,"*");}):n.MessageChannel?((t=new MessageChannel).port1.onmessage=function(e){d(e.data);},function(e){t.port2.postMessage(e);}):f&&"onreadystatechange"in f.createElement("script")?(i=f.documentElement,function(e){var t=f.createElement("script");t.onreadystatechange=function(){d(e),t.onreadystatechange=null,i.removeChild(t),t=null;},i.appendChild(t);}):function(e){setTimeout(d,0,e);},l.setImmediate=function(e){"function"!=typeof e&&(e=new Function(""+e));for(var t=new Array(arguments.length-1),n=0;n<t.length;n++)t[n]=arguments[n+1];var r={callback:e,args:t};return u[s]=r,o(s),s++},l.clearImmediate=p;}function p(e){delete u[e];}function d(e){if(c)setTimeout(d,0,e);else{var t=u[e];if(t){c=!0;try{!function(e){var t=e.callback,n=e.args;switch(n.length){case 0:t();break;case 1:t(n[0]);break;case 2:t(n[0],n[1]);break;case 3:t(n[0],n[1],n[2]);break;default:t.apply(r,n);}}(t);}finally{p(e),c=!1;}}}}}("undefined"==typeof self?void 0===e?this:e:self);}).call(this,n(3),n(4));},function(e,t){!function(){if(!Array.prototype.fill){var e=function(e){if(null==this)throw new TypeError("this is null or not defined");for(var t=Object(this),n=t.length>>>0,r=arguments[1]>>0,o=r<0?Math.max(n+r,0):Math.min(r,n),i=arguments[2],a=void 0===i?n:i>>0,s=a<0?Math.max(n+a,0):Math.min(a,n);o<s;)t[o]=e,o++;return t};if(Object.defineProperty)try{Object.defineProperty(Array.prototype,"fill",{value:e,configurable:!0,enumerable:!1,writable:!0});}catch(e){}Array.prototype.fill||(Array.prototype.fill=e);}}();},function(e,t,n){n.r(t),n.d(t,"Headers",function(){return c}),n.d(t,"Request",function(){return m}),n.d(t,"Response",function(){return b}),n.d(t,"DOMException",function(){return g}),n.d(t,"fetch",function(){return T});var s={searchParams:"URLSearchParams"in self,iterable:"Symbol"in self&&"iterator"in Symbol,blob:"FileReader"in self&&"Blob"in self&&function(){try{return new Blob,!0}catch(e){return !1}}(),formData:"FormData"in self,arrayBuffer:"ArrayBuffer"in self};if(s.arrayBuffer)var r=["[object Int8Array]","[object Uint8Array]","[object Uint8ClampedArray]","[object Int16Array]","[object Uint16Array]","[object Int32Array]","[object Uint32Array]","[object Float32Array]","[object Float64Array]"],o=ArrayBuffer.isView||function(e){return e&&-1<r.indexOf(Object.prototype.toString.call(e))};function i(e){if("string"!=typeof e&&(e=String(e)),/[^a-z0-9\-#$%&'*+.^_`|~]/i.test(e))throw new TypeError("Invalid character in header field name");return e.toLowerCase()}function a(e){return "string"!=typeof e&&(e=String(e)),e}function u(t){var e={next:function(){var e=t.shift();return {done:void 0===e,value:e}}};return s.iterable&&(e[Symbol.iterator]=function(){return e}),e}function c(t){this.map={},t instanceof c?t.forEach(function(e,t){this.append(t,e);},this):Array.isArray(t)?t.forEach(function(e){this.append(e[0],e[1]);},this):t&&Object.getOwnPropertyNames(t).forEach(function(e){this.append(e,t[e]);},this);}function f(e){if(e.bodyUsed)return Promise.reject(new TypeError("Already read"));e.bodyUsed=!0;}function l(n){return new Promise(function(e,t){n.onload=function(){e(n.result);},n.onerror=function(){t(n.error);};})}function p(e){var t=new FileReader,n=l(t);return t.readAsArrayBuffer(e),n}function d(e){if(e.slice)return e.slice(0);var t=new Uint8Array(e.byteLength);return t.set(new Uint8Array(e)),t.buffer}function h(){return this.bodyUsed=!1,this._initBody=function(e){var t;(this._bodyInit=e)?"string"==typeof e?this._bodyText=e:s.blob&&Blob.prototype.isPrototypeOf(e)?this._bodyBlob=e:s.formData&&FormData.prototype.isPrototypeOf(e)?this._bodyFormData=e:s.searchParams&&URLSearchParams.prototype.isPrototypeOf(e)?this._bodyText=e.toString():s.arrayBuffer&&s.blob&&((t=e)&&DataView.prototype.isPrototypeOf(t))?(this._bodyArrayBuffer=d(e.buffer),this._bodyInit=new Blob([this._bodyArrayBuffer])):s.arrayBuffer&&(ArrayBuffer.prototype.isPrototypeOf(e)||o(e))?this._bodyArrayBuffer=d(e):this._bodyText=e=Object.prototype.toString.call(e):this._bodyText="",this.headers.get("content-type")||("string"==typeof e?this.headers.set("content-type","text/plain;charset=UTF-8"):this._bodyBlob&&this._bodyBlob.type?this.headers.set("content-type",this._bodyBlob.type):s.searchParams&&URLSearchParams.prototype.isPrototypeOf(e)&&this.headers.set("content-type","application/x-www-form-urlencoded;charset=UTF-8"));},s.blob&&(this.blob=function(){var e=f(this);if(e)return e;if(this._bodyBlob)return Promise.resolve(this._bodyBlob);if(this._bodyArrayBuffer)return Promise.resolve(new Blob([this._bodyArrayBuffer]));if(this._bodyFormData)throw new Error("could not read FormData body as blob");return Promise.resolve(new Blob([this._bodyText]))},this.arrayBuffer=function(){return this._bodyArrayBuffer?f(this)||Promise.resolve(this._bodyArrayBuffer):this.blob().then(p)}),this.text=function(){var e,t,n,r=f(this);if(r)return r;if(this._bodyBlob)return e=this._bodyBlob,t=new FileReader,n=l(t),t.readAsText(e),n;if(this._bodyArrayBuffer)return Promise.resolve(function(e){for(var t=new Uint8Array(e),n=new Array(t.length),r=0;r<t.length;r++)n[r]=String.fromCharCode(t[r]);return n.join("")}(this._bodyArrayBuffer));if(this._bodyFormData)throw new Error("could not read FormData body as text");return Promise.resolve(this._bodyText)},s.formData&&(this.formData=function(){return this.text().then(v)}),this.json=function(){return this.text().then(JSON.parse)},this}c.prototype.append=function(e,t){e=i(e),t=a(t);var n=this.map[e];this.map[e]=n?n+", "+t:t;},c.prototype.delete=function(e){delete this.map[i(e)];},c.prototype.get=function(e){return e=i(e),this.has(e)?this.map[e]:null},c.prototype.has=function(e){return this.map.hasOwnProperty(i(e))},c.prototype.set=function(e,t){this.map[i(e)]=a(t);},c.prototype.forEach=function(e,t){for(var n in this.map)this.map.hasOwnProperty(n)&&e.call(t,this.map[n],n,this);},c.prototype.keys=function(){var n=[];return this.forEach(function(e,t){n.push(t);}),u(n)},c.prototype.values=function(){var t=[];return this.forEach(function(e){t.push(e);}),u(t)},c.prototype.entries=function(){var n=[];return this.forEach(function(e,t){n.push([t,e]);}),u(n)},s.iterable&&(c.prototype[Symbol.iterator]=c.prototype.entries);var y=["DELETE","GET","HEAD","OPTIONS","POST","PUT"];function m(e,t){var n,r,o=(t=t||{}).body;if(e instanceof m){if(e.bodyUsed)throw new TypeError("Already read");this.url=e.url,this.credentials=e.credentials,t.headers||(this.headers=new c(e.headers)),this.method=e.method,this.mode=e.mode,this.signal=e.signal,o||null==e._bodyInit||(o=e._bodyInit,e.bodyUsed=!0);}else this.url=String(e);if(this.credentials=t.credentials||this.credentials||"same-origin",!t.headers&&this.headers||(this.headers=new c(t.headers)),this.method=(n=t.method||this.method||"GET",r=n.toUpperCase(),-1<y.indexOf(r)?r:n),this.mode=t.mode||this.mode||null,this.signal=t.signal||this.signal,this.referrer=null,("GET"===this.method||"HEAD"===this.method)&&o)throw new TypeError("Body not allowed for GET or HEAD requests");this._initBody(o);}function v(e){var o=new FormData;return e.trim().split("&").forEach(function(e){if(e){var t=e.split("="),n=t.shift().replace(/\+/g," "),r=t.join("=").replace(/\+/g," ");o.append(decodeURIComponent(n),decodeURIComponent(r));}}),o}function b(e,t){t||(t={}),this.type="default",this.status=void 0===t.status?200:t.status,this.ok=200<=this.status&&this.status<300,this.statusText="statusText"in t?t.statusText:"OK",this.headers=new c(t.headers),this.url=t.url||"",this._initBody(e);}m.prototype.clone=function(){return new m(this,{body:this._bodyInit})},h.call(m.prototype),h.call(b.prototype),b.prototype.clone=function(){return new b(this._bodyInit,{status:this.status,statusText:this.statusText,headers:new c(this.headers),url:this.url})},b.error=function(){var e=new b(null,{status:0,statusText:""});return e.type="error",e};var w=[301,302,303,307,308];b.redirect=function(e,t){if(-1===w.indexOf(t))throw new RangeError("Invalid status code");return new b(null,{status:t,headers:{location:e}})};var g=self.DOMException;try{new g;}catch(e){(g=function(e,t){this.message=e,this.name=t;var n=Error(e);this.stack=n.stack;}).prototype=Object.create(Error.prototype),g.prototype.constructor=g;}function T(o,a){return new Promise(function(r,e){var t=new m(o,a);if(t.signal&&t.signal.aborted)return e(new g("Aborted","AbortError"));var i=new XMLHttpRequest;function n(){i.abort();}i.onload=function(){var e,o,t={status:i.status,statusText:i.statusText,headers:(e=i.getAllResponseHeaders()||"",o=new c,e.replace(/\r?\n[\t ]+/g," ").split(/\r?\n/).forEach(function(e){var t=e.split(":"),n=t.shift().trim();if(n){var r=t.join(":").trim();o.append(n,r);}}),o)};t.url="responseURL"in i?i.responseURL:t.headers.get("X-Request-URL");var n="response"in i?i.response:i.responseText;r(new b(n,t));},i.onerror=function(){e(new TypeError("Network request failed"));},i.ontimeout=function(){e(new TypeError("Network request failed"));},i.onabort=function(){e(new g("Aborted","AbortError"));},i.open(t.method,t.url,!0),"include"===t.credentials?i.withCredentials=!0:"omit"===t.credentials&&(i.withCredentials=!1),"responseType"in i&&s.blob&&(i.responseType="blob"),t.headers.forEach(function(e,t){i.setRequestHeader(t,e);}),t.signal&&(t.signal.addEventListener("abort",n),i.onreadystatechange=function(){4===i.readyState&&t.signal.removeEventListener("abort",n);}),i.send(void 0===t._bodyInit?null:t._bodyInit);})}T.polyfill=!0,self.fetch||(self.fetch=T,self.Headers=c,self.Request=m,self.Response=b);},function(e,t,n){Object.defineProperty(t,"__esModule",{value:!0});var r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r]);}return e},o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};t.post=function(e){var t=1<arguments.length&&void 0!==arguments[1]?arguments[1]:{},n=u.fetch,r=u.options;try{return n(e,r("post",{headers:{"Content-Type":"application/json;charset=UTF-8"},body:JSON.stringify(t)}))}catch(e){return Promise.reject(e)}},t.get=function(e){var t=1<arguments.length&&void 0!==arguments[1]?arguments[1]:{},n=u.params,r=u.fetch,o=u.options,i=n(t);if(i)return r(e+"?"+i,o());return r(e,o())},t.fetchJ=function(e){var t=1<arguments.length&&void 0!==arguments[1]?arguments[1]:{},n=u.params,r=(n(t));return (0, i.default)(e+"?"+r).then(function(e){return e.json()}).then(function(e){return console.log("parsed json",e),e}).catch(function(e){console.log("parsing failed",e);})};var i=s(n(23)),a=s(n(24));function s(e){return e&&e.__esModule?e:{default:e}}var u={params:function(n){try{return Object.keys(n).map(function(e){var t=n[e];switch(void 0===t?"undefined":o(t)){case"object":t=escape(JSON.stringify(t));break;case"undefined":t="";}return e+"="+t}).join("&")}catch(e){return ""}},fetch:function(n){function e(e,t){return n.apply(this,arguments)}return e.toString=function(){return n.toString()},e}(function(e,t){return fetch(e,t).then(function(e){return e.ok?e.text().then(function(e){try{return JSON.parse(e)}catch(e){return Promise.reject(new Error("接口返回数据无法解析"))}}):Promise.reject(new Error("请求失败"))},function(e){throw e})}),options:function(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:"get",t=1<arguments.length&&void 0!==arguments[1]?arguments[1]:{};return r({method:e.toUpperCase(),credentials:"include",cache:"no-cache",headers:{"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"}},t)}};t.default=function(e,t){return (0, a.default)({method:t.method,url:e,data:t.data,params:t.param}).catch(function(e){console.log(e);})};},function(e,t,n){var r,o,i;o=[t,e],void 0===(i="function"==typeof(r=function(e,t){var n={timeout:5e3,jsonpCallback:"callback",jsonpCallbackFunction:null};function l(t){try{delete window[t];}catch(e){window[t]=void 0;}}function p(e){var t=document.getElementById(e);t&&document.getElementsByTagName("head")[0].removeChild(t);}t.exports=function(i){var a=arguments.length<=1||void 0===arguments[1]?{}:arguments[1],s=i,u=a.timeout||n.timeout,c=a.jsonpCallback||n.jsonpCallback,f=void 0;return new Promise(function(t,e){var n=a.jsonpCallbackFunction||"jsonp_"+Date.now()+"_"+Math.ceil(1e5*Math.random()),r=c+"_"+n;window[n]=function(e){t({ok:!0,json:function(){return Promise.resolve(e)}}),f&&clearTimeout(f),p(r),l(n);},s+=-1===s.indexOf("?")?"?":"&";var o=document.createElement("script");o.setAttribute("src",""+s+c+"="+n),a.charset&&o.setAttribute("charset",a.charset),o.id=r,document.getElementsByTagName("head")[0].appendChild(o),f=setTimeout(function(){e(new Error("JSONP request to "+i+" timed out")),l(n),p(r),window[n]=function(){l(n);};},u),o.onerror=function(){e(new Error("JSONP request to "+i+" failed")),l(n),p(r),f&&clearTimeout(f);};})};})?r.apply(t,o):r)||(e.exports=i);},function(e,t,n){e.exports=n(25);},function(e,t,n){var r=n(0),o=n(7),i=n(27),a=n(5);function s(e){var t=new i(e),n=o(i.prototype.request,t);return r.extend(n,i.prototype,t),r.extend(n,t),n}var u=s(a);u.Axios=i,u.create=function(e){return s(r.merge(a,e))},u.Cancel=n(11),u.CancelToken=n(41),u.isCancel=n(10),u.all=function(e){return Promise.all(e)},u.spread=n(42),e.exports=u,e.exports.default=u;},function(e,t){function n(e){return !!e.constructor&&"function"==typeof e.constructor.isBuffer&&e.constructor.isBuffer(e)}
	/*!
	 * Determine if an object is a Buffer
	 *
	 * @author   Feross Aboukhadijeh <https://feross.org>
	 * @license  MIT
	 */
	e.exports=function(e){return null!=e&&(n(e)||"function"==typeof(t=e).readFloatLE&&"function"==typeof t.slice&&n(t.slice(0,0))||!!e._isBuffer);var t;};},function(e,t,n){var r=n(5),o=n(0),i=n(36),a=n(37);function s(e){this.defaults=e,this.interceptors={request:new i,response:new i};}s.prototype.request=function(e){"string"==typeof e&&(e=o.merge({url:arguments[0]},arguments[1])),(e=o.merge(r,{method:"get"},this.defaults,e)).method=e.method.toLowerCase();var t=[a,void 0],n=Promise.resolve(e);for(this.interceptors.request.forEach(function(e){t.unshift(e.fulfilled,e.rejected);}),this.interceptors.response.forEach(function(e){t.push(e.fulfilled,e.rejected);});t.length;)n=n.then(t.shift(),t.shift());return n},o.forEach(["delete","get","head","options"],function(n){s.prototype[n]=function(e,t){return this.request(o.merge(t||{},{method:n,url:e}))};}),o.forEach(["post","put","patch"],function(r){s.prototype[r]=function(e,t,n){return this.request(o.merge(n||{},{method:r,url:e,data:t}))};}),e.exports=s;},function(e,t,n){var o=n(0);e.exports=function(n,r){o.forEach(n,function(e,t){t!==r&&t.toUpperCase()===r.toUpperCase()&&(n[r]=e,delete n[t]);});};},function(e,t,n){var o=n(9);e.exports=function(e,t,n){var r=n.config.validateStatus;n.status&&r&&!r(n.status)?t(o("Request failed with status code "+n.status,n.config,null,n.request,n)):e(n);};},function(e,t,n){e.exports=function(e,t,n,r,o){return e.config=t,n&&(e.code=n),e.request=r,e.response=o,e};},function(e,t,n){var i=n(0);function a(e){return encodeURIComponent(e).replace(/%40/gi,"@").replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")}e.exports=function(e,t,n){if(!t)return e;var r;if(n)r=n(t);else if(i.isURLSearchParams(t))r=t.toString();else{var o=[];i.forEach(t,function(e,t){null!=e&&(i.isArray(e)?t+="[]":e=[e],i.forEach(e,function(e){i.isDate(e)?e=e.toISOString():i.isObject(e)&&(e=JSON.stringify(e)),o.push(a(t)+"="+a(e));}));}),r=o.join("&");}return r&&(e+=(-1===e.indexOf("?")?"?":"&")+r),e};},function(e,t,n){var i=n(0),a=["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"];e.exports=function(e){var t,n,r,o={};return e&&i.forEach(e.split("\n"),function(e){if(r=e.indexOf(":"),t=i.trim(e.substr(0,r)).toLowerCase(),n=i.trim(e.substr(r+1)),t){if(o[t]&&0<=a.indexOf(t))return;o[t]="set-cookie"===t?(o[t]?o[t]:[]).concat([n]):o[t]?o[t]+", "+n:n;}}),o};},function(e,t,n){var a=n(0);e.exports=a.isStandardBrowserEnv()?function(){var n,r=/(msie|trident)/i.test(navigator.userAgent),o=document.createElement("a");function i(e){var t=e;return r&&(o.setAttribute("href",t),t=o.href),o.setAttribute("href",t),{href:o.href,protocol:o.protocol?o.protocol.replace(/:$/,""):"",host:o.host,search:o.search?o.search.replace(/^\?/,""):"",hash:o.hash?o.hash.replace(/^#/,""):"",hostname:o.hostname,port:o.port,pathname:"/"===o.pathname.charAt(0)?o.pathname:"/"+o.pathname}}return n=i(window.location.href),function(e){var t=a.isString(e)?i(e):e;return t.protocol===n.protocol&&t.host===n.host}}():function(){return !0};},function(e,t,n){function s(){this.message="String contains an invalid character";}(s.prototype=new Error).code=5,s.prototype.name="InvalidCharacterError",e.exports=function(e){for(var t,n,r=String(e),o="",i=0,a="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";r.charAt(0|i)||(a="=",i%1);o+=a.charAt(63&t>>8-i%1*8)){if(255<(n=r.charCodeAt(i+=.75)))throw new s;t=t<<8|n;}return o};},function(e,t,n){var s=n(0);e.exports=s.isStandardBrowserEnv()?{write:function(e,t,n,r,o,i){var a=[];a.push(e+"="+encodeURIComponent(t)),s.isNumber(n)&&a.push("expires="+new Date(n).toGMTString()),s.isString(r)&&a.push("path="+r),s.isString(o)&&a.push("domain="+o),!0===i&&a.push("secure"),document.cookie=a.join("; ");},read:function(e){var t=document.cookie.match(new RegExp("(^|;\\s*)("+e+")=([^;]*)"));return t?decodeURIComponent(t[3]):null},remove:function(e){this.write(e,"",Date.now()-864e5);}}:{write:function(){},read:function(){return null},remove:function(){}};},function(e,t,n){var r=n(0);function o(){this.handlers=[];}o.prototype.use=function(e,t){return this.handlers.push({fulfilled:e,rejected:t}),this.handlers.length-1},o.prototype.eject=function(e){this.handlers[e]&&(this.handlers[e]=null);},o.prototype.forEach=function(t){r.forEach(this.handlers,function(e){null!==e&&t(e);});},e.exports=o;},function(e,t,n){var r=n(0),o=n(38),i=n(10),a=n(5),s=n(39),u=n(40);function c(e){e.cancelToken&&e.cancelToken.throwIfRequested();}e.exports=function(t){return c(t),t.baseURL&&!s(t.url)&&(t.url=u(t.baseURL,t.url)),t.headers=t.headers||{},t.data=o(t.data,t.headers,t.transformRequest),t.headers=r.merge(t.headers.common||{},t.headers[t.method]||{},t.headers||{}),r.forEach(["delete","get","head","post","put","patch","common"],function(e){delete t.headers[e];}),(t.adapter||a.adapter)(t).then(function(e){return c(t),e.data=o(e.data,e.headers,t.transformResponse),e},function(e){return i(e)||(c(t),e&&e.response&&(e.response.data=o(e.response.data,e.response.headers,t.transformResponse))),Promise.reject(e)})};},function(e,t,n){var r=n(0);e.exports=function(t,n,e){return r.forEach(e,function(e){t=e(t,n);}),t};},function(e,t,n){e.exports=function(e){return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(e)};},function(e,t,n){e.exports=function(e,t){return t?e.replace(/\/+$/,"")+"/"+t.replace(/^\/+/,""):e};},function(e,t,n){var r=n(11);function o(e){if("function"!=typeof e)throw new TypeError("executor must be a function.");var t;this.promise=new Promise(function(e){t=e;});var n=this;e(function(e){n.reason||(n.reason=new r(e),t(n.reason));});}o.prototype.throwIfRequested=function(){if(this.reason)throw this.reason},o.source=function(){var t;return {token:new o(function(e){t=e;}),cancel:t}},e.exports=o;},function(e,t,n){e.exports=function(t){return function(e){return t.apply(null,e)}};},,,,,,,,,,,,,,,,,,,function(e,t,n){Object.defineProperty(t,"__esModule",{value:!0});var d=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r]);}return e},r=function(){function r(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r);}}return function(e,t,n){return t&&r(e.prototype,t),n&&r(e,n),e}}(),o=n(1),h=a(o),i=a(n(12)),s=n(22),y=n(2);function a(e){return e&&e.__esModule?e:{default:e}}n(62),n(15);var u=function(e){if(!e)return {refname:"",refpk:""};try{var t=JSON.parse(e);return t.hasOwnProperty("refname")&&t.hasOwnProperty("refpk")?t:{refname:"",refpk:""}}catch(e){return {refname:"",refpk:""}}},c={matchUrl:i.default.string,param:i.default.object,style:i.default.object,valueField:i.default.string,filterUrl:i.default.string,value:i.default.string,wrapClassName:i.default.string,canClickGoOn:i.default.func,canInputGoOn:i.default.func},f=function(e){return h.default.createElement("li",{className:"ref-filter-item",onClick:function(e){"filteritem"!==e.target.dataset.type&&(e.target.dataset.type="filteritem");},"data-value":e.value,"data-type":"filteritem"},e.text)},l=function(e){function n(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,n);var p=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return !t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(n.__proto__||Object.getPrototypeOf(n)).call(this,e));p.handleChange=function(e,t){var n=p.props,r=n.onChange;e!==n.value&&r&&r(e,t);},p.onCancelModal=function(e){p.setState({isClick:!1,showModal:!1}),p.props.onCancel(e,p.refDom);},p.onSaveModal=function(e){var t=p.props,n=t.displayField,r=void 0===n?"{refname}":n,o=t.valueField,i=t.onSave,a=e.map(function(e){return e[o]}).join(","),s=e.map(function(e){return "function"==typeof r?r(e):r.format(e)}).join(";");p.setState({checkedArray:e,savedData:a,savedShow:s,isClick:!1,showModal:!1},function(){i(e,s,p.refDom),p.handleChange(JSON.stringify({refname:s,refpk:a}),e);});},p.handleClick=function(){var e=p.state.isClick;p.props.disabled||e||p.props.canClickGoOn()&&p.setState({isClick:!0,showModal:!0});},p.onClickFilterItem=function(e){e.stopPropagation();var t=e.target.dataset,n=void 0===t?{}:t;if("filteritem"===n.type){var r=p.state.filterDataMap,o=p.props,i=o.displayField,a=void 0===i?"{refname}":i,s=o.valueField,u=o.onSave,c=r[n.value],f=c[s],l="";l="function"==typeof a?a(c):a.format(c),p.setState({savedData:f,savedShow:l,filtering:!1,checkedArray:[r[n.value]]},function(){p.handleChange(JSON.stringify({refname:l,refpk:n.value})),u([c]);});}},p.onFilter=function(e){if(e){var t=p.props,n=t.filterUrl,r=t.param,i=t.valueField,o=t.displayField,a=void 0===o?"{refname}":o;(0, s.get)(n,d({},r,{refCode:r.refCode,content:e})).then(function(e){var t=e.data,r=[],o={};t.forEach(function(e){var t=e[i],n="";n="function"==typeof a?a(e):a.format(e),r.push(h.default.createElement(f,{key:t,text:n,value:t})),o[t]=e;}),p.setState({filterItems:r,filterDataMap:o});});}},p.onChangeFormControl=function(e){p.props.canInputGoOn(e)&&(p.setState({filterText:e,filtering:!0}),p.onFilter(e));},p.onBlurFormControl=function(){p.setState({filterText:"",filtering:Boolean(p.selectFilter)});},p.onFocusFormControl=function(){},p.onFilterMouseEnter=function(){p.selectFilter=!0;},p.onFilterMouseLeave=function(){p.selectFilter=!1;},p.onMatchInitValue=function(e){p.setState({checkedArray:e});};var t=u(e.value)||{};return p.state={checkedArray:[],savedData:"",savedShow:t.refname,filterText:"",filterItems:[],filterDataMap:{},filtering:!1,showModal:!1},p.childrenComponent=p.props.children,p}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t);}(n,o.Component),r(n,[{key:"componentDidMount",value:function(){}},{key:"componentWillReceiveProps",value:function(e){var t=this;if(e.value===this.props.value)return !1;var n=u(e.value)||{},r=this.props.valueField,o=this.state.checkedArray,i=o.some(function(e){return !Boolean(~n.refpk.indexOf(e[r]))});return this.setState({checkedArray:i?[]:o,savedShow:n.refname},function(){t.handleChange(e.value);}),!0}},{key:"render",value:function(){var e=this.state,t=e.savedShow,n=(e.savedData,e.filterItems),r=e.filtering,o=e.filterText,i=e.checkedArray,a=e.showModal,s=this.props,u=(s.displayField,s.valueField,s.form,s.rules,s.className,s.wrapClassName),c=s.disabled,f=s.style,l=s.placeholder,p=Object.assign(Object.assign({},this.props),{showModal:a,checkedArray:i,onCancel:this.onCancelModal,onSave:this.onSaveModal,onMatchInitValue:this.onMatchInitValue});return delete p.children,h.default.createElement("div",{className:"ref-input-wrap "+u,style:d({},f)},h.default.createElement(y.InputGroup,{simple:!0,style:{width:"100%"}},h.default.createElement(y.FormControl,d({disabled:c,type:"text",style:{width:"100%"}},t?{readOnly:"readonly"}:"",{placeholder:l,value:r?o:t,onFocus:this.onFocusFormControl,onChange:this.onChangeFormControl,onBlur:this.onBlurFormControl})),h.default.createElement(y.InputGroup.Button,{shape:"border",className:"ref-input-wrap-icon-navmenu "+(c?"ref-input-wrap-display":""),onClick:this.handleClick})),h.default.cloneElement(this.childrenComponent,p),h.default.createElement("div",{className:"ref-input-wrap-filter-panel",style:{display:r?"":"none",width:f.width||200}},h.default.createElement("ul",{onClick:this.onClickFilterItem,onMouseEnter:this.onFilterMouseEnter,onMouseLeave:this.onFilterMouseLeave},n.length?n.map(function(e){return e}):h.default.createElement("li",{className:"ref-filter-empty"},"没有匹配到数据"))))}}]),n}();l.propTypes=c,l.defaultProps={className:"",backdrop:!0,style:{width:200},param:{refCode:"test_common"},onCancel:function(e){},onSave:function(e){},value:"",valueField:"refpk",matchUrl:"",filterUrl:"",wrapClassName:"",canClickGoOn:function(){return !0},canInputGoOn:function(){return !0}},t.default=l;},function(e,t,n){}])});
	});

	var RefWithInput = unwrapExports(refcorewithinput);
	var refcorewithinput_1 = refcorewithinput.expression;

	function _assertThisInitialized(self) {
	  if (self === void 0) {
	    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	  }

	  return self;
	}

	var assertThisInitialized = _assertThisInitialized;

	var request = (function (url, options) {
	  var params = Object.assign({}, options.param, {
	    r: Math.random()
	  });
	  return axios({
	    method: options.method,
	    url: url,
	    data: options.data,
	    headers: {
	      'X-Requested-With': 'XMLHttpRequest'
	    },
	    params: params // timeout: 20000

	  }).catch(function (err) {
	    console.log(err);
	    var res = err.response;

	    if (res) {
	      var status = res.status,
	          msg = res.data.msg;

	      switch (status) {
	        case 401:
	          console.log("RBAC鉴权失败!" + msg);
	          return Promise.resolve(res);

	        case 306:
	          window.top.location.href = '/wbalone/pages/login/login.html';
	          break;

	        default:
	      }
	    } // setTimeout(() => {
	    //     if (err.message == 'Network Error' || err.response == undefined) {
	    //         window.top.location.href = '/wbalone/pages/login/login.html';
	    //     }
	    // }, 3000);

	  });
	});

	var _dec, _class, _temp;
	var Table = (_dec = miniStore.connect(function (state) {
	  return {
	    view: state.meta.viewApplication.view
	  };
	}), _dec(_class = (_temp =
	/*#__PURE__*/
	function (_Component) {
	  inheritsLoose(Table, _Component);

	  //表头数据
	  //表格数据
	  //总页数
	  //每页数据数
	  //激活页码
	  function Table(props) {
	    var _this2;

	    _this2 = _Component.call(this, props) || this;
	    _this2.columnsData = [];
	    _this2.tableData = [];
	    _this2.pageCount = 1;
	    _this2.pageSize = '10';
	    _this2.currPageIndex = 1;
	    _this2.fliterFormInputs = [];
	    _this2.filterInfo = {};

	    _this2.initComponent = function () {
	      var _this2$props = _this2.props,
	          param = _this2$props.param,
	          valueField = _this2$props.valueField,
	          displayField = _this2$props.displayField,
	          value = _this2$props.value,
	          onMatchInitValue = _this2$props.onMatchInitValue;
	      param.page = {
	        "pageSize": 10,
	        "pageIndex": 1
	      };

	      var _this = assertThisInitialized(_this2);

	      var requestList = [_this.getTableHeader(), _this.getTableData(param)];
	      var valueMap = refValParse(value, valueField, displayField);

	      if (_this.checkedArray.length == 0 && valueMap[valueField]) {
	        requestList.push(new Promise(function (resolve, reject) {
	          resolve({
	            data: []
	          });
	        }));
	      }
	      Promise.all(requestList).then(function (_ref) {
	        var columnsData = _ref[0],
	            bodyData = _ref[1],
	            matchData = _ref[2];

	        if (_this.onAfterAjax) {
	          _this.onAfterAjax(bodyData);
	        }

	        if (matchData) {
	          var _matchData$data = matchData.data,
	              data = _matchData$data === void 0 ? [] : _matchData$data;
	          _this.checkedMap = {};
	          _this.checkedArray = data.map(function (item) {
	            item.key = item[valueField];
	            item._checked = true;
	            _this.checkedMap[item.key] = item;
	            return item;
	          });

	          if (Object.prototype.toString.call(onMatchInitValue) === '[object Function]') {
	            onMatchInitValue(data);
	          }

	          _this.setState({
	            selectedDataLength: _this2.checkedArray.length,
	            mustRender: Math.random()
	          });
	        }

	        _this.launchTableHeader(columnsData);

	        _this.launchTableData(bodyData);

	        _this.setState({
	          showLoading: false
	        });
	      }).catch(function (e) {
	        _this.launchTableHeader({});

	        _this.launchTableData({});

	        _this.setState({
	          showLoading: false
	        });

	        console.error(e);
	      });
	    };

	    _this2.convertMetaTableData = function (view) {
	      var strFieldCode = [],
	          strFieldName = [];
	      var tpl = {
	        "refUIType": "RefTable",
	        "refCode": "new_bd_staff",
	        "defaultFieldCount": 4,
	        "strFieldCode": [],
	        "strFieldName": [],
	        "rootName": "人员-平台表",
	        "refName": "人员-平台表",
	        "refClientPageInfo": {
	          "pageSize": 100,
	          "currPageIndex": 0,
	          "pageCount": 0,
	          "totalElements": 0
	        },
	        "refVertion": "NewRef"
	      };
	      console.log('view', view);
	      view.containers[0].controls.forEach(function (item) {
	        strFieldCode.push(item.cFieldName);
	        strFieldName.push(item.cCaption);
	      });
	      tpl['rootName'] = view.cTemplateTitle;
	      tpl['refName'] = view.cTemplateTitle;
	      tpl['defaultFieldCount'] = strFieldCode.length;
	      tpl['strFieldCode'] = strFieldCode;
	      tpl['strFieldName'] = strFieldName;
	      console.log('tpl', tpl);
	      return tpl;
	    };

	    _this2.getTableHeader = function () {
	      var view = _this2.props.view;
	      return new Promise(function (resolve, reject) {
	        resolve(_this2.convertMetaTableData(view));
	      });
	    };

	    _this2.getTableData = function (params) {
	      var refModelUrl = _this2.props.refModelUrl;
	      return request(refModelUrl.tableBodyUrl, {
	        method: 'post',
	        data: params
	      });
	    };

	    _this2.launchTableHeader = function (data) {
	      if (!data) return;
	      var multiple = _this2.props.multiple;
	      var keyList = data.strFieldCode || [];
	      var titleList = data.strFieldName || [];
	      _this2.fliterFormInputs = [];
	      var colunmsList = keyList.map(function (item, index) {
	        _this2.fliterFormInputs.push(React__default.createElement(RefMultipleTableBaseUI.SearchPanelItem, {
	          key: item,
	          name: item,
	          text: titleList[index]
	        }, React__default.createElement(tinperBee.FormControl, null)));

	        return {
	          key: item,
	          dataIndex: item,
	          title: titleList[index]
	        };
	      });

	      if (colunmsList.length === 0) {
	        colunmsList = [{
	          title: "未传递表头数据",
	          dataIndex: "nodata",
	          key: "nodata"
	        }];
	      } else if (!multiple) {
	        //单选时用对号符号标记当前行选中
	        colunmsList.unshift({
	          title: " ",
	          dataIndex: "a",
	          key: "a",
	          width: 45,
	          render: function render(text, record, index) {
	            return React__default.createElement("div", {
	              className: "ref-multiple-table-radio " + (record._checked ? 'ref-multiple-table-radio-on' : '')
	            });
	          }
	        });
	      }

	      _this2.columnsData = colunmsList;
	    };

	    _this2.launchTableData = function (response) {
	      if (!response) return;
	      var valueField = _this2.props.valueField; // valueField = 'id';
	      // let { data = [], page = {} } = response;

	      var data = response.data.data;
	      var tableData = data && data.recordList ? data.recordList : [];
	      tableData.map(function (record, k) {
	        record.key = record[valueField];
	        return record;
	      });
	      _this2.tableData = tableData;
	      _this2.pageCount = data.pageCount || 0;
	      _this2.currPageIndex = data.pageIndex || 0;
	      _this2.totalElements = data.recordCount || 0;
	    };

	    _this2.loadTableData = function (param) {
	      _this2.setState({
	        showLoading: true
	      });

	      var _this = assertThisInitialized(_this2);

	      _this2.getTableData(param).then(function (response) {
	        _this.launchTableData(response);

	        _this.setState({
	          showLoading: false
	        });
	      }).catch(function () {
	        _this.launchTableData({});

	        _this.setState({
	          showLoading: false
	        });
	      });
	    };

	    _this2.searchFilterInfo = function (filterInfo) {
	      var _this = assertThisInitialized(_this2);

	      var _this2$props2 = _this2.props,
	          tableBodyUrl = _this2$props2.refModelUrl.tableBodyUrl,
	          param = _this2$props2.param,
	          jsonp = _this2$props2.jsonp,
	          headers = _this2$props2.headers;
	      _this2.filterInfo = filterInfo;

	      _this2.setState({
	        showLoading: true // tableIsSelecting: true

	      }, function () {
	        var pageSize = _this.pageSize;
	        var paramWithFilter = Object.assign({}, param, {
	          page: 0,
	          pageSize: pageSize,
	          content: '',
	          'refClientPageInfo.currPageIndex': 0,
	          'refClientPageInfo.pageSize': pageSize
	        });

	        if (Object.keys(filterInfo).length > 0) {
	          paramWithFilter.content = JSON.stringify(filterInfo);
	        }

	        _this.loadTableData(paramWithFilter);
	      });
	    };

	    _this2.handlePagination = function (index) {
	      var _assertThisInitialize = assertThisInitialized(_this2),
	          filterInfo = _assertThisInitialize.filterInfo;

	      var param = _this2.props.param;
	      Object.keys(filterInfo).forEach(function (key) {
	        if (!filterInfo[key]) {
	          delete filterInfo[key];
	        }
	      });
	      param.page = {
	        "pageSize": _this2.pageSize,
	        "pageIndex": index - 1
	      };

	      if (Object.keys(filterInfo) > 0) {
	        param.content = JSON.stringify(filterInfo);
	      }

	      _this2.loadTableData(param);
	    };

	    _this2.dataNumSelect = function (index, pageSize) {
	      var _assertThisInitialize2 = assertThisInitialized(_this2),
	          filterInfo = _assertThisInitialize2.filterInfo;

	      var param = _this2.props.param;
	      Object.keys(filterInfo).forEach(function (key) {
	        if (!filterInfo[key]) {
	          delete filterInfo[key];
	        }
	      });
	      param.page = {
	        "pageSize": pageSize,
	        "pageIndex": _this2.currPageIndex - 1
	      };

	      if (Object.keys(filterInfo) > 0) {
	        param.content = JSON.stringify(filterInfo);
	      }

	      _this2.pageSize = pageSize;

	      _this2.loadTableData(param);
	    };

	    _this2.state = {
	      showLoading: true,
	      selectedDataLength: 0,
	      mustRender: 0,
	      showModal: true
	    };
	    _this2.checkedArray = [];
	    _this2.checkedMap = {};
	    _this2.inited = false;
	    return _this2;
	  }

	  var _proto = Table.prototype;

	  _proto.componentDidMount = function componentDidMount() {
	    this.initComponent();
	  };

	  /** end:分页*/
	  _proto.render = function render() {
	    var showLoading = this.state.showLoading;
	    var columnsData = this.columnsData,
	        tableData = this.tableData,
	        pageCount = this.pageCount,
	        pageSize = this.pageSize,
	        currPageIndex = this.currPageIndex,
	        fliterFormInputs = this.fliterFormInputs,
	        filterInfo = this.filterInfo,
	        checkedArray = this.checkedArray,
	        checkedMap = this.checkedMap;
	    var dataNumSelect = this.dataNumSelect,
	        handlePagination = this.handlePagination,
	        searchFilterInfo = this.searchFilterInfo;
	    var childrenProps = Object.assign(Object.assign({}, this.props), {
	      showLoading: showLoading,
	      columnsData: columnsData,
	      tableData: tableData,
	      pageCount: pageCount,
	      pageSize: pageSize,
	      currPageIndex: currPageIndex,
	      fliterFormInputs: fliterFormInputs,
	      filterInfo: filterInfo,
	      dataNumSelect: dataNumSelect,
	      handlePagination: handlePagination,
	      searchFilterInfo: searchFilterInfo,
	      emptyBut: true,
	      valueField: 'id'
	    });
	    return React__default.createElement(RefMultipleTableBaseUI__default, childrenProps);
	  };

	  return Table;
	}(React.Component), _temp)) || _class);

	/**
	 * 根据refEntity生成请求数据的参数
	 * @param {string} type 
	 * @param {object} refEntity 
	 */

	function getQueryParam(type, refEntity, viewApplication) {
	  var rsParam = {};
	  rsParam.dataType = type;
	  rsParam.refCode = refEntity.code;
	  rsParam.key = viewApplication.cCardKey;
	  rsParam.billnum = refEntity.cBillnum;
	  rsParam.externalData = "filter";
	  return rsParam;
	}

	var _dec$1, _class$1, _temp$1;
	var TableRender = (_dec$1 = miniStore.connect(function (state) {
	  return {
	    form: state.form
	  };
	}), _dec$1(_class$1 = (_temp$1 =
	/*#__PURE__*/
	function (_Component) {
	  inheritsLoose(TableRender, _Component);

	  function TableRender(props) {
	    var _this;

	    _this = _Component.call(this, props) || this;

	    _this.onSave = function (item) {
	      console.log('save', item);
	    };

	    _this.onCancel = function () {};

	    return _this;
	  }

	  var _proto = TableRender.prototype;

	  _proto.render = function render() {
	    var store = this.props.store;
	    var _store$getState$meta = store.getState().meta,
	        viewApplication = _store$getState$meta.viewApplication,
	        refEntity = _store$getState$meta.refEntity;
	    var dataURL = store.getState().dataUrl;
	    var _this$props$form = this.props.form,
	        getFieldError = _this$props$form.getFieldError,
	        getFieldProps = _this$props$form.getFieldProps;
	    var cBillName = viewApplication.cBillName,
	        view = viewApplication.view;
	    var valueField = "id";
	    var displayField = "{name}";
	    var queryParam = getQueryParam('grid', refEntity, viewApplication);
	    var refModelUrl = {
	      tableBodyUrl: dataURL
	    };
	    var props = {
	      placeholder: cBillName,
	      title: view.cTemplateTitle,
	      backdrop: true,
	      disabled: false,
	      multiple: refEntity.bMultiSel,
	      strictMode: true,
	      miniSearch: true,
	      displayField: displayField,
	      valueField: valueField,
	      queryParam: queryParam,
	      refModelUrl: refModelUrl
	    };
	    return React__default.createElement(RefWithInput, _extends_1({}, props, {
	      onSave: this.onSave,
	      onCancel: this.onCancel
	    }, getFieldProps(valueField, {
	      // initialValue:'{\"refname\":\"高级-T3\",\"refpk\":\"level5\"}',
	      rules: [{
	        message: '请输入姓名',
	        pattern: /[^{displayField:"",valueField:""}]/
	      }]
	    })), React__default.createElement(Table, null));
	  };

	  return TableRender;
	}(React.Component), _temp$1)) || _class$1);

	var reactIs_production_min = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports,"__esModule",{value:!0});
	var b="function"===typeof Symbol&&Symbol.for,c=b?Symbol.for("react.element"):60103,d=b?Symbol.for("react.portal"):60106,e=b?Symbol.for("react.fragment"):60107,f=b?Symbol.for("react.strict_mode"):60108,g=b?Symbol.for("react.profiler"):60114,h=b?Symbol.for("react.provider"):60109,k=b?Symbol.for("react.context"):60110,l=b?Symbol.for("react.async_mode"):60111,m=b?Symbol.for("react.concurrent_mode"):60111,n=b?Symbol.for("react.forward_ref"):60112,p=b?Symbol.for("react.suspense"):60113,q=b?Symbol.for("react.memo"):
	60115,r=b?Symbol.for("react.lazy"):60116;function t(a){if("object"===typeof a&&null!==a){var u=a.$$typeof;switch(u){case c:switch(a=a.type,a){case l:case m:case e:case g:case f:case p:return a;default:switch(a=a&&a.$$typeof,a){case k:case n:case h:return a;default:return u}}case r:case q:case d:return u}}}function v(a){return t(a)===m}exports.typeOf=t;exports.AsyncMode=l;exports.ConcurrentMode=m;exports.ContextConsumer=k;exports.ContextProvider=h;exports.Element=c;exports.ForwardRef=n;
	exports.Fragment=e;exports.Lazy=r;exports.Memo=q;exports.Portal=d;exports.Profiler=g;exports.StrictMode=f;exports.Suspense=p;exports.isValidElementType=function(a){return "string"===typeof a||"function"===typeof a||a===e||a===m||a===g||a===f||a===p||"object"===typeof a&&null!==a&&(a.$$typeof===r||a.$$typeof===q||a.$$typeof===h||a.$$typeof===k||a.$$typeof===n)};exports.isAsyncMode=function(a){return v(a)||t(a)===l};exports.isConcurrentMode=v;exports.isContextConsumer=function(a){return t(a)===k};
	exports.isContextProvider=function(a){return t(a)===h};exports.isElement=function(a){return "object"===typeof a&&null!==a&&a.$$typeof===c};exports.isForwardRef=function(a){return t(a)===n};exports.isFragment=function(a){return t(a)===e};exports.isLazy=function(a){return t(a)===r};exports.isMemo=function(a){return t(a)===q};exports.isPortal=function(a){return t(a)===d};exports.isProfiler=function(a){return t(a)===g};exports.isStrictMode=function(a){return t(a)===f};
	exports.isSuspense=function(a){return t(a)===p};
	});

	unwrapExports(reactIs_production_min);
	var reactIs_production_min_1 = reactIs_production_min.typeOf;
	var reactIs_production_min_2 = reactIs_production_min.AsyncMode;
	var reactIs_production_min_3 = reactIs_production_min.ConcurrentMode;
	var reactIs_production_min_4 = reactIs_production_min.ContextConsumer;
	var reactIs_production_min_5 = reactIs_production_min.ContextProvider;
	var reactIs_production_min_6 = reactIs_production_min.Element;
	var reactIs_production_min_7 = reactIs_production_min.ForwardRef;
	var reactIs_production_min_8 = reactIs_production_min.Fragment;
	var reactIs_production_min_9 = reactIs_production_min.Lazy;
	var reactIs_production_min_10 = reactIs_production_min.Memo;
	var reactIs_production_min_11 = reactIs_production_min.Portal;
	var reactIs_production_min_12 = reactIs_production_min.Profiler;
	var reactIs_production_min_13 = reactIs_production_min.StrictMode;
	var reactIs_production_min_14 = reactIs_production_min.Suspense;
	var reactIs_production_min_15 = reactIs_production_min.isValidElementType;
	var reactIs_production_min_16 = reactIs_production_min.isAsyncMode;
	var reactIs_production_min_17 = reactIs_production_min.isConcurrentMode;
	var reactIs_production_min_18 = reactIs_production_min.isContextConsumer;
	var reactIs_production_min_19 = reactIs_production_min.isContextProvider;
	var reactIs_production_min_20 = reactIs_production_min.isElement;
	var reactIs_production_min_21 = reactIs_production_min.isForwardRef;
	var reactIs_production_min_22 = reactIs_production_min.isFragment;
	var reactIs_production_min_23 = reactIs_production_min.isLazy;
	var reactIs_production_min_24 = reactIs_production_min.isMemo;
	var reactIs_production_min_25 = reactIs_production_min.isPortal;
	var reactIs_production_min_26 = reactIs_production_min.isProfiler;
	var reactIs_production_min_27 = reactIs_production_min.isStrictMode;
	var reactIs_production_min_28 = reactIs_production_min.isSuspense;

	var reactIs_development = createCommonjsModule(function (module, exports) {



	if (process.env.NODE_ENV !== "production") {
	  (function() {

	Object.defineProperty(exports, '__esModule', { value: true });

	// The Symbol used to tag the ReactElement-like types. If there is no native Symbol
	// nor polyfill, then a plain number is used for performance.
	var hasSymbol = typeof Symbol === 'function' && Symbol.for;

	var REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for('react.element') : 0xeac7;
	var REACT_PORTAL_TYPE = hasSymbol ? Symbol.for('react.portal') : 0xeaca;
	var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for('react.fragment') : 0xeacb;
	var REACT_STRICT_MODE_TYPE = hasSymbol ? Symbol.for('react.strict_mode') : 0xeacc;
	var REACT_PROFILER_TYPE = hasSymbol ? Symbol.for('react.profiler') : 0xead2;
	var REACT_PROVIDER_TYPE = hasSymbol ? Symbol.for('react.provider') : 0xeacd;
	var REACT_CONTEXT_TYPE = hasSymbol ? Symbol.for('react.context') : 0xeace;
	var REACT_ASYNC_MODE_TYPE = hasSymbol ? Symbol.for('react.async_mode') : 0xeacf;
	var REACT_CONCURRENT_MODE_TYPE = hasSymbol ? Symbol.for('react.concurrent_mode') : 0xeacf;
	var REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for('react.forward_ref') : 0xead0;
	var REACT_SUSPENSE_TYPE = hasSymbol ? Symbol.for('react.suspense') : 0xead1;
	var REACT_MEMO_TYPE = hasSymbol ? Symbol.for('react.memo') : 0xead3;
	var REACT_LAZY_TYPE = hasSymbol ? Symbol.for('react.lazy') : 0xead4;

	function isValidElementType(type) {
	  return typeof type === 'string' || typeof type === 'function' ||
	  // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
	  type === REACT_FRAGMENT_TYPE || type === REACT_CONCURRENT_MODE_TYPE || type === REACT_PROFILER_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || typeof type === 'object' && type !== null && (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE);
	}

	/**
	 * Forked from fbjs/warning:
	 * https://github.com/facebook/fbjs/blob/e66ba20ad5be433eb54423f2b097d829324d9de6/packages/fbjs/src/__forks__/warning.js
	 *
	 * Only change is we use console.warn instead of console.error,
	 * and do nothing when 'console' is not supported.
	 * This really simplifies the code.
	 * ---
	 * Similar to invariant but only logs a warning if the condition is not met.
	 * This can be used to log issues in development environments in critical
	 * paths. Removing the logging code for production environments will keep the
	 * same logic and follow the same code paths.
	 */

	var lowPriorityWarning = function () {};

	{
	  var printWarning = function (format) {
	    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	      args[_key - 1] = arguments[_key];
	    }

	    var argIndex = 0;
	    var message = 'Warning: ' + format.replace(/%s/g, function () {
	      return args[argIndex++];
	    });
	    if (typeof console !== 'undefined') {
	      console.warn(message);
	    }
	    try {
	      // --- Welcome to debugging React ---
	      // This error was thrown as a convenience so that you can use this stack
	      // to find the callsite that caused this warning to fire.
	      throw new Error(message);
	    } catch (x) {}
	  };

	  lowPriorityWarning = function (condition, format) {
	    if (format === undefined) {
	      throw new Error('`lowPriorityWarning(condition, format, ...args)` requires a warning ' + 'message argument');
	    }
	    if (!condition) {
	      for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
	        args[_key2 - 2] = arguments[_key2];
	      }

	      printWarning.apply(undefined, [format].concat(args));
	    }
	  };
	}

	var lowPriorityWarning$1 = lowPriorityWarning;

	function typeOf(object) {
	  if (typeof object === 'object' && object !== null) {
	    var $$typeof = object.$$typeof;
	    switch ($$typeof) {
	      case REACT_ELEMENT_TYPE:
	        var type = object.type;

	        switch (type) {
	          case REACT_ASYNC_MODE_TYPE:
	          case REACT_CONCURRENT_MODE_TYPE:
	          case REACT_FRAGMENT_TYPE:
	          case REACT_PROFILER_TYPE:
	          case REACT_STRICT_MODE_TYPE:
	          case REACT_SUSPENSE_TYPE:
	            return type;
	          default:
	            var $$typeofType = type && type.$$typeof;

	            switch ($$typeofType) {
	              case REACT_CONTEXT_TYPE:
	              case REACT_FORWARD_REF_TYPE:
	              case REACT_PROVIDER_TYPE:
	                return $$typeofType;
	              default:
	                return $$typeof;
	            }
	        }
	      case REACT_LAZY_TYPE:
	      case REACT_MEMO_TYPE:
	      case REACT_PORTAL_TYPE:
	        return $$typeof;
	    }
	  }

	  return undefined;
	}

	// AsyncMode is deprecated along with isAsyncMode
	var AsyncMode = REACT_ASYNC_MODE_TYPE;
	var ConcurrentMode = REACT_CONCURRENT_MODE_TYPE;
	var ContextConsumer = REACT_CONTEXT_TYPE;
	var ContextProvider = REACT_PROVIDER_TYPE;
	var Element = REACT_ELEMENT_TYPE;
	var ForwardRef = REACT_FORWARD_REF_TYPE;
	var Fragment = REACT_FRAGMENT_TYPE;
	var Lazy = REACT_LAZY_TYPE;
	var Memo = REACT_MEMO_TYPE;
	var Portal = REACT_PORTAL_TYPE;
	var Profiler = REACT_PROFILER_TYPE;
	var StrictMode = REACT_STRICT_MODE_TYPE;
	var Suspense = REACT_SUSPENSE_TYPE;

	var hasWarnedAboutDeprecatedIsAsyncMode = false;

	// AsyncMode should be deprecated
	function isAsyncMode(object) {
	  {
	    if (!hasWarnedAboutDeprecatedIsAsyncMode) {
	      hasWarnedAboutDeprecatedIsAsyncMode = true;
	      lowPriorityWarning$1(false, 'The ReactIs.isAsyncMode() alias has been deprecated, ' + 'and will be removed in React 17+. Update your code to use ' + 'ReactIs.isConcurrentMode() instead. It has the exact same API.');
	    }
	  }
	  return isConcurrentMode(object) || typeOf(object) === REACT_ASYNC_MODE_TYPE;
	}
	function isConcurrentMode(object) {
	  return typeOf(object) === REACT_CONCURRENT_MODE_TYPE;
	}
	function isContextConsumer(object) {
	  return typeOf(object) === REACT_CONTEXT_TYPE;
	}
	function isContextProvider(object) {
	  return typeOf(object) === REACT_PROVIDER_TYPE;
	}
	function isElement(object) {
	  return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
	}
	function isForwardRef(object) {
	  return typeOf(object) === REACT_FORWARD_REF_TYPE;
	}
	function isFragment(object) {
	  return typeOf(object) === REACT_FRAGMENT_TYPE;
	}
	function isLazy(object) {
	  return typeOf(object) === REACT_LAZY_TYPE;
	}
	function isMemo(object) {
	  return typeOf(object) === REACT_MEMO_TYPE;
	}
	function isPortal(object) {
	  return typeOf(object) === REACT_PORTAL_TYPE;
	}
	function isProfiler(object) {
	  return typeOf(object) === REACT_PROFILER_TYPE;
	}
	function isStrictMode(object) {
	  return typeOf(object) === REACT_STRICT_MODE_TYPE;
	}
	function isSuspense(object) {
	  return typeOf(object) === REACT_SUSPENSE_TYPE;
	}

	exports.typeOf = typeOf;
	exports.AsyncMode = AsyncMode;
	exports.ConcurrentMode = ConcurrentMode;
	exports.ContextConsumer = ContextConsumer;
	exports.ContextProvider = ContextProvider;
	exports.Element = Element;
	exports.ForwardRef = ForwardRef;
	exports.Fragment = Fragment;
	exports.Lazy = Lazy;
	exports.Memo = Memo;
	exports.Portal = Portal;
	exports.Profiler = Profiler;
	exports.StrictMode = StrictMode;
	exports.Suspense = Suspense;
	exports.isValidElementType = isValidElementType;
	exports.isAsyncMode = isAsyncMode;
	exports.isConcurrentMode = isConcurrentMode;
	exports.isContextConsumer = isContextConsumer;
	exports.isContextProvider = isContextProvider;
	exports.isElement = isElement;
	exports.isForwardRef = isForwardRef;
	exports.isFragment = isFragment;
	exports.isLazy = isLazy;
	exports.isMemo = isMemo;
	exports.isPortal = isPortal;
	exports.isProfiler = isProfiler;
	exports.isStrictMode = isStrictMode;
	exports.isSuspense = isSuspense;
	  })();
	}
	});

	unwrapExports(reactIs_development);
	var reactIs_development_1 = reactIs_development.typeOf;
	var reactIs_development_2 = reactIs_development.AsyncMode;
	var reactIs_development_3 = reactIs_development.ConcurrentMode;
	var reactIs_development_4 = reactIs_development.ContextConsumer;
	var reactIs_development_5 = reactIs_development.ContextProvider;
	var reactIs_development_6 = reactIs_development.Element;
	var reactIs_development_7 = reactIs_development.ForwardRef;
	var reactIs_development_8 = reactIs_development.Fragment;
	var reactIs_development_9 = reactIs_development.Lazy;
	var reactIs_development_10 = reactIs_development.Memo;
	var reactIs_development_11 = reactIs_development.Portal;
	var reactIs_development_12 = reactIs_development.Profiler;
	var reactIs_development_13 = reactIs_development.StrictMode;
	var reactIs_development_14 = reactIs_development.Suspense;
	var reactIs_development_15 = reactIs_development.isValidElementType;
	var reactIs_development_16 = reactIs_development.isAsyncMode;
	var reactIs_development_17 = reactIs_development.isConcurrentMode;
	var reactIs_development_18 = reactIs_development.isContextConsumer;
	var reactIs_development_19 = reactIs_development.isContextProvider;
	var reactIs_development_20 = reactIs_development.isElement;
	var reactIs_development_21 = reactIs_development.isForwardRef;
	var reactIs_development_22 = reactIs_development.isFragment;
	var reactIs_development_23 = reactIs_development.isLazy;
	var reactIs_development_24 = reactIs_development.isMemo;
	var reactIs_development_25 = reactIs_development.isPortal;
	var reactIs_development_26 = reactIs_development.isProfiler;
	var reactIs_development_27 = reactIs_development.isStrictMode;
	var reactIs_development_28 = reactIs_development.isSuspense;

	var reactIs = createCommonjsModule(function (module) {

	if (process.env.NODE_ENV === 'production') {
	  module.exports = reactIs_production_min;
	} else {
	  module.exports = reactIs_development;
	}
	});

	/*
	object-assign
	(c) Sindre Sorhus
	@license MIT
	*/
	/* eslint-disable no-unused-vars */
	var getOwnPropertySymbols = Object.getOwnPropertySymbols;
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	var propIsEnumerable = Object.prototype.propertyIsEnumerable;

	function toObject(val) {
		if (val === null || val === undefined) {
			throw new TypeError('Object.assign cannot be called with null or undefined');
		}

		return Object(val);
	}

	function shouldUseNative() {
		try {
			if (!Object.assign) {
				return false;
			}

			// Detect buggy property enumeration order in older V8 versions.

			// https://bugs.chromium.org/p/v8/issues/detail?id=4118
			var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
			test1[5] = 'de';
			if (Object.getOwnPropertyNames(test1)[0] === '5') {
				return false;
			}

			// https://bugs.chromium.org/p/v8/issues/detail?id=3056
			var test2 = {};
			for (var i = 0; i < 10; i++) {
				test2['_' + String.fromCharCode(i)] = i;
			}
			var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
				return test2[n];
			});
			if (order2.join('') !== '0123456789') {
				return false;
			}

			// https://bugs.chromium.org/p/v8/issues/detail?id=3056
			var test3 = {};
			'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
				test3[letter] = letter;
			});
			if (Object.keys(Object.assign({}, test3)).join('') !==
					'abcdefghijklmnopqrst') {
				return false;
			}

			return true;
		} catch (err) {
			// We don't expect any of the above to throw, but better to be safe.
			return false;
		}
	}

	var objectAssign = shouldUseNative() ? Object.assign : function (target, source) {
		var from;
		var to = toObject(target);
		var symbols;

		for (var s = 1; s < arguments.length; s++) {
			from = Object(arguments[s]);

			for (var key in from) {
				if (hasOwnProperty.call(from, key)) {
					to[key] = from[key];
				}
			}

			if (getOwnPropertySymbols) {
				symbols = getOwnPropertySymbols(from);
				for (var i = 0; i < symbols.length; i++) {
					if (propIsEnumerable.call(from, symbols[i])) {
						to[symbols[i]] = from[symbols[i]];
					}
				}
			}
		}

		return to;
	};

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

	var ReactPropTypesSecret_1 = ReactPropTypesSecret;

	var printWarning = function() {};

	if (process.env.NODE_ENV !== 'production') {
	  var ReactPropTypesSecret$1 = ReactPropTypesSecret_1;
	  var loggedTypeFailures = {};
	  var has = Function.call.bind(Object.prototype.hasOwnProperty);

	  printWarning = function(text) {
	    var message = 'Warning: ' + text;
	    if (typeof console !== 'undefined') {
	      console.error(message);
	    }
	    try {
	      // --- Welcome to debugging React ---
	      // This error was thrown as a convenience so that you can use this stack
	      // to find the callsite that caused this warning to fire.
	      throw new Error(message);
	    } catch (x) {}
	  };
	}

	/**
	 * Assert that the values match with the type specs.
	 * Error messages are memorized and will only be shown once.
	 *
	 * @param {object} typeSpecs Map of name to a ReactPropType
	 * @param {object} values Runtime values that need to be type-checked
	 * @param {string} location e.g. "prop", "context", "child context"
	 * @param {string} componentName Name of the component for error messages.
	 * @param {?Function} getStack Returns the component stack.
	 * @private
	 */
	function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
	  if (process.env.NODE_ENV !== 'production') {
	    for (var typeSpecName in typeSpecs) {
	      if (has(typeSpecs, typeSpecName)) {
	        var error;
	        // Prop type validation may throw. In case they do, we don't want to
	        // fail the render phase where it didn't fail before. So we log it.
	        // After these have been cleaned up, we'll let them throw.
	        try {
	          // This is intentionally an invariant that gets caught. It's the same
	          // behavior as without this statement except with a better message.
	          if (typeof typeSpecs[typeSpecName] !== 'function') {
	            var err = Error(
	              (componentName || 'React class') + ': ' + location + ' type `' + typeSpecName + '` is invalid; ' +
	              'it must be a function, usually from the `prop-types` package, but received `' + typeof typeSpecs[typeSpecName] + '`.'
	            );
	            err.name = 'Invariant Violation';
	            throw err;
	          }
	          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret$1);
	        } catch (ex) {
	          error = ex;
	        }
	        if (error && !(error instanceof Error)) {
	          printWarning(
	            (componentName || 'React class') + ': type specification of ' +
	            location + ' `' + typeSpecName + '` is invalid; the type checker ' +
	            'function must return `null` or an `Error` but returned a ' + typeof error + '. ' +
	            'You may have forgotten to pass an argument to the type checker ' +
	            'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' +
	            'shape all require an argument).'
	          );
	        }
	        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
	          // Only monitor this failure once because there tends to be a lot of the
	          // same error.
	          loggedTypeFailures[error.message] = true;

	          var stack = getStack ? getStack() : '';

	          printWarning(
	            'Failed ' + location + ' type: ' + error.message + (stack != null ? stack : '')
	          );
	        }
	      }
	    }
	  }
	}

	/**
	 * Resets warning cache when testing.
	 *
	 * @private
	 */
	checkPropTypes.resetWarningCache = function() {
	  if (process.env.NODE_ENV !== 'production') {
	    loggedTypeFailures = {};
	  }
	};

	var checkPropTypes_1 = checkPropTypes;

	var has$1 = Function.call.bind(Object.prototype.hasOwnProperty);
	var printWarning$1 = function() {};

	if (process.env.NODE_ENV !== 'production') {
	  printWarning$1 = function(text) {
	    var message = 'Warning: ' + text;
	    if (typeof console !== 'undefined') {
	      console.error(message);
	    }
	    try {
	      // --- Welcome to debugging React ---
	      // This error was thrown as a convenience so that you can use this stack
	      // to find the callsite that caused this warning to fire.
	      throw new Error(message);
	    } catch (x) {}
	  };
	}

	function emptyFunctionThatReturnsNull() {
	  return null;
	}

	var factoryWithTypeCheckers = function(isValidElement, throwOnDirectAccess) {
	  /* global Symbol */
	  var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
	  var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

	  /**
	   * Returns the iterator method function contained on the iterable object.
	   *
	   * Be sure to invoke the function with the iterable as context:
	   *
	   *     var iteratorFn = getIteratorFn(myIterable);
	   *     if (iteratorFn) {
	   *       var iterator = iteratorFn.call(myIterable);
	   *       ...
	   *     }
	   *
	   * @param {?object} maybeIterable
	   * @return {?function}
	   */
	  function getIteratorFn(maybeIterable) {
	    var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
	    if (typeof iteratorFn === 'function') {
	      return iteratorFn;
	    }
	  }

	  /**
	   * Collection of methods that allow declaration and validation of props that are
	   * supplied to React components. Example usage:
	   *
	   *   var Props = require('ReactPropTypes');
	   *   var MyArticle = React.createClass({
	   *     propTypes: {
	   *       // An optional string prop named "description".
	   *       description: Props.string,
	   *
	   *       // A required enum prop named "category".
	   *       category: Props.oneOf(['News','Photos']).isRequired,
	   *
	   *       // A prop named "dialog" that requires an instance of Dialog.
	   *       dialog: Props.instanceOf(Dialog).isRequired
	   *     },
	   *     render: function() { ... }
	   *   });
	   *
	   * A more formal specification of how these methods are used:
	   *
	   *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
	   *   decl := ReactPropTypes.{type}(.isRequired)?
	   *
	   * Each and every declaration produces a function with the same signature. This
	   * allows the creation of custom validation functions. For example:
	   *
	   *  var MyLink = React.createClass({
	   *    propTypes: {
	   *      // An optional string or URI prop named "href".
	   *      href: function(props, propName, componentName) {
	   *        var propValue = props[propName];
	   *        if (propValue != null && typeof propValue !== 'string' &&
	   *            !(propValue instanceof URI)) {
	   *          return new Error(
	   *            'Expected a string or an URI for ' + propName + ' in ' +
	   *            componentName
	   *          );
	   *        }
	   *      }
	   *    },
	   *    render: function() {...}
	   *  });
	   *
	   * @internal
	   */

	  var ANONYMOUS = '<<anonymous>>';

	  // Important!
	  // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.
	  var ReactPropTypes = {
	    array: createPrimitiveTypeChecker('array'),
	    bool: createPrimitiveTypeChecker('boolean'),
	    func: createPrimitiveTypeChecker('function'),
	    number: createPrimitiveTypeChecker('number'),
	    object: createPrimitiveTypeChecker('object'),
	    string: createPrimitiveTypeChecker('string'),
	    symbol: createPrimitiveTypeChecker('symbol'),

	    any: createAnyTypeChecker(),
	    arrayOf: createArrayOfTypeChecker,
	    element: createElementTypeChecker(),
	    elementType: createElementTypeTypeChecker(),
	    instanceOf: createInstanceTypeChecker,
	    node: createNodeChecker(),
	    objectOf: createObjectOfTypeChecker,
	    oneOf: createEnumTypeChecker,
	    oneOfType: createUnionTypeChecker,
	    shape: createShapeTypeChecker,
	    exact: createStrictShapeTypeChecker,
	  };

	  /**
	   * inlined Object.is polyfill to avoid requiring consumers ship their own
	   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
	   */
	  /*eslint-disable no-self-compare*/
	  function is(x, y) {
	    // SameValue algorithm
	    if (x === y) {
	      // Steps 1-5, 7-10
	      // Steps 6.b-6.e: +0 != -0
	      return x !== 0 || 1 / x === 1 / y;
	    } else {
	      // Step 6.a: NaN == NaN
	      return x !== x && y !== y;
	    }
	  }
	  /*eslint-enable no-self-compare*/

	  /**
	   * We use an Error-like object for backward compatibility as people may call
	   * PropTypes directly and inspect their output. However, we don't use real
	   * Errors anymore. We don't inspect their stack anyway, and creating them
	   * is prohibitively expensive if they are created too often, such as what
	   * happens in oneOfType() for any type before the one that matched.
	   */
	  function PropTypeError(message) {
	    this.message = message;
	    this.stack = '';
	  }
	  // Make `instanceof Error` still work for returned errors.
	  PropTypeError.prototype = Error.prototype;

	  function createChainableTypeChecker(validate) {
	    if (process.env.NODE_ENV !== 'production') {
	      var manualPropTypeCallCache = {};
	      var manualPropTypeWarningCount = 0;
	    }
	    function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
	      componentName = componentName || ANONYMOUS;
	      propFullName = propFullName || propName;

	      if (secret !== ReactPropTypesSecret_1) {
	        if (throwOnDirectAccess) {
	          // New behavior only for users of `prop-types` package
	          var err = new Error(
	            'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
	            'Use `PropTypes.checkPropTypes()` to call them. ' +
	            'Read more at http://fb.me/use-check-prop-types'
	          );
	          err.name = 'Invariant Violation';
	          throw err;
	        } else if (process.env.NODE_ENV !== 'production' && typeof console !== 'undefined') {
	          // Old behavior for people using React.PropTypes
	          var cacheKey = componentName + ':' + propName;
	          if (
	            !manualPropTypeCallCache[cacheKey] &&
	            // Avoid spamming the console because they are often not actionable except for lib authors
	            manualPropTypeWarningCount < 3
	          ) {
	            printWarning$1(
	              'You are manually calling a React.PropTypes validation ' +
	              'function for the `' + propFullName + '` prop on `' + componentName  + '`. This is deprecated ' +
	              'and will throw in the standalone `prop-types` package. ' +
	              'You may be seeing this warning due to a third-party PropTypes ' +
	              'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.'
	            );
	            manualPropTypeCallCache[cacheKey] = true;
	            manualPropTypeWarningCount++;
	          }
	        }
	      }
	      if (props[propName] == null) {
	        if (isRequired) {
	          if (props[propName] === null) {
	            return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));
	          }
	          return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
	        }
	        return null;
	      } else {
	        return validate(props, propName, componentName, location, propFullName);
	      }
	    }

	    var chainedCheckType = checkType.bind(null, false);
	    chainedCheckType.isRequired = checkType.bind(null, true);

	    return chainedCheckType;
	  }

	  function createPrimitiveTypeChecker(expectedType) {
	    function validate(props, propName, componentName, location, propFullName, secret) {
	      var propValue = props[propName];
	      var propType = getPropType(propValue);
	      if (propType !== expectedType) {
	        // `propValue` being instance of, say, date/regexp, pass the 'object'
	        // check, but we can offer a more precise error message here rather than
	        // 'of type `object`'.
	        var preciseType = getPreciseType(propValue);

	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'));
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createAnyTypeChecker() {
	    return createChainableTypeChecker(emptyFunctionThatReturnsNull);
	  }

	  function createArrayOfTypeChecker(typeChecker) {
	    function validate(props, propName, componentName, location, propFullName) {
	      if (typeof typeChecker !== 'function') {
	        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
	      }
	      var propValue = props[propName];
	      if (!Array.isArray(propValue)) {
	        var propType = getPropType(propValue);
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
	      }
	      for (var i = 0; i < propValue.length; i++) {
	        var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret_1);
	        if (error instanceof Error) {
	          return error;
	        }
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createElementTypeChecker() {
	    function validate(props, propName, componentName, location, propFullName) {
	      var propValue = props[propName];
	      if (!isValidElement(propValue)) {
	        var propType = getPropType(propValue);
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createElementTypeTypeChecker() {
	    function validate(props, propName, componentName, location, propFullName) {
	      var propValue = props[propName];
	      if (!reactIs.isValidElementType(propValue)) {
	        var propType = getPropType(propValue);
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement type.'));
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createInstanceTypeChecker(expectedClass) {
	    function validate(props, propName, componentName, location, propFullName) {
	      if (!(props[propName] instanceof expectedClass)) {
	        var expectedClassName = expectedClass.name || ANONYMOUS;
	        var actualClassName = getClassName(props[propName]);
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createEnumTypeChecker(expectedValues) {
	    if (!Array.isArray(expectedValues)) {
	      if (process.env.NODE_ENV !== 'production') {
	        if (arguments.length > 1) {
	          printWarning$1(
	            'Invalid arguments supplied to oneOf, expected an array, got ' + arguments.length + ' arguments. ' +
	            'A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z]).'
	          );
	        } else {
	          printWarning$1('Invalid argument supplied to oneOf, expected an array.');
	        }
	      }
	      return emptyFunctionThatReturnsNull;
	    }

	    function validate(props, propName, componentName, location, propFullName) {
	      var propValue = props[propName];
	      for (var i = 0; i < expectedValues.length; i++) {
	        if (is(propValue, expectedValues[i])) {
	          return null;
	        }
	      }

	      var valuesString = JSON.stringify(expectedValues, function replacer(key, value) {
	        var type = getPreciseType(value);
	        if (type === 'symbol') {
	          return String(value);
	        }
	        return value;
	      });
	      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of value `' + String(propValue) + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createObjectOfTypeChecker(typeChecker) {
	    function validate(props, propName, componentName, location, propFullName) {
	      if (typeof typeChecker !== 'function') {
	        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
	      }
	      var propValue = props[propName];
	      var propType = getPropType(propValue);
	      if (propType !== 'object') {
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
	      }
	      for (var key in propValue) {
	        if (has$1(propValue, key)) {
	          var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret_1);
	          if (error instanceof Error) {
	            return error;
	          }
	        }
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createUnionTypeChecker(arrayOfTypeCheckers) {
	    if (!Array.isArray(arrayOfTypeCheckers)) {
	      process.env.NODE_ENV !== 'production' ? printWarning$1('Invalid argument supplied to oneOfType, expected an instance of array.') : void 0;
	      return emptyFunctionThatReturnsNull;
	    }

	    for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
	      var checker = arrayOfTypeCheckers[i];
	      if (typeof checker !== 'function') {
	        printWarning$1(
	          'Invalid argument supplied to oneOfType. Expected an array of check functions, but ' +
	          'received ' + getPostfixForTypeWarning(checker) + ' at index ' + i + '.'
	        );
	        return emptyFunctionThatReturnsNull;
	      }
	    }

	    function validate(props, propName, componentName, location, propFullName) {
	      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
	        var checker = arrayOfTypeCheckers[i];
	        if (checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret_1) == null) {
	          return null;
	        }
	      }

	      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`.'));
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createNodeChecker() {
	    function validate(props, propName, componentName, location, propFullName) {
	      if (!isNode(props[propName])) {
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createShapeTypeChecker(shapeTypes) {
	    function validate(props, propName, componentName, location, propFullName) {
	      var propValue = props[propName];
	      var propType = getPropType(propValue);
	      if (propType !== 'object') {
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
	      }
	      for (var key in shapeTypes) {
	        var checker = shapeTypes[key];
	        if (!checker) {
	          continue;
	        }
	        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret_1);
	        if (error) {
	          return error;
	        }
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createStrictShapeTypeChecker(shapeTypes) {
	    function validate(props, propName, componentName, location, propFullName) {
	      var propValue = props[propName];
	      var propType = getPropType(propValue);
	      if (propType !== 'object') {
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
	      }
	      // We need to check all keys in case some are required but missing from
	      // props.
	      var allKeys = objectAssign({}, props[propName], shapeTypes);
	      for (var key in allKeys) {
	        var checker = shapeTypes[key];
	        if (!checker) {
	          return new PropTypeError(
	            'Invalid ' + location + ' `' + propFullName + '` key `' + key + '` supplied to `' + componentName + '`.' +
	            '\nBad object: ' + JSON.stringify(props[propName], null, '  ') +
	            '\nValid keys: ' +  JSON.stringify(Object.keys(shapeTypes), null, '  ')
	          );
	        }
	        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret_1);
	        if (error) {
	          return error;
	        }
	      }
	      return null;
	    }

	    return createChainableTypeChecker(validate);
	  }

	  function isNode(propValue) {
	    switch (typeof propValue) {
	      case 'number':
	      case 'string':
	      case 'undefined':
	        return true;
	      case 'boolean':
	        return !propValue;
	      case 'object':
	        if (Array.isArray(propValue)) {
	          return propValue.every(isNode);
	        }
	        if (propValue === null || isValidElement(propValue)) {
	          return true;
	        }

	        var iteratorFn = getIteratorFn(propValue);
	        if (iteratorFn) {
	          var iterator = iteratorFn.call(propValue);
	          var step;
	          if (iteratorFn !== propValue.entries) {
	            while (!(step = iterator.next()).done) {
	              if (!isNode(step.value)) {
	                return false;
	              }
	            }
	          } else {
	            // Iterator will provide entry [k,v] tuples rather than values.
	            while (!(step = iterator.next()).done) {
	              var entry = step.value;
	              if (entry) {
	                if (!isNode(entry[1])) {
	                  return false;
	                }
	              }
	            }
	          }
	        } else {
	          return false;
	        }

	        return true;
	      default:
	        return false;
	    }
	  }

	  function isSymbol(propType, propValue) {
	    // Native Symbol.
	    if (propType === 'symbol') {
	      return true;
	    }

	    // falsy value can't be a Symbol
	    if (!propValue) {
	      return false;
	    }

	    // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
	    if (propValue['@@toStringTag'] === 'Symbol') {
	      return true;
	    }

	    // Fallback for non-spec compliant Symbols which are polyfilled.
	    if (typeof Symbol === 'function' && propValue instanceof Symbol) {
	      return true;
	    }

	    return false;
	  }

	  // Equivalent of `typeof` but with special handling for array and regexp.
	  function getPropType(propValue) {
	    var propType = typeof propValue;
	    if (Array.isArray(propValue)) {
	      return 'array';
	    }
	    if (propValue instanceof RegExp) {
	      // Old webkits (at least until Android 4.0) return 'function' rather than
	      // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
	      // passes PropTypes.object.
	      return 'object';
	    }
	    if (isSymbol(propType, propValue)) {
	      return 'symbol';
	    }
	    return propType;
	  }

	  // This handles more types than `getPropType`. Only used for error messages.
	  // See `createPrimitiveTypeChecker`.
	  function getPreciseType(propValue) {
	    if (typeof propValue === 'undefined' || propValue === null) {
	      return '' + propValue;
	    }
	    var propType = getPropType(propValue);
	    if (propType === 'object') {
	      if (propValue instanceof Date) {
	        return 'date';
	      } else if (propValue instanceof RegExp) {
	        return 'regexp';
	      }
	    }
	    return propType;
	  }

	  // Returns a string that is postfixed to a warning about an invalid type.
	  // For example, "undefined" or "of type array"
	  function getPostfixForTypeWarning(value) {
	    var type = getPreciseType(value);
	    switch (type) {
	      case 'array':
	      case 'object':
	        return 'an ' + type;
	      case 'boolean':
	      case 'date':
	      case 'regexp':
	        return 'a ' + type;
	      default:
	        return type;
	    }
	  }

	  // Returns class name of the object, if any.
	  function getClassName(propValue) {
	    if (!propValue.constructor || !propValue.constructor.name) {
	      return ANONYMOUS;
	    }
	    return propValue.constructor.name;
	  }

	  ReactPropTypes.checkPropTypes = checkPropTypes_1;
	  ReactPropTypes.resetWarningCache = checkPropTypes_1.resetWarningCache;
	  ReactPropTypes.PropTypes = ReactPropTypes;

	  return ReactPropTypes;
	};

	function emptyFunction() {}
	function emptyFunctionWithReset() {}
	emptyFunctionWithReset.resetWarningCache = emptyFunction;

	var factoryWithThrowingShims = function() {
	  function shim(props, propName, componentName, location, propFullName, secret) {
	    if (secret === ReactPropTypesSecret_1) {
	      // It is still safe when called from React.
	      return;
	    }
	    var err = new Error(
	      'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
	      'Use PropTypes.checkPropTypes() to call them. ' +
	      'Read more at http://fb.me/use-check-prop-types'
	    );
	    err.name = 'Invariant Violation';
	    throw err;
	  }  shim.isRequired = shim;
	  function getShim() {
	    return shim;
	  }  // Important!
	  // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
	  var ReactPropTypes = {
	    array: shim,
	    bool: shim,
	    func: shim,
	    number: shim,
	    object: shim,
	    string: shim,
	    symbol: shim,

	    any: shim,
	    arrayOf: getShim,
	    element: shim,
	    elementType: shim,
	    instanceOf: getShim,
	    node: shim,
	    objectOf: getShim,
	    oneOf: getShim,
	    oneOfType: getShim,
	    shape: getShim,
	    exact: getShim,

	    checkPropTypes: emptyFunctionWithReset,
	    resetWarningCache: emptyFunction
	  };

	  ReactPropTypes.PropTypes = ReactPropTypes;

	  return ReactPropTypes;
	};

	var propTypes = createCommonjsModule(function (module) {
	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	if (process.env.NODE_ENV !== 'production') {
	  var ReactIs = reactIs;

	  // By explicitly using `prop-types` you are opting into new development behavior.
	  // http://fb.me/prop-types-in-prod
	  var throwOnDirectAccess = true;
	  module.exports = factoryWithTypeCheckers(ReactIs.isElement, throwOnDirectAccess);
	} else {
	  // By explicitly using `prop-types` you are opting into new production behavior.
	  // http://fb.me/prop-types-in-prod
	  module.exports = factoryWithThrowingShims();
	}
	});

	/**
	 * Copyright (c) 2014-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	// Used for setting prototype methods that IE8 chokes on.
	var DELETE = 'delete';

	// Constants describing the size of trie nodes.
	var SHIFT = 5; // Resulted in best performance after ______?
	var SIZE = 1 << SHIFT;
	var MASK = SIZE - 1;

	// A consistent shared value representing "not set" which equals nothing other
	// than itself, and nothing that could be provided externally.
	var NOT_SET = {};

	// Boolean references, Rough equivalent of `bool &`.
	function MakeRef() {
	  return { value: false };
	}

	function SetRef(ref) {
	  if (ref) {
	    ref.value = true;
	  }
	}

	// A function which returns a value representing an "owner" for transient writes
	// to tries. The return value will only ever equal itself, and will not equal
	// the return of any subsequent call of this function.
	function OwnerID() {}

	function ensureSize(iter) {
	  if (iter.size === undefined) {
	    iter.size = iter.__iterate(returnTrue);
	  }
	  return iter.size;
	}

	function wrapIndex(iter, index) {
	  // This implements "is array index" which the ECMAString spec defines as:
	  //
	  //     A String property name P is an array index if and only if
	  //     ToString(ToUint32(P)) is equal to P and ToUint32(P) is not equal
	  //     to 2^32−1.
	  //
	  // http://www.ecma-international.org/ecma-262/6.0/#sec-array-exotic-objects
	  if (typeof index !== 'number') {
	    var uint32Index = index >>> 0; // N >>> 0 is shorthand for ToUint32
	    if ('' + uint32Index !== index || uint32Index === 4294967295) {
	      return NaN;
	    }
	    index = uint32Index;
	  }
	  return index < 0 ? ensureSize(iter) + index : index;
	}

	function returnTrue() {
	  return true;
	}

	function wholeSlice(begin, end, size) {
	  return (
	    ((begin === 0 && !isNeg(begin)) ||
	      (size !== undefined && begin <= -size)) &&
	    (end === undefined || (size !== undefined && end >= size))
	  );
	}

	function resolveBegin(begin, size) {
	  return resolveIndex(begin, size, 0);
	}

	function resolveEnd(end, size) {
	  return resolveIndex(end, size, size);
	}

	function resolveIndex(index, size, defaultIndex) {
	  // Sanitize indices using this shorthand for ToInt32(argument)
	  // http://www.ecma-international.org/ecma-262/6.0/#sec-toint32
	  return index === undefined
	    ? defaultIndex
	    : isNeg(index)
	      ? size === Infinity
	        ? size
	        : Math.max(0, size + index) | 0
	      : size === undefined || size === index
	        ? index
	        : Math.min(size, index) | 0;
	}

	function isNeg(value) {
	  // Account for -0 which is negative, but not less than 0.
	  return value < 0 || (value === 0 && 1 / value === -Infinity);
	}

	// Note: value is unchanged to not break immutable-devtools.
	var IS_COLLECTION_SYMBOL = '@@__IMMUTABLE_ITERABLE__@@';

	function isCollection(maybeCollection) {
	  return Boolean(maybeCollection && maybeCollection[IS_COLLECTION_SYMBOL]);
	}

	var IS_KEYED_SYMBOL = '@@__IMMUTABLE_KEYED__@@';

	function isKeyed(maybeKeyed) {
	  return Boolean(maybeKeyed && maybeKeyed[IS_KEYED_SYMBOL]);
	}

	var IS_INDEXED_SYMBOL = '@@__IMMUTABLE_INDEXED__@@';

	function isIndexed(maybeIndexed) {
	  return Boolean(maybeIndexed && maybeIndexed[IS_INDEXED_SYMBOL]);
	}

	function isAssociative(maybeAssociative) {
	  return isKeyed(maybeAssociative) || isIndexed(maybeAssociative);
	}

	var Collection = function Collection(value) {
	  return isCollection(value) ? value : Seq(value);
	};

	var KeyedCollection = /*@__PURE__*/(function (Collection) {
	  function KeyedCollection(value) {
	    return isKeyed(value) ? value : KeyedSeq(value);
	  }

	  if ( Collection ) KeyedCollection.__proto__ = Collection;
	  KeyedCollection.prototype = Object.create( Collection && Collection.prototype );
	  KeyedCollection.prototype.constructor = KeyedCollection;

	  return KeyedCollection;
	}(Collection));

	var IndexedCollection = /*@__PURE__*/(function (Collection) {
	  function IndexedCollection(value) {
	    return isIndexed(value) ? value : IndexedSeq(value);
	  }

	  if ( Collection ) IndexedCollection.__proto__ = Collection;
	  IndexedCollection.prototype = Object.create( Collection && Collection.prototype );
	  IndexedCollection.prototype.constructor = IndexedCollection;

	  return IndexedCollection;
	}(Collection));

	var SetCollection = /*@__PURE__*/(function (Collection) {
	  function SetCollection(value) {
	    return isCollection(value) && !isAssociative(value) ? value : SetSeq(value);
	  }

	  if ( Collection ) SetCollection.__proto__ = Collection;
	  SetCollection.prototype = Object.create( Collection && Collection.prototype );
	  SetCollection.prototype.constructor = SetCollection;

	  return SetCollection;
	}(Collection));

	Collection.Keyed = KeyedCollection;
	Collection.Indexed = IndexedCollection;
	Collection.Set = SetCollection;

	var IS_SEQ_SYMBOL = '@@__IMMUTABLE_SEQ__@@';

	function isSeq(maybeSeq) {
	  return Boolean(maybeSeq && maybeSeq[IS_SEQ_SYMBOL]);
	}

	var IS_RECORD_SYMBOL = '@@__IMMUTABLE_RECORD__@@';

	function isRecord(maybeRecord) {
	  return Boolean(maybeRecord && maybeRecord[IS_RECORD_SYMBOL]);
	}

	function isImmutable(maybeImmutable) {
	  return isCollection(maybeImmutable) || isRecord(maybeImmutable);
	}

	var IS_ORDERED_SYMBOL = '@@__IMMUTABLE_ORDERED__@@';

	function isOrdered(maybeOrdered) {
	  return Boolean(maybeOrdered && maybeOrdered[IS_ORDERED_SYMBOL]);
	}

	var ITERATE_KEYS = 0;
	var ITERATE_VALUES = 1;
	var ITERATE_ENTRIES = 2;

	var REAL_ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
	var FAUX_ITERATOR_SYMBOL = '@@iterator';

	var ITERATOR_SYMBOL = REAL_ITERATOR_SYMBOL || FAUX_ITERATOR_SYMBOL;

	var Iterator = function Iterator(next) {
	  this.next = next;
	};

	Iterator.prototype.toString = function toString () {
	  return '[Iterator]';
	};

	Iterator.KEYS = ITERATE_KEYS;
	Iterator.VALUES = ITERATE_VALUES;
	Iterator.ENTRIES = ITERATE_ENTRIES;

	Iterator.prototype.inspect = Iterator.prototype.toSource = function() {
	  return this.toString();
	};
	Iterator.prototype[ITERATOR_SYMBOL] = function() {
	  return this;
	};

	function iteratorValue(type, k, v, iteratorResult) {
	  var value = type === 0 ? k : type === 1 ? v : [k, v];
	  iteratorResult
	    ? (iteratorResult.value = value)
	    : (iteratorResult = {
	        value: value,
	        done: false,
	      });
	  return iteratorResult;
	}

	function iteratorDone() {
	  return { value: undefined, done: true };
	}

	function hasIterator(maybeIterable) {
	  return !!getIteratorFn(maybeIterable);
	}

	function isIterator(maybeIterator) {
	  return maybeIterator && typeof maybeIterator.next === 'function';
	}

	function getIterator(iterable) {
	  var iteratorFn = getIteratorFn(iterable);
	  return iteratorFn && iteratorFn.call(iterable);
	}

	function getIteratorFn(iterable) {
	  var iteratorFn =
	    iterable &&
	    ((REAL_ITERATOR_SYMBOL && iterable[REAL_ITERATOR_SYMBOL]) ||
	      iterable[FAUX_ITERATOR_SYMBOL]);
	  if (typeof iteratorFn === 'function') {
	    return iteratorFn;
	  }
	}

	var hasOwnProperty$1 = Object.prototype.hasOwnProperty;

	function isArrayLike(value) {
	  if (Array.isArray(value) || typeof value === 'string') {
	    return true;
	  }

	  return (
	    value &&
	    typeof value === 'object' &&
	    Number.isInteger(value.length) &&
	    value.length >= 0 &&
	    (value.length === 0
	      ? // Only {length: 0} is considered Array-like.
	        Object.keys(value).length === 1
	      : // An object is only Array-like if it has a property where the last value
	        // in the array-like may be found (which could be undefined).
	        value.hasOwnProperty(value.length - 1))
	  );
	}

	var Seq = /*@__PURE__*/(function (Collection$$1) {
	  function Seq(value) {
	    return value === null || value === undefined
	      ? emptySequence()
	      : isImmutable(value)
	        ? value.toSeq()
	        : seqFromValue(value);
	  }

	  if ( Collection$$1 ) Seq.__proto__ = Collection$$1;
	  Seq.prototype = Object.create( Collection$$1 && Collection$$1.prototype );
	  Seq.prototype.constructor = Seq;

	  Seq.prototype.toSeq = function toSeq () {
	    return this;
	  };

	  Seq.prototype.toString = function toString () {
	    return this.__toString('Seq {', '}');
	  };

	  Seq.prototype.cacheResult = function cacheResult () {
	    if (!this._cache && this.__iterateUncached) {
	      this._cache = this.entrySeq().toArray();
	      this.size = this._cache.length;
	    }
	    return this;
	  };

	  // abstract __iterateUncached(fn, reverse)

	  Seq.prototype.__iterate = function __iterate (fn, reverse) {
	    var cache = this._cache;
	    if (cache) {
	      var size = cache.length;
	      var i = 0;
	      while (i !== size) {
	        var entry = cache[reverse ? size - ++i : i++];
	        if (fn(entry[1], entry[0], this) === false) {
	          break;
	        }
	      }
	      return i;
	    }
	    return this.__iterateUncached(fn, reverse);
	  };

	  // abstract __iteratorUncached(type, reverse)

	  Seq.prototype.__iterator = function __iterator (type, reverse) {
	    var cache = this._cache;
	    if (cache) {
	      var size = cache.length;
	      var i = 0;
	      return new Iterator(function () {
	        if (i === size) {
	          return iteratorDone();
	        }
	        var entry = cache[reverse ? size - ++i : i++];
	        return iteratorValue(type, entry[0], entry[1]);
	      });
	    }
	    return this.__iteratorUncached(type, reverse);
	  };

	  return Seq;
	}(Collection));

	var KeyedSeq = /*@__PURE__*/(function (Seq) {
	  function KeyedSeq(value) {
	    return value === null || value === undefined
	      ? emptySequence().toKeyedSeq()
	      : isCollection(value)
	        ? isKeyed(value)
	          ? value.toSeq()
	          : value.fromEntrySeq()
	        : isRecord(value)
	          ? value.toSeq()
	          : keyedSeqFromValue(value);
	  }

	  if ( Seq ) KeyedSeq.__proto__ = Seq;
	  KeyedSeq.prototype = Object.create( Seq && Seq.prototype );
	  KeyedSeq.prototype.constructor = KeyedSeq;

	  KeyedSeq.prototype.toKeyedSeq = function toKeyedSeq () {
	    return this;
	  };

	  return KeyedSeq;
	}(Seq));

	var IndexedSeq = /*@__PURE__*/(function (Seq) {
	  function IndexedSeq(value) {
	    return value === null || value === undefined
	      ? emptySequence()
	      : isCollection(value)
	        ? isKeyed(value)
	          ? value.entrySeq()
	          : value.toIndexedSeq()
	        : isRecord(value)
	          ? value.toSeq().entrySeq()
	          : indexedSeqFromValue(value);
	  }

	  if ( Seq ) IndexedSeq.__proto__ = Seq;
	  IndexedSeq.prototype = Object.create( Seq && Seq.prototype );
	  IndexedSeq.prototype.constructor = IndexedSeq;

	  IndexedSeq.of = function of (/*...values*/) {
	    return IndexedSeq(arguments);
	  };

	  IndexedSeq.prototype.toIndexedSeq = function toIndexedSeq () {
	    return this;
	  };

	  IndexedSeq.prototype.toString = function toString () {
	    return this.__toString('Seq [', ']');
	  };

	  return IndexedSeq;
	}(Seq));

	var SetSeq = /*@__PURE__*/(function (Seq) {
	  function SetSeq(value) {
	    return (isCollection(value) && !isAssociative(value)
	      ? value
	      : IndexedSeq(value)
	    ).toSetSeq();
	  }

	  if ( Seq ) SetSeq.__proto__ = Seq;
	  SetSeq.prototype = Object.create( Seq && Seq.prototype );
	  SetSeq.prototype.constructor = SetSeq;

	  SetSeq.of = function of (/*...values*/) {
	    return SetSeq(arguments);
	  };

	  SetSeq.prototype.toSetSeq = function toSetSeq () {
	    return this;
	  };

	  return SetSeq;
	}(Seq));

	Seq.isSeq = isSeq;
	Seq.Keyed = KeyedSeq;
	Seq.Set = SetSeq;
	Seq.Indexed = IndexedSeq;

	Seq.prototype[IS_SEQ_SYMBOL] = true;

	// #pragma Root Sequences

	var ArraySeq = /*@__PURE__*/(function (IndexedSeq) {
	  function ArraySeq(array) {
	    this._array = array;
	    this.size = array.length;
	  }

	  if ( IndexedSeq ) ArraySeq.__proto__ = IndexedSeq;
	  ArraySeq.prototype = Object.create( IndexedSeq && IndexedSeq.prototype );
	  ArraySeq.prototype.constructor = ArraySeq;

	  ArraySeq.prototype.get = function get (index, notSetValue) {
	    return this.has(index) ? this._array[wrapIndex(this, index)] : notSetValue;
	  };

	  ArraySeq.prototype.__iterate = function __iterate (fn, reverse) {
	    var array = this._array;
	    var size = array.length;
	    var i = 0;
	    while (i !== size) {
	      var ii = reverse ? size - ++i : i++;
	      if (fn(array[ii], ii, this) === false) {
	        break;
	      }
	    }
	    return i;
	  };

	  ArraySeq.prototype.__iterator = function __iterator (type, reverse) {
	    var array = this._array;
	    var size = array.length;
	    var i = 0;
	    return new Iterator(function () {
	      if (i === size) {
	        return iteratorDone();
	      }
	      var ii = reverse ? size - ++i : i++;
	      return iteratorValue(type, ii, array[ii]);
	    });
	  };

	  return ArraySeq;
	}(IndexedSeq));

	var ObjectSeq = /*@__PURE__*/(function (KeyedSeq) {
	  function ObjectSeq(object) {
	    var keys = Object.keys(object);
	    this._object = object;
	    this._keys = keys;
	    this.size = keys.length;
	  }

	  if ( KeyedSeq ) ObjectSeq.__proto__ = KeyedSeq;
	  ObjectSeq.prototype = Object.create( KeyedSeq && KeyedSeq.prototype );
	  ObjectSeq.prototype.constructor = ObjectSeq;

	  ObjectSeq.prototype.get = function get (key, notSetValue) {
	    if (notSetValue !== undefined && !this.has(key)) {
	      return notSetValue;
	    }
	    return this._object[key];
	  };

	  ObjectSeq.prototype.has = function has (key) {
	    return hasOwnProperty$1.call(this._object, key);
	  };

	  ObjectSeq.prototype.__iterate = function __iterate (fn, reverse) {
	    var object = this._object;
	    var keys = this._keys;
	    var size = keys.length;
	    var i = 0;
	    while (i !== size) {
	      var key = keys[reverse ? size - ++i : i++];
	      if (fn(object[key], key, this) === false) {
	        break;
	      }
	    }
	    return i;
	  };

	  ObjectSeq.prototype.__iterator = function __iterator (type, reverse) {
	    var object = this._object;
	    var keys = this._keys;
	    var size = keys.length;
	    var i = 0;
	    return new Iterator(function () {
	      if (i === size) {
	        return iteratorDone();
	      }
	      var key = keys[reverse ? size - ++i : i++];
	      return iteratorValue(type, key, object[key]);
	    });
	  };

	  return ObjectSeq;
	}(KeyedSeq));
	ObjectSeq.prototype[IS_ORDERED_SYMBOL] = true;

	var CollectionSeq = /*@__PURE__*/(function (IndexedSeq) {
	  function CollectionSeq(collection) {
	    this._collection = collection;
	    this.size = collection.length || collection.size;
	  }

	  if ( IndexedSeq ) CollectionSeq.__proto__ = IndexedSeq;
	  CollectionSeq.prototype = Object.create( IndexedSeq && IndexedSeq.prototype );
	  CollectionSeq.prototype.constructor = CollectionSeq;

	  CollectionSeq.prototype.__iterateUncached = function __iterateUncached (fn, reverse) {
	    if (reverse) {
	      return this.cacheResult().__iterate(fn, reverse);
	    }
	    var collection = this._collection;
	    var iterator = getIterator(collection);
	    var iterations = 0;
	    if (isIterator(iterator)) {
	      var step;
	      while (!(step = iterator.next()).done) {
	        if (fn(step.value, iterations++, this) === false) {
	          break;
	        }
	      }
	    }
	    return iterations;
	  };

	  CollectionSeq.prototype.__iteratorUncached = function __iteratorUncached (type, reverse) {
	    if (reverse) {
	      return this.cacheResult().__iterator(type, reverse);
	    }
	    var collection = this._collection;
	    var iterator = getIterator(collection);
	    if (!isIterator(iterator)) {
	      return new Iterator(iteratorDone);
	    }
	    var iterations = 0;
	    return new Iterator(function () {
	      var step = iterator.next();
	      return step.done ? step : iteratorValue(type, iterations++, step.value);
	    });
	  };

	  return CollectionSeq;
	}(IndexedSeq));

	// # pragma Helper functions

	var EMPTY_SEQ;

	function emptySequence() {
	  return EMPTY_SEQ || (EMPTY_SEQ = new ArraySeq([]));
	}

	function keyedSeqFromValue(value) {
	  var seq = Array.isArray(value)
	    ? new ArraySeq(value)
	    : hasIterator(value)
	      ? new CollectionSeq(value)
	      : undefined;
	  if (seq) {
	    return seq.fromEntrySeq();
	  }
	  if (typeof value === 'object') {
	    return new ObjectSeq(value);
	  }
	  throw new TypeError(
	    'Expected Array or collection object of [k, v] entries, or keyed object: ' +
	      value
	  );
	}

	function indexedSeqFromValue(value) {
	  var seq = maybeIndexedSeqFromValue(value);
	  if (seq) {
	    return seq;
	  }
	  throw new TypeError(
	    'Expected Array or collection object of values: ' + value
	  );
	}

	function seqFromValue(value) {
	  var seq = maybeIndexedSeqFromValue(value);
	  if (seq) {
	    return seq;
	  }
	  if (typeof value === 'object') {
	    return new ObjectSeq(value);
	  }
	  throw new TypeError(
	    'Expected Array or collection object of values, or keyed object: ' + value
	  );
	}

	function maybeIndexedSeqFromValue(value) {
	  return isArrayLike(value)
	    ? new ArraySeq(value)
	    : hasIterator(value)
	      ? new CollectionSeq(value)
	      : undefined;
	}

	var IS_MAP_SYMBOL = '@@__IMMUTABLE_MAP__@@';

	function isMap(maybeMap) {
	  return Boolean(maybeMap && maybeMap[IS_MAP_SYMBOL]);
	}

	function isOrderedMap(maybeOrderedMap) {
	  return isMap(maybeOrderedMap) && isOrdered(maybeOrderedMap);
	}

	function isValueObject(maybeValue) {
	  return Boolean(
	    maybeValue &&
	      typeof maybeValue.equals === 'function' &&
	      typeof maybeValue.hashCode === 'function'
	  );
	}

	/**
	 * An extension of the "same-value" algorithm as [described for use by ES6 Map
	 * and Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map#Key_equality)
	 *
	 * NaN is considered the same as NaN, however -0 and 0 are considered the same
	 * value, which is different from the algorithm described by
	 * [`Object.is`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is).
	 *
	 * This is extended further to allow Objects to describe the values they
	 * represent, by way of `valueOf` or `equals` (and `hashCode`).
	 *
	 * Note: because of this extension, the key equality of Immutable.Map and the
	 * value equality of Immutable.Set will differ from ES6 Map and Set.
	 *
	 * ### Defining custom values
	 *
	 * The easiest way to describe the value an object represents is by implementing
	 * `valueOf`. For example, `Date` represents a value by returning a unix
	 * timestamp for `valueOf`:
	 *
	 *     var date1 = new Date(1234567890000); // Fri Feb 13 2009 ...
	 *     var date2 = new Date(1234567890000);
	 *     date1.valueOf(); // 1234567890000
	 *     assert( date1 !== date2 );
	 *     assert( Immutable.is( date1, date2 ) );
	 *
	 * Note: overriding `valueOf` may have other implications if you use this object
	 * where JavaScript expects a primitive, such as implicit string coercion.
	 *
	 * For more complex types, especially collections, implementing `valueOf` may
	 * not be performant. An alternative is to implement `equals` and `hashCode`.
	 *
	 * `equals` takes another object, presumably of similar type, and returns true
	 * if it is equal. Equality is symmetrical, so the same result should be
	 * returned if this and the argument are flipped.
	 *
	 *     assert( a.equals(b) === b.equals(a) );
	 *
	 * `hashCode` returns a 32bit integer number representing the object which will
	 * be used to determine how to store the value object in a Map or Set. You must
	 * provide both or neither methods, one must not exist without the other.
	 *
	 * Also, an important relationship between these methods must be upheld: if two
	 * values are equal, they *must* return the same hashCode. If the values are not
	 * equal, they might have the same hashCode; this is called a hash collision,
	 * and while undesirable for performance reasons, it is acceptable.
	 *
	 *     if (a.equals(b)) {
	 *       assert( a.hashCode() === b.hashCode() );
	 *     }
	 *
	 * All Immutable collections are Value Objects: they implement `equals()`
	 * and `hashCode()`.
	 */
	function is(valueA, valueB) {
	  if (valueA === valueB || (valueA !== valueA && valueB !== valueB)) {
	    return true;
	  }
	  if (!valueA || !valueB) {
	    return false;
	  }
	  if (
	    typeof valueA.valueOf === 'function' &&
	    typeof valueB.valueOf === 'function'
	  ) {
	    valueA = valueA.valueOf();
	    valueB = valueB.valueOf();
	    if (valueA === valueB || (valueA !== valueA && valueB !== valueB)) {
	      return true;
	    }
	    if (!valueA || !valueB) {
	      return false;
	    }
	  }
	  return !!(
	    isValueObject(valueA) &&
	    isValueObject(valueB) &&
	    valueA.equals(valueB)
	  );
	}

	var imul =
	  typeof Math.imul === 'function' && Math.imul(0xffffffff, 2) === -2
	    ? Math.imul
	    : function imul(a, b) {
	        a |= 0; // int
	        b |= 0; // int
	        var c = a & 0xffff;
	        var d = b & 0xffff;
	        // Shift by 0 fixes the sign on the high part.
	        return (c * d + ((((a >>> 16) * d + c * (b >>> 16)) << 16) >>> 0)) | 0; // int
	      };

	// v8 has an optimization for storing 31-bit signed numbers.
	// Values which have either 00 or 11 as the high order bits qualify.
	// This function drops the highest order bit in a signed number, maintaining
	// the sign bit.
	function smi(i32) {
	  return ((i32 >>> 1) & 0x40000000) | (i32 & 0xbfffffff);
	}

	var defaultValueOf = Object.prototype.valueOf;

	function hash(o) {
	  switch (typeof o) {
	    case 'boolean':
	      // The hash values for built-in constants are a 1 value for each 5-byte
	      // shift region expect for the first, which encodes the value. This
	      // reduces the odds of a hash collision for these common values.
	      return o ? 0x42108421 : 0x42108420;
	    case 'number':
	      return hashNumber(o);
	    case 'string':
	      return o.length > STRING_HASH_CACHE_MIN_STRLEN
	        ? cachedHashString(o)
	        : hashString(o);
	    case 'object':
	    case 'function':
	      if (o === null) {
	        return 0x42108422;
	      }
	      if (typeof o.hashCode === 'function') {
	        // Drop any high bits from accidentally long hash codes.
	        return smi(o.hashCode(o));
	      }
	      if (o.valueOf !== defaultValueOf && typeof o.valueOf === 'function') {
	        o = o.valueOf(o);
	      }
	      return hashJSObj(o);
	    case 'undefined':
	      return 0x42108423;
	    default:
	      if (typeof o.toString === 'function') {
	        return hashString(o.toString());
	      }
	      throw new Error('Value type ' + typeof o + ' cannot be hashed.');
	  }
	}

	// Compress arbitrarily large numbers into smi hashes.
	function hashNumber(n) {
	  if (n !== n || n === Infinity) {
	    return 0;
	  }
	  var hash = n | 0;
	  if (hash !== n) {
	    hash ^= n * 0xffffffff;
	  }
	  while (n > 0xffffffff) {
	    n /= 0xffffffff;
	    hash ^= n;
	  }
	  return smi(hash);
	}

	function cachedHashString(string) {
	  var hashed = stringHashCache[string];
	  if (hashed === undefined) {
	    hashed = hashString(string);
	    if (STRING_HASH_CACHE_SIZE === STRING_HASH_CACHE_MAX_SIZE) {
	      STRING_HASH_CACHE_SIZE = 0;
	      stringHashCache = {};
	    }
	    STRING_HASH_CACHE_SIZE++;
	    stringHashCache[string] = hashed;
	  }
	  return hashed;
	}

	// http://jsperf.com/hashing-strings
	function hashString(string) {
	  // This is the hash from JVM
	  // The hash code for a string is computed as
	  // s[0] * 31 ^ (n - 1) + s[1] * 31 ^ (n - 2) + ... + s[n - 1],
	  // where s[i] is the ith character of the string and n is the length of
	  // the string. We "mod" the result to make it between 0 (inclusive) and 2^31
	  // (exclusive) by dropping high bits.
	  var hashed = 0;
	  for (var ii = 0; ii < string.length; ii++) {
	    hashed = (31 * hashed + string.charCodeAt(ii)) | 0;
	  }
	  return smi(hashed);
	}

	function hashJSObj(obj) {
	  var hashed;
	  if (usingWeakMap) {
	    hashed = weakMap.get(obj);
	    if (hashed !== undefined) {
	      return hashed;
	    }
	  }

	  hashed = obj[UID_HASH_KEY];
	  if (hashed !== undefined) {
	    return hashed;
	  }

	  if (!canDefineProperty) {
	    hashed = obj.propertyIsEnumerable && obj.propertyIsEnumerable[UID_HASH_KEY];
	    if (hashed !== undefined) {
	      return hashed;
	    }

	    hashed = getIENodeHash(obj);
	    if (hashed !== undefined) {
	      return hashed;
	    }
	  }

	  hashed = ++objHashUID;
	  if (objHashUID & 0x40000000) {
	    objHashUID = 0;
	  }

	  if (usingWeakMap) {
	    weakMap.set(obj, hashed);
	  } else if (isExtensible !== undefined && isExtensible(obj) === false) {
	    throw new Error('Non-extensible objects are not allowed as keys.');
	  } else if (canDefineProperty) {
	    Object.defineProperty(obj, UID_HASH_KEY, {
	      enumerable: false,
	      configurable: false,
	      writable: false,
	      value: hashed,
	    });
	  } else if (
	    obj.propertyIsEnumerable !== undefined &&
	    obj.propertyIsEnumerable === obj.constructor.prototype.propertyIsEnumerable
	  ) {
	    // Since we can't define a non-enumerable property on the object
	    // we'll hijack one of the less-used non-enumerable properties to
	    // save our hash on it. Since this is a function it will not show up in
	    // `JSON.stringify` which is what we want.
	    obj.propertyIsEnumerable = function() {
	      return this.constructor.prototype.propertyIsEnumerable.apply(
	        this,
	        arguments
	      );
	    };
	    obj.propertyIsEnumerable[UID_HASH_KEY] = hashed;
	  } else if (obj.nodeType !== undefined) {
	    // At this point we couldn't get the IE `uniqueID` to use as a hash
	    // and we couldn't use a non-enumerable property to exploit the
	    // dontEnum bug so we simply add the `UID_HASH_KEY` on the node
	    // itself.
	    obj[UID_HASH_KEY] = hashed;
	  } else {
	    throw new Error('Unable to set a non-enumerable property on object.');
	  }

	  return hashed;
	}

	// Get references to ES5 object methods.
	var isExtensible = Object.isExtensible;

	// True if Object.defineProperty works as expected. IE8 fails this test.
	var canDefineProperty = (function() {
	  try {
	    Object.defineProperty({}, '@', {});
	    return true;
	  } catch (e) {
	    return false;
	  }
	})();

	// IE has a `uniqueID` property on DOM nodes. We can construct the hash from it
	// and avoid memory leaks from the IE cloneNode bug.
	function getIENodeHash(node) {
	  if (node && node.nodeType > 0) {
	    switch (node.nodeType) {
	      case 1: // Element
	        return node.uniqueID;
	      case 9: // Document
	        return node.documentElement && node.documentElement.uniqueID;
	    }
	  }
	}

	// If possible, use a WeakMap.
	var usingWeakMap = typeof WeakMap === 'function';
	var weakMap;
	if (usingWeakMap) {
	  weakMap = new WeakMap();
	}

	var objHashUID = 0;

	var UID_HASH_KEY = '__immutablehash__';
	if (typeof Symbol === 'function') {
	  UID_HASH_KEY = Symbol(UID_HASH_KEY);
	}

	var STRING_HASH_CACHE_MIN_STRLEN = 16;
	var STRING_HASH_CACHE_MAX_SIZE = 255;
	var STRING_HASH_CACHE_SIZE = 0;
	var stringHashCache = {};

	var ToKeyedSequence = /*@__PURE__*/(function (KeyedSeq$$1) {
	  function ToKeyedSequence(indexed, useKeys) {
	    this._iter = indexed;
	    this._useKeys = useKeys;
	    this.size = indexed.size;
	  }

	  if ( KeyedSeq$$1 ) ToKeyedSequence.__proto__ = KeyedSeq$$1;
	  ToKeyedSequence.prototype = Object.create( KeyedSeq$$1 && KeyedSeq$$1.prototype );
	  ToKeyedSequence.prototype.constructor = ToKeyedSequence;

	  ToKeyedSequence.prototype.get = function get (key, notSetValue) {
	    return this._iter.get(key, notSetValue);
	  };

	  ToKeyedSequence.prototype.has = function has (key) {
	    return this._iter.has(key);
	  };

	  ToKeyedSequence.prototype.valueSeq = function valueSeq () {
	    return this._iter.valueSeq();
	  };

	  ToKeyedSequence.prototype.reverse = function reverse () {
	    var this$1 = this;

	    var reversedSequence = reverseFactory(this, true);
	    if (!this._useKeys) {
	      reversedSequence.valueSeq = function () { return this$1._iter.toSeq().reverse(); };
	    }
	    return reversedSequence;
	  };

	  ToKeyedSequence.prototype.map = function map (mapper, context) {
	    var this$1 = this;

	    var mappedSequence = mapFactory(this, mapper, context);
	    if (!this._useKeys) {
	      mappedSequence.valueSeq = function () { return this$1._iter.toSeq().map(mapper, context); };
	    }
	    return mappedSequence;
	  };

	  ToKeyedSequence.prototype.__iterate = function __iterate (fn, reverse) {
	    var this$1 = this;

	    return this._iter.__iterate(function (v, k) { return fn(v, k, this$1); }, reverse);
	  };

	  ToKeyedSequence.prototype.__iterator = function __iterator (type, reverse) {
	    return this._iter.__iterator(type, reverse);
	  };

	  return ToKeyedSequence;
	}(KeyedSeq));
	ToKeyedSequence.prototype[IS_ORDERED_SYMBOL] = true;

	var ToIndexedSequence = /*@__PURE__*/(function (IndexedSeq$$1) {
	  function ToIndexedSequence(iter) {
	    this._iter = iter;
	    this.size = iter.size;
	  }

	  if ( IndexedSeq$$1 ) ToIndexedSequence.__proto__ = IndexedSeq$$1;
	  ToIndexedSequence.prototype = Object.create( IndexedSeq$$1 && IndexedSeq$$1.prototype );
	  ToIndexedSequence.prototype.constructor = ToIndexedSequence;

	  ToIndexedSequence.prototype.includes = function includes (value) {
	    return this._iter.includes(value);
	  };

	  ToIndexedSequence.prototype.__iterate = function __iterate (fn, reverse) {
	    var this$1 = this;

	    var i = 0;
	    reverse && ensureSize(this);
	    return this._iter.__iterate(
	      function (v) { return fn(v, reverse ? this$1.size - ++i : i++, this$1); },
	      reverse
	    );
	  };

	  ToIndexedSequence.prototype.__iterator = function __iterator (type, reverse) {
	    var this$1 = this;

	    var iterator = this._iter.__iterator(ITERATE_VALUES, reverse);
	    var i = 0;
	    reverse && ensureSize(this);
	    return new Iterator(function () {
	      var step = iterator.next();
	      return step.done
	        ? step
	        : iteratorValue(
	            type,
	            reverse ? this$1.size - ++i : i++,
	            step.value,
	            step
	          );
	    });
	  };

	  return ToIndexedSequence;
	}(IndexedSeq));

	var ToSetSequence = /*@__PURE__*/(function (SetSeq$$1) {
	  function ToSetSequence(iter) {
	    this._iter = iter;
	    this.size = iter.size;
	  }

	  if ( SetSeq$$1 ) ToSetSequence.__proto__ = SetSeq$$1;
	  ToSetSequence.prototype = Object.create( SetSeq$$1 && SetSeq$$1.prototype );
	  ToSetSequence.prototype.constructor = ToSetSequence;

	  ToSetSequence.prototype.has = function has (key) {
	    return this._iter.includes(key);
	  };

	  ToSetSequence.prototype.__iterate = function __iterate (fn, reverse) {
	    var this$1 = this;

	    return this._iter.__iterate(function (v) { return fn(v, v, this$1); }, reverse);
	  };

	  ToSetSequence.prototype.__iterator = function __iterator (type, reverse) {
	    var iterator = this._iter.__iterator(ITERATE_VALUES, reverse);
	    return new Iterator(function () {
	      var step = iterator.next();
	      return step.done
	        ? step
	        : iteratorValue(type, step.value, step.value, step);
	    });
	  };

	  return ToSetSequence;
	}(SetSeq));

	var FromEntriesSequence = /*@__PURE__*/(function (KeyedSeq$$1) {
	  function FromEntriesSequence(entries) {
	    this._iter = entries;
	    this.size = entries.size;
	  }

	  if ( KeyedSeq$$1 ) FromEntriesSequence.__proto__ = KeyedSeq$$1;
	  FromEntriesSequence.prototype = Object.create( KeyedSeq$$1 && KeyedSeq$$1.prototype );
	  FromEntriesSequence.prototype.constructor = FromEntriesSequence;

	  FromEntriesSequence.prototype.entrySeq = function entrySeq () {
	    return this._iter.toSeq();
	  };

	  FromEntriesSequence.prototype.__iterate = function __iterate (fn, reverse) {
	    var this$1 = this;

	    return this._iter.__iterate(function (entry) {
	      // Check if entry exists first so array access doesn't throw for holes
	      // in the parent iteration.
	      if (entry) {
	        validateEntry(entry);
	        var indexedCollection = isCollection(entry);
	        return fn(
	          indexedCollection ? entry.get(1) : entry[1],
	          indexedCollection ? entry.get(0) : entry[0],
	          this$1
	        );
	      }
	    }, reverse);
	  };

	  FromEntriesSequence.prototype.__iterator = function __iterator (type, reverse) {
	    var iterator = this._iter.__iterator(ITERATE_VALUES, reverse);
	    return new Iterator(function () {
	      while (true) {
	        var step = iterator.next();
	        if (step.done) {
	          return step;
	        }
	        var entry = step.value;
	        // Check if entry exists first so array access doesn't throw for holes
	        // in the parent iteration.
	        if (entry) {
	          validateEntry(entry);
	          var indexedCollection = isCollection(entry);
	          return iteratorValue(
	            type,
	            indexedCollection ? entry.get(0) : entry[0],
	            indexedCollection ? entry.get(1) : entry[1],
	            step
	          );
	        }
	      }
	    });
	  };

	  return FromEntriesSequence;
	}(KeyedSeq));

	ToIndexedSequence.prototype.cacheResult = ToKeyedSequence.prototype.cacheResult = ToSetSequence.prototype.cacheResult = FromEntriesSequence.prototype.cacheResult = cacheResultThrough;

	function flipFactory(collection) {
	  var flipSequence = makeSequence(collection);
	  flipSequence._iter = collection;
	  flipSequence.size = collection.size;
	  flipSequence.flip = function () { return collection; };
	  flipSequence.reverse = function() {
	    var reversedSequence = collection.reverse.apply(this); // super.reverse()
	    reversedSequence.flip = function () { return collection.reverse(); };
	    return reversedSequence;
	  };
	  flipSequence.has = function (key) { return collection.includes(key); };
	  flipSequence.includes = function (key) { return collection.has(key); };
	  flipSequence.cacheResult = cacheResultThrough;
	  flipSequence.__iterateUncached = function(fn, reverse) {
	    var this$1 = this;

	    return collection.__iterate(function (v, k) { return fn(k, v, this$1) !== false; }, reverse);
	  };
	  flipSequence.__iteratorUncached = function(type, reverse) {
	    if (type === ITERATE_ENTRIES) {
	      var iterator = collection.__iterator(type, reverse);
	      return new Iterator(function () {
	        var step = iterator.next();
	        if (!step.done) {
	          var k = step.value[0];
	          step.value[0] = step.value[1];
	          step.value[1] = k;
	        }
	        return step;
	      });
	    }
	    return collection.__iterator(
	      type === ITERATE_VALUES ? ITERATE_KEYS : ITERATE_VALUES,
	      reverse
	    );
	  };
	  return flipSequence;
	}

	function mapFactory(collection, mapper, context) {
	  var mappedSequence = makeSequence(collection);
	  mappedSequence.size = collection.size;
	  mappedSequence.has = function (key) { return collection.has(key); };
	  mappedSequence.get = function (key, notSetValue) {
	    var v = collection.get(key, NOT_SET);
	    return v === NOT_SET
	      ? notSetValue
	      : mapper.call(context, v, key, collection);
	  };
	  mappedSequence.__iterateUncached = function(fn, reverse) {
	    var this$1 = this;

	    return collection.__iterate(
	      function (v, k, c) { return fn(mapper.call(context, v, k, c), k, this$1) !== false; },
	      reverse
	    );
	  };
	  mappedSequence.__iteratorUncached = function(type, reverse) {
	    var iterator = collection.__iterator(ITERATE_ENTRIES, reverse);
	    return new Iterator(function () {
	      var step = iterator.next();
	      if (step.done) {
	        return step;
	      }
	      var entry = step.value;
	      var key = entry[0];
	      return iteratorValue(
	        type,
	        key,
	        mapper.call(context, entry[1], key, collection),
	        step
	      );
	    });
	  };
	  return mappedSequence;
	}

	function reverseFactory(collection, useKeys) {
	  var this$1 = this;

	  var reversedSequence = makeSequence(collection);
	  reversedSequence._iter = collection;
	  reversedSequence.size = collection.size;
	  reversedSequence.reverse = function () { return collection; };
	  if (collection.flip) {
	    reversedSequence.flip = function() {
	      var flipSequence = flipFactory(collection);
	      flipSequence.reverse = function () { return collection.flip(); };
	      return flipSequence;
	    };
	  }
	  reversedSequence.get = function (key, notSetValue) { return collection.get(useKeys ? key : -1 - key, notSetValue); };
	  reversedSequence.has = function (key) { return collection.has(useKeys ? key : -1 - key); };
	  reversedSequence.includes = function (value) { return collection.includes(value); };
	  reversedSequence.cacheResult = cacheResultThrough;
	  reversedSequence.__iterate = function(fn, reverse) {
	    var this$1 = this;

	    var i = 0;
	    reverse && ensureSize(collection);
	    return collection.__iterate(
	      function (v, k) { return fn(v, useKeys ? k : reverse ? this$1.size - ++i : i++, this$1); },
	      !reverse
	    );
	  };
	  reversedSequence.__iterator = function (type, reverse) {
	    var i = 0;
	    reverse && ensureSize(collection);
	    var iterator = collection.__iterator(ITERATE_ENTRIES, !reverse);
	    return new Iterator(function () {
	      var step = iterator.next();
	      if (step.done) {
	        return step;
	      }
	      var entry = step.value;
	      return iteratorValue(
	        type,
	        useKeys ? entry[0] : reverse ? this$1.size - ++i : i++,
	        entry[1],
	        step
	      );
	    });
	  };
	  return reversedSequence;
	}

	function filterFactory(collection, predicate, context, useKeys) {
	  var filterSequence = makeSequence(collection);
	  if (useKeys) {
	    filterSequence.has = function (key) {
	      var v = collection.get(key, NOT_SET);
	      return v !== NOT_SET && !!predicate.call(context, v, key, collection);
	    };
	    filterSequence.get = function (key, notSetValue) {
	      var v = collection.get(key, NOT_SET);
	      return v !== NOT_SET && predicate.call(context, v, key, collection)
	        ? v
	        : notSetValue;
	    };
	  }
	  filterSequence.__iterateUncached = function(fn, reverse) {
	    var this$1 = this;

	    var iterations = 0;
	    collection.__iterate(function (v, k, c) {
	      if (predicate.call(context, v, k, c)) {
	        iterations++;
	        return fn(v, useKeys ? k : iterations - 1, this$1);
	      }
	    }, reverse);
	    return iterations;
	  };
	  filterSequence.__iteratorUncached = function(type, reverse) {
	    var iterator = collection.__iterator(ITERATE_ENTRIES, reverse);
	    var iterations = 0;
	    return new Iterator(function () {
	      while (true) {
	        var step = iterator.next();
	        if (step.done) {
	          return step;
	        }
	        var entry = step.value;
	        var key = entry[0];
	        var value = entry[1];
	        if (predicate.call(context, value, key, collection)) {
	          return iteratorValue(type, useKeys ? key : iterations++, value, step);
	        }
	      }
	    });
	  };
	  return filterSequence;
	}

	function countByFactory(collection, grouper, context) {
	  var groups = Map().asMutable();
	  collection.__iterate(function (v, k) {
	    groups.update(grouper.call(context, v, k, collection), 0, function (a) { return a + 1; });
	  });
	  return groups.asImmutable();
	}

	function groupByFactory(collection, grouper, context) {
	  var isKeyedIter = isKeyed(collection);
	  var groups = (isOrdered(collection) ? OrderedMap() : Map()).asMutable();
	  collection.__iterate(function (v, k) {
	    groups.update(
	      grouper.call(context, v, k, collection),
	      function (a) { return ((a = a || []), a.push(isKeyedIter ? [k, v] : v), a); }
	    );
	  });
	  var coerce = collectionClass(collection);
	  return groups.map(function (arr) { return reify(collection, coerce(arr)); }).asImmutable();
	}

	function sliceFactory(collection, begin, end, useKeys) {
	  var originalSize = collection.size;

	  if (wholeSlice(begin, end, originalSize)) {
	    return collection;
	  }

	  var resolvedBegin = resolveBegin(begin, originalSize);
	  var resolvedEnd = resolveEnd(end, originalSize);

	  // begin or end will be NaN if they were provided as negative numbers and
	  // this collection's size is unknown. In that case, cache first so there is
	  // a known size and these do not resolve to NaN.
	  if (resolvedBegin !== resolvedBegin || resolvedEnd !== resolvedEnd) {
	    return sliceFactory(collection.toSeq().cacheResult(), begin, end, useKeys);
	  }

	  // Note: resolvedEnd is undefined when the original sequence's length is
	  // unknown and this slice did not supply an end and should contain all
	  // elements after resolvedBegin.
	  // In that case, resolvedSize will be NaN and sliceSize will remain undefined.
	  var resolvedSize = resolvedEnd - resolvedBegin;
	  var sliceSize;
	  if (resolvedSize === resolvedSize) {
	    sliceSize = resolvedSize < 0 ? 0 : resolvedSize;
	  }

	  var sliceSeq = makeSequence(collection);

	  // If collection.size is undefined, the size of the realized sliceSeq is
	  // unknown at this point unless the number of items to slice is 0
	  sliceSeq.size =
	    sliceSize === 0 ? sliceSize : (collection.size && sliceSize) || undefined;

	  if (!useKeys && isSeq(collection) && sliceSize >= 0) {
	    sliceSeq.get = function(index, notSetValue) {
	      index = wrapIndex(this, index);
	      return index >= 0 && index < sliceSize
	        ? collection.get(index + resolvedBegin, notSetValue)
	        : notSetValue;
	    };
	  }

	  sliceSeq.__iterateUncached = function(fn, reverse) {
	    var this$1 = this;

	    if (sliceSize === 0) {
	      return 0;
	    }
	    if (reverse) {
	      return this.cacheResult().__iterate(fn, reverse);
	    }
	    var skipped = 0;
	    var isSkipping = true;
	    var iterations = 0;
	    collection.__iterate(function (v, k) {
	      if (!(isSkipping && (isSkipping = skipped++ < resolvedBegin))) {
	        iterations++;
	        return (
	          fn(v, useKeys ? k : iterations - 1, this$1) !== false &&
	          iterations !== sliceSize
	        );
	      }
	    });
	    return iterations;
	  };

	  sliceSeq.__iteratorUncached = function(type, reverse) {
	    if (sliceSize !== 0 && reverse) {
	      return this.cacheResult().__iterator(type, reverse);
	    }
	    // Don't bother instantiating parent iterator if taking 0.
	    if (sliceSize === 0) {
	      return new Iterator(iteratorDone);
	    }
	    var iterator = collection.__iterator(type, reverse);
	    var skipped = 0;
	    var iterations = 0;
	    return new Iterator(function () {
	      while (skipped++ < resolvedBegin) {
	        iterator.next();
	      }
	      if (++iterations > sliceSize) {
	        return iteratorDone();
	      }
	      var step = iterator.next();
	      if (useKeys || type === ITERATE_VALUES || step.done) {
	        return step;
	      }
	      if (type === ITERATE_KEYS) {
	        return iteratorValue(type, iterations - 1, undefined, step);
	      }
	      return iteratorValue(type, iterations - 1, step.value[1], step);
	    });
	  };

	  return sliceSeq;
	}

	function takeWhileFactory(collection, predicate, context) {
	  var takeSequence = makeSequence(collection);
	  takeSequence.__iterateUncached = function(fn, reverse) {
	    var this$1 = this;

	    if (reverse) {
	      return this.cacheResult().__iterate(fn, reverse);
	    }
	    var iterations = 0;
	    collection.__iterate(
	      function (v, k, c) { return predicate.call(context, v, k, c) && ++iterations && fn(v, k, this$1); }
	    );
	    return iterations;
	  };
	  takeSequence.__iteratorUncached = function(type, reverse) {
	    var this$1 = this;

	    if (reverse) {
	      return this.cacheResult().__iterator(type, reverse);
	    }
	    var iterator = collection.__iterator(ITERATE_ENTRIES, reverse);
	    var iterating = true;
	    return new Iterator(function () {
	      if (!iterating) {
	        return iteratorDone();
	      }
	      var step = iterator.next();
	      if (step.done) {
	        return step;
	      }
	      var entry = step.value;
	      var k = entry[0];
	      var v = entry[1];
	      if (!predicate.call(context, v, k, this$1)) {
	        iterating = false;
	        return iteratorDone();
	      }
	      return type === ITERATE_ENTRIES ? step : iteratorValue(type, k, v, step);
	    });
	  };
	  return takeSequence;
	}

	function skipWhileFactory(collection, predicate, context, useKeys) {
	  var skipSequence = makeSequence(collection);
	  skipSequence.__iterateUncached = function(fn, reverse) {
	    var this$1 = this;

	    if (reverse) {
	      return this.cacheResult().__iterate(fn, reverse);
	    }
	    var isSkipping = true;
	    var iterations = 0;
	    collection.__iterate(function (v, k, c) {
	      if (!(isSkipping && (isSkipping = predicate.call(context, v, k, c)))) {
	        iterations++;
	        return fn(v, useKeys ? k : iterations - 1, this$1);
	      }
	    });
	    return iterations;
	  };
	  skipSequence.__iteratorUncached = function(type, reverse) {
	    var this$1 = this;

	    if (reverse) {
	      return this.cacheResult().__iterator(type, reverse);
	    }
	    var iterator = collection.__iterator(ITERATE_ENTRIES, reverse);
	    var skipping = true;
	    var iterations = 0;
	    return new Iterator(function () {
	      var step;
	      var k;
	      var v;
	      do {
	        step = iterator.next();
	        if (step.done) {
	          if (useKeys || type === ITERATE_VALUES) {
	            return step;
	          }
	          if (type === ITERATE_KEYS) {
	            return iteratorValue(type, iterations++, undefined, step);
	          }
	          return iteratorValue(type, iterations++, step.value[1], step);
	        }
	        var entry = step.value;
	        k = entry[0];
	        v = entry[1];
	        skipping && (skipping = predicate.call(context, v, k, this$1));
	      } while (skipping);
	      return type === ITERATE_ENTRIES ? step : iteratorValue(type, k, v, step);
	    });
	  };
	  return skipSequence;
	}

	function concatFactory(collection, values) {
	  var isKeyedCollection = isKeyed(collection);
	  var iters = [collection]
	    .concat(values)
	    .map(function (v) {
	      if (!isCollection(v)) {
	        v = isKeyedCollection
	          ? keyedSeqFromValue(v)
	          : indexedSeqFromValue(Array.isArray(v) ? v : [v]);
	      } else if (isKeyedCollection) {
	        v = KeyedCollection(v);
	      }
	      return v;
	    })
	    .filter(function (v) { return v.size !== 0; });

	  if (iters.length === 0) {
	    return collection;
	  }

	  if (iters.length === 1) {
	    var singleton = iters[0];
	    if (
	      singleton === collection ||
	      (isKeyedCollection && isKeyed(singleton)) ||
	      (isIndexed(collection) && isIndexed(singleton))
	    ) {
	      return singleton;
	    }
	  }

	  var concatSeq = new ArraySeq(iters);
	  if (isKeyedCollection) {
	    concatSeq = concatSeq.toKeyedSeq();
	  } else if (!isIndexed(collection)) {
	    concatSeq = concatSeq.toSetSeq();
	  }
	  concatSeq = concatSeq.flatten(true);
	  concatSeq.size = iters.reduce(function (sum, seq) {
	    if (sum !== undefined) {
	      var size = seq.size;
	      if (size !== undefined) {
	        return sum + size;
	      }
	    }
	  }, 0);
	  return concatSeq;
	}

	function flattenFactory(collection, depth, useKeys) {
	  var flatSequence = makeSequence(collection);
	  flatSequence.__iterateUncached = function(fn, reverse) {
	    if (reverse) {
	      return this.cacheResult().__iterate(fn, reverse);
	    }
	    var iterations = 0;
	    var stopped = false;
	    function flatDeep(iter, currentDepth) {
	      iter.__iterate(function (v, k) {
	        if ((!depth || currentDepth < depth) && isCollection(v)) {
	          flatDeep(v, currentDepth + 1);
	        } else {
	          iterations++;
	          if (fn(v, useKeys ? k : iterations - 1, flatSequence) === false) {
	            stopped = true;
	          }
	        }
	        return !stopped;
	      }, reverse);
	    }
	    flatDeep(collection, 0);
	    return iterations;
	  };
	  flatSequence.__iteratorUncached = function(type, reverse) {
	    if (reverse) {
	      return this.cacheResult().__iterator(type, reverse);
	    }
	    var iterator = collection.__iterator(type, reverse);
	    var stack = [];
	    var iterations = 0;
	    return new Iterator(function () {
	      while (iterator) {
	        var step = iterator.next();
	        if (step.done !== false) {
	          iterator = stack.pop();
	          continue;
	        }
	        var v = step.value;
	        if (type === ITERATE_ENTRIES) {
	          v = v[1];
	        }
	        if ((!depth || stack.length < depth) && isCollection(v)) {
	          stack.push(iterator);
	          iterator = v.__iterator(type, reverse);
	        } else {
	          return useKeys ? step : iteratorValue(type, iterations++, v, step);
	        }
	      }
	      return iteratorDone();
	    });
	  };
	  return flatSequence;
	}

	function flatMapFactory(collection, mapper, context) {
	  var coerce = collectionClass(collection);
	  return collection
	    .toSeq()
	    .map(function (v, k) { return coerce(mapper.call(context, v, k, collection)); })
	    .flatten(true);
	}

	function interposeFactory(collection, separator) {
	  var interposedSequence = makeSequence(collection);
	  interposedSequence.size = collection.size && collection.size * 2 - 1;
	  interposedSequence.__iterateUncached = function(fn, reverse) {
	    var this$1 = this;

	    var iterations = 0;
	    collection.__iterate(
	      function (v) { return (!iterations || fn(separator, iterations++, this$1) !== false) &&
	        fn(v, iterations++, this$1) !== false; },
	      reverse
	    );
	    return iterations;
	  };
	  interposedSequence.__iteratorUncached = function(type, reverse) {
	    var iterator = collection.__iterator(ITERATE_VALUES, reverse);
	    var iterations = 0;
	    var step;
	    return new Iterator(function () {
	      if (!step || iterations % 2) {
	        step = iterator.next();
	        if (step.done) {
	          return step;
	        }
	      }
	      return iterations % 2
	        ? iteratorValue(type, iterations++, separator)
	        : iteratorValue(type, iterations++, step.value, step);
	    });
	  };
	  return interposedSequence;
	}

	function sortFactory(collection, comparator, mapper) {
	  if (!comparator) {
	    comparator = defaultComparator;
	  }
	  var isKeyedCollection = isKeyed(collection);
	  var index = 0;
	  var entries = collection
	    .toSeq()
	    .map(function (v, k) { return [k, v, index++, mapper ? mapper(v, k, collection) : v]; })
	    .valueSeq()
	    .toArray();
	  entries.sort(function (a, b) { return comparator(a[3], b[3]) || a[2] - b[2]; }).forEach(
	    isKeyedCollection
	      ? function (v, i) {
	          entries[i].length = 2;
	        }
	      : function (v, i) {
	          entries[i] = v[1];
	        }
	  );
	  return isKeyedCollection
	    ? KeyedSeq(entries)
	    : isIndexed(collection)
	      ? IndexedSeq(entries)
	      : SetSeq(entries);
	}

	function maxFactory(collection, comparator, mapper) {
	  if (!comparator) {
	    comparator = defaultComparator;
	  }
	  if (mapper) {
	    var entry = collection
	      .toSeq()
	      .map(function (v, k) { return [v, mapper(v, k, collection)]; })
	      .reduce(function (a, b) { return (maxCompare(comparator, a[1], b[1]) ? b : a); });
	    return entry && entry[0];
	  }
	  return collection.reduce(function (a, b) { return (maxCompare(comparator, a, b) ? b : a); });
	}

	function maxCompare(comparator, a, b) {
	  var comp = comparator(b, a);
	  // b is considered the new max if the comparator declares them equal, but
	  // they are not equal and b is in fact a nullish value.
	  return (
	    (comp === 0 && b !== a && (b === undefined || b === null || b !== b)) ||
	    comp > 0
	  );
	}

	function zipWithFactory(keyIter, zipper, iters, zipAll) {
	  var zipSequence = makeSequence(keyIter);
	  var sizes = new ArraySeq(iters).map(function (i) { return i.size; });
	  zipSequence.size = zipAll ? sizes.max() : sizes.min();
	  // Note: this a generic base implementation of __iterate in terms of
	  // __iterator which may be more generically useful in the future.
	  zipSequence.__iterate = function(fn, reverse) {
	    /* generic:
	    var iterator = this.__iterator(ITERATE_ENTRIES, reverse);
	    var step;
	    var iterations = 0;
	    while (!(step = iterator.next()).done) {
	      iterations++;
	      if (fn(step.value[1], step.value[0], this) === false) {
	        break;
	      }
	    }
	    return iterations;
	    */
	    // indexed:
	    var iterator = this.__iterator(ITERATE_VALUES, reverse);
	    var step;
	    var iterations = 0;
	    while (!(step = iterator.next()).done) {
	      if (fn(step.value, iterations++, this) === false) {
	        break;
	      }
	    }
	    return iterations;
	  };
	  zipSequence.__iteratorUncached = function(type, reverse) {
	    var iterators = iters.map(
	      function (i) { return ((i = Collection(i)), getIterator(reverse ? i.reverse() : i)); }
	    );
	    var iterations = 0;
	    var isDone = false;
	    return new Iterator(function () {
	      var steps;
	      if (!isDone) {
	        steps = iterators.map(function (i) { return i.next(); });
	        isDone = zipAll ? steps.every(function (s) { return s.done; }) : steps.some(function (s) { return s.done; });
	      }
	      if (isDone) {
	        return iteratorDone();
	      }
	      return iteratorValue(
	        type,
	        iterations++,
	        zipper.apply(null, steps.map(function (s) { return s.value; }))
	      );
	    });
	  };
	  return zipSequence;
	}

	// #pragma Helper Functions

	function reify(iter, seq) {
	  return iter === seq ? iter : isSeq(iter) ? seq : iter.constructor(seq);
	}

	function validateEntry(entry) {
	  if (entry !== Object(entry)) {
	    throw new TypeError('Expected [K, V] tuple: ' + entry);
	  }
	}

	function collectionClass(collection) {
	  return isKeyed(collection)
	    ? KeyedCollection
	    : isIndexed(collection)
	      ? IndexedCollection
	      : SetCollection;
	}

	function makeSequence(collection) {
	  return Object.create(
	    (isKeyed(collection)
	      ? KeyedSeq
	      : isIndexed(collection)
	        ? IndexedSeq
	        : SetSeq
	    ).prototype
	  );
	}

	function cacheResultThrough() {
	  if (this._iter.cacheResult) {
	    this._iter.cacheResult();
	    this.size = this._iter.size;
	    return this;
	  }
	  return Seq.prototype.cacheResult.call(this);
	}

	function defaultComparator(a, b) {
	  if (a === undefined && b === undefined) {
	    return 0;
	  }

	  if (a === undefined) {
	    return 1;
	  }

	  if (b === undefined) {
	    return -1;
	  }

	  return a > b ? 1 : a < b ? -1 : 0;
	}

	// http://jsperf.com/copy-array-inline
	function arrCopy(arr, offset) {
	  offset = offset || 0;
	  var len = Math.max(0, arr.length - offset);
	  var newArr = new Array(len);
	  for (var ii = 0; ii < len; ii++) {
	    newArr[ii] = arr[ii + offset];
	  }
	  return newArr;
	}

	function invariant(condition, error) {
	  if (!condition) { throw new Error(error); }
	}

	function assertNotInfinite(size) {
	  invariant(
	    size !== Infinity,
	    'Cannot perform this action with an infinite size.'
	  );
	}

	function coerceKeyPath(keyPath) {
	  if (isArrayLike(keyPath) && typeof keyPath !== 'string') {
	    return keyPath;
	  }
	  if (isOrdered(keyPath)) {
	    return keyPath.toArray();
	  }
	  throw new TypeError(
	    'Invalid keyPath: expected Ordered Collection or Array: ' + keyPath
	  );
	}

	function isPlainObj(value) {
	  return (
	    value &&
	    (typeof value.constructor !== 'function' ||
	      value.constructor.name === 'Object')
	  );
	}

	/**
	 * Returns true if the value is a potentially-persistent data structure, either
	 * provided by Immutable.js or a plain Array or Object.
	 */
	function isDataStructure(value) {
	  return (
	    typeof value === 'object' &&
	    (isImmutable(value) || Array.isArray(value) || isPlainObj(value))
	  );
	}

	/**
	 * Converts a value to a string, adding quotes if a string was provided.
	 */
	function quoteString(value) {
	  try {
	    return typeof value === 'string' ? JSON.stringify(value) : String(value);
	  } catch (_ignoreError) {
	    return JSON.stringify(value);
	  }
	}

	function has$2(collection, key) {
	  return isImmutable(collection)
	    ? collection.has(key)
	    : isDataStructure(collection) && hasOwnProperty$1.call(collection, key);
	}

	function get(collection, key, notSetValue) {
	  return isImmutable(collection)
	    ? collection.get(key, notSetValue)
	    : !has$2(collection, key)
	      ? notSetValue
	      : typeof collection.get === 'function'
	        ? collection.get(key)
	        : collection[key];
	}

	function shallowCopy(from) {
	  if (Array.isArray(from)) {
	    return arrCopy(from);
	  }
	  var to = {};
	  for (var key in from) {
	    if (hasOwnProperty$1.call(from, key)) {
	      to[key] = from[key];
	    }
	  }
	  return to;
	}

	function remove(collection, key) {
	  if (!isDataStructure(collection)) {
	    throw new TypeError(
	      'Cannot update non-data-structure value: ' + collection
	    );
	  }
	  if (isImmutable(collection)) {
	    if (!collection.remove) {
	      throw new TypeError(
	        'Cannot update immutable value without .remove() method: ' + collection
	      );
	    }
	    return collection.remove(key);
	  }
	  if (!hasOwnProperty$1.call(collection, key)) {
	    return collection;
	  }
	  var collectionCopy = shallowCopy(collection);
	  if (Array.isArray(collectionCopy)) {
	    collectionCopy.splice(key, 1);
	  } else {
	    delete collectionCopy[key];
	  }
	  return collectionCopy;
	}

	function set(collection, key, value) {
	  if (!isDataStructure(collection)) {
	    throw new TypeError(
	      'Cannot update non-data-structure value: ' + collection
	    );
	  }
	  if (isImmutable(collection)) {
	    if (!collection.set) {
	      throw new TypeError(
	        'Cannot update immutable value without .set() method: ' + collection
	      );
	    }
	    return collection.set(key, value);
	  }
	  if (hasOwnProperty$1.call(collection, key) && value === collection[key]) {
	    return collection;
	  }
	  var collectionCopy = shallowCopy(collection);
	  collectionCopy[key] = value;
	  return collectionCopy;
	}

	function updateIn(collection, keyPath, notSetValue, updater) {
	  if (!updater) {
	    updater = notSetValue;
	    notSetValue = undefined;
	  }
	  var updatedValue = updateInDeeply(
	    isImmutable(collection),
	    collection,
	    coerceKeyPath(keyPath),
	    0,
	    notSetValue,
	    updater
	  );
	  return updatedValue === NOT_SET ? notSetValue : updatedValue;
	}

	function updateInDeeply(
	  inImmutable,
	  existing,
	  keyPath,
	  i,
	  notSetValue,
	  updater
	) {
	  var wasNotSet = existing === NOT_SET;
	  if (i === keyPath.length) {
	    var existingValue = wasNotSet ? notSetValue : existing;
	    var newValue = updater(existingValue);
	    return newValue === existingValue ? existing : newValue;
	  }
	  if (!wasNotSet && !isDataStructure(existing)) {
	    throw new TypeError(
	      'Cannot update within non-data-structure value in path [' +
	        keyPath.slice(0, i).map(quoteString) +
	        ']: ' +
	        existing
	    );
	  }
	  var key = keyPath[i];
	  var nextExisting = wasNotSet ? NOT_SET : get(existing, key, NOT_SET);
	  var nextUpdated = updateInDeeply(
	    nextExisting === NOT_SET ? inImmutable : isImmutable(nextExisting),
	    nextExisting,
	    keyPath,
	    i + 1,
	    notSetValue,
	    updater
	  );
	  return nextUpdated === nextExisting
	    ? existing
	    : nextUpdated === NOT_SET
	      ? remove(existing, key)
	      : set(
	          wasNotSet ? (inImmutable ? emptyMap() : {}) : existing,
	          key,
	          nextUpdated
	        );
	}

	function setIn(collection, keyPath, value) {
	  return updateIn(collection, keyPath, NOT_SET, function () { return value; });
	}

	function setIn$1(keyPath, v) {
	  return setIn(this, keyPath, v);
	}

	function removeIn(collection, keyPath) {
	  return updateIn(collection, keyPath, function () { return NOT_SET; });
	}

	function deleteIn(keyPath) {
	  return removeIn(this, keyPath);
	}

	function update(collection, key, notSetValue, updater) {
	  return updateIn(collection, [key], notSetValue, updater);
	}

	function update$1(key, notSetValue, updater) {
	  return arguments.length === 1
	    ? key(this)
	    : update(this, key, notSetValue, updater);
	}

	function updateIn$1(keyPath, notSetValue, updater) {
	  return updateIn(this, keyPath, notSetValue, updater);
	}

	function merge() {
	  var iters = [], len = arguments.length;
	  while ( len-- ) iters[ len ] = arguments[ len ];

	  return mergeIntoKeyedWith(this, iters);
	}

	function mergeWith(merger) {
	  var iters = [], len = arguments.length - 1;
	  while ( len-- > 0 ) iters[ len ] = arguments[ len + 1 ];

	  if (typeof merger !== 'function') {
	    throw new TypeError('Invalid merger function: ' + merger);
	  }
	  return mergeIntoKeyedWith(this, iters, merger);
	}

	function mergeIntoKeyedWith(collection, collections, merger) {
	  var iters = [];
	  for (var ii = 0; ii < collections.length; ii++) {
	    var collection$1 = KeyedCollection(collections[ii]);
	    if (collection$1.size !== 0) {
	      iters.push(collection$1);
	    }
	  }
	  if (iters.length === 0) {
	    return collection;
	  }
	  if (
	    collection.toSeq().size === 0 &&
	    !collection.__ownerID &&
	    iters.length === 1
	  ) {
	    return collection.constructor(iters[0]);
	  }
	  return collection.withMutations(function (collection) {
	    var mergeIntoCollection = merger
	      ? function (value, key) {
	          update(
	            collection,
	            key,
	            NOT_SET,
	            function (oldVal) { return (oldVal === NOT_SET ? value : merger(oldVal, value, key)); }
	          );
	        }
	      : function (value, key) {
	          collection.set(key, value);
	        };
	    for (var ii = 0; ii < iters.length; ii++) {
	      iters[ii].forEach(mergeIntoCollection);
	    }
	  });
	}

	function mergeDeepWithSources(collection, sources, merger) {
	  return mergeWithSources(collection, sources, deepMergerWith(merger));
	}

	function mergeWithSources(collection, sources, merger) {
	  if (!isDataStructure(collection)) {
	    throw new TypeError(
	      'Cannot merge into non-data-structure value: ' + collection
	    );
	  }
	  if (isImmutable(collection)) {
	    return typeof merger === 'function' && collection.mergeWith
	      ? collection.mergeWith.apply(collection, [ merger ].concat( sources ))
	      : collection.merge
	        ? collection.merge.apply(collection, sources)
	        : collection.concat.apply(collection, sources);
	  }
	  var isArray = Array.isArray(collection);
	  var merged = collection;
	  var Collection$$1 = isArray ? IndexedCollection : KeyedCollection;
	  var mergeItem = isArray
	    ? function (value) {
	        // Copy on write
	        if (merged === collection) {
	          merged = shallowCopy(merged);
	        }
	        merged.push(value);
	      }
	    : function (value, key) {
	        var hasVal = hasOwnProperty$1.call(merged, key);
	        var nextVal =
	          hasVal && merger ? merger(merged[key], value, key) : value;
	        if (!hasVal || nextVal !== merged[key]) {
	          // Copy on write
	          if (merged === collection) {
	            merged = shallowCopy(merged);
	          }
	          merged[key] = nextVal;
	        }
	      };
	  for (var i = 0; i < sources.length; i++) {
	    Collection$$1(sources[i]).forEach(mergeItem);
	  }
	  return merged;
	}

	function deepMergerWith(merger) {
	  function deepMerger(oldValue, newValue, key) {
	    return isDataStructure(oldValue) && isDataStructure(newValue)
	      ? mergeWithSources(oldValue, [newValue], deepMerger)
	      : merger
	        ? merger(oldValue, newValue, key)
	        : newValue;
	  }
	  return deepMerger;
	}

	function mergeDeep$1() {
	  var iters = [], len = arguments.length;
	  while ( len-- ) iters[ len ] = arguments[ len ];

	  return mergeDeepWithSources(this, iters);
	}

	function mergeDeepWith$1(merger) {
	  var iters = [], len = arguments.length - 1;
	  while ( len-- > 0 ) iters[ len ] = arguments[ len + 1 ];

	  return mergeDeepWithSources(this, iters, merger);
	}

	function mergeIn(keyPath) {
	  var iters = [], len = arguments.length - 1;
	  while ( len-- > 0 ) iters[ len ] = arguments[ len + 1 ];

	  return updateIn(this, keyPath, emptyMap(), function (m) { return mergeWithSources(m, iters); });
	}

	function mergeDeepIn(keyPath) {
	  var iters = [], len = arguments.length - 1;
	  while ( len-- > 0 ) iters[ len ] = arguments[ len + 1 ];

	  return updateIn(this, keyPath, emptyMap(), function (m) { return mergeDeepWithSources(m, iters); }
	  );
	}

	function withMutations(fn) {
	  var mutable = this.asMutable();
	  fn(mutable);
	  return mutable.wasAltered() ? mutable.__ensureOwner(this.__ownerID) : this;
	}

	function asMutable() {
	  return this.__ownerID ? this : this.__ensureOwner(new OwnerID());
	}

	function asImmutable() {
	  return this.__ensureOwner();
	}

	function wasAltered() {
	  return this.__altered;
	}

	var Map = /*@__PURE__*/(function (KeyedCollection$$1) {
	  function Map(value) {
	    return value === null || value === undefined
	      ? emptyMap()
	      : isMap(value) && !isOrdered(value)
	        ? value
	        : emptyMap().withMutations(function (map) {
	            var iter = KeyedCollection$$1(value);
	            assertNotInfinite(iter.size);
	            iter.forEach(function (v, k) { return map.set(k, v); });
	          });
	  }

	  if ( KeyedCollection$$1 ) Map.__proto__ = KeyedCollection$$1;
	  Map.prototype = Object.create( KeyedCollection$$1 && KeyedCollection$$1.prototype );
	  Map.prototype.constructor = Map;

	  Map.of = function of () {
	    var keyValues = [], len = arguments.length;
	    while ( len-- ) keyValues[ len ] = arguments[ len ];

	    return emptyMap().withMutations(function (map) {
	      for (var i = 0; i < keyValues.length; i += 2) {
	        if (i + 1 >= keyValues.length) {
	          throw new Error('Missing value for key: ' + keyValues[i]);
	        }
	        map.set(keyValues[i], keyValues[i + 1]);
	      }
	    });
	  };

	  Map.prototype.toString = function toString () {
	    return this.__toString('Map {', '}');
	  };

	  // @pragma Access

	  Map.prototype.get = function get (k, notSetValue) {
	    return this._root
	      ? this._root.get(0, undefined, k, notSetValue)
	      : notSetValue;
	  };

	  // @pragma Modification

	  Map.prototype.set = function set (k, v) {
	    return updateMap(this, k, v);
	  };

	  Map.prototype.remove = function remove (k) {
	    return updateMap(this, k, NOT_SET);
	  };

	  Map.prototype.deleteAll = function deleteAll (keys) {
	    var collection = Collection(keys);

	    if (collection.size === 0) {
	      return this;
	    }

	    return this.withMutations(function (map) {
	      collection.forEach(function (key) { return map.remove(key); });
	    });
	  };

	  Map.prototype.clear = function clear () {
	    if (this.size === 0) {
	      return this;
	    }
	    if (this.__ownerID) {
	      this.size = 0;
	      this._root = null;
	      this.__hash = undefined;
	      this.__altered = true;
	      return this;
	    }
	    return emptyMap();
	  };

	  // @pragma Composition

	  Map.prototype.sort = function sort (comparator) {
	    // Late binding
	    return OrderedMap(sortFactory(this, comparator));
	  };

	  Map.prototype.sortBy = function sortBy (mapper, comparator) {
	    // Late binding
	    return OrderedMap(sortFactory(this, comparator, mapper));
	  };

	  Map.prototype.map = function map (mapper, context) {
	    return this.withMutations(function (map) {
	      map.forEach(function (value, key) {
	        map.set(key, mapper.call(context, value, key, map));
	      });
	    });
	  };

	  // @pragma Mutability

	  Map.prototype.__iterator = function __iterator (type, reverse) {
	    return new MapIterator(this, type, reverse);
	  };

	  Map.prototype.__iterate = function __iterate (fn, reverse) {
	    var this$1 = this;

	    var iterations = 0;
	    this._root &&
	      this._root.iterate(function (entry) {
	        iterations++;
	        return fn(entry[1], entry[0], this$1);
	      }, reverse);
	    return iterations;
	  };

	  Map.prototype.__ensureOwner = function __ensureOwner (ownerID) {
	    if (ownerID === this.__ownerID) {
	      return this;
	    }
	    if (!ownerID) {
	      if (this.size === 0) {
	        return emptyMap();
	      }
	      this.__ownerID = ownerID;
	      this.__altered = false;
	      return this;
	    }
	    return makeMap(this.size, this._root, ownerID, this.__hash);
	  };

	  return Map;
	}(KeyedCollection));

	Map.isMap = isMap;

	var MapPrototype = Map.prototype;
	MapPrototype[IS_MAP_SYMBOL] = true;
	MapPrototype[DELETE] = MapPrototype.remove;
	MapPrototype.removeAll = MapPrototype.deleteAll;
	MapPrototype.setIn = setIn$1;
	MapPrototype.removeIn = MapPrototype.deleteIn = deleteIn;
	MapPrototype.update = update$1;
	MapPrototype.updateIn = updateIn$1;
	MapPrototype.merge = MapPrototype.concat = merge;
	MapPrototype.mergeWith = mergeWith;
	MapPrototype.mergeDeep = mergeDeep$1;
	MapPrototype.mergeDeepWith = mergeDeepWith$1;
	MapPrototype.mergeIn = mergeIn;
	MapPrototype.mergeDeepIn = mergeDeepIn;
	MapPrototype.withMutations = withMutations;
	MapPrototype.wasAltered = wasAltered;
	MapPrototype.asImmutable = asImmutable;
	MapPrototype['@@transducer/init'] = MapPrototype.asMutable = asMutable;
	MapPrototype['@@transducer/step'] = function(result, arr) {
	  return result.set(arr[0], arr[1]);
	};
	MapPrototype['@@transducer/result'] = function(obj) {
	  return obj.asImmutable();
	};

	// #pragma Trie Nodes

	var ArrayMapNode = function ArrayMapNode(ownerID, entries) {
	  this.ownerID = ownerID;
	  this.entries = entries;
	};

	ArrayMapNode.prototype.get = function get (shift, keyHash, key, notSetValue) {
	  var entries = this.entries;
	  for (var ii = 0, len = entries.length; ii < len; ii++) {
	    if (is(key, entries[ii][0])) {
	      return entries[ii][1];
	    }
	  }
	  return notSetValue;
	};

	ArrayMapNode.prototype.update = function update (ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
	  var removed = value === NOT_SET;

	  var entries = this.entries;
	  var idx = 0;
	  var len = entries.length;
	  for (; idx < len; idx++) {
	    if (is(key, entries[idx][0])) {
	      break;
	    }
	  }
	  var exists = idx < len;

	  if (exists ? entries[idx][1] === value : removed) {
	    return this;
	  }

	  SetRef(didAlter);
	  (removed || !exists) && SetRef(didChangeSize);

	  if (removed && entries.length === 1) {
	    return; // undefined
	  }

	  if (!exists && !removed && entries.length >= MAX_ARRAY_MAP_SIZE) {
	    return createNodes(ownerID, entries, key, value);
	  }

	  var isEditable = ownerID && ownerID === this.ownerID;
	  var newEntries = isEditable ? entries : arrCopy(entries);

	  if (exists) {
	    if (removed) {
	      idx === len - 1
	        ? newEntries.pop()
	        : (newEntries[idx] = newEntries.pop());
	    } else {
	      newEntries[idx] = [key, value];
	    }
	  } else {
	    newEntries.push([key, value]);
	  }

	  if (isEditable) {
	    this.entries = newEntries;
	    return this;
	  }

	  return new ArrayMapNode(ownerID, newEntries);
	};

	var BitmapIndexedNode = function BitmapIndexedNode(ownerID, bitmap, nodes) {
	  this.ownerID = ownerID;
	  this.bitmap = bitmap;
	  this.nodes = nodes;
	};

	BitmapIndexedNode.prototype.get = function get (shift, keyHash, key, notSetValue) {
	  if (keyHash === undefined) {
	    keyHash = hash(key);
	  }
	  var bit = 1 << ((shift === 0 ? keyHash : keyHash >>> shift) & MASK);
	  var bitmap = this.bitmap;
	  return (bitmap & bit) === 0
	    ? notSetValue
	    : this.nodes[popCount(bitmap & (bit - 1))].get(
	        shift + SHIFT,
	        keyHash,
	        key,
	        notSetValue
	      );
	};

	BitmapIndexedNode.prototype.update = function update (ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
	  if (keyHash === undefined) {
	    keyHash = hash(key);
	  }
	  var keyHashFrag = (shift === 0 ? keyHash : keyHash >>> shift) & MASK;
	  var bit = 1 << keyHashFrag;
	  var bitmap = this.bitmap;
	  var exists = (bitmap & bit) !== 0;

	  if (!exists && value === NOT_SET) {
	    return this;
	  }

	  var idx = popCount(bitmap & (bit - 1));
	  var nodes = this.nodes;
	  var node = exists ? nodes[idx] : undefined;
	  var newNode = updateNode(
	    node,
	    ownerID,
	    shift + SHIFT,
	    keyHash,
	    key,
	    value,
	    didChangeSize,
	    didAlter
	  );

	  if (newNode === node) {
	    return this;
	  }

	  if (!exists && newNode && nodes.length >= MAX_BITMAP_INDEXED_SIZE) {
	    return expandNodes(ownerID, nodes, bitmap, keyHashFrag, newNode);
	  }

	  if (
	    exists &&
	    !newNode &&
	    nodes.length === 2 &&
	    isLeafNode(nodes[idx ^ 1])
	  ) {
	    return nodes[idx ^ 1];
	  }

	  if (exists && newNode && nodes.length === 1 && isLeafNode(newNode)) {
	    return newNode;
	  }

	  var isEditable = ownerID && ownerID === this.ownerID;
	  var newBitmap = exists ? (newNode ? bitmap : bitmap ^ bit) : bitmap | bit;
	  var newNodes = exists
	    ? newNode
	      ? setAt(nodes, idx, newNode, isEditable)
	      : spliceOut(nodes, idx, isEditable)
	    : spliceIn(nodes, idx, newNode, isEditable);

	  if (isEditable) {
	    this.bitmap = newBitmap;
	    this.nodes = newNodes;
	    return this;
	  }

	  return new BitmapIndexedNode(ownerID, newBitmap, newNodes);
	};

	var HashArrayMapNode = function HashArrayMapNode(ownerID, count, nodes) {
	  this.ownerID = ownerID;
	  this.count = count;
	  this.nodes = nodes;
	};

	HashArrayMapNode.prototype.get = function get (shift, keyHash, key, notSetValue) {
	  if (keyHash === undefined) {
	    keyHash = hash(key);
	  }
	  var idx = (shift === 0 ? keyHash : keyHash >>> shift) & MASK;
	  var node = this.nodes[idx];
	  return node
	    ? node.get(shift + SHIFT, keyHash, key, notSetValue)
	    : notSetValue;
	};

	HashArrayMapNode.prototype.update = function update (ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
	  if (keyHash === undefined) {
	    keyHash = hash(key);
	  }
	  var idx = (shift === 0 ? keyHash : keyHash >>> shift) & MASK;
	  var removed = value === NOT_SET;
	  var nodes = this.nodes;
	  var node = nodes[idx];

	  if (removed && !node) {
	    return this;
	  }

	  var newNode = updateNode(
	    node,
	    ownerID,
	    shift + SHIFT,
	    keyHash,
	    key,
	    value,
	    didChangeSize,
	    didAlter
	  );
	  if (newNode === node) {
	    return this;
	  }

	  var newCount = this.count;
	  if (!node) {
	    newCount++;
	  } else if (!newNode) {
	    newCount--;
	    if (newCount < MIN_HASH_ARRAY_MAP_SIZE) {
	      return packNodes(ownerID, nodes, newCount, idx);
	    }
	  }

	  var isEditable = ownerID && ownerID === this.ownerID;
	  var newNodes = setAt(nodes, idx, newNode, isEditable);

	  if (isEditable) {
	    this.count = newCount;
	    this.nodes = newNodes;
	    return this;
	  }

	  return new HashArrayMapNode(ownerID, newCount, newNodes);
	};

	var HashCollisionNode = function HashCollisionNode(ownerID, keyHash, entries) {
	  this.ownerID = ownerID;
	  this.keyHash = keyHash;
	  this.entries = entries;
	};

	HashCollisionNode.prototype.get = function get (shift, keyHash, key, notSetValue) {
	  var entries = this.entries;
	  for (var ii = 0, len = entries.length; ii < len; ii++) {
	    if (is(key, entries[ii][0])) {
	      return entries[ii][1];
	    }
	  }
	  return notSetValue;
	};

	HashCollisionNode.prototype.update = function update (ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
	  if (keyHash === undefined) {
	    keyHash = hash(key);
	  }

	  var removed = value === NOT_SET;

	  if (keyHash !== this.keyHash) {
	    if (removed) {
	      return this;
	    }
	    SetRef(didAlter);
	    SetRef(didChangeSize);
	    return mergeIntoNode(this, ownerID, shift, keyHash, [key, value]);
	  }

	  var entries = this.entries;
	  var idx = 0;
	  var len = entries.length;
	  for (; idx < len; idx++) {
	    if (is(key, entries[idx][0])) {
	      break;
	    }
	  }
	  var exists = idx < len;

	  if (exists ? entries[idx][1] === value : removed) {
	    return this;
	  }

	  SetRef(didAlter);
	  (removed || !exists) && SetRef(didChangeSize);

	  if (removed && len === 2) {
	    return new ValueNode(ownerID, this.keyHash, entries[idx ^ 1]);
	  }

	  var isEditable = ownerID && ownerID === this.ownerID;
	  var newEntries = isEditable ? entries : arrCopy(entries);

	  if (exists) {
	    if (removed) {
	      idx === len - 1
	        ? newEntries.pop()
	        : (newEntries[idx] = newEntries.pop());
	    } else {
	      newEntries[idx] = [key, value];
	    }
	  } else {
	    newEntries.push([key, value]);
	  }

	  if (isEditable) {
	    this.entries = newEntries;
	    return this;
	  }

	  return new HashCollisionNode(ownerID, this.keyHash, newEntries);
	};

	var ValueNode = function ValueNode(ownerID, keyHash, entry) {
	  this.ownerID = ownerID;
	  this.keyHash = keyHash;
	  this.entry = entry;
	};

	ValueNode.prototype.get = function get (shift, keyHash, key, notSetValue) {
	  return is(key, this.entry[0]) ? this.entry[1] : notSetValue;
	};

	ValueNode.prototype.update = function update (ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
	  var removed = value === NOT_SET;
	  var keyMatch = is(key, this.entry[0]);
	  if (keyMatch ? value === this.entry[1] : removed) {
	    return this;
	  }

	  SetRef(didAlter);

	  if (removed) {
	    SetRef(didChangeSize);
	    return; // undefined
	  }

	  if (keyMatch) {
	    if (ownerID && ownerID === this.ownerID) {
	      this.entry[1] = value;
	      return this;
	    }
	    return new ValueNode(ownerID, this.keyHash, [key, value]);
	  }

	  SetRef(didChangeSize);
	  return mergeIntoNode(this, ownerID, shift, hash(key), [key, value]);
	};

	// #pragma Iterators

	ArrayMapNode.prototype.iterate = HashCollisionNode.prototype.iterate = function(
	  fn,
	  reverse
	) {
	  var entries = this.entries;
	  for (var ii = 0, maxIndex = entries.length - 1; ii <= maxIndex; ii++) {
	    if (fn(entries[reverse ? maxIndex - ii : ii]) === false) {
	      return false;
	    }
	  }
	};

	BitmapIndexedNode.prototype.iterate = HashArrayMapNode.prototype.iterate = function(
	  fn,
	  reverse
	) {
	  var nodes = this.nodes;
	  for (var ii = 0, maxIndex = nodes.length - 1; ii <= maxIndex; ii++) {
	    var node = nodes[reverse ? maxIndex - ii : ii];
	    if (node && node.iterate(fn, reverse) === false) {
	      return false;
	    }
	  }
	};

	// eslint-disable-next-line no-unused-vars
	ValueNode.prototype.iterate = function(fn, reverse) {
	  return fn(this.entry);
	};

	var MapIterator = /*@__PURE__*/(function (Iterator$$1) {
	  function MapIterator(map, type, reverse) {
	    this._type = type;
	    this._reverse = reverse;
	    this._stack = map._root && mapIteratorFrame(map._root);
	  }

	  if ( Iterator$$1 ) MapIterator.__proto__ = Iterator$$1;
	  MapIterator.prototype = Object.create( Iterator$$1 && Iterator$$1.prototype );
	  MapIterator.prototype.constructor = MapIterator;

	  MapIterator.prototype.next = function next () {
	    var type = this._type;
	    var stack = this._stack;
	    while (stack) {
	      var node = stack.node;
	      var index = stack.index++;
	      var maxIndex = (void 0);
	      if (node.entry) {
	        if (index === 0) {
	          return mapIteratorValue(type, node.entry);
	        }
	      } else if (node.entries) {
	        maxIndex = node.entries.length - 1;
	        if (index <= maxIndex) {
	          return mapIteratorValue(
	            type,
	            node.entries[this._reverse ? maxIndex - index : index]
	          );
	        }
	      } else {
	        maxIndex = node.nodes.length - 1;
	        if (index <= maxIndex) {
	          var subNode = node.nodes[this._reverse ? maxIndex - index : index];
	          if (subNode) {
	            if (subNode.entry) {
	              return mapIteratorValue(type, subNode.entry);
	            }
	            stack = this._stack = mapIteratorFrame(subNode, stack);
	          }
	          continue;
	        }
	      }
	      stack = this._stack = this._stack.__prev;
	    }
	    return iteratorDone();
	  };

	  return MapIterator;
	}(Iterator));

	function mapIteratorValue(type, entry) {
	  return iteratorValue(type, entry[0], entry[1]);
	}

	function mapIteratorFrame(node, prev) {
	  return {
	    node: node,
	    index: 0,
	    __prev: prev,
	  };
	}

	function makeMap(size, root, ownerID, hash$$1) {
	  var map = Object.create(MapPrototype);
	  map.size = size;
	  map._root = root;
	  map.__ownerID = ownerID;
	  map.__hash = hash$$1;
	  map.__altered = false;
	  return map;
	}

	var EMPTY_MAP;
	function emptyMap() {
	  return EMPTY_MAP || (EMPTY_MAP = makeMap(0));
	}

	function updateMap(map, k, v) {
	  var newRoot;
	  var newSize;
	  if (!map._root) {
	    if (v === NOT_SET) {
	      return map;
	    }
	    newSize = 1;
	    newRoot = new ArrayMapNode(map.__ownerID, [[k, v]]);
	  } else {
	    var didChangeSize = MakeRef();
	    var didAlter = MakeRef();
	    newRoot = updateNode(
	      map._root,
	      map.__ownerID,
	      0,
	      undefined,
	      k,
	      v,
	      didChangeSize,
	      didAlter
	    );
	    if (!didAlter.value) {
	      return map;
	    }
	    newSize = map.size + (didChangeSize.value ? (v === NOT_SET ? -1 : 1) : 0);
	  }
	  if (map.__ownerID) {
	    map.size = newSize;
	    map._root = newRoot;
	    map.__hash = undefined;
	    map.__altered = true;
	    return map;
	  }
	  return newRoot ? makeMap(newSize, newRoot) : emptyMap();
	}

	function updateNode(
	  node,
	  ownerID,
	  shift,
	  keyHash,
	  key,
	  value,
	  didChangeSize,
	  didAlter
	) {
	  if (!node) {
	    if (value === NOT_SET) {
	      return node;
	    }
	    SetRef(didAlter);
	    SetRef(didChangeSize);
	    return new ValueNode(ownerID, keyHash, [key, value]);
	  }
	  return node.update(
	    ownerID,
	    shift,
	    keyHash,
	    key,
	    value,
	    didChangeSize,
	    didAlter
	  );
	}

	function isLeafNode(node) {
	  return (
	    node.constructor === ValueNode || node.constructor === HashCollisionNode
	  );
	}

	function mergeIntoNode(node, ownerID, shift, keyHash, entry) {
	  if (node.keyHash === keyHash) {
	    return new HashCollisionNode(ownerID, keyHash, [node.entry, entry]);
	  }

	  var idx1 = (shift === 0 ? node.keyHash : node.keyHash >>> shift) & MASK;
	  var idx2 = (shift === 0 ? keyHash : keyHash >>> shift) & MASK;

	  var newNode;
	  var nodes =
	    idx1 === idx2
	      ? [mergeIntoNode(node, ownerID, shift + SHIFT, keyHash, entry)]
	      : ((newNode = new ValueNode(ownerID, keyHash, entry)),
	        idx1 < idx2 ? [node, newNode] : [newNode, node]);

	  return new BitmapIndexedNode(ownerID, (1 << idx1) | (1 << idx2), nodes);
	}

	function createNodes(ownerID, entries, key, value) {
	  if (!ownerID) {
	    ownerID = new OwnerID();
	  }
	  var node = new ValueNode(ownerID, hash(key), [key, value]);
	  for (var ii = 0; ii < entries.length; ii++) {
	    var entry = entries[ii];
	    node = node.update(ownerID, 0, undefined, entry[0], entry[1]);
	  }
	  return node;
	}

	function packNodes(ownerID, nodes, count, excluding) {
	  var bitmap = 0;
	  var packedII = 0;
	  var packedNodes = new Array(count);
	  for (var ii = 0, bit = 1, len = nodes.length; ii < len; ii++, bit <<= 1) {
	    var node = nodes[ii];
	    if (node !== undefined && ii !== excluding) {
	      bitmap |= bit;
	      packedNodes[packedII++] = node;
	    }
	  }
	  return new BitmapIndexedNode(ownerID, bitmap, packedNodes);
	}

	function expandNodes(ownerID, nodes, bitmap, including, node) {
	  var count = 0;
	  var expandedNodes = new Array(SIZE);
	  for (var ii = 0; bitmap !== 0; ii++, bitmap >>>= 1) {
	    expandedNodes[ii] = bitmap & 1 ? nodes[count++] : undefined;
	  }
	  expandedNodes[including] = node;
	  return new HashArrayMapNode(ownerID, count + 1, expandedNodes);
	}

	function popCount(x) {
	  x -= (x >> 1) & 0x55555555;
	  x = (x & 0x33333333) + ((x >> 2) & 0x33333333);
	  x = (x + (x >> 4)) & 0x0f0f0f0f;
	  x += x >> 8;
	  x += x >> 16;
	  return x & 0x7f;
	}

	function setAt(array, idx, val, canEdit) {
	  var newArray = canEdit ? array : arrCopy(array);
	  newArray[idx] = val;
	  return newArray;
	}

	function spliceIn(array, idx, val, canEdit) {
	  var newLen = array.length + 1;
	  if (canEdit && idx + 1 === newLen) {
	    array[idx] = val;
	    return array;
	  }
	  var newArray = new Array(newLen);
	  var after = 0;
	  for (var ii = 0; ii < newLen; ii++) {
	    if (ii === idx) {
	      newArray[ii] = val;
	      after = -1;
	    } else {
	      newArray[ii] = array[ii + after];
	    }
	  }
	  return newArray;
	}

	function spliceOut(array, idx, canEdit) {
	  var newLen = array.length - 1;
	  if (canEdit && idx === newLen) {
	    array.pop();
	    return array;
	  }
	  var newArray = new Array(newLen);
	  var after = 0;
	  for (var ii = 0; ii < newLen; ii++) {
	    if (ii === idx) {
	      after = 1;
	    }
	    newArray[ii] = array[ii + after];
	  }
	  return newArray;
	}

	var MAX_ARRAY_MAP_SIZE = SIZE / 4;
	var MAX_BITMAP_INDEXED_SIZE = SIZE / 2;
	var MIN_HASH_ARRAY_MAP_SIZE = SIZE / 4;

	var IS_LIST_SYMBOL = '@@__IMMUTABLE_LIST__@@';

	function isList(maybeList) {
	  return Boolean(maybeList && maybeList[IS_LIST_SYMBOL]);
	}

	var List = /*@__PURE__*/(function (IndexedCollection$$1) {
	  function List(value) {
	    var empty = emptyList();
	    if (value === null || value === undefined) {
	      return empty;
	    }
	    if (isList(value)) {
	      return value;
	    }
	    var iter = IndexedCollection$$1(value);
	    var size = iter.size;
	    if (size === 0) {
	      return empty;
	    }
	    assertNotInfinite(size);
	    if (size > 0 && size < SIZE) {
	      return makeList(0, size, SHIFT, null, new VNode(iter.toArray()));
	    }
	    return empty.withMutations(function (list) {
	      list.setSize(size);
	      iter.forEach(function (v, i) { return list.set(i, v); });
	    });
	  }

	  if ( IndexedCollection$$1 ) List.__proto__ = IndexedCollection$$1;
	  List.prototype = Object.create( IndexedCollection$$1 && IndexedCollection$$1.prototype );
	  List.prototype.constructor = List;

	  List.of = function of (/*...values*/) {
	    return this(arguments);
	  };

	  List.prototype.toString = function toString () {
	    return this.__toString('List [', ']');
	  };

	  // @pragma Access

	  List.prototype.get = function get (index, notSetValue) {
	    index = wrapIndex(this, index);
	    if (index >= 0 && index < this.size) {
	      index += this._origin;
	      var node = listNodeFor(this, index);
	      return node && node.array[index & MASK];
	    }
	    return notSetValue;
	  };

	  // @pragma Modification

	  List.prototype.set = function set (index, value) {
	    return updateList(this, index, value);
	  };

	  List.prototype.remove = function remove (index) {
	    return !this.has(index)
	      ? this
	      : index === 0
	        ? this.shift()
	        : index === this.size - 1
	          ? this.pop()
	          : this.splice(index, 1);
	  };

	  List.prototype.insert = function insert (index, value) {
	    return this.splice(index, 0, value);
	  };

	  List.prototype.clear = function clear () {
	    if (this.size === 0) {
	      return this;
	    }
	    if (this.__ownerID) {
	      this.size = this._origin = this._capacity = 0;
	      this._level = SHIFT;
	      this._root = this._tail = null;
	      this.__hash = undefined;
	      this.__altered = true;
	      return this;
	    }
	    return emptyList();
	  };

	  List.prototype.push = function push (/*...values*/) {
	    var values = arguments;
	    var oldSize = this.size;
	    return this.withMutations(function (list) {
	      setListBounds(list, 0, oldSize + values.length);
	      for (var ii = 0; ii < values.length; ii++) {
	        list.set(oldSize + ii, values[ii]);
	      }
	    });
	  };

	  List.prototype.pop = function pop () {
	    return setListBounds(this, 0, -1);
	  };

	  List.prototype.unshift = function unshift (/*...values*/) {
	    var values = arguments;
	    return this.withMutations(function (list) {
	      setListBounds(list, -values.length);
	      for (var ii = 0; ii < values.length; ii++) {
	        list.set(ii, values[ii]);
	      }
	    });
	  };

	  List.prototype.shift = function shift () {
	    return setListBounds(this, 1);
	  };

	  // @pragma Composition

	  List.prototype.concat = function concat (/*...collections*/) {
	    var arguments$1 = arguments;

	    var seqs = [];
	    for (var i = 0; i < arguments.length; i++) {
	      var argument = arguments$1[i];
	      var seq = IndexedCollection$$1(
	        typeof argument !== 'string' && hasIterator(argument)
	          ? argument
	          : [argument]
	      );
	      if (seq.size !== 0) {
	        seqs.push(seq);
	      }
	    }
	    if (seqs.length === 0) {
	      return this;
	    }
	    if (this.size === 0 && !this.__ownerID && seqs.length === 1) {
	      return this.constructor(seqs[0]);
	    }
	    return this.withMutations(function (list) {
	      seqs.forEach(function (seq) { return seq.forEach(function (value) { return list.push(value); }); });
	    });
	  };

	  List.prototype.setSize = function setSize (size) {
	    return setListBounds(this, 0, size);
	  };

	  List.prototype.map = function map (mapper, context) {
	    var this$1 = this;

	    return this.withMutations(function (list) {
	      for (var i = 0; i < this$1.size; i++) {
	        list.set(i, mapper.call(context, list.get(i), i, list));
	      }
	    });
	  };

	  // @pragma Iteration

	  List.prototype.slice = function slice (begin, end) {
	    var size = this.size;
	    if (wholeSlice(begin, end, size)) {
	      return this;
	    }
	    return setListBounds(
	      this,
	      resolveBegin(begin, size),
	      resolveEnd(end, size)
	    );
	  };

	  List.prototype.__iterator = function __iterator (type, reverse) {
	    var index = reverse ? this.size : 0;
	    var values = iterateList(this, reverse);
	    return new Iterator(function () {
	      var value = values();
	      return value === DONE
	        ? iteratorDone()
	        : iteratorValue(type, reverse ? --index : index++, value);
	    });
	  };

	  List.prototype.__iterate = function __iterate (fn, reverse) {
	    var index = reverse ? this.size : 0;
	    var values = iterateList(this, reverse);
	    var value;
	    while ((value = values()) !== DONE) {
	      if (fn(value, reverse ? --index : index++, this) === false) {
	        break;
	      }
	    }
	    return index;
	  };

	  List.prototype.__ensureOwner = function __ensureOwner (ownerID) {
	    if (ownerID === this.__ownerID) {
	      return this;
	    }
	    if (!ownerID) {
	      if (this.size === 0) {
	        return emptyList();
	      }
	      this.__ownerID = ownerID;
	      this.__altered = false;
	      return this;
	    }
	    return makeList(
	      this._origin,
	      this._capacity,
	      this._level,
	      this._root,
	      this._tail,
	      ownerID,
	      this.__hash
	    );
	  };

	  return List;
	}(IndexedCollection));

	List.isList = isList;

	var ListPrototype = List.prototype;
	ListPrototype[IS_LIST_SYMBOL] = true;
	ListPrototype[DELETE] = ListPrototype.remove;
	ListPrototype.merge = ListPrototype.concat;
	ListPrototype.setIn = setIn$1;
	ListPrototype.deleteIn = ListPrototype.removeIn = deleteIn;
	ListPrototype.update = update$1;
	ListPrototype.updateIn = updateIn$1;
	ListPrototype.mergeIn = mergeIn;
	ListPrototype.mergeDeepIn = mergeDeepIn;
	ListPrototype.withMutations = withMutations;
	ListPrototype.wasAltered = wasAltered;
	ListPrototype.asImmutable = asImmutable;
	ListPrototype['@@transducer/init'] = ListPrototype.asMutable = asMutable;
	ListPrototype['@@transducer/step'] = function(result, arr) {
	  return result.push(arr);
	};
	ListPrototype['@@transducer/result'] = function(obj) {
	  return obj.asImmutable();
	};

	var VNode = function VNode(array, ownerID) {
	  this.array = array;
	  this.ownerID = ownerID;
	};

	// TODO: seems like these methods are very similar

	VNode.prototype.removeBefore = function removeBefore (ownerID, level, index) {
	  if (index === level ? 1 << level : this.array.length === 0) {
	    return this;
	  }
	  var originIndex = (index >>> level) & MASK;
	  if (originIndex >= this.array.length) {
	    return new VNode([], ownerID);
	  }
	  var removingFirst = originIndex === 0;
	  var newChild;
	  if (level > 0) {
	    var oldChild = this.array[originIndex];
	    newChild =
	      oldChild && oldChild.removeBefore(ownerID, level - SHIFT, index);
	    if (newChild === oldChild && removingFirst) {
	      return this;
	    }
	  }
	  if (removingFirst && !newChild) {
	    return this;
	  }
	  var editable = editableVNode(this, ownerID);
	  if (!removingFirst) {
	    for (var ii = 0; ii < originIndex; ii++) {
	      editable.array[ii] = undefined;
	    }
	  }
	  if (newChild) {
	    editable.array[originIndex] = newChild;
	  }
	  return editable;
	};

	VNode.prototype.removeAfter = function removeAfter (ownerID, level, index) {
	  if (index === (level ? 1 << level : 0) || this.array.length === 0) {
	    return this;
	  }
	  var sizeIndex = ((index - 1) >>> level) & MASK;
	  if (sizeIndex >= this.array.length) {
	    return this;
	  }

	  var newChild;
	  if (level > 0) {
	    var oldChild = this.array[sizeIndex];
	    newChild =
	      oldChild && oldChild.removeAfter(ownerID, level - SHIFT, index);
	    if (newChild === oldChild && sizeIndex === this.array.length - 1) {
	      return this;
	    }
	  }

	  var editable = editableVNode(this, ownerID);
	  editable.array.splice(sizeIndex + 1);
	  if (newChild) {
	    editable.array[sizeIndex] = newChild;
	  }
	  return editable;
	};

	var DONE = {};

	function iterateList(list, reverse) {
	  var left = list._origin;
	  var right = list._capacity;
	  var tailPos = getTailOffset(right);
	  var tail = list._tail;

	  return iterateNodeOrLeaf(list._root, list._level, 0);

	  function iterateNodeOrLeaf(node, level, offset) {
	    return level === 0
	      ? iterateLeaf(node, offset)
	      : iterateNode(node, level, offset);
	  }

	  function iterateLeaf(node, offset) {
	    var array = offset === tailPos ? tail && tail.array : node && node.array;
	    var from = offset > left ? 0 : left - offset;
	    var to = right - offset;
	    if (to > SIZE) {
	      to = SIZE;
	    }
	    return function () {
	      if (from === to) {
	        return DONE;
	      }
	      var idx = reverse ? --to : from++;
	      return array && array[idx];
	    };
	  }

	  function iterateNode(node, level, offset) {
	    var values;
	    var array = node && node.array;
	    var from = offset > left ? 0 : (left - offset) >> level;
	    var to = ((right - offset) >> level) + 1;
	    if (to > SIZE) {
	      to = SIZE;
	    }
	    return function () {
	      while (true) {
	        if (values) {
	          var value = values();
	          if (value !== DONE) {
	            return value;
	          }
	          values = null;
	        }
	        if (from === to) {
	          return DONE;
	        }
	        var idx = reverse ? --to : from++;
	        values = iterateNodeOrLeaf(
	          array && array[idx],
	          level - SHIFT,
	          offset + (idx << level)
	        );
	      }
	    };
	  }
	}

	function makeList(origin, capacity, level, root, tail, ownerID, hash) {
	  var list = Object.create(ListPrototype);
	  list.size = capacity - origin;
	  list._origin = origin;
	  list._capacity = capacity;
	  list._level = level;
	  list._root = root;
	  list._tail = tail;
	  list.__ownerID = ownerID;
	  list.__hash = hash;
	  list.__altered = false;
	  return list;
	}

	var EMPTY_LIST;
	function emptyList() {
	  return EMPTY_LIST || (EMPTY_LIST = makeList(0, 0, SHIFT));
	}

	function updateList(list, index, value) {
	  index = wrapIndex(list, index);

	  if (index !== index) {
	    return list;
	  }

	  if (index >= list.size || index < 0) {
	    return list.withMutations(function (list) {
	      index < 0
	        ? setListBounds(list, index).set(0, value)
	        : setListBounds(list, 0, index + 1).set(index, value);
	    });
	  }

	  index += list._origin;

	  var newTail = list._tail;
	  var newRoot = list._root;
	  var didAlter = MakeRef();
	  if (index >= getTailOffset(list._capacity)) {
	    newTail = updateVNode(newTail, list.__ownerID, 0, index, value, didAlter);
	  } else {
	    newRoot = updateVNode(
	      newRoot,
	      list.__ownerID,
	      list._level,
	      index,
	      value,
	      didAlter
	    );
	  }

	  if (!didAlter.value) {
	    return list;
	  }

	  if (list.__ownerID) {
	    list._root = newRoot;
	    list._tail = newTail;
	    list.__hash = undefined;
	    list.__altered = true;
	    return list;
	  }
	  return makeList(list._origin, list._capacity, list._level, newRoot, newTail);
	}

	function updateVNode(node, ownerID, level, index, value, didAlter) {
	  var idx = (index >>> level) & MASK;
	  var nodeHas = node && idx < node.array.length;
	  if (!nodeHas && value === undefined) {
	    return node;
	  }

	  var newNode;

	  if (level > 0) {
	    var lowerNode = node && node.array[idx];
	    var newLowerNode = updateVNode(
	      lowerNode,
	      ownerID,
	      level - SHIFT,
	      index,
	      value,
	      didAlter
	    );
	    if (newLowerNode === lowerNode) {
	      return node;
	    }
	    newNode = editableVNode(node, ownerID);
	    newNode.array[idx] = newLowerNode;
	    return newNode;
	  }

	  if (nodeHas && node.array[idx] === value) {
	    return node;
	  }

	  if (didAlter) {
	    SetRef(didAlter);
	  }

	  newNode = editableVNode(node, ownerID);
	  if (value === undefined && idx === newNode.array.length - 1) {
	    newNode.array.pop();
	  } else {
	    newNode.array[idx] = value;
	  }
	  return newNode;
	}

	function editableVNode(node, ownerID) {
	  if (ownerID && node && ownerID === node.ownerID) {
	    return node;
	  }
	  return new VNode(node ? node.array.slice() : [], ownerID);
	}

	function listNodeFor(list, rawIndex) {
	  if (rawIndex >= getTailOffset(list._capacity)) {
	    return list._tail;
	  }
	  if (rawIndex < 1 << (list._level + SHIFT)) {
	    var node = list._root;
	    var level = list._level;
	    while (node && level > 0) {
	      node = node.array[(rawIndex >>> level) & MASK];
	      level -= SHIFT;
	    }
	    return node;
	  }
	}

	function setListBounds(list, begin, end) {
	  // Sanitize begin & end using this shorthand for ToInt32(argument)
	  // http://www.ecma-international.org/ecma-262/6.0/#sec-toint32
	  if (begin !== undefined) {
	    begin |= 0;
	  }
	  if (end !== undefined) {
	    end |= 0;
	  }
	  var owner = list.__ownerID || new OwnerID();
	  var oldOrigin = list._origin;
	  var oldCapacity = list._capacity;
	  var newOrigin = oldOrigin + begin;
	  var newCapacity =
	    end === undefined
	      ? oldCapacity
	      : end < 0
	        ? oldCapacity + end
	        : oldOrigin + end;
	  if (newOrigin === oldOrigin && newCapacity === oldCapacity) {
	    return list;
	  }

	  // If it's going to end after it starts, it's empty.
	  if (newOrigin >= newCapacity) {
	    return list.clear();
	  }

	  var newLevel = list._level;
	  var newRoot = list._root;

	  // New origin might need creating a higher root.
	  var offsetShift = 0;
	  while (newOrigin + offsetShift < 0) {
	    newRoot = new VNode(
	      newRoot && newRoot.array.length ? [undefined, newRoot] : [],
	      owner
	    );
	    newLevel += SHIFT;
	    offsetShift += 1 << newLevel;
	  }
	  if (offsetShift) {
	    newOrigin += offsetShift;
	    oldOrigin += offsetShift;
	    newCapacity += offsetShift;
	    oldCapacity += offsetShift;
	  }

	  var oldTailOffset = getTailOffset(oldCapacity);
	  var newTailOffset = getTailOffset(newCapacity);

	  // New size might need creating a higher root.
	  while (newTailOffset >= 1 << (newLevel + SHIFT)) {
	    newRoot = new VNode(
	      newRoot && newRoot.array.length ? [newRoot] : [],
	      owner
	    );
	    newLevel += SHIFT;
	  }

	  // Locate or create the new tail.
	  var oldTail = list._tail;
	  var newTail =
	    newTailOffset < oldTailOffset
	      ? listNodeFor(list, newCapacity - 1)
	      : newTailOffset > oldTailOffset
	        ? new VNode([], owner)
	        : oldTail;

	  // Merge Tail into tree.
	  if (
	    oldTail &&
	    newTailOffset > oldTailOffset &&
	    newOrigin < oldCapacity &&
	    oldTail.array.length
	  ) {
	    newRoot = editableVNode(newRoot, owner);
	    var node = newRoot;
	    for (var level = newLevel; level > SHIFT; level -= SHIFT) {
	      var idx = (oldTailOffset >>> level) & MASK;
	      node = node.array[idx] = editableVNode(node.array[idx], owner);
	    }
	    node.array[(oldTailOffset >>> SHIFT) & MASK] = oldTail;
	  }

	  // If the size has been reduced, there's a chance the tail needs to be trimmed.
	  if (newCapacity < oldCapacity) {
	    newTail = newTail && newTail.removeAfter(owner, 0, newCapacity);
	  }

	  // If the new origin is within the tail, then we do not need a root.
	  if (newOrigin >= newTailOffset) {
	    newOrigin -= newTailOffset;
	    newCapacity -= newTailOffset;
	    newLevel = SHIFT;
	    newRoot = null;
	    newTail = newTail && newTail.removeBefore(owner, 0, newOrigin);

	    // Otherwise, if the root has been trimmed, garbage collect.
	  } else if (newOrigin > oldOrigin || newTailOffset < oldTailOffset) {
	    offsetShift = 0;

	    // Identify the new top root node of the subtree of the old root.
	    while (newRoot) {
	      var beginIndex = (newOrigin >>> newLevel) & MASK;
	      if ((beginIndex !== newTailOffset >>> newLevel) & MASK) {
	        break;
	      }
	      if (beginIndex) {
	        offsetShift += (1 << newLevel) * beginIndex;
	      }
	      newLevel -= SHIFT;
	      newRoot = newRoot.array[beginIndex];
	    }

	    // Trim the new sides of the new root.
	    if (newRoot && newOrigin > oldOrigin) {
	      newRoot = newRoot.removeBefore(owner, newLevel, newOrigin - offsetShift);
	    }
	    if (newRoot && newTailOffset < oldTailOffset) {
	      newRoot = newRoot.removeAfter(
	        owner,
	        newLevel,
	        newTailOffset - offsetShift
	      );
	    }
	    if (offsetShift) {
	      newOrigin -= offsetShift;
	      newCapacity -= offsetShift;
	    }
	  }

	  if (list.__ownerID) {
	    list.size = newCapacity - newOrigin;
	    list._origin = newOrigin;
	    list._capacity = newCapacity;
	    list._level = newLevel;
	    list._root = newRoot;
	    list._tail = newTail;
	    list.__hash = undefined;
	    list.__altered = true;
	    return list;
	  }
	  return makeList(newOrigin, newCapacity, newLevel, newRoot, newTail);
	}

	function getTailOffset(size) {
	  return size < SIZE ? 0 : ((size - 1) >>> SHIFT) << SHIFT;
	}

	var OrderedMap = /*@__PURE__*/(function (Map$$1) {
	  function OrderedMap(value) {
	    return value === null || value === undefined
	      ? emptyOrderedMap()
	      : isOrderedMap(value)
	        ? value
	        : emptyOrderedMap().withMutations(function (map) {
	            var iter = KeyedCollection(value);
	            assertNotInfinite(iter.size);
	            iter.forEach(function (v, k) { return map.set(k, v); });
	          });
	  }

	  if ( Map$$1 ) OrderedMap.__proto__ = Map$$1;
	  OrderedMap.prototype = Object.create( Map$$1 && Map$$1.prototype );
	  OrderedMap.prototype.constructor = OrderedMap;

	  OrderedMap.of = function of (/*...values*/) {
	    return this(arguments);
	  };

	  OrderedMap.prototype.toString = function toString () {
	    return this.__toString('OrderedMap {', '}');
	  };

	  // @pragma Access

	  OrderedMap.prototype.get = function get (k, notSetValue) {
	    var index = this._map.get(k);
	    return index !== undefined ? this._list.get(index)[1] : notSetValue;
	  };

	  // @pragma Modification

	  OrderedMap.prototype.clear = function clear () {
	    if (this.size === 0) {
	      return this;
	    }
	    if (this.__ownerID) {
	      this.size = 0;
	      this._map.clear();
	      this._list.clear();
	      return this;
	    }
	    return emptyOrderedMap();
	  };

	  OrderedMap.prototype.set = function set (k, v) {
	    return updateOrderedMap(this, k, v);
	  };

	  OrderedMap.prototype.remove = function remove (k) {
	    return updateOrderedMap(this, k, NOT_SET);
	  };

	  OrderedMap.prototype.wasAltered = function wasAltered () {
	    return this._map.wasAltered() || this._list.wasAltered();
	  };

	  OrderedMap.prototype.__iterate = function __iterate (fn, reverse) {
	    var this$1 = this;

	    return this._list.__iterate(
	      function (entry) { return entry && fn(entry[1], entry[0], this$1); },
	      reverse
	    );
	  };

	  OrderedMap.prototype.__iterator = function __iterator (type, reverse) {
	    return this._list.fromEntrySeq().__iterator(type, reverse);
	  };

	  OrderedMap.prototype.__ensureOwner = function __ensureOwner (ownerID) {
	    if (ownerID === this.__ownerID) {
	      return this;
	    }
	    var newMap = this._map.__ensureOwner(ownerID);
	    var newList = this._list.__ensureOwner(ownerID);
	    if (!ownerID) {
	      if (this.size === 0) {
	        return emptyOrderedMap();
	      }
	      this.__ownerID = ownerID;
	      this._map = newMap;
	      this._list = newList;
	      return this;
	    }
	    return makeOrderedMap(newMap, newList, ownerID, this.__hash);
	  };

	  return OrderedMap;
	}(Map));

	OrderedMap.isOrderedMap = isOrderedMap;

	OrderedMap.prototype[IS_ORDERED_SYMBOL] = true;
	OrderedMap.prototype[DELETE] = OrderedMap.prototype.remove;

	function makeOrderedMap(map, list, ownerID, hash) {
	  var omap = Object.create(OrderedMap.prototype);
	  omap.size = map ? map.size : 0;
	  omap._map = map;
	  omap._list = list;
	  omap.__ownerID = ownerID;
	  omap.__hash = hash;
	  return omap;
	}

	var EMPTY_ORDERED_MAP;
	function emptyOrderedMap() {
	  return (
	    EMPTY_ORDERED_MAP ||
	    (EMPTY_ORDERED_MAP = makeOrderedMap(emptyMap(), emptyList()))
	  );
	}

	function updateOrderedMap(omap, k, v) {
	  var map = omap._map;
	  var list = omap._list;
	  var i = map.get(k);
	  var has = i !== undefined;
	  var newMap;
	  var newList;
	  if (v === NOT_SET) {
	    // removed
	    if (!has) {
	      return omap;
	    }
	    if (list.size >= SIZE && list.size >= map.size * 2) {
	      newList = list.filter(function (entry, idx) { return entry !== undefined && i !== idx; });
	      newMap = newList
	        .toKeyedSeq()
	        .map(function (entry) { return entry[0]; })
	        .flip()
	        .toMap();
	      if (omap.__ownerID) {
	        newMap.__ownerID = newList.__ownerID = omap.__ownerID;
	      }
	    } else {
	      newMap = map.remove(k);
	      newList = i === list.size - 1 ? list.pop() : list.set(i, undefined);
	    }
	  } else if (has) {
	    if (v === list.get(i)[1]) {
	      return omap;
	    }
	    newMap = map;
	    newList = list.set(i, [k, v]);
	  } else {
	    newMap = map.set(k, list.size);
	    newList = list.set(list.size, [k, v]);
	  }
	  if (omap.__ownerID) {
	    omap.size = newMap.size;
	    omap._map = newMap;
	    omap._list = newList;
	    omap.__hash = undefined;
	    return omap;
	  }
	  return makeOrderedMap(newMap, newList);
	}

	var IS_STACK_SYMBOL = '@@__IMMUTABLE_STACK__@@';

	function isStack(maybeStack) {
	  return Boolean(maybeStack && maybeStack[IS_STACK_SYMBOL]);
	}

	var Stack = /*@__PURE__*/(function (IndexedCollection$$1) {
	  function Stack(value) {
	    return value === null || value === undefined
	      ? emptyStack()
	      : isStack(value)
	        ? value
	        : emptyStack().pushAll(value);
	  }

	  if ( IndexedCollection$$1 ) Stack.__proto__ = IndexedCollection$$1;
	  Stack.prototype = Object.create( IndexedCollection$$1 && IndexedCollection$$1.prototype );
	  Stack.prototype.constructor = Stack;

	  Stack.of = function of (/*...values*/) {
	    return this(arguments);
	  };

	  Stack.prototype.toString = function toString () {
	    return this.__toString('Stack [', ']');
	  };

	  // @pragma Access

	  Stack.prototype.get = function get (index, notSetValue) {
	    var head = this._head;
	    index = wrapIndex(this, index);
	    while (head && index--) {
	      head = head.next;
	    }
	    return head ? head.value : notSetValue;
	  };

	  Stack.prototype.peek = function peek () {
	    return this._head && this._head.value;
	  };

	  // @pragma Modification

	  Stack.prototype.push = function push (/*...values*/) {
	    var arguments$1 = arguments;

	    if (arguments.length === 0) {
	      return this;
	    }
	    var newSize = this.size + arguments.length;
	    var head = this._head;
	    for (var ii = arguments.length - 1; ii >= 0; ii--) {
	      head = {
	        value: arguments$1[ii],
	        next: head,
	      };
	    }
	    if (this.__ownerID) {
	      this.size = newSize;
	      this._head = head;
	      this.__hash = undefined;
	      this.__altered = true;
	      return this;
	    }
	    return makeStack(newSize, head);
	  };

	  Stack.prototype.pushAll = function pushAll (iter) {
	    iter = IndexedCollection$$1(iter);
	    if (iter.size === 0) {
	      return this;
	    }
	    if (this.size === 0 && isStack(iter)) {
	      return iter;
	    }
	    assertNotInfinite(iter.size);
	    var newSize = this.size;
	    var head = this._head;
	    iter.__iterate(function (value) {
	      newSize++;
	      head = {
	        value: value,
	        next: head,
	      };
	    }, /* reverse */ true);
	    if (this.__ownerID) {
	      this.size = newSize;
	      this._head = head;
	      this.__hash = undefined;
	      this.__altered = true;
	      return this;
	    }
	    return makeStack(newSize, head);
	  };

	  Stack.prototype.pop = function pop () {
	    return this.slice(1);
	  };

	  Stack.prototype.clear = function clear () {
	    if (this.size === 0) {
	      return this;
	    }
	    if (this.__ownerID) {
	      this.size = 0;
	      this._head = undefined;
	      this.__hash = undefined;
	      this.__altered = true;
	      return this;
	    }
	    return emptyStack();
	  };

	  Stack.prototype.slice = function slice (begin, end) {
	    if (wholeSlice(begin, end, this.size)) {
	      return this;
	    }
	    var resolvedBegin = resolveBegin(begin, this.size);
	    var resolvedEnd = resolveEnd(end, this.size);
	    if (resolvedEnd !== this.size) {
	      // super.slice(begin, end);
	      return IndexedCollection$$1.prototype.slice.call(this, begin, end);
	    }
	    var newSize = this.size - resolvedBegin;
	    var head = this._head;
	    while (resolvedBegin--) {
	      head = head.next;
	    }
	    if (this.__ownerID) {
	      this.size = newSize;
	      this._head = head;
	      this.__hash = undefined;
	      this.__altered = true;
	      return this;
	    }
	    return makeStack(newSize, head);
	  };

	  // @pragma Mutability

	  Stack.prototype.__ensureOwner = function __ensureOwner (ownerID) {
	    if (ownerID === this.__ownerID) {
	      return this;
	    }
	    if (!ownerID) {
	      if (this.size === 0) {
	        return emptyStack();
	      }
	      this.__ownerID = ownerID;
	      this.__altered = false;
	      return this;
	    }
	    return makeStack(this.size, this._head, ownerID, this.__hash);
	  };

	  // @pragma Iteration

	  Stack.prototype.__iterate = function __iterate (fn, reverse) {
	    var this$1 = this;

	    if (reverse) {
	      return new ArraySeq(this.toArray()).__iterate(
	        function (v, k) { return fn(v, k, this$1); },
	        reverse
	      );
	    }
	    var iterations = 0;
	    var node = this._head;
	    while (node) {
	      if (fn(node.value, iterations++, this) === false) {
	        break;
	      }
	      node = node.next;
	    }
	    return iterations;
	  };

	  Stack.prototype.__iterator = function __iterator (type, reverse) {
	    if (reverse) {
	      return new ArraySeq(this.toArray()).__iterator(type, reverse);
	    }
	    var iterations = 0;
	    var node = this._head;
	    return new Iterator(function () {
	      if (node) {
	        var value = node.value;
	        node = node.next;
	        return iteratorValue(type, iterations++, value);
	      }
	      return iteratorDone();
	    });
	  };

	  return Stack;
	}(IndexedCollection));

	Stack.isStack = isStack;

	var StackPrototype = Stack.prototype;
	StackPrototype[IS_STACK_SYMBOL] = true;
	StackPrototype.shift = StackPrototype.pop;
	StackPrototype.unshift = StackPrototype.push;
	StackPrototype.unshiftAll = StackPrototype.pushAll;
	StackPrototype.withMutations = withMutations;
	StackPrototype.wasAltered = wasAltered;
	StackPrototype.asImmutable = asImmutable;
	StackPrototype['@@transducer/init'] = StackPrototype.asMutable = asMutable;
	StackPrototype['@@transducer/step'] = function(result, arr) {
	  return result.unshift(arr);
	};
	StackPrototype['@@transducer/result'] = function(obj) {
	  return obj.asImmutable();
	};

	function makeStack(size, head, ownerID, hash) {
	  var map = Object.create(StackPrototype);
	  map.size = size;
	  map._head = head;
	  map.__ownerID = ownerID;
	  map.__hash = hash;
	  map.__altered = false;
	  return map;
	}

	var EMPTY_STACK;
	function emptyStack() {
	  return EMPTY_STACK || (EMPTY_STACK = makeStack(0));
	}

	var IS_SET_SYMBOL = '@@__IMMUTABLE_SET__@@';

	function isSet(maybeSet) {
	  return Boolean(maybeSet && maybeSet[IS_SET_SYMBOL]);
	}

	function isOrderedSet(maybeOrderedSet) {
	  return isSet(maybeOrderedSet) && isOrdered(maybeOrderedSet);
	}

	function deepEqual(a, b) {
	  if (a === b) {
	    return true;
	  }

	  if (
	    !isCollection(b) ||
	    (a.size !== undefined && b.size !== undefined && a.size !== b.size) ||
	    (a.__hash !== undefined &&
	      b.__hash !== undefined &&
	      a.__hash !== b.__hash) ||
	    isKeyed(a) !== isKeyed(b) ||
	    isIndexed(a) !== isIndexed(b) ||
	    isOrdered(a) !== isOrdered(b)
	  ) {
	    return false;
	  }

	  if (a.size === 0 && b.size === 0) {
	    return true;
	  }

	  var notAssociative = !isAssociative(a);

	  if (isOrdered(a)) {
	    var entries = a.entries();
	    return (
	      b.every(function (v, k) {
	        var entry = entries.next().value;
	        return entry && is(entry[1], v) && (notAssociative || is(entry[0], k));
	      }) && entries.next().done
	    );
	  }

	  var flipped = false;

	  if (a.size === undefined) {
	    if (b.size === undefined) {
	      if (typeof a.cacheResult === 'function') {
	        a.cacheResult();
	      }
	    } else {
	      flipped = true;
	      var _ = a;
	      a = b;
	      b = _;
	    }
	  }

	  var allEqual = true;
	  var bSize = b.__iterate(function (v, k) {
	    if (
	      notAssociative
	        ? !a.has(v)
	        : flipped
	          ? !is(v, a.get(k, NOT_SET))
	          : !is(a.get(k, NOT_SET), v)
	    ) {
	      allEqual = false;
	      return false;
	    }
	  });

	  return allEqual && a.size === bSize;
	}

	/**
	 * Contributes additional methods to a constructor
	 */
	function mixin(ctor, methods) {
	  var keyCopier = function (key) {
	    ctor.prototype[key] = methods[key];
	  };
	  Object.keys(methods).forEach(keyCopier);
	  Object.getOwnPropertySymbols &&
	    Object.getOwnPropertySymbols(methods).forEach(keyCopier);
	  return ctor;
	}

	function toJS(value) {
	  if (!value || typeof value !== 'object') {
	    return value;
	  }
	  if (!isCollection(value)) {
	    if (!isDataStructure(value)) {
	      return value;
	    }
	    value = Seq(value);
	  }
	  if (isKeyed(value)) {
	    var result$1 = {};
	    value.__iterate(function (v, k) {
	      result$1[k] = toJS(v);
	    });
	    return result$1;
	  }
	  var result = [];
	  value.__iterate(function (v) {
	    result.push(toJS(v));
	  });
	  return result;
	}

	var Set = /*@__PURE__*/(function (SetCollection$$1) {
	  function Set(value) {
	    return value === null || value === undefined
	      ? emptySet()
	      : isSet(value) && !isOrdered(value)
	        ? value
	        : emptySet().withMutations(function (set) {
	            var iter = SetCollection$$1(value);
	            assertNotInfinite(iter.size);
	            iter.forEach(function (v) { return set.add(v); });
	          });
	  }

	  if ( SetCollection$$1 ) Set.__proto__ = SetCollection$$1;
	  Set.prototype = Object.create( SetCollection$$1 && SetCollection$$1.prototype );
	  Set.prototype.constructor = Set;

	  Set.of = function of (/*...values*/) {
	    return this(arguments);
	  };

	  Set.fromKeys = function fromKeys (value) {
	    return this(KeyedCollection(value).keySeq());
	  };

	  Set.intersect = function intersect (sets) {
	    sets = Collection(sets).toArray();
	    return sets.length
	      ? SetPrototype.intersect.apply(Set(sets.pop()), sets)
	      : emptySet();
	  };

	  Set.union = function union (sets) {
	    sets = Collection(sets).toArray();
	    return sets.length
	      ? SetPrototype.union.apply(Set(sets.pop()), sets)
	      : emptySet();
	  };

	  Set.prototype.toString = function toString () {
	    return this.__toString('Set {', '}');
	  };

	  // @pragma Access

	  Set.prototype.has = function has (value) {
	    return this._map.has(value);
	  };

	  // @pragma Modification

	  Set.prototype.add = function add (value) {
	    return updateSet(this, this._map.set(value, value));
	  };

	  Set.prototype.remove = function remove (value) {
	    return updateSet(this, this._map.remove(value));
	  };

	  Set.prototype.clear = function clear () {
	    return updateSet(this, this._map.clear());
	  };

	  // @pragma Composition

	  Set.prototype.map = function map (mapper, context) {
	    var this$1 = this;

	    var removes = [];
	    var adds = [];
	    this.forEach(function (value) {
	      var mapped = mapper.call(context, value, value, this$1);
	      if (mapped !== value) {
	        removes.push(value);
	        adds.push(mapped);
	      }
	    });
	    return this.withMutations(function (set) {
	      removes.forEach(function (value) { return set.remove(value); });
	      adds.forEach(function (value) { return set.add(value); });
	    });
	  };

	  Set.prototype.union = function union () {
	    var iters = [], len = arguments.length;
	    while ( len-- ) iters[ len ] = arguments[ len ];

	    iters = iters.filter(function (x) { return x.size !== 0; });
	    if (iters.length === 0) {
	      return this;
	    }
	    if (this.size === 0 && !this.__ownerID && iters.length === 1) {
	      return this.constructor(iters[0]);
	    }
	    return this.withMutations(function (set) {
	      for (var ii = 0; ii < iters.length; ii++) {
	        SetCollection$$1(iters[ii]).forEach(function (value) { return set.add(value); });
	      }
	    });
	  };

	  Set.prototype.intersect = function intersect () {
	    var iters = [], len = arguments.length;
	    while ( len-- ) iters[ len ] = arguments[ len ];

	    if (iters.length === 0) {
	      return this;
	    }
	    iters = iters.map(function (iter) { return SetCollection$$1(iter); });
	    var toRemove = [];
	    this.forEach(function (value) {
	      if (!iters.every(function (iter) { return iter.includes(value); })) {
	        toRemove.push(value);
	      }
	    });
	    return this.withMutations(function (set) {
	      toRemove.forEach(function (value) {
	        set.remove(value);
	      });
	    });
	  };

	  Set.prototype.subtract = function subtract () {
	    var iters = [], len = arguments.length;
	    while ( len-- ) iters[ len ] = arguments[ len ];

	    if (iters.length === 0) {
	      return this;
	    }
	    iters = iters.map(function (iter) { return SetCollection$$1(iter); });
	    var toRemove = [];
	    this.forEach(function (value) {
	      if (iters.some(function (iter) { return iter.includes(value); })) {
	        toRemove.push(value);
	      }
	    });
	    return this.withMutations(function (set) {
	      toRemove.forEach(function (value) {
	        set.remove(value);
	      });
	    });
	  };

	  Set.prototype.sort = function sort (comparator) {
	    // Late binding
	    return OrderedSet(sortFactory(this, comparator));
	  };

	  Set.prototype.sortBy = function sortBy (mapper, comparator) {
	    // Late binding
	    return OrderedSet(sortFactory(this, comparator, mapper));
	  };

	  Set.prototype.wasAltered = function wasAltered () {
	    return this._map.wasAltered();
	  };

	  Set.prototype.__iterate = function __iterate (fn, reverse) {
	    var this$1 = this;

	    return this._map.__iterate(function (k) { return fn(k, k, this$1); }, reverse);
	  };

	  Set.prototype.__iterator = function __iterator (type, reverse) {
	    return this._map.__iterator(type, reverse);
	  };

	  Set.prototype.__ensureOwner = function __ensureOwner (ownerID) {
	    if (ownerID === this.__ownerID) {
	      return this;
	    }
	    var newMap = this._map.__ensureOwner(ownerID);
	    if (!ownerID) {
	      if (this.size === 0) {
	        return this.__empty();
	      }
	      this.__ownerID = ownerID;
	      this._map = newMap;
	      return this;
	    }
	    return this.__make(newMap, ownerID);
	  };

	  return Set;
	}(SetCollection));

	Set.isSet = isSet;

	var SetPrototype = Set.prototype;
	SetPrototype[IS_SET_SYMBOL] = true;
	SetPrototype[DELETE] = SetPrototype.remove;
	SetPrototype.merge = SetPrototype.concat = SetPrototype.union;
	SetPrototype.withMutations = withMutations;
	SetPrototype.asImmutable = asImmutable;
	SetPrototype['@@transducer/init'] = SetPrototype.asMutable = asMutable;
	SetPrototype['@@transducer/step'] = function(result, arr) {
	  return result.add(arr);
	};
	SetPrototype['@@transducer/result'] = function(obj) {
	  return obj.asImmutable();
	};

	SetPrototype.__empty = emptySet;
	SetPrototype.__make = makeSet;

	function updateSet(set, newMap) {
	  if (set.__ownerID) {
	    set.size = newMap.size;
	    set._map = newMap;
	    return set;
	  }
	  return newMap === set._map
	    ? set
	    : newMap.size === 0
	      ? set.__empty()
	      : set.__make(newMap);
	}

	function makeSet(map, ownerID) {
	  var set = Object.create(SetPrototype);
	  set.size = map ? map.size : 0;
	  set._map = map;
	  set.__ownerID = ownerID;
	  return set;
	}

	var EMPTY_SET;
	function emptySet() {
	  return EMPTY_SET || (EMPTY_SET = makeSet(emptyMap()));
	}

	/**
	 * Returns a lazy seq of nums from start (inclusive) to end
	 * (exclusive), by step, where start defaults to 0, step to 1, and end to
	 * infinity. When start is equal to end, returns empty list.
	 */
	var Range = /*@__PURE__*/(function (IndexedSeq$$1) {
	  function Range(start, end, step) {
	    if (!(this instanceof Range)) {
	      return new Range(start, end, step);
	    }
	    invariant(step !== 0, 'Cannot step a Range by 0');
	    start = start || 0;
	    if (end === undefined) {
	      end = Infinity;
	    }
	    step = step === undefined ? 1 : Math.abs(step);
	    if (end < start) {
	      step = -step;
	    }
	    this._start = start;
	    this._end = end;
	    this._step = step;
	    this.size = Math.max(0, Math.ceil((end - start) / step - 1) + 1);
	    if (this.size === 0) {
	      if (EMPTY_RANGE) {
	        return EMPTY_RANGE;
	      }
	      EMPTY_RANGE = this;
	    }
	  }

	  if ( IndexedSeq$$1 ) Range.__proto__ = IndexedSeq$$1;
	  Range.prototype = Object.create( IndexedSeq$$1 && IndexedSeq$$1.prototype );
	  Range.prototype.constructor = Range;

	  Range.prototype.toString = function toString () {
	    if (this.size === 0) {
	      return 'Range []';
	    }
	    return (
	      'Range [ ' +
	      this._start +
	      '...' +
	      this._end +
	      (this._step !== 1 ? ' by ' + this._step : '') +
	      ' ]'
	    );
	  };

	  Range.prototype.get = function get (index, notSetValue) {
	    return this.has(index)
	      ? this._start + wrapIndex(this, index) * this._step
	      : notSetValue;
	  };

	  Range.prototype.includes = function includes (searchValue) {
	    var possibleIndex = (searchValue - this._start) / this._step;
	    return (
	      possibleIndex >= 0 &&
	      possibleIndex < this.size &&
	      possibleIndex === Math.floor(possibleIndex)
	    );
	  };

	  Range.prototype.slice = function slice (begin, end) {
	    if (wholeSlice(begin, end, this.size)) {
	      return this;
	    }
	    begin = resolveBegin(begin, this.size);
	    end = resolveEnd(end, this.size);
	    if (end <= begin) {
	      return new Range(0, 0);
	    }
	    return new Range(
	      this.get(begin, this._end),
	      this.get(end, this._end),
	      this._step
	    );
	  };

	  Range.prototype.indexOf = function indexOf (searchValue) {
	    var offsetValue = searchValue - this._start;
	    if (offsetValue % this._step === 0) {
	      var index = offsetValue / this._step;
	      if (index >= 0 && index < this.size) {
	        return index;
	      }
	    }
	    return -1;
	  };

	  Range.prototype.lastIndexOf = function lastIndexOf (searchValue) {
	    return this.indexOf(searchValue);
	  };

	  Range.prototype.__iterate = function __iterate (fn, reverse) {
	    var size = this.size;
	    var step = this._step;
	    var value = reverse ? this._start + (size - 1) * step : this._start;
	    var i = 0;
	    while (i !== size) {
	      if (fn(value, reverse ? size - ++i : i++, this) === false) {
	        break;
	      }
	      value += reverse ? -step : step;
	    }
	    return i;
	  };

	  Range.prototype.__iterator = function __iterator (type, reverse) {
	    var size = this.size;
	    var step = this._step;
	    var value = reverse ? this._start + (size - 1) * step : this._start;
	    var i = 0;
	    return new Iterator(function () {
	      if (i === size) {
	        return iteratorDone();
	      }
	      var v = value;
	      value += reverse ? -step : step;
	      return iteratorValue(type, reverse ? size - ++i : i++, v);
	    });
	  };

	  Range.prototype.equals = function equals (other) {
	    return other instanceof Range
	      ? this._start === other._start &&
	          this._end === other._end &&
	          this._step === other._step
	      : deepEqual(this, other);
	  };

	  return Range;
	}(IndexedSeq));

	var EMPTY_RANGE;

	function getIn(collection, searchKeyPath, notSetValue) {
	  var keyPath = coerceKeyPath(searchKeyPath);
	  var i = 0;
	  while (i !== keyPath.length) {
	    collection = get(collection, keyPath[i++], NOT_SET);
	    if (collection === NOT_SET) {
	      return notSetValue;
	    }
	  }
	  return collection;
	}

	function getIn$1(searchKeyPath, notSetValue) {
	  return getIn(this, searchKeyPath, notSetValue);
	}

	function hasIn(collection, keyPath) {
	  return getIn(collection, keyPath, NOT_SET) !== NOT_SET;
	}

	function hasIn$1(searchKeyPath) {
	  return hasIn(this, searchKeyPath);
	}

	function toObject$1() {
	  assertNotInfinite(this.size);
	  var object = {};
	  this.__iterate(function (v, k) {
	    object[k] = v;
	  });
	  return object;
	}

	// Note: all of these methods are deprecated.
	Collection.isIterable = isCollection;
	Collection.isKeyed = isKeyed;
	Collection.isIndexed = isIndexed;
	Collection.isAssociative = isAssociative;
	Collection.isOrdered = isOrdered;

	Collection.Iterator = Iterator;

	mixin(Collection, {
	  // ### Conversion to other types

	  toArray: function toArray() {
	    assertNotInfinite(this.size);
	    var array = new Array(this.size || 0);
	    var useTuples = isKeyed(this);
	    var i = 0;
	    this.__iterate(function (v, k) {
	      // Keyed collections produce an array of tuples.
	      array[i++] = useTuples ? [k, v] : v;
	    });
	    return array;
	  },

	  toIndexedSeq: function toIndexedSeq() {
	    return new ToIndexedSequence(this);
	  },

	  toJS: function toJS$1() {
	    return toJS(this);
	  },

	  toKeyedSeq: function toKeyedSeq() {
	    return new ToKeyedSequence(this, true);
	  },

	  toMap: function toMap() {
	    // Use Late Binding here to solve the circular dependency.
	    return Map(this.toKeyedSeq());
	  },

	  toObject: toObject$1,

	  toOrderedMap: function toOrderedMap() {
	    // Use Late Binding here to solve the circular dependency.
	    return OrderedMap(this.toKeyedSeq());
	  },

	  toOrderedSet: function toOrderedSet() {
	    // Use Late Binding here to solve the circular dependency.
	    return OrderedSet(isKeyed(this) ? this.valueSeq() : this);
	  },

	  toSet: function toSet() {
	    // Use Late Binding here to solve the circular dependency.
	    return Set(isKeyed(this) ? this.valueSeq() : this);
	  },

	  toSetSeq: function toSetSeq() {
	    return new ToSetSequence(this);
	  },

	  toSeq: function toSeq() {
	    return isIndexed(this)
	      ? this.toIndexedSeq()
	      : isKeyed(this)
	        ? this.toKeyedSeq()
	        : this.toSetSeq();
	  },

	  toStack: function toStack() {
	    // Use Late Binding here to solve the circular dependency.
	    return Stack(isKeyed(this) ? this.valueSeq() : this);
	  },

	  toList: function toList() {
	    // Use Late Binding here to solve the circular dependency.
	    return List(isKeyed(this) ? this.valueSeq() : this);
	  },

	  // ### Common JavaScript methods and properties

	  toString: function toString() {
	    return '[Collection]';
	  },

	  __toString: function __toString(head, tail) {
	    if (this.size === 0) {
	      return head + tail;
	    }
	    return (
	      head +
	      ' ' +
	      this.toSeq()
	        .map(this.__toStringMapper)
	        .join(', ') +
	      ' ' +
	      tail
	    );
	  },

	  // ### ES6 Collection methods (ES6 Array and Map)

	  concat: function concat() {
	    var values = [], len = arguments.length;
	    while ( len-- ) values[ len ] = arguments[ len ];

	    return reify(this, concatFactory(this, values));
	  },

	  includes: function includes(searchValue) {
	    return this.some(function (value) { return is(value, searchValue); });
	  },

	  entries: function entries() {
	    return this.__iterator(ITERATE_ENTRIES);
	  },

	  every: function every(predicate, context) {
	    assertNotInfinite(this.size);
	    var returnValue = true;
	    this.__iterate(function (v, k, c) {
	      if (!predicate.call(context, v, k, c)) {
	        returnValue = false;
	        return false;
	      }
	    });
	    return returnValue;
	  },

	  filter: function filter(predicate, context) {
	    return reify(this, filterFactory(this, predicate, context, true));
	  },

	  find: function find(predicate, context, notSetValue) {
	    var entry = this.findEntry(predicate, context);
	    return entry ? entry[1] : notSetValue;
	  },

	  forEach: function forEach(sideEffect, context) {
	    assertNotInfinite(this.size);
	    return this.__iterate(context ? sideEffect.bind(context) : sideEffect);
	  },

	  join: function join(separator) {
	    assertNotInfinite(this.size);
	    separator = separator !== undefined ? '' + separator : ',';
	    var joined = '';
	    var isFirst = true;
	    this.__iterate(function (v) {
	      isFirst ? (isFirst = false) : (joined += separator);
	      joined += v !== null && v !== undefined ? v.toString() : '';
	    });
	    return joined;
	  },

	  keys: function keys() {
	    return this.__iterator(ITERATE_KEYS);
	  },

	  map: function map(mapper, context) {
	    return reify(this, mapFactory(this, mapper, context));
	  },

	  reduce: function reduce$1(reducer, initialReduction, context) {
	    return reduce(
	      this,
	      reducer,
	      initialReduction,
	      context,
	      arguments.length < 2,
	      false
	    );
	  },

	  reduceRight: function reduceRight(reducer, initialReduction, context) {
	    return reduce(
	      this,
	      reducer,
	      initialReduction,
	      context,
	      arguments.length < 2,
	      true
	    );
	  },

	  reverse: function reverse() {
	    return reify(this, reverseFactory(this, true));
	  },

	  slice: function slice(begin, end) {
	    return reify(this, sliceFactory(this, begin, end, true));
	  },

	  some: function some(predicate, context) {
	    return !this.every(not(predicate), context);
	  },

	  sort: function sort(comparator) {
	    return reify(this, sortFactory(this, comparator));
	  },

	  values: function values() {
	    return this.__iterator(ITERATE_VALUES);
	  },

	  // ### More sequential methods

	  butLast: function butLast() {
	    return this.slice(0, -1);
	  },

	  isEmpty: function isEmpty() {
	    return this.size !== undefined ? this.size === 0 : !this.some(function () { return true; });
	  },

	  count: function count(predicate, context) {
	    return ensureSize(
	      predicate ? this.toSeq().filter(predicate, context) : this
	    );
	  },

	  countBy: function countBy(grouper, context) {
	    return countByFactory(this, grouper, context);
	  },

	  equals: function equals(other) {
	    return deepEqual(this, other);
	  },

	  entrySeq: function entrySeq() {
	    var collection = this;
	    if (collection._cache) {
	      // We cache as an entries array, so we can just return the cache!
	      return new ArraySeq(collection._cache);
	    }
	    var entriesSequence = collection
	      .toSeq()
	      .map(entryMapper)
	      .toIndexedSeq();
	    entriesSequence.fromEntrySeq = function () { return collection.toSeq(); };
	    return entriesSequence;
	  },

	  filterNot: function filterNot(predicate, context) {
	    return this.filter(not(predicate), context);
	  },

	  findEntry: function findEntry(predicate, context, notSetValue) {
	    var found = notSetValue;
	    this.__iterate(function (v, k, c) {
	      if (predicate.call(context, v, k, c)) {
	        found = [k, v];
	        return false;
	      }
	    });
	    return found;
	  },

	  findKey: function findKey(predicate, context) {
	    var entry = this.findEntry(predicate, context);
	    return entry && entry[0];
	  },

	  findLast: function findLast(predicate, context, notSetValue) {
	    return this.toKeyedSeq()
	      .reverse()
	      .find(predicate, context, notSetValue);
	  },

	  findLastEntry: function findLastEntry(predicate, context, notSetValue) {
	    return this.toKeyedSeq()
	      .reverse()
	      .findEntry(predicate, context, notSetValue);
	  },

	  findLastKey: function findLastKey(predicate, context) {
	    return this.toKeyedSeq()
	      .reverse()
	      .findKey(predicate, context);
	  },

	  first: function first(notSetValue) {
	    return this.find(returnTrue, null, notSetValue);
	  },

	  flatMap: function flatMap(mapper, context) {
	    return reify(this, flatMapFactory(this, mapper, context));
	  },

	  flatten: function flatten(depth) {
	    return reify(this, flattenFactory(this, depth, true));
	  },

	  fromEntrySeq: function fromEntrySeq() {
	    return new FromEntriesSequence(this);
	  },

	  get: function get(searchKey, notSetValue) {
	    return this.find(function (_, key) { return is(key, searchKey); }, undefined, notSetValue);
	  },

	  getIn: getIn$1,

	  groupBy: function groupBy(grouper, context) {
	    return groupByFactory(this, grouper, context);
	  },

	  has: function has(searchKey) {
	    return this.get(searchKey, NOT_SET) !== NOT_SET;
	  },

	  hasIn: hasIn$1,

	  isSubset: function isSubset(iter) {
	    iter = typeof iter.includes === 'function' ? iter : Collection(iter);
	    return this.every(function (value) { return iter.includes(value); });
	  },

	  isSuperset: function isSuperset(iter) {
	    iter = typeof iter.isSubset === 'function' ? iter : Collection(iter);
	    return iter.isSubset(this);
	  },

	  keyOf: function keyOf(searchValue) {
	    return this.findKey(function (value) { return is(value, searchValue); });
	  },

	  keySeq: function keySeq() {
	    return this.toSeq()
	      .map(keyMapper)
	      .toIndexedSeq();
	  },

	  last: function last(notSetValue) {
	    return this.toSeq()
	      .reverse()
	      .first(notSetValue);
	  },

	  lastKeyOf: function lastKeyOf(searchValue) {
	    return this.toKeyedSeq()
	      .reverse()
	      .keyOf(searchValue);
	  },

	  max: function max(comparator) {
	    return maxFactory(this, comparator);
	  },

	  maxBy: function maxBy(mapper, comparator) {
	    return maxFactory(this, comparator, mapper);
	  },

	  min: function min(comparator) {
	    return maxFactory(
	      this,
	      comparator ? neg(comparator) : defaultNegComparator
	    );
	  },

	  minBy: function minBy(mapper, comparator) {
	    return maxFactory(
	      this,
	      comparator ? neg(comparator) : defaultNegComparator,
	      mapper
	    );
	  },

	  rest: function rest() {
	    return this.slice(1);
	  },

	  skip: function skip(amount) {
	    return amount === 0 ? this : this.slice(Math.max(0, amount));
	  },

	  skipLast: function skipLast(amount) {
	    return amount === 0 ? this : this.slice(0, -Math.max(0, amount));
	  },

	  skipWhile: function skipWhile(predicate, context) {
	    return reify(this, skipWhileFactory(this, predicate, context, true));
	  },

	  skipUntil: function skipUntil(predicate, context) {
	    return this.skipWhile(not(predicate), context);
	  },

	  sortBy: function sortBy(mapper, comparator) {
	    return reify(this, sortFactory(this, comparator, mapper));
	  },

	  take: function take(amount) {
	    return this.slice(0, Math.max(0, amount));
	  },

	  takeLast: function takeLast(amount) {
	    return this.slice(-Math.max(0, amount));
	  },

	  takeWhile: function takeWhile(predicate, context) {
	    return reify(this, takeWhileFactory(this, predicate, context));
	  },

	  takeUntil: function takeUntil(predicate, context) {
	    return this.takeWhile(not(predicate), context);
	  },

	  update: function update(fn) {
	    return fn(this);
	  },

	  valueSeq: function valueSeq() {
	    return this.toIndexedSeq();
	  },

	  // ### Hashable Object

	  hashCode: function hashCode() {
	    return this.__hash || (this.__hash = hashCollection(this));
	  },

	  // ### Internal

	  // abstract __iterate(fn, reverse)

	  // abstract __iterator(type, reverse)
	});

	var CollectionPrototype = Collection.prototype;
	CollectionPrototype[IS_COLLECTION_SYMBOL] = true;
	CollectionPrototype[ITERATOR_SYMBOL] = CollectionPrototype.values;
	CollectionPrototype.toJSON = CollectionPrototype.toArray;
	CollectionPrototype.__toStringMapper = quoteString;
	CollectionPrototype.inspect = CollectionPrototype.toSource = function() {
	  return this.toString();
	};
	CollectionPrototype.chain = CollectionPrototype.flatMap;
	CollectionPrototype.contains = CollectionPrototype.includes;

	mixin(KeyedCollection, {
	  // ### More sequential methods

	  flip: function flip() {
	    return reify(this, flipFactory(this));
	  },

	  mapEntries: function mapEntries(mapper, context) {
	    var this$1 = this;

	    var iterations = 0;
	    return reify(
	      this,
	      this.toSeq()
	        .map(function (v, k) { return mapper.call(context, [k, v], iterations++, this$1); })
	        .fromEntrySeq()
	    );
	  },

	  mapKeys: function mapKeys(mapper, context) {
	    var this$1 = this;

	    return reify(
	      this,
	      this.toSeq()
	        .flip()
	        .map(function (k, v) { return mapper.call(context, k, v, this$1); })
	        .flip()
	    );
	  },
	});

	var KeyedCollectionPrototype = KeyedCollection.prototype;
	KeyedCollectionPrototype[IS_KEYED_SYMBOL] = true;
	KeyedCollectionPrototype[ITERATOR_SYMBOL] = CollectionPrototype.entries;
	KeyedCollectionPrototype.toJSON = toObject$1;
	KeyedCollectionPrototype.__toStringMapper = function (v, k) { return quoteString(k) + ': ' + quoteString(v); };

	mixin(IndexedCollection, {
	  // ### Conversion to other types

	  toKeyedSeq: function toKeyedSeq() {
	    return new ToKeyedSequence(this, false);
	  },

	  // ### ES6 Collection methods (ES6 Array and Map)

	  filter: function filter(predicate, context) {
	    return reify(this, filterFactory(this, predicate, context, false));
	  },

	  findIndex: function findIndex(predicate, context) {
	    var entry = this.findEntry(predicate, context);
	    return entry ? entry[0] : -1;
	  },

	  indexOf: function indexOf(searchValue) {
	    var key = this.keyOf(searchValue);
	    return key === undefined ? -1 : key;
	  },

	  lastIndexOf: function lastIndexOf(searchValue) {
	    var key = this.lastKeyOf(searchValue);
	    return key === undefined ? -1 : key;
	  },

	  reverse: function reverse() {
	    return reify(this, reverseFactory(this, false));
	  },

	  slice: function slice(begin, end) {
	    return reify(this, sliceFactory(this, begin, end, false));
	  },

	  splice: function splice(index, removeNum /*, ...values*/) {
	    var numArgs = arguments.length;
	    removeNum = Math.max(removeNum || 0, 0);
	    if (numArgs === 0 || (numArgs === 2 && !removeNum)) {
	      return this;
	    }
	    // If index is negative, it should resolve relative to the size of the
	    // collection. However size may be expensive to compute if not cached, so
	    // only call count() if the number is in fact negative.
	    index = resolveBegin(index, index < 0 ? this.count() : this.size);
	    var spliced = this.slice(0, index);
	    return reify(
	      this,
	      numArgs === 1
	        ? spliced
	        : spliced.concat(arrCopy(arguments, 2), this.slice(index + removeNum))
	    );
	  },

	  // ### More collection methods

	  findLastIndex: function findLastIndex(predicate, context) {
	    var entry = this.findLastEntry(predicate, context);
	    return entry ? entry[0] : -1;
	  },

	  first: function first(notSetValue) {
	    return this.get(0, notSetValue);
	  },

	  flatten: function flatten(depth) {
	    return reify(this, flattenFactory(this, depth, false));
	  },

	  get: function get(index, notSetValue) {
	    index = wrapIndex(this, index);
	    return index < 0 ||
	      (this.size === Infinity || (this.size !== undefined && index > this.size))
	      ? notSetValue
	      : this.find(function (_, key) { return key === index; }, undefined, notSetValue);
	  },

	  has: function has(index) {
	    index = wrapIndex(this, index);
	    return (
	      index >= 0 &&
	      (this.size !== undefined
	        ? this.size === Infinity || index < this.size
	        : this.indexOf(index) !== -1)
	    );
	  },

	  interpose: function interpose(separator) {
	    return reify(this, interposeFactory(this, separator));
	  },

	  interleave: function interleave(/*...collections*/) {
	    var collections = [this].concat(arrCopy(arguments));
	    var zipped = zipWithFactory(this.toSeq(), IndexedSeq.of, collections);
	    var interleaved = zipped.flatten(true);
	    if (zipped.size) {
	      interleaved.size = zipped.size * collections.length;
	    }
	    return reify(this, interleaved);
	  },

	  keySeq: function keySeq() {
	    return Range(0, this.size);
	  },

	  last: function last(notSetValue) {
	    return this.get(-1, notSetValue);
	  },

	  skipWhile: function skipWhile(predicate, context) {
	    return reify(this, skipWhileFactory(this, predicate, context, false));
	  },

	  zip: function zip(/*, ...collections */) {
	    var collections = [this].concat(arrCopy(arguments));
	    return reify(this, zipWithFactory(this, defaultZipper, collections));
	  },

	  zipAll: function zipAll(/*, ...collections */) {
	    var collections = [this].concat(arrCopy(arguments));
	    return reify(this, zipWithFactory(this, defaultZipper, collections, true));
	  },

	  zipWith: function zipWith(zipper /*, ...collections */) {
	    var collections = arrCopy(arguments);
	    collections[0] = this;
	    return reify(this, zipWithFactory(this, zipper, collections));
	  },
	});

	var IndexedCollectionPrototype = IndexedCollection.prototype;
	IndexedCollectionPrototype[IS_INDEXED_SYMBOL] = true;
	IndexedCollectionPrototype[IS_ORDERED_SYMBOL] = true;

	mixin(SetCollection, {
	  // ### ES6 Collection methods (ES6 Array and Map)

	  get: function get(value, notSetValue) {
	    return this.has(value) ? value : notSetValue;
	  },

	  includes: function includes(value) {
	    return this.has(value);
	  },

	  // ### More sequential methods

	  keySeq: function keySeq() {
	    return this.valueSeq();
	  },
	});

	SetCollection.prototype.has = CollectionPrototype.includes;
	SetCollection.prototype.contains = SetCollection.prototype.includes;

	// Mixin subclasses

	mixin(KeyedSeq, KeyedCollection.prototype);
	mixin(IndexedSeq, IndexedCollection.prototype);
	mixin(SetSeq, SetCollection.prototype);

	// #pragma Helper functions

	function reduce(collection, reducer, reduction, context, useFirst, reverse) {
	  assertNotInfinite(collection.size);
	  collection.__iterate(function (v, k, c) {
	    if (useFirst) {
	      useFirst = false;
	      reduction = v;
	    } else {
	      reduction = reducer.call(context, reduction, v, k, c);
	    }
	  }, reverse);
	  return reduction;
	}

	function keyMapper(v, k) {
	  return k;
	}

	function entryMapper(v, k) {
	  return [k, v];
	}

	function not(predicate) {
	  return function() {
	    return !predicate.apply(this, arguments);
	  };
	}

	function neg(predicate) {
	  return function() {
	    return -predicate.apply(this, arguments);
	  };
	}

	function defaultZipper() {
	  return arrCopy(arguments);
	}

	function defaultNegComparator(a, b) {
	  return a < b ? 1 : a > b ? -1 : 0;
	}

	function hashCollection(collection) {
	  if (collection.size === Infinity) {
	    return 0;
	  }
	  var ordered = isOrdered(collection);
	  var keyed = isKeyed(collection);
	  var h = ordered ? 1 : 0;
	  var size = collection.__iterate(
	    keyed
	      ? ordered
	        ? function (v, k) {
	            h = (31 * h + hashMerge(hash(v), hash(k))) | 0;
	          }
	        : function (v, k) {
	            h = (h + hashMerge(hash(v), hash(k))) | 0;
	          }
	      : ordered
	        ? function (v) {
	            h = (31 * h + hash(v)) | 0;
	          }
	        : function (v) {
	            h = (h + hash(v)) | 0;
	          }
	  );
	  return murmurHashOfSize(size, h);
	}

	function murmurHashOfSize(size, h) {
	  h = imul(h, 0xcc9e2d51);
	  h = imul((h << 15) | (h >>> -15), 0x1b873593);
	  h = imul((h << 13) | (h >>> -13), 5);
	  h = ((h + 0xe6546b64) | 0) ^ size;
	  h = imul(h ^ (h >>> 16), 0x85ebca6b);
	  h = imul(h ^ (h >>> 13), 0xc2b2ae35);
	  h = smi(h ^ (h >>> 16));
	  return h;
	}

	function hashMerge(a, b) {
	  return (a ^ (b + 0x9e3779b9 + (a << 6) + (a >> 2))) | 0; // int
	}

	var OrderedSet = /*@__PURE__*/(function (Set$$1) {
	  function OrderedSet(value) {
	    return value === null || value === undefined
	      ? emptyOrderedSet()
	      : isOrderedSet(value)
	        ? value
	        : emptyOrderedSet().withMutations(function (set) {
	            var iter = SetCollection(value);
	            assertNotInfinite(iter.size);
	            iter.forEach(function (v) { return set.add(v); });
	          });
	  }

	  if ( Set$$1 ) OrderedSet.__proto__ = Set$$1;
	  OrderedSet.prototype = Object.create( Set$$1 && Set$$1.prototype );
	  OrderedSet.prototype.constructor = OrderedSet;

	  OrderedSet.of = function of (/*...values*/) {
	    return this(arguments);
	  };

	  OrderedSet.fromKeys = function fromKeys (value) {
	    return this(KeyedCollection(value).keySeq());
	  };

	  OrderedSet.prototype.toString = function toString () {
	    return this.__toString('OrderedSet {', '}');
	  };

	  return OrderedSet;
	}(Set));

	OrderedSet.isOrderedSet = isOrderedSet;

	var OrderedSetPrototype = OrderedSet.prototype;
	OrderedSetPrototype[IS_ORDERED_SYMBOL] = true;
	OrderedSetPrototype.zip = IndexedCollectionPrototype.zip;
	OrderedSetPrototype.zipWith = IndexedCollectionPrototype.zipWith;

	OrderedSetPrototype.__empty = emptyOrderedSet;
	OrderedSetPrototype.__make = makeOrderedSet;

	function makeOrderedSet(map, ownerID) {
	  var set = Object.create(OrderedSetPrototype);
	  set.size = map ? map.size : 0;
	  set._map = map;
	  set.__ownerID = ownerID;
	  return set;
	}

	var EMPTY_ORDERED_SET;
	function emptyOrderedSet() {
	  return (
	    EMPTY_ORDERED_SET || (EMPTY_ORDERED_SET = makeOrderedSet(emptyOrderedMap()))
	  );
	}

	var Record = function Record(defaultValues, name) {
	  var hasInitialized;

	  var RecordType = function Record(values) {
	    var this$1 = this;

	    if (values instanceof RecordType) {
	      return values;
	    }
	    if (!(this instanceof RecordType)) {
	      return new RecordType(values);
	    }
	    if (!hasInitialized) {
	      hasInitialized = true;
	      var keys = Object.keys(defaultValues);
	      var indices = (RecordTypePrototype._indices = {});
	      // Deprecated: left to attempt not to break any external code which
	      // relies on a ._name property existing on record instances.
	      // Use Record.getDescriptiveName() instead
	      RecordTypePrototype._name = name;
	      RecordTypePrototype._keys = keys;
	      RecordTypePrototype._defaultValues = defaultValues;
	      for (var i = 0; i < keys.length; i++) {
	        var propName = keys[i];
	        indices[propName] = i;
	        if (RecordTypePrototype[propName]) {
	          /* eslint-disable no-console */
	          typeof console === 'object' &&
	            console.warn &&
	            console.warn(
	              'Cannot define ' +
	                recordName(this) +
	                ' with property "' +
	                propName +
	                '" since that property name is part of the Record API.'
	            );
	          /* eslint-enable no-console */
	        } else {
	          setProp(RecordTypePrototype, propName);
	        }
	      }
	    }
	    this.__ownerID = undefined;
	    this._values = List().withMutations(function (l) {
	      l.setSize(this$1._keys.length);
	      KeyedCollection(values).forEach(function (v, k) {
	        l.set(this$1._indices[k], v === this$1._defaultValues[k] ? undefined : v);
	      });
	    });
	  };

	  var RecordTypePrototype = (RecordType.prototype = Object.create(
	    RecordPrototype
	  ));
	  RecordTypePrototype.constructor = RecordType;

	  if (name) {
	    RecordType.displayName = name;
	  }

	  return RecordType;
	};

	Record.prototype.toString = function toString () {
	  var str = recordName(this) + ' { ';
	  var keys = this._keys;
	  var k;
	  for (var i = 0, l = keys.length; i !== l; i++) {
	    k = keys[i];
	    str += (i ? ', ' : '') + k + ': ' + quoteString(this.get(k));
	  }
	  return str + ' }';
	};

	Record.prototype.equals = function equals (other) {
	  return (
	    this === other ||
	    (other &&
	      this._keys === other._keys &&
	      recordSeq(this).equals(recordSeq(other)))
	  );
	};

	Record.prototype.hashCode = function hashCode () {
	  return recordSeq(this).hashCode();
	};

	// @pragma Access

	Record.prototype.has = function has (k) {
	  return this._indices.hasOwnProperty(k);
	};

	Record.prototype.get = function get (k, notSetValue) {
	  if (!this.has(k)) {
	    return notSetValue;
	  }
	  var index = this._indices[k];
	  var value = this._values.get(index);
	  return value === undefined ? this._defaultValues[k] : value;
	};

	// @pragma Modification

	Record.prototype.set = function set (k, v) {
	  if (this.has(k)) {
	    var newValues = this._values.set(
	      this._indices[k],
	      v === this._defaultValues[k] ? undefined : v
	    );
	    if (newValues !== this._values && !this.__ownerID) {
	      return makeRecord(this, newValues);
	    }
	  }
	  return this;
	};

	Record.prototype.remove = function remove (k) {
	  return this.set(k);
	};

	Record.prototype.clear = function clear () {
	  var newValues = this._values.clear().setSize(this._keys.length);
	  return this.__ownerID ? this : makeRecord(this, newValues);
	};

	Record.prototype.wasAltered = function wasAltered () {
	  return this._values.wasAltered();
	};

	Record.prototype.toSeq = function toSeq () {
	  return recordSeq(this);
	};

	Record.prototype.toJS = function toJS$1 () {
	  return toJS(this);
	};

	Record.prototype.entries = function entries () {
	  return this.__iterator(ITERATE_ENTRIES);
	};

	Record.prototype.__iterator = function __iterator (type, reverse) {
	  return recordSeq(this).__iterator(type, reverse);
	};

	Record.prototype.__iterate = function __iterate (fn, reverse) {
	  return recordSeq(this).__iterate(fn, reverse);
	};

	Record.prototype.__ensureOwner = function __ensureOwner (ownerID) {
	  if (ownerID === this.__ownerID) {
	    return this;
	  }
	  var newValues = this._values.__ensureOwner(ownerID);
	  if (!ownerID) {
	    this.__ownerID = ownerID;
	    this._values = newValues;
	    return this;
	  }
	  return makeRecord(this, newValues, ownerID);
	};

	Record.isRecord = isRecord;
	Record.getDescriptiveName = recordName;
	var RecordPrototype = Record.prototype;
	RecordPrototype[IS_RECORD_SYMBOL] = true;
	RecordPrototype[DELETE] = RecordPrototype.remove;
	RecordPrototype.deleteIn = RecordPrototype.removeIn = deleteIn;
	RecordPrototype.getIn = getIn$1;
	RecordPrototype.hasIn = CollectionPrototype.hasIn;
	RecordPrototype.merge = merge;
	RecordPrototype.mergeWith = mergeWith;
	RecordPrototype.mergeIn = mergeIn;
	RecordPrototype.mergeDeep = mergeDeep$1;
	RecordPrototype.mergeDeepWith = mergeDeepWith$1;
	RecordPrototype.mergeDeepIn = mergeDeepIn;
	RecordPrototype.setIn = setIn$1;
	RecordPrototype.update = update$1;
	RecordPrototype.updateIn = updateIn$1;
	RecordPrototype.withMutations = withMutations;
	RecordPrototype.asMutable = asMutable;
	RecordPrototype.asImmutable = asImmutable;
	RecordPrototype[ITERATOR_SYMBOL] = RecordPrototype.entries;
	RecordPrototype.toJSON = RecordPrototype.toObject =
	  CollectionPrototype.toObject;
	RecordPrototype.inspect = RecordPrototype.toSource = function() {
	  return this.toString();
	};

	function makeRecord(likeRecord, values, ownerID) {
	  var record = Object.create(Object.getPrototypeOf(likeRecord));
	  record._values = values;
	  record.__ownerID = ownerID;
	  return record;
	}

	function recordName(record) {
	  return record.constructor.displayName || record.constructor.name || 'Record';
	}

	function recordSeq(record) {
	  return keyedSeqFromValue(record._keys.map(function (k) { return [k, record.get(k)]; }));
	}

	function setProp(prototype, name) {
	  try {
	    Object.defineProperty(prototype, name, {
	      get: function() {
	        return this.get(name);
	      },
	      set: function(value) {
	        invariant(this.__ownerID, 'Cannot set on an immutable record.');
	        this.set(name, value);
	      },
	    });
	  } catch (error) {
	    // Object.defineProperty failed. Probably IE8.
	  }
	}

	var noop = function noop() {};

	var getTreeList = function getTreeList(url, param, content, jsonp) {
	  if (content === void 0) {
	    content = "";
	  }

	  if (jsonp === void 0) {
	    jsonp = false;
	  }

	  return request(url, {
	    method: 'POST',
	    data: param
	  });
	}; // data:this.treeData,树的所有节点，curKey:正在操作的节点的key值，
	// child:1.request请求得到的该key下的子节点，或者缓存中该key下的子节点


	var clearChild = function clearChild(data, curKey, child) {
	  data.map(function (item) {
	    if (curKey == item.id) {
	      item.children = child;
	    } else if (item.children) {
	      clearChild(item.children, curKey, child);
	    }
	  });
	  return data;
	};

	var propTypes$1 = {
	  checkedArray: propTypes.array,
	  //  指定已选择数据id
	  param: propTypes.object,
	  lazyModal: propTypes.bool,
	  lazyParam: propTypes.array,
	  // 20190127懒加载需要多传参数，暂时不对外暴露
	  onCancel: propTypes.func,
	  onSave: propTypes.func,
	  value: propTypes.string,
	  matchUrl: propTypes.string,
	  jsonp: propTypes.object,
	  headers: propTypes.object,
	  onMatchInitValue: propTypes.func,
	  //匹配已选中值的回调
	  refModelUrl: propTypes.object,
	  onAfterAjax: propTypes.func //请求完数据的回调，暂不需要

	};
	var defaultProps = {
	  checkStrictly: false,
	  checkedArray: [],
	  //  指定已选择数据id
	  lazyModal: false,
	  lazyParam: [],
	  // 20190127懒加载需要多传参数，暂时不对外暴露
	  param: {
	    refCode: ''
	  },
	  onCancel: noop,
	  onSave: noop,
	  value: ''
	};

	var Tree =
	/*#__PURE__*/
	function (_Component) {
	  inheritsLoose(Tree, _Component);

	  function Tree(props) {
	    var _this$state;

	    var _this;

	    _this = _Component.call(this, props) || this;

	    _this.initComponent = function () {
	      var _this$props = _this.props,
	          matchUrl = _this$props.matchUrl,
	          param = _this$props.param,
	          value = _this$props.value,
	          jsonp = _this$props.jsonp,
	          headers = _this$props.headers,
	          checkedArray = _this$props.checkedArray,
	          onMatchInitValue = _this$props.onMatchInitValue,
	          valueField = _this$props.valueField,
	          displayField = _this$props.displayField;

	      _this.getRefTreeData(); //当有已选值，不做校验，即二次打开弹出层不做校验


	      var valueMap = refValParse(value, valueField, displayField);
	      if (checkedArray.length != 0 || !valueMap[valueField]) return;

	      if (matchUrl) {
	        request(matchUrl, {
	          method: 'post',
	          data: _extends_1({}, param, {
	            refCode: param.refCode,
	            pk_val: valueMap[valueField].split(',') || ''
	          })
	        }).then(function (response) {
	          var _ref = response || {},
	              _ref$data = _ref.data,
	              data = _ref$data === void 0 ? [] : _ref$data;

	          if (Object.prototype.toString.call(onMatchInitValue) === '[object Function]') {
	            onMatchInitValue(data);
	          }

	          _this.setState({
	            checkedArray: data,
	            showLoading: false,
	            checkedKeys: data.map(function (item) {
	              return item[valueField];
	            })
	          });
	        }).catch(function () {
	          _this.setState({
	            checkedArray: [],
	            showLoading: false,
	            checkedKeys: []
	          });
	        });
	      } else {
	        //当时不使用 matchUrl 做校验时，直接使用默认数护具标记选项，但数据完整性会变弱。
	        _this.setState({
	          checkedArray: [valueMap],
	          selectedArray: [valueMap],
	          showLoading: false,
	          checkedKeys: valueMap[valueField].split(',')
	        });
	      }
	    };

	    _this.onLoadData = function (treeNode) {
	      return new Promise(function (resolve) {
	        _this.getRefTreeloadData(treeNode.props.eventKey, treeNode.props.attr);

	        resolve();
	      });
	    };

	    var _checkedArray = props.checkedArray,
	        _valueField = props.valueField;
	    _this.state = (_this$state = {
	      showLoading: false,
	      selectedArray: _checkedArray || [],
	      //  记录保存的选择项，这个值已于checkedKeys合并
	      checkedKeys: _checkedArray.map(function (item) {
	        return item[_valueField];
	      }),
	      expandedKeys: [],
	      onSaveCheckItems: [],
	      isAfterAjax: false
	    }, _this$state["showLoading"] = false, _this$state);
	    _this.treeData = [];
	    _this.treeDataCache = {};
	    return _this;
	  }

	  var _proto = Tree.prototype;

	  _proto.shouldComponentUpdate = function shouldComponentUpdate(nextProps, nextState) {
	    return !is(nextState, this.state) || nextProps.showModal !== this.props.showModal;
	  };

	  _proto.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
	    var _this2 = this;

	    var strictMode = nextProps.strictMode,
	        checkedArray = nextProps.checkedArray,
	        valueField = nextProps.valueField; //严格模式下每次打开必须重置数据

	    if (nextProps.showModal && !this.props.showModal) {
	      //正在打开弹窗
	      if (strictMode || !this.treeData.length) {
	        //开启严格模式 
	        this.setState({
	          showLoading: true
	        }, function () {
	          _this2.initComponent();
	        });
	      } //20190124因為不再走constructor，导致checkedKeys和selectedArray不一致


	      if (checkedArray.length > 0) {
	        this.setState({
	          selectedArray: checkedArray || [],
	          //  记录保存的选择项
	          checkedKeys: checkedArray.map(function (item) {
	            return item[valueField];
	          })
	        });
	      }
	    }
	  };

	  //   获取树组件数据
	  _proto.getRefTreeData = function getRefTreeData(value) {
	    var _this3 = this;

	    var _this$props2 = this.props,
	        param = _this$props2.param,
	        refModelUrl = _this$props2.refModelUrl,
	        lazyModal = _this$props2.lazyModal,
	        onAfterAjax = _this$props2.onAfterAjax,
	        jsonp = _this$props2.jsonp;
	    var URL = refModelUrl.treeUrl;
	    param = Object.assign(param, {
	      treeNode: "",
	      treeloadData: lazyModal
	    });
	    getTreeList(URL, param, value, jsonp).then(function (res) {
	      if (onAfterAjax && !_this3.state.isAfterAjax) {
	        onAfterAjax(res);

	        _this3.setState({
	          isAfterAjax: true
	        });
	      }

	      var _res$data$data = res.data.data,
	          data = _res$data$data === void 0 ? [] : _res$data$data;

	      if (data && data.length > 0) {
	        if (lazyModal) {
	          data = data.map(function (item) {
	            delete item.children;
	            return item;
	          });
	        }

	        _this3.treeData = data;

	        _this3.setState({
	          showLoading: false
	        });

	        if (data[0].id) {
	          _this3.setState({
	            expandedKeys: [data[0].id]
	          });
	        }
	      } else {
	        _this3.treeData = [];

	        _this3.setState({
	          showLoading: false
	        });
	      }
	    }).catch(function () {
	      _this3.treeData = [];

	      _this3.setState({
	        showLoading: false
	      });
	    });
	  };

	  /**
	   * 懒加载
	   * @param {选择的节点} treeNode 
	   */
	  _proto.getRefTreeloadData = function getRefTreeloadData(treeNode, treeNodeAttr) {
	    var _this4 = this;

	    var _this$props3 = this.props,
	        param = _this$props3.param,
	        refModelUrl = _this$props3.refModelUrl,
	        lazyModal = _this$props3.lazyModal,
	        tabData = _this$props3.tabData,
	        jsonp = _this$props3.jsonp,
	        lazyParam = _this$props3.lazyParam;
	    var URL = refModelUrl.treeUrl;

	    if (this.treeDataCache[treeNode]) {
	      this.treeData = clearChild(this.treeData, treeNode, this.treeDataCache[treeNode]);
	      this.setState({
	        showLoading: false
	      });
	      return;
	    } //lazyModal 懒加载模式,懒加载的参数传递与其他的不一样
	    // 两种情况，单树只需要一个参数，组合树需要多个参数


	    if (!lazyParam.length) {
	      param = Object.assign(param, {
	        treeNode: treeNode,
	        treeloadData: lazyModal
	      });
	    } else {
	      var treeNodeVal = {};
	      treeNodeVal['refpk'] = treeNode;
	      lazyParam.forEach(function (key) {
	        treeNodeVal[key] = treeNodeAttr[key];
	      });
	      param = Object.assign(param, {
	        treeNode: JSON.stringify(treeNodeVal),
	        treeloadData: lazyModal
	      });
	    }

	    this.setState({
	      showLoading: true
	    });
	    getTreeList(URL, param, "", jsonp).then(function (res) {
	      if (res) {
	        var _res$data = res.data,
	            data = _res$data === void 0 ? [] : _res$data;
	        _this4.treeDataCache[treeNode] = data;

	        if (data.length !== 0) {
	          _this4.treeData = clearChild(_this4.treeData, treeNode, data);
	        }
	      }

	      _this4.setState({
	        showLoading: false
	      });
	    }).catch(function () {
	      _this4.setState({
	        showLoading: false
	      });
	    });
	  };

	  _proto.render = function render() {
	    var _this$state2 = this.state,
	        showLoading = _this$state2.showLoading,
	        selectedArray = _this$state2.selectedArray,
	        checkedKeys = _this$state2.checkedKeys,
	        expandedKeys = _this$state2.expandedKeys,
	        onSaveCheckItems = _this$state2.onSaveCheckItems;
	    var childrenProps = Object.assign({}, this.props, {
	      treeData: this.treeData,
	      showLoading: showLoading,
	      selectedArray: selectedArray,
	      //  记录保存的选择项
	      checkedKeys: checkedKeys,
	      expandedKeys: expandedKeys,
	      onSaveCheckItems: onSaveCheckItems
	    });
	    return React__default.createElement(RefTreeBaseUI, childrenProps);
	  };

	  return Tree;
	}(React.Component);

	Tree.propTypes = propTypes$1;
	Tree.defaultProps = defaultProps;

	var _dec$2, _class$2, _temp$2;
	var TreeRender = (_dec$2 = miniStore.connect(function (state) {
	  return {
	    form: state.form
	  };
	}), _dec$2(_class$2 = (_temp$2 =
	/*#__PURE__*/
	function (_Component) {
	  inheritsLoose(TreeRender, _Component);

	  function TreeRender(props) {
	    var _this;

	    _this = _Component.call(this, props) || this;

	    _this.onSave = function (item) {
	      console.log('save', item);
	    };

	    _this.onCancel = function () {};

	    return _this;
	  }

	  var _proto = TreeRender.prototype;

	  _proto.render = function render() {
	    var store = this.props.store;
	    var refEntity = store.getState().meta.refEntity;
	    var _refEntity$bMultiSel = refEntity.bMultiSel,
	        bMultiSel = _refEntity$bMultiSel === void 0 ? false : _refEntity$bMultiSel,
	        _refEntity$cCheckFlds = refEntity.cCheckFlds,
	        code = refEntity.code,
	        name = refEntity.name; // const [valueField,displayField] =  cCheckFlds.split(',');

	    var valueField = 'id';
	    var _displayField = 'fullname';
	    console.log(_displayField, valueField);
	    var dataURL = store.getState().dataUrl;
	    var _this$props$form = this.props.form,
	        getFieldError = _this$props$form.getFieldError,
	        getFieldProps = _this$props$form.getFieldProps; // const { cBillName, view } = viewApplication;
	    // const queryParam = getQueryParam('grid',refEntity,viewApplication);
	    // const refModelUrl = {
	    //     tableBodyUrl:dataURL
	    // }

	    var option = {
	      title: name,
	      searchable: true,
	      //默认搜索输入框，没有这个字段
	      multiple: bMultiSel,
	      //refEntity: bMultiSel
	      param: {
	        "refCode": code //refEntity: code

	      },
	      checkStrictly: true,
	      //没有这个字段
	      nodeDisplay: function nodeDisplay(record) {
	        //树节点显示的名字
	        return record[_displayField];
	      },
	      displayField: function displayField(record) {
	        //输入框的名字
	        return record[_displayField];
	      },
	      //显示内容的键
	      valueField: valueField,
	      //真实 value 的键
	      refModelUrl: {
	        treeUrl: dataURL
	      },
	      matchUrl: '',
	      //查找已选中的数据的URL,没有这个字段
	      filterUrl: '',
	      //输入框搜索匹配的URL,没有这个字段
	      lazyModal: false,
	      //是否是懒加载树
	      strictMode: true,
	      //是否调用之前缓存的数据，为true则不重新请求
	      lang: 'zh_CN',
	      defaultExpandAll: false // className:'ref-walsin-modal'

	    };
	    return React__default.createElement(RefWithInput, _extends_1({}, option, getFieldProps('code1', {
	      // initialValue: JSON.stringify({
	      //     code: "org1",
	      //     id: "a4cf0601-51e6-4012-9967-b7a64a4b2d47",
	      //     name: "用友集团",
	      //     refcode: "org1",
	      //     refname: "用友集团",
	      //     refpk: "a4cf0601-51e6-4012-9967-b7a64a4b2d47",
	      // }),
	      rules: [{
	        message: '请输入请选择',
	        pattern: /[^{"refname":"","refpk":""}|{"refpk":"","refname":""}]/
	      }]
	    })), React__default.createElement(Tree, null));
	  };

	  return TreeRender;
	}(React.Component), _temp$2)) || _class$2);

	var _dec$3, _class$3, _temp$3;
	var RefRender = (_dec$3 = miniStore.connect(), _dec$3(_class$3 = (_temp$3 =
	/*#__PURE__*/
	function (_Component) {
	  inheritsLoose(RefRender, _Component);

	  function RefRender() {
	    var _this;

	    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

	    _this.renderComp = function () {
	      var store = _this.props.store;
	      var refEntity = store.getState().meta.refEntity;
	      console.log('refEntity.cTpltype=======', refEntity.cTpltype); // 判断 refEntity 需要的参照模板类型

	      switch (refEntity.cTpltype) {
	        case 'Table':
	          // 简单表格
	          return React__default.createElement(TableRender, null);

	        case 'Tree':
	          return React__default.createElement(TreeRender, null);

	        default:
	          return React__default.createElement("div", null, "\u53C2\u7167\u6E32\u67D3\u7C7B\u578B\u9519\u8BEF");
	      }
	    };

	    return _this;
	  }

	  var _proto = RefRender.prototype;

	  _proto.render = function render() {
	    return React__default.createElement("div", null, this.renderComp());
	  };

	  return RefRender;
	}(React.Component), _temp$3)) || _class$3);

	var UITemplateRender =
	/*#__PURE__*/
	function (_Component) {
	  inheritsLoose(UITemplateRender, _Component);

	  function UITemplateRender(props) {
	    return _Component.call(this, props) || this;
	  }

	  var _proto = UITemplateRender.prototype;

	  _proto.render = function render() {
	    var _this$props = this.props,
	        viewApplication = _this$props.viewApplication,
	        viewmodel = _this$props.viewmodel;
	    console.log(viewApplication);
	    console.log(viewmodel);
	    return React__default.createElement("div", null, "UITemplateRender");
	  };

	  return UITemplateRender;
	}(React.Component);

	var _dec$4, _class$4, _temp$4;
	var RenderEngine = (_dec$4 = miniStore.connect(), _dec$4(_class$4 = (_temp$4 =
	/*#__PURE__*/
	function (_Component) {
	  inheritsLoose(RenderEngine, _Component);

	  function RenderEngine(props) {
	    var _this;

	    _this = _Component.call(this, props) || this;

	    _this.renderComp = function () {
	      // 拿到 store 获得指定的元数据
	      var store = _this.props.store;
	      var refEntity = store.getState().meta.refEntity;
	      console.log('render-engine store : ', store.getState()); // 逻辑说明：
	      // 1、如果有 refEntity，则根据多端协议渲染出不同的参照组件
	      // 2、如果无 refEntity，则该协议描述的为普通的UI模板，按正常流程进行渲染

	      if (Object.keys(refEntity).length) {
	        return React__default.createElement(RefRender, null);
	      } else {
	        return React__default.createElement(UITemplateRender, null);
	      }
	    };

	    return _this;
	  }

	  var _proto = RenderEngine.prototype;

	  _proto.render = function render() {
	    return React__default.createElement("div", null, this.renderComp());
	  };

	  return RenderEngine;
	}(React.Component), _temp$4)) || _class$4);

	function store (props) {
	  return miniStore.create(_extends_1({}, props, {
	    count: 0
	  }));
	}

	var MTLComponent =
	/*#__PURE__*/
	function (_Component) {
	  inheritsLoose(MTLComponent, _Component);

	  function MTLComponent(props) {
	    var _this;

	    _this = _Component.call(this, props) || this;
	    _this.meta = {};

	    _this.handleDynamicView = function (url) {
	      if (url) _this.getMetaDataByCustomURL(url); // 该逻辑暂时无用，用于考虑后续的兼容性。
	      else _this.getMetaDataByBrowserURL();
	    };

	    _this.getMetaDataByBrowserURL =
	    /*#__PURE__*/
	    asyncToGenerator(
	    /*#__PURE__*/
	    regenerator.mark(function _callee() {
	      var pathnameArr, _billtype, _billno, _ref2, data;

	      return regenerator.wrap(function _callee$(_context) {
	        while (1) {
	          switch (_context.prev = _context.next) {
	            case 0:
	              pathnameArr = window.location.pathname.split('/');

	              if (pathnameArr[1] == 'meta') {
	                _billtype = pathnameArr[2];
	                _billno = pathnameArr[3];
	              }

	              _context.next = 4;
	              return getMeta("/meta?billtype=" + billtype + "&billno=" + billno);

	            case 4:
	              _ref2 = _context.sent;
	              data = _ref2.data;

	            case 6:
	            case "end":
	              return _context.stop();
	          }
	        }
	      }, _callee);
	    }));

	    _this.getMetaDataByCustomURL =
	    /*#__PURE__*/
	    function () {
	      var _ref3 = asyncToGenerator(
	      /*#__PURE__*/
	      regenerator.mark(function _callee2(url) {
	        var _ref4, data, isNeedRender;

	        return regenerator.wrap(function _callee2$(_context2) {
	          while (1) {
	            switch (_context2.prev = _context2.next) {
	              case 0:
	                _context2.next = 2;
	                return getMeta(url);

	              case 2:
	                _ref4 = _context2.sent;
	                data = _ref4.data;
	                isNeedRender = _this.state.isNeedRender;

	                if (data.code == 200) {
	                  _this.isRefer(data.data);

	                  _this.setState({
	                    isNeedRender: !isNeedRender
	                  });
	                }

	              case 6:
	              case "end":
	                return _context2.stop();
	            }
	          }
	        }, _callee2);
	      }));

	      return function (_x) {
	        return _ref3.apply(this, arguments);
	      };
	    }();

	    _this.isRefer = function (data) {
	      if (data.refEntity) {
	        var refEntity = data.refEntity,
	            _data$gridMeta = data.gridMeta,
	            gridMeta = _data$gridMeta === void 0 ? {} : _data$gridMeta;
	        _this.meta = {
	          viewmodel: gridMeta.viewmodel,
	          viewApplication: gridMeta.viewApplication,
	          refEntity: refEntity
	        };
	      } else {
	        var viewmodel = data.viewmodel,
	            viewApplication = data.viewApplication;
	        _this.meta = {
	          viewmodel: viewmodel,
	          viewApplication: viewApplication,
	          refEntity: {}
	        };
	      }

	      _this.setState({
	        isLoading: false
	      });
	    };

	    _this.state = {
	      isNeedRender: false,
	      isLoading: true
	    };
	    return _this;
	  }

	  var _proto = MTLComponent.prototype;

	  _proto.componentWillMount = function componentWillMount() {
	    var url = this.props.url || '';
	    this.handleDynamicView(url);
	  }
	  /**
	   * 处理数据协议请求：
	   * 1、如果初始化SDK的时候主动传了数据协议的URL进来，则进行下一步的操作；
	   * 2、如果初始化的时候没有传入URL，而是根据访问URL的规则拼接动态请求来获取数据。
	   * 浏览器URL示例："/meta/:billtype/:billno"
	   */
	  ;

	  _proto.render = function render() {
	    var isLoading = this.state.isLoading;
	    var _this$props = this.props,
	        form = _this$props.form,
	        dataUrl = _this$props.dataUrl;

	    if (isLoading) {
	      return React__default.createElement("p", null, "\u6570\u636E\u8BF7\u6C42\u4E2D...");
	    } else {
	      return React__default.createElement(miniStore.Provider, {
	        store: store({
	          meta: this.meta,
	          form: form,
	          dataUrl: dataUrl
	        })
	      }, React__default.createElement(RenderEngine, null));
	    }
	  };

	  return MTLComponent;
	}(React.Component);

	var MTLCore = {
	  MTLComponent: MTLComponent // MTLModel,

	};
	window.MTLCore = MTLCore;

	exports.MTLComponent = MTLComponent;
	exports.default = MTLCore;

	Object.defineProperty(exports, '__esModule', { value: true });

}));
