import Model from './Model';
import BaseRepository from '../base/Repository';

export default class Repository extends BaseRepository {
    constructor({ filer, storageAPI, captureVisibleTab }) {
        super();
        this.filer = filer;
        this.storageAPI = storageAPI;
        this.captureVisibleTab = captureVisibleTab;
    }
    async get({ id }) {
        let file = await filer.open(id);
        let data = await this.storageAPI.getLocal(id);
        return new Model({
            id,
            url: data['url'],
            captureVisibleTab: this.captureVisibleTab,
            'blob': file,
            captureTime: data['captureTime']
        });
    }
    async save({ model }) {
        let blob = await model.getBlob();
        await this.filer.write(model.getId(), {
            data: blob,
            type: 'image/png',
            append: false
        });
        await this.storageAPI.setLocal({
            [model.getId()]: {
                url: model['url'],
                captureTime: model['captureTime']
            }
        });
    }
}
