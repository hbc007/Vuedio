((typeof self !== 'undefined' ? self : this)["webpackJsonpvuedio"] = (typeof self !== 'undefined' ? self : this)["webpackJsonpvuedio"] || []).push([[3],{

/***/ "830b":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return HlsPlayer; });
/* harmony import */ var core_js_modules_es7_symbol_async_iterator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("ac4d");
/* harmony import */ var core_js_modules_es7_symbol_async_iterator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es7_symbol_async_iterator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es6_symbol__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("8a81");
/* harmony import */ var core_js_modules_es6_symbol__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_symbol__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_web_dom_iterable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("ac6a");
/* harmony import */ var core_js_modules_web_dom_iterable__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_iterable__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es6_function_name__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("7f7f");
/* harmony import */ var core_js_modules_es6_function_name__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_function_name__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var C_Users_tggdesu_WebstormProjects_vuedio_js_node_modules_babel_runtime_corejs2_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("d225");
/* harmony import */ var C_Users_tggdesu_WebstormProjects_vuedio_js_node_modules_babel_runtime_corejs2_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("b0b4");
/* harmony import */ var hls_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("ba56");
/* harmony import */ var hls_js__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(hls_js__WEBPACK_IMPORTED_MODULE_6__);








var HlsPlayer =
/*#__PURE__*/
function () {
  function HlsPlayer(tech) {
    Object(C_Users_tggdesu_WebstormProjects_vuedio_js_node_modules_babel_runtime_corejs2_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"])(this, HlsPlayer);

    this.tech = tech;
    this.hls = new hls_js__WEBPACK_IMPORTED_MODULE_6___default.a();
    this.hls.attachMedia(tech);
  }

  Object(C_Users_tggdesu_WebstormProjects_vuedio_js_node_modules_babel_runtime_corejs2_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"])(HlsPlayer, [{
    key: "bind",
    value: function bind(instance) {
      var _this = this;

      this.vuedio = instance;
      this.vuedio.progressiveLevels = true;
      this.hls.on(hls_js__WEBPACK_IMPORTED_MODULE_6___default.a.Events.MANIFEST_PARSED, function (ev, data) {
        _this.vuedio.progressiveLevels = // @ts-ignore
        data.levels.map(function (it, i) {
          return {
            name: it.name || it.height + 'p',
            id: i,
            selected: i === data.firstLevel,
            callback: function callback() {
              _this.hls.currentLevel = i;
            }
          };
        });
        _this.vuedio.subtitlesAvailable = _this.hls.subtitleTracks.length > 0;
      });
      this.hls.on(hls_js__WEBPACK_IMPORTED_MODULE_6___default.a.Events.LEVEL_SWITCHED, function (ev, _ref) {
        var level = _ref.level;

        if (!Array.isArray(_this.vuedio.progressiveLevels)) {
          return;
        }

        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = _this.vuedio.progressiveLevels[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var it = _step.value;
            it.selected = it.id === level;
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return != null) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
      });
      this.hls.on(hls_js__WEBPACK_IMPORTED_MODULE_6___default.a.Events.SUBTITLE_TRACKS_UPDATED, function (ev, _ref2) {
        var subtitleTracks = _ref2.subtitleTracks;
        _this.vuedio.subtitlesAvailable = subtitleTracks.length > 0;
        _this.vuedio.subtitlesEnabled = _this.hls.subtitleDisplay;
      });
      this.vuedio.externalSubtitles = true;
      this.vuedio.externalSubtitlesListener = this.subtitlesListener.bind(this);
    }
  }, {
    key: "off",
    value: function off(event, handler) {
      this.hls.off(event, handler);
      this.tech.removeEventListener(event, handler);
    }
  }, {
    key: "on",
    value: function on(event, handler) {
      this.hls.on(event, handler);
      this.tech.addEventListener(event, handler);
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this.hls.destroy();
    }
  }, {
    key: "subtitlesListener",
    value: function subtitlesListener(enabled) {
      this.hls.subtitleDisplay = enabled;
    }
  }, {
    key: "duration",
    get: function get() {
      return this.tech.duration;
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
  }, {
    key: "src",
    get: function get() {
      return this.tech.src;
    },
    set: function set(val) {
      this.hls.loadSource(val);
    }
  }, {
    key: "timestamp",
    get: function get() {
      return this.tech.currentTime;
    },
    set: function set(val) {
      this.tech.currentTime = val;
    }
  }]);

  return HlsPlayer;
}();



/***/ })

}]);
//# sourceMappingURL=vuedio.umd.3.js.map