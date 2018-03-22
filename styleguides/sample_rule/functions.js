function someFunction(data) {
  if (data.toValue() !== '/hello_world') {
    return 'ooooo nooooooo error!';
  }
  return true;
}

module.exports = {
  someFunction,
};
