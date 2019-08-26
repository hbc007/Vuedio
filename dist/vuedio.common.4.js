((typeof self !== 'undefined' ? self : this)["webpackJsonpvuedio"] = (typeof self !== 'undefined' ? self : this)["webpackJsonpvuedio"] || []).push([[4],{

/***/ "2f63":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Html5Player; });
/* harmony import */ var C_Users_tggdesu_WebstormProjects_vuedio_js_node_modules_babel_runtime_corejs2_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("d225");
/* harmony import */ var C_Users_tggdesu_WebstormProjects_vuedio_js_node_modules_babel_runtime_corejs2_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("b0b4");



var Html5Player =
/*#__PURE__*/
function () {
  function Html5Player(tech) {
    Object(C_Users_tggdesu_WebstormProjects_vuedio_js_node_modules_babel_runtime_corejs2_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(this, Html5Player);

    this.tech = tech;
  }

  Object(C_Users_tggdesu_WebstormProjects_vuedio_js_node_modules_babel_runtime_corejs2_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])(Html5Player, [{
    key: "off",
    value: function off(event, handler) {
      this.tech.removeEventListener(event, handler);
    }
  }, {
    key: "on",
    value: function on(event, handler) {
      this.tech.addEventListener(event, handler);
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this.tech.src = '';
    }
  }, {
    key: "timestamp",
    get: function get() {
      return this.tech.currentTime;
    },
    set: function set(val) {
      this.tech.currentTime = val;
    }
  }, {
    key: "duration",
    get: function get() {
      return this.tech.duration;
    }
  }, {
    key: "src",
    get: function get() {
      return this.tech.currentSrc;
    },
    set: function set(val) {
      this.tech.src = val;
      this.tech.load();
    }
  }, {
    key: "paused",
    get: function get() {
      return this.tech.paused;
    },
    set: function set(val) {
      if (val) {
        this.tech.pause();
      } else {
        this.tech.play();
      }
    }
  }, {
    key: "speed",
    get: function get() {
      return this.tech.playbackRate;
    },
    set: function set(val) {
      this.tech.playbackRate = val;
    }
  }]);

  return Html5Player;
}();



/***/ })

}]);
//# sourceMappingURL=vuedio.common.4.js.map