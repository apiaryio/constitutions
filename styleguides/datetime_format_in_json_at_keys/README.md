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




