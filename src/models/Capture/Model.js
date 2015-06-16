import BaseModel from '../base/Model';

class CaptureModel extends BaseModel {
    constructor({ id, url, blob, captureTime = new Date() }) {
        super(id);
        this.url = url;
        this.blob = blob;
        this.captureTime = 'string' === typeof captureTime ? new Date(captureTime) : captureTime;
    }
    extract() {
        return Object.assign(
            {},
            super.extract(),
            {
                ClassName: CaptureModel.ClassName,
                url: this.url,
                captureTime: this.captureTime + ''
            }
        );
    }
}
CaptureModel.ClassName = 'CaptureModel';
export default CaptureModel;