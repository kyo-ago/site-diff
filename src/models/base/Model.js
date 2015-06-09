import UUID from 'UUID';

export default class Model {
    constructor(id = undefined) {
        this.id = id || UUID.generate();
    }
    getId() {
        return this.id;
    }
    eq(model) {
        return this.id === model.getId();
    }
    extract() {
        return { id: this.id };
    }
}
