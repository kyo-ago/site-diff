import './base';
import { tabs as TabsModel, storage as StorageModel } from 'chrome-extension-api-promise';
import CaptureService from './models/Domain/Capture/Service';
import ResultsService from './models/Domain/Results/Service';

let execCapture = async ({tabsModel, urls}) => {
    let capture = new CaptureVisibleTab({'tabs': tabsModel});
    let tab = await tabsModel.createActive();
    let captureModels = await capture.doCaptures({tab, urls});
    await tabsModel.remove(tab.id);
    return captureModels;
};

let openResults = async ({tabsModel, captureModels}) => {
    let resultsService = new ResultsService({'tabs': tabsModel, captureModels});
    let tab = await resultsService.createTab({'path': 'html/capture_result.html'});
};

chrome.runtime.onMessage.addListener(async ({type, urls}) => {
    if (type !== 'doCaptures') {
        return;
    }
    let tabsModel = TabsModel();
    let captureModels = await execCapture({tabsModel, urls});
    await openResults({tabsModel, captureModels});
});
