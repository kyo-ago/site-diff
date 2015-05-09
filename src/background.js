import 'babel-core/polyfill';
import Promise from 'bluebird';
import monapt from 'monapt';
const global = (
    "undefined" !== typeof window ? window
        : "undefined" !== typeof global ? global
        : "undefined" !== typeof self ? self
        : {}
);
global.Promise = Promise;
global.monapt = monapt;

import CaptureVisibleTab from './models/Capture/Service';

chrome.runtime.onMessage.addListener(async ({type, urls}) => {
    if (type !== 'doCaptures') {
        return;
    }
    let capture = new CaptureVisibleTab();
    let tab = await capture.createTab();
    let captureModels = await capture.doCaptures({tab, urls});
    capture.removeTab({tab});

//    let indexHtmlUrl = chrome.extension.getURL('web_accessible_resources/index.html');
    var url = `
        <!DOCTYPE html>
        <html>
            <head><title>results</title></head>
            <body>aaaaaaaaaaaaaaaaa</body>
        </html>
    `;
    chrome.tabs.create({
        'url': 'data:text/html,' + url
    }, (tab) => {
        chrome.tabs.executeScript(tab.id, {
            'code': 'document.body.innerHTML = "bbbbbbbbbbbb"',
            'runAt': 'document_end'
        });
    });
});
