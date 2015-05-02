import Model from './Model';
import CaptureVisibleTab from 'chrome-tab-captureVisibleTab-full';
import Repository from './Repository';

export default class _ {
    constructor() {
        this.repository = new Repository();
    }
    _loadCurrentTab() {
        return new Promise((resolve) => {
            chrome.tabs.query({
                'active': true,
                'currentWindow': true
            }, (result) => resolve( result.shift() ))
        });
    }
    _captureVisibleTab(tab) {
        let captureVisibleTab = new CaptureVisibleTab({tab});
        return captureVisibleTab.capture();
    }
    async _getCurrentCapture(tab) {
        let canvas = await this._captureVisibleTab(tab);
        return new Model({
            'url': tab.url,
            'imageDataURI': canvas.toDataURL()
        });
    }
    async load() {
        let tab = await this._loadCurrentTab();
        this.afterCapture = await this._getCurrentCapture(tab);
        this.beforeDataOpt = await this.repository.get(tab.url);
    }
    isFirstLoad() {
        return this.beforeDataOpt.isEmpty;
    }
    async getImageDataUri() {
        return this.beforeDataOpt.match({
            Some: async (beforeCapture) => {
                let diff = await this.afterCapture.diff(beforeCapture);
                return diff.getImageDataUrl();
            },
            None: async () => {
                await this.repository.save(this.afterCapture);
                return this.afterCapture.getImageDataURI();
            }
        });
    }
}
