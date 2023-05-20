const babel = require("@babel/core");
const fs = require("fs");
const path = require("path");

/**
 * 批量读取script目录的脚本
 * @returns 返回将要插入html的源代码
 */
const getFileList = () => {
  const files = fs.readdirSync("script");
  const codeList = files.map((file) => require(`../script/${file}`));
  return codeList;
};

/**
 * 仅做语法转换
 * 动态生成code
 */
function transformNoPolyfill(scriptText) {
  const res = babel.transformSync(scriptText, {
    configFile: false,
    presets: ["@babel/env"],
    compact: true,
    comments: false,
    plugins: [[require("../babel-plugin/remove-consoles.js")]],
  });
  const { code } = res;
  return code;
}

/***
 * 直接创建编译好的code.js
 */
function buildToCode() {
  const fileList = getFileList();
  const codeStrList = fileList.map((item) => item.toString());
  const scriptText = codeStrList.reduceRight((all, cur) => `${all}${cur}`, "");
  const code = transformNoPolyfill(scriptText);
  fs.writeFile(`${path.resolve()}/dist/code.js`, `${code}`, "utf8", (error) => {
    if(!error){
      console.log("写入成功");
    }else{
      console.log("error:", error);
    }
  });
}

buildToCode();

/**
 * 语法转换 + polyfill
 */
// function transform(scriptText) {
//     const transformed = babel.transformSync(scriptText, {
//         configFile: false,
//         presets: [
//             [
//                 '@babel/preset-env',
//                 {
//                     modules: false,
//                     useBuiltIns: 'usage',
//                     corejs: { version: '3', proposals: true },
//                 },
//             ],
//         ],
//     });

//     return transformed?.code ? transformed?.code : '';
// }

// async function bundle(scriptText) {
//     const inputOptions = {
//         input: 'script',
//         plugins: [
//             commonjs(),
//             nodeResolve(),
//             virtual({
//                 script: scriptText,
//             }),
//             // terser(),
//         ],
//     };

//     const bundle = await rollup(inputOptions);
//     const result = await bundle.generate({
//         format: 'es',
//     });

//     return result.output[0].code ? result.output[0].code : '';
// }
// async function build(scriptText) {
//     const code = transform(scriptText);
//     const script = await bundle(code);
//     return script;
// }
