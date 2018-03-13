const webpack = require('webpack');
const path = require('path');
const _ = require('lodash');
const fs = require('fs');

const helpers = require('./helpers');
const template = require('./templates');

const rules = helpers.getRules();

const webpackConfig = {
  entry: [],
  output: {
    path: path.resolve(__dirname, '../build/'),
    filename: 'functions.js',
    // library: 'functions',
    // libraryTarget: 'commonjs2'
    // libraryTarget: 'var'
  },
  target: 'node',
  // mode: 'production',
  cache: false,
  optimization: {
    minimize: false,
  },
};

// function getEntries(rules) {
//   const entries = [];
//   const basePath = path.resolve(__dirname, '../');
//
//   _.each(rules, (rule) => {
//     entries.push(path.join(basePath, rule.functionsFile));
//   });
//
//   return entries;
// }

function getEntry(inRules) {
  const basePath = path.resolve(__dirname, '../');

  let entryFile = '';
  let exports = 'module.exports = {\n';

  _.each(inRules, (rule) => {
    entryFile += `${rule.rule.functionName}_webpack = require('./${rule.functionsFile}').${rule.rule.functionName};\n`;
    exports += `${rule.rule.functionName}_webpack,\n`;
  });

  entryFile += `${exports}};\n`;


  const entryPath = path.join(basePath, 'entry.js');

  fs.writeFileSync(entryPath, entryFile);

  return entryPath;
}

_.each(rules.rules, (rule) => {
  fs.writeFileSync(`${rule.ruleDir}README.md`, template.generateRule(rule));
});

function getFunction(name) {
  const fcTemplate = `
function <%= name %>(data) {
    return <%= name %>_webpack(data);
}
    `;

  return _.template(fcTemplate)({
    name,
  });
}

function generateFunctions(wpConfig, inRules, cb) {
  webpack(wpConfig, (err) => {
    if (err) {
      return cb(err);
    }

    const functionsFile = `${wpConfig.output.path}/${wpConfig.output.filename}`;
    let exports = '';
    let generated = fs.readFileSync(functionsFile, 'utf8');

    _.each(inRules, (rule) => {
      generated += `\n${getFunction(rule.rule.functionName)}`;
      exports += `${rule.rule.functionName},\n`;
    });

    generated += `${'\nmodule.exports = {\n'}${exports}};\n`;

    fs.writeFileSync(functionsFile, generated);

    return cb();
  });
}

fs.writeFileSync(`${path.resolve(__dirname, '../build')}/README.md`, template.generateStyleguide(rules));

const entry = getEntry(rules.rules);

webpackConfig.entry = entry;

generateFunctions(webpackConfig, rules.rules, (err) => {
  if (err) {
    console.error(err);
  }
  fs.unlinkSync(entry);
});
