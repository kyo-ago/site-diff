chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message['type'] !== 'results') {
        return;
    }
    let html = message['data']['data'].map((_) => `<img src="${_.blobURL}">`);
    document.querySelector('#content').innerHTML = html;
    console.log(message);
    sendResponse({'message':'success'});
});
