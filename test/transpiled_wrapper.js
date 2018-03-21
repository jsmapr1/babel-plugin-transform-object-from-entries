function _objectFromEntries(arr) {
  var fromEntries = {};

  for (var k = 0; k < arr.length; ++k) {
    var array = arr[k];
    if (array && array.length !== 2) throw new Error("InvalidArguments");
    fromEntries[array[0]] = array[1];
  }

  return fromEntries;
}

module.exports = {
  objectFromEntries(arr) {
    return _objectFromEntries(arr);
  }
};
