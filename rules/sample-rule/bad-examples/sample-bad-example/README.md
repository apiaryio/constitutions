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