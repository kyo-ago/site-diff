import {Action} from 'material-flux';

export const keys = {
    'result': 'result',
    'doRender': 'doRender'
};
export default class Actions extends Action {
    constructor(context) {
        super(context);
    }
    result({message}) {
        this.dispatch(keys.result, message);
    }
    doRender({message}) {
        console.assert(message['type'] === 'resultsMessage');
        console.assert(Array.isArray(message['data']));
        this.dispatch(keys.doRender, message['data']);
    }
}