function countKeys(o) {
  let keyCount = 0;
  // eslint-disable-next-line guard-for-in, no-restricted-syntax
  for (const key in o) {
    if (typeof (o[key]) === 'object') {
      keyCount += 1;
      countKeys(o[key]);
    } else {
      keyCount += 1;
    }
  }

  return keyCount;
}

module.exports = {
  countKeys,
};
