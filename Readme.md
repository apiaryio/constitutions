# API Style Guide TDD Framework
- Structured documentation for API Style Guides and their reusable Rules
- Specify by good and bad codeexamples your API Style Guides for API Blueprint and Swagger
- Execute examples against Rules assertion code as fixtures in your tests
- Compile the Style Guide Documentation to a Markdown document


# How it works

It's just all files and a convention for a directory structure

```
├ rules
│   └ sample-rule                         - Sample rule dir, clone to create a new one, dirname is rule id
│     ├ README.md                         - Generated Rule Readme, DO NOT EDIT
│     ├ api-element                       - The API Element target the rule applies to
│     ├ bad-examples                      - Bad examples directory for the rule
│     │   └ sample-bad-example            - Sample bad example dir, clone to create a new ones
│     │     ├ README.md                   - Generated Bad Example Readme, DO NOT EDIT
│     │     ├ api-description-document    - Example document - OAS 2.0 (Swagger) or API Blueprint
│     │     ├ description                 - Bad example verbal description
│     │     ├ error                       - Expected error message for the rule violation
│     │     └ title                       - Bad Example human undesrdable title
│     ├ description                       - Rule verbal description
│     ├ function-name                     - Binding function name to the style guide validation enging
│     ├ good-examples                     - Good examples directory for the rule
│     │   └ sample-good-example           - Sample good example directory, clone to create a new one
│     │     ├ README.md                   - Geenrated Good Example Readme, DO NOT EDIT
│     │     ├ api-description-document    - Example document - OAS 2.0 (Swagger) or API Blueprint
│     │     ├ description                 - Good Example verbal desription
│     │     └ title                       - Good Example human understandable title
│     └ title
└ styleguides
  └ sample-styleguide
    ├ README.md                           - Generated Styleguide Readme inculding the enabled rules
    ├ description                         - Human understandable styleguide description and introduction
    ├ enabled_rules                       - Rule directory names to be included in the styleguide
    └ title                               - Style Guide human understandable title
```

You can either generate the documentation:

```
$./bin/compile
TODO - output here
```

Or programatically consume all the good and bad examples as fixtures and test your
API Style Guide rules with it.



