package h

func RenderHtmlTemplate(bundlePath string) string {
	return `
	<!DOCTYPE html>
	<html lang="en">
	
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<title>Document</title>
	</head>
	
	<body>
		<div id='app'></div>
		<script type="text/javascript" src=` + bundlePath + `></script>
	</body>
	
	</html>
	`
}

func RenderTsxTemplate(dom string) string {
	return `
	import * as React from 'react'
	import * as ReactDom from 'react-dom'

	// MarkDown render parts
	import { Link } from '@parts/link.tsx';

	const SOURCE_ELEMENT = ` + dom + `

	ReactDom.render(SOURCE_ELEMENT, document.getElementById('app'));
	`
}
