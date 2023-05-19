
const fs = require('fs');
const { fileName } = require('./file');

/***
 * 获取编译好的代码
 */
function getCodeStr(){
    const str = fs.readFileSync(fileName, {
        encoding: 'utf8',
    })
    return str;
}


module.exports = {
    getCodeStr,
};
