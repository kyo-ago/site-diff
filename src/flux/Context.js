import Actions from './Actions';
import StoreRender from './stores/Render';
import StoreResult from './stores/Result';
import {Context} from 'material-flux';

export default class _ extends Context {
    constructor() {
        super();
        this.actions = new Actions(this);
        this.store = {
            'render': new StoreRender(this),
            'result': new StoreResult(this)
        };
    }
    canExecute({name}) {
        return 'function' === typeof this.actions[name];
    }
    executeMessage({name, message}) {
        return new Promise((resolve) => {
            this.actions[name]({message});
            this.store.result.onChange((...arg) => {
                resolve.apply(this, arg);
                this.store.result.removeAllChangeListeners();
            });
        });
    }
}