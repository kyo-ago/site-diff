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
    _canvasToBlob(canvas) {
        return new Promise((resolve) => {
            if (canvas.toBlob) {
                return canvas.toBlob(resolve);
            }

            // HTMLCanvasElement.toBlob() - Web API Interfaces | MDN https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toBlob
            let dataURLScheme = canvas.toDataURL();
            let [scheme, data] = dataURLScheme.split(',', 2);
            let [, mimeType] = scheme.match(/:(.+?);/);
            let binStr = atob(data);
            let len = binStr.length;
            let arr = new Uint8Array(len);

            for (let i = 0; i < len; i++) {
                arr[i] = binStr.charCodeAt(i);
            }

            resolve(new Blob([arr], {'type': mimeType}));
        });
    }
    async getCapture({ tab, tabAPI }) {
        await tabAPI.update(tab.id, {
            'url': this.url
        });
        await tabAPI.waitComplete(tab.id);
        this.captureTime = new Date();
        let canvas = await this.captureVisibleTab.capture({ tab });
        this.blob = await this._canvasToBlob(canvas);
    }
}
