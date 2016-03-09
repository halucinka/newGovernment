'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utilsReact_version = require('./utils/react_version');

var _reactPureRenderFunction = require('react-pure-render/function');

var _reactPureRenderFunction2 = _interopRequireDefault(_reactPureRenderFunction);

var _marker_dispatcher = require('./marker_dispatcher');

var _marker_dispatcher2 = _interopRequireDefault(_marker_dispatcher);

var _google_map_map = require('./google_map_map');

var _google_map_map2 = _interopRequireDefault(_google_map_map);

var _google_map_markers = require('./google_map_markers');

var _google_map_markers2 = _interopRequireDefault(_google_map_markers);

var _google_map_markers_prerender = require('./google_map_markers_prerender');

var _google_map_markers_prerender2 = _interopRequireDefault(_google_map_markers_prerender);

var _utilsLoadersGoogle_map_loader = require('./utils/loaders/google_map_loader');

var _utilsLoadersGoogle_map_loader2 = _interopRequireDefault(_utilsLoadersGoogle_map_loader);

var _utilsDetect = require('./utils/detect');

var _utilsDetect2 = _interopRequireDefault(_utilsDetect);

var _utilsGeo = require('./utils/geo');

var _utilsGeo2 = _interopRequireDefault(_utilsGeo);

var _utilsArray_helper = require('./utils/array_helper');

var _utilsArray_helper2 = _interopRequireDefault(_utilsArray_helper);

var _utilsIs_plain_object = require('./utils/is_plain_object');

var _utilsIs_plain_object2 = _interopRequireDefault(_utilsIs_plain_object);

var _utilsPick = require('./utils/pick');

var _utilsPick2 = _interopRequireDefault(_utilsPick);

var _utilsRaf = require('./utils/raf');

var _utilsRaf2 = _interopRequireDefault(_utilsRaf);

var _utilsMathLog2 = require('./utils/math/log2');

var _utilsMathLog22 = _interopRequireDefault(_utilsMathLog2);

var _lodashObjectAssign = require('lodash/object/assign');

var _lodashObjectAssign2 = _interopRequireDefault(_lodashObjectAssign);

var _lodashLangIsNumber = require('lodash/lang/isNumber');

var _lodashLangIsNumber2 = _interopRequireDefault(_lodashLangIsNumber);

// To avoid Error with React 13, webpack will generate warning not error
// more details is here https://github.com/orgsync/react-list/pull/54
var ReactDOM = undefined;
if (_utilsReact_version.isReact14(_react2['default'])) {
  try {
    ReactDOM = require('react-dom');
  } catch (e) {
    ReactDOM = _react2['default'];
  }
} else {
  ReactDOM = _react2['default'];
}

var kEPS = 0.00001;
var K_GOOGLE_TILE_SIZE = 256;
// real minZoom calculated here _getMinZoom
var K_IDLE_TIMEOUT = 100;
var K_IDLE_CLICK_TIMEOUT = 300;
var DEFAULT_MIN_ZOOM = 3;

function defaultOptions_() /* maps */{
  return {
    overviewMapControl: false,
    streetViewControl: false,
    rotateControl: true,
    mapTypeControl: false,
    // disable poi
    styles: [{ featureType: 'poi', elementType: 'labels', stylers: [{ visibility: 'off' }] }],
    minZoom: DEFAULT_MIN_ZOOM };
}

// dynamically recalculted if possible during init
var latLng2Obj = function latLng2Obj(latLng) {
  return _utilsIs_plain_object2['default'](latLng) ? latLng : { lat: latLng[0], lng: latLng[1] };
};

