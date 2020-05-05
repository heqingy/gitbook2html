package h

func RenderHTMLTemplate(bundleName string) string {
	return `
	<!DOCTYPE html>
	<html lang="en">
	
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<link rel="stylesheet" type="text/css" href="../../modules/Antd.css" />
		<link rel="stylesheet" type="text/css" href="../../modules/katex.min.css" />
		<script type="text/javascript" src="../../modules/React.js"></script>
		<script type="text/javascript" src="../../modules/ReactDOM.js"></script>
		<script type="text/javascript" src="../../modules/Antd.js"></script>

		<script type="text/javascript" src='./pageRoutes.js'></script>
		<script type="text/javascript">
			const pageName = "` + bundleName + `"
		</script>
		<title>Document</title>
	</head>
	
	<body>
		<div id='app'></div>
		<script type="text/javascript" src="./` + bundleName + `.js"></script>
	</body>
	
	</html>
	`
}

func RenderTsxTemplate(dom string) string {
	return `
	import * as React from 'react'
	import * as ReactDom from 'react-dom'

	// MarkDown render parts
	import { Document } from '@parts/Document.tsx';
	import { Block } from '@parts/block/index.tsx';
	import { Text } from '@parts/Text.tsx';
	import { Inline } from '@parts/Inline.tsx';
	import { Nav } from '@parts/Nav.tsx';

	const SOURCE_ELEMENT = <Nav>` + dom + `</Nav>

	ReactDom.render(SOURCE_ELEMENT, document.getElementById('app'));
	`
}
