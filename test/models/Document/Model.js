import assert from 'power-assert';

import DocumentModel from '../../../src/models/Document/Model';
import CaptureModel from '../../../src/models/Capture/Model';

describe('DocumentModel', () => {
    let documentModel = new DocumentModel({
        url: 'http://example.com/'
    });
    describe('capture', () => {
        it('is can return CaptureModel', async () => {
            let captureModel = await documentModel.capture({
                tab: { id: 1 },
                tabAPI: {
                    update: () => Promise.resolve(),
                    waitComplete: () => Promise.resolve()
                },
                captureVisibleTab: {
                    capture: () => Promise.resolve({
                        toBlob: (r) => r()
                    })
                }
            });
            assert(captureModel instanceof CaptureModel);
        });
    });
});