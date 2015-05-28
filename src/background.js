import './global';
import Service from './models/Capture/Service';

chrome.runtime.onMessage.addListener(async ({type, urls}) => {
    if (type !== 'doCaptures') {
        return;
    }
    let service = new Service();
    await service.init();
    let tab = await service.getTab();
    let urlModelList = await service.doCapture({ tab, urls });
    await service.doSave({
        model: urlModelList
    });
    await service.openResultView({
        tab,
        model: urlModelList
    });
});
