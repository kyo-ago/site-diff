import BaseModel from '../base/Model';
import DocumentModel from '../Document/Model';

export default class Model extends BaseModel {
    constructor({ id, URLList }) {
        super(id);
        this.URLList = URLList;
    }
    *loadURLList() {
        for (let url of this.URLList) {
            let documentModel = new DocumentModel({ url });
            yield documentModel;
        }
    }
}
