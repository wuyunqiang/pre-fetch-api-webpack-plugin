const HtmlWebpackPlugin = require('html-webpack-plugin');
const PluginName = 'PreApiServicePlugin';
const { transformToScript } = require('./init');

class PreApiServicePlugin {
    constructor(options) {
        this.options = options;
    }

    apply(compiler) {
        compiler.hooks.compilation.tap(PluginName, compilation => {
            const alterAssetTags = this.alterAssetTagsCallback.bind(this, compilation);
            const alterAssetTagGroups
                = compilation.hooks.htmlWebpackPluginAlterAssetTags
                || HtmlWebpackPlugin.getHooks(compilation).alterAssetTagGroups;
            alterAssetTagGroups.tapAsync(PluginName, alterAssetTags);
        });
    }
    // 改写html
    alterAssetTagsCallback(compilation, pluginArgs, callback) {
        console.log('test callback', callback);
        const headTagName = Object.prototype.hasOwnProperty.call(pluginArgs, 'headTags') ? 'headTags' : 'head';
        const headList = pluginArgs[headTagName];
        const optionList = Array.isArray(this.options) ? this.options : [this.options];
        const onError = err => {
            if (callback) {
                callback(err);
            } else {
                compilation.errors.push(err);
            }
        };
        transformToScript(optionList).then(htmlStr => {
            headList.unshift({
                tagName: 'script',
                closeTag: true,
                innerHTML: htmlStr,
            });

            try {
                if (callback) {
                    callback(null, pluginArgs);
                }
            } catch (err) {
                onError(err);
            }
        }).catch(onError);

    }
}

module.exports = PreApiServicePlugin;
