package formatter

//RenderDocument renderDocument
func RenderDocument(n *NodeTree, child string) string {
	attr := [1]Attr{{
		key:   "type",
		value: n.Type,
	}}
	return h("Document", child, attr)
}
