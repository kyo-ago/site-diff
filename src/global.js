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
if (!HTMLCanvasElement.prototype.toBlob) {
    Object.defineProperty(HTMLCanvasElement.prototype, 'toBlob', {
        value: function (callback, type, quality) {

            var binStr = atob( this.toDataURL(type, quality).split(',')[1] ),
                len = binStr.length,
                arr = new Uint8Array(len);

            for (var i=0; i<len; i++ ) {
                arr[i] = binStr.charCodeAt(i);
            }

            callback( new Blob( [arr], {type: type || 'image/png'} ) );
        }
    });
}