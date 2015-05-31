import {Action} from 'material-flux';
import { storage as StorageAPI } from 'chrome-extension-api-promise';

export const keys = {
    'result': 'result',
    'doRender': 'doRender'
};
export default class Actions extends Action {
    constructor(context) {
        super(context);
        this.storageAPI = new StorageAPI();
    }
    result({message}) {
        this.dispatch(keys.result, message);
    }
    async doRender({message}) {
        console.assert(message['type'] === 'resultsMessage');
        console.assert(Array.isArray(message['data']));
        let oldCaps = await this.storageAPI.getLocal(undefined);
        let urls = Object.keys(oldCaps).reduce((base, key) => {
            let cap = oldCaps[key];
            base[cap['url']] = cap;
            return base;
        }, {});
        this.dispatch(keys.doRender, {
            models: message['data'],
            urls
        });
    }
}