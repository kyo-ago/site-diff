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

let message = {"type":"doRender","data":{"type":"resultsMessage","data":{"urlSetModel":{"id":"3251d9cb-04c2-419e-8e64-ac7efd9304a7","URLList":["http://localhost:8000/"]},"captureModelIds":["ef84dbcd-5dbc-4ec4-a5c9-c55f3770ff9a"]}}};
onMessageHandler(message, {}, () => {
    console.log(arguments);
});