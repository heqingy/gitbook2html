package formatter

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
)

// NodeTree 节点树结构
type NodeTree struct {
	Kind  string      `json:"kind"`
	Key   string      `json:"key"`
	Data  interface{} `json:"data"`
	Nodes []NodeTree  `json:"nodes"`
}

// JSONInfo 源JSON结构
type JSONInfo struct {
	FormatVersion int64    `json:"format_version"`
	Document      NodeTree `json:"document"`
}

//Parser 解析json文件的入口
func Parser(jsonPath string) string {
	v := JSONInfo{}
	fmt.Println(jsonPath, "=====!!!")
	Load(jsonPath, &v)
	jm, _ := json.MarshalIndent(&v, "", " ")
	fmt.Println("formated: ", string(jm))

	return ""
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
