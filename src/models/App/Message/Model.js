let type = 'message';

export default class Model {
    constructor({data}) {
        this.type = type;
        this.data = data;
    }
    static eq({type}) {
        return type === type;
    }
    getData() {
        return this.data;
    }
}
