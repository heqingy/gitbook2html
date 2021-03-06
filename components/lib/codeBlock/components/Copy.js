"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

var ClipboardListIcon = function ClipboardListIcon(_ref) {
  var size = _ref.size,
      color = _ref.color,
      props = (0, _objectWithoutProperties2["default"])(_ref, ["size", "color"]);
  return /*#__PURE__*/_react["default"].createElement("svg", (0, _extends2["default"])({}, props, {
    viewBox: "0 0 384 512",
    width: size,
    height: size,
    fill: color
  }), /*#__PURE__*/_react["default"].createElement("path", {
    d: "M280 240H168c-4.4 0-8 3.6-8 8v16c0 4.4 3.6 8 8 8h112c4.4 0 8-3.6 8-8v-16c0-4.4-3.6-8-8-8zm0 96H168c-4.4 0-8 3.6-8 8v16c0 4.4 3.6 8 8 8h112c4.4 0 8-3.6 8-8v-16c0-4.4-3.6-8-8-8zM112 232c-13.3 0-24 10.7-24 24s10.7 24 24 24 24-10.7 24-24-10.7-24-24-24zm0 96c-13.3 0-24 10.7-24 24s10.7 24 24 24 24-10.7 24-24-10.7-24-24-24zM336 64h-80c0-35.3-28.7-64-64-64s-64 28.7-64 64H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48zM192 48c8.8 0 16 7.2 16 16s-7.2 16-16 16-16-7.2-16-16 7.2-16 16-16zm144 408c0 4.4-3.6 8-8 8H56c-4.4 0-8-3.6-8-8V120c0-4.4 3.6-8 8-8h40v32c0 8.8 7.2 16 16 16h160c8.8 0 16-7.2 16-16v-32h40c4.4 0 8 3.6 8 8v336z"
  }));
};

ClipboardListIcon.displayName = "ClipboardListIcon";
ClipboardListIcon.defaultProps = {
  size: 24,
  color: "currentcolor"
};

var ClipboardCheckIcon = function ClipboardCheckIcon(_ref2) {
  var size = _ref2.size,
      color = _ref2.color,
      props = (0, _objectWithoutProperties2["default"])(_ref2, ["size", "color"]);
  return /*#__PURE__*/_react["default"].createElement("svg", (0, _extends2["default"])({}, props, {
    viewBox: "0 0 384 512",
    width: size,
    height: size,
    fill: color
  }), /*#__PURE__*/_react["default"].createElement("path", {
    d: "M336 64h-80c0-35.3-28.7-64-64-64s-64 28.7-64 64H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48zM192 40c13.3 0 24 10.7 24 24s-10.7 24-24 24-24-10.7-24-24 10.7-24 24-24zm121.2 231.8l-143 141.8c-4.7 4.7-12.3 4.6-17-.1l-82.6-83.3c-4.7-4.7-4.6-12.3.1-17L99.1 285c4.7-4.7 12.3-4.6 17 .1l46 46.4 106-105.2c4.7-4.7 12.3-4.6 17 .1l28.2 28.4c4.7 4.8 4.6 12.3-.1 17z"
  }));
};

ClipboardCheckIcon.displayName = "ClipboardCheckIcon";
ClipboardCheckIcon.defaultProps = {
  size: 24,
  color: "currentcolor"
};

function _default(_ref3) {
  var size = _ref3.size,
      color = _ref3.color,
      copied = _ref3.copied,
      props = (0, _objectWithoutProperties2["default"])(_ref3, ["size", "color", "copied"]);

  if (copied) {
    return /*#__PURE__*/_react["default"].createElement(ClipboardCheckIcon, (0, _extends2["default"])({
      color: color,
      size: size
    }, props));
  }

  return /*#__PURE__*/_react["default"].createElement(ClipboardListIcon, (0, _extends2["default"])({
    color: color,
    size: size
  }, props));
}