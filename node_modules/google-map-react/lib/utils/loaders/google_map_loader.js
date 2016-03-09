'use strict';

exports.__esModule = true;
exports['default'] = googleMapLoader;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _lodashCollectionFind = require('lodash/collection/find');

var _lodashCollectionFind2 = _interopRequireDefault(_lodashCollectionFind);

var _lodashCollectionReduce = require('lodash/collection/reduce');

var _lodashCollectionReduce2 = _interopRequireDefault(_lodashCollectionReduce);

var _es6Promise = require('es6-promise');

var $script_ = null;

var loadPromise_ = undefined;

var resolveCustomPromise_ = undefined;
var _customPromise = new _es6Promise.Promise(function (resolve) {
  resolveCustomPromise_ = resolve;
});

// TODO add libraries language and other map options

function googleMapLoader(bootstrapURLKeys) {
  if (!$script_) {
    $script_ = require('scriptjs');
  }

  // call from outside google-map-react
  // will be as soon as loadPromise_ resolved
  if (!bootstrapURLKeys) {
    return _customPromise;
  }

  if (loadPromise_) {
    return loadPromise_;
  }

  loadPromise_ = new _es6Promise.Promise(function (resolve, reject) {
    if (typeof window === 'undefined') {
      reject(new Error('google map cannot be loaded outside browser env'));
      return;
    }

    if (window.google && window.google.maps) {
      resolve(window.google.maps);
      return;
    }

    if (typeof window._$_google_map_initialize_$_ !== 'undefined') {
      reject(new Error('google map initialization error'));
    }

    window._$_google_map_initialize_$_ = function () {
      delete window._$_google_map_initialize_$_;
      resolve(window.google.maps);
    };

    if (process.env.NODE_ENV !== 'production') {
      if (_lodashCollectionFind2['default'](Object.keys(bootstrapURLKeys), 'callback')) {
        console.error('"callback" key in bootstrapURLKeys is not allowed, ' + // eslint-disable-line
        'use onGoogleApiLoaded property instead');
        throw new Error('"callback" key in bootstrapURLKeys is not allowed, ' + 'use onGoogleApiLoaded property instead');
      }
    }

    var queryString = _lodashCollectionReduce2['default'](Object.keys(bootstrapURLKeys), function (r, key) {
      return r + ('&' + key + '=' + bootstrapURLKeys[key]);
    }, '');

    $script_('https://maps.googleapis.com/maps/api/js?callback=_$_google_map_initialize_$_' + queryString, function () {
      return typeof window.google === 'undefined' && reject(new Error('google map initialization error (not loaded)'));
    });
  });

  resolveCustomPromise_(loadPromise_);

  return loadPromise_;
}

module.exports = exports['default'];