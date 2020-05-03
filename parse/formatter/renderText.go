package formatter

import (
	"gitbook/parse/h"
)

func RenderText(n *NodeTree, child string) string {
	text := ""
	if len(n.Ranges) > 0 {
		for i := range n.Ranges {
			if len(n.Ranges[i].Marks) > 0 {
				attr := [1]h.AttrInterfaceStruct{{
					Key:   "marks",
					Value: n.Ranges[i].Marks,
				}}
				text += h.H("Text", n.Ranges[i].Text, h.AttrInterface(attr))
			} else {
				text += h.H("Text", n.Ranges[i].Text, "")
			}
		}
	}
	return text
}
