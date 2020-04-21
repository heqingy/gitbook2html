package formatter

import (
	"gitbook/parse/h"
)

//RenderBlock renderBlock
func RenderBlock(n *NodeTree, child string) string {
	attr := [1]h.AttrStringStruct{{
		Key:   "type",
		Value: n.Type,
	}}
	return h.H("Block", child, h.AttrString(attr))
}
