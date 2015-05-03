import Actions from './Actions';
import RenderingImages from './stores/RenderingImages';
import {Context} from 'material-flux';

export default class _ extends Context {
    constructor() {
        super();
        this.actions = new Actions(this);
        this.store = {
        	'renderingImages': new RenderingImages(this),
        };
    }
}