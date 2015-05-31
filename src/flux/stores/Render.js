import {keys} from '../Actions';
import {Store} from 'material-flux';

export default class Render extends Store {
    constructor(context) {
        super(context);
        this.register(keys.doRender, this.onHandler);
        this.state = {
            models: [],
            urls: {}
        };
    }
    onHandler({models, urls}) {
        this.setState({models, urls});
    }
    getModels() {
        return this.state.models;
    }
    getUrls() {
        return this.state.urls;
    }
}