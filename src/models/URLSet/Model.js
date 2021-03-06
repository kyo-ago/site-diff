import BaseModel from '../base/Model';
import DocumentModel from '../Document/Model';

class URLSetModel extends BaseModel {
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
    extract() {
        return Object.assign(
            {},
            super.extract(),
            {
                ClassName: URLSetModel.ClassName,
                URLList: this.URLList
            }
        );
    }
}
URLSetModel.ClassName = 'URLSetModel';
export default URLSetModel;