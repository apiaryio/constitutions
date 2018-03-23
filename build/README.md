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





### Validates if JSON body string is a pretty printed JSON.
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





### No all-caps ID's
Applies to API Targets `Request_Body, Response_Body`

Validates if there is no property containing all-caps `ID` string in JSON object bodies.

#### Good Examples
##### All-caps ID's

All-caps ID's are present in request or response bodies

Applies to API Target(s) `Request_Body, Response_Body`

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
            "id": 1
        }

```



#### Bad Examples
##### No all-caps ID's

No all-caps ID's are present in request nor response bodies

Applies to API Target(s) `Request_Body, Response_Body`

```
FORMAT: 1A

# test

## test [/test]


### test post [POST]

+ Request (application/json)

        {
            "ID": 1
        }

+ Response 200 (application/json)

        {
            "ID": 1
        }

```

> Error: Key "ID" contains all caps "ID".





### Validates proper combinations of request method and response status code.
Applies to API Targets `Action`

Possible combinations are:
   - 200: GET, DELETE, PATCH
   - 201: POST
   - 202: POST, DELETE, PATCH
   - 206: GET


#### Good Examples
##### Good combination of request method and response status code

201 response status code is allowed for POST request

Applies to API Target(s) `Action`

```
FORMAT: 1A

# test

## test [/test]


### test post [POST]

+ Request (application/json)

        {
            "id": 1
        }

+ Response 201 (application/json)

        {
            "id": 1
        }

```



#### Bad Examples
##### Bad combination of request method and response status code

200 response status code is not allowed for POST request

Applies to API Target(s) `Action`

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
            "id": 1
        }

```

> Error: No valid combination of status code and method. Valid combinations are:
  - 200: GET, DELETE, PATCH
  - 201: POST
  - 202: POST, DELETE, PATCH
  - 206: GET


##### Bad combination of request method and response status code

201 response status code is not allowed for GET request

Applies to API Target(s) `Action`

```
FORMAT: 1A

# test

## test [/test]


### test post [GET]

+ Request (application/json)

+ Response 201 (application/json)

        {
            "id": 1
        }

```

> Error: No valid combination of status code and method. Valid combinations are:
  - 200: GET, DELETE, PATCH
  - 201: POST
  - 202: POST, DELETE, PATCH
  - 206: GET






### Plural form URI template.
Applies to API Targets `Resource_URI_Template`

Validates if last literal part of URI template is in plural form.

#### Good Examples
##### URI is plurarised

Last part of the URI (`dogs`) is in plural form

Applies to API Target(s) `Resource_URI_Template`

```
FORMAT: 1A

# test

## test [/test/{id}/dogs]


### test post [GET]

+ Request (application/json)

```



#### Bad Examples
##### URI is not plurarised

Last part of the URI (`dog`) is not in plural form

Applies to API Target(s) `Resource_URI_Template`

```
FORMAT: 1A

# test

## test [/test/{id}/dog]


### test post [GET]

+ Request (application/json)

```

> Error: Last resource URI part "dog" is not in plural form.







