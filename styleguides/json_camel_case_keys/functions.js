const { _isNormalCase, _isCamelCase } = require('../helpers');

/*
 Validates if JSON object keys are in camel-case format. It expects no
 dashes or underscores in field names.

 @targets: Request_Body, Response_Body
 @minim: true
 */
function validateJsonCamelCaseKeys(data) {
  // eslint-disable-next-line no-param-reassign
  data = data.toValue();

  if ((data == null) || (data === '')) {
    return true;
  }

  try {
    // eslint-disable-next-line no-param-reassign
    data = JSON.parse(data);
  } catch (error) {
    return true;
  }

  if (typeof (data) !== 'object') {
    return true;
  }

  const checkFields = (obj) => {
    // eslint-disable-next-line guard-for-in
    for (const key in obj) {
      if (typeof (obj[key]) === 'object') {
        checkFields(obj[key]);
      } else if (!_isCamelCase(key) && !_isNormalCase(key)) {
        throw new Error(`Key "${key}" is not in camel case format.`);
      }
    }
  };

  try {
    checkFields(data);
    return true;
  } catch (e) {
    return e.message;
  }
}

module.exports = {
  validateJsonCamelCaseKeys,
};
