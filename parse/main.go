package main

import (
	"fmt"
	"gitbook/parse/formatter"
	"gitbook/parse/zip"
	"io/ioutil"
	"log"
	"os"
	"path"
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
		upzipSourceFiles(fileinfoList[i].Name())
		getProjectVersionList(getOnlyName(fileinfoList[i].Name()))
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
	upzipFilePath := sourcePath + getOnlyName(fileName)
	zip.Unzip(zipFilePath, upzipFilePath)
}

// 获取目标项目待解析版本信息
func getProjectVersionList(project string) []os.FileInfo {
	versionPath := sourcePath + project + "/versions"
	targetVersionPath := distPath + project + "/versions"
	fileinfoList, err := ioutil.ReadDir(versionPath)
	if err != nil {
		log.Fatal(err)
	}

	for i := range fileinfoList {
		versionName := fileinfoList[i].Name()
		formatTargetVersion(versionPath+"/"+versionName, targetVersionPath+"/"+versionName)
	}

	return fileinfoList
}

// 获得指定版本内的json文件
func formatTargetVersion(versionPath string, targetDir string) []os.FileInfo {
	fileinfoList, err := ioutil.ReadDir(versionPath)
	if err != nil {
		log.Fatal(err)
	}
	for i := range fileinfoList {
		fileName := fileinfoList[i].Name()
		parseJSON(versionPath+"/"+fileName, targetDir)
	}
	return fileinfoList
}

// 解析json,并在指定目录生成对应的.html/.tsx
func parseJSON(jsonPath string, targetPath string) {
	fmt.Println(formatter.Parser(jsonPath))
}

func getOnlyName(fileName string) string {
	fullFilename := fileName
	filenameWithSuffix := path.Base(fullFilename)
	fileSuffix := path.Ext(filenameWithSuffix)
	filenameOnly := strings.TrimSuffix(filenameWithSuffix, fileSuffix)
	return filenameOnly
}
