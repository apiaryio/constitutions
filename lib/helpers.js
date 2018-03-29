require('../config/env');

const YAML = require('js-yaml');
const fs = require('fs');
const glob = require('glob');
const _ = require('lodash');
const nconf = require('nconf');
const request = require('request');
const async = require('async');
const path = require('path');

const defaultRulesDir = nconf.get('STYLEGUIDES_DIR');
const validateURL = nconf.get('VALIDATE_URL');
const tokenURL = nconf.get('TOKEN_URL');
const apiKey = nconf.get('APIARY_API_KEY');

function _checkApiKey() {
  if (!apiKey) {
    throw new Error('Error: API key must be provided through environment variable APIARY_API_KEY. ' +
    'Please go to https://login.apiary.io/tokens to obtain it.');
  }
}

function _getVKDataFromExample({
  functions,
  example,
  functionName,
  minim,
  target,
}) {
  if (!target) {
    // eslint-disable-next-line no-param-reassign
    target = _.get(example, 'meta.target', '');

    if (_.isArray(target)) {
      // eslint-disable-next-line no-param-reassign
      target = target[0];
    }
  }

  return {
    functions,
    rules: [{
      intent: _.get(example, 'meta.description', ''),
      ruleName: _.get(example, 'meta.title', ''),
      functionName,
      target,
      minim,
    }],
    add: example.add,
    failedOnly: true,
  };
}


function _callVK(data, token, cb) {
  let parsedBody;
  request.post(validateURL, {
    auth: {
      bearer: token,
    },
    headers: {
      'Accept-Encoding': 'identity',
      content_type: 'application/json',
      accepr: 'application/json',
    },
    json: data,
  }, (err, response, body) => {
    if (err) {
      return cb(err);
    }

    try {
      parsedBody = JSON.parse(body);
    } catch (e) {
      parsedBody = body;
    }

    if (!response.statusCode === 200) {
      return cb(new Error(`Validation error: ${response.statusCode}: ${_.get(parsedBody, 'message', 'unknown error')}`));
    }

    return cb(null, parsedBody);
  });
}

function _getAllRules(rulesDir = defaultRulesDir) {
  return _.map(glob.sync(`${rulesDir}/*`), rule => _.last(rule.split('/')));
}

function _getRulesNames(allRules, allowedRules) {
  if (allowedRules) {
    _.each(allowedRules, (rule) => {
      if (!_.includes(allRules, rule)) {
        throw new Error(`Unknown rule: ${rule}`);
      }
    });

    return allowedRules;
  }

  return allRules;
}

function _testRuleStructure(ruleName, rulesDir = defaultRulesDir) {
  const ruleDir = `${rulesDir}/${ruleName}/`;

  const toCheck = {
    functions: {
      file: `${ruleDir}functions.js`,
      error: `Function definition not found for rule \`${ruleName}\`: ${ruleDir}functions.js`,
    },
    // readme: {
    //   file: ruleDir + 'README.md',
    //   error: 'README not found for rule `' + ruleName + '`: ' + ruleDir + 'README.md'
    // },
    rule: {
      file: `${ruleDir}rule.yaml`,
      error: `Rule config not found for rule \`${ruleName}\`: ${ruleDir}rule.yaml`,
      ruleDir,
    },
    examples: {
      good: [],
      bad: [],
    },
  };


  function _getExamplesConf(exampleDir, type) {
    if (fs.existsSync(exampleDir)) {
      _.each(glob.sync(`${exampleDir}/*/`), (dir) => {
        toCheck.examples[type].push({
          add: {
            file: `${dir}api-description-document`,
            error: `No \`api-description-document\` found in ${dir}`,
          },
          meta: {
            file: `${dir}meta.yaml`,
            error: `No \`meta.yaml\` in ${dir}`,
          },
        });
      });
    }
  }

  if (fs.existsSync(`${ruleDir}examples`)) {
    _getExamplesConf(`${ruleDir}examples/bad`, 'bad');
    _getExamplesConf(`${ruleDir}examples/good`, 'good');
  }


  _.each(toCheck, (check, key) => {
    if (key !== 'examples') {
      if (!fs.existsSync(check.file)) {
        throw new Error(check.error);
      }
    } else {
      _.each(_.concat(check.good, check.bad), (example) => {
        if (!fs.existsSync(example.add.file)) {
          throw new Error(example.add.error);
        }
        if (!fs.existsSync(example.meta.file)) {
          throw new Error(example.meta.error);
        }
      });
    }
  });

  return toCheck;
}

