const { _isPlural, parseUriTemplate } = require('../helpers');

/*
 Validates if last literal part of URI template is in plural form.

 @targets: Resource_URI_Template
 @minim: true
 */
function validatePluralisedResourceNamesInUri(data) {
  // eslint-disable-next-line no-param-reassign
  data = data.toValue();

  if (!data) {
    return false;
  }

  if (data === '/') {
    return true;
  }

  const parsed = parseUriTemplate(data);
  const literalParts = [];

  if (!parsed.expressions) {
    return false;
  }

  for (const expression of parsed.expressions) {
    if (expression.literal) {
      literalParts.push(expression.literal);
    }
  }

  let part = literalParts[literalParts.length - 1];
  part = part.replace(/\//g, '');

  if (!_isPlural(part)) {
    return `Last resource URI part "${part}" is not in plural form.`;
  }
  return true;
}
module.exports = {
  validatePluralisedResourceNamesInUri,
};
