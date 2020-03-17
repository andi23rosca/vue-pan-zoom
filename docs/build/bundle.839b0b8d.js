/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"main": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// script path function
/******/ 	function jsonpScriptSrc(chunkId) {
/******/ 		return __webpack_require__.p + "build/" + ({"compiler":"compiler"}[chunkId]||chunkId) + "." + {"compiler":"d4ff23ac"}[chunkId] + ".js"
/******/ 	}
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId) {
/******/ 		var promises = [];
/******/
/******/
/******/ 		// JSONP chunk loading for javascript
/******/
/******/ 		var installedChunkData = installedChunks[chunkId];
/******/ 		if(installedChunkData !== 0) { // 0 means "already installed".
/******/
/******/ 			// a Promise means "currently loading".
/******/ 			if(installedChunkData) {
/******/ 				promises.push(installedChunkData[2]);
/******/ 			} else {
/******/ 				// setup Promise in chunk cache
/******/ 				var promise = new Promise(function(resolve, reject) {
/******/ 					installedChunkData = installedChunks[chunkId] = [resolve, reject];
/******/ 				});
/******/ 				promises.push(installedChunkData[2] = promise);
/******/
/******/ 				// start chunk loading
/******/ 				var script = document.createElement('script');
/******/ 				var onScriptComplete;
/******/
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.src = jsonpScriptSrc(chunkId);
/******/
/******/ 				// create error before stack unwound to get useful stacktrace later
/******/ 				var error = new Error();
/******/ 				onScriptComplete = function (event) {
/******/ 					// avoid mem leaks in IE.
/******/ 					script.onerror = script.onload = null;
/******/ 					clearTimeout(timeout);
/******/ 					var chunk = installedChunks[chunkId];
/******/ 					if(chunk !== 0) {
/******/ 						if(chunk) {
/******/ 							var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 							var realSrc = event && event.target && event.target.src;
/******/ 							error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 							error.name = 'ChunkLoadError';
/******/ 							error.type = errorType;
/******/ 							error.request = realSrc;
/******/ 							chunk[1](error);
/******/ 						}
/******/ 						installedChunks[chunkId] = undefined;
/******/ 					}
/******/ 				};
/******/ 				var timeout = setTimeout(function(){
/******/ 					onScriptComplete({ type: 'timeout', target: script });
/******/ 				}, 120000);
/******/ 				script.onerror = script.onload = onScriptComplete;
/******/ 				document.head.appendChild(script);
/******/ 			}
/******/ 		}
/******/ 		return Promise.all(promises);
/******/ 	};
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// on error function for async loading
/******/ 	__webpack_require__.oe = function(err) { console.error(err); throw err; };
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push([0,"chunk-vendors"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/ts-loader/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/PanZoom.vue?vue&type=script&lang=ts&":
/*!****************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js??ref--15-0!./node_modules/babel-loader/lib!./node_modules/ts-loader??ref--15-2!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/PanZoom.vue?vue&type=script&lang=ts& ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var core_js_modules_es_number_constructor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.number.constructor */ \"./node_modules/core-js/modules/es.number.constructor.js\");\n/* harmony import */ var core_js_modules_es_number_constructor__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_number_constructor__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue */ \"./node_modules/vue/dist/vue.esm.js\");\n/* harmony import */ var _utils_panZoom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/panZoom */ \"./src/utils/panZoom.ts\");\n\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (vue__WEBPACK_IMPORTED_MODULE_1__[\"default\"].extend({\n  props: {\n    /**\r\n     * The maximum zooming amount\r\n     */\n    maxZoom: {\n      type: Number,\n      default: 5\n    },\n\n    /**\r\n     * The minimum zooming amount\r\n     */\n    minZoom: {\n      type: Number,\n      default: 0.2\n    },\n\n    /**\r\n     * How much to zoom in/out when using the mouse wheel\r\n     */\n    zoomStep: {\n      type: Number,\n      default: 0.2\n    }\n  },\n  data: function data() {\n    return {\n      transform: \"\"\n    };\n  },\n  mounted: function mounted() {\n    Object(_utils_panZoom__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(this.$refs.container, this.$refs.content, this.minZoom, this.maxZoom, this.zoomStep);\n  }\n}));\n\n//# sourceURL=webpack:///./src/components/PanZoom.vue?./node_modules/cache-loader/dist/cjs.js??ref--15-0!./node_modules/babel-loader/lib!./node_modules/ts-loader??ref--15-2!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"1022bbd0-vue-loader-template\"}!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/PanZoom.vue?vue&type=template&id=37b65c10&scoped=true&":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"1022bbd0-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/PanZoom.vue?vue&type=template&id=37b65c10&scoped=true& ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return render; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return staticRenderFns; });\nvar render = function() {\n  var _vm = this\n  var _h = _vm.$createElement\n  var _c = _vm._self._c || _h\n  return _c(\"div\", { ref: \"container\", staticClass: \"container\" }, [\n    _c(\n      \"div\",\n      { ref: \"content\", style: \"transform: \" + _vm.transform + \";\" },\n      [_vm._t(\"default\")],\n      2\n    )\n  ])\n}\nvar staticRenderFns = []\nrender._withStripped = true\n\n\n\n//# sourceURL=webpack:///./src/components/PanZoom.vue?./node_modules/cache-loader/dist/cjs.js?%7B%22cacheDirectory%22:%22node_modules/.cache/vue-loader%22,%22cacheIdentifier%22:%221022bbd0-vue-loader-template%22%7D!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/PanZoom.vue?vue&type=style&index=0&id=37b65c10&scoped=true&lang=css&":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ref--7-oneOf-1-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--7-oneOf-1-2!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/PanZoom.vue?vue&type=style&index=0&id=37b65c10&scoped=true&lang=css& ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// Imports\nvar ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\nexports = ___CSS_LOADER_API_IMPORT___(false);\n// Module\nexports.push([module.i, \"\\n.container[data-v-37b65c10] {\\r\\n  width: 100%;\\r\\n  height: 100%;\\r\\n  position: relative;\\r\\n  overflow: hidden;\\r\\n  -webkit-user-select: none;\\r\\n     -moz-user-select: none;\\r\\n      -ms-user-select: none;\\r\\n          user-select: none;\\r\\n  -ms-touch-action: none;\\r\\n      touch-action: none;\\n}\\r\\n\", \"\"]);\n// Exports\nmodule.exports = exports;\n\n\n//# sourceURL=webpack:///./src/components/PanZoom.vue?./node_modules/css-loader/dist/cjs.js??ref--7-oneOf-1-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--7-oneOf-1-2!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js?!./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/PanZoom.vue?vue&type=style&index=0&id=37b65c10&scoped=true&lang=css&":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-style-loader??ref--7-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--7-oneOf-1-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--7-oneOf-1-2!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/PanZoom.vue?vue&type=style&index=0&id=37b65c10&scoped=true&lang=css& ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// style-loader: Adds some css to the DOM by adding a <style> tag\n\n// load the styles\nvar content = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js??ref--7-oneOf-1-1!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/postcss-loader/src??ref--7-oneOf-1-2!../../node_modules/cache-loader/dist/cjs.js??ref--1-0!../../node_modules/vue-loader/lib??vue-loader-options!./PanZoom.vue?vue&type=style&index=0&id=37b65c10&scoped=true&lang=css& */ \"./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/PanZoom.vue?vue&type=style&index=0&id=37b65c10&scoped=true&lang=css&\");\nif(typeof content === 'string') content = [[module.i, content, '']];\nif(content.locals) module.exports = content.locals;\n// add the styles to the DOM\nvar add = __webpack_require__(/*! ../../node_modules/vue-style-loader/lib/addStylesClient.js */ \"./node_modules/vue-style-loader/lib/addStylesClient.js\").default\nvar update = add(\"032d5b62\", content, true, {\"sourceMap\":false,\"shadowMode\":false});\n\n//# sourceURL=webpack:///./src/components/PanZoom.vue?./node_modules/vue-style-loader??ref--7-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--7-oneOf-1-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--7-oneOf-1-2!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/vue-styleguidist/lib/loaders/examples-loader.js?customLangs=vue|js|jsx!./src/components/PanZoom.vue":
/*!**************************************************************************************************************************!*\
  !*** ./node_modules/vue-styleguidist/lib/loaders/examples-loader.js?customLangs=vue|js|jsx!./src/components/PanZoom.vue ***!
  \**************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("\nif (false) {}\nvar requireMap = {};\nvar requireInRuntimeBase = __webpack_require__(/*! ./node_modules/vue-styleguidist/lib/loaders/utils/client/requireInRuntime */ \"./node_modules/vue-styleguidist/lib/loaders/utils/client/requireInRuntime.js\");\nvar requireInRuntime = requireInRuntimeBase.bind(null, requireMap);\nvar evalInContextBase = __webpack_require__(/*! ./node_modules/vue-styleguidist/lib/loaders/utils/client/evalInContext */ \"./node_modules/vue-styleguidist/lib/loaders/utils/client/evalInContext.js\");\nvar evalInContext = evalInContextBase.bind(null, \n\t\"\", \n\tnull, null)\nmodule.exports = [\n    {\n        'type': 'markdown',\n        'content': '## Usage\\n\\n```ignore\\nnpm install @andi23rosca/vue-pan-zoom\\n```\\n\\nImport and register it into any component you need to use \\n\\n```ignore\\nimport PanZoom from \"@andi23rosca/vue-pan-zoom\";\\n\\nexport default {\\n  components: { PanZoom }\\n}\\n```\\n\\nSee the example below on how to use it.'\n    },\n    {\n        'type': 'code',\n        'content': '<div style=\"height: 500px; width: 100%; background-color: #DDDDDD;\"> \\n  <pan-zoom>\\n    <img src=\"/vue-pan-zoom/demo.jpg\" style=\"width: 100%;\"/>\\n  </pan-zoom>\\n</div>',\n        'settings': {},\n        'evalInContext': evalInContext.bind(null, requireInRuntime.bind(null, null)),\n        'compiled': {\n            'script': ';return {data:function(){return {};}}',\n            'template': '<div style=\"height: 500px; width: 100%; background-color: #DDDDDD;\"> \\n  <pan-zoom>\\n    <img src=\"/vue-pan-zoom/demo.jpg\" style=\"width: 100%;\"/>\\n  </pan-zoom>\\n</div>',\n            'style': void 0\n        }\n    },\n    {\n        'type': 'code',\n        'content': '<div style=\"height: 500px; width: 100%; background-color: #DDDDDD;\"> \\n  <pan-zoom :max-zoom=\"3\" :min-zoom=\"0.5\" :zoom-step=\"0.5\">\\n    <img src=\"/vue-pan-zoom/demo.jpg\" style=\"width: 100%;\"/>\\n  </pan-zoom>\\n</div>',\n        'settings': {},\n        'evalInContext': evalInContext.bind(null, requireInRuntime.bind(null, null)),\n        'compiled': {\n            'script': ';return {data:function(){return {};}}',\n            'template': '<div style=\"height: 500px; width: 100%; background-color: #DDDDDD;\"> \\n  <pan-zoom :max-zoom=\"3\" :min-zoom=\"0.5\" :zoom-step=\"0.5\">\\n    <img src=\"/vue-pan-zoom/demo.jpg\" style=\"width: 100%;\"/>\\n  </pan-zoom>\\n</div>',\n            'style': void 0\n        }\n    }\n]\n\n//# sourceURL=webpack:///./src/components/PanZoom.vue?./node_modules/vue-styleguidist/lib/loaders/examples-loader.js?customLangs=vue%7Cjs%7Cjsx");

/***/ }),

