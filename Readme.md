# API Style Guide TDD Framework
- Structured documentation for API Style Guides and their reusable Rules
- Specify by good and bad codeexamples your API Style Guides for API Blueprint and Swagger
- Execute examples against Rules assertion code as fixtures in your tests
- Compile the Style Guide Documentation to a Markdown document


# How it works

It's just convention for a directory structure 

```
- rules             - rules directory, to create a new rule, just clone the example directory
 - template-rule    - example rule
  - good            - directory with bad API description good examples
   - good-example
    -
  - bad             - directory with all bad examples
    - bad-example   - directory with 

  - ...             - your new rules here

- styleguides
  - template        -
  - ...             - yor new styleguides here
```

You can either generate the documentation:

```
$./bin/compile
TODO - output here
```

Or programatically consume all the good and bad examples as fixtures and test your 
API Style Guide rules with it.



