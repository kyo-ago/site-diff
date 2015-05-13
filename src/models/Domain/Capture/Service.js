import Model from './Model';
import CaptureVisibleTab from 'chrome-tab-capture-visible-tab-full';

export default class Service {
    constructor({tabs, overWriteDevicePixelRatio}) {
        this.tabs = tabs;
        this.captureVisibleTab = new CaptureVisibleTab({overWriteDevicePixelRatio});
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
    async _updateTab(tabId, url) {
        await this.tabs.update(tabId, {'url': url});
        await this.tabs.waitComplete(tabId);
    }
    async _getCapture(tab, url) {
        let canvas = await this.captureVisibleTab.capture({tab});
        let blob = await this._canvasToBlob(canvas);
        return new Model({url, blob});
    }
    doCaptures({tab, urls}) {
        return urls.reduce((base, urlObj) => {
            return base.then((res) => {
                return this._updateTab(tab.id, urlObj.href)
                    .then(() => this._getCapture(tab, urlObj.href))
                    .then((model) => (res.push(model), res))
                ;
            });
        }, Promise.resolve([]));
    }
}
