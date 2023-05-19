const getCookieParams = require("./get-cookie-params");
const getQueryParams = require("./get-query-params");

function getParams(options) {
    const staticParams = options.staticParams || {};
    const cookieParams = getCookieParams(options);
    const queryParams = getQueryParams(options);
    return { ...staticParams, ...cookieParams, ...queryParams };
}

module.exports = getParams;