var GoogleMap = (function (_Component) {
  _inherits(GoogleMap, _Component);

  _createClass(GoogleMap, null, [{
    key: 'propTypes',
    value: {
      apiKey: _react.PropTypes.string,
      bootstrapURLKeys: _react.PropTypes.any,

      defaultCenter: _react2['default'].PropTypes.oneOfType([_react.PropTypes.array, _react.PropTypes.shape({
        lat: _react.PropTypes.number,
        lng: _react.PropTypes.number
      })]),
      center: _react2['default'].PropTypes.oneOfType([_react.PropTypes.array, _react.PropTypes.shape({
        lat: _react.PropTypes.number,
        lng: _react.PropTypes.number
      })]),
      defaultZoom: _react.PropTypes.number,
      zoom: _react.PropTypes.number,
      onBoundsChange: _react.PropTypes.func,
      onChange: _react.PropTypes.func,
      onClick: _react.PropTypes.func,
      onChildClick: _react.PropTypes.func,
      onChildMouseDown: _react.PropTypes.func,
      onChildMouseUp: _react.PropTypes.func,
      onChildMouseMove: _react.PropTypes.func,
      onChildMouseEnter: _react.PropTypes.func,
      onChildMouseLeave: _react.PropTypes.func,
      onZoomAnimationStart: _react.PropTypes.func,
      onZoomAnimationEnd: _react.PropTypes.func,
      onDrag: _react.PropTypes.func,
      options: _react.PropTypes.any,
      distanceToMouse: _react.PropTypes.func,
      hoverDistance: _react.PropTypes.number,
      debounced: _react.PropTypes.bool,
      margin: _react.PropTypes.array,
      googleMapLoader: _react.PropTypes.any,
      onGoogleApiLoaded: _react.PropTypes.func,
      yesIWantToUseGoogleMapApiInternals: _react.PropTypes.bool,
      draggable: _react.PropTypes.bool,
      style: _react.PropTypes.any
    },
    enumerable: true
  }, {
    key: 'defaultProps',
    value: {
      distanceToMouse: function distanceToMouse(pt, mousePos /* , markerProps */) {
        return Math.sqrt((pt.x - mousePos.x) * (pt.x - mousePos.x) + (pt.y - mousePos.y) * (pt.y - mousePos.y));
      },
      hoverDistance: 30,
      debounced: true,
      options: defaultOptions_,
      googleMapLoader: _utilsLoadersGoogle_map_loader2['default'],
      yesIWantToUseGoogleMapApiInternals: false,
      style: {
        width: '100%',
        height: '100%',
        margin: 0,
        padding: 0,
        position: 'relative'
      }
    },
    enumerable: true
  }, {
    key: 'googleMapLoader',
    value: _utilsLoadersGoogle_map_loader2['default'],
    // eslint-disable-line

    enumerable: true
  }]);

  function GoogleMap(props) {
    var _this = this;

    _classCallCheck(this, GoogleMap);

    _Component.call(this, props);
    this.shouldComponentUpdate = _reactPureRenderFunction2['default'];

    this._getMinZoom = function () {
      if (_this.geoService_.getWidth() > 0 || _this.geoService_.getHeight() > 0) {
        var tilesPerWidth = Math.ceil(_this.geoService_.getWidth() / K_GOOGLE_TILE_SIZE) + 2;
        var tilesPerHeight = Math.ceil(_this.geoService_.getHeight() / K_GOOGLE_TILE_SIZE) + 2;
        var maxTilesPerDim = Math.max(tilesPerWidth, tilesPerHeight);
        return Math.ceil(_utilsMathLog22['default'](maxTilesPerDim));
      }
      return DEFAULT_MIN_ZOOM;
    };

    this._initMap = function () {
      // only initialize the map once
      if (_this.initialized_) {
        return;
      }
      _this.initialized_ = true;

      var propsCenter = latLng2Obj(_this.props.center || _this.props.defaultCenter);
      _this.geoService_.setView(propsCenter, _this.props.zoom || _this.props.defaultZoom, 0);

      _this._onBoundsChanged(); // now we can calculate map bounds center etc...

      var bootstrapURLKeys = _extends({}, _this.props.apiKey && { key: _this.props.apiKey }, _this.props.bootstrapURLKeys);

      _this.props.googleMapLoader(bootstrapURLKeys).then(function (maps) {
        if (!_this.mounted_) {
          return;
        }

        var centerLatLng = _this.geoService_.getCenter();

        var propsOptions = {
          zoom: _this.props.zoom || _this.props.defaultZoom,
          center: new maps.LatLng(centerLatLng.lat, centerLatLng.lng)
        };

        // prevent to exapose full api
        // next props must be exposed (console.log(Object.keys(pick(maps, isPlainObject))))
        // "Animation", "ControlPosition", "MapTypeControlStyle", "MapTypeId",
        // "NavigationControlStyle", "ScaleControlStyle", "StrokePosition",
        // "SymbolPath", "ZoomControlStyle",
        // "event", "DirectionsStatus", "DirectionsTravelMode", "DirectionsUnitSystem",
        // "DistanceMatrixStatus",
        // "DistanceMatrixElementStatus", "ElevationStatus", "GeocoderLocationType",
        // "GeocoderStatus", "KmlLayerStatus",
        // "MaxZoomStatus", "StreetViewStatus", "TransitMode", "TransitRoutePreference",
        // "TravelMode", "UnitSystem"
        var mapPlainObjects = _utilsPick2['default'](maps, _utilsIs_plain_object2['default']);
        var options = typeof _this.props.options === 'function' ? _this.props.options(mapPlainObjects) : _this.props.options;
        var defaultOptions = defaultOptions_(mapPlainObjects);

        var draggableOptions = _this.props.draggable !== undefined && { draggable: _this.props.draggable };

        var minZoom = _this._getMinZoom();
        _this.minZoom_ = minZoom;

        var preMapOptions = _extends({}, defaultOptions, {
          minZoom: minZoom
        }, options, propsOptions);

        _this.defaultDraggableOption_ = preMapOptions.draggable !== undefined ? preMapOptions.draggable : _this.defaultDraggableOption_;

        var mapOptions = _extends({}, preMapOptions, draggableOptions);

        if (process.env.NODE_ENV !== 'production') {
          if (mapOptions.minZoom < minZoom) {
            console.warn('GoogleMap: ' + // eslint-disable-line
            'minZoom option is less than recommended ' + 'minZoom option for your map sizes.\n' + 'overrided to value ' + minZoom);
          }
        }

        if (mapOptions.minZoom < minZoom) {
          mapOptions.minZoom = minZoom;
        }

        var map = new maps.Map(ReactDOM.findDOMNode(_this.refs.google_map_dom), mapOptions);
        _this.map_ = map;
        _this.maps_ = maps;

        // render in overlay
        var this_ = _this;
        var overlay = _this.overlay_ = _lodashObjectAssign2['default'](new maps.OverlayView(), {
          onAdd: function onAdd() {
            var K_MAX_WIDTH = typeof screen !== 'undefined' ? screen.width + 'px' : '2000px';
            var K_MAX_HEIGHT = typeof screen !== 'undefined' ? screen.height + 'px' : '2000px';

            var div = document.createElement('div');
            this.div = div;
            div.style.backgroundColor = 'transparent';
            div.style.position = 'absolute';
            div.style.left = '0px';
            div.style.top = '0px';
            div.style.width = K_MAX_WIDTH; // prevents some chrome draw defects
            div.style.height = K_MAX_HEIGHT;

            var panes = this.getPanes();
            panes.overlayMouseTarget.appendChild(div);

            ReactDOM.render(_react2['default'].createElement(_google_map_markers2['default'], {
              onChildClick: this_._onChildClick,
              onChildMouseDown: this_._onChildMouseDown,
              onChildMouseEnter: this_._onChildMouseEnter,
              onChildMouseLeave: this_._onChildMouseLeave,
              geoService: this_.geoService_,
              projectFromLeftTop: true,
              distanceToMouse: this_.props.distanceToMouse,
              getHoverDistance: this_._getHoverDistance,
              dispatcher: this_.markersDispatcher_ }), div,
            // remove prerendered markers
            function () {
              return this_.setState({ overlayCreated: true });
            });
          },

          onRemove: function onRemove() {
            ReactDOM.unmountComponentAtNode(this.div);
          },

          draw: function draw() {
            var div = overlay.div;
            var overlayProjection = overlay.getProjection();
            var bounds = map.getBounds();
            var ne = bounds.getNorthEast();
            var sw = bounds.getSouthWest();
            var ptx = overlayProjection.fromLatLngToDivPixel(new maps.LatLng(ne.lat(), sw.lng()));

            // need round for safari still can't find what need for firefox
            var ptxRounded = _utilsDetect2['default']().isSafari ? { x: Math.round(ptx.x), y: Math.round(ptx.y) } : { x: ptx.x, y: ptx.y };

            this_.updateCounter_++;
            this_._onBoundsChanged(map, maps, !this_.props.debounced);

            if (!this_.googleApiLoadedCalled_) {
              this_._onGoogleApiLoaded({ map: map, maps: maps });
              this_.googleApiLoadedCalled_ = true;
            }

            div.style.left = ptxRounded.x + 'px';
            div.style.top = ptxRounded.y + 'px';
            if (this_.markersDispatcher_) {
              this_.markersDispatcher_.emit('kON_CHANGE');
            }
          }
        });

        overlay.setMap(map);

        maps.event.addListener(map, 'zoom_changed', function () {
          // recalc position at zoom start
          if (this_.geoService_.getZoom() !== map.getZoom()) {
            if (!this_.zoomAnimationInProgress_) {
              this_.zoomAnimationInProgress_ = true;
              this_._onZoomAnimationStart();
            }

            var TIMEOUT_ZOOM = 300;

            if (new Date().getTime() - _this.zoomControlClickTime_ < TIMEOUT_ZOOM) {
              // there is strange Google Map Api behavior in chrome when zoom animation of map
              // is started only on second raf call, if was click on zoom control
              // or +- keys pressed, so i wait for two rafs before change state

              // this does not fully prevent animation jump
              // but reduce it's occurence probability
              _utilsRaf2['default'](function () {
                return _utilsRaf2['default'](function () {
                  this_.updateCounter_++;
                  this_._onBoundsChanged(map, maps);
                });
              });
            } else {
              this_.updateCounter_++;
              this_._onBoundsChanged(map, maps);
            }
          }
        });

        maps.event.addListener(map, 'idle', function () {
          if (_this.resetSizeOnIdle_) {
            _this._setViewSize();
            var currMinZoom = _this._getMinZoom();

            if (currMinZoom !== _this.minZoom_) {
              _this.minZoom_ = currMinZoom;
              map.setOptions({ minZoom: currMinZoom });
            }

            _this.resetSizeOnIdle_ = false;
          }

          if (this_.zoomAnimationInProgress_) {
            this_.zoomAnimationInProgress_ = false;
            this_._onZoomAnimationEnd();
          }

          var div = overlay.div;
          var overlayProjection = overlay.getProjection();
          var bounds = map.getBounds();
          var ne = bounds.getNorthEast();
          var sw = bounds.getSouthWest();
          var ptx = overlayProjection.fromLatLngToDivPixel(new maps.LatLng(ne.lat(), sw.lng()));
          // need round for safari still can't find what need for firefox
          var ptxRounded = _utilsDetect2['default']().isSafari ? { x: Math.round(ptx.x), y: Math.round(ptx.y) } : { x: ptx.x, y: ptx.y };

          this_.updateCounter_++;
          this_._onBoundsChanged(map, maps);

          if (_this.mouse_) {
            var latLng = _this.geoService_.unproject(_this.mouse_, true);
            _this.mouse_.lat = latLng.lat;
            _this.mouse_.lng = latLng.lng;
          }

          _this._onChildMouseMove();

          this_.dragTime_ = 0;
          div.style.left = ptxRounded.x + 'px';
          div.style.top = ptxRounded.y + 'px';
          if (this_.markersDispatcher_) {
            this_.markersDispatcher_.emit('kON_CHANGE');
            if (this_.fireMouseEventOnIdle_) {
              this_.markersDispatcher_.emit('kON_MOUSE_POSITION_CHANGE');
            }
          }
        });

        maps.event.addListener(map, 'mouseover', function () {
          // has advantage over div MouseLeave
          this_.mouseInMap_ = true;
        });

        maps.event.addListener(map, 'mouseout', function () {
          // has advantage over div MouseLeave
          this_.mouseInMap_ = false;
          this_.mouse_ = null;
          this_.markersDispatcher_.emit('kON_MOUSE_POSITION_CHANGE');
        });

        maps.event.addListener(map, 'drag', function () {
          this_.dragTime_ = new Date().getTime();
          this_._onDrag();
        });
      })['catch'](function (e) {
        console.error(e); // eslint-disable-line no-console
        throw e;
      });
    };

    this._onGoogleApiLoaded = function () {
      if (_this.props.onGoogleApiLoaded) {
        var _props;

        if (process.env.NODE_ENV !== 'production' && _this.props.yesIWantToUseGoogleMapApiInternals !== true) {
          console.warn('GoogleMap: ' + // eslint-disable-line
          'Usage of internal api objects is dangerous ' + 'and can cause a lot of issues.\n' + 'To hide this warning add yesIWantToUseGoogleMapApiInternals={true} ' + 'to <GoogleMap instance');
        }

        (_props = _this.props).onGoogleApiLoaded.apply(_props, arguments);
      }
    };

    this._getHoverDistance = function () {
      return _this.props.hoverDistance;
    };

    this._onDrag = function () {
      var _props2;

      return _this.props.onDrag && (_props2 = _this.props).onDrag.apply(_props2, arguments);
    };

    this._onZoomAnimationStart = function () {
      var _props3;

      return _this.props.onZoomAnimationStart && (_props3 = _this.props).onZoomAnimationStart.apply(_props3, arguments);
    };

    this._onZoomAnimationEnd = function () {
      var _props4;

      return _this.props.onZoomAnimationEnd && (_props4 = _this.props).onZoomAnimationEnd.apply(_props4, arguments);
    };

    this._onChildClick = function () {
      if (_this.props.onChildClick) {
        var _props5;

        return (_props5 = _this.props).onChildClick.apply(_props5, arguments);
      }
    };

    this._onChildMouseDown = function (hoverKey, childProps) {
      if (_this.props.onChildMouseDown) {
        _this.childMouseDownArgs_ = [hoverKey, childProps];
        _this.props.onChildMouseDown(hoverKey, childProps, _extends({}, _this.mouse_));
      }
    };

    this._onChildMouseUp = function () {
      if (_this.childMouseDownArgs_) {
        if (_this.props.onChildMouseUp) {
          var _props6;

          (_props6 = _this.props).onChildMouseUp.apply(_props6, _this.childMouseDownArgs_.concat([_extends({}, _this.mouse_)]));
        }
        _this.childMouseDownArgs_ = null;
        _this.childMouseUpTime_ = new Date().getTime();
      }
    };

    this._onChildMouseMove = function () {
      if (_this.childMouseDownArgs_) {
        if (_this.props.onChildMouseMove) {
          var _props7;

          (_props7 = _this.props).onChildMouseMove.apply(_props7, _this.childMouseDownArgs_.concat([_extends({}, _this.mouse_)]));
        }
      }
    };

    this._onChildMouseEnter = function () {
      if (_this.props.onChildMouseEnter) {
        var _props8;

        return (_props8 = _this.props).onChildMouseEnter.apply(_props8, arguments);
      }
    };

    this._onChildMouseLeave = function () {
      if (_this.props.onChildMouseLeave) {
        var _props9;

        return (_props9 = _this.props).onChildMouseLeave.apply(_props9, arguments);
      }
    };

    this._setViewSize = function () {
      var mapDom = ReactDOM.findDOMNode(_this.refs.google_map_dom);
      _this.geoService_.setViewSize(mapDom.clientWidth, mapDom.clientHeight);
      _this._onBoundsChanged();
    };

    this._onWindowResize = function () {
      _this.resetSizeOnIdle_ = true;
    };

    this._onMapMouseMove = function (e) {
      if (!_this.mouseInMap_) return;

      var currTime = new Date().getTime();
      var K_RECALC_CLIENT_RECT_MS = 50;

      if (currTime - _this.mouseMoveTime_ > K_RECALC_CLIENT_RECT_MS) {
        _this.boundingRect_ = e.currentTarget.getBoundingClientRect();
      }
      _this.mouseMoveTime_ = currTime;

      var mousePosX = e.clientX - _this.boundingRect_.left;
      var mousePosY = e.clientY - _this.boundingRect_.top;

      if (!_this.mouse_) {
        _this.mouse_ = { x: 0, y: 0, lat: 0, lng: 0 };
      }

      _this.mouse_.x = mousePosX;
      _this.mouse_.y = mousePosY;

      var latLng = _this.geoService_.unproject(_this.mouse_, true);
      _this.mouse_.lat = latLng.lat;
      _this.mouse_.lng = latLng.lng;

      _this._onChildMouseMove();

      if (currTime - _this.dragTime_ < K_IDLE_TIMEOUT) {
        _this.fireMouseEventOnIdle_ = true;
      } else {
        _this.markersDispatcher_.emit('kON_MOUSE_POSITION_CHANGE');
        _this.fireMouseEventOnIdle_ = false;
      }
    };

    this._onClick = function () {
      var _props10;

      return _this.props.onClick && !_this.childMouseDownArgs_ && new Date().getTime() - _this.childMouseUpTime_ > K_IDLE_CLICK_TIMEOUT && _this.dragTime_ === 0 && (_props10 = _this.props).onClick.apply(_props10, arguments);
    };

    this._onMapClick = function (event) {
      if (_this.markersDispatcher_) {
        var currTime = new Date().getTime();
        if (currTime - _this.dragTime_ > K_IDLE_TIMEOUT) {
          if (_this.mouse_) {
            _this._onClick(_extends({}, _this.mouse_, {
              event: event
            }));
          }

          _this.markersDispatcher_.emit('kON_CLICK', event);
        }
      }
    };

    this._onMapMouseDownNative = function (event) {
      if (!_this.mouseInMap_) return;

      _this._onMapMouseDown(event);
      if (_this.props.draggable === false) {
        event.preventDefault();
        event.stopPropagation();
      }
    };

    this._onMapMouseDown = function (event) {
      if (_this.markersDispatcher_) {
        var currTime = new Date().getTime();
        if (currTime - _this.dragTime_ > K_IDLE_TIMEOUT) {
          _this.markersDispatcher_.emit('kON_MDOWN', event);
        }
      }
    };

    this._onMapMouseDownCapture = function () {
      if (_utilsDetect2['default']().isChrome) {
        // to fix strange zoom in chrome
        if (!_this.mouse_) {
          _this.zoomControlClickTime_ = new Date().getTime();
        }
      }
    };

    this._onKeyDownCapture = function () {
      if (_utilsDetect2['default']().isChrome) {
        _this.zoomControlClickTime_ = new Date().getTime();
      }
    };

    this._isCenterDefined = function (center) {
      return center && (_utilsIs_plain_object2['default'](center) && _lodashLangIsNumber2['default'](center.lat) && _lodashLangIsNumber2['default'](center.lng) || center.length === 2 && _lodashLangIsNumber2['default'](center[0]) && _lodashLangIsNumber2['default'](center[1]));
    };

    this._onBoundsChanged = function (map, maps, callExtBoundsChange) {
      if (map) {
        var gmC = map.getCenter();
        _this.geoService_.setView([gmC.lat(), gmC.lng()], map.getZoom(), 0);
      }

      if ((_this.props.onChange || _this.props.onBoundsChange) && _this.geoService_.canProject()) {
        var zoom = _this.geoService_.getZoom();
        var bounds = _this.geoService_.getBounds();
        var centerLatLng = _this.geoService_.getCenter();

        if (!_utilsArray_helper2['default'](bounds, _this.prevBounds_, kEPS)) {
          if (callExtBoundsChange !== false) {
            var marginBounds = _this.geoService_.getBounds(_this.props.margin);
            if (_this.props.onBoundsChange) {
              _this.props.onBoundsChange(_this.centerIsObject_ ? _extends({}, centerLatLng) : [centerLatLng.lat, centerLatLng.lng], zoom, bounds, marginBounds);
            }

            if (_this.props.onChange) {
              _this.props.onChange({
                center: _extends({}, centerLatLng),
                zoom: zoom,
                bounds: {
                  nw: {
                    lat: bounds[0],
                    lng: bounds[1]
                  },
                  se: {
                    lat: bounds[2],
                    lng: bounds[3]
                  }
                },
                marginBounds: {
                  nw: {
                    lat: marginBounds[0],
                    lng: marginBounds[1]
                  },
                  se: {
                    lat: marginBounds[2],
                    lng: marginBounds[3]
                  }
                },

                size: _this.geoService_.hasSize() ? {
                  width: _this.geoService_.getWidth(),
                  height: _this.geoService_.getHeight()
                } : {
                  width: 0,
                  height: 0
                }
              });
            }

            _this.prevBounds_ = bounds;
          }
        }
        // uncomment for strange bugs
        if (process.env.NODE_ENV !== 'production') {
          // compare with google calculations
          if (map) {
            var locBounds = map.getBounds();
            var ne = locBounds.getNorthEast();
            var sw = locBounds.getSouthWest();

            var gmC = map.getCenter();
            // compare with google map

            if (!_utilsArray_helper2['default']([centerLatLng.lat, centerLatLng.lng], [gmC.lat(), gmC.lng()], kEPS)) {
              console.info('GoogleMap center not eq:', // eslint-disable-line no-console
              [centerLatLng.lat, centerLatLng.lng], [gmC.lat(), gmC.lng()]);
            }

            if (!_utilsArray_helper2['default'](bounds, [ne.lat(), sw.lng(), sw.lat(), ne.lng()], kEPS)) {
              // this is normal if this message occured on resize
              console.info('GoogleMap bounds not eq:', '\n', // eslint-disable-line no-console
              bounds, '\n', [ne.lat(), sw.lng(), sw.lat(), ne.lng()]);
            }
          }
        }
      }
    };

    this.mounted_ = false;
    this.initialized_ = false;
    this.googleApiLoadedCalled_ = false;

    this.map_ = null;
    this.maps_ = null;
    this.prevBounds_ = null;

    this.mouse_ = null;
    this.mouseMoveTime_ = 0;
    this.boundingRect_ = null;
    this.mouseInMap_ = true;

    this.dragTime_ = 0;
    this.fireMouseEventOnIdle_ = false;
    this.updateCounter_ = 0;

    this.markersDispatcher_ = new _marker_dispatcher2['default'](this);
    this.geoService_ = new _utilsGeo2['default'](K_GOOGLE_TILE_SIZE);
    this.centerIsObject_ = _utilsIs_plain_object2['default'](this.props.center);

    this.minZoom_ = DEFAULT_MIN_ZOOM;
    this.defaultDraggableOption_ = true;

    this.zoomControlClickTime_ = 0;

    this.childMouseDownArgs_ = null;
    this.childMouseUpTime_ = 0;

    if (process.env.NODE_ENV !== 'production') {
      if (this.props.apiKey) {
        console.warn('GoogleMap: ' + // eslint-disable-line no-console
        'apiKey is deprecated, use ' + 'bootstrapURLKeys={{key: YOUR_API_KEY}} instead.');
      }

      if (this.props.onBoundsChange) {
        console.warn('GoogleMap: ' + // eslint-disable-line no-console
        'onBoundsChange is deprecated, use ' + 'onChange({center, zoom, bounds, ...other}) instead.');
      }

      if (this.props.center === undefined && this.props.defaultCenter === undefined) {
        console.warn('GoogleMap: center or defaultCenter' + // eslint-disable-line no-console
        'property must be defined');
      }

      if (this.props.zoom === undefined && this.props.defaultZoom === undefined) {
        console.warn('GoogleMap: zoom or defaultZoom' + // eslint-disable-line no-console
        'property must be defined');
      }
    }

    if (this._isCenterDefined(this.props.center || this.props.defaultCenter)) {
      var propsCenter = latLng2Obj(this.props.center || this.props.defaultCenter);
      this.geoService_.setView(propsCenter, this.props.zoom || this.props.defaultZoom, 0);
    }

    this.zoomAnimationInProgress_ = false;

    this.state = {
      overlayCreated: false
    };
  }

  GoogleMap.prototype.componentDidMount = function componentDidMount() {
    var _this2 = this;

    this.mounted_ = true;
    window.addEventListener('resize', this._onWindowResize);
    window.addEventListener('keydown', this._onKeyDownCapture, true);

    // gmap can't prevent map drag if mousedown event already occured
    // the only workaround I find is prevent mousedown native browser event
    ReactDOM.findDOMNode(this.refs.google_map_dom).addEventListener('mousedown', this._onMapMouseDownNative, true);

    window.addEventListener('mouseup', this._onChildMouseUp, false);

    var bootstrapURLKeys = _extends({}, this.props.apiKey && { key: this.props.apiKey }, this.props.bootstrapURLKeys);

    this.props.googleMapLoader(bootstrapURLKeys); // we can start load immediatly

    setTimeout(function () {
      // to detect size
      _this2._setViewSize();
      if (_this2._isCenterDefined(_this2.props.center || _this2.props.defaultCenter)) {
        _this2._initMap();
      }
    }, 0, this);
  };

  GoogleMap.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    var _this3 = this;

    if (process.env.NODE_ENV !== 'production') {
      if (this.props.defaultCenter !== nextProps.defaultCenter) {
        console.warn('GoogleMap: defaultCenter prop changed. ' + // eslint-disable-line
        'You can\'t change default props.');
      }

      if (this.props.defaultZoom !== nextProps.defaultZoom) {
        console.warn('GoogleMap: defaultZoom prop changed. ' + // eslint-disable-line
        'You can\'t change default props.');
      }
    }

    if (!this._isCenterDefined(this.props.center) && this._isCenterDefined(nextProps.center)) {
      setTimeout(function () {
        return _this3._initMap();
      }, 0);
    }

    if (this.map_) {
      var centerLatLng = this.geoService_.getCenter();
      if (nextProps.center) {
        var nextPropsCenter = latLng2Obj(nextProps.center);
        if (Math.abs(nextPropsCenter.lat - centerLatLng.lat) + Math.abs(nextPropsCenter.lng - centerLatLng.lng) > kEPS) {
          this.map_.panTo({ lat: nextPropsCenter.lat, lng: nextPropsCenter.lng });
        }
      }

      if (nextProps.zoom !== undefined) {
        // if zoom chaged by user
        if (Math.abs(nextProps.zoom - this.props.zoom) > 0) {
          this.map_.setZoom(nextProps.zoom);
        }
      }

      if (this.props.draggable !== undefined && nextProps.draggable === undefined) {
        // reset to default
        this.map_.setOptions({ draggable: this.defaultDraggableOption_ });
      } else if (this.props.draggable !== nextProps.draggable) {
        // also prevent this on window 'mousedown' event to prevent map move
        this.map_.setOptions({ draggable: nextProps.draggable });
      }
    }
  };

  GoogleMap.prototype.componentDidUpdate = function componentDidUpdate(prevProps) {
    this.markersDispatcher_.emit('kON_CHANGE');

    if (this.props.hoverDistance !== prevProps.hoverDistance) {
      this.markersDispatcher_.emit('kON_MOUSE_POSITION_CHANGE');
    }
  };

  GoogleMap.prototype.componentWillUnmount = function componentWillUnmount() {
    this.mounted_ = false;

    window.removeEventListener('resize', this._onWindowResize);
    window.removeEventListener('keydown', this._onKeyDownCapture);
    ReactDOM.findDOMNode(this.refs.google_map_dom).removeEventListener('mousedown', this._onMapMouseDownNative, true);
    window.removeEventListener('mouseup', this._onChildMouseUp, false);

    if (this.overlay_) {
      // this triggers overlay_.onRemove(), which will unmount the <GoogleMapMarkers/>
      this.overlay_.setMap(null);
    }

    if (this.maps_ && this.map_) {
      this.maps_.event.clearInstanceListeners(this.map_);
    }

    this.map_ = null;
    this.maps_ = null;
    this.markersDispatcher_.dispose();

    this.resetSizeOnIdle_ = false;

    delete this.map_;
    delete this.markersDispatcher_;
  };

  // calc minZoom if map size available
  // it's better to not set minZoom less than this calculation gives
  // otherwise there is no homeomorphism between screen coordinates and map
  // (one map coordinate can have different screen coordinates)

  GoogleMap.prototype.render = function render() {
    var mapMarkerPrerender = !this.state.overlayCreated ? _react2['default'].createElement(_google_map_markers_prerender2['default'], {
      onChildClick: this._onChildClick,
      onChildMouseDown: this._onChildMouseDown,
      onChildMouseEnter: this._onChildMouseEnter,
      onChildMouseLeave: this._onChildMouseLeave,
      geoService: this.geoService_,
      projectFromLeftTop: false,
      distanceToMouse: this.props.distanceToMouse,
      getHoverDistance: this._getHoverDistance,
      dispatcher: this.markersDispatcher_ }) : null;

    return _react2['default'].createElement(
      'div',
      {
        style: this.props.style,
        onMouseMove: this._onMapMouseMove,
        onMouseDownCapture: this._onMapMouseDownCapture,
        onClick: this._onMapClick
      },
      _react2['default'].createElement(_google_map_map2['default'], { ref: 'google_map_dom' }),
      mapMarkerPrerender
    );
  };

  return GoogleMap;
})(_react.Component);

exports['default'] = GoogleMap;
module.exports = exports['default'];

// this method works only if this.props.onChildMouseDown was called

// this method works only if this.props.onChildMouseDown was called

// K_IDLE_CLICK_TIMEOUT - looks like 300 is enough

// gmap can't prevent map drag if mousedown event already occured
// the only workaround I find is prevent mousedown native browser event
/* render markers before map load done */