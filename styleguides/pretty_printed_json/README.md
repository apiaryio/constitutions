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




