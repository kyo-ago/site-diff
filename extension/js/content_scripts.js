'use strict';

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function contentScript() {
    var BasePosition = (function () {
        function BasePosition(_ref) {
            var global = _ref.global;

            _classCallCheck(this, BasePosition);

            this.global = global;
        }

        _createClass(BasePosition, [{
            key: 'save',
            value: function save() {
                this.scrollX = this.global.scrollX;
                this.scrollY = this.global.scrollY;
            }
        }, {
            key: 'restore',
            value: function restore() {
                this.global.scrollTo(this.scrollX, this.scrollY);
            }
        }]);

        return BasePosition;
    })();

    var ContentSize = (function () {
        function ContentSize(_ref2) {
            var global = _ref2.global;
            var _ref2$padding = _ref2.padding;
            var padding = _ref2$padding === undefined ? 200 : _ref2$padding;

            _classCallCheck(this, ContentSize);

            this.global = global;
            this.padding = padding;
            this.fullWidth = this._getMaxSize('Width');
            this.fullHeight = this._getMaxSize('Height');

            var width = global.innerWidth;
            this.fullWidth = this.fullWidth <= width + 1 ? width : this.fullWidth;
        }

        _createClass(ContentSize, [{
            key: 'getScopes',
            value: function getScopes() {
                var windowWidth = this.global.innerWidth;
                var windowHeight = this.global.innerHeight;
                var height = windowHeight - (windowHeight > this.padding ? this.padding : 0);
                var width = windowWidth;
                var heightLength = Math.ceil(this.fullHeight / height);
                var widthLength = Math.ceil(this.fullWidth / width);
                var results = [];
                Array(heightLength).join(',').split(',').forEach(function (_, heightIndex) {
                    Array(widthLength).join(',').split(',').forEach(function (_, widthIndex) {
                        results.push([width * widthIndex, height * heightIndex]);
                    });
                });
                return results;
            }
        }, {
            key: 'getFullSize',
            value: function getFullSize() {
                return {
                    width: this.fullWidth,
                    height: this.fullHeight };
            }
        }, {
            key: '_getMaxSize',
            value: function _getMaxSize(type) {
                var doc = this.global.document;
                return Math.max(doc.documentElement['client' + type], doc.body['scroll' + type], doc.documentElement['scroll' + type], doc.body['offset' + type], doc.documentElement['offset' + type]);
            }
        }]);

        return ContentSize;
    })();

    var Scroller = (function () {
        function Scroller(_ref3) {
            var global = _ref3.global;

            _classCallCheck(this, Scroller);

            this.global = global;

            this.basePosition = new BasePosition({ global: global });
            this.basePosition.save();

            var contentSize = new ContentSize({ global: global });
            this.scopes = contentSize.getScopes();
            this.contentFullSize = contentSize.getFullSize();

            this.originalOverflow = this.global.document.documentElement.style.overflow;
        }

        _createClass(Scroller, [{
            key: 'initialize',
            value: function initialize() {
                this.global.document.documentElement.style.overflow = 'hidden';
            }
        }, {
            key: 'doScroll',
            value: function doScroll(index) {
                var scope = this.scopes[index];
                if (!scope) {
                    return;
                }
                this.global.scrollTo(scope[0], scope[1]);
                return scope;
            }
        }, {
            key: 'getContentFullSize',
            value: function getContentFullSize() {
                var _contentFullSize = this.contentFullSize;
                var width = _contentFullSize.width;
                var height = _contentFullSize.height;

                console.assert(Number.isSafeInteger(width));
                console.assert(Number.isSafeInteger(height));
                return { width: width, height: height };
            }
        }, {
            key: 'getScopeSize',
            value: function getScopeSize() {
                var length = this.scopes.length;
                console.assert(Number.isSafeInteger(length));
                return length;
            }
        }, {
            key: 'destroy',
            value: function destroy() {
                this.global.document.documentElement.style.overflow = this.originalOverflow;
                this.basePosition.restore();
            }
        }]);

        return Scroller;
    })();

    var global = getGlobal();
    if (global.hasScreenCapturePage) {
        return;
    }

    var TypeCommands = {
        context: {},
        ready: function ready(_ref4) {
            var request = _ref4.request;
            var callback = _ref4.callback;

            this.context = {};
            this.context.scroller = new Scroller({ global: global });
            this.context.scroller.initialize();
            callback({
                type: 'Initialized',
                contentFullSize: this.context.scroller.getContentFullSize(),
                maxIndexSize: this.context.scroller.getScopeSize(),
                devicePixelRatio: global.devicePixelRatio || 1
            });
        },
        doScroll: function doScroll(_ref5) {
            var request = _ref5.request;
            var callback = _ref5.callback;
            var index = request.index;

            var result = this.context.scroller.doScroll(index);
            console.assert(Array.isArray(result));
            callback({
                type: 'ScrollResult',
                left: result[0],
                top: result[1]
            });
        },
        done: function done(_ref6) {
            var request = _ref6.request;
            var callback = _ref6.callback;

            this.context.scroller.destroy();
            this.context = {};
        }
    };
    chrome.extension.onMessage.addListener(onMessage);
    console.log(chrome.extension.onMessage.addListener);
    function onMessage(request, sender, callback) {
        console.log(request);
        var type = request.type;
        if (TypeCommands[type]) {
            TypeCommands[type]({ request: request, callback: callback });
            return true;
        }
        return false;
    }
    function getGlobal() {
        return 'undefined' !== typeof window ? window : 'undefined' !== typeof global ? global : 'undefined' !== typeof self ? self : {};
    }
}
contentScript();