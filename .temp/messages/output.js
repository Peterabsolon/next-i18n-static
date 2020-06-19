"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MyPage = MyPage;

var _react = _interopRequireDefault(require("react"));

var _reactIntl = require("react-intl");

var _MyPage = require("./MyPage.messages");

var __jsx = _react["default"].createElement;

function MyPage() {
  return __jsx("div", null, __jsx(_reactIntl.FormattedMessage, _MyPage.messages.title));
}
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.messages = void 0;

var _reactIntl = require("react-intl");

var messages = (0, _reactIntl.defineMessages)({
  title: {
    "id": "MyPage.title",
    "defaultMessage": "EN Title"
  }
});
exports.messages = messages;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _MyPage = require("./MyPage");

Object.keys(_MyPage).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _MyPage[key];
    }
  });
});
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard3 = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = MyApp;

var _react = _interopRequireWildcard3(require("react"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _interopRequireWildcard2 = _interopRequireDefault(require("@babel/runtime/helpers/interopRequireWildcard"));

var _reactIntl = require("react-intl");

var __jsx = _react["default"].createElement;

var __awaiter = void 0 && (void 0).__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

function MyApp(_ref) {
  var _this = this;

  var Component = _ref.Component,
      pageProps = _ref.pageProps;

  var _useState = (0, _react.useState)("en"),
      locale = _useState[0],
      setLocale = _useState[1];

  var _useState2 = (0, _react.useState)({
    cs: {},
    en: {}
  }),
      dictionaries = _useState2[0],
      setDictionaries = _useState2[1];

  var fetchDictionary = function fetchDictionary(locale) {
    return __awaiter(_this, void 0, void 0, /*#__PURE__*/_regenerator["default"].mark(function _callee() {
      var dict;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!(locale !== "en")) {
                _context.next = 5;
                break;
              }

              _context.next = 3;
              return Promise.resolve("../translations/locales/".concat(locale, ".json")).then(function (s) {
                return (0, _interopRequireWildcard2["default"])(require(s));
              });

            case 3:
              dict = _context.sent;
              setDictionaries(Object.assign(Object.assign({}, dictionaries), (0, _defineProperty2["default"])({}, locale, dict)));

            case 5:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));
  };

  var fetchLocaleData = function fetchLocaleData(locale) {
    return __awaiter(_this, void 0, void 0, /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
      var localeData;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (!(locale !== "en")) {
                _context2.next = 5;
                break;
              }

              _context2.next = 3;
              return Promise.resolve("react-intl/locale-data/".concat(locale)).then(function (s) {
                return (0, _interopRequireWildcard2["default"])(require(s));
              });

            case 3:
              localeData = _context2.sent;
              (0, _reactIntl.addLocaleData)(localeData["default"]);

            case 5:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));
  };

  var handleChangeLocale = function handleChangeLocale(locale) {
    return __awaiter(_this, void 0, void 0, /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              setLocale(locale);
              fetchDictionary(locale);
              fetchLocaleData(locale);

            case 3:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));
  };

  return __jsx(_reactIntl.IntlProvider, {
    locale: locale,
    messages: dictionaries[locale]
  }, __jsx("div", null, "locale: ", locale), __jsx("div", null, __jsx("button", {
    type: "button",
    onClick: function onClick() {
      return handleChangeLocale("en");
    }
  }, "EN"), __jsx("button", {
    type: "button",
    onClick: function onClick() {
      return handleChangeLocale("cs");
    }
  }, "CZ")), __jsx(Component, pageProps));
}
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _MyPage = require("../containers/MyPage");

var _default = _MyPage.MyPage;
exports["default"] = _default;
