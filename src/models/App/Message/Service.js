import Model from './Model';
import Repository from './Repository';

import ResultsMessageModel from '../ResultsMessage/Model';
import ResultsMessageRepository from '../ResultsMessage/Repository';

export default class Service {
    constructor() {
        this.repository = new Repository();
        this.resultsMessageRepository = new ResultsMessageRepository();
    }
    serialize({message}) {
        if (message['type'] === Model.type) {
            return this.repository.serialize({message});
        }
        if (message['type'] === ResultsMessageModel.type) {
            return this.resultsMessageRepository.serialize({message});
        }
    }
    unSerialize({data}) {
        if (data['type'] === Model.type) {
            return this.repository.unSerialize({data});
        }
        if (data['type'] === ResultsMessageModel.type) {
            return this.resultsMessageRepository.unSerialize({data});
        }
    }
}
