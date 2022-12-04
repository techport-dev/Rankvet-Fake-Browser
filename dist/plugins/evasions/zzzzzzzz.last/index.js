// noinspection JSUnusedLocalSymbols
'use strict';
const { PuppeteerExtraPlugin } = require('puppeteer-extra-plugin');
const withUtils = require('../_utils/withUtils');
const withWorkerUtils = require('../_utils/withWorkerUtils');
class Plugin extends PuppeteerExtraPlugin {
    constructor() {
        super();
        this.mainFunction = (utils) => {
            utils.removeTempVariables();
        };
    }
    get name() {
        return 'evasions/zzzzzzzz.last';
    }
    get requirements() {
        return new Set(['runLast']);
    }
    async onPageCreated(page) {
        await withUtils(this, page).evaluateOnNewDocument(this.mainFunction);
    }
    onServiceWorkerContent(jsContent) {
        return withWorkerUtils(this, jsContent).evaluate(this.mainFunction);
    }
}
module.exports = function (pluginConfig) {
    return new Plugin(pluginConfig);
};
