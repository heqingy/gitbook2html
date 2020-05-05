"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = require("styled-components");

var _Code = _interopRequireDefault(require("./components/Code"));

var CodeWithTheme = /*#__PURE__*/(0, _styledComponents.withTheme)(_Code["default"]);
var emptyTheme = {};

function _default(props) {
  return /*#__PURE__*/_react["default"].createElement(_styledComponents.ThemeProvider, {
    theme: emptyTheme
  }, /*#__PURE__*/_react["default"].createElement(CodeWithTheme, props));
}