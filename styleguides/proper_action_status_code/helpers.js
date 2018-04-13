function validStatusAndMethod(status, method) {
  const statusCodeMap = {
    200: ['GET', 'DELETE', 'PATCH'],
    201: ['POST'],
    202: ['POST', 'DELETE', 'PATCH'],
    206: ['GET'],
  };

  if (status && status.toValue) {
    // eslint-disable-next-line no-param-reassign
    status = status.toValue();
  }

  if (method && method.toValue) {
    // eslint-disable-next-line no-param-reassign
    method = method.toValue();
  }

  if (statusCodeMap[status] === undefined) { return false; }
  if (statusCodeMap[status].includes(method)) { return true; }
  return false;
}

module.exports = {
  validStatusAndMethod,
};
