function getQueryParams(options) {
    const params = options.params || {};
    const localQuery = {};
    const queryParams = {};
    location.search
        .replace('?', '')
        .split('&')
        .forEach(item => {
            if (item) {
                const [k, v] = item.split('=');
                localQuery[k] = v;
            }
        });
    Object.keys(params).forEach(key => {
        queryParams[key] = localQuery[params[key]];
    });
    return queryParams;
}

module.exports = getQueryParams;