/***/ "./node_modules/vue-styleguidist/lib/loaders/vuedoc-loader.js!./src/components/PanZoom.vue":
/*!*************************************************************************************************!*\
  !*** ./node_modules/vue-styleguidist/lib/loaders/vuedoc-loader.js!./src/components/PanZoom.vue ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("\n\t\tif (false) {}\n\n\t\tmodule.exports = {\n    'exportName': 'default',\n    'displayName': 'PanZoom',\n    'docsBlocks': ['## Usage\\r\\n```ignore\\r\\nnpm install @andi23rosca/vue-pan-zoom\\r\\n```\\r\\n\\r\\nImport and register it into any component you need to use \\r\\n```ignore\\r\\nimport PanZoom from \"@andi23rosca/vue-pan-zoom\";\\r\\n\\r\\nexport default {\\r\\n  components: { PanZoom }\\r\\n}\\r\\n```\\r\\n\\r\\nSee the example below on how to use it.\\r\\n\\r\\n```vue\\r\\n<div style=\"height: 500px; width: 100%; background-color: #DDDDDD;\"> \\r\\n  <pan-zoom>\\r\\n    <img src=\"/vue-pan-zoom/demo.jpg\" style=\"width: 100%;\"/>\\r\\n  </pan-zoom>\\r\\n</div>\\r\\n```\\r\\n```vue\\r\\n<div style=\"height: 500px; width: 100%; background-color: #DDDDDD;\"> \\r\\n  <pan-zoom :max-zoom=\"3\" :min-zoom=\"0.5\" :zoom-step=\"0.5\">\\r\\n    <img src=\"/vue-pan-zoom/demo.jpg\" style=\"width: 100%;\"/>\\r\\n  </pan-zoom>\\r\\n</div>\\r\\n```'],\n    'description': '',\n    'tags': {},\n    'props': [\n        {\n            'name': 'maxZoom',\n            'description': 'The maximum zooming amount',\n            'type': { 'name': 'number' },\n            'defaultValue': {\n                'func': false,\n                'value': '5'\n            }\n        },\n        {\n            'name': 'minZoom',\n            'description': 'The minimum zooming amount',\n            'type': { 'name': 'number' },\n            'defaultValue': {\n                'func': false,\n                'value': '0.2'\n            }\n        },\n        {\n            'name': 'zoomStep',\n            'description': 'How much to zoom in/out when using the mouse wheel',\n            'type': { 'name': 'number' },\n            'defaultValue': {\n                'func': false,\n                'value': '0.2'\n            }\n        }\n    ],\n    'events': void 0,\n    'methods': void 0,\n    'slots': {\n        'default': {\n            'name': 'default',\n            'description': 'Content to be zoomed / panned'\n        }\n    },\n    'example': __webpack_require__(/*! !./node_modules/vue-styleguidist/lib/loaders/examples-loader.js?customLangs=vue|js|jsx!./src/components/PanZoom.vue */ \"./node_modules/vue-styleguidist/lib/loaders/examples-loader.js?customLangs=vue|js|jsx!./src/components/PanZoom.vue\"),\n    'examples': null\n}\n\t\n\n//# sourceURL=webpack:///./src/components/PanZoom.vue?./node_modules/vue-styleguidist/lib/loaders/vuedoc-loader.js");