function _getRule(ruleName, rulesDir = defaultRulesDir) {
  const checkedRule = _testRuleStructure(ruleName, rulesDir);
  const rule = YAML.safeLoad(fs.readFileSync(checkedRule.rule.file, 'utf8'));

  function getExamples(examples) {
    return _.map((examples || []), (example) => {
      const meta = YAML.safeLoad(fs.readFileSync(example.meta.file, 'utf8'));

      let targets;

      if (_.isArray(meta.target)) {
        targets = meta.target;
      } else {
        targets = [meta.target];
      }

      _.each(targets, (target) => {
        if ((rule.allowedTargets || []).indexOf(target) === -1) {
          throw new Error(`Target \`${target}\` is not allowed for rule \`${rule.title}\`. \
Use one of \`${rule.allowedTargets.join(', ')}\``);
        }
      });

      return {
        add: fs.readFileSync(example.add.file, 'utf8'),
        file: example.add.file,
        meta,
      };
    });
  }

  return {
    ruleName,
    functionsFile: checkedRule.functions.file,
    rule,
    ruleDir: checkedRule.rule.ruleDir,
    examples: {
      good: getExamples(checkedRule.examples.good || []),
      bad: getExamples(checkedRule.examples.bad || []),
    },
  };
}

// ******************************************************* //
// ******************************************************* //
// ******************************************************* //

function getStyleGuides(configFile = './build/build.yaml') {
  let config;
  let allowedRules = [];
  const rules = {
    title: '',
    description: '',
    rules: [],
  };

  try {
    config = YAML.safeLoad(fs.readFileSync(configFile, 'utf8'));
  } catch (e) {
    throw new Error(`Unable to load config file: \`${configFile}\`:${e.message}`);
  }

  if (config && config.rules) {
    allowedRules = config.rules;
    rules.title = config.title;
    rules.description = config.description;
  }

  _.each(_getRulesNames(_getAllRules(), allowedRules), (ruleName) => {
    rules.rules.push(_getRule(ruleName));
  });

  return rules;
}

function getApiaryToken(cb) {
  try {
    _checkApiKey();
  } catch (e) {
    return cb(e);
  }

  let parsedBody;

  return request.get(tokenURL, {
    headers: {
      authentication: `Token ${apiKey}`,
      'Content-Type': 'application/json',
      accept: 'application/json',
    },
  }, (error, response, body) => {
    if (error) {
      return cb(error);
    }

    try {
      parsedBody = JSON.parse(body);
    } catch (e) {
      parsedBody = body;
    }

    if (!(response.statusCode === 200 && _.get(parsedBody, 'jwt'))) {
      return cb(new Error(`Unable to get auth token: ${response.statusCode}: ${_.get(parsedBody, 'message', 'unknown error')}`));
    }

    return cb(null, _.get(parsedBody, 'jwt'));
  });
}

function testExample({
  functions,
  example,
  functionName,
  minim,
  apiaryToken,
  target,
}, cb) {
  async.waterfall([
    next => _callVK(_getVKDataFromExample({
      functions, example, functionName, minim, target,
    }), apiaryToken, next),
  ], (err, results) => {
    cb(err, results, target);
  });
}

module.exports = {
  getStyleGuides,
  getApiaryToken,
  testExample,
};

