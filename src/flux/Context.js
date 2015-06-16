import Actions from './Actions';
import StoreRender from './stores/Render';
import StoreResult from './stores/Result';
import {Context} from 'material-flux';

import CaptureRepository from '../models/Capture/Repository';
import URLSetRepository from '../models/URLSet/Repository';
import { storage as StorageAPI } from 'chrome-extension-api-promise';

export default class FluxContext extends Context {
    static async factory() {
        let storageAPI = new StorageAPI();
        let captureRepository = await CaptureRepository.factory({
            storageAPI
        });
        let urlSetRepository = new URLSetRepository({
            storageAPI
        });
        return new FluxContext({
            storageAPI,
            captureRepository,
            urlSetRepository
        });
    }
    constructor({
        storageAPI,
        captureRepository,
        urlSetRepository
    }) {
        super();
        this.actions = new Actions({
            context: this,
            storageAPI,
            captureRepository,
            urlSetRepository
        });
        this.store = {
            'render': new StoreRender(this),
            'result': new StoreResult(this)
        };
    }
    canExecute({name}) {
        return 'function' === typeof this.actions[name];
    }
    executeMessage({name, message}) {
        return new Promise((resolve) => {
            this.actions[name]({message});
            this.store.result.onChange((...arg) => {
                resolve.apply(this, arg);
                this.store.result.removeAllChangeListeners();
            });
        });
    }
}