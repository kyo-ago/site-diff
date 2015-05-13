import './global';

import { tabs as TabsModel, storage as StorageModel } from 'chrome-extension-api-promise';
import CaptureService from './models/Domain/Capture/Service';
import ResultsService from './models/Domain/Results/Service';
import ResultsRepository from './models/Domain/Results/Repository';

let storageModel = new StorageModel();
let resultsRepository = new ResultsRepository({'storage': storageModel});

let execCapture = async ({tabsModel, urls}) => {
    let capture = new CaptureService({
        'tabs': tabsModel,
        'overWriteDevicePixelRatio': 1
    });
    let tab = await tabsModel.createActive();
    let captureModels = await capture.doCaptures({tab, urls});
    await tabsModel.remove(tab.id);
    return captureModels;
};

let openResults = async ({tabsModel, captureModels}) => {
    let resultsService = new ResultsService({'tabs': tabsModel});
    let tab = await resultsService.createTab({'path': 'html/capture_result.html'});
    let serializedData = resultsRepository.serialize({captureModels});
    let result = await resultsService.sendResultMessage({tab, serializedData});
    resultsRepository.revokeSerialize({serializedData});
};

chrome.runtime.onMessage.addListener(async ({type, urls}) => {
    if (type !== 'doCaptures') {
        return;
    }
    let tabsModel = new TabsModel();
    let captureModels = await execCapture({tabsModel, urls});
    await openResults({tabsModel, captureModels});
});
