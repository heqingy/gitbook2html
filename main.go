package main

import (
	"flag"
	"fmt"
	"io/ioutil"
	"log"
	"os"
	"path/filepath"
	"strings"
)

type Config struct {
	ZipFile string
	Workdir string
}

type TaskInfo struct {
	ZipPath        string
	SrcPath        string
	DistPath       string
	ModulesPath    string
	ComponentsPath string
}

func (c *Config) TaskInfo() *TaskInfo {
	t := TaskInfo{
		ZipPath:        filepath.Join(c.Workdir, "zip"),
		SrcPath:        filepath.Join(c.Workdir, "source"),
		DistPath:       filepath.Join(c.Workdir, "dist"),
		ModulesPath:    filepath.Join(c.Workdir, "modules"),
		ComponentsPath: filepath.Join(c.Workdir, "components"),
	}
	return &t
}

var cfg Config
var task *TaskInfo

func main() {

	flag.StringVar(&cfg.ZipFile, "zip", "./gitbook.zip", "gitbook exported zip file path")
	flag.StringVar(&cfg.Workdir, "dir", "./", "working directory")
	flag.Parse()

	task = cfg.TaskInfo()
	unzipSourceFiles(cfg.ZipFile)
	getProjectVersionList(GetOnlyName(cfg.ZipFile))
}

// 解压待处理文件
func unzipSourceFiles(fileName string) {
	Unzip(cfg.ZipFile, filepath.Join(task.SrcPath, GetOnlyName(fileName)))
}

// 获取目标项目待解析版本信息
func getProjectVersionList(project string) []os.FileInfo {
	basePath := filepath.Join(task.SrcPath, project)
	targetBasePath := filepath.Join(task.DistPath, project)
	versionPath := basePath + "/versions"
	targetVersionPath := targetBasePath + "/versions"

	fileinfoList, err := ioutil.ReadDir(versionPath)

	// Paste the source code into the pre-process directory
	CopyPath(task.ModulesPath, filepath.Join(targetBasePath, "/modules"))
	CopyPath(basePath, targetBasePath)

	if err != nil {
		log.Fatal(err)
	}
	for i := range fileinfoList {
		versionName := fileinfoList[i].Name()
		if !strings.Contains(filepath.Join(versionPath, versionName), ".DS_Store") {
			formatTargetVersion(
				filepath.Join(versionPath, versionName),
				filepath.Join(targetVersionPath, versionName),
			)
		}
	}

	return fileinfoList
}

// 获得指定版本内的json文件
func formatTargetVersion(versionPath string, targetDir string) []os.FileInfo {
	fileinfoList, err := ioutil.ReadDir(versionPath)

	if err != nil {
		log.Fatal(err, versionPath)
	}
	for i := range fileinfoList {
		fileName := fileinfoList[i].Name()
		version := strings.Split(versionPath, "/")
		parseJSON(filepath.Join(versionPath, fileName), targetDir, version[len(version)-1])
	}
	return fileinfoList
}

// 解析json,并在指定目录生成对应的.html/.tsx
func parseJSON(jsonPath string, targetPath string, version string) {
	onlyFileName := GetOnlyName(jsonPath)
	if WriteFile(filepath.Join(targetPath, onlyFileName+".html"), makeHTML(jsonPath, version)) {
		fmt.Println(onlyFileName, "html创建成功")
	} else {
		fmt.Println(onlyFileName, "html创建失败")
	}
	if WriteFile(filepath.Join(targetPath, onlyFileName+".tsx"), makeTSX(jsonPath)) {
		fmt.Println(onlyFileName, "tsx创建成功")
	} else {
		fmt.Println(onlyFileName, "tsx创建失败")
	}

}

func makeHTML(jsonPath string, version string) string {
	return RenderHTMLTemplate(GetOnlyName(jsonPath), version)
}

func makeTSX(jsonPath string) string {
	htmlDom := Parser(jsonPath)
	return RenderTsxTemplate(htmlDom)
}
