### URIs are in uderscore delimited format
Applies to API Targets `Resource_URI_Template`

URI template components, URI template parameters, and request/response body properties should use snake_casing.

#### Good Examples
##### /hello_world resource

some description

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
##### no /hello_world resource

some description

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




