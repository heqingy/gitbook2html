package formatter

import (
	"fmt"
	"gitbook/parse/h"
	"strings"
)

func RenderText(n *NodeTree, child string) string {
	attrWithKey := [1]h.AttrInterfaceStruct{{
		Key:   "key",
		Value: n.Key,
	}}
	text := ""
	if len(n.Ranges) > 0 {
		for i := range n.Ranges {
			content := n.Ranges[i].Text

			if strings.ContainsAny(content, "{&}&<&>&`") {
				content = fmt.Sprintf("{`%s`}", transfer(content, '{', '}', '<', '>', '`'))
			}

			if len(n.Ranges[i].Marks) > 0 {
				attr := [1]h.AttrInterfaceStruct{{
					Key:   "marks",
					Value: n.Ranges[i].Marks,
				}}
				text += h.H("Text", content, h.AttrInterface(attr)+h.AttrInterface(attrWithKey))
			} else {
				text += h.H("Text", content, ""+h.AttrInterface(attrWithKey))
			}
		}
	}
	return text
}

func transfer(s string, char ...byte) string {
	for i := 0; i < len(s); i++ {
		for _, c := range char {
			if s[i] == c {
				s = s[:i] + "\\" + s[i:]
				i++
			}
		}

	}
	return s
}
