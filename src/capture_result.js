import './global';
import Context from './flux/Context';

let context = new Context();

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (!/^do[A-Z]/.test(message['type'])) {
        throw new Error('Invalid message', message['type']);
    }
    if (!context.canExecute({'name': message['type']})) {
        throw new Error('Can\'t execute message', message);
    }

    context.executeMessage(message['data']).then(sendResponse);
    return true;
});
