import {Action} from 'material-flux';
import Capture from './models/Capture/Service';

export const keys = {
    'doLoadURLs': 'doLoadURLs',
    'renderingImages': 'renderingImages'
};
export default class _ extends Action {
    constructor(context) {
        super(context);
        this.capture = new Capture();
    }
    //_getCurrentTab() {
    //    return new Promise((resolve) => {
    //        chrome.tabs.query({
    //            'active': true,
    //            'currentWindow': true
    //        }, (result) => resolve( result.shift() ));
    //    });
    //}
    _createNewTab() {
        return new Promise(() => {
            chrome.tabs.create({
                'active': true
            }, (tab) => resolve(tab));
        });
    }
    _loadURLToTab(tab, url) {
        return new Promise((resolve) => {
            chrome.tabs.update(tab.id, {
                'url': url
            }, resolve);
        });
    }
    _removeTab(tab) {
        return new Promise((resolve) => {
            chrome.tabs.remove(tab.id, resolve);
        });
    }
    async doLoadURLs(urls) {
        let tab = await this._createNewTab();
        let imageDataURLs = urls.map(async (url) => {
            await this._loadURLToTab(tab, url);
            await this.capture.load();
            return await this.capture.getImageDataUri();
        });
        await this._removeTab(tab);
        this.dispatch(keys.renderingImages, imageDataURLs);
    }
}