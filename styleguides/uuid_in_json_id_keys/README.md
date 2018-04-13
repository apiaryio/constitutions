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




