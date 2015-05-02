import {Action} from 'material-flux';
import Capture from './models/Capture/Service';

export const keys = {
    'doLoad': 'doLoad',
    'firstCapture': 'firstCapture',
    'diffCapture': 'diffCapture',
};
export default class _ extends Action {
    constructor(context) {
        super(context);
        this.capture = new Capture();
    }
    async doLoad(data) {
    	await this.capture.load();
    	let imageDataUri = await this.capture.getImageDataUri();
    	if (this.capture.isFirstLoad()) {
	        this.dispatch(keys.firstCapture, imageDataUri);
    	} else {
	        this.dispatch(keys.diffCapture, imageDataUri);
    	}
    }
}