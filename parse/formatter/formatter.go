package formatter

import (
	"encoding/json"
	"io/ioutil"
)

// Marks 标记结构
type Marks struct {
	Kind string      `json:"kind"`
	Type string      `json:"type"`
	Data interface{} `json:"data"`
}

// Ranges 文本渲染结构
type Ranges struct {
	Kind  string  `json:"kind"`
	Text  string  `json:"text"`
	Marks []Marks `json:"marks"`
}

// NodeTree 节点树结构
type NodeTree struct {
	Kind   string      `json:"kind"`
	Type   string      `json:"type"`
	Key    string      `json:"key"`
	Data   interface{} `json:"data"`
	Nodes  []NodeTree  `json:"nodes"`
	Ranges []Ranges    `json:"ranges"`
}

// JSONInfo 源JSON结构
type JSONInfo struct {
	FormatVersion int64    `json:"format_version"`
	Document      NodeTree `json:"document"`
}

//Parser 解析json文件的入口
func Parser(jsonPath string) string {
	v := JSONInfo{}
	Load(jsonPath, &v)
	return Render(v.Document)
}

// Load 读取json文件
func Load(filename string, v interface{}) {
	data, err := ioutil.ReadFile(filename)
	if err != nil {
		return
	}

	err = json.Unmarshal(data, &v)
	if err != nil {
		return
	}
}
