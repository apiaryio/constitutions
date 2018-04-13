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




