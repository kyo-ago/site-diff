import Actions from './Actions';
import StoreResult from './stores/Result';
import {Context} from 'material-flux';

export default class Context extends Context {
    constructor() {
        super();
        this.actions = new Actions(this);
        this.store = {
        	'result': new StoreResult(this),
        };
    }
    canExecute({name}) {
        return 'function' === typeof this.actions[name];
    }
    executeMessage({message}) {
        return new Promise((resolve) => {
            this.actions[name]({message});
            this.store.result.onChange((...arg) => {
                resolve.apply(this, arg);
                this.store.result.removeAllChangeListeners();
            });
        });
    }
}