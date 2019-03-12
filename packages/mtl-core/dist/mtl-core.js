(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('react'), require('mini-store'), require('axios'), require('tinper-bee'), require('ref-multiple-table-ui')) :
	typeof define === 'function' && define.amd ? define(['react', 'mini-store', 'axios', 'tinper-bee', 'ref-multiple-table-ui'], factory) :
	(global = global || self, global.MTLCore = factory(global.React, global.miniStore, global.axios, global.TinperBee, global.RefMultipleTableBaseUI));
}(this, function (React, miniStore, axios, tinperBee, RefMultipleTableBaseUI) { 'use strict';

	var React__default = 'default' in React ? React['default'] : React;
	axios = axios && axios.hasOwnProperty('default') ? axios['default'] : axios;
	var tinperBee__default = 'default' in tinperBee ? tinperBee['default'] : tinperBee;
	var RefMultipleTableBaseUI__default = 'default' in RefMultipleTableBaseUI ? RefMultipleTableBaseUI['default'] : RefMultipleTableBaseUI;

	function unwrapExports (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x.default : x;
	}

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var runtime = createCommonjsModule(function (module) {
	/**
	 * Copyright (c) 2014-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	!(function(global) {

	  var Op = Object.prototype;
	  var hasOwn = Op.hasOwnProperty;
	  var undefined$1; // More compressible than void 0.
	  var $Symbol = typeof Symbol === "function" ? Symbol : {};
	  var iteratorSymbol = $Symbol.iterator || "@@iterator";
	  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
	  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";
	  var runtime = global.regeneratorRuntime;
	  if (runtime) {
	    {
	      // If regeneratorRuntime is defined globally and we're in a module,
	      // make the exports object identical to regeneratorRuntime.
	      module.exports = runtime;
	    }
	    // Don't bother evaluating the rest of this file if the runtime was
	    // already defined globally.
	    return;
	  }

	  // Define the runtime globally (as expected by generated code) as either
	  // module.exports (if we're in a module) or a new, empty object.
	  runtime = global.regeneratorRuntime = module.exports;

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
	  runtime.wrap = wrap;

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

	  runtime.isGeneratorFunction = function(genFun) {
	    var ctor = typeof genFun === "function" && genFun.constructor;
	    return ctor
	      ? ctor === GeneratorFunction ||
	        // For the native GeneratorFunction constructor, the best we can
	        // do is to check its .name property.
	        (ctor.displayName || ctor.name) === "GeneratorFunction"
	      : false;
	  };

	  runtime.mark = function(genFun) {
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
	  runtime.awrap = function(arg) {
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
	  runtime.AsyncIterator = AsyncIterator;

	  // Note that simple async functions are implemented on top of
	  // AsyncIterator objects; they just return a Promise for the value of
	  // the final result produced by the iterator.
	  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
	    var iter = new AsyncIterator(
	      wrap(innerFn, outerFn, self, tryLocsList)
	    );

	    return runtime.isGeneratorFunction(outerFn)
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
	        if (delegate.iterator.return) {
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

	  runtime.keys = function(object) {
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
	  runtime.values = values;

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
	})(
	  // In sloppy mode, unbound `this` refers to the global object, fallback to
	  // Function constructor if we're in global strict mode. That is sadly a form
	  // of indirect eval which violates Content Security Policy.
	  (function() {
	    return this || (typeof self === "object" && self);
	  })() || Function("return this")()
	);
	});

	/**
	 * Copyright (c) 2014-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	// This method of obtaining a reference to the global object needs to be
	// kept identical to the way it is obtained in runtime.js
	var g = (function() {
	  return this || (typeof self === "object" && self);
	})() || Function("return this")();

	// Use `getOwnPropertyNames` because not all browsers support calling
	// `hasOwnProperty` on the global `self` object in a worker. See #183.
	var hadRuntime = g.regeneratorRuntime &&
	  Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;

	// Save the old regeneratorRuntime in case it needs to be restored later.
	var oldRuntime = hadRuntime && g.regeneratorRuntime;

	// Force reevalutation of runtime.js.
	g.regeneratorRuntime = undefined;

	var runtimeModule = runtime;

	if (hadRuntime) {
	  // Restore the original runtime.
	  g.regeneratorRuntime = oldRuntime;
	} else {
	  // Remove the global property added by runtime.js.
	  try {
	    delete g.regeneratorRuntime;
	  } catch(e) {
	    g.regeneratorRuntime = undefined;
	  }
	}

	var regenerator = runtimeModule;

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

	var refValParse = function refValParse(value) {
	  if (!value) return {
	    refname: '',
	    refpk: ''
	  };

	  try {
	    var valueMap = JSON.parse(value);

	    if (!valueMap.hasOwnProperty('refname') || !valueMap.hasOwnProperty('refpk')) {
	      return {
	        refname: '',
	        refpk: ''
	      };
	    } else {
	      return JSON.parse(value);
	    }
	  } catch (e) {
	    return {
	      refname: '',
	      refpk: ''
	    };
	  }
	};

	var props = {
	  param: {
	    "refCode": "new_bd_staff"
	  },
	  refModelUrl: {
	    tableBodyUrl: '/pap_basedoc/common-ref/blobRefTreeGrid',
	    //表体请求
	    refInfo: '/pap_basedoc/common-ref/refInfo' //表头请求

	  },
	  matchUrl: '/pap_basedoc/common-ref/matchPKRefJSON',
	  filterUrl: '/pap_basedoc/common-ref/filterRefJSON',
	  valueField: "refpk",
	  displayField: "{refname}"
	};

	var Table =
	/*#__PURE__*/
	function (_Component) {
	  inheritsLoose(Table, _Component);

	  //表头数据
	  //表格数据
	  //总页数
	  //每页数据数
	  //激活页码
	  function Table(_props) {
	    var _this2;

	    _this2 = _Component.call(this, _props) || this;
	    _this2.columnsData = [];
	    _this2.tableData = [];
	    _this2.pageCount = 1;
	    _this2.pageSize = '10';
	    _this2.currPageIndex = 1;
	    _this2.fliterFormInputs = [];
	    _this2.filterInfo = {};

	    _this2.initComponent = function () {
	      var value = props.value,
	          onMatchInitValue = props.onMatchInitValue,
	          _props$valueField = props.valueField,
	          valueField = _props$valueField;
	      var requestList = [_this2.getTableHeader(), _this2.getTableData({
	        'refClientPageInfo.currPageIndex': 0,
	        'refClientPageInfo.pageSize': 10
	      })];
	      var valueMap = refValParse(value);

	      if (_this2.checkedArray.length == 0 && valueMap.refpk) {
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

	        if (_this2.onAfterAjax) {
	          _this2.onAfterAjax(bodyData);
	        }

	        if (matchData) {
	          var _matchData$data = matchData.data,
	              data = _matchData$data === void 0 ? [] : _matchData$data;
	          _this2.checkedMap = {};
	          _this2.checkedArray = data.map(function (item) {
	            item.key = item[valueField];
	            item._checked = true;
	            _this2.checkedMap[item.key] = item;
	            return item;
	          });

	          if (Object.prototype.toString.call(onMatchInitValue) === '[object Function]') {
	            onMatchInitValue(data);
	          }

	          _this2.setState({
	            selectedDataLength: _this2.checkedArray.length,
	            mustRender: Math.random()
	          });
	        }

	        _this2.launchTableHeader(columnsData);

	        _this2.launchTableData(bodyData);

	        _this2.setState({
	          showLoading: false
	        });
	      }).catch(function (e) {
	        _this2.launchTableHeader({});

	        _this2.launchTableData({});

	        _this2.setState({
	          showLoading: false
	        });

	        console.error(e);
	      });
	    };

	    _this2.getTableHeader = function () {
	      var data = {
	        "refUIType": "RefTable",
	        "refCode": "new_bd_staff",
	        "defaultFieldCount": 4,
	        "strFieldCode": ["code", "name", "email", "mobile"],
	        "strFieldName": ["人员编码", "人员名称", "人员邮箱", "人员电话"],
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
	      return new Promise(function (resolve, reject) {
	        resolve(data);
	      }); // return request(refModelUrl.refInfo, {
	      //     method: 'get',
	      //     params: param,
	      //     jsonp: jsonp,
	      //     headers
	      // });
	    };

	    _this2.getTableData = function (params) {
	      var data = {
	        "data": [{
	          "rownum_": 1,
	          "code": "001",
	          "name": "人员1",
	          "mobile": "15011430230",
	          "refcode": "001",
	          "refpk": "cc791b77-bd18-49ab-b3ec-ee83cd40012a",
	          "id": "cc791b77-bd18-49ab-b3ec-ee83cd40012a",
	          "refname": "人员1",
	          "email": "11@11.com"
	        }, {
	          "rownum_": 2,
	          "code": "002",
	          "name": "人员2",
	          "mobile": "15011323234",
	          "refcode": "002",
	          "refpk": "de2d4d09-51ec-4108-8def-d6a6c5393c3b",
	          "id": "de2d4d09-51ec-4108-8def-d6a6c5393c3b",
	          "refname": "人员2",
	          "email": "22@11.com"
	        }, {
	          "rownum_": 3,
	          "code": "003",
	          "name": "人员3",
	          "mobile": "15011430232",
	          "refcode": "003",
	          "refpk": "004989bb-a705-45ce-88f3-662f87ee6e52",
	          "id": "004989bb-a705-45ce-88f3-662f87ee6e52",
	          "refname": "人员3",
	          "email": "33@33.com"
	        }, {
	          "rownum_": 4,
	          "code": "004",
	          "name": "人员4",
	          "mobile": "15011430234",
	          "refcode": "004",
	          "refpk": "3570cbde-0d43-49ce-ad53-ab27ee6ee7dd",
	          "id": "3570cbde-0d43-49ce-ad53-ab27ee6ee7dd",
	          "refname": "人员4",
	          "email": "33@34.com"
	        }, {
	          "rownum_": 5,
	          "code": "005",
	          "name": "人员5",
	          "mobile": "15011430235",
	          "refcode": "005",
	          "refpk": "5e3a85ec-5e14-4734-8b3a-1e6168426c89",
	          "id": "5e3a85ec-5e14-4734-8b3a-1e6168426c89",
	          "refname": "人员5",
	          "email": "55@26.com"
	        }, {
	          "rownum_": 6,
	          "code": "006",
	          "name": "人员6",
	          "mobile": "15011323232",
	          "refcode": "006",
	          "refpk": "112621b9-b7ae-41b9-9428-61779334c5d6",
	          "id": "112621b9-b7ae-41b9-9428-61779334c5d6",
	          "refname": "人员6",
	          "email": "66@516.com"
	        }, {
	          "rownum_": 7,
	          "code": "007",
	          "name": "人员7",
	          "mobile": "15011234567",
	          "refcode": "007",
	          "refpk": "394bba90-ed0f-4794-a44e-fd9ce6e9257d",
	          "id": "394bba90-ed0f-4794-a44e-fd9ce6e9257d",
	          "refname": "人员7",
	          "email": "55@4.com"
	        }, {
	          "rownum_": 8,
	          "code": "008",
	          "name": "人员8",
	          "mobile": "15011327890",
	          "refcode": "008",
	          "refpk": "a9f4c869-ca0b-4d12-847e-00eca08bfef6",
	          "id": "a9f4c869-ca0b-4d12-847e-00eca08bfef6",
	          "refname": "人员8",
	          "email": "55@556.com"
	        }, {
	          "rownum_": 9,
	          "code": "bpm01",
	          "name": "张一",
	          "mobile": "18777777777",
	          "refcode": "bpm01",
	          "refpk": "0dc47840-873a-4ed3-8ae7-c2335a76b385",
	          "id": "0dc47840-873a-4ed3-8ae7-c2335a76b385",
	          "refname": "张一",
	          "email": "bpm01@qq.com"
	        }, {
	          "rownum_": 10,
	          "code": "bpm02",
	          "name": "张二",
	          "mobile": "18788888888",
	          "refcode": "bpm02",
	          "refpk": "c97b59e2-9fa3-44d7-93b0-1be52f7aa550",
	          "id": "c97b59e2-9fa3-44d7-93b0-1be52f7aa550",
	          "refname": "张二",
	          "email": "bpm02@qq.com"
	        }],
	        "page": {
	          "pageSize": 10,
	          "currPageIndex": 0,
	          "pageCount": 2,
	          "totalElements": 13
	        },
	        "allpks": null
	      };
	      return new Promise(function (resolve, reject) {
	        resolve(data);
	      }); // return request(refModelUrl.tableBodyUrl, {
	      //     method: 'get',
	      //     params: {
	      //         ...param,
	      //         ...params
	      //     },
	      //     jsonp: jsonp,
	      //     headers
	      // });
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
	      var _props$valueField2 = props.valueField,
	          valueField = _props$valueField2;
	      var _response$data = response.data,
	          data = _response$data === void 0 ? [] : _response$data,
	          _response$page = response.page,
	          page = _response$page === void 0 ? {} : _response$page;
	      data.map(function (record, k) {
	        record.key = record[valueField];
	        return record;
	      });
	      _this2.tableData = data;
	      _this2.pageCount = page.pageCount || 0;
	      _this2.currPageIndex = page.currPageIndex + 1 || 0;
	      _this2.totalElements = page.totalElements || 0;
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

	      var param = props.param;
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

	      Object.keys(filterInfo).forEach(function (key) {
	        if (!filterInfo[key]) {
	          delete filterInfo[key];
	        }
	      });
	      var param = {
	        'refClientPageInfo.currPageIndex': index - 1,
	        'refClientPageInfo.pageSize': _this2.pageSize
	      };

	      if (Object.keys(filterInfo) > 0) {
	        param.content = JSON.stringify(filterInfo);
	      }

	      _this2.loadTableData(param);
	    };

	    _this2.dataNumSelect = function (index, pageSize) {
	      var _assertThisInitialize2 = assertThisInitialized(_this2),
	          filterInfo = _assertThisInitialize2.filterInfo;

	      Object.keys(filterInfo).forEach(function (key) {
	        if (!filterInfo[key]) {
	          delete filterInfo[key];
	        }
	      });
	      var param = {
	        'refClientPageInfo.currPageIndex': _this2.currPageIndex - 1,
	        'refClientPageInfo.pageSize': pageSize
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
	      emptyBut: true
	    });
	    console.log(columnsData, tableData); // return (<div style={this.props.showModal?{display:'block'}:{display:'none'}}>12</div>)

	    return React__default.createElement(RefMultipleTableBaseUI__default, childrenProps);
	  };

	  return Table;
	}(React.Component);

	var TableRender =
	/*#__PURE__*/
	function (_Component) {
	  inheritsLoose(TableRender, _Component);

	  function TableRender() {
	    var _this;

	    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

	    _this.onSave = function (item) {
	      console.log('save', item);
	    };

	    _this.onCancel = function () {};

	    return _this;
	  }

	  var _proto = TableRender.prototype;

	  _proto.render = function render() {
	    var _this$props$form = this.props.form,
	        getFieldError = _this$props$form.getFieldError,
	        getFieldProps = _this$props$form.getFieldProps;
	    console.log(this.props);
	    var _this$props$viewAppli = this.props.viewApplication,
	        cBillName = _this$props$viewAppli.cBillName,
	        view = _this$props$viewAppli.view;
	    var props = {
	      placeholder: cBillName,
	      title: view.cTemplateTitle,
	      backdrop: true,
	      disabled: false,
	      multiple: true,
	      strictMode: true,
	      miniSearch: false
	    };
	    return React__default.createElement("div", null, React__default.createElement(RefWithInput, _extends_1({}, props, {
	      onSave: this.onSave,
	      onCancel: this.onCancel
	    }, getFieldProps('valueField', {
	      // initialValue:'{\"refname\":\"高级-T3\",\"refpk\":\"level5\"}',
	      rules: [{
	        message: '请输入姓名',
	        pattern: /[^{"refname":"","refpk":""}]/
	      }]
	    })), React__default.createElement(Table, null)));
	  };

	  return TableRender;
	}(React.Component);

	var TableRender$1 = tinperBee.Form.createForm()(TableRender);

	var RefRender =
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
	      var _this$props = _this.props,
	          refEntity = _this$props.refEntity,
	          viewApplication = _this$props.viewApplication,
	          viewmodel = _this$props.viewmodel; // 判断 refEntity 需要的参照模板类型

	      switch (refEntity.cTpltype) {
	        case 'Table':
	          // 简单表格
	          return React__default.createElement(TableRender$1, {
	            refEntity: refEntity,
	            viewApplication: viewApplication,
	            viewmodel: viewmodel
	          });

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
	}(React.Component);

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

	var _dec, _class, _temp;
	var RenderEngine = (_dec = miniStore.connect(), _dec(_class = (_temp =
	/*#__PURE__*/
	function (_Component) {
	  inheritsLoose(RenderEngine, _Component);

	  function RenderEngine(props) {
	    var _this;

	    _this = _Component.call(this, props) || this;

	    _this.renderComp = function () {
	      var _this$props$meta = _this.props.meta,
	          _this$props$meta$refE = _this$props$meta.refEntity,
	          refEntity = _this$props$meta$refE === void 0 ? {} : _this$props$meta$refE,
	          _this$props$meta$view = _this$props$meta.viewApplication,
	          viewApplication = _this$props$meta$view === void 0 ? {} : _this$props$meta$view,
	          _this$props$meta$view2 = _this$props$meta.viewmodel,
	          viewmodel = _this$props$meta$view2 === void 0 ? {} : _this$props$meta$view2; // console.log(refEntity,viewApplication);
	      // 逻辑说明：
	      // 1、如果有 refEntity，则根据多端协议渲染出不同的参照组件
	      // 2、如果无 refEntity，则该协议描述的为普通的UI模板，按正常流程进行渲染

	      if (Object.keys(refEntity).length) {
	        return React__default.createElement(RefRender, {
	          refEntity: refEntity,
	          viewApplication: viewApplication,
	          viewmodel: viewmodel
	        });
	      } else {
	        return React__default.createElement(UITemplateRender, {
	          viewApplication: viewApplication,
	          viewmodel: viewmodel
	        });
	      }
	    };

	    return _this;
	  }

	  var _proto = RenderEngine.prototype;

	  _proto.render = function render() {
	    return React__default.createElement("div", null, this.renderComp());
	  };

	  return RenderEngine;
	}(React.Component), _temp)) || _class);

	var store = miniStore.create({
	  count: 0
	});

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
	            gridMeta = data.gridMeta;
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

	    if (isLoading) {
	      return React__default.createElement("p", null, "\u6570\u636E\u8BF7\u6C42\u4E2D...");
	    } else {
	      return React__default.createElement(miniStore.Provider, {
	        store: store
	      }, React__default.createElement(RenderEngine, {
	        meta: this.meta
	      }));
	    }
	  };

	  return MTLComponent;
	}(React.Component);

	var MTLCore = {
	  MTLComponent: MTLComponent // MTLModel,

	};
	window.MTLCore = MTLCore;

	return MTLCore;

}));
