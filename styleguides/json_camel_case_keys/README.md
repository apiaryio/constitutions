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




