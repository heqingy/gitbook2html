package formatter

//RenderText renderText
func RenderText(n *NodeTree, child string) string {
	text := ""
	if len(n.Ranges) > 0 {
		for i := range n.Ranges {
			text += n.Ranges[i].Text
		}
	}
	return "<Text>" + text + child + "</Text>"
}
