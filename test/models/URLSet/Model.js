import assert from 'power-assert';

import URLSetModel from '../../../src/models/URLSet/Model';
import DocumentModel from '../../../src/models/Document/Model';

describe('URLSetModel', () => {
    let urlSetModel = new URLSetModel({
        URLList: [
            'http://example.com/'
        ]
    });
    describe('loadURLList', () => {
        it('is can return DocumentModel', () => {
            for (let doc of urlSetModel.loadURLList()) {
                assert(doc instanceof DocumentModel);
            }
        });
    });
});