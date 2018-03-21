function _objectFromEntries(arr) {
  var fromEntries = {};

  for (var k = 0; k < arr.length; ++k) {
    var array = arr[k];
    fromEntries[array[0]] = array[1];
  }

  return fromEntries;
}

module.exports = {
  objectFromEntries(arr) {
    return _objectFromEntries(arr);
  }
};
