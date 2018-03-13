module.exports = {
  'extends': 'airbnb',
  'env': {
    'node': true
  },

  'rules': {
    'prefer-destructuring': ['error', {'object': true, 'array': false}],
    'no-console': 0,
    'func-names': ['error', 'never'],
    'no-underscore-dangle': 0,
    'max-len': ["error", { "code": 120 }],
    'func-style': ["error", "declaration"]
  }
};
