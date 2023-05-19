const getParams = require('./get-params');
function apiService(option) {
    try {
        const fetchResponse = response => {
            if (response.ok) {
                return response.json();
            }
            return Promise.reject(response.statusText);
        };
        const promiseList = option.urls.map(item => {
            const apiParams = getParams(item);
            const init = {
                mode: 'cors',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                },
            };
            let url = item.url;
            if (item.method === 'GET') {
                const listStr = Object.keys(apiParams).map(key => `${key}=${apiParams[key]}`);
                url += `?` + listStr.join('&');
                return fetch(encodeURI(url), { ...init, method: 'GET' }).then(fetchResponse);
            }
            return fetch(url, {
                ...init,
                method: 'POST',
                body: JSON.stringify(apiParams),
            }).then(fetchResponse);
        });

        const errorOutTime = new Error(
            JSON.stringify({
                msg: '请求超时',
            }),
        );

        const timeOutPromise = new Promise(function(res, rej) {
            setTimeout(() => {
                rej(errorOutTime);
            }, 10 * 1000);
        });
        return Promise.race([Promise.all(promiseList), timeOutPromise]);
    } catch (error) {
        return Promise.reject(error);
    }
}

module.exports = apiService;
