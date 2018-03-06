# Tully's styleguides [![CircleCI](https://circleci.com/gh/apiaryio/constitutions.svg?style=svg&circle-token=32b6b19a59e02fdb795d2f47c80e37e2a2a9a033&ver=1)](https://circleci.com/gh/apiaryio/constitutions)

blablablah


## Rules

### URIs are in uderscore delimited format
Applies to API Elements `hrefTemplate`

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





### JSON body string is a pretty printed JSON.
Applies to API Elements `Request_Body, Response_Body`

JSON body string is a pretty printed JSON. It naively expects at least one line per key in parsed object.

#### Good Examples
##### Pretty Printed JSON

JSON body string is a pretty printed JSON.

```
FORMAT: 1A

# test

## test [/test]


### test post [POST]

+ Request (application/json)

        {
            "id": 1
        }

+ Response 200 (application/json)

        {id": 1}

```

##### Pretty Printed JSON

JSON body string is a pretty printed JSON.

```
FORMAT: 1A

# test

## test [/test]


### test post [POST]

+ Request (application/json)

        {"id": 1}

+ Response 200 (application/json)

        {
            "id": 1
        }

```



#### Bad Examples
##### Pretty Printed JSON

JSON body string is not a pretty printed JSON but fubar.

```
FORMAT: 1A

# test

## test [/test]


### test post [POST]

+ Request (application/json)

        {"id": 1,
                    "name": { "first":
                "John"
                ,
           "last":
           "Snow"}
           }

+ Response 200 (application/json)

        {"id": 1,
        "name": {
        "first":
        "John", "last":
        "Snow"}}
        "Snow"}}

```

> Error: JSON is not pretty-printed, expecting one key per line.

##### Pretty Printed JSON

JSON body string is not a pretty printed JSON but in one line.

```
FORMAT: 1A

# test

## test [/test]


### test post [POST]

+ Request (application/json)

        {"id": 1, "name": { "first": "John", "last": "Snow"}}

+ Response 200 (application/json)

        {"id": 1, "name": { "first": "John", "last": "Snow"}}

```

> Error: JSON is not pretty-printed, expecting one key per line.







