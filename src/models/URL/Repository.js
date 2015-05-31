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
            fileUrl: data['fileUrl'],
            captureVisibleTab: this.captureVisibleTab,
            'blob': file,
            captureTime: data['captureTime']
        });
    }
    async save({ model }) {
        let blob = await model.getBlob();
        let [fileEntry] = await this.filer.write(model.getId(), {
            data: blob,
            type: 'image/png',
            append: false
        });
        model.fileUrl = fileEntry.toURL();
        await this.storageAPI.setLocal({
            [model.getId()]: {
                url: model['url'],
                fileUrl: model['fileUrl'],
                captureTime: model['captureTime']+''
            }
        });
    }
}
