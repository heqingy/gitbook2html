package formatter

import (
	"gitbook/parse/h"
)

//RenderBlock renderBlock
func RenderBlock(n *NodeTree, child string) string {
	attrWithType := [1]h.AttrStringStruct{{
		Key:   "type",
		Value: n.Type,
	}}
	attrWithData := [1]h.AttrInterfaceStruct{{
		Key:   "data",
		Value: n.Data,
	}}
	return h.H("Block", child, h.AttrString(attrWithType)+h.AttrInterface(attrWithData))
}
