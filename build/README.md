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





### URI templates are dash separated and lowercased
Applies to API Targets `Resource_URI_Template`

Validates if literal parts of the URI templates are dash separated and lowercased. It expects no underscores and capital characters.

#### Good Examples
##### Dash separated and lowercased

Literal parts of the URI templates are dash separated and lowercased

Applies to API Target(s) `Resource_URI_Template`

```
FORMAT: 1A

# test

## test [/test-dash-and-lowercased/{id}]


### test post [GET]

+ Request (application/json)

```



#### Bad Examples
##### Not dash separated

Literal parts of the URI templates are not dash separated

Applies to API Target(s) `Resource_URI_Template`

```
FORMAT: 1A

# test

## test [/test_not_dash/{id}]


### test post [GET]

+ Request (application/json)

```

> Error: Uri part "/test_not_dash/" is not lowercased or dash separated.

##### Not dash lowercased

Literal parts of the URI templates are not dash lowercased

Applies to API Target(s) `Resource_URI_Template`

```
FORMAT: 1A

# test

## test [/test-Not-LoweRcased/{id}]


### test post [GET]

+ Request (application/json)

```

> Error: Uri part "/test-Not-LoweRcased/" is not lowercased or dash separated.





### camelCase JSON object keys
Applies to API Targets `Request_Body, Response_Body`

Validates if JSON object keys are in camel-case format. It expects no dashes or underscores in field names.

#### Good Examples
##### `camelCase-d` JSON object keys

JSON object key `idKey` is in cameCase format.

Applies to API Target(s) `Request_Body, Response_Body`

```
FORMAT: 1A

# test

## test [/test]


### test post [POST]

+ Request (application/json)

        {
            "idKey": 1
        }

+ Response 200 (application/json)

        {
            "idKey": 1
        }

```



#### Bad Examples
##### no `camelCase-d` JSON object keys

JSON object key `id-key` is not in cameCase format

Applies to API Target(s) `Request_Body, Response_Body`

```
FORMAT: 1A

# test

## test [/test]


### test post [POST]

+ Request (application/json)

        {
            "id-key": 1
        }

+ Response 200 (application/json)

        {
            "id-key": 1
        }

```

> Error: Key "id-key" is not in camel case format.





### UUID `id` key
Applies to API Targets `Request_Body, Response_Body`

It validates that value under `id` key in body JSON object is in format of UUID [1].
[1] http://en.wikipedia.org/wiki/Universally_unique_identifier

#### Good Examples
##### `id` key is in UUID format

value `123e4567-e89b-12d3-a456-426655440000` of `id` key is not in UUID format

Applies to API Target(s) `Request_Body, Response_Body`

```
FORMAT: 1A

# test

## test [/test]


### test post [POST]

+ Request (application/json)

        {
            "id": "123e4567-e89b-12d3-a456-426655440000"
        }

+ Response 200 (application/json)

        {
            "id": "123e4567-e89b-12d3-a456-426655440000"
        }

```



#### Bad Examples
##### `id` key is not in UUID format

value `1` of `id` key is not in UUID format

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

> Error: Id key value `1`is not in UUID format.





### Datetime fields are in `ISO 85601` format
Applies to API Targets `Request_Body, Response_Body`

Validates if body JSON object values under datetime fields identified by key with trailing `At` are in format of ISO 85601 [1] and in the UTC timezone.
[1] https://www.iso.org/iso-8601-date-and-time-format.html

#### Good Examples
##### Date in ISO 85601 format

Date field `createdAt` value `2012-01-01T12:00:00Z` is in ISO 85601 format

Applies to API Target(s) `Request_Body, Response_Body`

```
FORMAT: 1A

# test

## test [/test]


### test post [POST]

+ Request (application/json)

        {
            "createdAt": "2012-01-01T12:00:00Z"
        }

+ Response 200 (application/json)

        {
            "createdAt": "2012-01-01T12:00:00Z"
        }

```



#### Bad Examples
##### Date not in ISO 85601 format

Date field `createdAt` value `2012-01-01T12:00:00Z` is not in ISO 85601 format

Applies to API Target(s) `Request_Body, Response_Body`

```
FORMAT: 1A

# test

## test [/test]


### test post [POST]

+ Request (application/json)

        {
            "createdAt": "2012:01-01T12-00-00Z"
        }

+ Response 200 (application/json)

        {
            "createdAt": "2012:01-01T12-00-00Z"
        }

```

> Error: Datetime key "createdAt" is not in format ISO8601 or in UTC.





### DELETE request must not have a body
Applies to API Targets `Action`

Checks if response to DELETE request contains body

#### Good Examples
##### No body pasyload in response

The response to DELETE request does not contain body.

Applies to API Target(s) `Action`

```
FORMAT: 1A

# API Projects

## Projects [/projects/{projectId}]

### Remove a Project [DELETE]

+ Response 204

```



#### Bad Examples
##### Body pasyload in response

The response to DELETE request does contain body.

Applies to API Target(s) `Action`

```
FORMAT: 1A

# API Projects

## Projects [/projects/{projectId}]

### Remove a Project [DELETE]

+ Request (application/json)

        {
            id: 1
        }

+ Response 204

```

> Error: DELETE request must not have a body.







