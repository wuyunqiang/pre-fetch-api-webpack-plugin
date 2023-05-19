const { getCodeStr } = require("../build/index");

function getOption(optionList) {
    const res = [];
    optionList.forEach(item => {
        const urls = item.urls;
        const urlList = urls.map(urlItem => {
            if (typeof urlItem === 'string') {
                return {
                    url: urlItem,
                    method: (item.method || 'post').toUpperCase(),
                    params: item.params,
                    staticParams: item.staticParams,
                    cookieParams: item.cookieParams,
                };
            }
            return {
                url: urlItem.url,
                method: (urlItem.method || item.method || 'post').toUpperCase(),
                params: { ...item.params, ...urlItem.params },
                staticParams: { ...item.staticParams, ...urlItem.staticParams },
                cookieParams: {
                    ...item.cookieParams,
                    ...urlItem.cookieParams,
                },
            };
        });

        res.push({
            pathList: item.pathList || [],
            hashList: item.hashList || [],
            urls: urlList,
        });
    });
    return res;
}

/**
 * env
 */
async function transformToScript(optionList) {
    const code = getCodeStr();
    const options = getOption(optionList);
    const templateStr = `(function(){
        ${code}(preEntry(${JSON.stringify(options)}))
    })()`;
    return templateStr;
}



module.exports = {
    transformToScript,
};
