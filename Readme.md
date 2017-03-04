# API Style Guide TDD Framework
- Structured documentation for API Style Guides and their reusable Rules
- Specify by good and bad codeexamples your API Style Guides for API Blueprint and Swagger
- Execute examples against Rules assertion code as fixtures in your tests
- Compile the Style Guide Documentation to a Markdown document


# How it works

It's just all files and a convention for the directory structure

```
├ rules
│   └ sample-rule                         - Sample rule directory
│     ├ README.md                         - Generated Rule Readme
│     ├ api-element                       - The API Element target the rule applies to
│     ├ bad-examples
│     │   └ sample-bad-example
│     │     ├ README.md
│     │     ├ api-description-document
│     │     ├ description
│     │     ├ error
│     │     └ title
│     ├ description
│     ├ function-name
│     ├ good-examples
│     │   └ sample-good-example
│     │     ├ README.md
│     │     ├ api-description-document
│     │     ├ description
│     │     └ title
│     └ title
└ styleguides
  └ sample-styleguide
    ├ README.md
    ├ description
    ├ enabled_rules
    └ title
```

You can either generate the documentation:

```
$./bin/compile
TODO - output here
```

Or programatically consume all the good and bad examples as fixtures and test your
API Style Guide rules with it.



