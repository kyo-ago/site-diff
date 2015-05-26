import BaseRepository from '../base/Repository';
import URLRepository from '../URL/Repository';

export default class Repository extends BaseRepository {
    constructor({ filer, storageAPI, captureVisibleTab }) {
        super();
        this.urlRepository = new URLRepository({ filer, storageAPI, captureVisibleTab });
    }
    get({ idList }) {
        return idList.reduce((base, id) => {
            return base.then((res) => {
                return this.urlRepository.get({ id }).then((model) => {
                    res.push(model);
                    return res;
                });
            });
        }, Promise.resolve([]));
    }
    save({ model }) {
        return model.getModels().reduce((base, model) => {
            return base.then((res) => {
                return this.urlRepository.save({ model }).then(() => res);
            });
        }, Promise.resolve());
    }
}
