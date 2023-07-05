'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _plugins = require('./plugins');

exports.default = function (data) {
  var createStore = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _plugins.inMemory;

  var watchers = [];

  var transition = function transition() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return watchers.forEach(function (watcher) {
      return watcher.apply(undefined, args);
    });
  };

  return _extends({}, createStore(data, transition), {
    watch: function watch(fn) {
      watchers.push(fn);
    },
    unwatch: function unwatch(fn) {
      var idx = watchers.indexOf(fn);
      if (idx >= 0) {
        watchers.splice(idx, 1);
        return true;
      } else {
        return false;
      }
    }
  });
};