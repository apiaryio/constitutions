# API Design Style Guide Contracts [![CircleCI](https://circleci.com/gh/apiaryio/constitutions.svg?style=shield&circle-token=32b6b19a59e02fdb795d2f47c80e37e2a2a9a033&ver=1)](https://circleci.com/gh/apiaryio/constitutions)

> **Let's define API Style Guides collaboratively on examples.** 

This repository contains executable examples of API Design Style Guide Rules (API Blueprint, OpeAPI/Swagger, ... code snippets) to enable vendor independence, all the time up-to-date documentation tested in CI and preventing regressions caused by unwanted changes in behavior of underlying Style Guide engine.

## How to write an API Design Style Guide

### 1. Prepare the Style Guide concepually
- Catch the idea
- Create a written free-form verbal documentaion, formal specification, white paper etc..
- Collect all the PDFs, Google Docs, Markdowns, READMEs, rtfs and and docs you already have in your drawers

### 2. Breakdown the specification into single rules
- Identify and isolate single rules in the in the textual styleguide you created in the step 1
- Add good and bad examples for every single new rule using API Description language (OAS/Swagger, API Blueprint, ...)

### 3. Development of the rules

#### 3.1 Install prerequisites

- install [`node.js` v6+](https://nodejs.org/en/download/)
- install dependencies

```bash
$ npm install
```

#### 3.2 Create new styleguide rule directory structure and files

Fork this [repo](https://github.com/apiaryio/constitutions)

Run:

```
$ ./scripts/init name-of-your-new-rule-directory
```

The following structure should be created in `/styleguides` directory

```
├ main-rule-dir
│  └examples                                - examples directory
│     ├ bad                                 - bad examples directory
│     │  ├ bad-example1
│     │  │  ├ api-description-document      - API description document that should fail
│     │  │  └ meta.yaml                     - configuration and metadata for the example
│     │  └ bad-example2
│     │     ├ api-description-document
│     │     └ meta.yaml
│     └ good
│        └ good-example1                    - good examples directory
│           ├ api-description-document      - API description document that should pass
│           └ meta.yaml                     - configuration and metadata for the example
├ functions.js                              - validation function definition
├ rule.yaml                                 - rule configuration and metadata
└ README.md                                 - generated readme file (do not edit)
```

#### 3.3 Write the examples

Write at least one good and bad API description document.

#### 3.4 Write the validation function

Write the validation function to `functions.js`

Function must be defined by [declaration](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function). 
Function must be exported by 
    
```javascript
module.exports = {
  myFunction,
};  
```

Each function has one input parameter - [minim element](https://github.com/refractproject/minim-api-description) 
if `minim` is set to `true` in [rule configuration](#write-the-rule-configuration) or (deprecated) JSON object found on desired 
[path](#supported-targets) in 
[refract tree](https://github.com/refractproject/refract-spec/blob/master/namespaces/api-description-namespace.md). 
Function is not executed if no object is found.
The function must return true if validation passes or a string which describes reason of failure if validation fails.
You can `require` npm packages (after installing them to `node_modules`) or libraries.
[lodash](https://lodash.com/) package is available out of the box.
Any I/O are disallowed for security reasons.

#### 3.5 Write the rule configuration

Write the rule configuration to `rule.yaml`

```md
title: title of this rule
intent: intent/description of this rule
allowedTargets: list of allowed targets
minim: true
functionName: name of the function defined in functions.js file
```

`allowedTargets` is list of targets rule can be applied to.  

##### Supported targets

```md
api

meta
title
copy

resourceGroup
resourceGroup.title
resourceGroup.copy

resource
resource.title
resource.copy
resource.href
resource.hrefVariables

transition
transition.title
transition.method
transition.copy
transition.hrefVariables
transition.requestAndResponse

request
request.copy
request.messageBody
request.messageBodySchema
request.headers
request.header

response
response.statusCode
response.copy
response.messageBody
response.messageBodySchema
response.headers
response.header

header
```

#### 3.5 Write the build configuration

Write the build configuration to `./build/build.yaml`

```md
title: styleguide title
description: description of this styleguide
rules:
  - name-of-your-new-rule-directory
```

#### 3.6 Build and Test

by running

```bash
npm run test

```

- every rule defined in `./build/build.yaml` is tested against its good and bad example
- README.md file is generated for each rule defined in `./build/build.yaml` in its directory
- compound README.md file is generated to `./build/README.md`
- bundle with all functions and its dependencies defined in `./build/build.yaml` is generated to `./build/functions.js`
- `./build/rules.json` is generated

`rules.json` and `functions.js` bundle can be used for [Apiary Styleguides](https://help.apiary.io/tools/style-guide/) or 
[Apiary CLI](https://help.apiary.io/tools/apiary-cli/#using-apiary-style-guide)


### 4. Collaborate, re-use, share, iterate

If you feel that your rule(s) could beneficial for others, feel free to submit PR.

