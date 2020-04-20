package formatter

type node interface {
	RenderHTML() string
	RenderChild() []NodeTree
}

//Render _
func Render(json NodeTree) string {
	return json.RenderHTML()
}

//RenderHTML _
func (n *NodeTree) RenderHTML() string {
	nodesResult := n.RenderNodes()

	switch n.Kind {
	case "document":
		return RenderDocument(n, nodesResult)
	case "block":
		return RenderBlock(n, nodesResult)
	case "text":
		return RenderText(n, nodesResult)
	case "inline":
		return RenderInline(n, nodesResult)
	case "mark":
		return RenderMark(n, nodesResult)
	}
	return "none"
}

//RenderNodes _
func (n *NodeTree) RenderNodes() string {
	result := ""

	if len(n.Nodes) > 0 {
		for i := range n.Nodes {
			result += n.Nodes[i].RenderHTML()
		}
	}
	return result
}
