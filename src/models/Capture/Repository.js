import Filer from 'filer.js';
import Model from './Model';

export default class CaptureRepository {
    static async factory({ storageAPI }) {
        let filer = new Filer();
        await filer.init();
        return new CaptureRepository({
            filer,
            storageAPI
        });
    }
    constructor({ filer, storageAPI }) {
        this.filer = filer;
        this.storageAPI = storageAPI;
    }
    canGet(data) {
        return Model.ClassName === data.ClassName;
    }
    restore(oldCaps) {
        return Promise.all(Object.keys(oldCaps)
            .filter((key) => this.canGet(oldCaps[key]))
            .map((key) => this.get(oldCaps[key]))
        );
    }
    async get({ id }) {
        let file = await filer.open(id);
        let data = await this.storageAPI.getLocal(id);
        console.assert(Model.ClassName === data.ClassName);
        return new Model({
            id,
            url: data['url'],
            blob: file,
            captureTime: data['captureTime']
        });
    }
    async save({ model }) {
        await this.filer.write(model.getId(), {
            data: model.blob,
            type: 'image/png',
            append: false
        });
        await this.storageAPI.setLocal({
            [model.getId()]: model.extract()
        });
    }
}
