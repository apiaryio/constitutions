const helpers = require('./helpers');
const path = require('path');
const _ = require('lodash');
const fs = require('fs');
const async = require('async');

let styleGuides;

try {
  styleGuides = helpers.getStyleGuides();
} catch (e) {
  console.error(e.message);
  process.exit(1);
}

const functions = fs.readFileSync(path.resolve(__dirname, '../build/functions.js'), 'utf8');

function getFailErrorMessage({
  ruleName,
  functionName,
  functionsFile,
  exampleTitle,
  exampleFile,
  expected,
  actual,
  type,
  target,
}) {
  return `[\u274C] FAILED: \`${ruleName}\` failed for \`${type}\` example: \`${exampleTitle}\` (target: \`${target}\`)
  example: ${exampleFile}
  function: ${functionName} in ${functionsFile}
  - expected + actual 
    - ${expected}
    + ${actual}
  `;
}

function getPassedErrorMessage({
  ruleName,
  exampleTitle,
  type,
  target,
}) {
  return `[\u2713] PASSED: \`${ruleName}\` passed for \`${type}\` example: \`${exampleTitle}\` (target: \`${target}\`)`;
}

function compareErrors(err1, err2) {
  return err1.replace(/\n/g, ' ').replace(/ /g, '') === err2.replace(/\n/g, ' ').replace(/ /g, '');
}

function getResult({
  VkResult,
  rule,
  example,
  type,
  target,
}) {
  let vkError = _.get(VkResult[0], 'results[0].validatorError');
  let actual;

  if (vkError) {
    if (_.get(vkError, 'message')) {
      vkError = _.get(vkError, 'message');
    } else {
      vkError = JSON.stringify(vkError, null, 2);
    }
  }

  if (_.get(VkResult, 'message')) {
    vkError = `${_.get(VkResult, 'message')}\n ${_.get(VkResult, 'meta.message')}`;
  }


  if (vkError) {
    actual = `Validation error: ${vkError}`;
  } else {
    actual = _.get(VkResult[0], 'results[0].result');
  }

  // error expected
  if (_.get(example, 'meta.error')) {
    // got error
    if ((_.isArray(VkResult) && VkResult.length !== 0) || vkError) {
      // got error but different than defined
      if (!compareErrors(actual, example.meta.error) || vkError) {
        return {
          passed: false,
          message: getFailErrorMessage({
            ruleName: rule.ruleName,
            functionName: rule.rule.functionName,
            functionsFile: rule.functionsFile,
            exampleTitle: example.meta.title,
            exampleFile: example.file,
            expected: example.meta.error,
            actual,
            target: target || example.meta.target,
            type,
          }),
        };
      }
      // got error - same as defined
      return {
        passed: true,
        message: getPassedErrorMessage({
          ruleName: rule.ruleName,
          exampleTitle: example.meta.title,
          type,
          target: target || example.meta.target,
        }),
      };
    }

    // no error but one expected
    return {
      passed: false,
      message: getFailErrorMessage({
        ruleName: rule.ruleName,
        functionName: rule.rule.functionName,
        functionsFile: rule.functionsFile,
        exampleTitle: example.meta.title,
        exampleFile: example.file,
        expected: example.meta.error,
        actual: '',
        target: target || example.meta.target,
        type,
      }),
    };
  }

  // no error expected but got one
  if ((_.isArray(VkResult) && VkResult.length !== 0) || vkError) {
    return {
      passed: false,
      message: getFailErrorMessage({
        ruleName: rule.ruleName,
        functionName: rule.rule.functionName,
        functionsFile: rule.functionsFile,
        exampleTitle: example.meta.title,
        exampleFile: example.file,
        expected: '',
        actual,
        target: target || example.meta.target,
        type,
      }),
    };
  }

  // no error expected , got no error
  return {
    passed: true,
    message: getPassedErrorMessage({
      ruleName: rule.ruleName,
      exampleTitle: example.meta.title,
      type,
      target: target || example.meta.target,
    }),
  };
}

let atLeastOneFailed = false;
const failed = [];


helpers.getApiaryToken((err, apiaryToken) => {
  if (err) {
    console.error(err.message || err);
    process.exit(1);
  }

  function getTargets(example) {
    let targets = _.get(example, 'meta.target', []);

    if (!_.isArray(targets)) {
      targets = [targets];
    }

    return targets;
  }

  const tests = [];

  _.each(_.get(styleGuides, 'rules', []), (rule) => {
    _.each(_.get(rule, 'examples.good', []), (example) => {
      _.each(getTargets(example), (target) => {
        tests.push({
          rule,
          example,
          type: 'good',
          target,
        });
      });
    });
    _.each(_.get(rule, 'examples.bad', []), (example) => {
      _.each(getTargets(example), (target) => {
        tests.push({
          rule,
          example,
          type: 'bad',
          target,
        });
      });
    });
  });


  let currentRule = '';

  async.eachSeries(tests, (test, next) => {
    helpers.testExample({
      functions,
      example: test.example,
      functionName: _.get(test, 'rule.rule.functionName'),
      minim: _.get(test, 'rule.rule.minim'),
      target: test.target,
      apiaryToken,
    }, (error, results, target) => {
      if (error) {
        return next(error);
      }
      const result = getResult({
        VkResult: results,
        rule: test.rule,
        example: test.example,
        type: test.type,
        target,
      });

      if (!result.passed) {
        atLeastOneFailed = true;
        failed.push(result.message);
      }

      if (currentRule !== test.rule.ruleName) {
        currentRule = test.rule.ruleName;
        console.log('');
      }

      console.log(result.message);

      return next(null);
    });
  }, (asyncErr) => {
    if (asyncErr) {
      console.error(asyncErr);
      process.exit(1);
    }

    if (atLeastOneFailed) {
      console.error('\n\n------ SOME TESTS HAS FAILED: ----------------------\n');

      _.each(failed, (message) => {
        console.error(` \n${message}`);
      });
      process.exit(1);
    }

    console.log('\n');

    process.exit(0);
  });
});
