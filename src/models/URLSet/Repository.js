import Model from './Model';

export default class Repository {
    constructor({ storageAPI }) {
        this.storageAPI = storageAPI;
    }
    async get({ id }) {
        let data = await this.storageAPI.getLocal(id);
        return new Model({
            id,
            URLList: data['URLList']
        });
    }
    async save({ model }) {
        await this.storageAPI.setLocal({
            [model.getId()]: model.extract()
        });
    }
}
