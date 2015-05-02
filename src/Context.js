import Actions from './Actions';
import FirstCaptureStores from './stores/FirstCapture';
import DiffCaptureStores from './stores/DiffCapture';
import {Context} from 'material-flux';

export default class _ extends Context {
    constructor() {
        super();
        this.actions = new Actions(this);
        this.store = {
        	'firstCapture': new FirstCaptureStores(this),
        	'diffCapture': new DiffCaptureStores(this),
        };
    }
}