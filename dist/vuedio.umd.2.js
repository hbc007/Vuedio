((typeof self !== 'undefined' ? self : this)["webpackJsonpvuedio"] = (typeof self !== 'undefined' ? self : this)["webpackJsonpvuedio"] || []).push([[2],{

/***/ 0:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ "00b8":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return MpegDashPlayer; });
/* harmony import */ var C_Users_tggdesu_WebstormProjects_vuedio_js_node_modules_babel_runtime_corejs2_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("d225");
/* harmony import */ var C_Users_tggdesu_WebstormProjects_vuedio_js_node_modules_babel_runtime_corejs2_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("b0b4");
/* harmony import */ var dashjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("090c");
/* harmony import */ var dashjs__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(dashjs__WEBPACK_IMPORTED_MODULE_2__);




var MpegDashPlayer =
/*#__PURE__*/
function () {
  function MpegDashPlayer(tech) {
    Object(C_Users_tggdesu_WebstormProjects_vuedio_js_node_modules_babel_runtime_corejs2_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(this, MpegDashPlayer);

    this.tech = tech;
    this.dash = Object(dashjs__WEBPACK_IMPORTED_MODULE_2__["MediaPlayer"])().create();
    this.dash.initialize(tech);
  }

  Object(C_Users_tggdesu_WebstormProjects_vuedio_js_node_modules_babel_runtime_corejs2_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])(MpegDashPlayer, [{
    key: "destroy",
    value: function destroy() {
      this.dash.reset();
    }
  }, {
    key: "off",
    value: function off(event, handler) {
      this.dash.off(event, handler);
      this.tech.removeEventListener(event, handler);
    }
  }, {
    key: "on",
    value: function on(event, handler) {
      // @ts-ignore
      this.dash.on(event, handler);
      this.tech.addEventListener(event, handler);
    }
  }, {
    key: "duration",
    get: function get() {
      return this.dash.duration();
    }
  }, {
    key: "paused",
    get: function get() {
      try {
        return this.dash.isPaused();
      } catch (e) {
        return true;
      }
    },
    set: function set(val) {
      try {
        if (val) {
          this.dash.pause();
        } else {
          this.dash.play();
        }
      } catch (e) {}
    }
  }, {
    key: "src",
    get: function get() {
      return this.dash.getSource();
    },
    set: function set(url) {
      this.dash.attachSource(url);
    }
  }, {
    key: "timestamp",
    get: function get() {
      try {
        return this.dash.time();
      } catch (e) {
        return 0;
      }
    },
    set: function set(val) {
      this.dash.seek(val);
    }
  }, {
    key: "speed",
    get: function get() {
      return this.dash.getPlaybackRate();
    },
    set: function set(val) {
      this.dash.setPlaybackRate(val);
    }
  }]);

  return MpegDashPlayer;
}();



/***/ }),

/***/ 1:
/***/ (function(module, exports) {

/* (ignored) */

/***/ })

}]);
//# sourceMappingURL=vuedio.umd.2.js.map