/***/ }),

/***/ "./src/components/PanZoom.vue":
/*!************************************!*\
  !*** ./src/components/PanZoom.vue ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _PanZoom_vue_vue_type_template_id_37b65c10_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PanZoom.vue?vue&type=template&id=37b65c10&scoped=true& */ \"./src/components/PanZoom.vue?vue&type=template&id=37b65c10&scoped=true&\");\n/* harmony import */ var _PanZoom_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PanZoom.vue?vue&type=script&lang=ts& */ \"./src/components/PanZoom.vue?vue&type=script&lang=ts&\");\n/* empty/unused harmony star reexport *//* harmony import */ var _PanZoom_vue_vue_type_style_index_0_id_37b65c10_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./PanZoom.vue?vue&type=style&index=0&id=37b65c10&scoped=true&lang=css& */ \"./src/components/PanZoom.vue?vue&type=style&index=0&id=37b65c10&scoped=true&lang=css&\");\n/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ \"./node_modules/vue-loader/lib/runtime/componentNormalizer.js\");\n/* harmony import */ var _PanZoom_vue_vue_type_custom_index_0_blockType_docs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./PanZoom.vue?vue&type=custom&index=0&blockType=docs */ \"./src/components/PanZoom.vue?vue&type=custom&index=0&blockType=docs\");\n\n\n\n\n\n\n/* normalize component */\n\nvar component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(\n  _PanZoom_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n  _PanZoom_vue_vue_type_template_id_37b65c10_scoped_true___WEBPACK_IMPORTED_MODULE_0__[\"render\"],\n  _PanZoom_vue_vue_type_template_id_37b65c10_scoped_true___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"],\n  false,\n  null,\n  \"37b65c10\",\n  null\n  \n)\n\n/* custom blocks */\n\nif (typeof _PanZoom_vue_vue_type_custom_index_0_blockType_docs__WEBPACK_IMPORTED_MODULE_4__[\"default\"] === 'function') Object(_PanZoom_vue_vue_type_custom_index_0_blockType_docs__WEBPACK_IMPORTED_MODULE_4__[\"default\"])(component)\n\n/* hot reload */\nif (false) { var api; }\ncomponent.options.__file = \"src/components/PanZoom.vue\"\n/* harmony default export */ __webpack_exports__[\"default\"] = (component.exports);\n\n//# sourceURL=webpack:///./src/components/PanZoom.vue?");

