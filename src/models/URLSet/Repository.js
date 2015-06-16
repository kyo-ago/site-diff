import Model from './Model';

export default class Repository {
    constructor({ storageAPI }) {
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
        let data = await this.storageAPI.getLocal(id);
        console.assert(Model.ClassName === data.ClassName);
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
