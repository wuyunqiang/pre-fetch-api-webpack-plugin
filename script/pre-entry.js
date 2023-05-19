const apiService = require('./api-service');

function preEntry(optionList) {
    try {
        console.log('test preEntry optionList', optionList);
        if (!fetch) {
            return;
        }

        const staticObj = {
            hash: 'hash',
            path: 'path',
            all: 'all',
        };

        const getPageHash = () => location.hash || '';
        const getPagePath = () => location.pathname;
        let type = ''; // 匹配类型 hash or path

        const cur = optionList.find(item => {
            if (item.pathList) {
                const pathList = item.pathList || [];
                const res = pathList.some(path => {
                    console.log('test path: ', path);
                    console.log('test getPagePath: ', getPagePath());
                    console.log('test equal: ', path === getPagePath());
                    return path === getPagePath() || path === staticObj.all;
                });
                if (res) {
                    type = staticObj.path;
                    return item;
                }
            }
            const hashList = item.hashList || [];
            const res = hashList.some(hash => {
                console.log('test hash: ', hash);
                console.log('test getPageHash: ', getPageHash());
                console.log('test equal: ', hash === getPageHash());
                return hash === getPageHash() || hash === staticObj.all;
            });
            type = staticObj.hash;
            return res ? item : '';
        });
        console.log('test cur', cur);
        if (!cur) {
            return;
        }

        const preService = apiService(cur);
        let hasRead = false;
        window.usePreFetchApiService = function() {
            if (!cur) {
                return {
                    status: 'done',
                };
            }
            let valid;
            if (type === staticObj.hash) {
                const hashList = cur.hashList || [];
                valid = hashList.some(hash => hash === getPageHash() || hash === staticObj.all);
            } else {
                const pathList = cur.pathList || [];
                valid = pathList.some(path => path === getPagePath() || path === staticObj.all);
            }

            if (hasRead || !valid) {
                return {
                    status: 'done',
                };
            }
            hasRead = true;
            return {
                status: 'succ',
                preFetchService: preService,
            };
        };
    } catch (error) {
        console.error('test error', error);
        window.usePreFetchApiService = function() {
            return {
                status: 'error',
            };
        };
    }
}

module.exports = preEntry;
