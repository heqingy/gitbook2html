package formatter

import "gitbook/parse/h"

func RenderMark(n *NodeTree, child string) string {
	attrWithKey := [1]h.AttrInterfaceStruct{{
		Key:   "key",
		Value: n.Key,
	}}
	return h.H("Mark", child, ""+h.AttrInterface(attrWithKey))
}
