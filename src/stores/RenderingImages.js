import {keys} from '../Actions';
import {Store} from 'material-flux';

export default class _ extends Store {
    constructor(context) {
        super(context);
        this.register(keys.renderingImages, this.onHandler);
        this.state = {
            imageDataURLs: []
        };
    }
    onHandler(imageDataURLs) {
        this.setState({ imageDataURLs });
    }
    getImageDataURLs() {
        return this.state.imageDataURLs;
    }
}