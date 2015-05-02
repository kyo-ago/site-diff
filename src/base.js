import 'babel-core/polyfill';
import Promise from 'bluebird';
import monapt from 'monapt';
import React from 'react';
const global = (
      "undefined" !== typeof window ? window
    : "undefined" !== typeof global ? global
    : "undefined" !== typeof self ? self
    : {}
);
global.Promise = Promise;
global.monapt = monapt;
global.React = React;
