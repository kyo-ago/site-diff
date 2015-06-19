import {keys} from '../Actions';
import {Store} from 'material-flux';

export default class Render extends Store {
    constructor(context) {
        super(context);
        this.register(keys.doRender, this.onHandler);
        this.state = {
            param: {}
        };
    }
    onHandler(param) {
        this.setState({param});
    }
    getParam() {
        return this.state.param;
    }
}