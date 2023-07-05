"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var inMemory = exports.inMemory = function inMemory(initial, transition) {
  var rootState = initial;
  var read = function read() {
    return rootState;
  };
  var write = function write(fn) {
    for (var _len = arguments.length, context = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      context[_key - 1] = arguments[_key];
    }

    var oldState = read();
    var newState = fn(oldState);
    transition.apply(undefined, [newState, oldState].concat(_toConsumableArray(context)));
    rootState = newState;
    return read();
  };
  return { read: read, write: write };
};

var webStorage = exports.webStorage = function webStorage(_ref, initial, transition) {
  var type = _ref.type,
      key = _ref.key;

  var store = window[type + "Storage"];
  if (initial !== undefined) {
    store.setItem(key, JSON.stringify(initial));
  }
  var read = function read() {
    return JSON.parse(store.getItem(key));
  };
  var write = function write(fn) {
    for (var _len2 = arguments.length, context = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      context[_key2 - 1] = arguments[_key2];
    }

    var oldState = read();
    var newState = fn(oldState);
    transition.apply(undefined, [newState, oldState].concat(_toConsumableArray(context)));
    store.setItem(key, JSON.stringify(newState));
    return read();
  };
  return { read: read, write: write };
};