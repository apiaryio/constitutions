### Sample rule title
Applies to API Targets `Resource_URI_Template, Response_Body`

Intent of the rule/description

#### Good Examples
##### title for 'should pass' example

some description for 'should pass' example

Applies to API Target(s) `Resource_URI_Template`

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
##### title for 'should fail' example

some description for 'should fail' example

Applies to API Target(s) `Resource_URI_Template, Response_Body`

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

> Error: ooooo nooooooo error!




