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

const deepFindParent = (pages, targetPath, container) => {
    for (let i = 0; i < pages.length; i++) {
        const page = pages[i]
        if (!page) {
            container.push({
                uid: `error_page_${targetPath}`,
                isGroup: false
            })
            continue
        }
        if (page.path === targetPath) {
            container.push({
                uid: page.uid,
                isGroup: !!page.pages && !!page.pages.length
            })
        }

        if (!!page.pages && !!page.pages.length) {
            deepFindParent(page.pages, targetPath, container)
        }
    }
}

const makeAppRoot = (app, appFullPath) => {
    const appRootPath = `${appFullPath}/_appRoute.tsx`
    const versionDirPath = `${appFullPath}/versions`
    // version route
    const versionList = findAllVersionsWithApp(versionDirPath).map((v, i) => {
        fs.statSync(`${versionDirPath}/${v}`).isDirectory() && makeVersionRoot(v, appFullPath)

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

const makeVersionRoot = (version, appFullPath) => {
    const versionPath = `${appFullPath}/versions/${version}`
    const versionRootPath = `${versionPath}/_versionRoute.tsx`
    const nullPage = []

    const pagesList = fs.readdirSync(versionPath).filter(p => String(p).endsWith('.tsx') && !String(p).includes("_versionRoute")).map((p, i) => {
        const reversionJSON = require(`${appFullPath}/revision.json`);
        const targetPath = getTsxFileName(p);
        const currentVersion = reversionJSON.versions[version];
        let currentUid = targetPath
        if (!!currentVersion && !!currentVersion.page && currentVersion.page.path === targetPath) {
            currentUid = currentVersion.page.uid
        } else if (!!currentVersion && !!currentVersion.page && currentVersion.page.pages) {
            const container = []
            deepFindParent(currentVersion.page.pages, targetPath, container)
            if (container.length > 1) {
                const page = container.find(p => !p.isGroup)
                if (!!page) {
                    currentUid = page.uid
                }
                const group = container.find(p => !!p.isGroup)
                if (!!group) {
                    nullPage.push(group.uid)
                }
            } else if (container.length === 1) {
                currentUid = container[0].uid
            }
        }

        return {
            component: `Page_${i}`,
            importPath: `import Page_${i} from './${getTsxFileName(p)}';`,
            pagePath: targetPath,
            pageUid: currentUid,
        }
    })

    const content = `
	import * as React from 'react'
    import { Route, withRouter, Redirect, Switch } from 'react-router';
    import { Sider } from '@parts/Sider.tsx';
	import { Header } from '@parts/Header.tsx';
    ${pagesList.map(v => v.importPath).join('\n')}

    export default withRouter(props => {
        return <Switch>
            ${pagesList.map(p => `<Route path={\`\$\{props.match.url\}/${p.pageUid}\`} exact component={${p.component}} />`).join('\n')}
            ${nullPage.map(uid => `<Route path={\`\$\{props.match.url\}/${uid}\`} exact render={()=><Header><Sider></Sider></Header>} />`).join('\n')}
            <Redirect to={\`\$\{props.match.url\}/${pagesList.find(p => p.pagePath === 'master').pageUid}\`\}/>
        </Switch>
    })
    `

    fs.writeFileSync(versionRootPath, content)
}


main()

function getTsxFileName(fileName) {
    return String(fileName).replace('.tsx', "")
}