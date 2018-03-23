/*
 Validates if there is no property containing all-caps `ID` string in JSON object bodies.

 @targets: Request_Body, Response_Body
 @minim: true
 */
function preventAllCapsIdInJson(data) {
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

  function checkKeysForId(obj) {
    // eslint-disable-next-line guard-for-in
    for (const key in obj) {
      if (typeof (obj[key]) === 'object') {
        checkKeysForId(obj[key]);
      } else if (key.match(/ID$/g) !== null) {
        throw new Error(`Key "${key}" contains all caps "ID".`);
      }
    }
  }

  try {
    checkKeysForId(data);
    return true;
  } catch (e) {
    return e.message;
  }
}

module.exports = {
  preventAllCapsIdInJson,
};
