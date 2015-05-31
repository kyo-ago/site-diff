import './global';
import React from 'react';
import Context from './flux/Context';
import MainComponents from './flux/components/Main';

let context = new Context();

let onMessageHandler = (message, sender, sendResponse) => {
    console.log(JSON.stringify(message));
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
    React.createElement(MainComponents, { context }),
    document.getElementById('content')
);

let message = {"type":"doRender","data":{"type":"resultsMessage","data":[{"id":"fd073380-78ca-4595-9ed4-da23b20f7b3b","url":"http://localhost:8000/","captureVisibleTab":{"overWriteDevicePixelRatio":1,"devicePixelRatio":1},"captureTime":{},"blob":{},"fileUrl":"filesystem:chrome-extension://offfgaiokbekichbehggldmoemepimpn/temporary/fd073380-78ca-4595-9ed4-da23b20f7b3b"}]}}
onMessageHandler(message, {}, () => {
    console.log(arguments);
});