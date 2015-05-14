import {keys} from '../Actions';
import {Store} from 'material-flux';

export default class Render extends Store {
    constructor(context) {
        super(context);
        this.register(keys.doResult, this.onHandler);
        this.state = {
            data: {}
        };
    }
    onHandler(data) {
        this.setState({data});
    }
    getData() {
        return this.state.data;
    }
}