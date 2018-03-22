# Tully's styleguides [![CircleCI](https://circleci.com/gh/apiaryio/constitutions.svg?style=svg&circle-token=32b6b19a59e02fdb795d2f47c80e37e2a2a9a033&ver=1)](https://circleci.com/gh/apiaryio/constitutions)

description of this satyleguide


## Rules

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





### Only British spelling
Applies to API Targets `Request_Body, Response_Body`

Validates if there is no american spelling in JSON object bodies

#### Good Examples
##### US spelling not used

word `scandalising` is spelled correctly

Applies to API Target(s) `Request_Body, Response_Body`

```
FORMAT: 1A

# test

## test [/test]


### test post [POST]

+ Request (application/json)

        {
            "scandalising": 1
        }

+ Response 200 (application/json)

        {
            "scandalising": 1
        }

```



#### Bad Examples
##### US spelling used

word `scandalizing` should be spelled `scandalising`

Applies to API Target(s) `Request_Body, Response_Body`

```
FORMAT: 1A

# test

## test [/test]


### test post [POST]

+ Request (application/json)

        {
            "scandalizing": 1
        }

+ Response 200 (application/json)

        {
            "scandalizing": 1
        }

```

> Error: Contains american spelling of word: scandalizing





### JSON body string is a pretty printed JSON.
Applies to API Targets `Request_Body, Response_Body`

JSON body string is a pretty printed JSON. It naively expects at least one line per key in parsed object.

#### Good Examples
##### Pretty Printed JSON Request_Body

JSON body string is a pretty printed JSON.

Applies to API Target(s) `Request_Body`

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

        {
            id": 1
        }

```



#### Bad Examples
##### Pretty Printed JSON fubar

JSON body string is not a pretty printed JSON but fubar.

Applies to API Target(s) `Response_Body, Request_Body`

```
FORMAT: 1A

# test

## test [/test]


### test post [POST]

+ Request (application/json)

        {"id": 1, "name":
        {                                     "first": "John", "last":   "Snow"},                   "weapon": "sword"}

+ Response 200 (application/json)

        {"id": 1, "name":
                {                                     "first": "John", "last":   "Snow"},                   "weapon": "sword"}

```

> Error: JSON is not pretty-printed, expecting one key per line.

##### Pretty Printed JSON

JSON body string is not a pretty printed JSON but in one line.

Applies to API Target(s) `Response_Body, Request_Body`

```
FORMAT: 1A

# test

## test [/test]


### test post [POST]

+ Request (application/json)

        {"id": 1, "name": { "first": "John", "last": "Snow"}, "weapon": "sword"}

+ Response 200 (application/json)

        {"id": 1, "name": { "first": "John", "last": "Snow"}, "weapon": "sword"}

```

> Error: JSON is not pretty-printed, expecting one key per line.







