package formatter

import (
	"gitbook/parse/h"
)

//RenderInline renderInline
func RenderInline(n *NodeTree, child string) string {
	typeAttr := [1]h.AttrStringStruct{{
		Key:   "type",
		Value: n.Type,
	}}
	text := ""

	if (n.Data != Data{}) {
		attr := [1]h.AttrInterfaceStruct{{
			Key:   "data",
			Value: n.Data,
		}}
		text += h.H("Inline", child, h.AttrString(typeAttr)+h.AttrInterface(attr))
	} else {
		text += h.H("Inline", child, h.AttrString(typeAttr))
	}
	return text
}
