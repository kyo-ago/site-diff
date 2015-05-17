import './global';
import React from 'react';
import Context from './flux/Context';
import ResultComponents from './flux/components/Result.js';

let context = new Context();

let onMessageHandler = (message, sender, sendResponse) => {
    if (!/^do[A-Z]/.test(message['type'])) {
        throw new Error('Invalid message', message['type']);
    }
    if (!context.canExecute({'name': message['type']})) {
        throw new Error('Can\'t execute message', message);
    }

    context.executeMessage({
        'name': message['type'],
        'message': message['data']
    }).then(sendResponse);

    return true;
};

chrome.runtime.onMessage.addListener(onMessageHandler);

React.render(
    React.createElement(ResultComponents, { context }),
    document.getElementById('content')
);

let message = {
    'type': 'doRender',
    'data': {
        'type': 'resultsMessage',
        'data': [{
            'blobURL': 'blob:chrome-extension%3A//offfgaiokbekichbehggldmoemepimpn/43f7f735-3f3c-452e-a392-65f2c42984dc',
            'url': 'http://localhost:8000/'
        }]
    }
};

onMessageHandler(message, {}, () => {
    console.log(arguments);
});