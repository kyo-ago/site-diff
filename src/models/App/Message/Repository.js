import Model from './Model';

export default class Repository {
    serialize({message}) {
        return {
            'type': Model.type,
            'data': message['data']
        };
    }
    unSerialize({data}) {
        return new Model({data});
    }
}