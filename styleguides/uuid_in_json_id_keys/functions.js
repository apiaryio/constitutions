const { _isUUID } = require('../helpers');
/*
 It validates that value under `id` key in body JSON object is in format of
 UUID [1].

 [1] http://en.wikipedia.org/wiki/Universally_unique_identifier

 @targets: Request_Body, Response_Body
 @minim: true
 */
function validateUUIDInJsonIdKeys(data) {
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

  const findAndCheckIdField = (obj) => {
    // eslint-disable-next-line guard-for-in
    for (const key in obj) {
      if (typeof (obj[key]) === 'object') {
        findAndCheckIdField(obj[key]);
      } else if (key === 'id') {
        if (!_isUUID(String(obj[key]))) {
          throw new Error(`Id key value \`${obj[key]}\`is not in UUID format.`);
        }
      }
    }
  };

  try {
    findAndCheckIdField(data);
    return true;
  } catch (e) {
    return e.message;
  }
}
module.exports = {
  validateUUIDInJsonIdKeys,
};
