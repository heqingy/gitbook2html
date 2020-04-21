package formatter

import "gitbook/parse/h"

//RenderDocument renderDocument
func RenderDocument(n *NodeTree, child string) string {
	attr := [1]h.AttrStringStruct{{
		Key:   "type",
		Value: n.Type,
	}}
	return h.H("Document", child, h.AttrString(attr))
}
