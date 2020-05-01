package h

// RenderHTMLTemplate html模板
func RenderHTMLTemplate(bundlePath string) string {
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

// RenderTsxTemplate tsx模板
func RenderTsxTemplate(dom string) string {
	return `
	import * as React from 'react'
	import * as ReactDom from 'react-dom'

	// MarkDown render parts
	import { Document } from '@parts/Document.tsx';
	import { Block } from '@parts/block/index.tsx';
	import { Text } from '@parts/Text.tsx';
	import { Inline } from '@parts/Inline.tsx';

	const SOURCE_ELEMENT = ` + dom + `

	ReactDom.render(SOURCE_ELEMENT, document.getElementById('app'));
	`
}
