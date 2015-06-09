import BaseModel from '../base/Model';

export default class Model extends BaseModel {
    constructor({ id, url, blob, captureTime = new Date() }) {
        super(id);
        this.url = url;
        this.blob = blob;
        this.captureTime = 'string' === typeof captureTime ? new Date(captureTime) : captureTime;
    }
    extract() {
        return Object.assign({}, super.extract(), {
            url: this.url,
            captureTime: this.captureTime + ''
        });
    }
}
