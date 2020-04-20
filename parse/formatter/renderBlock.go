package formatter

//RenderBlock renderBlock
func RenderBlock(n *NodeTree, child string) string {
	attr := [1]Attr{{
		key:   "type",
		value: n.Type,
	}}
	return h("Block", child, attr)
}
