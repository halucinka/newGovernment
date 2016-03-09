'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _google_map_markersJs = require('./google_map_markers.js');

var _google_map_markersJs2 = _interopRequireDefault(_google_map_markersJs);

var style = {
  width: '50%',
  height: '50%',
  left: '50%',
  top: '50%',
  // backgroundColor: 'red',
  margin: 0,
  padding: 0,
  position: 'absolute'
};

// opacity: 0.3

var GoogleMapMarkersPrerender = (function (_Component) {
  _inherits(GoogleMapMarkersPrerender, _Component);

  function GoogleMapMarkersPrerender(props) {
    _classCallCheck(this, GoogleMapMarkersPrerender);

    _Component.call(this, props);
  }

  GoogleMapMarkersPrerender.prototype.render = function render() {
    return _react2['default'].createElement(
      'div',
      { style: style },
      _react2['default'].createElement(_google_map_markersJs2['default'], this.props)
    );
  };

  return GoogleMapMarkersPrerender;
})(_react.Component);

exports['default'] = GoogleMapMarkersPrerender;
module.exports = exports['default'];
/* PropTypes, */