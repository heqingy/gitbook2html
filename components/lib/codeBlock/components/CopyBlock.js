"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireWildcard(require("react"));

var _Code = _interopRequireDefault(require("./Code"));

var _CodeBlock = _interopRequireDefault(require("./CodeBlock"));

var _Copy = _interopRequireDefault(require("./Copy"));

var _clipboard = _interopRequireDefault(require("clipboard"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var Button = /*#__PURE__*/_styledComponents["default"].button.withConfig({
  displayName: "CopyBlock__Button",
  componentId: "sc-109lwr7-0"
})(["position:absolute;top:0;right:0;margin-right:0.25rem;display:flex;flex-wrap:wrap;justify-content:center;align-items:center;background:", ";margin-top:0.15rem;border-radius:0.25rem;max-height:2rem;max-width:2rem;padding:0.5rem;&:hover{opacity:", ";}&:focus{outline:none;opacity:1;}.icon{width:1rem;height:1rem;}"], function (p) {
  return p.theme.backgroundColor;
}, function (p) {
  return p.copied ? 1 : 0.5;
});

var Snippet = /*#__PURE__*/_styledComponents["default"].div.withConfig({
  displayName: "CopyBlock__Snippet",
  componentId: "sc-109lwr7-1"
})(["display:flex;flex-wrap:wrap;position:relative;background:", ";border-radius:0.25rem;padding:", ";"], function (p) {
  return p.theme.backgroundColor;
}, function (p) {
  return p.codeBlock ? "0.25rem 0.5rem 0.25rem 0.25rem" : "0.25rem";
});

var uniqueId = require("lodash.uniqueid");

function _default(_ref) {
  var theme = _ref.theme,
      text = _ref.text,
      codeBlock = _ref.codeBlock,
      rest = (0, _objectWithoutProperties2["default"])(_ref, ["theme", "text", "codeBlock"]);

  var _useState = (0, _react.useState)(false),
      _useState2 = (0, _slicedToArray2["default"])(_useState, 2),
      copied = _useState2[0],
      toggleCopy = _useState2[1];

  var uid = uniqueId("copy_");

  if (typeof document !== "undefined") {
    var clip = new _clipboard["default"]("#".concat(uid));
    clip.on("success", function () {
      toggleCopy(true);
      return setTimeout(function () {
        return toggleCopy(false);
      }, 1000);
    });
    clip.on("error", function (err) {
      return console.error(err);
    });
  }

  return /*#__PURE__*/_react["default"].createElement(Snippet, (0, _extends2["default"])({
    codeBlock: codeBlock
  }, {
    theme: theme
  }), codeBlock ? /*#__PURE__*/_react["default"].createElement(_CodeBlock["default"], (0, _extends2["default"])({
    text: text,
    theme: theme
  }, rest)) : /*#__PURE__*/_react["default"].createElement(_Code["default"], (0, _extends2["default"])({
    text: text,
    theme: theme
  }, rest)), /*#__PURE__*/_react["default"].createElement(Button, (0, _extends2["default"])({
    id: uid
  }, {
    theme: theme,
    copied: copied
  }, {
    "data-clipboard-text": text,
    disabled: copied
  }), /*#__PURE__*/_react["default"].createElement(_Copy["default"], {
    color: copied ? theme.stringColor : theme.textColor,
    copied: copied,
    className: "icon"
  })));
}