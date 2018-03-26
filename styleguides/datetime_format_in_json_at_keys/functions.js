const { _isUtcIso8601DateTime } = require('../helpers');

/*
 Validates if body JSON object values under datetime fields
 identified by key with trailing `At` are in format
 of ISO 85601 [1] and in the UTC timezone.
 [1] https://www.iso.org/iso-8601-date-and-time-format.html

 @targets: Request_Body, Response_Body
 @minim: true
 */
function validateDatetimeFormatInJsonAtKeys(data) {
  // eslint-disable-next-line no-param-reassign
  data = data.toValue();
  if ((data == null) || (data === '')) {
    return true;
  }

  try {
    // eslint-disable-next-line no-param-reassign
    data = JSON.parse(data);
  } catch (e) {
    return true;
  }

  if (typeof (data) !== 'object') {
    return true;
  }

  const findAndCheckAtField = (obj) => {
    // eslint-disable-next-line guard-for-in
    for (const key in obj) {
      if (typeof (obj[key]) === 'object') {
        findAndCheckAtField(obj[key]);
      } else if (key.match(/At$/g) !== null) {
        if (!_isUtcIso8601DateTime(String(obj[key]), true)) {
          throw new Error(`Datetime key "${key}" is not in format ISO8601 or in UTC.`);
        }
      }
    }
  };

  try {
    findAndCheckAtField(data);
    return true;
  } catch (e) {
    return e.message;
  }
}

module.exports = {
  validateDatetimeFormatInJsonAtKeys,
};
