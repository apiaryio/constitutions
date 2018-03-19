const YAML = require('js-yaml');
const fs = require('fs');
const glob = require('glob');
const _ = require('lodash');

const defaultRulesDir = 'styleguides';

function getAllRules(rulesDir = defaultRulesDir) {
  return _.map(glob.sync(`${rulesDir}/*`), rule => _.last(rule.split('/')));
}

function getRulesNames(allRules, allowedRules) {
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

function testRuleStructure(ruleName, rulesDir = defaultRulesDir) {
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


  function getExamplesConf(exampleDir, type) {
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
    getExamplesConf(`${ruleDir}examples/bad`, 'bad');
    getExamplesConf(`${ruleDir}examples/good`, 'good');
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

function getRule(ruleName, rulesDir = defaultRulesDir) {
  const checkedRule = testRuleStructure(ruleName, rulesDir);

  function getExamples(examples) {
    return _.map((examples || []), example => ({
      add: fs.readFileSync(example.add.file, 'utf8'),
      meta: YAML.safeLoad(fs.readFileSync(example.meta.file, 'utf8')),
    }));
  }

  return {
    ruleName,
    functionsFile: checkedRule.functions.file,
    rule: YAML.safeLoad(fs.readFileSync(checkedRule.rule.file, 'utf8')),
    ruleDir: checkedRule.rule.ruleDir,
    examples: {
      good: getExamples(checkedRule.examples.good || []),
      bad: getExamples(checkedRule.examples.bad || []),
    },
  };
}

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

  _.each(getRulesNames(getAllRules(), allowedRules), (ruleName) => {
    rules.rules.push(getRule(ruleName));
  });

  return rules;
}

module.exports = {
  getStyleGuides,
  getRule,
};

