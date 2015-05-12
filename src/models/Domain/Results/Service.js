import Model from './Model';

export default class _ {
    constructor({tabs}) {
        this.tabs = tabs;
    }
    async createTab({path}) {
        let tab = await this.tabs.openInnerPage(path);
        await this.tabs.waitComplete(tab.id);
        return tab;
    }
    async sendResultMessage({tab, serializedData}) {
        let message = {
            'type': 'results',
            'data': serializedData
        };
        return this.tabs.sendMessage(tab.id, message);
    }
}
