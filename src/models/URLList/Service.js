import URLModel from '../URL/Model';

export default class Model {
    constructor({urls, captureVisibleTab}) {
        this.urls = urls;
        this.captureVisibleTab = captureVisibleTab;
    }
    getCaptures({ tab, tabAPI }) {
        return this.urls.reduce((base, url) => {
            return base.then((res) => {
                let urlModel = new URLModel({
                    url,
                    'captureVisibleTab': this.captureVisibleTab
                });
                res.push(urlModel);
                return urlModel.getCapture({ tab, tabAPI }).then(() => res);
            });
        }, Promise.resolve([]));
    }
}
