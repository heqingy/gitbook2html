package formatter

import (
	"gitbook/parse/h"
)

func RenderBlock(n *NodeTree, child string) string {
	attrWithType := [1]h.AttrStringStruct{{
		Key:   "type",
		Value: n.Type,
	}}
	attrWithData := [1]h.AttrInterfaceStruct{{
		Key:   "data",
		Value: n.Data,
	}}
	attrWithKey := [1]h.AttrInterfaceStruct{{
		Key:   "key",
		Value: n.Key,
	}}
	return h.H("Block", child, h.AttrString(attrWithType)+h.AttrInterface(attrWithData)+h.AttrInterface(attrWithKey))
}
