# API Design Style Guide Contracts [![CircleCI](https://circleci.com/gh/apiaryio/constitutions.svg?style=svg&circle-token=32b6b19a59e02fdb795d2f47c80e37e2a2a9a033&ver=1)](https://circleci.com/gh/apiaryio/constitutions)

> **Let's define API Style Guides collaboratvelly on examples.** 

This repository containts executable examples of API Design Style Guide Rules (API Blueprint, OpeAPI/Swagger, ... code snippets) for test-driven development of API Description Language linters (style guide engines) to enable vendor indepndence, all the time up-to-date documentation tested in CI and preventing regressions caused by unwanted changes in behavior of underying Style Guide engines and linters implementation.

## How to write an API Design Style Guide

### 1. Prepare the Style Guide concepually
- Catch the idea
- Create a formal, textual specification
- Collect all the PDFs, Google Docs, Markdowns, READMEs, rtfs and and docxs you already have in your drawers

### 2. Breakdown the specification into single rules
- Browse existing rules and re-use
- Add good and bad examples for every single new rule using API Description language (OAS/Swagger, API Blueprint, ...)

### 3. TDD the linter rules, Add your Style Guide to CI
- Hook-up an API Description language Style Guide engine in and execute examples against Rules assertion code as fixtures in your tests (see: `/styleguide/sample-styleguide/linter/linter`

- Make the linter **pass** on all **good examples**
- Make the linter **fail** on all **bad examples**

```
$ ./scripts/test
Testing styleguide 'sample-styleguide'
  Testing rule 'sample-rule'
    Expecting good example 'sample-good-example' to pass
      PASS
    Expecting bad example 'sample-bad-example' to fail
      PASS
```

### 4. Generate the documentation

- Compile the Style Guide Documentation to a Markdown document

```
$ ./scripts/compile
```

- [Sample Style Guide Readme](./styleguides/sample-styleguide/README.md)
- [Sample Rule Readme](./rules/sample-rule/README.md)
- [Sample Good Example Readme](./rules/sample-rule/good-examples/sample-good-example/README.md)
- [Sample Bad Example Readme](./rules/sample-rule/bad-examples/sample-bad-example/README.md)



### 5. Collaborate, re-use, share, iterate

- Generate the documentation
- Not all rules can be expressed in current API Description languages, contrinute to their design
- Fork this repo, add your Rules, Good and Bad Eaxmples, and Styleguides

## How it works

It's just all files and a convention for a directory structure

```
├ rules                                   - Rule directory, put all the rules in this dir
│   └ sample-rule                         - Sample rule dir, clone to create a new one
│     ├ README.md                         - Generated Rule Readme, DO NOT EDIT
│     ├ api-element                       - The API Element target the rule applies to
│     ├ description                       - Rule verbal description
│     ├ function-name                     - Binding function name to the style guide validation
│     ├ title                             - Rule title
│     ├ bad-examples                      - Bad examples directory for the rule
│     │   └ sample-bad-example            - Sample bad example dir, clone to create a new ones
│     │     ├ README.md                   - Generated Bad Example Readme, DO NOT EDIT
│     │     ├ api-description-document    - Example document - OAS 2.0 (Swagger) or API Blueprint
│     │     ├ description                 - Bad example verbal description
│     │     ├ error                       - Expected error message for the rule violation
│     │     └ title                       - Bad Example human undesrdable title
│     └ good-examples                     - Good examples directory for the rule
│         └ sample-good-example           - Sample good example directory, clone to create a new one
│           ├ README.md                   - Genesrated Good Example Readme, DO NOT EDIT
│           ├ api-description-document    - Example document - OAS 2.0 (Swagger) or API Blueprint
│           ├ description                 - Good Example verbal desription
│           └ title                       - Good Example human understandable title
└ styleguides
  └ sample-styleguide                     - Sample Style Guide dir, clone to create a new one
    ├ README.md                           - Generated Styleguide Readme inculding the enabled rules
    ├ description                         - Human understandable styleguide description and introduction
    ├ enabled_rules                       - Rule directory names to be included in the styleguide
    ├ title                               - Style Guide human understandable title
    └ linter                              - Directory where the linter livers
      └ linters                           - API Description Linter executable command wrapper
```


