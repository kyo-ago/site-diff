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
    async reatoreModels() {
        let oldCaps = await this.storageAPI.getLocal(undefined);
        let capturePromises = await this.captureRepository.restore(oldCaps);
        let urlSetPromises = await this.urlSetRepository.restore(oldCaps);
        return [capturePromises, urlSetPromises];
    }
    async doRender({message}) {
        console.assert(message['type'] === 'resultsMessage');
        let [captureModels, urlSetModels] = await this.reatoreModels();
        let sortedCaptureModels = captureModels.sort((a, b) => a.captureTime - b.captureTime);
        let urls = sortedCaptureModels.reduce((base, cap) => {
            if (base[cap['url']]) {
                base[cap['url']].push(cap);
            } else {
                base[cap['url']] = [cap];
            }
            return base;
        }, {});
        this.dispatch(keys.doRender, {
            models: message['data'],
            urls
        });
    }
}