/***/ }),

/***/ "./src/components/PanZoom.vue?vue&type=custom&index=0&blockType=docs":
/*!***************************************************************************!*\
  !*** ./src/components/PanZoom.vue?vue&type=custom&index=0&blockType=docs ***!
  \***************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (function (Component) {\n\t\tComponent.options.__docs = \"// empty (null-loader)\"\n\t  });\n\n//# sourceURL=webpack:///./src/components/PanZoom.vue?");

/***/ }),

/***/ "./src/components/PanZoom.vue?vue&type=script&lang=ts&":
/*!*************************************************************!*\
  !*** ./src/components/PanZoom.vue?vue&type=script&lang=ts& ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_ref_15_0_node_modules_babel_loader_lib_index_js_node_modules_ts_loader_index_js_ref_15_2_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_PanZoom_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/cache-loader/dist/cjs.js??ref--15-0!../../node_modules/babel-loader/lib!../../node_modules/ts-loader??ref--15-2!../../node_modules/cache-loader/dist/cjs.js??ref--1-0!../../node_modules/vue-loader/lib??vue-loader-options!./PanZoom.vue?vue&type=script&lang=ts& */ \"./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/ts-loader/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/PanZoom.vue?vue&type=script&lang=ts&\");\n/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__[\"default\"] = (_node_modules_cache_loader_dist_cjs_js_ref_15_0_node_modules_babel_loader_lib_index_js_node_modules_ts_loader_index_js_ref_15_2_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_PanZoom_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__[\"default\"]); \n\n//# sourceURL=webpack:///./src/components/PanZoom.vue?");

