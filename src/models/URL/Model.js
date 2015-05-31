import BaseModel from '../base/Model';

export default class Model extends BaseModel {
    constructor({url, captureVisibleTab, id = undefined, blob = undefined, captureTime = undefined}) {
        super(id);
        this.url = url;
        this.captureVisibleTab = captureVisibleTab;
        this.captureTime = captureTime;
        this.blob = blob;
    }
    getBlob() {
        return this.blob;
    }
    async getCapture({ tab, tabAPI }) {
        await tabAPI.update(tab.id, {
            'url': this.url
        });
        await tabAPI.waitComplete(tab.id);
        this.captureTime = new Date();
        let canvas = await this.captureVisibleTab.capture({ tab });
        this.blob = await new Promise((r) => canvas.toBlob(r));
    }
}
