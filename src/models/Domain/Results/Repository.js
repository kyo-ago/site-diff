import CaptureRepository from '../Capture/Repository';
import Model from './Model';

export default class Repository {
    constructor({storage}) {
        this.storage = storage;
        this.captureRepository = new CaptureRepository({storage});
    }
    serialize({captureModels}) {
        let model = new Model({captures: captureModels});
        let data = model.getCaptures().map((model) => this.captureRepository.serialize({model}));
        return {
            'type': 'resultsMessage',
            data
        };
    }
    revokeSerialize({serializedData: serialize}) {
        console.assert(serialize['type'] === 'resultsMessage');
        serialize['data'].forEach((data) => this.captureRepository.revokeSerialize({data}));
    }
}
