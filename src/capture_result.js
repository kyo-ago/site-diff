import './global';
import React from 'react';
import Context from './flux/Context';
import MainComponents from './flux/Main';

let context;
let contextPromise = Context.factory().then((res) => {
    context = res;
    React.render(
        React.createElement(MainComponents, { context }),
        document.getElementById('content')
    );
    return context;
});
let onMessageHandler = (message, sender, sendResponse) => {
    console.log('onMessageHandler', JSON.stringify(message));
    if (!/^do[A-Z]/.test(message['type'])) {
        throw new Error('Invalid message', message['type']);
    }
    let responseMessage = (context) => {
        if (!context.canExecute({'name': message['type']})) {
            throw new Error('Can\'t execute message', message);
        }
        context.executeMessage({
            'name': message['type'],
            'message': message['data']
        }).then(sendResponse);
    };
    if (context) {
        responseMessage(context)
    } else {
        contextPromise.then(responseMessage);
    }
    return true;
};

chrome.runtime.onMessage.addListener(onMessageHandler);

let message = {"type":"doRender","data":{"type":"resultsMessage","data":{"urlSetModelId":"40f002ed-e7f2-4eb1-8035-b424f68cf17a","captureModelIds":["e70f7467-6dc7-4d58-9bb2-995e72c7a8a9"]}}};
onMessageHandler(message, {}, () => {
    console.log(arguments);
});