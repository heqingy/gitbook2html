package formatter

import (
	"gitbook/parse/h"
)

func RenderInline(n *NodeTree, child string) string {
	typeAttr := [1]h.AttrStringStruct{{
		Key:   "type",
		Value: n.Type,
	}}

	attrWithKey := [1]h.AttrInterfaceStruct{{
		Key:   "key",
		Value: n.Key,
	}}

	text := ""

	if (n.Data != Data{}) {
		attr := [1]h.AttrInterfaceStruct{{
			Key:   "data",
			Value: n.Data,
		}}
		text += h.H("Inline", child, h.AttrString(typeAttr)+h.AttrInterface(attr)+h.AttrInterface(attrWithKey))
	} else {
		text += h.H("Inline", child, h.AttrString(typeAttr)+h.AttrInterface(attrWithKey))
	}
	return text
}
