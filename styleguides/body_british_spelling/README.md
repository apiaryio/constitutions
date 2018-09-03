### Only British spelling
Applies to API Targets `Request_Body, Response_Body`

Validates if there is no US spelling in JSON object bodies

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

> Error: Contains US spelling of word: scandalizing




