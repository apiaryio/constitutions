require('../config/env');

const fs = require('fs');
const nconf = require('nconf');
const path = require('path');

const defaultRulesDir = nconf.get('STYLEGUIDES_DIR');

function createNewRuleStructure(name, rulesDir = defaultRulesDir) {
  if (!name) {
    throw new Error('Rule name must be provided');
  }

  const dir = path.join(path.resolve(__dirname, `../${rulesDir}`), name);

  if (fs.existsSync(dir)) {
    throw new Error(`Rule \`${name}\` already exist`);
  }

  const badExampleBaseDir = path.join(dir, 'bad');
  const goodExampleBaseDir = path.join(dir, 'good');
  const badExampleDir = path.join(badExampleBaseDir, 'example');
  const goodExampleDir = path.join(goodExampleBaseDir, 'example');

  const goodExample = `# Title of good example
title:
# Description of good example
description:
# target this example will be tested against
target:
`;

  const badExample = `# Title of bad example
title:
# Description of bad example
description:
# expected error
error:
# target this example will be tested against
target:
`;

  const rule = `# title of this rule
title:
# intent/description of this rule
intent:
# list of allowed targets
allowedTargets:
minim: true
# name of the function defined in functions.js file
functionName:
`;

  const func = `function myFunction(data) {
  return JSON.stringify(data.toValue());
}

module.exports = {
  myFunction,
};
`;

  const add = `FORMAT: 1A

# Test 
`;

  fs.mkdirSync(dir);
  fs.mkdirSync(badExampleBaseDir);
  fs.mkdirSync(goodExampleBaseDir);
  fs.mkdirSync(badExampleDir);
  fs.mkdirSync(goodExampleDir);

  fs.writeFileSync(path.join(dir, 'functions.js'), func);
  fs.writeFileSync(path.join(dir, 'rule.yaml'), rule);
  fs.writeFileSync(path.join(badExampleDir, 'api-description-document'), add);
  fs.writeFileSync(path.join(badExampleDir, 'meta.yaml'), badExample);
  fs.writeFileSync(path.join(goodExampleDir, 'api-description-document'), add);
  fs.writeFileSync(path.join(goodExampleDir, 'meta.yaml'), goodExample);
}

createNewRuleStructure(process.argv[2]);
