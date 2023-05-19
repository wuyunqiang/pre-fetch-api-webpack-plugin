const babel = require("@babel/core");
function removeConsole() {
    const scriptText = `function test(){
        console
        let consolexxxx = 'hello'
        const name = 'wyq';
        console.log('test aaaa')
    }`;
    const res = babel.transformSync(scriptText, {
        configFile: false,
        presets: ['@babel/env'],
        plugins: [[require("../babel-plugin/remove-consoles.js")]],
        compact: false,
        comments: false,
    });
    const { code } = res;
    console.log('test code', code);
    return code;
}

removeConsole();

module.exports = {
    removeConsole,
};

