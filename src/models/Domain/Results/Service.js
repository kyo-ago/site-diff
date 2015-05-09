import Model from './Model';
import Repository from './Repository';

export default class _ {
    constructor({tabs, captureModels}) {
        this.tabs = tabs;
        this.model = new Model(captureModels);
    }
    async createTab({path}) {
        let url = chrome.extension.getURL(path);
        let tab = await this.tabs.createActive({url});
        await this.tabs.waitComplete(tab.id);
        return tab;
    }
}
