const { validStatusAndMethod } = require('./helpers');

/*
 Validates proper combinations of request method and response status code.
 Possible combinations are:
 - 200: GET, DELETE, PATCH
 - 201: POST
 - 202: POST, DELETE, PATCH
 - 206: GET

 @targets: Action
 @minim: true
 */
function validateProperActionStatusCode(action) {
  for (const transaction of action.transactions || []) {
    // eslint-disable-next-line no-undef
    if (validStatusAndMethod(lodash.get(transaction, 'response.statusCode'), lodash.get(transaction, 'request.method'))) {
      return true;
    }
  }
  // eslint-disable-next-line no-multi-str
  return `No valid combination of status code and method. Valid combinations are:
  - 200: GET, DELETE, PATCH
  - 201: POST
  - 202: POST, DELETE, PATCH
  - 206: GET`;
}

module.exports = {
  validateProperActionStatusCode,
};
