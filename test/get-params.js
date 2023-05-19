const getParams = require('../src/get-params');
const res = getParams({
    urls: [`/abc`],
    method: 'post',
    params: { name: 'username' },
    cookieParams: { name: '_did', age: 'my_age' },
    pathList: ['/page/router1'],
});

console.log('test res', res);
module.exports = res;
