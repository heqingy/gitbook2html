"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _reactSyntaxHighlighter = require("@lib/syntaxHighhligter/index.js");

var _themeBuilder = require("../utils/themeBuilder");

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var Code = /*#__PURE__*/function (_PureComponent) {
  (0, _inherits2["default"])(Code, _PureComponent);

  var _super = _createSuper(Code);

  function Code() {
    (0, _classCallCheck2["default"])(this, Code);
    return _super.apply(this, arguments);
  }

  (0, _createClass2["default"])(Code, [{
    key: "getLineOpacity",
    value: function getLineOpacity(lineNumber) {
      if (!this.props.highlight) {
        return 1;
      }

      var highlight = this.props.highlight.split(',').map(function (num) {
        if (num.indexOf('-') > 0) {
          // We found a line group, e.g. 1-3
          var _num$split$map$sort = num.split('-').map(Number).sort(),
              _num$split$map$sort2 = (0, _slicedToArray2["default"])(_num$split$map$sort, 2),
              from = _num$split$map$sort2[0],
              to = _num$split$map$sort2[1];

          return Array(to + 1).fill(undefined).map(function (_, index) {
            return index;
          }).slice(from, to + 1);
        }

        return Number(num);
      }).reduce(function (acc, val) {
        return acc.concat(val);
      }, []);

      if (highlight.length === 0) {
        return 1;
      }

      if (highlight.includes(lineNumber)) {
        return 1;
      }

      return 0.3;
    }
  }, {
    key: "render",
    value: function render() {
      var _this = this;

      var _applyTheme = (0, _themeBuilder.applyTheme)(this.props.theme),
          inlineCodeStyle = _applyTheme.inlineCodeStyle;

      var language = this.props.language;
      var props = {
        language: language,
        PreTag: this.props.preTag,
        style: this.props.codeStyle || inlineCodeStyle,
        showLineNumbers: this.props.showLineNumbers,
        lineNumberContainerStyle: this.props.lineNumberContainerStyle,
        codeTagProps: this.props.codeTagProps
      };
      return /*#__PURE__*/_react["default"].createElement(_reactSyntaxHighlighter.PrismAsyncLight, (0, _extends2["default"])({}, props, {
        // Wrap lines is needed to set styles on the line.
        // We use this to set opacity if highlight specific lines.
        wrapLines: this.props.highlight.length > 0,
        lineNumberStyle: function lineNumberStyle(lineNumber) {
          return {
            opacity: _this.getLineOpacity(lineNumber)
          };
        } // Types are incorrect.
        // @ts-ignore
        ,
        lineProps: function lineProps(lineNumber) {
          return {
            style: {
              opacity: _this.getLineOpacity(lineNumber)
            }
          };
        }
      }), this.props.text);
    }
  }]);
  return Code;
}(_react.PureComponent);

exports["default"] = Code;
(0, _defineProperty2["default"])(Code, "defaultProps", {
  theme: {},
  showLineNumbers: false,
  lineNumberContainerStyle: {},
  codeTagProps: {},
  preTag: 'span',
  highlight: ''
});