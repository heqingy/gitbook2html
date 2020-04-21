package utils

import (
	"io"
	"os"
	"path"
	"path/filepath"
	"strings"
)

func checkFileIsExist(filename string) bool {
	var exist = true
	if _, err := os.Stat(filename); os.IsNotExist(err) {
		exist = false
	}
	return exist
}

func WhriteFile(filename string, content string) bool {
	var f *os.File
	if checkFileIsExist(filename) {
		f, _ = os.OpenFile(filename, os.O_APPEND|os.O_TRUNC|os.O_WRONLY, os.ModeAppend)
	} else {
		if !checkFileIsExist(filepath.Dir(filename)) {
			os.MkdirAll(filepath.Dir(filename), os.ModePerm)
		}
		f, _ = os.Create(filename)
	}

	_, wErr := io.WriteString(f, content)
	if wErr != nil {
		return false
	}
	return true
}

func GetOnlyName(fileName string) string {
	fullFilename := fileName
	filenameWithSuffix := path.Base(fullFilename)
	fileSuffix := path.Ext(filenameWithSuffix)
	filenameOnly := strings.TrimSuffix(filenameWithSuffix, fileSuffix)
	return filenameOnly
}
