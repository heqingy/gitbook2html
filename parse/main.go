package main

import (
	"fmt"
	"gitbook/parse/formatter"
	"gitbook/parse/h"
	"gitbook/parse/utils"
	"gitbook/parse/zip"
	"io/ioutil"
	"log"
	"os"
	"path/filepath"
	"strings"
)

var pwd, _ = os.Getwd()
var zipPath = filepath.Join(pwd, "../zip/") + "/"
var sourcePath = filepath.Join(pwd, "../source/") + "/"
var distPath = filepath.Join(pwd, "../dist/") + "/"

func main() {
	fileinfoList := getAllZipFile()

	for i := range fileinfoList {
		fileName := fileinfoList[i].Name()
		if fileName == ".DS_Store" {
			continue
		}
		upzipSourceFiles(fileName)
		getProjectVersionList(utils.GetOnlyName(fileName))
	}
}

// 获得待解压文件信息
func getAllZipFile() []os.FileInfo {
	fileinfoList, err := ioutil.ReadDir(zipPath)
	if err != nil {
		log.Fatal(err)
	}
	return fileinfoList
}

// 解压待处理文件
func upzipSourceFiles(fileName string) {
	zipFilePath := zipPath + fileName
	zip.Unzip(zipFilePath, sourcePath)
}

// 获取目标项目待解析版本信息
func getProjectVersionList(project string) []os.FileInfo {
	basePath := sourcePath + project
	targetBasePath := distPath + project
	versionPath := basePath + "/versions"
	targetVersionPath := targetBasePath + "/versions"

	fileinfoList, err := ioutil.ReadDir(versionPath)

	// Paste the source code into the pre-process directory
	utils.CopyPath(basePath, targetBasePath)

	if err != nil {
		log.Fatal(err)
	}
	for i := range fileinfoList {
		versionName := fileinfoList[i].Name()

		if idx := strings.Index(versionPath+"/"+versionName, ".DS_Store"); idx == -1 {
			formatTargetVersion(versionPath+"/"+versionName, targetVersionPath+"/"+versionName)
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
		parseJSON(versionPath+"/"+fileName, targetDir)
	}
	return fileinfoList
}

// 解析json,并在指定目录生成对应的.html/.tsx
func parseJSON(jsonPath string, targetPath string) {
	onlyFileName := utils.GetOnlyName(jsonPath)

	makeHtmlStatus := utils.WhriteFile(targetPath+"/"+onlyFileName+".html", makeHTML(jsonPath))
	makeTsxStatus := utils.WhriteFile(targetPath+"/"+onlyFileName+".tsx", makeTSX(jsonPath))
	if makeHtmlStatus {
		fmt.Println(onlyFileName, "html创建成功")
	} else {
		fmt.Println(onlyFileName, "html创建失败")
	}
	if makeTsxStatus {
		fmt.Println(onlyFileName, "tsx创建成功")
	} else {
		fmt.Println(onlyFileName, "tsx创建失败")
	}

}

func makeHTML(jsonPath string) string {
	return h.RenderHTMLTemplate(`"./` + utils.GetOnlyName(jsonPath) + `.js"`)
}

func makeTSX(jsonPath string) string {
	htmlDom := formatter.Parser(jsonPath)
	if htmlDom == "none" {
		htmlDom = "<div>无渲染内容</div>"
	}
	return h.RenderTsxTemplate(htmlDom)
}
