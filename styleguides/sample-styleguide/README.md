# Example API Elements Style Guide Boilerplate [![CircleCI](https://circleci.com/gh/apiaryio/constitutions.svg?style=svg&circle-token=32b6b19a59e02fdb795d2f47c80e37e2a2a9a033)](https://circleci.com/gh/apiaryio/constitutions)

Textual description of the styleguide, some introduction and some **Markdown**


## Rules

###URIs are in uderscore delimited format
Applies to API Elements`hrefTemplate`

URI template components, URI template parameters, and request/response body properties should use snake_casing.

#### Good Examples
##### Underscore delimited

URI template fragmets are all underscore delimited

```
swagger: "2.0"
host: "api.tld"
schemes:
  - "https"
info:
  version: "1.0"
  title: "Hello World API"
paths:
  /hello_world:
    get:
      description: Returns hello world
      responses:
        200:
          description: Returns hello world
          schema:
            type: string
            example: Hello world
```

#### Bad Examples
##### Camel case

URI template has camel case formatted fragment

```
swagger: "2.0"
host: "api.tld"
schemes:
  - "https"
info:
  version: "1.0"
  title: "Hello World API"
paths:
  /helloWorld:
    get:
      description: Returns hello world
      responses:
        200:
          description: Returns hello world
          schema:
            type: string
            example: Hello world
```

> Error: Resource URI template piece 'helloWorld' should be cased like 'hello_world'



