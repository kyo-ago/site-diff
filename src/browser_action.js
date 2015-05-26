let handler = (event) => {
    let text = event.target.value;
    let urls = text.split('\n').filter((_) => _).map((url) => {
        try {
            return new URL(url.trim()).href;
        } catch (e) {}
    });
    if (!urls.length) {
        return;
    }
    chrome.runtime.sendMessage({type: 'doCaptures', urls});
};
addEventListener('keyup', handler);
addEventListener('paste', handler);
addEventListener('load', () => {
    document.querySelector('textarea').focus();
});