/***/ }),

/***/ "./src/components/PanZoom.vue?vue&type=style&index=0&id=37b65c10&scoped=true&lang=css&":
/*!*********************************************************************************************!*\
  !*** ./src/components/PanZoom.vue?vue&type=style&index=0&id=37b65c10&scoped=true&lang=css& ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_PanZoom_vue_vue_type_style_index_0_id_37b65c10_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/vue-style-loader??ref--7-oneOf-1-0!../../node_modules/css-loader/dist/cjs.js??ref--7-oneOf-1-1!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/postcss-loader/src??ref--7-oneOf-1-2!../../node_modules/cache-loader/dist/cjs.js??ref--1-0!../../node_modules/vue-loader/lib??vue-loader-options!./PanZoom.vue?vue&type=style&index=0&id=37b65c10&scoped=true&lang=css& */ \"./node_modules/vue-style-loader/index.js?!./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/PanZoom.vue?vue&type=style&index=0&id=37b65c10&scoped=true&lang=css&\");\n/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_PanZoom_vue_vue_type_style_index_0_id_37b65c10_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_PanZoom_vue_vue_type_style_index_0_id_37b65c10_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);\n/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_PanZoom_vue_vue_type_style_index_0_id_37b65c10_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_PanZoom_vue_vue_type_style_index_0_id_37b65c10_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));\n /* harmony default export */ __webpack_exports__[\"default\"] = (_node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_PanZoom_vue_vue_type_style_index_0_id_37b65c10_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); \n\n//# sourceURL=webpack:///./src/components/PanZoom.vue?");

/***/ }),

