const nconf = require('nconf');
const packagejson = require('./../package.json');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
nconf
  .use('memory')
  .argv()
  .env() // Load vars from cli and environment
  .defaults({
    NCONF_SETUP: '1', // Used for assuring correct boot sequence
    APPLICATION: {
      NAME: packagejson.nicename || packagejson.name || 'Unnamed restify application - missing name in package.json',
      VERSION: packagejson.version || '0.0.0',
    },
    TOKEN_URL: 'https://api.apiary.io/styleguide-cli/get-token',
    VALIDATE_URL: 'https://voight-kampff-aws.apiary-services.com/production/validate',
    STYLEGUIDES_DIR: 'styleguides',
    APIARY_API_KEY: undefined,
  });

