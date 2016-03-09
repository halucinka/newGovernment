'use strict';

exports.__esModule = true;

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _wrapJs = require('./wrap.js');

var LatLng = (function () {
  _createClass(LatLng, null, [{
    key: 'convert',
    value: function value(a) {
      if (a instanceof LatLng) {
        return a;
      }

      if (Array.isArray(a)) {
        return new LatLng(a[0], a[1]);
      }

      if ('lng' in a && 'lat' in a) {
        return new LatLng(a.lat, a.lng);
      }

      return a;
    },
    enumerable: true
  }]);

  function LatLng(lat, lng) {
    _classCallCheck(this, LatLng);

    if (isNaN(lat) || isNaN(lng)) {
      throw new Error('Invalid LatLng object: (' + lat + ', ' + lng + ')');
    }
    this.lat = +lat;
    this.lng = +lng;
  }

  LatLng.prototype.wrap = function wrap() {
    return new LatLng(this.lat, _wrapJs.wrap(this.lng, -180, 180));
  };

  return LatLng;
})();

exports['default'] = LatLng;
module.exports = exports['default'];