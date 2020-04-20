### 构建流程

1. parse 构建ui树
2. ui components 基础库
--- 
1. 分析json文件，在dist目录写相应的html文件与对应的tsx文件(包含各ui模块引用,与SOURCE_ELEMENT)`文件名均为json文件名`

2. webpack进行编译

```
go run parse
pushd "./dist" > /dev/null
npx webpack
popd > /dev/null
```