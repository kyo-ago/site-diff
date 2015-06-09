import BaseModel from '../base/Model';
import CaptureModel from '../Capture/Model';

export default class Model extends BaseModel {
    constructor({ id, url }) {
        super(id);
        this.url = url;
    }
    async capture({ tab, tabAPI, captureVisibleTab }) {
        await tabAPI.update(tab.id, {
            'url': this.url
        });
        await tabAPI.waitComplete(tab.id);
        let canvas = await captureVisibleTab.capture({ tab });
        let blob = await new Promise((r) => canvas.toBlob(r));
        return new CaptureModel({ url: this.url, blob });
    }
}
