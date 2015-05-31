import { tabs as TabAPI, storage as StorageAPI } from 'chrome-extension-api-promise';
import Filer from 'filer.js';
import URLListService from '../URLList/Service';
import URLListModel from '../URLList/Model';
import URLListRepository from '../URLList/Repository';
import CaptureVisibleTab from 'chrome-tab-capture-visible-tab-full';

export default class Service {
    constructor() {
        this.tabAPI = new TabAPI();
        this.storageAPI = new StorageAPI();
        this.captureVisibleTab = new CaptureVisibleTab({
            'overWriteDevicePixelRatio': 1
        });
        this.urlListRepository = undefined;
    }
    async init() {
        let filer = new Filer();
        await filer.init();
        this.urlListRepository = new URLListRepository({
            filer,
            storageAPI: this.storageAPI,
            captureVisibleTab: this.captureVisibleTab
        });
    }
    async getTab() {
        return await this.tabAPI.createActive();
    }
    async doCapture({ tab, urls }) {
        let urlListService = new URLListService({
            urls: urls,
            tabAPI: this.tabAPI,
            captureVisibleTab: this.captureVisibleTab
        });
        let urlModels = await urlListService.getCaptures({
            tab,
            tabAPI: this.tabAPI
        });
        return new URLListModel({ urlModels });
    }
    async doSave({ model }) {
        await this.urlListRepository.save({ model });
    }
    async openResultView({ tab, model }) {
        let path = 'html/capture_result.html';
        await this.tabAPI.updateInnerPage(tab.id, path);
        await this.tabAPI.waitComplete(tab.id);
        await this.tabAPI.sendMessage(tab.id, {
            'type': 'doRender',
            'data': {
                'type': 'resultsMessage',
                'data': model.getModels()
            }
        });
    }
}
