export default class Model {
    static type = 'message';
    constructor({data}) {
        this.data = data;
    }
    getData() {
        return this.data;
    }
}
