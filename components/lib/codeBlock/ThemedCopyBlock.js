"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = require("styled-components");

var _CopyBlock = _interopRequireDefault(require("./components/CopyBlock"));

var CopyBlockWithTheme = /*#__PURE__*/(0, _styledComponents.withTheme)(_CopyBlock["default"]);
var emptyTheme = {};

function _default(props) {
  return /*#__PURE__*/_react["default"].createElement(_styledComponents.ThemeProvider, {
    theme: emptyTheme
  }, /*#__PURE__*/_react["default"].createElement(CopyBlockWithTheme, props));
}