
const fs = require('fs');

/***
 * 获取编译好的代码
 */
function getCodeStr(){
    const str = fs.readFileSync(`${__dirname}/code.js`, {
        encoding: 'utf8',
    })
    return str;
}


module.exports = {
    getCodeStr,
};
