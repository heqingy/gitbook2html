package formatter

// Attr 属性结构
type Attr struct {
	key   string
	value string
}

func h(eleName string, child string, attr [1]Attr) string {
	return "<" + eleName + A(attr) + ">" + child + "</" + eleName + ">"
}

// A 处理节点属性
func A(attr [1]Attr) string {
	a := " "
	if len(attr) > 0 {
		for i := range attr {
			a += attr[i].key + `="` + attr[i].value + `"`
		}
	}
	return a
}
