import BaseModel from '../base/Model';

export default class Model extends BaseModel {
    constructor({ id, url, blob, captureTime = new Date() }) {
        super(id);
        this.url = url;
        this.blob = blob;
        this.captureTime = captureTime;
    }
}
