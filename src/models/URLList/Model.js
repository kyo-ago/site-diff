import BaseModel from '../base/Model';

export default class Model extends BaseModel {
    constructor({ urlModels }) {
        super();
        this.urlModels = urlModels;
    }
    getModels() {
        return this.urlModels;
    }
}
