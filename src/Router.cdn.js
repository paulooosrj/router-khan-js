"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _toArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toArray"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _construct2 = _interopRequireDefault(require("@babel/runtime/helpers/construct"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var RouterProvide =
/*#__PURE__*/
function () {
  (0, _createClass2["default"])(RouterProvide, null, [{
    key: "create",
    value: function create() {
      if (!RouterProvide.instance) {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        RouterProvide.instance = (0, _construct2["default"])(this, args);
      }

      return RouterProvide.instance;
    }
  }]);

  function RouterProvide() {
    var browser = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
    (0, _classCallCheck2["default"])(this, RouterProvide);

    if (browser) {
      document.body.innerHTML += '<div id="view-router"></div>';
    }

    this.routes = new Map();
    this.params = [];
  }

  (0, _createClass2["default"])(RouterProvide, [{
    key: "escapeRegExp",
    value: function escapeRegExp(string) {
      return "^" + string.replace(/\//gim, "\\/") + "$";
    }
  }, {
    key: "isRouteParam",
    value: function isRouteParam(url) {
      var isParamUrl = function isParamUrl(url) {
        return url.match(/\{(.*?)\}/gim);
      };

      var verify = isParamUrl(url);

      if (verify && Array.isArray(verify)) {
        var replaceParam = function replaceParam(parameter) {
          return parameter.replace(/(\{|\})/gim, "");
        };

        var replaceKeys = function replaceKeys(link, keys) {
          return link.replace(new RegExp("(".concat(keys.join("|"), ")"), "gim"), "(.*?)");
        };

        var keys = verify.map(function (param) {
          return replaceParam(param).trim();
        });
        var newRoute = replaceKeys(url, verify);
        return {
          keys: keys,
          newRoute: newRoute
        };
      }

      return false;
    }
  }, {
    key: "toRoute",
    value: function toRoute(route) {
      return "/#" + route;
    }
  }, {
    key: "redirect",
    value: function redirect(route) {
      var location = this.toRoute(route);
      window.location = location;
      return location;
    }
  }, {
    key: "any",
    value: function any(route) {
      if (this.routes.has(route) === false) {
        var verifyParam = this.isRouteParam(route);

        for (var _len2 = arguments.length, calls = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
          calls[_key2 - 1] = arguments[_key2];
        }

        if (verifyParam === false || verifyParam === null) {
          this.routes.set(new RegExp(this.escapeRegExp(route)), calls.reverse());
        } else if (verifyParam.hasOwnProperty("newRoute")) {
          var escaped = new RegExp(this.escapeRegExp(verifyParam.newRoute));
          this.params.push({
            route: escaped,
            keys: verifyParam.keys
          });
          this.routes.set(escaped, calls.reverse());
        }
      }
    }
  }, {
    key: "runMiddleware",
    value: function () {
      var _runMiddleware = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee(middleware, chain) {
        var view, next, i;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                view = document.getElementById("view-router");
                next = null;

                for (i = 0; i < middleware.length; i += 1) {
                  next = middleware[i].bind(null, chain, view, next);
                } // run the middleware chain


                next();

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function runMiddleware(_x, _x2) {
        return _runMiddleware.apply(this, arguments);
      }

      return runMiddleware;
    }()
  }, {
    key: "trate",
    value: function trate(eventUrl) {
      var routesMap = Array.from(this.routes.keys());
      var find = routesMap.find(function (routeMaped, key) {
        return routeMaped.test(eventUrl);
      });

      if (find) {
        var findCall = this.routes.get(find);
        var isParam = this.params.find(function (routed) {
          return routed.route === find;
        });

        if (isParam && findCall) {
          var _eventUrl$match = eventUrl.match(isParam.route),
              _eventUrl$match2 = (0, _toArray2["default"])(_eventUrl$match),
              values = _eventUrl$match2.slice(1);

          var keysValues = {};
          isParam.keys.map(function (vKey, iKey) {
            return keysValues[vKey] = values[iKey];
          });
          console.log(keysValues);
          return this.runMiddleware(findCall, keysValues);
        }

        return this.runMiddleware(findCall, {});
      }
    }
  }, {
    key: "push_event",
    value: function push_event(e) {
      window.history.pushState({
        url: e
      }, e, e);
      var param = this.trate(e);
    }
  }, {
    key: "dispatch",
    value: function dispatch() {
      var _this = this;

      window.onpopstate = function (e) {
        var url = window.location.hash !== "" ? window.location.hash.split("#").pop() : window.location.pathname;

        _this.push_event(url);
      };

      var url = window.location.hash !== "" ? window.location.hash.split("#").pop() : window.location.pathname;
      this.push_event(url);
    }
  }]);
  return RouterProvide;
}();

exports["default"] = RouterProvide;
