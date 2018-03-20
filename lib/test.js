const helpers = require('./helpers');
const path = require('path');
const _ = require('lodash');
const fs = require('fs');
const async = require('async');

const styleGuides = helpers.getStyleGuides();
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
}) {
  return `[\u274C] FAILED: \`${ruleName}\` failed for \`${type}\` example \`${exampleTitle}\`
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
}) {
  return `[\u2713] PASSED: \`${ruleName}\` passed for \`${type}\` example \`${exampleTitle}\``;
}

function getResult({
  VkResult,
  rule,
  example,
  type,
}) {
  const vkError = _.get(VkResult[0], 'results[0].validatorError');
  let actual;

  if (vkError) {
    actual = `Validation error: ${vkError}`;
  } else {
    actual = _.get(VkResult[0], 'results[0].result');
  }

  // error expected
  if (_.get(example, 'meta.error')) {
    // got error
    if (_.isArray(VkResult) && VkResult.length !== 0) {
      // got error but different than defined
      if (actual !== example.meta.error) {
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
            target: example.meta.target,
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
        target: example.meta.target,
        type,
      }),
    };
  }

  // no error expected but got one
  if (_.isArray(VkResult) && VkResult.length !== 0) {
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
        target: example.meta.target,
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

  const tests = [];

  _.each(_.get(styleGuides, 'rules', []), (rule) => {
    _.each(_.get(rule, 'examples.good', []), (example) => {
      tests.push({
        rule,
        example,
        type: 'good',
      });
    });
    _.each(_.get(rule, 'examples.bad', []), (example) => {
      tests.push({
        rule,
        example,
        type: 'bad',
      });
    });
  });

  async.eachSeries(tests, (test, next) => {
    helpers.testExample({
      functions,
      example: test.example,
      functionName: test.rule.rule.functionName,
      minim: test.rule.rule.minim,
      apiaryToken,
    }, (error, results) => {
      if (error) {
        return next(error);
      }
      const result = getResult({
        VkResult: results,
        rule: test.rule,
        example: test.example,
        type: test.type,
      });

      if (!result.passed) {
        atLeastOneFailed = true;
        failed.push(result.message);
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
      console.error('\n\nSOME TESTS HAS FAILED:\n');

      _.each(failed, (message) => {
        console.error(` \n${message}`);
      });
      process.exit(1);
    }
    process.exit(0);
  });
});
