(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var handler = function handler(event) {
    var text = event.target.value;
    var urls = text.split('\n').filter(function (_) {
        return _;
    }).map(function (url) {
        try {
            return new URL(url.trim());
        } catch (e) {}
    });
    if (!urls.length) {
        return;
    }
    chrome.runtime.sendMessage({ type: 'doCaptures', urls: urls });
};
addEventListener('keyup', handler);
addEventListener('paste', handler);
addEventListener('load', function () {
    document.querySelector('textarea').focus();
});

},{}]},{},[1]);
