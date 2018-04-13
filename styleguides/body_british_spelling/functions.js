const { _searchAmericanWord } = require('../helpers');

function validateBodyBritishSpelling(data) {
  // eslint-disable-next-line no-param-reassign
  data = data.toValue();

  const result = _searchAmericanWord(JSON.stringify(data));
  if (result) {
    return `Contains american spelling of word: ${result}`;
  }
  return true;
}

module.exports = {
  validateBodyBritishSpelling,
};
