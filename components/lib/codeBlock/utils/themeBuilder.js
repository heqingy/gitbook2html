"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.applyTheme = applyTheme;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _defaultTheme = require("../themes/defaultTheme");

var codeFontFamily = "inherit";
var fontSize = "inherit";
var codeContainerStyle = {
  fontSize: fontSize,
  fontFamily: codeFontFamily,
  lineHeight: 20 / 14,
  padding: 8
};

var lineNumberContainerStyle = function lineNumberContainerStyle(theme) {
  return {
    fontSize: fontSize,
    lineHeight: 20 / 14,
    color: theme.lineNumberColor,
    backgroundColor: theme.lineNumberBgColor,
    flexShrink: 0,
    padding: 8,
    textAlign: "right",
    userSelect: "none"
  };
};

var sharedCodeStyle = function sharedCodeStyle(theme) {
  return {
    key: {
      color: theme.keywordColor,
      fontWeight: "bolder"
    },
    keyword: {
      color: theme.keywordColor,
      fontWeight: "bolder"
    },
    'attr-name': {
      color: theme.attributeColor
    },
    selector: {
      color: theme.selectorTagColor
    },
    comment: {
      color: theme.commentColor,
      fontFamily: codeFontFamily,
      fontStyle: "italic"
    },
    'block-comment': {
      color: theme.commentColor,
      fontFamily: codeFontFamily,
      fontStyle: "italic"
    },
    'function-name': {
      color: theme.sectionColor
    },
    'class-name': {
      color: theme.sectionColor
    },
    doctype: {
      color: theme.docTagColor
    },
    substr: {
      color: theme.substringColor
    },
    namespace: {
      color: theme.nameColor
    },
    builtin: {
      color: theme.builtInColor
    },
    entity: {
      color: theme.literalColor
    },
    bullet: {
      color: theme.bulletColor
    },
    code: {
      color: theme.codeColor
    },
    addition: {
      color: theme.additionColor
    },
    regex: {
      color: theme.regexpColor
    },
    symbol: {
      color: theme.symbolColor
    },
    variable: {
      color: theme.variableColor
    },
    url: {
      color: theme.linkColor
    },
    'selector-attr': {
      color: theme.selectorAttributeColor
    },
    'selector-pseudo': {
      color: theme.selectorPseudoColor
    },
    type: {
      color: theme.typeColor
    },
    string: {
      color: theme.stringColor
    },
    quote: {
      color: theme.quoteColor
    },
    tag: {
      color: theme.templateTagColor
    },
    deletion: {
      color: theme.deletionColor
    },
    title: {
      color: theme.titleColor
    },
    section: {
      color: theme.sectionColor
    },
    'meta-keyword': {
      color: theme.metaKeywordColor
    },
    meta: {
      color: theme.metaColor
    },
    italic: {
      fontStyle: "italic"
    },
    bold: {
      fontWeight: "bolder"
    },
    "function": {
      color: theme.functionColor
    },
    number: {
      color: theme.numberColor
    }
  };
};

var codeStyle = function codeStyle(theme) {
  return {
    fontSize: fontSize,
    fontFamily: codeFontFamily,
    background: theme.backgroundColor,
    color: theme.textColor,
    borderRadius: 3,
    display: "flex",
    lineHeight: 20 / 14,
    overflowX: "auto",
    whiteSpace: "pre"
  };
};

var codeBlockStyle = function codeBlockStyle(theme) {
  return (0, _objectSpread2["default"])({
    'pre[class*="language-"]': codeStyle(theme)
  }, sharedCodeStyle(theme));
};

var inlineCodeStyle = function inlineCodeStyle(theme) {
  return (0, _objectSpread2["default"])({
    'pre[class*="language-"]': (0, _objectSpread2["default"])({}, codeStyle(theme), {
      padding: "2px 4px",
      display: "inline",
      whiteSpace: "pre-wrap"
    })
  }, sharedCodeStyle(theme));
};

function applyTheme() {
  var theme = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var newTheme = (0, _objectSpread2["default"])({}, (0, _defaultTheme.defaultColors)(theme), theme);
  return {
    lineNumberContainerStyle: lineNumberContainerStyle(newTheme),
    codeBlockStyle: codeBlockStyle(newTheme),
    inlineCodeStyle: inlineCodeStyle(newTheme),
    codeContainerStyle: codeContainerStyle
  };
}