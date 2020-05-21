const fs = require('fs');
const path = require('path');
const sourcePath = path.join(__dirname, '../source');

const excludeFiles = ['.DS_Store', '.DS_Store']

function main() {
    const allApps = findAllApps()

    allApps.forEach(app => {
        makeAppRoot(app, `${sourcePath}/${app}`)
    })
}

const findAllApps = () => {
    return fs.readdirSync(sourcePath)
}

const findAllVersionsWithApp = (appPath) => {
    if (fs.existsSync(appPath) && fs.statSync(appPath).isDirectory()) {
        return fs.readdirSync(appPath) || []
    }
    return []
}

const makeAppRoot = (app, appFullPath) => {
    const appRootPath = `${appFullPath}/_appRoute.tsx`
    const versionDirPath = `${appFullPath}/versions`
    // version route
    const versionList = findAllVersionsWithApp(versionDirPath).map((v, i) => {
        fs.statSync(`${versionDirPath}/${v}`).isDirectory() && makeVersionRoot(v, `${versionDirPath}/${v}`)

        return {
            component: `Version_${i}`,
            importPath: `import Version_${i} from './versions/${v}/_versionRoute';`,
            version: getTsxFileName(v),
        }
    }) || []

    if (!versionList.length) {
        return;
    }

    const content = `
	import * as React from 'react'
	import * as ReactDom from 'react-dom'
    import { Route, Redirect, Switch } from 'react-router';
    import { BrowserRouter } from 'react-router-dom';
    ${versionList.map(v => v.importPath).join('\n')}
    const reversion = require('./revision.json');
    (window as any)['reversion'] = reversion;
    
	// versions
    const App = () => {
        const app = "${app}";

        return <BrowserRouter basename={\`\/source/\$\{app\}\`}>
            <Switch>
                ${versionList.map(v => `<Route path={\`/${v.version}\`} component={${v.component}} />`).join('\n')}
                <Redirect to={\`/${versionList[0].version}\`}/>
            </Switch>
        </BrowserRouter>
    }

    ReactDom.render(<App />, document.getElementById('root'));
    `

    fs.writeFileSync(appRootPath, content)
}

const makeVersionRoot = (verison, verisonPath) => {
    const versionRootPath = `${verisonPath}/_versionRoute.tsx`
    const pagesList = fs.readdirSync(verisonPath).filter(p => String(p).endsWith('.tsx') && !String(p).includes("_versionRoute")).map((p, i) => {
        return {
            component: `Page_${i}`,
            importPath: `import Page_${i} from './${getTsxFileName(p)}';`,
            page: getTsxFileName(p)
        }
    })

    const content = `
	import * as React from 'react'
    import { Route, withRouter, Redirect, Switch } from 'react-router';
    ${pagesList.map(v => v.importPath).join('\n')}

    export default withRouter(props => {
        return <Switch>
            ${pagesList.map(p => `<Route path={\`\$\{props.match.url\}/${p.page}\`} exact component={${p.component}} />`).join('\n')}
            <Redirect to={\`\$\{props.match.url\}/master\`\}/>
        </Switch>
    })
    `

    fs.writeFileSync(versionRootPath, content)
}


main()

function getTsxFileName(fileName) {
    return String(fileName).replace('.tsx', "")
}