package h

// Attr 属性结构
type Attr struct {
	Key   string
	Value string
}

// H render dom
func H(eleName string, child string, attr [1]Attr) string {
	return "<" + eleName + A(attr) + ">" + child + "</" + eleName + ">"
}

// A 处理节点属性
func A(attr [1]Attr) string {
	a := " "
	if len(attr) > 0 {
		for i := range attr {
			a += attr[i].Key + `="` + attr[i].Value + `"`
		}
	}
	return a
}
