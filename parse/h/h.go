package h

import "encoding/json"

// AttrStringStruct string属性结构
type AttrStringStruct struct {
	Key   string
	Value string
}

// AttrInterfaceStruct string属性结构
type AttrInterfaceStruct struct {
	Key   string
	Value interface{}
}

// H render dom
func H(eleName string, child string, attr string) string {
	return "<" + eleName + attr + ">" + child + "</" + eleName + ">"
}

// AttrString 处理string节点属性
func AttrString(attr [1]AttrStringStruct) string {
	a := " "
	if len(attr) > 0 {
		for i := range attr {
			a += attr[i].Key + `="` + attr[i].Value + `" `
		}
	}
	return a
}

// AttrInterface 处理interface节点属性
func AttrInterface(attr [1]AttrInterfaceStruct) string {
	a := " "
	if len(attr) > 0 {
		for i := range attr {
			atr, _ := json.Marshal(attr[i].Value)
			if string(atr) == "{}" {
				continue
			}
			a += attr[i].Key + `={` + string(atr) + `} `
		}
	}
	return a
}
