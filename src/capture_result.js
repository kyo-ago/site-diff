import './global';
import React from 'react';
import Context from './flux/Context';
import MainComponents from './flux/components/Main';

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

let message = {"type":"doRender","data":{"type":"resultsMessage","data":{"urlSetModelId":"7897ed24-6615-4b02-af51-041a58871c4c","captureModelIds":["74ac849e-b03d-4888-9f84-4c60ec1bc2c6"]}}};
onMessageHandler(message, {}, () => {
    console.log(arguments);
});