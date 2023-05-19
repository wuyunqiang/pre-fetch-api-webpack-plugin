

// const { getCodeStr } = require('../build/index');
// console.log('test getCodeStr:',getCodeStr());
// console.log('test global:', global);
// console.log('test globalThis:', globalThis);
// console.log('test equal:', global===globalThis);


const fs = require('fs');
const getCodeList = () =>{
  const files = fs.readdirSync('script');
    const codeList = files.map(file=>require(`../script/${file}`))      
    return codeList;
    
}

console.log('test getCodeList:', getCodeList())

