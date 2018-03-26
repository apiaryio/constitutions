/* global lodash */

/*
 Checks if response to DELETE request contains body

 @targets: Action
 @minim: true
 */
function validateDeleteNoBody(action) {
  for (const transaction of action.transactions || []) {
    if (lodash.get(transaction, 'request.method', '').toValue().toLocaleLowerCase() === 'delete' &&
      lodash.get(transaction, 'request.messageBody')) {
      return 'DELETE request must not have a body.';
    }
  }
  return true;
}

module.exports = {
  validateDeleteNoBody,
};
