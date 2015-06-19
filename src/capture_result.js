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

let message = {"type":"doRender","data":{"type":"resultsMessage","data":{"urlSetModelId":"93f9dc66-7779-49d2-b79f-75edeb210a42","captureModelIds":["dc63b5e9-59a9-4f6c-bb14-af32cec87384"]}}};
onMessageHandler(message, {}, () => {
    console.log(arguments);
});