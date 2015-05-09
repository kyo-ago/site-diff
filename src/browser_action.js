import './base';
import React from 'react';
global.React = React;
import Context from './Context';
import IndexComponent from './components/index';
(() => {
    if (!chrome || !chrome.tabs) {
        return;
    }
    let context = new Context();

    React.render(
        <IndexComponent context={context} />,
        document.querySelector('#content')
    );
})();
