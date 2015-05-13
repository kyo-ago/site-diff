import Model from './Model';

export default class Repository {
    constructor({storage}) {
        this.storage = storage;
    }
    serialize({model}) {
        let blobURL = URL.createObjectURL(model['blob']);
        return {
            'url': model['url'],
            blobURL
        };
    }
    revokeSerialize({data}) {
        URL.revokeObjectURL(data['blobURL']);
    }
}
