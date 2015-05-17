import Model from './Model';

export default class Service {
    constructor({tabs}) {
        this.tabs = tabs;
    }
    async updateTab({tab, path}) {
        await this.tabs.updateInnerPage(tab.id, path);
        await this.tabs.waitComplete(tab.id);
    }
    async sendResultMessage({tab, serializedData}) {
        let message = {
            'type': 'doRender',
            'data': serializedData
        };
        console.log(JSON.stringify(message));
        return this.tabs.sendMessage(tab.id, message);
    }
}
