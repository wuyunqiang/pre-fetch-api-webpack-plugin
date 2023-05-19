function getCookieParams(options) {
    const cookieParams = options.cookieParams || {};
    const localCookie = {};
    const cookieParamsObj = {};
    console.log('test document.cookie', document.cookie);
    const cookie = document.cookie || '';
    cookie.split(';').forEach(item => {
        if (item) {
            const [k, v] = item.split('=');
            localCookie[k] = v;
        }
    });
    Object.keys(cookieParams).forEach(key => {
        cookieParamsObj[key] = localCookie[cookieParams[key]];
    });
    return cookieParamsObj;
}

module.exports = getCookieParams;
