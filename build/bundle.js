/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _PCWQuickUnion = __webpack_require__(2);

	var _PCWQuickUnion2 = _interopRequireDefault(_PCWQuickUnion);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	window.onload = function () {

		var run = document.querySelector(".run");

		var freq = 1000;

		//const w = new Worker("worker.js");

		//w.onmessage = (event) => {
		//	console.log('main', event.data);
		//};

		run.addEventListener("click", function (event) {

			var drawContainer = document.querySelector(".percolation-view-container");
			var dim = parseInt(document.querySelector(".n").value);
			var dims = 100 / dim;
			var n = dim * dim;

			var counter = 0;

			for (var i = 1; i <= n; i++) {

				var node = document.createElement("div");
				node.id = i;
				node.classList.add("grid-node");
				node.style.width = dims + "%";
				node.style.height = dims + "%";
				drawContainer.appendChild(node);
			}

			var pCWQuickUnion = new _PCWQuickUnion2.default(n + 2);
			var nodeZero = n + 1;
			var nodeEnd = n + 2;

			setInterval(function () {
				var sorted = Math.getRandomInt(1, n + 1);

				console.log(sorted);
			}, freq);
		});
	};

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var PCWQuickUnion = function () {
	    function PCWQuickUnion(n) {
	        _classCallCheck(this, PCWQuickUnion);

	        this.dim = Math.sqrt(n);
	        this.nodeZeroId = n - 1;
	        this.nodeEndId = n;
	        this.sw = [];
	        this.id = [];
	        this.open = [];
	        for (var i = 1; i <= n; i++) {
	            this.sw[i] = 1;
	            this.id[i] = i;
	            this.open[i] = false;
	        }
	        this.open[this.nodeZeroId] = true;
	        this.open[this.nodeEndId] = true;
	        this.counter = n;
	    }
	    //Find component name


	    _createClass(PCWQuickUnion, [{
	        key: "root",
	        value: function root(p) {
	            while (p != this.id[p]) {
	                this.id[p] = this.id[this.id[p]];
	                p = this.id[p];
	            }
	            return p;
	        }
	    }, {
	        key: "open",
	        value: function open(p) {
	            this.open[p] = true;
	        }
	    }, {
	        key: "isOpened",
	        value: function isOpened(p) {
	            return this.open[p];
	        }
	    }, {
	        key: "getAllNeighbors",
	        value: function getAllNeighbors(p) {
	            var line = Math.ceil(p / this.dim);
	            var column = p % this.dim;
	            var neighborLastLine = line - 1;

	            if (line == 1) return [this.nodeZeroId, column - 1, column + 1];
	        }
	    }, {
	        key: "union",
	        value: function union(p, q) {

	            var rP = this.root(p);
	            var rQ = this.root(q);

	            if (rP !== rQ) {
	                if (this.sw[rP] < this.sw[rQ]) {
	                    this.id[rP] = rQ; //root of p <= root of q
	                    this.sw[rQ] += this.sw[rP]; //q tree size += p tree size
	                } else {
	                    this.id[rQ] = rP; //root of q <= root of p
	                    this.sw[rP] += this.sw[rQ]; //p tree size += q tree size
	                }

	                this.counter--;
	            }

	            return this;
	        }
	    }, {
	        key: "isConnected",
	        value: function isConnected(p, q) {
	            return this.root(p) === this.root(q);
	        }
	    }]);

	    return PCWQuickUnion;
	}();

	exports.default = PCWQuickUnion;


	Math.getRandomInt = function (min, max) {
	    return Math.floor(Math.random() * (max - min)) + min;
	};

	window.onload = function () {

	    var run = document.querySelector(".run");

	    var freq = 1000;

	    //const w = new Worker("worker.js");

	    //w.onmessage = (event) => {
	    //  console.log('main', event.data);
	    //};

	    run.addEventListener("click", function (event) {

	        var drawContainer = document.querySelector(".percolation-view-container");
	        var dim = parseInt(document.querySelector(".n").value);
	        var dims = 100 / dim;
	        var n = dim * dim;

	        var counter = 0;

	        for (var i = 1; i <= n; i++) {

	            var node = document.createElement("div");
	            node.id = i;
	            node.classList.add("grid-node");
	            node.style.width = dims + "%";
	            node.style.height = dims + "%";
	            drawContainer.appendChild(node);
	        }

	        var pCWQuickUnion = new PCWQuickUnion(n + 2);
	        var nodeZero = n + 1;
	        var nodeEnd = n + 2;

	        setInterval(function () {
	            var sorted = Math.getRandomInt(1, n + 1);

	            console.log(sorted);
	        }, freq);
	    });
	};

/***/ }
/******/ ]);