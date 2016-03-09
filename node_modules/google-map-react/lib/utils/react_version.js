'use strict';

exports.__esModule = true;
exports.isReact14 = isReact14;

function isReact14(React) {
  var version = React.version;

  if (typeof version !== 'string') {
    return false;
  }

  var sections = version.split('.');
  var major = parseInt(sections[0], 10);
  var minor = parseInt(sections[1], 10);

  return major === 0 && minor > 13;
}