"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _themeBuilder = require("../utils/themeBuilder");

var _Code = _interopRequireDefault(require("./Code"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var LANGUAGE_FALLBACK = 'text';

var CodeBlock = /*#__PURE__*/function (_PureComponent) {
  (0, _inherits2["default"])(CodeBlock, _PureComponent);

  var _super = _createSuper(CodeBlock);

  function CodeBlock() {
    var _this;

    (0, _classCallCheck2["default"])(this, CodeBlock);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "handleCopy", function (event) {
      /**
       * We don't want to copy the markup after highlighting, but rather the preformatted text in the selection
       */
      var data = event.nativeEvent.clipboardData;

      if (data) {
        event.preventDefault();
        var selection = window.getSelection();

        if (selection === null) {
          return;
        }

        var selectedText = selection.toString();
        var document = "<!doctype html><html><head></head><body><pre>".concat(selectedText, "</pre></body></html>");
        data.clearData();
        data.setData('text/html', document);
        data.setData('text/plain', selectedText);
      }
    });
    return _this;
  }

  (0, _createClass2["default"])(CodeBlock, [{
    key: "render",
    value: function render() {
      var _applyTheme = (0, _themeBuilder.applyTheme)(this.props.theme),
          lineNumberContainerStyle = _applyTheme.lineNumberContainerStyle,
          codeBlockStyle = _applyTheme.codeBlockStyle,
          codeContainerStyle = _applyTheme.codeContainerStyle;

      var codeStyle = Object.assign({}, codeBlockStyle, this.props.codeStyle);
      var codeTagStyle = Object.assign({}, codeContainerStyle, this.props.codeBlockStyle);
      var props = {
        language: this.props.language || LANGUAGE_FALLBACK,
        codeStyle: codeStyle,
        showLineNumbers: this.props.showLineNumbers,
        codeTagProps: {
          style: codeTagStyle
        },
        lineNumberContainerStyle: lineNumberContainerStyle,
        text: this.props.text.toString(),
        highlight: this.props.highlight
      };
      return /*#__PURE__*/_react["default"].createElement(_Code["default"], props);
    }
  }]);
  return CodeBlock;
}(_react.PureComponent);

exports["default"] = CodeBlock;
(0, _defineProperty2["default"])(CodeBlock, "displayName", 'CodeBlock');
(0, _defineProperty2["default"])(CodeBlock, "defaultProps", {
  showLineNumbers: true,
  language: LANGUAGE_FALLBACK,
  theme: {},
  codeStyle: {},
  codeBlockStyle: {},
  highlight: ''
});