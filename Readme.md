# Contracts for API Design Style Guides and Rules

Directory of reusable API Design Style Guide Rules specified by executable examples for API Descirption Language linters test-driven development, CI, portability and up-to-date documentation.

## How to write an executable, long-lasting API Design Style Guide

### 1. Prepare the Style Guide concepually
- Catch the idea
- Create a formal, textual specification

### 2. Breakdown the specification into single rules
- Add good and bad examples for every single rule using API Description language (OAS/Swagger, API Blueprint, RAML, ...)

### 3. TDD the linter rules, Add your Style Guide to CI
- Hook-up an API Description language Style Guide engine (linter)
- Make the linter **pass** on all **good examples**
- Make the linter **fail** on all **bad examples**
- Execute examples against Rules assertion code as fixtures in your tests
- To prevent regressions and unwanted changes in behavior of underying Style Guide engines
- Hook-up the styleguide and liter in the particular API Descrition lifecycle - test-suite and CI

### 4. Generate the documentation

- Compile the Style Guide Documentation to a Markdown document

```
$ ./scripts/compile
```

- [Sample Style Guide Readme](./styleguides/sample-styleguide/README.md)
- [Sample Rule Readme](./rules/sample-rule/README.md)
- [Sample Good Example Readme](./rules/sample-rule/good-examples/sample-good-example/README.md)
- [Sample Bad Example Readme](./rules/sample-rule/bad-examples/sample-bad-example/README.md)



### 5. Collaborate, re-use, share
- Generate the documentation
- Not all rules can be expressed in current API Description languages, contrinute to their design
- Fork this repo,

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
enging
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
    └ title                               - Style Guide human understandable title
```


