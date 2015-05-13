import './global';
import Context from './flux/Context';

let context = new Context();

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message['type'] !== 'results') {
        return;
    }
    if (!context.canExecute({'name': message['type']})) {
        throw new Error('Can\'t execute message', message);
    }

    context.executeMessage(message).then(sendResponse);
    return true;

    let html = message['data']['data'].map((_) => `<img src="${_.blobURL}">`);
    document.querySelector('#content').innerHTML = html;
    console.log(message);
    sendResponse({'message':'success'});
});
