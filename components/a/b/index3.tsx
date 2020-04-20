import * as React from 'react'
import * as ReactDom from 'react-dom'

// MarkDown render parts
import { Link } from '../../parts/Link';

const SOURCE_ELEMENT = <Link>22</Link>

ReactDom.render(SOURCE_ELEMENT, document.getElementById('app'));