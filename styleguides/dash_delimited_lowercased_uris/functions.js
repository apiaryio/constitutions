const { _isDowncasedDashSeparated, parseUriTemplate } = require('../helpers');

/*
 Validates if literal parts of the URI templates are dash separated and lowercased.
 It expects no underscores and capital characters.

 @targets: Resource_URI_Template
 @minim: true
 */
function validateUriPartsDashSeparatedLowercase(data) {
  // eslint-disable-next-line no-param-reassign
  data = data.toValue();

  if (!data) {
    return false;
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
  for (const part of literalParts) {
    if (!_isDowncasedDashSeparated(part)) {
      return `Uri part "${part}" is not lowercased or dash separated.`;
    }
  }
  return true;
}

module.exports = {
  validateUriPartsDashSeparatedLowercase,
};
