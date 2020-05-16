import * as React from 'react'
import * as ReactDOM from 'react-dom'

// MarkDown render parts
import { Document } from '@parts/Document.tsx';
import { Block } from '@parts/block/index.tsx';
import { Text } from '@parts/Text.tsx';
import { Inline } from '@parts/Inline.tsx';
import { Sider } from '@parts/Sider.tsx';

const App = () => {
    return <Sider><Document type=""  key={"098d3b302a0847169969f848d38d66a7"} ><Block type="paragraph"   key={"d3f6b05a4f44438bbe7ecf1c7706e7f5"} ><Text key={"93ad6de8bb3b408e94324e429a5c9c00"} >Updated Sep 14, 2019</Text></Block><Block type="paragraph"   key={"c76cdbf7f3234039a63f72cf58cdec9a"} ><Text key={"95595b2ee5b2428192d11e26328f4b4c"} >Graph algorithms are functions for measuring characteristics of graphs, vertices, or relationships. Graph algorithms can provide insights into the role or relevance of individual entities in a graph. For example: How centrally located is this vertex?  How much influence does this vertex exert over the others?</Text></Block><Block type="paragraph"   key={"dc954df9e05d40abbe69638750a06036"} ><Text key={"21797e208e7d4584895757ca2be4878b"} ></Text></Block><Block type="paragraph"   key={"dc954df9e05d40abbe69638750a06036"} ><Text key={"21797e208e7d4584895757ca2be4878b"} >111</Text></Block></Document></Sider>
}

ReactDOM.render(<App />, document.getElementById('app'));