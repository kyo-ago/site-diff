import 'babel-core/polyfill';
import Promise from 'bluebird';
import monapt from 'monapt';
const global = (
      "undefined" !== typeof window ? window
    : "undefined" !== typeof global ? global
    : "undefined" !== typeof self ? self
    : {}
);
global.Promise = Promise;
global.monapt = monapt;
