export function findPage(v?: string, k?: keyof PageInfo): PageInfo | undefined {
    const key = k! || "uid"
    if (!v) {
        return undefined
    }
    if (pageRoutes?.page?.[key] === v) {
        return pageRoutes?.page
    } else {
        return mapPageInfo(pageRoutes?.page, v, k)
    }
}

function mapPageInfo(page: PageInfo, v: string, k?: keyof PageInfo): PageInfo | undefined {
    const key = k! || "uid"
    if (!page) {
        return undefined
    }

    const targetPage = page.pages.find(p => p[key] === v)
    if (!!targetPage) {
        return targetPage
    }

    for (let i = 0; i < page.pages.length; i++) {
        if (!!page.pages?.length && mapPageInfo(page.pages[i], v, k)) {
            return mapPageInfo(page.pages[i], v, k)
        }
    }
}