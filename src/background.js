import './global';
import CaptureVisibleTab from 'chrome-tab-capture-visible-tab-full';
import { tabs as TabAPI, storage as StorageAPI } from 'chrome-extension-api-promise';

import URLSetModel from './models/URLSet/Model';
import URLSetRepository from './models/URLSet/Repository';
import CaptureRepository from './models/Capture/Repository';

let InnerResultPath = 'html/capture_result.html';

(async () => {
    let tabAPI = new TabAPI();
    let storageAPI = new StorageAPI();
    let captureVisibleTab = new CaptureVisibleTab({
        'overWriteDevicePixelRatio': 1
    });

    let captureRepository = await CaptureRepository.factory({
        storageAPI
    });
    let urlSetRepository = new URLSetRepository({
        storageAPI
    });

    chrome.runtime.onMessage.addListener(async ({type, urls}) => {
        if (type !== 'doCaptures') {
            return;
        }
        let tab = await tabAPI.createActive();

        let urlSetModel = new URLSetModel({ URLList: urls });
        await urlSetRepository.save({
            model: urlSetModel
        });
        let captureModelIds = [];
        for (let doc of urlSetModel.loadURLList()) {
            let captureModel = await doc.capture({
                tab,
                tabAPI,
                captureVisibleTab
            });
            await captureRepository.save({ model: captureModel });
            captureModelIds.push(captureModel.getId());
        }

        await tabAPI.updateInnerPage(tab.id, InnerResultPath);
        await tabAPI.waitComplete(tab.id);
        await tabAPI.sendMessage(tab.id, {
            'type': 'doRender',
            'data': {
                'type': 'resultsMessage',
                'data': {
                    urlSetModelId: urlSetModel.getId(),
                    captureModelIds: captureModelIds
                }
            }
        });
    });
})();