/***/ "./src/components/PanZoom.vue?vue&type=template&id=37b65c10&scoped=true&":
/*!*******************************************************************************!*\
  !*** ./src/components/PanZoom.vue?vue&type=template&id=37b65c10&scoped=true& ***!
  \*******************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_1022bbd0_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_PanZoom_vue_vue_type_template_id_37b65c10_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"1022bbd0-vue-loader-template\"}!../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/cache-loader/dist/cjs.js??ref--1-0!../../node_modules/vue-loader/lib??vue-loader-options!./PanZoom.vue?vue&type=template&id=37b65c10&scoped=true& */ \"./node_modules/cache-loader/dist/cjs.js?{\\\"cacheDirectory\\\":\\\"node_modules/.cache/vue-loader\\\",\\\"cacheIdentifier\\\":\\\"1022bbd0-vue-loader-template\\\"}!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/PanZoom.vue?vue&type=template&id=37b65c10&scoped=true&\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_1022bbd0_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_PanZoom_vue_vue_type_template_id_37b65c10_scoped_true___WEBPACK_IMPORTED_MODULE_0__[\"render\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_1022bbd0_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_PanZoom_vue_vue_type_template_id_37b65c10_scoped_true___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"]; });\n\n\n\n//# sourceURL=webpack:///./src/components/PanZoom.vue?");

/***/ }),

/***/ "./src/utils/Point.ts":
/*!****************************!*\
  !*** ./src/utils/Point.ts ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Point; });\n/* harmony import */ var core_js_modules_es_math_hypot__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.math.hypot */ \"./node_modules/core-js/modules/es.math.hypot.js\");\n/* harmony import */ var core_js_modules_es_math_hypot__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_math_hypot__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var C_Users_Andi_Repos_vue_pan_zoom_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/classCallCheck */ \"./node_modules/@babel/runtime/helpers/esm/classCallCheck.js\");\n/* harmony import */ var C_Users_Andi_Repos_vue_pan_zoom_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/createClass */ \"./node_modules/@babel/runtime/helpers/esm/createClass.js\");\n\n\n\n\nvar Point = /*#__PURE__*/function () {\n  function Point() {\n    var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;\n    var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;\n\n    Object(C_Users_Andi_Repos_vue_pan_zoom_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(this, Point);\n\n    this.x = x;\n    this.y = y;\n  }\n\n  Object(C_Users_Andi_Repos_vue_pan_zoom_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(Point, [{\n    key: \"add\",\n    value: function add(p) {\n      return new Point(this.x + p.x, this.y + p.y);\n    }\n  }, {\n    key: \"subtract\",\n    value: function subtract(p) {\n      return new Point(this.x - p.x, this.y - p.y);\n    }\n  }, {\n    key: \"clone\",\n    value: function clone() {\n      return new Point(this.x, this.y);\n    }\n  }, {\n    key: \"distanceTo\",\n    value: function distanceTo(p) {\n      return Math.hypot(this.x - p.x, this.y - p.y);\n    }\n  }, {\n    key: \"centerTo\",\n    value: function centerTo(p) {\n      return new Point((this.x + p.x) / 2, (this.y + p.y) / 2);\n    }\n  }]);\n\n  return Point;\n}();\n\n\n\n//# sourceURL=webpack:///./src/utils/Point.ts?");

/***/ }),

