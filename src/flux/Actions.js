import {Action} from 'material-flux';

export const keys = {
    'result': 'result',
    'doRender': 'doRender'
};
export default class Actions extends Action {
    constructor({
        context,
        storageAPI,
        captureRepository,
        urlSetRepository
    }) {
        super(context);
        this.storageAPI = storageAPI;
        this.captureRepository = captureRepository;
        this.urlSetRepository = urlSetRepository;
    }
    result({message}) {
        this.dispatch(keys.result, message);
    }
    async reatoreAllModels() {
        let oldCaps = await this.storageAPI.getLocal(undefined);
        let captureModels = await this.captureRepository.restore(oldCaps);
        let urlSetModels = await this.urlSetRepository.restore(oldCaps);
        return [captureModels, urlSetModels];
    }
    async getMessageModels(message) {
        let captureModels = await Promise.all(message['captureModelIds'].map((id) => {
            return this.captureRepository.get({id});
        }));
        let urlSetModel = await this.urlSetRepository.get({ id: message['urlSetModelId']});
        return [captureModels, urlSetModel];
    }
    async doRender({message}) {
        console.assert(message['type'] === 'resultsMessage');
        let messageData = message['data'];
        let [allCaptureModels] = await this.reatoreAllModels();
        let [captureModels, urlSetModel] = await this.getMessageModels(messageData);
        let sortedAllCaptureModels = allCaptureModels.sort((a, b) => a.captureTime - b.captureTime);
        let urls = sortedAllCaptureModels.reduce((base, cap) => {
            if (base[cap['url']]) {
                base[cap['url']].push(cap);
            } else {
                base[cap['url']] = [cap];
            }
            return base;
        }, {});

        this.dispatch(keys.doRender, {
            'page': 'result',
            allModels: sortedAllCaptureModels,
            allUrls: urls,
            currentUrls: urlSetModel,
            currentModels: captureModels
        });
    }
}