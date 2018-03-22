const fs = require('fs');
const _ = require('lodash');

function getTemplates(templatesDir = './lib/templates') {
  return {
    rule: fs.readFileSync(`${templatesDir}/Rule.md`, 'utf8'),
    styleGuide: fs.readFileSync(`${templatesDir}/StyleGuide.md`, 'utf8'),
    badExample: fs.readFileSync(`${templatesDir}/BadExample.md`, 'utf8'),
    goodExample: fs.readFileSync(`${templatesDir}/GoodExample.md`, 'utf8'),
  };
}

function getElements(elements) {
  if (_.isArray(elements)) {
    return elements.join(', ');
  }
  return elements;
}

function generateRule(rule) {
  let output = '';
  const templates = getTemplates();
  let goodExamples = '';
  let badExamples = '';

  _.each(rule.examples.good, (example) => {
    goodExamples += `${_.template(templates.goodExample)({
      title: example.meta.title,
      description: example.meta.description,
      add: example.add,
      elements: getElements(example.meta.target),
    })}\n`;
  });

  _.each(rule.examples.bad, (example) => {
    badExamples += `${_.template(templates.badExample)({
      title: example.meta.title,
      description: example.meta.description,
      add: example.add,
      error: example.meta.error,
      elements: getElements(example.meta.target),
    })}\n`;
  });

  output += _.template(templates.rule)({
    title: rule.rule.title,
    description: rule.rule.intent,
    functionFile: 'functions.js',
    elements: rule.rule.allowedTargets.join(', '),
    goodExamples,
    badExamples,
  });

  return output;
}


function generateStyleguide(styleGuides) {
  const templates = getTemplates();
  let generatedRules = '';


  _.each(styleGuides.rules, (rule) => {
    generatedRules += `${generateRule(rule)}\n`;
  });

  return _.template(templates.styleGuide)({
    title: styleGuides.title,
    description: styleGuides.description,
    rules: generatedRules,
  });
}

module.exports = {
  generateRule,
  generateStyleguide,
};
