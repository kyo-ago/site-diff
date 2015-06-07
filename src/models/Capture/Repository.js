import Model from './Model';

export default class Repository {
    constructor({ filer, storageAPI }) {
        this.filer = filer;
        this.storageAPI = storageAPI;
    }
    async get({ id }) {
        let file = await filer.open(id);
        let data = await this.storageAPI.getLocal(id);
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
            [model.getId()]: {
                url: model['url'],
                captureTime: model['captureTime']+''
            }
        });
    }
}