/***/ "./src/utils/panZoom.ts":
/*!******************************!*\
  !*** ./src/utils/panZoom.ts ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return panZoom; });\n/* harmony import */ var core_js_modules_es_array_concat__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.array.concat */ \"./node_modules/core-js/modules/es.array.concat.js\");\n/* harmony import */ var core_js_modules_es_array_concat__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_concat__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var core_js_modules_es_math_hypot__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.math.hypot */ \"./node_modules/core-js/modules/es.math.hypot.js\");\n/* harmony import */ var core_js_modules_es_math_hypot__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_math_hypot__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _Point__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Point */ \"./src/utils/Point.ts\");\n\n\n\n\nvar touchPoint = function touchPoint(e, finger) {\n  return new _Point__WEBPACK_IMPORTED_MODULE_2__[\"default\"](e.touches[finger].clientX, e.touches[finger].clientY);\n};\n\nvar mousePoint = function mousePoint(e) {\n  return new _Point__WEBPACK_IMPORTED_MODULE_2__[\"default\"](e.clientX, e.clientY);\n};\n\nfunction panZoom(container, content, minZoom, maxZoom, zoomStep) {\n  container.style.cursor = \"grab\";\n  var panning = false;\n  var zooming = false;\n  var start0 = new _Point__WEBPACK_IMPORTED_MODULE_2__[\"default\"]();\n  var end0 = new _Point__WEBPACK_IMPORTED_MODULE_2__[\"default\"]();\n  var startDist = 0;\n  var endDist = 0;\n  var zoom = 1;\n  var lastZoom = 1;\n  var scaledSize = 0;\n\n  function setTransform(tr, zoom) {\n    content.style.transform = \"translate(\".concat(tr.x, \"px, \").concat(tr.y, \"px) scale(\").concat(zoom, \")\");\n  }\n\n  function setZoom(z) {\n    zoom = z = Math.max(Math.min(z, maxZoom), minZoom);\n  }\n\n  function touchMove(e) {\n    if (panning) {\n      end0 = touchPoint(e, 0).subtract(start0);\n      setTransform(end0, zoom);\n    } else if (zooming) {\n      var finger0 = touchPoint(e, 0);\n      var finger1 = touchPoint(e, 1);\n      end0 = finger0.centerTo(finger1).subtract(start0);\n      endDist = finger0.distanceTo(finger1) * lastZoom - startDist;\n      var hd = endDist + scaledSize;\n      setZoom(lastZoom * Math.pow(hd / scaledSize, 4)); // console.log(endDist, zoom);\n\n      setTransform(end0, zoom);\n    }\n\n    e.preventDefault();\n  }\n\n  function touchEnd(e) {\n    zooming = false;\n\n    if (e.touches.length === 1) {\n      panning = true;\n      start0 = touchPoint(e, 0).subtract(end0);\n    } else {\n      panning = false;\n      window.removeEventListener(\"touchmove\", touchMove);\n      window.removeEventListener(\"touchend\", touchEnd);\n    }\n\n    e.preventDefault();\n  }\n\n  function touchStart(e) {\n    if (e.touches.length === 1) {\n      panning = true;\n      zooming = false;\n      start0 = touchPoint(e, 0).subtract(end0);\n    } else if (e.touches.length === 2) {\n      zooming = true;\n      panning = false;\n      var finger0 = touchPoint(e, 0);\n      var finger1 = touchPoint(e, 1);\n      start0 = finger0.centerTo(finger1).subtract(end0);\n      lastZoom = zoom;\n      scaledSize = Math.hypot(content.offsetWidth, content.offsetHeight) * lastZoom;\n      startDist = finger0.distanceTo(finger1) * lastZoom;\n    }\n\n    window.addEventListener(\"touchmove\", touchMove);\n    window.addEventListener(\"touchend\", touchEnd);\n    e.preventDefault();\n  }\n\n  function mouseMove(e) {\n    if (panning) {\n      end0 = mousePoint(e).subtract(start0);\n      setTransform(end0, zoom);\n    }\n  }\n\n  function mouseUp() {\n    container.style.cursor = \"grab\";\n    panning = false;\n    window.removeEventListener(\"mousemove\", mouseMove);\n    window.removeEventListener(\"mouseup\", mouseUp);\n  }\n\n  function mouseDown(e) {\n    panning = true;\n    container.style.cursor = \"grabbing\";\n    start0 = mousePoint(e).subtract(end0);\n    window.addEventListener(\"mousemove\", mouseMove);\n    window.addEventListener(\"mouseup\", mouseUp);\n    e.preventDefault();\n  }\n\n  function mouseWheel(e) {\n    if (e.deltaY > 0) {\n      setZoom(zoom - zoomStep);\n    } else if (e.deltaY < 0) {\n      setZoom(zoom + zoomStep);\n    }\n\n    setTransform(end0, zoom);\n    e.preventDefault();\n  }\n\n  container.addEventListener(\"touchstart\", touchStart);\n  container.addEventListener(\"mousedown\", mouseDown);\n  container.addEventListener(\"wheel\", mouseWheel);\n}\n\n//# sourceURL=webpack:///./src/utils/panZoom.ts?");

/***/ }),

/***/ 0:
/*!**************************************************************!*\
  !*** multi ./node_modules/vue-styleguidist/lib/client/index ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! C:\\Users\\Andi\\Repos\\vue-pan-zoom\\node_modules\\vue-styleguidist\\lib\\client\\index */\"./node_modules/vue-styleguidist/lib/client/index.js\");\n\n\n//# sourceURL=webpack:///multi_./node_modules/vue-styleguidist/lib/client/index?");

/***/ })

/******/ });