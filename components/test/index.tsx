import * as React from 'react'
import * as ReactDom from 'react-dom'
import 'antd/dist/antd.css';

// MarkDown render parts
import { Document } from '@parts/Document.tsx';
import { Block } from '@parts/block/index.tsx';
import { Text } from '@parts/Text.tsx';
import { Inline } from '@parts/Inline.tsx';

const App = () => {
    return <Document type="">
        <Block type="paragraph"><Text>Paragraph</Text></Block>
        <Block type="paragraph"><Text marks={[{ "kind": "mark", "type": "bold", "data": {} }]}>Paragraph bold</Text></Block>
        <Block type="paragraph"><Text
            marks={[{ "kind": "mark", "type": "bold", "data": {} }, { "kind": "mark", "type": "italic", "data": {} }]}>Paragraph
        </Text><Text marks={[{ "kind": "mark", "type": "bold", "data": {} }]}>ltalic</Text></Block>
        <Block type="paragraph"><Text
            marks={[{ "kind": "mark", "type": "bold", "data": {} }, { "kind": "mark", "type": "italic", "data": {} }, { "kind": "mark", "type": "strikethrough", "data": {} }]}>Paragraph
        </Text><Text
                marks={[{ "kind": "mark", "type": "bold", "data": {} }, { "kind": "mark", "type": "strikethrough", "data": {} }]}>delete</Text>
        </Block>
        <Block type="paragraph"><Text marks={[{ "kind": "mark", "type": "code", "data": {} }]}>Paragraph code</Text></Block>
        <Block type="paragraph"><Text></Text>
            <Inline type="link" data={{ "href": "https://www.baidu.com" }}><Text>Paragraph link</Text></Inline><Text></Text>
        </Block>
        <Block type="heading-1"><Text>heading 1</Text></Block>
        <Block type="heading-2"><Text>heading 2</Text></Block>
        <Block type="heading-3"><Text>heading 3</Text></Block>
        <Block type="list-unordered">
            <Block type="list-item">
                <Block type="paragraph"><Text>bulleted list 1</Text></Block>
            </Block>
            <Block type="list-item">
                <Block type="paragraph"><Text>bulleted list 2</Text></Block>
                <Block type="list-unordered">
                    <Block type="list-item">
                        <Block type="paragraph"><Text>bulleted list 2 - 1 </Text></Block>
                    </Block>
                    <Block type="list-item">
                        <Block type="paragraph"><Text>bulleted list 2 - 2</Text></Block>
                        <Block type="list-unordered">
                            <Block type="list-item">
                                <Block type="paragraph"><Text>bulleted list 2 - 2 - 1</Text></Block>
                            </Block>
                            <Block type="list-item">
                                <Block type="paragraph"><Text>bulleted list 2 - 2 - 2</Text></Block>
                                <Block type="list-unordered">
                                    <Block type="list-item">
                                        <Block type="paragraph"><Text>bulleted list 2 - 2 - 2 - 1</Text></Block>
                                    </Block>
                                    <Block type="list-item">
                                        <Block type="paragraph"><Text>bulleted list 2 - 2 - 2 - 2</Text></Block>
                                        <Block type="list-unordered">
                                            <Block type="list-item">
                                                <Block type="paragraph"><Text>bulleted list 2 - 2 - 2 - 2 - 1</Text></Block>
                                                <Block type="list-unordered">
                                                    <Block type="list-item">
                                                        <Block type="paragraph"><Text>end</Text></Block>
                                                    </Block>
                                                </Block>
                                            </Block>
                                        </Block>
                                    </Block>
                                </Block>
                            </Block>
                        </Block>
                    </Block>
                    <Block type="list-item">
                        <Block type="paragraph"><Text>bulleted list 2 - 3</Text></Block>
                    </Block>
                </Block>
                <Block type="paragraph"><Text></Text></Block>
            </Block>
            <Block type="list-item">
                <Block type="paragraph"><Text>bulleted list 3</Text></Block>
            </Block>
            <Block type="list-item">
                <Block type="paragraph"><Text>bulleted list 4</Text></Block>
            </Block>
        </Block>
        <Block type="list-ordered">
            <Block type="list-item">
                <Block type="paragraph"><Text>ordered list 1</Text></Block>
                <Block type="list-ordered">
                    <Block type="list-item">
                        <Block type="paragraph"><Text>ordered list 1 - 1</Text></Block>
                        <Block type="list-ordered">
                            <Block type="list-item">
                                <Block type="paragraph"><Text>ordered list 1 - 1 - 1</Text></Block>
                                <Block type="list-ordered">
                                    <Block type="list-item">
                                        <Block type="paragraph"><Text>ordered list 1 - 1 - 1 - 1</Text></Block>
                                    </Block>
                                </Block>
                                <Block type="paragraph"><Text> </Text></Block>
                            </Block>
                        </Block>
                    </Block>
                    <Block type="list-item">
                        <Block type="paragraph"><Text>ordered list 1 - 2</Text></Block>
                    </Block>
                    <Block type="list-item">
                        <Block type="paragraph"><Text>ordered list 1 - 3</Text></Block>
                    </Block>
                </Block>
            </Block>
            <Block type="list-item">
                <Block type="paragraph"><Text>ordered list 2</Text></Block>
                <Block type="list-ordered">
                    <Block type="list-item">
                        <Block type="paragraph"><Text>ordered list 2 - 1</Text></Block>
                    </Block>
                    <Block type="list-item">
                        <Block type="paragraph"><Text>ordered list 2 - 2</Text></Block>
                    </Block>
                </Block>
            </Block>
        </Block>
        <Block type="list-unordered">
            <Block type="list-item" data={{ "checked": false }}>
                <Block type="paragraph"><Text>task list</Text></Block>
            </Block>
            <Block type="list-item" data={{ "checked": false }}>
                <Block type="paragraph"><Text>task list</Text></Block>
                <Block type="list-unordered">
                    <Block type="list-item" data={{ "checked": false }}>
                        <Block type="paragraph"><Text>task list</Text></Block>
                        <Block type="list-unordered">
                            <Block type="list-item" data={{ "checked": false }}>
                                <Block type="paragraph"><Text>task list</Text></Block>
                                <Block type="list-unordered">
                                    <Block type="list-item" data={{ "checked": false }}>
                                        <Block type="paragraph"><Text>task list</Text></Block>
                                    </Block>
                                </Block>
                            </Block>
                            <Block type="list-item" data={{ "checked": false }}>
                                <Block type="paragraph"><Text>task list</Text></Block>
                            </Block>
                            <Block type="list-item" data={{ "checked": false }}>
                                <Block type="paragraph"><Text>task list</Text></Block>
                            </Block>
                        </Block>
                    </Block>
                </Block>
            </Block>
            <Block type="list-item" data={{ "checked": true }}>
                <Block type="paragraph"><Text>task list (checked)</Text></Block>
                <Block type="list-unordered">
                    <Block type="list-item" data={{ "checked": false }}>
                        <Block type="paragraph"><Text>task list</Text></Block>
                        <Block type="list-unordered">
                            <Block type="list-item" data={{ "checked": true }}>
                                <Block type="paragraph"><Text>task list (checked)</Text></Block>
                            </Block>
                        </Block>
                    </Block>
                    <Block type="list-item" data={{ "checked": true }}>
                        <Block type="paragraph"><Text>task list (checked)</Text></Block>
                    </Block>
                </Block>
            </Block>
        </Block>
        <Block type="code">
            <Block type="code-line"><Text>code block (支持多语言)</Text></Block>
            <Block type="code-line"><Text>111</Text></Block>
            <Block type="code-line"><Text>111</Text></Block>
            <Block type="code-line"><Text>11</Text></Block>
        </Block>
        <Block type="blockquote">
            <Block type="paragraph"><Text>Quote 1</Text></Block>
            <Block type="blockquote">
                <Block type="paragraph"><Text>Quote 2</Text></Block>
                <Block type="blockquote">
                    <Block type="paragraph"><Text>Quote 3 - 1</Text></Block>
                    <Block type="paragraph"><Text>Quote 3 - 2 </Text></Block>
                    <Block type="blockquote">
                        <Block type="paragraph"><Text>Quote 3 -3 - 1</Text></Block>
                        <Block type="blockquote">
                            <Block type="paragraph"><Text>Quote 3 - 4 - 2 - 1</Text></Block>
                        </Block>
                    </Block>
                    <Block type="blockquote">
                        <Block type="blockquote">
                            <Block type="blockquote">
                                <Block type="paragraph"><Text>Quote 3 - 5 - 3 - 2 - 1</Text></Block>
                            </Block>
                        </Block>
                    </Block>
                    <Block type="paragraph"><Text>Quote 3 - 6</Text></Block>
                    <Block type="blockquote">
                        <Block type="paragraph"><Text>Quote 3 - 7 - 1</Text></Block>
                    </Block>
                </Block>
            </Block>
        </Block>
        <Block type="image" data={{ "assetID": "-M5Q9B2crYznyX5yghuy", "caption": "炸心管" }}><Text></Text></Block>
        <Block type="table" data={{ "aligns": ["right", "left", "center", "left"] }}>
            <Block type="table-row">
                <Block type="table-cell">
                    <Block type="paragraph"><Text>column 1</Text></Block>
                </Block>
                <Block type="table-cell">
                    <Block type="paragraph"><Text>column 2</Text></Block>
                </Block>
                <Block type="table-cell">
                    <Block type="paragraph"><Text>column 3</Text></Block>
                </Block>
                <Block type="table-cell">
                    <Block type="paragraph"><Text>column 4</Text></Block>
                </Block>
            </Block>
            <Block type="table-row">
                <Block type="table-cell">
                    <Block type="paragraph"><Text>Paragraph</Text></Block>
                </Block>
                <Block type="table-cell">
                    <Block type="paragraph"><Text>Paragraph</Text></Block>
                </Block>
                <Block type="table-cell">
                    <Block type="paragraph"><Text></Text></Block>
                </Block>
                <Block type="table-cell">
                    <Block type="paragraph"><Text></Text>
                        <Inline type="link" data={{ "href": "https://www.baidu.com" }}><Text>Paragraph link</Text></Inline>
                        <Text></Text>
                    </Block>
                </Block>
            </Block>
            <Block type="table-row">
                <Block type="table-cell">
                    <Block type="paragraph"><Text marks={[{ "kind": "mark", "type": "bold", "data": {} }]}></Text></Block>
                </Block>
                <Block type="table-cell">
                    <Block type="paragraph"><Text marks={[{ "kind": "mark", "type": "bold", "data": {} }]}>Paragraph bold</Text>
                    </Block>
                </Block>
                <Block type="table-cell">
                    <Block type="paragraph"><Text marks={[{ "kind": "mark", "type": "strikethrough", "data": {} }]}>Paragraph
                        delete</Text></Block>
                </Block>
                <Block type="table-cell">
                    <Block type="paragraph"><Text></Text></Block>
                </Block>
            </Block>
            <Block type="table-row">
                <Block type="table-cell">
                    <Block type="paragraph"><Text
                        marks={[{ "kind": "mark", "type": "bold", "data": {} }, { "kind": "mark", "type": "italic", "data": {} }]}>Paragraph
                    </Text><Text marks={[{ "kind": "mark", "type": "bold", "data": {} }]}>ltalic</Text></Block>
                </Block>
                <Block type="table-cell">
                    <Block type="paragraph"><Text marks={[{ "kind": "mark", "type": "italic", "data": {} }]}>Paragraph
                    </Text><Text>ltalic</Text></Block>
                </Block>
                <Block type="table-cell">
                    <Block type="paragraph"><Text></Text></Block>
                </Block>
                <Block type="table-cell">
                    <Block type="paragraph"><Text marks={[{ "kind": "mark", "type": "code", "data": {} }]}>Paragraph</Text></Block>
                </Block>
            </Block>
        </Block>
        <Block type="hint" data={{ "style": "warning" }}>
            <Block type="heading-1"><Text>hint warning</Text></Block>
        </Block>
        <Block type="hint" data={{ "style": "danger" }}>
            <Block type="paragraph"><Text>hint danger</Text></Block>
        </Block>
        <Block type="hint" data={{ "style": "info" }}>
            <Block type="paragraph"><Text>hint info</Text></Block>
        </Block>
        <Block type="hint" data={{ "style": "success" }}>
            <Block type="paragraph"><Text>hint success</Text></Block>
        </Block>
        <Block type="page-ref" data={{ "page": "-M5QAMN0fvpH4HhfiwBN" }}><Text></Text></Block>
        <Block type="api-method">
            <Block type="api-method-summary"><Text>get test</Text></Block>
            <Block type="api-method-description"><Text></Text></Block>
            <Block type="api-method-spec">
                <Block type="api-method-request">
                    <Block type="api-method-path-parameters">
                        <Block type="api-method-parameter"><Text></Text></Block>
                    </Block>
                </Block>
                <Block type="api-method-response">
                    <Block type="api-method-response-example">
                        <Block type="api-method-response-example-description"><Text></Text></Block>
                        <Block type="code">
                            <Block type="code-line"><Text></Text></Block>
                        </Block>
                    </Block>
                </Block>
            </Block>
        </Block>
        <Block type="paragraph"><Text></Text></Block>
        <Block type="tabs">
            <Block type="tabs-item" data={{ "title": "1" }}>
                <Block type="paragraph"><Text>111</Text></Block>
                <Block type="heading-2"><Text marks={[{ "kind": "mark", "type": "strikethrough", "data": {} }]}>222</Text></Block>
            </Block>
            <Block type="tabs-item" data={{ "title": "2" }}>
                <Block type="paragraph"><Text></Text></Block>
            </Block>
            <Block type="tabs-item" data={{ "title": "3" }}>
                <Block type="paragraph"><Text marks={[{ "kind": "mark", "type": "bold", "data": {} }]}>ddddd</Text></Block>
            </Block>
            <Block type="tabs-item" data={{ "title": "4---4" }}>
                <Block type="heading-1"><Text>dasda</Text></Block>
            </Block>
        </Block>
        <Block type="math" data={{ "formula": "\\sqrt[n]{1+x+x^2+x^3+\\dots+x^n}" }}><Text></Text></Block>
        <Block type="file" data={{ "assetID": "-M5Q9B2crYznyX5yghuy" }}><Text></Text></Block>
    </Document>
}

ReactDom.render(<App />, document.getElementById('app'));