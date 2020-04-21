import * as React from 'react'
import * as ReactDom from 'react-dom'

// MarkDown render parts
import { Document } from '@parts/Document.tsx';
import { Block } from '@parts/Block.tsx';
import { Text } from '@parts/Text.tsx';
import { Inline } from '@parts/Inline.tsx';

const App = () => {
    return <Document>
        <Block type="paragraph"><Text>Paragraph</Text></Block>

        <Block type="paragraph"><Text marks={[{ "kind": "mark", "type": "bold", "data": {} }]}>Paragraph bold</Text></Block>
        <Block type="paragraph">
            <Text marks={[
                { "kind": "mark", "type": "bold", "data": {} },
                { "kind": "mark", "type": "italic", "data": {} }
            ]}>
                Paragraph
        </Text>
            <Text marks={[{ "kind": "mark", "type": "bold", "data": {} }]}>
                ltalic
                </Text>
        </Block>

        <Block type="paragraph">
            <Text
                marks={[{ "kind": "mark", "type": "bold", "data": {} }, { "kind": "mark", "type": "italic", "data": {} }, { "kind": "mark", "type": "strikethrough", "data": {} }]}>Paragraph
        </Text>
            <Text
                marks={[{ "kind": "mark", "type": "bold", "data": {} }, { "kind": "mark", "type": "strikethrough", "data": {} }]}>delete</Text>
        </Block>

        <Block type="paragraph"><Text marks={[{ "kind": "mark", "type": "code", "data": {} }]}>Paragraph code</Text></Block>

        <Block type="paragraph">
            <Text></Text>
            <Inline type="link" data={{ "href": "https://www.baidu.com" }}>
                <Text>Paragraph link</Text>
            </Inline>
            <Text></Text>
        </Block>
        <Block type="heading-1"><Text>heading 1</Text></Block>
        <Block type="heading-2"><Text>heading 2</Text></Block>
        <Block type="heading-3"><Text>heading 3</Text></Block>
    </Document>
}

ReactDom.render(<App />, document.getElementById('app'));